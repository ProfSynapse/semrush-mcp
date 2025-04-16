import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import NodeCache from 'node-cache';
import { config, logger } from './config.js';

// Base API URLs
const SEMRUSH_API_BASE_URL = 'https://api.semrush.com/';
const BACKLINKS_API_BASE_URL = 'https://api.semrush.com/analytics/v1/';
const TRENDS_API_BASE_URL = 'https://api.semrush.com/analytics/ta/';

// Create a cache with TTL from config
const apiCache = new NodeCache({ stdTTL: config.API_CACHE_TTL_SECONDS });

// Rate limiting implementation
class RateLimiter {
  private requestTimestamps: number[] = [];
  private readonly rateLimit: number;
  
  constructor(rateLimit = config.API_RATE_LIMIT_PER_SECOND) {
    this.rateLimit = rateLimit;
  }
  
  canMakeRequest(): boolean {
    const now = Date.now();
    const oneSecondAgo = now - 1000;
    
    // Remove timestamps older than 1 second
    this.requestTimestamps = this.requestTimestamps.filter(timestamp => timestamp > oneSecondAgo);
    
    // Check if we're under the rate limit
    return this.requestTimestamps.length < this.rateLimit;
  }
  
  recordRequest(): void {
    this.requestTimestamps.push(Date.now());
  }
  
  async waitForRateLimit(): Promise<void> {
    return new Promise(resolve => {
      const checkRateLimit = () => {
        if (this.canMakeRequest()) {
          this.recordRequest();
          resolve();
        } else {
          // Wait 100ms and check again
          setTimeout(checkRateLimit, 100);
        }
      };
      
      checkRateLimit();
    });
  }
}

const rateLimiter = new RateLimiter();

// API response types
export interface SemrushApiResponse {
  data: any;
  status: number;
  headers: Record<string, string>;
}

// Types for API parameters
export interface ApiQueryParams {
  [key: string]: string | number | boolean | undefined;
}

// Error handling
export class SemrushApiError extends Error {
  public status: number;
  public response?: any;
  
  constructor(message: string, status: number, response?: any) {
    super(message);
    this.name = 'SemrushApiError';
    this.status = status;
    this.response = response;
  }
}

// Main API client
export class SemrushApiClient {
  private readonly apiKey: string;
  
  constructor(apiKey = config.SEMRUSH_API_KEY) {
    if (!apiKey) {
      throw new SemrushApiError('Semrush API key is required', 401);
    }
    this.apiKey = apiKey;
  }
  
  // Make API request with caching and rate limiting
  private async makeRequest(
    url: string, 
    params: ApiQueryParams = {},
    options: AxiosRequestConfig = {}
  ): Promise<SemrushApiResponse> {
    // Add API key to parameters
    const requestParams: ApiQueryParams = {
      ...params,
      key: this.apiKey
    };
    
    // Create cache key from URL and params
    const cacheKey = `${url}:${JSON.stringify(requestParams)}`;
    
    // Check cache first
    const cachedResponse = apiCache.get<SemrushApiResponse>(cacheKey);
    if (cachedResponse) {
      logger.debug(`Cache hit for request: ${url}`);
      return cachedResponse;
    }
    
    // Wait for rate limit allowance
    await rateLimiter.waitForRateLimit();
    
    try {
      logger.debug(`Making request to: ${url}`);
      
      const response: AxiosResponse = await axios({
        method: 'get',
        url,
        params: requestParams,
        ...options
      });
      
      const apiResponse: SemrushApiResponse = {
        data: response.data,
        status: response.status,
        headers: response.headers as Record<string, string>
      };
      
      // Cache successful response
      apiCache.set(cacheKey, apiResponse);
      
      return apiResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.error?.message || error.message;
        logger.error(`API request failed: ${message}`);
        throw new SemrushApiError(message, status, error.response?.data);
      }
      
      // Handle other types of errors
      logger.error(`Unknown error: ${(error as Error).message}`);
      throw new SemrushApiError((error as Error).message, 500);
    }
  }
  
  // Analytics API methods
  // Domain Analytics
  async getDomainOverview(domain: string, database: string = 'us'): Promise<SemrushApiResponse> {
    if (!domain) {
      throw new SemrushApiError('Domain is required', 400);
    }
    if (!database) {
      throw new SemrushApiError('Database is required', 400);
    }
    
    // According to documentation, domain_ranks requires specific export_columns
    return this.makeRequest(SEMRUSH_API_BASE_URL, {
      type: 'domain_ranks',
      domain,
      database,
      export_columns: 'Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,Sh,Sv'
    });
  }
  
  async getCompetitorsInOrganic(domain: string, database: string = 'us', limit?: number): Promise<SemrushApiResponse> {
    if (!domain) {
      throw new SemrushApiError('Domain is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'domain_organic_organic',
      domain,
      database,
      export_columns: 'Dn,Cr,Np,Or,Ot,Oc,Ad,At,Ac'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }
  
  // Keyword Analytics
  async getKeywordOverviewSingleDb(keyword: string, database: string): Promise<SemrushApiResponse> {
    if (!keyword) {
      throw new SemrushApiError('Keyword is required', 400);
    }
    if (!database) {
      throw new SemrushApiError('Database is required for single database overview', 400);
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, {
      type: 'phrase_this',
      phrase: keyword,
      database,
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td,In,Kd'
    });
  }

  async getKeywordOverview(keyword: string, database: string = 'us'): Promise<SemrushApiResponse> {
    if (!keyword) {
      throw new SemrushApiError('Keyword is required', 400);
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, {
      type: 'phrase_all',
      phrase: keyword,
      database,
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td'
    });
  }

  async getBatchKeywordOverview(keywords: string[], database: string): Promise<SemrushApiResponse> {
    if (!Array.isArray(keywords)) {
      throw new SemrushApiError('Keywords must be an array', 400);
    }
    if (keywords.length > 100) {
      throw new SemrushApiError('Maximum 100 keywords allowed', 400);
    }
    if (keywords.length === 0) {
      throw new SemrushApiError('At least one keyword is required', 400);
    }
    
    // According to documentation, phrase_these expects semicolon-separated keywords
    return this.makeRequest(SEMRUSH_API_BASE_URL, {
      type: 'phrase_these',
      phrase: keywords.join(';'),
      database,
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td,In,Kd'
    });
  }

  async getRelatedKeywords(keyword: string, database: string = 'us', limit?: number): Promise<SemrushApiResponse> {
    if (!keyword) {
      throw new SemrushApiError('Keyword is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'phrase_related',
      phrase: keyword,
      database,
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }

  async getBroadMatchKeywords(keyword: string, database: string = 'us', limit?: number): Promise<SemrushApiResponse> {
    if (!keyword) {
      throw new SemrushApiError('Keyword is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'phrase_fullsearch',
      phrase: keyword,
      database,
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td,Fk,In,Kd'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }

  async getPhraseQuestions(keyword: string, database: string = 'us', limit?: number): Promise<SemrushApiResponse> {
    if (!keyword) {
      throw new SemrushApiError('Keyword is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'phrase_questions',
      phrase: keyword,
      database,
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td,In,Kd'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }

  async getKeywordDifficulty(keywords: string[], database: string): Promise<SemrushApiResponse> {
    if (!Array.isArray(keywords)) {
      throw new SemrushApiError('Keywords must be an array', 400);
    }
    if (keywords.length > 100) {
      throw new SemrushApiError('Maximum 100 keywords allowed', 400);
    }
    if (keywords.length === 0) {
      throw new SemrushApiError('At least one keyword is required', 400);
    }
    
    // According to documentation, phrase_kdi expects semicolon-separated keywords
    return this.makeRequest(SEMRUSH_API_BASE_URL, {
      type: 'phrase_kdi',
      phrase: keywords.join(';'),
      database,
      export_columns: 'Ph,Kd'
    });
  }
  
  // Domain Keyword Analysis
  async getDomainOrganicKeywords(domain: string, database: string = 'us', limit?: number): Promise<SemrushApiResponse> {
    if (!domain) {
      throw new SemrushApiError('Domain is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'domain_organic',
      domain,
      database,
      export_columns: 'Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }

  async getDomainPaidKeywords(domain: string, database: string = 'us', limit?: number): Promise<SemrushApiResponse> {
    if (!domain) {
      throw new SemrushApiError('Domain is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'domain_adwords',
      domain,
      database,
      export_columns: 'Ph,Po,Pp,Pd,Ab,Nq,Cp,Tr,Tc,Co,Nr,Td'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }
  
  // Keywords in Organic/Paid Results
  async getKeywordOrganicResults(keyword: string, database: string, limit?: number): Promise<SemrushApiResponse> {
    if (!keyword) {
      throw new SemrushApiError('Keyword is required', 400);
    }
    if (!database) {
      throw new SemrushApiError('Database is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'phrase_organic',
      phrase: keyword,
      database,
      export_columns: 'Po,Pt,Dn,Ur,Fk,Fp,Fl'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }

  async getKeywordPaidResults(keyword: string, database: string, limit?: number): Promise<SemrushApiResponse> {
    if (!keyword) {
      throw new SemrushApiError('Keyword is required', 400);
    }
    if (!database) {
      throw new SemrushApiError('Database is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'phrase_adwords',
      phrase: keyword,
      database,
      export_columns: 'Dn,Ur,Vu'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }

  async getKeywordAdsHistory(keyword: string, database: string, limit?: number): Promise<SemrushApiResponse> {
    if (!keyword) {
      throw new SemrushApiError('Keyword is required', 400);
    }
    if (!database) {
      throw new SemrushApiError('Database is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'phrase_adwords_historical',
      phrase: keyword,
      database,
      export_columns: 'Dn,Dt,Po,Ur,Tt,Ds,Vu'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(SEMRUSH_API_BASE_URL, params);
  }
  
  // Backlinks API
  async getBacklinks(target: string, database: string = 'us', limit?: number): Promise<SemrushApiResponse> {
    if (!target) {
      throw new SemrushApiError('Target domain or URL is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'backlinks',
      target,
      target_type: target.includes('/') ? 'url' : 'root_domain',
      export_columns: 'source_title,source_url,target_url,anchor,page_score,domain_score,external_num,internal_num,first_seen,last_seen'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(BACKLINKS_API_BASE_URL, params);
  }
  
  async getBacklinksDomains(target: string, database: string = 'us', limit?: number): Promise<SemrushApiResponse> {
    if (!target) {
      throw new SemrushApiError('Target domain or URL is required', 400);
    }
    
    const params: ApiQueryParams = {
      type: 'backlinks_refdomains',
      target,
      target_type: target.includes('/') ? 'url' : 'root_domain',
      export_columns: 'domain,domain_score,backlinks_num,ip,country,first_seen,last_seen'
    };
    
    if (limit) {
      if (limit < 1) {
        throw new SemrushApiError('Limit must be a positive number', 400);
      }
      params.display_limit = limit;
    }
    
    return this.makeRequest(BACKLINKS_API_BASE_URL, params);
  }
  
  // Traffic Analytics (.Trends API) - Requires separate subscription
  async getTrafficSummary(domains: string[], country: string = 'us'): Promise<SemrushApiResponse> {
    if (!Array.isArray(domains)) {
      throw new SemrushApiError('Domains parameter must be an array', 400);
    }
    if (domains.length > 5) {
      throw new SemrushApiError('Maximum 5 domains allowed', 400);
    }
    if (domains.length === 0) {
      throw new SemrushApiError('At least one domain is required', 400);
    }
    
    // Traffic Analytics API uses a different endpoint structure
    return this.makeRequest(`${TRENDS_API_BASE_URL}summary`, {
      domains: domains.join(','),
      country,
      date: 'all'
    });
  }
  
  async getTrafficSources(domain: string, country: string = 'us'): Promise<SemrushApiResponse> {
    if (!domain) {
      throw new SemrushApiError('Domain is required', 400);
    }
    
    // Traffic Analytics API uses a different endpoint structure
    return this.makeRequest(`${TRENDS_API_BASE_URL}sources`, {
      domain,
      country,
      date: 'all'
    });
  }
  
  // Utility to check API units balance
  async getApiUnitsBalance(): Promise<SemrushApiResponse> {
    return this.makeRequest(SEMRUSH_API_BASE_URL, {
      type: 'api_units'
    });
  }
}

// Export a singleton instance
export const semrushApi = new SemrushApiClient();

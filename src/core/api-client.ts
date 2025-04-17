/**
 * Semrush API Client
 * 
 * Provides a type-safe interface to the Semrush API with error handling
 * and response parsing.
 */

import { ApiError, ApiErrorType } from './types.js';

/**
 * Base URL for Semrush API
 */
const API_BASE_URL = 'https://api.semrush.com';

/**
 * Semrush API client class
 */
export class SemrushApiClient {
  private apiKey: string;
  private currentRequestType: string = '';
  
  /**
   * Create a new Semrush API client
   * 
   * @param apiKey - Semrush API key (provided by Claude Desktop)
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Make a request to the Semrush API
   * 
   * @param type - API request type (e.g., 'domain_organic', 'backlinks_overview')
   * @param params - Query parameters
   * @returns Parsed response data
   * @throws ApiError if the request fails
   */
  private async request<T>(type: string, params: Record<string, string>): Promise<T> {
    this.currentRequestType = type;
    // Set base URL
    const baseUrl = `${API_BASE_URL}/${type.startsWith('backlinks') ? 'analytics/v1/' : ''}`;

    // Build URL with parameters
    const url = new URL(baseUrl);
    
    // Add type and API key
    url.searchParams.append('type', type);
    url.searchParams.append('key', this.apiKey);
    
    // Add other parameters
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value);
      }
    }
    
    try {
      // Make request using native fetch API (available in Node.js 18+)
      const response = await fetch(url.toString());
      
      // Get response text
      const text = await response.text();

      // Handle various error cases
      if (!response.ok) {
        let errorType: ApiErrorType = 'unknown';
        let details: Record<string, any> = {};
        
        // Determine error type based on status
        if (response.status === 401 || response.status === 403) {
          errorType = 'auth_error';
        } else if (response.status === 400) {
          errorType = 'validation_error';
        } else if (response.status === 429) {
          errorType = 'rate_limit';
        } else if (response.status >= 500) {
          errorType = 'server_error';
        }

        throw new ApiError(
          `API request failed: ${response.statusText}`,
          response.status,
          this.currentRequestType,
          errorType,
          details
        );
      }

      // Handle error responses that return 200 status
      if (text.startsWith('ERROR')) {
        const errorMatch = text.match(/^ERROR\s*(\d+)\s*::(.*)$/);
        let errorType: ApiErrorType = 'unknown';
        let code = 200;
        let message = 'Unknown API error';

        if (errorMatch) {
          const [, errorCode, errorMessage] = errorMatch;
          code = parseInt(errorCode, 10) || 200;
          message = errorMessage.trim() || message;

          // Map common error codes to types
          if (code === 401 || code === 403) errorType = 'auth_error';
          else if (code === 400) errorType = 'validation_error';
          else if (code === 429) errorType = 'rate_limit';
          else if (code >= 500) errorType = 'server_error';
        } else {
          message = text.replace(/^ERROR\s*::?\s*/, '').trim() || message;
        }

        throw new ApiError(message, code, this.currentRequestType, errorType);
      }
      
      // Parse CSV or JSON response
      return this.parseResponse<T>(text);
    } catch (error) {
      // Network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new ApiError(
          `Network error: ${error.message}`,
          undefined,
          this.currentRequestType,
          'network_error'
        );
      }

      // Re-throw ApiErrors
      if (error instanceof ApiError) {
        throw error;
      }

      // Unknown errors
      throw new ApiError(
        `API request failed: ${(error as Error).message}`,
        undefined,
        this.currentRequestType,
        'unknown'
      );
    }
  }
  
  /**
   * Parse API response (CSV or JSON)
   * 
   * @param text - Response text
   * @returns Parsed response data
   */
  private parseResponse<T>(text: string): T {
    // Check if response is JSON
    if (text.startsWith('{') || text.startsWith('[')) {
      try {
        return JSON.parse(text) as T;
      } catch (e) {
        throw new ApiError(
          `Failed to parse JSON response: ${text.slice(0, 100)}...`,
          500,
          this.currentRequestType,
          'parsing_error',
          { responseText: text.slice(0, 1000) }
        );
      }
    }
    
    try {
      // Parse CSV response
      const lines = text.trim().split('\n');
      if (lines.length === 0) {
        throw new Error('Empty response');
      }

      const headers = lines[0].split(';');
      if (headers.length === 0) {
        throw new Error('No headers found in CSV');
      }

      const results = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(';');
        const row: Record<string, string> = {};
        
        // Ensure we have the right number of values
        if (values.length !== headers.length) {
          throw new Error(`Mismatched columns in row ${i}: expected ${headers.length}, got ${values.length}`);
        }
        
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = values[j] || '';
        }
        
        results.push(row);
      }

      return results as unknown as T;
    } catch (e) {
      throw new ApiError(
        `Failed to parse CSV response: ${(e as Error).message}`,
        500,
          this.currentRequestType,
          'parsing_error',
          { 
            responseText: text.slice(0, 1000),
            error: (e as Error).message
          }
      );
    }
  }
  
  /**
   * Get domain overview data
   * 
   * @param domain - Target domain without protocol (e.g. "example.com")
   * @param database - Database to use (default: 'us')
   * @param limit - Maximum number of results (1-1000, default: 100)
   * @returns Domain overview data
   */
  async getDomainOverview(domain: string, database: string = 'us', limit: number = 100): Promise<any> {
    return this.request('domain_organic', {
      domain: domain.replace(/^https?:\/\//, ''), // Remove protocol if present
      database,
      export_columns: 'Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td', // Default columns
      display_limit: Math.min(Math.max(1, limit), 1000).toString() // Ensure limit is between 1-1000
    });
  }
  
  /**
   * Get domain competitors
   * 
   * @param domain - Target domain without protocol (e.g. "example.com")
   * @param database - Database to use (default: 'us')
   * @param limit - Maximum number of results (1-100, default: 10)
   * @returns Domain competitors data
   */
  async getDomainCompetitors(domain: string, database: string = 'us', limit: number = 10): Promise<any> {
    return this.request('domain_organic_organic', {
      domain: domain.replace(/^https?:\/\//, ''), // Remove protocol if present
      database,
      display_limit: Math.min(Math.max(1, limit), 100).toString(), // Ensure limit is between 1-100
      export_columns: 'Dn,Cr,Np,Or,Ot,Oc,Ad' // Default columns
    });
  }
  
  /**
   * Get backlinks for a domain
   * 
   * @param target - Target domain without protocol (e.g. "example.com") 
   * @param options - Optional parameters
   * @param options.targetType - Type of target (root_domain, domain, or url) (default: root_domain)
   * @param options.limit - Maximum number of results (1-1000000, default: 10000)
   * @param options.offset - Number of results to skip (for pagination)
   * @param options.sort - Sort order (e.g. 'page_ascore_desc', 'last_seen_desc')
   * @returns Backlinks data
   */
  async getBacklinks(
    target: string, 
    options: {
      targetType?: 'root_domain' | 'domain' | 'url';
      limit?: number;
      offset?: number;
      sort?: string;
    } = {}
  ): Promise<any> {
    const {
      targetType = 'root_domain',
      limit = 10000,
      offset,
      sort
    } = options;

    // Build parameters in the correct order
    const params: Record<string, string> = {
      target: target.replace(/^https?:\/\//, ''),
      target_type: targetType,
      export_columns: 'page_ascore,source_title,source_url,target_url,anchor,external_num,internal_num,first_seen,last_seen'
    };

    // Add optional parameters
    if (limit) {
      params.display_limit = Math.min(Math.max(1, limit), 1000000).toString();
    }
    if (offset) {
      params.display_offset = offset.toString();
    }
    if (sort) {
      params.display_sort = sort;
    }

    return this.request('backlinks', params);
  }
  
  /**
   * Get referring domains for a target
   * 
   * @param target - Target domain without protocol (e.g. "example.com")
   * @param limit - Maximum number of results (1-10000, default: 100)
   * @returns Referring domains data
   */
  async getBacklinksRefdomains(target: string, limit: number = 100): Promise<any> {
    return this.request('backlinks_refdomains', {
      target: target.replace(/^https?:\/\//, ''), // Remove protocol if present
      target_type: 'root_domain',
      display_limit: Math.min(Math.max(1, limit), 10000).toString(),
      export_columns: 'domain_ascore,domain,backlinks_num,ip,country,first_seen,last_seen'
    });
  }
  
  /**
   * Get keyword overview data
   * 
   * @param keyword - Target keyword phrase
   * @param database - Database to use (default: 'us')
   * @param limit - Maximum number of results (1-1000, default: 100)
   * @returns Keyword overview data
   */
  async getKeywordOverview(keyword: string, database: string = 'us', limit: number = 100): Promise<any> {
    return this.request('phrase_this', {
      phrase: keyword.trim(), // Remove any leading/trailing whitespace
      database,
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td', // Default columns for keyword overview
      display_limit: Math.min(Math.max(1, limit), 1000).toString() // Ensure limit is between 1-1000
    });
  }
  
  /**
   * Get related keywords
   * 
   * @param keyword - Seed keyword phrase
   * @param database - Database to use (default: 'us')
   * @param limit - Maximum number of results (1-10000, default: 100)
   * @returns Related keywords data
   */
  async getRelatedKeywords(keyword: string, database: string = 'us', limit: number = 100): Promise<any> {
    return this.request('phrase_related', {
      phrase: keyword.trim(), // Remove any leading/trailing whitespace
      database,
      display_limit: Math.min(Math.max(1, limit), 10000).toString(),
      export_columns: 'Ph,Nq,Cp,Co,Nr,Td,Rr,Fk' // Default columns for related keywords
    });
  }
  
  /**
   * Get keyword difficulty
   * 
   * @param keyword - Target keyword phrase
   * @param database - Database to use (default: 'us')
   * @param limit - Maximum number of results (1-1000, default: 100)
   * @returns Keyword difficulty data
   */
  async getKeywordDifficulty(keyword: string, database: string = 'us', limit: number = 100): Promise<any> {
    return this.request('phrase_kdi', {
      phrase: keyword.trim(), // Remove any leading/trailing whitespace
      database,
      export_columns: 'Ph,Kd', // Default columns for keyword difficulty
      display_limit: Math.min(Math.max(1, limit), 1000).toString() // Ensure limit is between 1-1000
    });
  }
}

/**
 * Create a Semrush API client instance
 * 
 * @param apiKey - Semrush API key (provided by Claude Desktop)
 * @returns Semrush API client instance
 */
export function createSemrushApiClient(apiKey: string): SemrushApiClient {
  return new SemrushApiClient(apiKey);
}

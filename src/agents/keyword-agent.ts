import { BaseAgent } from './base-agent.js';
import { BaseMode } from '../modes/base-mode.js';
import { BaseTool } from '../tools/base-tool.js';
import { semrushApi } from '../semrush-api.js';
import { unifiedToolRegistry } from '../validation/unified-tool-registry.js';
import {
  createKeywordParam,
  createDatabaseParam,
  createLimitParam,
  createDomainParam,
  createKeywordsArrayParam
} from '../validation/parameter-helpers.js';

/**
 * Keyword Agent - provides tools for keyword analysis
 */
export class KeywordAgent extends BaseAgent {
  constructor() {
    super('keyword', 'Keyword analysis tools');
    
    // Register tool schemas
    this.registerToolSchemas();
    
    // Initialize modes
    this.initializeOverviewMode();
    this.initializeResearchMode();
    this.initializeCompetitionMode();
    this.initializeAnalysisMode();
    this.initializeDomainKeywordsMode();
  }

  /**
   * Register tool schemas with the unified registry
   */
  private registerToolSchemas(): void {
    // Register keyword_overview tool
    unifiedToolRegistry.registerTool({
      name: 'keyword_overview',
      description: 'Get overview data for a keyword - provides search volume, CPC, competition, and other metrics. IMPORTANT: This tool must be used in "overview" mode, not "research" mode. It does NOT accept a "limit" parameter.',
      parameters: {
        keyword: createKeywordParam(true),
        database: createDatabaseParam(false)
        // Note: This tool does NOT support the 'limit' parameter
      },
      modes: ['overview'],
      agents: ['keyword']
    });

    // Register keyword_overview_single_db tool
    unifiedToolRegistry.registerTool({
      name: 'keyword_overview_single_db',
      description: 'Get detailed overview data for a keyword from a specific database (10 API units per line)',
      parameters: {
        keyword: createKeywordParam(true),
        database: createDatabaseParam(true)
      },
      modes: ['overview'],
      agents: ['keyword']
    });

    // Register batch_keyword_overview tool
    unifiedToolRegistry.registerTool({
      name: 'batch_keyword_overview',
      description: 'Analyze up to 100 keywords at once in a specific database (10 API units per line)',
      parameters: {
        keywords: createKeywordsArrayParam(100, true),
        database: createDatabaseParam(true)
      },
      modes: ['overview'],
      agents: ['keyword']
    });

    // Register related_keywords tool
    unifiedToolRegistry.registerTool({
      name: 'related_keywords',
      description: 'Get related keywords for a keyword - finds semantically related terms to expand your keyword list. Must be used in "research" mode.',
      parameters: {
        keyword: createKeywordParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['research'],
      agents: ['keyword']
    });

    // Register broad_match_keywords tool
    unifiedToolRegistry.registerTool({
      name: 'broad_match_keywords',
      description: 'Get broad matches and alternate search queries for a keyword - finds variations and alternative phrasings (20 API units per line). Must be used in "research" mode.',
      parameters: {
        keyword: createKeywordParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['research'],
      agents: ['keyword']
    });

    // Register phrase_questions tool
    unifiedToolRegistry.registerTool({
      name: 'phrase_questions',
      description: 'Get questions containing the keyword - finds question-based search queries for content creation (20 API units per line). Must be used in "research" mode.',
      parameters: {
        keyword: createKeywordParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['research'],
      agents: ['keyword']
    });

    // Register domain_keywords tool
    unifiedToolRegistry.registerTool({
      name: 'domain_keywords',
      description: 'Get keywords for a specific domain - retrieves organic keywords that a domain ranks for. NOTE: This tool requires a "domain" parameter (not a "keyword" parameter). Must be used in "research" mode.',
      parameters: {
        domain: createDomainParam(true),
        database: createDatabaseParam(false)
      },
      modes: ['research'],
      agents: ['keyword']
    });

    // Register keyword_organic_results tool
    unifiedToolRegistry.registerTool({
      name: 'keyword_organic_results',
      description: 'Get organic search results for a keyword (10 API units per line)',
      parameters: {
        keyword: createKeywordParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['competition'],
      agents: ['keyword']
    });

    // Register keyword_paid_results tool
    unifiedToolRegistry.registerTool({
      name: 'keyword_paid_results',
      description: 'Get paid search results for a keyword (10 API units per line)',
      parameters: {
        keyword: createKeywordParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['competition'],
      agents: ['keyword']
    });

    // Register keyword_ads_history tool
    unifiedToolRegistry.registerTool({
      name: 'keyword_ads_history',
      description: 'Get historical ad copies for a keyword (10 API units per line)',
      parameters: {
        keyword: createKeywordParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['competition'],
      agents: ['keyword']
    });

    // Register keyword_difficulty tool
    unifiedToolRegistry.registerTool({
      name: 'keyword_difficulty',
      description: 'Get difficulty scores for keywords (10 API units per line)',
      parameters: {
        keywords: createKeywordsArrayParam(100, true),
        database: createDatabaseParam(false)
      },
      modes: ['analysis'],
      agents: ['keyword']
    });

    // Register domain_organic_keywords tool
    unifiedToolRegistry.registerTool({
      name: 'domain_organic_keywords',
      description: 'Get organic keywords for a domain (10 API units per line)',
      parameters: {
        domain: createDomainParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['domain_keywords'],
      agents: ['keyword']
    });

    // Register domain_paid_keywords tool
    unifiedToolRegistry.registerTool({
      name: 'domain_paid_keywords',
      description: 'Get paid keywords for a domain (10 API units per line)',
      parameters: {
        domain: createDomainParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['domain_keywords'],
      agents: ['keyword']
    });
  }

  /**
   * Initialize the Overview mode with its tools
   */
  private initializeOverviewMode(): void {
    const overviewMode = new BaseMode('overview', 'Keyword overview tools');
    
    // Keyword Overview tool
    const keywordOverviewTool = new BaseTool(
      'keyword_overview',
      'Get overview data for a specific keyword',
      unifiedToolRegistry.getToolSchema('keyword_overview'),
      async (params) => {
        const { keyword, database } = params;
        return await semrushApi.getKeywordOverview(keyword, database);
      }
    );
    
    // Keyword Overview Single DB tool
    const keywordOverviewSingleDbTool = new BaseTool(
      'keyword_overview_single_db',
      'Get detailed overview data for a keyword from a specific database (10 API units per line)',
      unifiedToolRegistry.getToolSchema('keyword_overview_single_db'),
      async (params) => {
        const { keyword, database } = params;
        return await semrushApi.getKeywordOverviewSingleDb(keyword, database);
      }
    );
    
    // Batch Keyword Overview tool
    const batchKeywordOverviewTool = new BaseTool(
      'batch_keyword_overview',
      'Analyze up to 100 keywords at once in a specific database (10 API units per line)',
      unifiedToolRegistry.getToolSchema('batch_keyword_overview'),
      async (params) => {
        const { keywords, database } = params;
        return await semrushApi.getBatchKeywordOverview(keywords, database);
      }
    );
    
    overviewMode.registerTool(keywordOverviewTool);
    overviewMode.registerTool(keywordOverviewSingleDbTool);
    overviewMode.registerTool(batchKeywordOverviewTool);
    this.registerMode(overviewMode);
  }

  /**
   * Initialize the Research mode with its tools
   */
  private initializeResearchMode(): void {
    const researchMode = new BaseMode('research', 'Keyword research tools');
    
    // Related Keywords tool
    const relatedKeywordsTool = new BaseTool(
      'related_keywords',
      'Get related keywords for a specific keyword',
      unifiedToolRegistry.getToolSchema('related_keywords'),
      async (params) => {
        const { keyword, database, limit } = params;
        return await semrushApi.getRelatedKeywords(keyword, database, limit);
      }
    );
    
    // Broad Match Keywords tool
    const broadMatchKeywordsTool = new BaseTool(
      'broad_match_keywords',
      'Get broad matches and alternate search queries for a keyword (20 API units per line)',
      unifiedToolRegistry.getToolSchema('broad_match_keywords'),
      async (params) => {
        const { keyword, database, limit } = params;
        return await semrushApi.getBroadMatchKeywords(keyword, database, limit);
      }
    );
    
    // Phrase Questions tool
    const phraseQuestionsTool = new BaseTool(
      'phrase_questions',
      'Get questions containing the keyword (20 API units per line)',
      unifiedToolRegistry.getToolSchema('phrase_questions'),
      async (params) => {
        const { keyword, database, limit } = params;
        return await semrushApi.getPhraseQuestions(keyword, database, limit);
      }
    );
    
    // Domain Keywords tool
    const domainKeywordsTool = new BaseTool(
      'domain_keywords',
      'Get keywords for a specific domain',
      unifiedToolRegistry.getToolSchema('domain_keywords'),
      async (params) => {
        const { domain, database } = params;
        return await semrushApi.getDomainOrganicKeywords(domain, database);
      }
    );
    
    researchMode.registerTool(relatedKeywordsTool);
    researchMode.registerTool(broadMatchKeywordsTool);
    researchMode.registerTool(phraseQuestionsTool);
    researchMode.registerTool(domainKeywordsTool);  // Add the domain_keywords tool
    this.registerMode(researchMode);
  }

  /**
   * Initialize the Competition mode with its tools
   */
  private initializeCompetitionMode(): void {
    const competitionMode = new BaseMode('competition', 'Keyword competition tools');
    
    // Keyword Organic Results tool
    const keywordOrganicResultsTool = new BaseTool(
      'keyword_organic_results',
      'Get organic search results for a keyword (10 API units per line)',
      unifiedToolRegistry.getToolSchema('keyword_organic_results'),
      async (params) => {
        const { keyword, database, limit } = params;
        return await semrushApi.getKeywordOrganicResults(keyword, database, limit);
      }
    );
    
    // Keyword Paid Results tool
    const keywordPaidResultsTool = new BaseTool(
      'keyword_paid_results',
      'Get paid search results for a keyword (10 API units per line)',
      unifiedToolRegistry.getToolSchema('keyword_paid_results'),
      async (params) => {
        const { keyword, database, limit } = params;
        return await semrushApi.getKeywordPaidResults(keyword, database, limit);
      }
    );
    
    // Keyword Ads History tool
    const keywordAdsHistoryTool = new BaseTool(
      'keyword_ads_history',
      'Get historical ad copies for a keyword (10 API units per line)',
      unifiedToolRegistry.getToolSchema('keyword_ads_history'),
      async (params) => {
        const { keyword, database, limit } = params;
        return await semrushApi.getKeywordAdsHistory(keyword, database, limit);
      }
    );
    
    competitionMode.registerTool(keywordOrganicResultsTool);
    competitionMode.registerTool(keywordPaidResultsTool);
    competitionMode.registerTool(keywordAdsHistoryTool);
    this.registerMode(competitionMode);
  }

  /**
   * Initialize the Analysis mode with its tools
   */
  private initializeAnalysisMode(): void {
    const analysisMode = new BaseMode('analysis', 'Keyword analysis tools');
    
    // Keyword Difficulty tool
    const keywordDifficultyTool = new BaseTool(
      'keyword_difficulty',
      'Get difficulty scores for keywords (10 API units per line)',
      unifiedToolRegistry.getToolSchema('keyword_difficulty'),
      async (params) => {
        const { keywords, database } = params;
        return await semrushApi.getKeywordDifficulty(keywords, database);
      }
    );
    
    analysisMode.registerTool(keywordDifficultyTool);
    this.registerMode(analysisMode);
  }

  /**
   * Initialize the Domain Keywords mode with its tools
   */
  private initializeDomainKeywordsMode(): void {
    const domainKeywordsMode = new BaseMode('domain_keywords', 'Domain keyword tools');
    
    // Domain Organic Keywords tool
    const domainOrganicKeywordsTool = new BaseTool(
      'domain_organic_keywords',
      'Get organic keywords for a domain (10 API units per line)',
      unifiedToolRegistry.getToolSchema('domain_organic_keywords'),
      async (params) => {
        const { domain, database, limit } = params;
        return await semrushApi.getDomainOrganicKeywords(domain, database, limit);
      }
    );
    
    // Domain Paid Keywords tool
    const domainPaidKeywordsTool = new BaseTool(
      'domain_paid_keywords',
      'Get paid keywords for a domain (10 API units per line)',
      unifiedToolRegistry.getToolSchema('domain_paid_keywords'),
      async (params) => {
        const { domain, database, limit } = params;
        return await semrushApi.getDomainPaidKeywords(domain, database, limit);
      }
    );
    
    domainKeywordsMode.registerTool(domainOrganicKeywordsTool);
    domainKeywordsMode.registerTool(domainPaidKeywordsTool);
    this.registerMode(domainKeywordsMode);
  }
}
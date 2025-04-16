import { BaseAgent } from '../base-agent.js';
import { semrushApi } from '../../semrush-api.js';
import { unifiedToolRegistry, transformations } from '../../validation/unified-tool-registry.js';
import {
  createKeywordParam,
  createDatabaseParam,
  createLimitParam,
  createDomainParam,
  createKeywordsArrayParam
} from '../../validation/parameter-helpers.js';

/**
 * Keyword Analysis Agent
 * 
 * Provides tools for keyword research and analysis.
 * Tools are organized into modes:
 * - overview: Basic keyword metrics
 * - research: Keyword discovery and expansion
 * - domain_keywords: Domain-specific keyword tools
 */
export class KeywordAgent extends BaseAgent {
  constructor() {
    super('keyword', 'Keyword analysis tools');
    this.setupRegistry();
  }

  /**
   * Sets up the agent's tools and modes in the unified registry
   */
  private setupRegistry(): void {
    unifiedToolRegistry.registerAgent({
      name: 'keyword',
      description: 'Keyword analysis tools and capabilities',
      availableModes: [
        // Overview Mode
        {
          name: 'overview',
          description: 'Keyword overview and metrics',
          availableTools: [
            {
              name: 'keyword_overview',
              description: 'Get search volume and metrics for a keyword. USAGE: Pass a single keyword string.',
              parameters: {
                keyword: createKeywordParam(true),
                database: createDatabaseParam(false),
                restrict_to_db: {
                  type: 'boolean',
                  description: 'Search in single database only. This is optional and defaults to false.',
                  required: false,
                  default: false
                }
              },
              examples: [{
                params: {
                  keyword: "example keyword",
                  database: "us"
                }
              }]
            },
            {
              name: 'batch_keyword_overview',
              description: 'Analyze up to 100 keywords at once. IMPORTANT: This tool requires an ARRAY of keywords in the "keywords" parameter.',
              parameters: {
                keywords: createKeywordsArrayParam(100, true),
                database: createDatabaseParam(true)
              },
              examples: [{
                params: {
                  keywords: ["keyword1", "keyword2"],
                  database: "us"
                }
              }]
            }
          ]
        },

        // Research Mode
        {
          name: 'research',
          description: 'Keyword research and suggestions',
          availableTools: [
            {
              name: 'related_keywords',
              description: 'Get semantically related keywords. USAGE: Pass a single keyword string.',
              parameters: {
                keyword: createKeywordParam(true),
                database: createDatabaseParam(false),
                limit: createLimitParam(false)
              },
              examples: [{
                params: {
                  keyword: "example keyword",
                  database: "us",
                  limit: 10
                }
              }]
            },
            {
              name: 'broad_match_keywords',
              description: 'Get broad match and alternative queries. USAGE: Pass a single keyword string.',
              parameters: {
                keyword: createKeywordParam(true),
                database: createDatabaseParam(false),
                limit: createLimitParam(false)
              },
              examples: [{
                params: {
                  keyword: "example keyword",
                  database: "us",
                  limit: 10
                }
              }]
            },
            {
              name: 'phrase_questions',
              description: 'Get question-based keywords. USAGE: Pass a single keyword string.',
              parameters: {
                keyword: createKeywordParam(true),
                database: createDatabaseParam(false),
                limit: createLimitParam(false)
              },
              examples: [{
                params: {
                  keyword: "example keyword",
                  database: "us",
                  limit: 10
                }
              }]
            },
            {
              name: 'keyword_difficulty',
              description: 'Get ranking difficulty scores for up to 100 keywords. IMPORTANT: This tool requires an ARRAY of keywords in the "phrase" parameter, not a single string. EXAMPLE: Use ["keyword1", "keyword2"] not "keyword".',
              parameters: {
                phrase: {
                  type: 'array',
                  description: 'Array of keywords to analyze (max 100). MUST be an array like ["keyword1", "keyword2"], not a single string.',
                  required: true,
                  maxItems: 100,
                  minItems: 1,
                  transform: (value: any) => {
                    if (typeof value === 'string') {
                      return value.split(/[;,]/).map(k => k.trim());
                    }
                    return Array.isArray(value) ? value : [value];
                  }
                },
                database: createDatabaseParam(true)
              },
              examples: [{
                params: {
                  phrase: ["keyword1", "keyword2"],
                  database: "us"
                }
              }]
            }
          ]
        },

        // Domain Keywords Mode
        {
          name: 'domain_keywords',
          description: 'Domain-specific keyword tools',
          availableTools: [
            {
              name: 'domain_organic_keywords',
              description: 'Get organic keywords for a domain. NOTE: The correct tool name is "domain_organic_keywords", not "domain_organic".',
              parameters: {
                domain: createDomainParam(true),
                database: createDatabaseParam(false),
                limit: createLimitParam(false)
              },
              examples: [{
                params: {
                  domain: "example.com",
                  database: "us",
                  limit: 10
                }
              }]
            },
            {
              name: 'domain_paid_keywords',
              description: 'Get paid keywords for a domain. NOTE: Available domain keyword tools are "domain_organic_keywords" and "domain_paid_keywords".',
              parameters: {
                domain: createDomainParam(true),
                database: createDatabaseParam(false),
                limit: createLimitParam(false)
              },
              examples: [{
                params: {
                  domain: "example.com",
                  database: "us",
                  limit: 10
                }
              }]
            }
          ]
        }
      ]
    });
  }

  // Implementation of API handlers
  protected async executeToolAction(toolName: string, params: Record<string, any>): Promise<any> {
    const handlers: Record<string, (params: Record<string, any>) => Promise<any>> = {
      keyword_overview: async (params) => {
        const { keyword, database = 'us', restrict_to_db = false } = params;
        if (!keyword) {
          throw new Error('Keyword is required');
        }
        
        if (restrict_to_db) {
          return await semrushApi.getKeywordOverviewSingleDb(keyword, database);
        } else {
          return await semrushApi.getKeywordOverview(keyword, database);
        }
      },

      batch_keyword_overview: async (params) => {
        const { keywords, database } = params;
        if (!Array.isArray(keywords)) {
          throw new Error('Keywords must be an array');
        }
        if (keywords.length > 100) {
          throw new Error('Maximum 100 keywords allowed');
        }
        return await semrushApi.getBatchKeywordOverview(keywords, database);
      },

      related_keywords: async (params) => {
        const { keyword, database = 'us', limit } = params;
        if (!keyword) {
          throw new Error('Keyword is required');
        }
        return await semrushApi.getRelatedKeywords(keyword, database, limit);
      },

      broad_match_keywords: async (params) => {
        const { keyword, database = 'us', limit } = params;
        if (!keyword) {
          throw new Error('Keyword is required');
        }
        return await semrushApi.getBroadMatchKeywords(keyword, database, limit);
      },

      phrase_questions: async (params) => {
        const { keyword, database = 'us', limit } = params;
        if (!keyword) {
          throw new Error('Keyword is required');
        }
        return await semrushApi.getPhraseQuestions(keyword, database, limit);
      },

      keyword_difficulty: async (params) => {
        const { phrase, database } = params;
        
        // Ensure phrase is an array
        if (!Array.isArray(phrase)) {
          throw new Error('Keywords must be provided as an array');
        }
        
        if (phrase.length > 100) {
          throw new Error('Maximum 100 keywords allowed');
        }
        
        if (phrase.length === 0) {
          throw new Error('At least one keyword is required');
        }
        
        return await semrushApi.getKeywordDifficulty(phrase, database);
      },

      domain_organic_keywords: async (params) => {
        const { domain, database = 'us', limit } = params;
        if (!domain) {
          throw new Error('Domain is required');
        }
        return await semrushApi.getDomainOrganicKeywords(domain, database, limit);
      },

      domain_paid_keywords: async (params) => {
        const { domain, database = 'us', limit } = params;
        if (!domain) {
          throw new Error('Domain is required');
        }
        return await semrushApi.getDomainPaidKeywords(domain, database, limit);
      }
    };

    const handler = handlers[toolName];
    if (!handler) {
      throw new Error(`No handler found for tool: ${toolName}`);
    }

    return await handler(params);
  }
}

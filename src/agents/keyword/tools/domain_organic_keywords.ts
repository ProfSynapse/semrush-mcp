/**
 * Domain Organic Keywords Tool
 * 
 * Provides organic keywords for a domain.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createDomainParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';

/**
 * Domain organic keywords tool parameter interface
 */
interface DomainOrganicKeywordsParams extends ToolParameters {
  domain: ReturnType<typeof createDomainParam>;
  database: ReturnType<typeof createDatabaseParam>;
  limit: ReturnType<typeof createLimitParam>;
}

/**
 * Tool definition for domain_organic_keywords
 */
export const domain_organic_keywords: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.DOMAIN_KEYWORDS, DomainOrganicKeywordsParams> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.DOMAIN_KEYWORDS,
  name: 'domain_organic_keywords',
  description: 'Get organic keywords for a domain. NOTE: The correct tool name is "domain_organic_keywords", not "domain_organic". This is the tool to use for finding which keywords a domain ranks for in organic search.',
  parameters: {
    domain: createDomainParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [{
    description: 'Get organic keywords for a domain',
    params: {
      domain: "example.com",
      database: "us",
      limit: 10
    }
  }],
  execute: async (params: ValidatedParams<DomainOrganicKeywordsParams>): Promise<any> => {
    const { domain, database = 'us', limit } = params;
    
    if (!domain) {
      throw new Error('Domain is required');
    }
    
    return await semrushApi.getDomainOrganicKeywords(domain, database, limit);
  }
};

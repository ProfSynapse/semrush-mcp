/**
 * Domain Paid Keywords Tool
 * 
 * Provides paid keywords for a domain.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createDomainParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';

/**
 * Domain paid keywords tool parameter interface
 */
interface DomainPaidKeywordsParams extends ToolParameters {
  domain: ReturnType<typeof createDomainParam>;
  database: ReturnType<typeof createDatabaseParam>;
  limit: ReturnType<typeof createLimitParam>;
}

/**
 * Tool definition for domain_paid_keywords
 */
export const domain_paid_keywords: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.DOMAIN_KEYWORDS, DomainPaidKeywordsParams> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.DOMAIN_KEYWORDS,
  name: 'domain_paid_keywords',
  description: 'Get paid keywords for a domain. NOTE: Available domain keyword tools are "domain_organic_keywords" and "domain_paid_keywords". This is the tool to use for finding which keywords a domain is bidding on in paid search.',
  parameters: {
    domain: createDomainParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [{
    description: 'Get paid keywords for a domain',
    params: {
      domain: "example.com",
      database: "us",
      limit: 10
    }
  }],
  execute: async (params: ValidatedParams<DomainPaidKeywordsParams>): Promise<any> => {
    const { domain, database = 'us', limit } = params;
    
    if (!domain) {
      throw new Error('Domain is required');
    }
    
    return await semrushApi.getDomainPaidKeywords(domain, database, limit);
  }
};

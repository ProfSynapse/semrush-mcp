/**
 * Domain Organic Keywords Tool
 * 
 * Provides organic keywords for a domain.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createDomainParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for domain_organic_keywords
 */
export const domain_organic_keywords: ToolDefinition = {
  name: 'domain_organic_keywords',
  description: 'Get organic keywords for a domain. NOTE: The correct tool name is "domain_organic_keywords", not "domain_organic". This is the tool to use for finding which keywords a domain ranks for in organic search.',
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
};

/**
 * Execute the domain_organic_keywords tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeDomainOrganicKeywords(params: Record<string, any>): Promise<any> {
  const { domain, database = 'us', limit } = params;
  
  if (!domain) {
    throw new Error('Domain is required');
  }
  
  return await semrushApi.getDomainOrganicKeywords(domain, database, limit);
}

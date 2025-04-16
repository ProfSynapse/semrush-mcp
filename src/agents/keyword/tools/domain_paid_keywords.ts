/**
 * Domain Paid Keywords Tool
 * 
 * Provides paid keywords for a domain.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createDomainParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for domain_paid_keywords
 */
export const domain_paid_keywords: ToolDefinition = {
  name: 'domain_paid_keywords',
  description: 'Get paid keywords for a domain. NOTE: Available domain keyword tools are "domain_organic_keywords" and "domain_paid_keywords". This is the tool to use for finding which keywords a domain is bidding on in paid search.',
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
 * Execute the domain_paid_keywords tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeDomainPaidKeywords(params: Record<string, any>): Promise<any> {
  const { domain, database = 'us', limit } = params;
  
  if (!domain) {
    throw new Error('Domain is required');
  }
  
  return await semrushApi.getDomainPaidKeywords(domain, database, limit);
}

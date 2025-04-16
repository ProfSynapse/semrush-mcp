/**
 * Domain Competitors Tool
 * 
 * Provides competitive analysis for a domain, showing competitors in organic search.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createDomainParam, createDatabaseParam, createLimitParam } from '../../../schemas/domain-schemas.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for domain_competitors
 */
export const domain_competitors: ToolDefinition = {
  name: 'domain_competitors',
  description: 'Get competitors for a domain in organic search. USAGE: Pass a domain name without http/https prefix.',
  parameters: {
    domain: createDomainParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [
    {
      params: {
        domain: "example.com",
        database: "us",
        limit: 10
      }
    },
    {
      params: {
        domain: "ahrefs.com",
        database: "uk",
        limit: 20
      }
    }
  ]
};

/**
 * Execute the domain_competitors tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeDomainCompetitors(params: Record<string, any>): Promise<any> {
  const { domain, database = 'us', limit = 10 } = params;
  
  if (!domain) {
    throw new Error('Domain is required for competitors analysis');
  }
  
  return await semrushApi.getCompetitorsInOrganic(domain, database, limit);
}

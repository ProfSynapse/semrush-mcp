/**
 * Domain Competitors Tool
 * 
 * Provides competitive analysis for a domain, showing competitors in organic search.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, DomainMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createDomainParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';

/**
 * Domain competitors tool parameter interface
 */
interface DomainCompetitorsParams extends ToolParameters {
  domain: ReturnType<typeof createDomainParam>;
  database: ReturnType<typeof createDatabaseParam>;
  limit: ReturnType<typeof createLimitParam>;
}

/**
 * Tool definition for domain_competitors
 */
export const domain_competitors: TypedToolDefinition<AgentType.DOMAIN, DomainMode.COMPETITORS, DomainCompetitorsParams> = {
  agent: AgentType.DOMAIN,
  mode: DomainMode.COMPETITORS,
  name: 'domain_competitors',
  description: 'Get competitors for a domain in organic search. USAGE: Pass a domain name without http/https prefix.',
  parameters: {
    domain: createDomainParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [
    {
      description: 'Get competitors for example.com',
      params: {
        domain: "example.com",
        database: "us",
        limit: 10
      }
    },
    {
      description: 'Get competitors with custom database',
      params: {
        domain: "ahrefs.com",
        database: "uk",
        limit: 20
      }
    }
  ],
  execute: async (params: ValidatedParams<DomainCompetitorsParams>): Promise<any> => {
    const { domain, database = 'us', limit = 10 } = params;
    
    if (!domain) {
      throw new Error('Domain is required for competitors analysis');
    }
    
    return await semrushApi.getCompetitorsInOrganic(domain, database, limit);
  }
};

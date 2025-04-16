/**
 * Domain Ranks Tool
 * 
 * Provides overview data for a domain including comprehensive metrics such as
 * traffic, keywords, and rankings.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createDomainParam, createDatabaseParam } from '../../../schemas/domain-schemas.js';
import { SchemaType, createStringParam } from '../../../schemas/base-schema.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for domain_ranks
 */
export const domain_ranks: ToolDefinition = {
  name: 'domain_ranks',
  description: 'Get overview data for a domain - provides comprehensive metrics including traffic, keywords, and rankings. USAGE: Pass a domain name without http/https prefix. EXAMPLE: Use "example.com" not "https://example.com".',
  parameters: {
    domain: createDomainParam(true),
    database: createDatabaseParam(false),
    export_columns: createStringParam({
      description: 'Columns to export. This is optional and has a default value.',
      required: false,
      options: {
        default: 'Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,Sh,Sv',
        examples: ['Db,Dn,Rk,Or', 'Db,Dn,Rk,Or,Ot,Oc']
      }
    })
  },
  examples: [
    {
      params: {
        domain: "example.com",
        database: "us"
      }
    },
    {
      params: {
        domain: "ahrefs.com",
        database: "uk",
        export_columns: "Db,Dn,Rk,Or"
      }
    }
  ]
};

/**
 * Execute the domain_ranks tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeDomainRanks(params: Record<string, any>): Promise<any> {
  const { domain, database = 'us', export_columns } = params;
  
  if (!domain) {
    throw new Error('Domain is required for domain overview');
  }
  
  return await semrushApi.getDomainOverview(domain, database);
}

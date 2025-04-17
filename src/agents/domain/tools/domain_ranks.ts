/**
 * Domain Ranks Tool
 * 
 * Provides overview data for a domain including comprehensive metrics such as
 * traffic, keywords, and rankings.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, DomainMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createDomainParam, createDatabaseParam } from '../../../validation/parameter-helpers.js';

/**
 * Domain ranks tool parameter interface
 */
interface DomainRanksParams extends ToolParameters {
  domain: ReturnType<typeof createDomainParam>;
  database: ReturnType<typeof createDatabaseParam>;
  export_columns: ReturnType<typeof createParam.string>;
}

/**
 * Tool definition for domain_ranks
 */
export const domain_ranks: TypedToolDefinition<AgentType.DOMAIN, DomainMode.OVERVIEW, DomainRanksParams> = {
  agent: AgentType.DOMAIN,
  mode: DomainMode.OVERVIEW,
  name: 'domain_ranks',
  description: 'Get overview data for a domain - provides comprehensive metrics including traffic, keywords, and rankings. USAGE: Pass a domain name without http/https prefix. EXAMPLE: Use "example.com" not "https://example.com".',
  parameters: {
    domain: createDomainParam(true),
    database: createDatabaseParam(false),
    export_columns: createParam.string({
      description: 'Columns to export. This is optional and has a default value.',
      required: false,
      default: 'Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,Sh,Sv',
      examples: ['Db,Dn,Rk,Or', 'Db,Dn,Rk,Or,Ot,Oc']
    })
  },
  examples: [
    {
      description: 'Get domain ranks for example.com',
      params: {
        domain: "example.com",
        database: "us",
        export_columns: 'Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,Sh,Sv'
      }
    },
    {
      description: 'Get domain ranks with custom columns',
      params: {
        domain: "ahrefs.com",
        database: "uk",
        export_columns: "Db,Dn,Rk,Or"
      }
    }
  ],
  execute: async (params: ValidatedParams<DomainRanksParams>): Promise<any> => {
    const { domain, database = 'us', export_columns } = params;
    
    if (!domain) {
      throw new Error('Domain is required for domain overview');
    }
    
    return await semrushApi.getDomainOverview(domain, database);
  }
};

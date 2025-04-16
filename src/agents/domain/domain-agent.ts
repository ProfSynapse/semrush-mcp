import { BaseAgent } from '../base-agent.js';
import { semrushApi } from '../../semrush-api.js';
import { unifiedToolRegistry, transformations } from '../../validation/unified-tool-registry.js';
import {
  createDomainParam,
  createDatabaseParam,
  createLimitParam,
  createCountryParam,
  createTargetParam,
  createDomainsArrayParam
} from '../../validation/parameter-helpers.js';

/**
 * Domain Analysis Agent
 * 
 * Provides tools for domain analysis, including:
 * - overview: Basic domain metrics and rankings
 * - competitors: Competitive analysis
 * - traffic: Traffic analysis and sources
 * - backlinks: Backlink analysis
 */
export class DomainAgent extends BaseAgent {
  constructor() {
    super('domain', 'Domain analysis tools');
    this.setupRegistry();
  }

  /**
   * Sets up the agent's tools and modes in the unified registry
   */
  private setupRegistry(): void {
    // Register the agent with all its modes and tools
    unifiedToolRegistry.registerAgent({
      name: 'domain',
      description: 'Domain analysis tools and capabilities',
      availableModes: [
        // Overview Mode
        {
          name: 'overview',
          description: 'Domain overview and metrics',
          availableTools: [
            {
              name: 'domain_ranks',
              description: 'Get overview data for a domain - provides comprehensive metrics including traffic, keywords, and rankings. USAGE: Pass a domain name without http/https prefix. EXAMPLE: Use "example.com" not "https://example.com".',
              parameters: {
                domain: createDomainParam(true),
                database: createDatabaseParam(false),
                export_columns: {
                  type: 'string',
                  description: 'Columns to export. This is optional and has a default value.',
                  required: false,
                  default: 'Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,Sh,Sv'
                }
              },
              examples: [{
                params: {
                  domain: "example.com",
                  database: "us"
                }
              }]
            }
          ]
        },

        // Competitors Mode
        {
          name: 'competitors',
          description: 'Domain competition analysis',
          availableTools: [
            {
              name: 'domain_organic_organic',
              description: 'Get competitors for a domain in organic search. NOTE: This is the correct tool name for competitor analysis, not "domain_organic_competitors". USAGE: Pass a domain name without http/https prefix.',
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
        },

        // Traffic Mode
        {
          name: 'traffic',
          description: 'Domain traffic analysis',
          availableTools: [
            {
              name: 'traffic_summary',
              description: 'Get traffic summary for up to 5 domains (Traffic Analytics API). IMPORTANT: This tool requires an ARRAY of domains in the "domains" parameter, not a single domain. IMPORTANT: This tool uses "country" parameter, NOT "database" parameter.',
              parameters: {
                domains: {
                  type: 'array',
                  description: 'Array of domains (max 5). MUST be an array like ["example.com", "example.org"], not a single string. Each domain should be without http/https prefix.',
                  required: true,
                  maxItems: 5,
                  minItems: 1,
                  transform: (value: any) => {
                    // Handle both string array and comma-separated string
                    if (typeof value === 'string') {
                      return value.split(',').map((d: string) => transformations.formatDomain(d.trim()));
                    }
                    if (Array.isArray(value)) {
                      return value.map((d: string) => transformations.formatDomain(d));
                    }
                    return value;
                  }
                },
                country: {
                  type: 'string',
                  description: 'Two-letter country code (default: us) - IMPORTANT: Traffic API uses "country" parameter, NOT "database" parameter. Do not include a "database" parameter with this tool.',
                  required: false,
                  default: 'us',
                  pattern: '^[a-z]{2}$',
                  enum: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'ru', 'jp', 'in', 'cn']
                }
              },
              examples: [{
                params: {
                  domains: ["example1.com", "example2.com"],
                  country: "us"
                }
              }]
            },
            {
              name: 'traffic_sources',
              description: 'Get traffic sources for a domain. IMPORTANT: This tool uses a single "domain" parameter (not "domains"). IMPORTANT: This tool uses "country" parameter, NOT "database" parameter.',
              parameters: {
                domain: createDomainParam(true),
                country: createCountryParam(false)
              },
              examples: [{
                params: {
                  domain: "example.com",
                  country: "us"
                }
              }]
            }
          ]
        },

        // Backlinks Mode
        {
          name: 'backlinks',
          description: 'Domain backlinks analysis',
          availableTools: [
            {
              name: 'backlinks',
              description: 'Get backlinks for a domain or URL. NOTE: The correct tool name is "backlinks", not "backlinks_overview".',
              parameters: {
                target: {
                  ...createTargetParam(true),
                  aliases: ['domain', 'url'],
                  description: 'Domain or URL to analyze for backlinks. Pass a domain name without http/https prefix.'
                },
                limit: createLimitParam(false)
              },
              examples: [{
                params: {
                  target: "example.com",
                  limit: 10
                }
              }]
            },
            {
              name: 'backlinks_refdomains',
              description: 'Get referring domains for a domain or URL. NOTE: Available backlinks tools are "backlinks" and "backlinks_refdomains".',
              parameters: {
                target: {
                  ...createTargetParam(true),
                  aliases: ['domain', 'url'],
                  description: 'Domain or URL to analyze for referring domains. Pass a domain name without http/https prefix.'
                },
                limit: createLimitParam(false)
              },
              examples: [{
                params: {
                  target: "example.com",
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
      domain_ranks: async (params) => {
        const { domain, database = 'us', export_columns } = params;
        if (!domain) {
          throw new Error('Domain is required for domain overview');
        }
        return await semrushApi.getDomainOverview(domain, database);
      },
      
      domain_organic_organic: async (params) => {
        const { domain, database = 'us', limit = 10 } = params;
        if (!domain) {
          throw new Error('Domain is required for competitors analysis');
        }
        return await semrushApi.getCompetitorsInOrganic(domain, database, limit);
      },
      
      traffic_summary: async (params) => {
        const { domains, country = 'us' } = params;
        if (!Array.isArray(domains)) {
          throw new Error('Domains must be an array');
        }
        if (domains.length > 5) {
          throw new Error('Maximum 5 domains allowed');
        }
        if (domains.length === 0) {
          throw new Error('At least one domain is required');
        }
        const domainList = domains.map(d => transformations.formatDomain(d));
        return await semrushApi.getTrafficSummary(domainList, country);
      },
      
      traffic_sources: async (params) => {
        const { domain, country = 'us' } = params;
        if (!domain) {
          throw new Error('Domain is required for traffic sources');
        }
        return await semrushApi.getTrafficSources(domain, country);
      },
      
      backlinks: async (params) => {
        const { target, limit } = params;
        if (!target) {
          throw new Error('Target domain or URL is required for backlinks analysis');
        }
        return await semrushApi.getBacklinks(target, undefined, limit);
      },
      
      backlinks_refdomains: async (params) => {
        const { target, limit } = params;
        if (!target) {
          throw new Error('Target domain or URL is required for backlinks domains analysis');
        }
        return await semrushApi.getBacklinksDomains(target, undefined, limit);
      }
    };

    const handler = handlers[toolName];
    if (!handler) {
      throw new Error(`No handler found for tool: ${toolName}`);
    }

    return await handler(params);
  }
}

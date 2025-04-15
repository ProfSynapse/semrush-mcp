import { BaseAgent } from './base-agent.js';
import { BaseMode } from '../modes/base-mode.js';
import { BaseTool } from '../tools/base-tool.js';
import { semrushApi } from '../semrush-api.js';
import { unifiedToolRegistry } from '../validation/unified-tool-registry.js';
import {
  createDomainParam,
  createDatabaseParam,
  createLimitParam,
  createCountryParam,
  createTargetParam,
  createDomainsArrayParam
} from '../validation/parameter-helpers.js';

/**
 * Domain Agent - provides tools for domain analysis
 */
export class DomainAgent extends BaseAgent {
  constructor() {
    super('domain', 'Domain analysis tools');
    
    // Register tool schemas
    this.registerToolSchemas();
    
    // Initialize modes
    this.initializeOverviewMode();
    this.initializeCompetitorsMode();
    this.initializeTrafficMode();
    this.initializeBacklinksMode();
  }

  /**
   * Register tool schemas with the unified registry
   */
  private registerToolSchemas(): void {
    // Register domain_overview tool
    unifiedToolRegistry.registerTool({
      name: 'domain_overview',
      description: 'Get overview data for a domain - provides comprehensive metrics including traffic, keywords, and rankings. IMPORTANT: This tool requires a "domain" parameter (NOT a "keyword" parameter) and must be used in "overview" mode.',
      parameters: {
        domain: createDomainParam(true),
        database: createDatabaseParam(false)
        // Note: This tool does NOT accept a 'keyword' parameter
      },
      modes: ['overview'],
      agents: ['domain']
    });

    // Register competitors tool
    // Register competitors tool
    unifiedToolRegistry.registerTool({
      name: 'competitors',
      description: 'Get competitors for a domain - identifies websites competing for the same keywords (10 API units per line). Must be used in "competitors" mode.',
      parameters: {
        domain: createDomainParam(true),
        database: createDatabaseParam(false),
        limit: createLimitParam(false)
      },
      modes: ['competitors'],
      agents: ['domain']
    });
    // Register traffic_summary tool
    unifiedToolRegistry.registerTool({
      name: 'traffic_summary',
      description: 'Get traffic summary for up to 5 domains - provides traffic metrics for comparison (10 API units per line). Must be used in "traffic" mode.',
      parameters: {
        domains: createDomainsArrayParam(5, true),
        country: createCountryParam(false)
      },
      modes: ['traffic'],
      agents: ['domain']
    });

    // Register traffic_sources tool
    unifiedToolRegistry.registerTool({
      name: 'traffic_sources',
      description: 'Get traffic sources for a domain - breaks down traffic by source (10 API units per line). Must be used in "traffic" mode.',
      parameters: {
        domain: createDomainParam(true),
        country: createCountryParam(false)
      },
      modes: ['traffic'],
      agents: ['domain']
    });

    // Register backlinks tool
    // Register backlinks tool
    unifiedToolRegistry.registerTool({
      name: 'backlinks',
      description: 'Get backlinks for a domain or URL - retrieves incoming links to the target (10 API units per line). Must be used in "backlinks" mode.',
      parameters: {
        target: createTargetParam(true),
        limit: createLimitParam(false)
      },
      modes: ['backlinks'],
      agents: ['domain']
    });
    // Register backlinks_domains tool
    unifiedToolRegistry.registerTool({
      name: 'backlinks_domains',
      description: 'Get referring domains for a domain or URL - retrieves domains linking to the target (10 API units per line). Must be used in "backlinks" mode.',
      parameters: {
        target: createTargetParam(true),
        limit: createLimitParam(false)
      },
      modes: ['backlinks'],
      agents: ['domain']
    });
  }

  /**
   * Initialize the Overview mode with its tools
   */
  private initializeOverviewMode(): void {
    const overviewMode = new BaseMode('overview', 'Domain overview tools');
    
    // Domain Overview tool
    const domainOverviewTool = new BaseTool(
      'domain_overview',
      'Get domain overview data including organic/paid search traffic, keywords, and rankings',
      unifiedToolRegistry.getToolSchema('domain_overview'),
      async (params) => {
        const { domain, database } = params;
        return await semrushApi.getDomainOverview(domain, database);
      }
    );
    
    overviewMode.registerTool(domainOverviewTool);
    this.registerMode(overviewMode);
  }

  /**
   * Initialize the Competitors mode with its tools
   */
  private initializeCompetitorsMode(): void {
    const competitorsMode = new BaseMode('competitors', 'Domain competitors tools');
    
    // Competitors tool
    const competitorsTool = new BaseTool(
      'competitors',
      'Get competitors for a domain (10 API units per line)',
      unifiedToolRegistry.getToolSchema('competitors'),
      async (params) => {
        const { domain, database, limit } = params;
        return await semrushApi.getCompetitorsInOrganic(domain, database, limit);
      }
    );
    
    competitorsMode.registerTool(competitorsTool);
    this.registerMode(competitorsMode);
  }

  /**
   * Initialize the Traffic mode with its tools
   */
  private initializeTrafficMode(): void {
    const trafficMode = new BaseMode('traffic', 'Domain traffic tools');
    
    // Traffic Summary tool
    const trafficSummaryTool = new BaseTool(
      'traffic_summary',
      'Get traffic summary for up to 5 domains (10 API units per line)',
      unifiedToolRegistry.getToolSchema('traffic_summary'),
      async (params) => {
        const { domains, country } = params;
        return await semrushApi.getTrafficSummary(domains, country);
      }
    );
    
    // Traffic Sources tool
    const trafficSourcesTool = new BaseTool(
      'traffic_sources',
      'Get traffic sources for a domain (10 API units per line)',
      unifiedToolRegistry.getToolSchema('traffic_sources'),
      async (params) => {
        const { domain, country } = params;
        return await semrushApi.getTrafficSources(domain, country);
      }
    );
    
    trafficMode.registerTool(trafficSummaryTool);
    trafficMode.registerTool(trafficSourcesTool);
    this.registerMode(trafficMode);
  }

  /**
   * Initialize the Backlinks mode with its tools
   */
  private initializeBacklinksMode(): void {
    const backlinksMode = new BaseMode('backlinks', 'Domain backlinks tools');
    
    // Backlinks tool
    const backlinksTool = new BaseTool(
      'backlinks',
      'Get backlinks for a domain or URL (10 API units per line)',
      unifiedToolRegistry.getToolSchema('backlinks'),
      async (params) => {
        const { target, limit } = params;
        return await semrushApi.getBacklinks(target, limit);
      }
    );
    
    // Backlinks Domains tool
    const backlinksDomainsTool = new BaseTool(
      'backlinks_domains',
      'Get referring domains for a domain or URL (10 API units per line)',
      unifiedToolRegistry.getToolSchema('backlinks_domains'),
      async (params) => {
        const { target, limit } = params;
        return await semrushApi.getBacklinksDomains(target, limit);
      }
    );
    
    backlinksMode.registerTool(backlinksTool);
    backlinksMode.registerTool(backlinksDomainsTool);
    this.registerMode(backlinksMode);
  }
}
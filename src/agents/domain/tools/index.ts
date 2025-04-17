/**
 * Domain Tools Index
 * 
 * Exports all domain tools and their execution functions for easy import in the domain agent.
 */

// Tool definitions
import { domain_ranks } from './domain_ranks.js';
import { domain_competitors } from './domain_competitors.js';
import { backlinks } from './backlinks.js';
import { backlinks_refdomains } from './backlinks_refdomains.js';

// Export tool definitions
export { domain_ranks, domain_competitors, backlinks, backlinks_refdomains };

// Define execution functions from tool definitions with type assertions for compatibility
export const executeDomainRanks = domain_ranks.execute as (params: Record<string, any>) => Promise<any>;
export const executeDomainCompetitors = domain_competitors.execute as (params: Record<string, any>) => Promise<any>;
export const executeBacklinks = backlinks.execute as (params: Record<string, any>) => Promise<any>;
export const executeBacklinksRefdomains = backlinks_refdomains.execute as (params: Record<string, any>) => Promise<any>;

// Tool execution map
export const toolExecutors: Record<string, (params: Record<string, any>) => Promise<any>> = {
  domain_ranks: executeDomainRanks,
  domain_competitors: executeDomainCompetitors,
  backlinks: executeBacklinks,
  backlinks_refdomains: executeBacklinksRefdomains
};

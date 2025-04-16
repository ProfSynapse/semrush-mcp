/**
 * Domain Tools Index
 * 
 * Exports all domain tools and their execution functions for easy import in the domain agent.
 */

// Tool definitions
export { domain_ranks } from './domain_ranks.js';
export { domain_competitors } from './domain_competitors.js';
export { backlinks } from './backlinks.js';
export { backlinks_refdomains } from './backlinks_refdomains.js';

// Import execution functions
import { executeDomainRanks as _executeDomainRanks } from './domain_ranks.js';
import { executeDomainCompetitors as _executeDomainCompetitors } from './domain_competitors.js';
import { executeBacklinks as _executeBacklinks } from './backlinks.js';
import { executeBacklinksRefdomains as _executeBacklinksRefdomains } from './backlinks_refdomains.js';

// Re-export execution functions
export const executeDomainRanks = _executeDomainRanks;
export const executeDomainCompetitors = _executeDomainCompetitors;
export const executeBacklinks = _executeBacklinks;
export const executeBacklinksRefdomains = _executeBacklinksRefdomains;

// Tool execution map
export const toolExecutors: Record<string, (params: Record<string, any>) => Promise<any>> = {
  domain_ranks: executeDomainRanks,
  domain_competitors: executeDomainCompetitors,
  backlinks: executeBacklinks,
  backlinks_refdomains: executeBacklinksRefdomains
};

/**
 * Domain BCP
 * 
 * Provides tools for domain analysis, including domain ranks and competitors.
 * This BCP is focused on providing high-level domain metrics and competitive
 * analysis capabilities.
 */

import { BCP } from '../../core/types.js';
import { tool as ranksTools } from './ranks.tool.js';
import { tool as competitorsTools } from './competitors.tool.js';

/**
 * Domain BCP definition
 */
export const bcp: BCP = {
  domain: 'Domain',
  description: 'Domain analysis tools for SEO metrics and competitive analysis',
  tools: [
    ranksTools,
    competitorsTools
  ]
};

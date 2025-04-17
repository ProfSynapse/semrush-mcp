/**
 * Keyword BCP
 * 
 * Provides tools for keyword research and analysis, including keyword overview,
 * related keywords, and keyword difficulty.
 * This BCP is focused on providing comprehensive keyword data for SEO and content strategy.
 */

import { BCP } from '../../core/types.js';
import { tool as overviewTool } from './overview.tool.js';
import { tool as relatedTool } from './related.tool.js';
import { tool as difficultyTool } from './difficulty.tool.js';

/**
 * Keyword BCP definition
 */
export const bcp: BCP = {
  domain: 'Keyword',
  description: 'Keyword research and analysis tools for SEO and content strategy',
  tools: [
    overviewTool,
    relatedTool,
    difficultyTool
  ]
};

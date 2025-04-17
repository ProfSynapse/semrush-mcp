/**
 * Backlinks BCP
 * 
 * Provides tools for backlink analysis, including backlink lists and referring domains.
 * This BCP is focused on providing comprehensive backlink data for SEO analysis.
 */

import { BCP } from '../../core/types.js';
import { tool as listTool } from './list.tool.js';
import { tool as refdomainsTool } from './refdomains.tool.js';

/**
 * Backlinks BCP definition
 */
export const bcp: BCP = {
  domain: 'Backlinks',
  description: 'Backlink analysis tools for SEO and link building',
  tools: [
    listTool,
    refdomainsTool
  ]
};

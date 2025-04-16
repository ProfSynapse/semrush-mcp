/**
 * Batch Keyword Overview Tool
 * 
 * Analyzes up to 100 keywords at once.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createKeywordsArrayParam } from '../../../schemas/keyword-schemas.js';
import { createDatabaseParam } from '../../../schemas/domain-schemas.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for batch_keyword_overview
 */
export const batch_keyword_overview: ToolDefinition = {
  name: 'batch_keyword_overview',
  description: 'Analyze up to 100 keywords at once. IMPORTANT: This tool requires an ARRAY of keywords in the "keywords" parameter.',
  parameters: {
    keywords: createKeywordsArrayParam(100, true),
    database: createDatabaseParam(true)
  },
  examples: [
    {
      params: {
        keywords: ["digital marketing", "seo tools"],
        database: "us"
      }
    },
    {
      params: {
        keywords: ["content marketing", "link building", "keyword research"],
        database: "uk"
      }
    }
  ]
};

/**
 * Execute the batch_keyword_overview tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeBatchKeywordOverview(params: Record<string, any>): Promise<any> {
  const { keywords, database } = params;
  
  if (!Array.isArray(keywords)) {
    throw new Error('Keywords must be an array');
  }
  
  if (keywords.length > 100) {
    throw new Error('Maximum 100 keywords allowed');
  }
  
  if (keywords.length === 0) {
    throw new Error('At least one keyword is required');
  }
  
  return await semrushApi.getBatchKeywordOverview(keywords, database);
}

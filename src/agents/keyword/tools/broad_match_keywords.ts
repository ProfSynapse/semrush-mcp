/**
 * Broad Match Keywords Tool
 * 
 * Provides broad match and alternative queries.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createKeywordParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for broad_match_keywords
 */
export const broad_match_keywords: ToolDefinition = {
  name: 'broad_match_keywords',
  description: 'Get broad match and alternative queries. USAGE: Pass a single keyword string.',
  parameters: {
    keyword: createKeywordParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [{
    params: {
      keyword: "example keyword",
      database: "us",
      limit: 10
    }
  }]
};

/**
 * Execute the broad_match_keywords tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeBroadMatchKeywords(params: Record<string, any>): Promise<any> {
  const { keyword, database = 'us', limit } = params;
  
  if (!keyword) {
    throw new Error('Keyword is required');
  }
  
  return await semrushApi.getBroadMatchKeywords(keyword, database, limit);
}

/**
 * Related Keywords Tool
 * 
 * Provides semantically related keywords.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createKeywordParam } from '../../../schemas/keyword-schemas.js';
import { createDatabaseParam, createLimitParam } from '../../../schemas/domain-schemas.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for related_keywords
 */
export const related_keywords: ToolDefinition = {
  name: 'related_keywords',
  description: 'Get semantically related keywords. USAGE: Pass a single keyword string. NOTE: This tool was previously called "keyword_suggestions" in some documentation.',
  parameters: {
    keyword: createKeywordParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [
    {
      params: {
        keyword: "digital marketing",
        database: "us",
        limit: 10
      }
    },
    {
      params: {
        keyword: "seo tools",
        database: "uk",
        limit: 50
      }
    }
  ]
};

/**
 * Execute the related_keywords tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeRelatedKeywords(params: Record<string, any>): Promise<any> {
  const { keyword, database = 'us', limit } = params;
  
  if (!keyword) {
    throw new Error('Keyword is required');
  }
  
  return await semrushApi.getRelatedKeywords(keyword, database, limit);
}

/**
 * Keyword Overview Tool
 * 
 * Provides search volume and metrics for a keyword.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createKeywordParam } from '../../../schemas/keyword-schemas.js';
import { createDatabaseParam } from '../../../schemas/domain-schemas.js';
import { createBooleanParam } from '../../../schemas/base-schema.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for keyword_overview
 */
export const keyword_overview: ToolDefinition = {
  name: 'keyword_overview',
  description: 'Get search volume and metrics for a keyword. USAGE: Pass a single keyword string.',
  parameters: {
    keyword: createKeywordParam(true),
    database: createDatabaseParam(false),
    restrict_to_db: createBooleanParam({
      description: 'Search in single database only. When true, only searches the specified database. When false, may return results from multiple databases.',
      required: false,
      options: { default: false }
    })
  },
  examples: [
    {
      params: {
        keyword: "digital marketing",
        database: "us"
      }
    },
    {
      params: {
        keyword: "seo tools",
        database: "uk",
        restrict_to_db: true
      }
    }
  ]
};

/**
 * Execute the keyword_overview tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeKeywordOverview(params: Record<string, any>): Promise<any> {
  const { keyword, database = 'us', restrict_to_db = false } = params;
  
  if (!keyword) {
    throw new Error('Keyword is required');
  }
  
  if (restrict_to_db) {
    return await semrushApi.getKeywordOverviewSingleDb(keyword, database);
  } else {
    return await semrushApi.getKeywordOverview(keyword, database);
  }
}

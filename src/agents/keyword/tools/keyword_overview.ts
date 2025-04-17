/**
 * Keyword Overview Tool
 * 
 * Provides search volume and metrics for a keyword.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createKeywordParam, createDatabaseParam } from '../../../validation/parameter-helpers.js';

/**
 * Keyword overview tool parameter interface
 */
interface KeywordOverviewParams extends ToolParameters {
  keyword: ReturnType<typeof createKeywordParam>;
  database: ReturnType<typeof createDatabaseParam>;
  restrict_to_db: ReturnType<typeof createParam.boolean>;
}

/**
 * Tool definition for keyword_overview
 */
export const keyword_overview: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.OVERVIEW, KeywordOverviewParams> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.OVERVIEW,
  name: 'keyword_overview',
  description: 'Get search volume and metrics for a keyword. USAGE: Pass a single keyword string.',
  parameters: {
    keyword: createKeywordParam(true),
    database: createDatabaseParam(false),
    restrict_to_db: createParam.boolean({
      description: 'Search in single database only. When true, only searches the specified database. When false, may return results from multiple databases.',
      required: false,
      default: false
    })
  },
  examples: [
    {
      description: 'Get keyword overview for digital marketing',
      params: {
        keyword: "digital marketing",
        database: "us",
        restrict_to_db: false
      }
    },
    {
      description: 'Get keyword overview with restricted database',
      params: {
        keyword: "seo tools",
        database: "uk",
        restrict_to_db: true
      }
    }
  ],
  execute: async (params: ValidatedParams<KeywordOverviewParams>): Promise<any> => {
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
};

/**
 * Related Keywords Tool
 * 
 * Provides semantically related keywords.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createKeywordParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';

/**
 * Related keywords tool parameter interface
 */
interface RelatedKeywordsParams extends ToolParameters {
  keyword: ReturnType<typeof createKeywordParam>;
  database: ReturnType<typeof createDatabaseParam>;
  limit: ReturnType<typeof createLimitParam>;
}

/**
 * Tool definition for related_keywords
 */
export const related_keywords: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.RESEARCH, RelatedKeywordsParams> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.RESEARCH,
  name: 'related_keywords',
  description: 'Get semantically related keywords. USAGE: Pass a single keyword string. NOTE: This tool was previously called "keyword_suggestions" in some documentation.',
  parameters: {
    keyword: createKeywordParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [
    {
      description: 'Get related keywords for digital marketing',
      params: {
        keyword: "digital marketing",
        database: "us",
        limit: 10
      }
    },
    {
      description: 'Get related keywords with custom database',
      params: {
        keyword: "seo tools",
        database: "uk",
        limit: 50
      }
    }
  ],
  execute: async (params: ValidatedParams<RelatedKeywordsParams>): Promise<any> => {
    const { keyword, database = 'us', limit } = params;
    
    if (!keyword) {
      throw new Error('Keyword is required');
    }
    
    return await semrushApi.getRelatedKeywords(keyword, database, limit);
  }
};

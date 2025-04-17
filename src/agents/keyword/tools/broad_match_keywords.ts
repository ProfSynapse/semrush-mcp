/**
 * Broad Match Keywords Tool
 * 
 * Provides broad match and alternative queries.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createKeywordParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';

/**
 * Broad match keywords tool parameter interface
 */
interface BroadMatchKeywordsParams extends ToolParameters {
  keyword: ReturnType<typeof createKeywordParam>;
  database: ReturnType<typeof createDatabaseParam>;
  limit: ReturnType<typeof createLimitParam>;
}

/**
 * Tool definition for broad_match_keywords
 */
export const broad_match_keywords: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.RESEARCH, BroadMatchKeywordsParams> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.RESEARCH,
  name: 'broad_match_keywords',
  description: 'Get broad match and alternative queries. USAGE: Pass a single keyword string.',
  parameters: {
    keyword: createKeywordParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [{
    description: 'Get broad match keywords',
    params: {
      keyword: "example keyword",
      database: "us",
      limit: 10
    }
  }],
  execute: async (params: ValidatedParams<BroadMatchKeywordsParams>): Promise<any> => {
    const { keyword, database = 'us', limit } = params;
    
    if (!keyword) {
      throw new Error('Keyword is required');
    }
    
    return await semrushApi.getBroadMatchKeywords(keyword, database, limit);
  }
};

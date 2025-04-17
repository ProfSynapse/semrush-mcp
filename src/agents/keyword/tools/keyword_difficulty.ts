/**
 * Keyword Difficulty Tool
 * 
 * Provides ranking difficulty scores for up to 100 keywords.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createDatabaseParam, createKeywordsArrayParam } from '../../../validation/parameter-helpers.js';

/**
 * Keyword difficulty tool parameter interface
 */
interface KeywordDifficultyParams extends ToolParameters {
  keywords: ReturnType<typeof createKeywordsArrayParam>;
  database: ReturnType<typeof createDatabaseParam>;
}

/**
 * Tool definition for keyword_difficulty
 */
export const keyword_difficulty: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.RESEARCH, KeywordDifficultyParams> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.RESEARCH,
  name: 'keyword_difficulty',
  description: 'Get ranking difficulty scores for up to 100 keywords. IMPORTANT: This tool requires an ARRAY of keywords in the "keywords" parameter, not a single string. EXAMPLE: Use ["keyword1", "keyword2"] not "keyword".',
  parameters: {
    keywords: createKeywordsArrayParam(100, true),
    database: createDatabaseParam(true)
  },
  examples: [{
    description: 'Get keyword difficulty scores',
    params: {
      keywords: ["keyword1", "keyword2"],
      database: "us"
    }
  }],
  execute: async (params: ValidatedParams<KeywordDifficultyParams>): Promise<any> => {
    const { keywords, database } = params;
    
    // Ensure keywords is an array
    if (!Array.isArray(keywords)) {
      throw new Error('Keywords must be provided as an array');
    }
    
    if (keywords.length > 100) {
      throw new Error('Maximum 100 keywords allowed');
    }
    
    if (keywords.length === 0) {
      throw new Error('At least one keyword is required');
    }
    
    return await semrushApi.getKeywordDifficulty(keywords, database);
  }
};

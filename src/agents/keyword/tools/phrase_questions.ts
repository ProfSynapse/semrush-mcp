/**
 * Phrase Questions Tool
 * 
 * Provides question-based keywords.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createKeywordParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';

/**
 * Phrase questions tool parameter interface
 */
interface PhraseQuestionsParams extends ToolParameters {
  keyword: ReturnType<typeof createKeywordParam>;
  database: ReturnType<typeof createDatabaseParam>;
  limit: ReturnType<typeof createLimitParam>;
}

/**
 * Tool definition for phrase_questions
 */
export const phrase_questions: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.RESEARCH, PhraseQuestionsParams> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.RESEARCH,
  name: 'phrase_questions',
  description: 'Get question-based keywords. USAGE: Pass a single keyword string.',
  parameters: {
    keyword: createKeywordParam(true),
    database: createDatabaseParam(false),
    limit: createLimitParam(false)
  },
  examples: [{
    description: 'Get question-based keywords',
    params: {
      keyword: "example keyword",
      database: "us",
      limit: 10
    }
  }],
  execute: async (params: ValidatedParams<PhraseQuestionsParams>): Promise<any> => {
    const { keyword, database = 'us', limit } = params;
    
    if (!keyword) {
      throw new Error('Keyword is required');
    }
    
    return await semrushApi.getPhraseQuestions(keyword, database, limit);
  }
};

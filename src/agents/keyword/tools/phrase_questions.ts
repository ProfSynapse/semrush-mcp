/**
 * Phrase Questions Tool
 * 
 * Provides question-based keywords.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createKeywordParam, createDatabaseParam, createLimitParam } from '../../../validation/parameter-helpers.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for phrase_questions
 */
export const phrase_questions: ToolDefinition = {
  name: 'phrase_questions',
  description: 'Get question-based keywords. USAGE: Pass a single keyword string.',
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
 * Execute the phrase_questions tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executePhraseQuestions(params: Record<string, any>): Promise<any> {
  const { keyword, database = 'us', limit } = params;
  
  if (!keyword) {
    throw new Error('Keyword is required');
  }
  
  return await semrushApi.getPhraseQuestions(keyword, database, limit);
}

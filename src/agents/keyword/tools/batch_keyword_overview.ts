/**
 * Batch Keyword Overview Tool
 * 
 * Analyzes up to 100 keywords at once.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createKeywordsArrayParam, createDatabaseParam } from '../../../validation/parameter-helpers.js';

/**
 * Batch keyword overview tool parameter interface
 */
interface BatchKeywordOverviewParams extends ToolParameters {
  keywords: ReturnType<typeof createKeywordsArrayParam>;
  database: ReturnType<typeof createDatabaseParam>;
}

/**
 * Tool definition for batch_keyword_overview
 */
export const batch_keyword_overview: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.OVERVIEW, BatchKeywordOverviewParams> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.OVERVIEW,
  name: 'batch_keyword_overview',
  description: 'Analyze up to 100 keywords at once. IMPORTANT: This tool requires an ARRAY of keywords in the "keywords" parameter.',
  parameters: {
    keywords: createKeywordsArrayParam(100, true),
    database: createDatabaseParam(true)
  },
  examples: [
    {
      description: 'Analyze multiple keywords at once',
      params: {
        keywords: ["digital marketing", "seo tools"],
        database: "us"
      }
    },
    {
      description: 'Analyze multiple keywords with custom database',
      params: {
        keywords: ["content marketing", "link building", "keyword research"],
        database: "uk"
      }
    }
  ],
  execute: async (params: ValidatedParams<BatchKeywordOverviewParams>): Promise<any> => {
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
};

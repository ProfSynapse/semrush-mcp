/**
 * Keyword Difficulty Tool
 * 
 * Provides ranking difficulty scores for up to 100 keywords.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createDatabaseParam } from '../../../validation/parameter-helpers.js';
import { transformations } from '../../../validation/unified-tool-registry.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for keyword_difficulty
 */
export const keyword_difficulty: ToolDefinition = {
  name: 'keyword_difficulty',
  description: 'Get ranking difficulty scores for up to 100 keywords. IMPORTANT: This tool requires an ARRAY of keywords in the "keywords" parameter, not a single string. EXAMPLE: Use ["keyword1", "keyword2"] not "keyword".',
  parameters: {
    keywords: {
      type: 'array',
      description: 'Array of keywords to analyze (max 100). MUST be an array like ["keyword1", "keyword2"], not a single string.',
      required: true,
      maxItems: 100,
      minItems: 1,
      transform: (value: any) => {
        if (typeof value === 'string') {
          return value.split(/[;,]/).map(k => k.trim());
        }
        return Array.isArray(value) ? value : [value];
      }
    },
    database: createDatabaseParam(true)
  },
  examples: [{
    params: {
      keywords: ["keyword1", "keyword2"],
      database: "us"
    }
  }]
};

/**
 * Execute the keyword_difficulty tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeKeywordDifficulty(params: Record<string, any>): Promise<any> {
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

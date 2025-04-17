/**
 * Keyword Difficulty Tool
 * 
 * Provides difficulty scores for keywords, indicating how hard it would be
 * to rank for them in organic search results.
 */

import { ToolDefinition } from '../../core/types.js';
import { createSemrushApiClient } from '../../core/api-client.js';

/**
 * Keyword difficulty tool definition
 */
export const tool: ToolDefinition = {
  name: 'difficulty',
  description: 'Get difficulty scores for keywords',
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description: 'Keyword to analyze difficulty',
        minLength: 1,
        maxLength: 255
      },
      database: {
        type: 'string',
        description: 'Database to use',
        enum: ['us', 'uk', 'ca', 'au'],
        default: 'us'
      }
    },
    required: ['keyword']
  },
  handler: async (params) => {
    // Get API key from environment or Claude Desktop
    const apiKey = process.env.SEMRUSH_API_KEY || 'api-key-from-claude-desktop';
    
    // Create API client
    const apiClient = createSemrushApiClient(apiKey);
    
    // Get keyword difficulty data
    const { keyword, database = 'us' } = params;
    
    if (!keyword) {
      throw new Error('Keyword is required');
    }
    
    return await apiClient.getKeywordDifficulty(keyword, database);
  }
};

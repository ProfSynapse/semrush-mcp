/**
 * Keyword Overview Tool
 * 
 * Provides comprehensive data about a keyword, including search volume,
 * keyword difficulty, CPC, and other metrics.
 */

import { ToolDefinition } from '../../core/types.js';
import { createSemrushApiClient } from '../../core/api-client.js';

/**
 * Keyword overview tool definition
 */
export const tool: ToolDefinition = {
  name: 'overview',
  description: 'Get comprehensive data about a keyword',
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description: 'Keyword to analyze',
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
    
    // Get keyword overview data
    const { keyword, database = 'us' } = params;
    
    if (!keyword) {
      throw new Error('Keyword is required');
    }
    
    return await apiClient.getKeywordOverview(keyword, database);
  }
};

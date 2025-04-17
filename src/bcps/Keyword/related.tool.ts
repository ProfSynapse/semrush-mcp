/**
 * Related Keywords Tool
 * 
 * Provides a list of related keywords for a seed keyword, including search volume,
 * keyword difficulty, and other metrics.
 */

import { ToolDefinition } from '../../core/types.js';
import { createSemrushApiClient } from '../../core/api-client.js';

/**
 * Related keywords tool definition
 */
export const tool: ToolDefinition = {
  name: 'related',
  description: 'Get a list of related keywords for a seed keyword',
  inputSchema: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description: 'Seed keyword to find related terms',
        minLength: 1,
        maxLength: 255
      },
      database: {
        type: 'string',
        description: 'Database to use',
        enum: ['us', 'uk', 'ca', 'au'],
        default: 'us'
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of related keywords to return',
        minimum: 1,
        maximum: 1000,
        default: 100
      }
    },
    required: ['keyword']
  },
  handler: async (params) => {
    // Get API key from environment or Claude Desktop
    const apiKey = process.env.SEMRUSH_API_KEY || 'api-key-from-claude-desktop';
    
    // Create API client
    const apiClient = createSemrushApiClient(apiKey);
    
    // Get related keywords data
    const { keyword, database = 'us', limit = 100 } = params;
    
    if (!keyword) {
      throw new Error('Keyword is required');
    }
    
    return await apiClient.getRelatedKeywords(keyword, database, limit);
  }
};

/**
 * Backlinks List Tool
 * 
 * Provides a list of backlinks for a target domain, including source URLs,
 * anchor text, and other metrics.
 */

import { ToolDefinition } from '../../core/types.js';
import { createSemrushApiClient } from '../../core/api-client.js';

/**
 * Backlinks list tool definition
 */
export const tool: ToolDefinition = {
  name: 'list',
  description: 'Get a list of backlinks for a target domain',
  inputSchema: {
    type: 'object',
    properties: {
      target: {
        type: 'string',
        description: 'Target domain or URL to analyze (without http/https)',
        pattern: '^([a-z0-9-]+\\.)+[a-z]{2,}$'
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of backlinks to return',
        minimum: 1,
        maximum: 1000,
        default: 100
      }
    },
    required: ['target']
  },
  handler: async (params) => {
    // Get API key from environment or Claude Desktop
    const apiKey = process.env.SEMRUSH_API_KEY || 'api-key-from-claude-desktop';
    
    // Create API client
    const apiClient = createSemrushApiClient(apiKey);
    
    // Get backlinks data
    const { target, limit = 100 } = params;
    
    if (!target) {
      throw new Error('Target domain is required');
    }
    
    return await apiClient.getBacklinks(target, limit);
  }
};

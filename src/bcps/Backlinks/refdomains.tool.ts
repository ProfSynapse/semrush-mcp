/**
 * Backlinks Referring Domains Tool
 * 
 * Provides a list of referring domains for a target domain, including
 * domain authority, number of backlinks, and other metrics.
 */

import { ToolDefinition } from '../../core/types.js';
import { createSemrushApiClient } from '../../core/api-client.js';

/**
 * Backlinks referring domains tool definition
 */
export const tool: ToolDefinition = {
  name: 'refdomains',
  description: 'Get a list of referring domains for a target domain',
  inputSchema: {
    type: 'object',
    properties: {
      target: {
        type: 'string',
        description: 'Target domain to analyze (without http/https)',
        pattern: '^([a-z0-9-]+\\.)+[a-z]{2,}$'
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of referring domains to return',
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
    
    // Get referring domains data
    const { target, limit = 100 } = params;
    
    if (!target) {
      throw new Error('Target domain is required');
    }
    
    return await apiClient.getBacklinksRefdomains(target, limit);
  }
};

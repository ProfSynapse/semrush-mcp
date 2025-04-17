/**
 * Domain Ranks Tool
 * 
 * Provides domain rank metrics including traffic, keywords, and rankings.
 */

import { ToolDefinition } from '../../core/types.js';
import { createSemrushApiClient } from '../../core/api-client.js';

/**
 * Domain ranks tool definition
 */
export const tool: ToolDefinition = {
  name: 'ranks',
  description: 'Get domain rank metrics including traffic, keywords, and rankings',
  inputSchema: {
    type: 'object',
    properties: {
      domain: {
        type: 'string',
        description: 'Target domain to analyze (without http/https)',
        pattern: '^([a-z0-9-]+\\.)+[a-z]{2,}$'
      },
      database: {
        type: 'string',
        description: 'Database to use',
        enum: ['us', 'uk', 'ca', 'au'],
        default: 'us'
      }
    },
    required: ['domain']
  },
  handler: async (params) => {
    // Get API key from environment or Claude Desktop
    const apiKey = process.env.SEMRUSH_API_KEY || 'api-key-from-claude-desktop';
    
    // Create API client
    const apiClient = createSemrushApiClient(apiKey);
    
    // Get domain overview data
    const { domain, database = 'us' } = params;
    
    if (!domain) {
      throw new Error('Domain is required');
    }
    
    return await apiClient.getDomainOverview(domain, database);
  }
};

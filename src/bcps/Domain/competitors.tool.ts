/**
 * Domain Competitors Tool
 * 
 * Provides competitive analysis for a domain, identifying similar websites
 * and their metrics.
 */

import { ToolDefinition } from '../../core/types.js';
import { createSemrushApiClient } from '../../core/api-client.js';

/**
 * Domain competitors tool definition
 */
export const tool: ToolDefinition = {
  name: 'competitors',
  description: 'Get domain competitors and their metrics',
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
      },
      limit: {
        type: 'integer',
        description: 'Maximum number of competitors to return',
        minimum: 1,
        maximum: 100,
        default: 10
      }
    },
    required: ['domain']
  },
  handler: async (params) => {
    // Get API key from environment or Claude Desktop
    const apiKey = process.env.SEMRUSH_API_KEY || 'api-key-from-claude-desktop';
    
    // Create API client
    const apiClient = createSemrushApiClient(apiKey);
    
    // Get domain competitors data
    const { domain, database = 'us', limit = 10 } = params;
    
    if (!domain) {
      throw new Error('Domain is required');
    }
    
    return await apiClient.getDomainCompetitors(domain, database, limit);
  }
};

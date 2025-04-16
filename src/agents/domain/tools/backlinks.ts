/**
 * Backlinks Tool
 * 
 * Provides backlinks for a domain or URL.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createTargetParam, createLimitParam } from '../../../schemas/domain-schemas.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for backlinks
 */
export const backlinks: ToolDefinition = {
  name: 'backlinks',
  description: 'Get backlinks for a domain or URL. NOTE: The correct tool name is "backlinks", not "backlinks_overview".',
  parameters: {
    target: createTargetParam(true),
    limit: createLimitParam(false)
  },
  examples: [
    {
      params: {
        target: "example.com",
        limit: 10
      }
    },
    {
      params: {
        target: "example.com/blog",
        limit: 50
      }
    }
  ]
};

/**
 * Execute the backlinks tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeBacklinks(params: Record<string, any>): Promise<any> {
  const { target, limit } = params;
  
  if (!target) {
    throw new Error('Target domain or URL is required for backlinks analysis');
  }
  
  return await semrushApi.getBacklinks(target, undefined, limit);
}

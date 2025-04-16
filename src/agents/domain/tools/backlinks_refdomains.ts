/**
 * Backlinks Referring Domains Tool
 * 
 * Provides referring domains for a domain or URL.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createTargetParam, createLimitParam } from '../../../schemas/domain-schemas.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

/**
 * Tool definition for backlinks_refdomains
 */
export const backlinks_refdomains: ToolDefinition = {
  name: 'backlinks_refdomains',
  description: 'Get referring domains for a domain or URL. NOTE: Available backlinks tools are "backlinks" and "backlinks_refdomains".',
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
 * Execute the backlinks_refdomains tool
 * @param params Tool parameters
 * @returns Tool execution result
 */
export async function executeBacklinksRefdomains(params: Record<string, any>): Promise<any> {
  const { target, limit } = params;
  
  if (!target) {
    throw new Error('Target domain or URL is required for backlinks domains analysis');
  }
  
  return await semrushApi.getBacklinksDomains(target, undefined, limit);
}

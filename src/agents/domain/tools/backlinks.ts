/**
 * Backlinks Tool
 * 
 * Provides backlinks for a domain or URL.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, DomainMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createTargetParam, createLimitParam } from '../../../validation/parameter-helpers.js';

/**
 * Backlinks tool parameter interface
 */
interface BacklinksParams extends ToolParameters {
  target: ReturnType<typeof createTargetParam>;
  limit: ReturnType<typeof createLimitParam>;
}

/**
 * Tool definition for backlinks
 */
export const backlinks: TypedToolDefinition<AgentType.DOMAIN, DomainMode.BACKLINKS, BacklinksParams> = {
  agent: AgentType.DOMAIN,
  mode: DomainMode.BACKLINKS,
  name: 'backlinks',
  description: 'Get backlinks for a domain or URL. NOTE: The correct tool name is "backlinks", not "backlinks_overview".',
  parameters: {
    target: createTargetParam(true),
    limit: createLimitParam(false)
  },
  examples: [
    {
      description: 'Get backlinks for example.com',
      params: {
        target: "example.com",
        limit: 10
      }
    },
    {
      description: 'Get backlinks for a specific page',
      params: {
        target: "example.com/blog",
        limit: 50
      }
    }
  ],
  execute: async (params: ValidatedParams<BacklinksParams>): Promise<any> => {
    const { target, limit } = params;
    
    if (!target) {
      throw new Error('Target domain or URL is required for backlinks analysis');
    }
    
    return await semrushApi.getBacklinks(target, undefined, limit);
  }
};

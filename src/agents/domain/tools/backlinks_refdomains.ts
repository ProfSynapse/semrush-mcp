/**
 * Backlinks Referring Domains Tool
 * 
 * Provides referring domains for a domain or URL.
 */

import { semrushApi } from '../../../semrush-api.js';
import { createParam, AgentType, DomainMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
import { createTargetParam, createLimitParam } from '../../../validation/parameter-helpers.js';

/**
 * Backlinks referring domains tool parameter interface
 */
interface BacklinksRefdomainsParams extends ToolParameters {
  target: ReturnType<typeof createTargetParam>;
  limit: ReturnType<typeof createLimitParam>;
}

/**
 * Tool definition for backlinks_refdomains
 */
export const backlinks_refdomains: TypedToolDefinition<AgentType.DOMAIN, DomainMode.BACKLINKS, BacklinksRefdomainsParams> = {
  agent: AgentType.DOMAIN,
  mode: DomainMode.BACKLINKS,
  name: 'backlinks_refdomains',
  description: 'Get referring domains for a domain or URL. NOTE: Available backlinks tools are "backlinks" and "backlinks_refdomains".',
  parameters: {
    target: createTargetParam(true),
    limit: createLimitParam(false)
  },
  examples: [
    {
      description: 'Get referring domains for example.com',
      params: {
        target: "example.com",
        limit: 10
      }
    },
    {
      description: 'Get referring domains for a specific page',
      params: {
        target: "example.com/blog",
        limit: 50
      }
    }
  ],
  execute: async (params: ValidatedParams<BacklinksRefdomainsParams>): Promise<any> => {
    const { target, limit } = params;
    
    if (!target) {
      throw new Error('Target domain or URL is required for backlinks domains analysis');
    }
    
    return await semrushApi.getBacklinksDomains(target, undefined, limit);
  }
};

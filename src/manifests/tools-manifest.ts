/**
 * Tool Manifest System
 * Provides a strongly-typed, single source of truth for tool definitions.
 * This manifest is used to generate type-safe tool implementations and documentation.
 */

import {
  AgentType,
  DomainMode,
  KeywordMode,
  TypeName,
  createParam,
  ToolParameters,
  ToolExample,
  TypedParameter
} from '../types/tool-types.js';

/**
 * Type-safe tool key mapping
 */
// Type aliases for the manifests
type DomainTools = typeof domainToolsManifest;
type KeywordTools = typeof keywordToolsManifest;

// Supported modes for each agent
export type ImplementedDomainModes = keyof DomainTools;
export type ImplementedKeywordModes = keyof KeywordTools;

// Tool names for each mode
export type DomainModeTools<M extends ImplementedDomainModes> = keyof DomainTools[M];
export type KeywordModeTools<M extends ImplementedKeywordModes> = keyof KeywordTools[M];

/**
 * Manifest for Domain Agent Tools
 */
export const domainToolsManifest = {
  [DomainMode.BACKLINKS]: {
    backlinks: {
      name: 'backlinks',
      description: 'Get backlink data for a domain',
      parameters: {
        target: createParam.string({
          description: 'Target domain to analyze',
          required: true,
          pattern: /^([a-z0-9-]+\.)+[a-z]{2,}$/,
          examples: ['example.com']
        }),
        limit: createParam.integer({
          description: 'Maximum number of results to return',
          required: false,
          minimum: 1,
          maximum: 1000,
          default: 100
        })
      },
      examples: [
        {
          description: 'Get backlinks for example.com',
          params: {
            target: 'example.com',
            limit: 100
          }
        }
      ]
    },
    backlinks_refdomains: {
      name: 'backlinks_refdomains',
      description: 'Get referring domains for a target domain',
      parameters: {
        target: createParam.string({
          description: 'Target domain to analyze',
          required: true,
          pattern: /^([a-z0-9-]+\.)+[a-z]{2,}$/
        })
      },
      examples: [
        {
          description: 'Get referring domains for example.com',
          params: {
            target: 'example.com'
          }
        }
      ]
    }
  },
  [DomainMode.OVERVIEW]: {
    domain_ranks: {
      name: 'domain_ranks',
      description: 'Get ranking metrics for a domain',
      parameters: {
        target: createParam.string({
          description: 'Target domain to analyze',
          required: true,
          pattern: /^([a-z0-9-]+\.)+[a-z]{2,}$/
        }),
        export_columns: createParam.array({
          description: 'Columns to include in the response',
          required: false,
          minItems: 1,
          default: ['domain', 'rank']
        })
      },
      examples: [
        {
          description: 'Get domain ranks for example.com',
          params: {
            target: 'example.com',
            export_columns: ['domain', 'rank', 'organic_keywords']
          }
        }
      ]
    }
  }
} as const;

/**
 * Manifest for Keyword Agent Tools
 */
export const keywordToolsManifest = {
  [KeywordMode.OVERVIEW]: {
    keyword_overview: {
      name: 'keyword_overview',
      description: 'Get overview data for a keyword',
      parameters: {
        keyword: createParam.string({
          description: 'Keyword to analyze',
          required: true,
          minLength: 1,
          maxLength: 255
        }),
        database: createParam.string({
          description: 'Database to use',
          required: false,
          enum: ['us', 'uk', 'ca', 'au'],
          default: 'us'
        })
      },
      examples: [
        {
          description: 'Get overview for "software development"',
          params: {
            keyword: 'software development',
            database: 'us'
          }
        }
      ]
    }
  },
  [KeywordMode.RESEARCH]: {
    related_keywords: {
      name: 'related_keywords',
      description: 'Find related keywords',
      parameters: {
        keyword: createParam.string({
          description: 'Seed keyword',
          required: true,
          minLength: 1,
          maxLength: 255
        }),
        limit: createParam.integer({
          description: 'Maximum number of results',
          required: false,
          minimum: 1,
          maximum: 1000,
          default: 100
        })
      },
      examples: [
        {
          description: 'Get related keywords for "software development"',
          params: {
            keyword: 'software development',
            limit: 50
          }
        }
      ]
    }
  }
} as const;

/**
 * Helper types for tool configuration
 */
export type ToolConfig<P extends ToolParameters> = {
  name: string;
  description: string;
  parameters: P;
  examples: ToolExample<P>[];
};

/**
 * Helper type to extract tool names for each mode
 */
export type DomainToolNames<M extends ImplementedDomainModes> = 
  keyof typeof domainToolsManifest[M];

export type KeywordToolNames<M extends ImplementedKeywordModes> = 
  keyof typeof keywordToolsManifest[M];

/**
 * Tool access functions with compile-time type checking
 */
export function getToolConfig<M extends DomainMode>(
  agent: AgentType.DOMAIN,
  mode: M,
  toolName: string
): ToolConfig<any> | undefined;
export function getToolConfig<M extends KeywordMode>(
  agent: AgentType.KEYWORD,
  mode: M,
  toolName: string
): ToolConfig<any> | undefined;
export function getToolConfig(
  agent: AgentType,
  mode: string,
  toolName: string
): ToolConfig<any> | undefined {
  const tools = agent === AgentType.DOMAIN ? domainToolsManifest : keywordToolsManifest;
  const modeTools = (tools as any)[mode];
  const tool = modeTools?.[toolName];
  
  if (tool) {
    return {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
      examples: Array.isArray(tool.examples) ? [...tool.examples] : []
    };
  }
  
  return undefined;
}

/**
 * Get all tools for a mode
 */
export function getModeTools<M extends DomainMode>(
  agent: AgentType.DOMAIN,
  mode: M
): Record<string, ToolConfig<any>>;
export function getModeTools<M extends KeywordMode>(
  agent: AgentType.KEYWORD,
  mode: M
): Record<string, ToolConfig<any>>;
export function getModeTools(
  agent: AgentType,
  mode: string
): Record<string, ToolConfig<any>> {
  const tools = agent === AgentType.DOMAIN ? domainToolsManifest : keywordToolsManifest;
  const modeTools = (tools as any)[mode];

  if (!modeTools) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(modeTools).map(([key, tool]: [string, any]) => [
      key,
      {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters,
        examples: Array.isArray(tool.examples) ? [...tool.examples] : []
      }
    ])
  );
}

/**
 * Type guard helpers
 */
export function isDomainTool(mode: string, tool: string): boolean {
  return mode in domainToolsManifest && tool in domainToolsManifest[mode as keyof typeof domainToolsManifest];
}

export function isKeywordTool(mode: string, tool: string): boolean {
  return mode in keywordToolsManifest && tool in keywordToolsManifest[mode as keyof typeof keywordToolsManifest];
}

/**
 * Tool Builder Module
 * Provides type-safe helpers for creating and registering tools
 */

import {
  AgentType,
  DomainMode,
  KeywordMode,
  ToolParameters,
  TypedParameter,
  ToolExample
} from '../types/tool-types.js';
import {
  ToolConfig
} from '../manifests/tools-manifest.js';
import { typedToolRegistry } from '../validation/typed-tool-registry.js';

/**
 * Tool builder interface with compile-time type checking
 */
export interface ToolBuilder<P extends ToolParameters> {
  setName(name: string): this;
  setDescription(description: string): this;
  setParameter<T>(
    name: string,
    parameter: TypedParameter<T>
  ): this;
  addExample(example: ToolExample<P>): this;
  build(): ToolConfig<P>;
}

/**
 * Create a new tool builder instance
 */
export function createToolBuilder<P extends ToolParameters>(): ToolBuilder<P> {
  const tool: Partial<ToolConfig<P>> = {
    parameters: {} as P,
    examples: []
  };

  return {
    setName(name: string) {
      tool.name = name;
      return this;
    },

    setDescription(description: string) {
      tool.description = description;
      return this;
    },

    setParameter<T>(name: string, parameter: TypedParameter<T>) {
      (tool.parameters as any)[name] = parameter;
      return this;
    },

    addExample(example: ToolExample<P>) {
      tool.examples!.push(example);
      return this;
    },

    build(): ToolConfig<P> {
      if (!tool.name || !tool.description) {
        throw new Error('Tool must have a name and description');
      }

      return tool as ToolConfig<P>;
    }
  };
}

/**
 * Helper to register a domain tool with type checking
 */
export function registerDomainTool<P extends ToolParameters>(
  mode: DomainMode,
  config: ToolConfig<P>,
  executor: (params: P) => Promise<any>
) {
  typedToolRegistry.register({
    agent: AgentType.DOMAIN,
    mode,
    ...config,
    execute: executor
  });
}

/**
 * Helper to register a keyword tool with type checking
 */
export function registerKeywordTool<P extends ToolParameters>(
  mode: KeywordMode,
  config: ToolConfig<P>,
  executor: (params: P) => Promise<any>
) {
  typedToolRegistry.register({
    agent: AgentType.KEYWORD,
    mode,
    ...config,
    execute: executor
  });
}

/**
 * Example usage:
 * 
 * interface MyToolParams {
 *   target: string;
 * }
 * 
 * const toolConfig = createToolBuilder<MyToolParams>()
 *   .setName('my_tool') 
 *   .setDescription('Does something cool')
 *   .setParameter('target', {
 *     type: TypeName.STRING,
 *     description: 'Target domain',
 *     required: true,
 *     pattern: /^([a-z0-9-]+\.)+[a-z]{2,}$/
 *   })
 *   .addExample({
 *     description: 'Basic example',
 *     params: {
 *       target: 'example.com'
 *     }
 *   })
 *   .build();
 * 
 * registerDomainTool(
 *   DomainMode.OVERVIEW, 
 *   toolConfig,
 *   async (params) => {
 *     // Implementation
 *     return { success: true };
 *   }
 * );
 */

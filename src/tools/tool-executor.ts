/**
 * Tool Executor Module
 * Provides type-safe execution of tools with parameter validation
 */

import {
  AgentType,
  DomainMode,
  KeywordMode,
  ToolParameters,
  ValidatedParams,
  TypedToolDefinition,
  TypedParameter
} from '../types/tool-types.js';
import {
  ImplementedDomainModes,
  ImplementedKeywordModes,
  DomainModeTools,
  KeywordModeTools,
  domainToolsManifest,
  keywordToolsManifest
} from '../manifests/tools-manifest.js';
import { typedToolRegistry } from '../validation/typed-tool-registry.js';

/**
 * Helper types to extract param and result types from tools
 */
type ParamsOf<T> = T extends TypedToolDefinition<any, any, infer P> ? ValidatedParams<P> : never;
type ResultOf<T> = T extends TypedToolDefinition<any, any, any> 
  ? Awaited<ReturnType<T['execute']>>
  : never;

/**
 * Custom error class for tool execution failures
 */
export class ToolExecutionError extends Error {
  constructor(
    message: string,
    public readonly toolName: string,
    public readonly mode: string,
    public readonly params?: Record<string, any>,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'ToolExecutionError';
  }
}

/**
 * Function to validate tool parameters
 */
async function validateToolParams<T extends TypedToolDefinition<any, any, any>>(
  tool: T,
  params: Record<string, any>,
  mode: string
): Promise<ParamsOf<T>> {
  const validated: Record<string, any> = {};
  const paramDefs = tool.parameters as Record<string, TypedParameter>;

  // Validate all parameters
  for (const [key, param] of Object.entries(paramDefs)) {
    if (param.required && !(key in params)) {
      throw new ToolExecutionError(
        `Missing required parameter: ${key}`,
        tool.name,
        mode,
        params
      );
    }

    const value = params[key] ?? param.default;
    if (value !== undefined && !param.validate(value)) {
      throw new ToolExecutionError(
        `Invalid value for parameter ${key}`,
        tool.name,
        mode,
        params
      );
    }

    if (value !== undefined) {
      validated[key] = value;
    }
  }

  // Check for unknown parameters
  for (const key of Object.keys(params)) {
    if (!(key in paramDefs)) {
      throw new ToolExecutionError(
        `Unknown parameter: ${key}`,
        tool.name,
        mode,
        params
      );
    }
  }

  return validated as ParamsOf<T>;
}

/**
 * Type-safe tool execution for domain tools
 */
export async function executeDomainTool<
  M extends ImplementedDomainModes,
  T extends TypedToolDefinition<AgentType.DOMAIN, M, any>
>(
  mode: M,
  toolName: DomainModeTools<M>,
  params: Record<string, any>
): Promise<ResultOf<T>> {
  const tool = typedToolRegistry.getTool(
    AgentType.DOMAIN,
    mode,
    String(toolName)
  ) as TypedToolDefinition<AgentType.DOMAIN, M, any> | undefined;

  if (!tool) {
    throw new ToolExecutionError(
      `Tool not found: ${String(toolName)}`,
      String(toolName),
      mode
    );
  }

  try {
    const validatedParams = await validateToolParams(tool, params, mode);
    return await tool.execute(validatedParams) as ResultOf<T>;
  } catch (error) {
    if (error instanceof ToolExecutionError) {
      throw error;
    }
    throw new ToolExecutionError(
      `Failed to execute tool: ${String(error)}`,
      tool.name,
      mode,
      params,
      error
    );
  }
}

/**
 * Type-safe tool execution for keyword tools
 */
export async function executeKeywordTool<
  M extends ImplementedKeywordModes,
  T extends TypedToolDefinition<AgentType.KEYWORD, M, any>
>(
  mode: M,
  toolName: KeywordModeTools<M>,
  params: Record<string, any>
): Promise<ResultOf<T>> {
  const tool = typedToolRegistry.getTool(
    AgentType.KEYWORD,
    mode,
    String(toolName)
  ) as TypedToolDefinition<AgentType.KEYWORD, M, any> | undefined;

  if (!tool) {
    throw new ToolExecutionError(
      `Tool not found: ${String(toolName)}`,
      String(toolName),
      mode
    );
  }

  try {
    const validatedParams = await validateToolParams(tool, params, mode);
    return await tool.execute(validatedParams) as ResultOf<T>;
  } catch (error) {
    if (error instanceof ToolExecutionError) {
      throw error;
    }
    throw new ToolExecutionError(
      `Failed to execute tool: ${String(error)}`,
      tool.name,
      mode,
      params,
      error
    );
  }
}

/**
 * Utility function to check if a tool exists
 */
export function toolExists<M extends DomainMode | KeywordMode>(
  agent: AgentType,
  mode: M,
  toolName: string
): boolean {
  return typedToolRegistry.getTool(agent, mode, toolName) !== undefined;
}

/**
 * Get tool description with type safety
 */
export function getToolDescription<M extends DomainMode | KeywordMode>(
  agent: AgentType,
  mode: M,
  toolName: string
): string | undefined {
  const tool = typedToolRegistry.getTool(agent, mode, toolName);
  return tool?.description;
}

/**
 * Get tool parameter definitions with type safety
 */
export function getToolParameters<M extends DomainMode | KeywordMode>(
  agent: AgentType,
  mode: M,
  toolName: string
): Record<string, TypedParameter> | undefined {
  const tool = typedToolRegistry.getTool(agent, mode, toolName);
  return tool?.parameters as Record<string, TypedParameter> | undefined;
}

/**
 * Get available tools for a mode
 */
export function getAvailableTools<M extends DomainMode | KeywordMode>(
  agent: AgentType,
  mode: M
): string[] {
  if (agent === AgentType.DOMAIN) {
    const modeTools = mode in domainToolsManifest 
      ? domainToolsManifest[mode as keyof typeof domainToolsManifest]
      : {};
    return Object.keys(modeTools);
  }
  if (agent === AgentType.KEYWORD) {
    const modeTools = mode in keywordToolsManifest
      ? keywordToolsManifest[mode as keyof typeof keywordToolsManifest]
      : {};
    return Object.keys(modeTools);
  }
  return [];
}

/**
 * Get tool examples with type safety
 */
export function getToolExamples<M extends DomainMode | KeywordMode>(
  agent: AgentType,
  mode: M,
  toolName: string
): Array<{ description: string; params: Record<string, any> }> {
  const tool = typedToolRegistry.getTool(agent, mode, toolName);
  return tool?.examples || [];
}

/**
 * Get required parameters for a tool
 */
export function getRequiredParameters<M extends DomainMode | KeywordMode>(
  agent: AgentType,
  mode: M,
  toolName: string
): string[] {
  const params = getToolParameters(agent, mode, toolName);
  if (!params) return [];
  
  return Object.entries(params)
    .filter(([_, param]) => param.required)
    .map(([name]) => name);
}

/**
 * Get available modes for an agent
 */
export function getAvailableModes(agent: AgentType): string[] {
  if (agent === AgentType.DOMAIN) {
    return Object.keys(domainToolsManifest);
  }
  if (agent === AgentType.KEYWORD) {
    return Object.keys(keywordToolsManifest);
  }
  return [];
}

/**
 * Execute any tool with type safety
 */
export async function executeTool<T = any>(
  agent: AgentType,
  mode: DomainMode | KeywordMode,
  toolName: string,
  params: Record<string, any>
): Promise<T> {
  if (agent === AgentType.DOMAIN) {
    return executeDomainTool(
      mode as any,
      toolName as any,
      params
    ) as unknown as T;
  }
  if (agent === AgentType.KEYWORD) {
    return executeKeywordTool(
      mode as any,
      toolName as any,
      params
    ) as unknown as T;
  }
  throw new Error(`Invalid agent type: ${agent}`);
}

/**
 * Example usage:
 * 
 * try {
 *   // Get available modes and tools
 *   const modes = getAvailableModes(AgentType.DOMAIN);
 *   console.log('Available modes:', modes);
 *   
 *   const tools = getAvailableTools(AgentType.DOMAIN, DomainMode.BACKLINKS);
 *   console.log('Available tools:', tools);
 *   
 *   // Check if tool exists
 *   if (!toolExists(AgentType.DOMAIN, DomainMode.BACKLINKS, 'backlinks')) {
 *     throw new Error('Tool not available');
 *   }
 *   
 *   // Get tool info
 *   const requiredParams = getRequiredParameters(
 *     AgentType.DOMAIN, 
 *     DomainMode.BACKLINKS, 
 *     'backlinks'
 *   );
 *   console.log('Required parameters:', requiredParams);
 *   
 *   // Get examples
 *   const examples = getToolExamples(
 *     AgentType.DOMAIN,
 *     DomainMode.BACKLINKS,
 *     'backlinks'
 *   );
 *   console.log('Example usage:', examples[0].params);
 *   
 *   // Execute the tool with generic helper
 *   const result = await executeTool(
 *     AgentType.DOMAIN,
 *     DomainMode.BACKLINKS,
 *     'backlinks',
 *     {
 *       target: 'example.com',
 *       limit: 100
 *     }
 *   );
 *   
 *   // Or use the type-specific helper
 *   const result2 = await executeDomainTool(
 *     DomainMode.BACKLINKS,
 *     'backlinks',
 *     {
 *       target: 'example.com',
 *       limit: 100
 *     }
 *   );
 * } catch (error) {
 *   if (error instanceof ToolExecutionError) {
 *     console.error(
 *       `Tool execution failed:`,
 *       `\nTool: ${error.toolName}`,
 *       `\nMode: ${error.mode}`,
 *       `\nError: ${error.message}`,
 *       `\nParams:`, error.params
 *     );
 *   }
 *   throw error;
 * }
 */

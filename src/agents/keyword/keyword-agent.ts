import { AgentType, KeywordMode } from '../../types/tool-types.js';
import { typedToolRegistry } from '../../validation/typed-tool-registry.js';
import { overview, research, domain_keywords } from './modes/index.js';
import { toolExecutors } from './tools/index.js';
import { registerKeywordTool } from '../../tools/tool-builder.js';

/**
 * Keyword Analysis Agent
 * 
 * Provides tools for keyword research and analysis.
 * Tools are organized into modes:
 * - overview: Basic keyword metrics
 * - research: Keyword discovery and expansion
 * - domain_keywords: Domain-specific keyword tools
 */
export class KeywordAgent {
  constructor() {
    this.setupRegistry();
  }

  /**
   * Sets up the agent's tools and modes in the typed registry
   */
  private setupRegistry(): void {
    // Register keyword tools with the typed registry
    // This is now handled through the tool manifest and typed registry
    
    // Register any additional tools that aren't in the manifest
    // For example, tools that require custom execution logic
    
    // The toolExecutors map is still used for backward compatibility
    // In the future, all tools should be registered through the typed registry
  }

  /**
   * Execute a tool by name
   * This is maintained for backward compatibility
   */
  async execute(mode: string, toolName: string, params: Record<string, any>): Promise<any> {
    const executor = toolExecutors[toolName];
    
    if (!executor) {
      throw new Error(`No handler found for tool: ${toolName}`);
    }

    return await executor(params);
  }
}

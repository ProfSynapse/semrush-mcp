import { AgentType, DomainMode } from '../../types/tool-types.js';
import { typedToolRegistry } from '../../validation/typed-tool-registry.js';
import { overview, competitors, backlinks } from './modes/index.js';
import { toolExecutors } from './tools/index.js';
import { registerDomainTool } from '../../tools/tool-builder.js';

/**
 * Domain Analysis Agent
 * 
 * Provides tools for domain analysis, including:
 * - overview: Basic domain metrics and rankings
 * - competitors: Competitive analysis
 * - backlinks: Backlink analysis
 */
export class DomainAgent {
  constructor() {
    this.setupRegistry();
  }

  /**
   * Sets up the agent's tools and modes in the typed registry
   */
  private setupRegistry(): void {
    // Register domain tools with the typed registry
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

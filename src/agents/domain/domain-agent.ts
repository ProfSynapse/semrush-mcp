import { BaseAgent } from '../base-agent.js';
import { unifiedToolRegistry } from '../../validation/unified-tool-registry.js';
import { overview, competitors, backlinks } from './modes/index.js';
import { toolExecutors } from './tools/index.js';

/**
 * Domain Analysis Agent
 * 
 * Provides tools for domain analysis, including:
 * - overview: Basic domain metrics and rankings
 * - competitors: Competitive analysis
 * - backlinks: Backlink analysis
 */
export class DomainAgent extends BaseAgent {
  constructor() {
    super('domain', 'Domain analysis tools');
    this.setupRegistry();
  }

  /**
   * Sets up the agent's tools and modes in the unified registry
   */
  private setupRegistry(): void {
    // Register the agent with all its modes and tools
    unifiedToolRegistry.registerAgent({
      name: 'domain',
      description: 'Domain analysis tools and capabilities',
      availableModes: [
        overview,
        competitors,
        backlinks
      ]
    });
  }

  /**
   * Implementation of API handlers
   * Uses the toolExecutors map to delegate to the appropriate tool execution function
   */
  protected async executeToolAction(toolName: string, params: Record<string, any>): Promise<any> {
    const executor = toolExecutors[toolName];
    
    if (!executor) {
      throw new Error(`No handler found for tool: ${toolName}`);
    }

    return await executor(params);
  }
}

import { BaseAgent } from '../base-agent.js';
import { unifiedToolRegistry } from '../../validation/unified-tool-registry.js';
import { overview, research, domain_keywords } from './modes/index.js';
import { toolExecutors } from './tools/index.js';

/**
 * Keyword Analysis Agent
 * 
 * Provides tools for keyword research and analysis.
 * Tools are organized into modes:
 * - overview: Basic keyword metrics
 * - research: Keyword discovery and expansion
 * - domain_keywords: Domain-specific keyword tools
 */
export class KeywordAgent extends BaseAgent {
  constructor() {
    super('keyword', 'Keyword analysis tools');
    this.setupRegistry();
  }

  /**
   * Sets up the agent's tools and modes in the unified registry
   */
  private setupRegistry(): void {
    unifiedToolRegistry.registerAgent({
      name: 'keyword',
      description: 'Keyword analysis tools and capabilities',
      availableModes: [
        overview,
        research,
        domain_keywords
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

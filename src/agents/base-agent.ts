import { IAgent } from './interfaces.js';
import { unifiedToolRegistry } from '../validation/unified-tool-registry.js';

/**
 * Base implementation of the IAgent interface
 * 
 * Uses the unified registry for tool validation and execution.
 */
export abstract class BaseAgent implements IAgent {
  /**
   * Create a new BaseAgent
   * @param name The name of the agent
   * @param description Description of what the agent provides
   */
  constructor(
    public name: string,
    public description: string
  ) {}

  /**
   * Execute a tool action
   * @param mode The mode to use
   * @param tool The tool to execute
   * @param params The parameters for the tool
   */
  async execute(mode: string, tool: string, params: Record<string, any>): Promise<any> {
    // First validate the request using the unified registry
    const validatedParams = unifiedToolRegistry.validateAndNormalizeParams(
      this.name,
      mode,
      tool,
      params
    );

    // Execute the tool action
    return await this.executeToolAction(tool, validatedParams);
  }

  /**
   * Implementation for executing a tool action with validated parameters
   * Must be implemented by derived classes
   */
  protected abstract executeToolAction(
    toolName: string, 
    params: Record<string, any>
  ): Promise<any>;
}

import { IAgent, ITool } from './interfaces.js';
import { logger } from '../config.js';
import { unifiedToolRegistry, ToolValidationError } from '../validation/unified-tool-registry.js';

/**
 * Custom error class for agent registry errors
 */
export class AgentRegistryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AgentRegistryError';
  }
}

/**
 * Registry for managing agents and their modes/tools
 */
export class AgentRegistry {
  /**
   * Map of agents registered with this registry
   */
  private agents: Map<string, IAgent> = new Map();

  /**
   * Register an agent with this registry
   * @param agent The agent to register
   */
  registerAgent(agent: IAgent): void {
    this.agents.set(agent.name, agent);
  }

  /**
   * Get a specific agent by name
   * @param name The name of the agent to get
   * @returns The agent, or undefined if not found
   */
  getAgent(name: string): IAgent | undefined {
    return this.agents.get(name);
  }

  /**
   * Get all agents registered with this registry
   * @returns An array of agents
   */
  getAllAgents(): IAgent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get all available tools across all agents and modes
   * @returns An array of tool definitions in MCP format
   */
  getAvailableTools(): any[] {
    const tools: any[] = [];
    
    // Create a high-level tool for each agent
    for (const agent of this.getAllAgents()) {
      const modes = agent.getModes();
      const modeNames = modes.map(m => m.name).join(', ');
      
      // Build a list of available tools for each mode
      const modeToolsMap: Record<string, string[]> = {};
      for (const mode of modes) {
        modeToolsMap[mode.name] = mode.getTools().map(t => t.name);
      }
      
      // Create a more detailed schema with examples
      tools.push({
        name: `semrush${agent.name.charAt(0).toUpperCase() + agent.name.slice(1)}`,
        description: `${agent.description} - Use this tool to access Semrush ${agent.name} data`,
        inputSchema: {
          type: 'object',
          properties: {
            mode: {
              type: 'string',
              description: `Mode to use (${modeNames})`,
              enum: modes.map(m => m.name)
            },
            tool: {
              type: 'string',
              description: 'Tool to execute'
            },
            params: {
              type: 'object',
              description: 'Parameters for the tool'
            }
          },
          required: ['mode', 'tool', 'params'],
          examples: [
            {
              mode: modes[0]?.name || 'overview',
              tool: modes[0]?.getTools()[0]?.name || 'example_tool',
              params: {
                // Example params would go here
                keyword: "digital marketing",
                database: "us"
              }
            }
          ]
        }
      });
    }
    
    return tools;
  }

  /**
   * Execute a tool by its agent, mode, and tool name
   * @param agentName The name of the agent
   * @param modeName The name of the mode
   * @param toolName The name of the tool
   * @param params The parameters for the tool
   * @returns A promise that resolves to the result of the tool execution
   * @throws AgentRegistryError if the agent, mode, or tool is not found
   * @throws SchemaValidationError if parameters don't match the schema
   * @throws ParameterMappingError if parameter mapping fails
   */
  async executeTool(agentName: string, modeName: string, toolName: string, params: any): Promise<any> {
    // Get the agent
    const agent = this.getAgent(agentName);
    if (!agent) {
      logger.error(`Agent not found: ${agentName}`);
      throw new AgentRegistryError(`Agent not found: ${agentName}. Available agents: ${this.getAllAgents().map(a => a.name).join(', ')}`);
    }
    
    // Get the mode
    const mode = agent.getMode(modeName);
    if (!mode) {
      logger.error(`Mode not found: ${modeName}`);
      throw new AgentRegistryError(`Mode not found: ${modeName}. Available modes for ${agentName}: ${agent.getModes().map(m => m.name).join(', ')}`);
    }
    
    // Get the tool
    const tool = mode.getTool(toolName);
    if (!tool) {
      logger.error(`Tool not found: ${toolName}`);
      throw new AgentRegistryError(`Tool not found: ${toolName}. Available tools for ${agentName}/${modeName}: ${mode.getTools().map(t => t.name).join(', ')}`);
    }
    
    try {
      // Check if the tool is available in the unified registry for this agent and mode
      if (!unifiedToolRegistry.isToolAvailable(toolName, agentName, modeName)) {
        logger.warn(`Tool ${toolName} is not registered in the unified registry for ${agentName}/${modeName}`);
      }
      
      // Execute the tool
      logger.info(`Executing tool: ${agentName}/${modeName}/${toolName}`);
      return await mode.executeTool(toolName, params);
    } catch (error) {
      // Re-throw validation errors
      if (error instanceof ToolValidationError) {
        throw error;
      }
      
      // Log and re-throw other errors
      logger.error(`Error executing tool ${agentName}/${modeName}/${toolName}: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Execute a high-level tool (semrushDomain or semrushKeyword)
   * @param toolName The name of the high-level tool
   * @param params The parameters for the tool (mode, tool, params)
   * @returns A promise that resolves to the result of the tool execution
   * @throws AgentRegistryError if the agent, mode, or tool is not found
   * @throws SchemaValidationError if parameters don't match the schema
   */
  async executeHighLevelTool(toolName: string, params: any): Promise<any> {
    try {
      // Validate the high-level parameters
      this.validateHighLevelParams(params);
      
      // Extract the agent name from the tool name
      const agentName = toolName.replace('semrush', '').toLowerCase();
      
      // Extract the mode, tool, and params from the parameters
      const { mode, tool, params: toolParams } = params;
      
      // Check if the tool exists in the unified registry
      if (!unifiedToolRegistry.getTool(tool)) {
        logger.error(`Tool not found in unified registry: ${tool}`);
        throw new AgentRegistryError(`Tool not found: ${tool}. Please check the tool name and try again.`);
      }
      
      // Check if the tool is available for this agent
      const availableModes = unifiedToolRegistry.getModesForTool(tool, agentName);
      if (availableModes.length === 0) {
        logger.error(`Tool ${tool} is not available for agent ${agentName}`);
        throw new AgentRegistryError(`Tool ${tool} is not available for agent ${agentName}`);
      }
      
      // Check if the tool is being used in the correct mode
      if (!availableModes.includes(mode)) {
        const suggestedMode = availableModes[0];
        logger.warn(`Tool '${tool}' was requested in '${mode}' mode, but it belongs to '${availableModes.join("' or '")}' mode`);
        throw new AgentRegistryError(`Tool not found: ${tool}. This tool is available in the '${availableModes.join("' or '")}' mode, not '${mode}' mode. Please update your request to use mode: '${suggestedMode}' instead.`);
      }
      
      // Validate and normalize the tool parameters
      try {
        // This will throw an error if validation fails
        unifiedToolRegistry.validateAndNormalizeParams(tool, toolParams);
      } catch (error) {
        if (error instanceof ToolValidationError) {
          throw new AgentRegistryError(`Parameter validation failed: ${error.message}`);
        }
        throw error;
      }
      
      // Execute the tool
      return await this.executeTool(agentName, mode, tool, toolParams);
    } catch (error) {
      // Re-throw validation errors
      if (error instanceof ToolValidationError ||
          error instanceof AgentRegistryError) {
        throw error;
      }
      
      // Log and re-throw other errors
      logger.error(`Error executing high-level tool ${toolName}: ${(error as Error).message}`);
      throw error;
    }
  }
  
  /**
   * Validate high-level parameters
   * @param params The high-level parameters
   * @throws SchemaValidationError if validation fails
   */
  private validateHighLevelParams(params: any): void {
    if (!params) {
      throw new AgentRegistryError('Parameters are required');
    }
    
    if (typeof params !== 'object') {
      throw new AgentRegistryError('Parameters must be an object');
    }
    
    if (!params.mode) {
      throw new AgentRegistryError('Mode is required');
    }
    
    if (!params.tool) {
      throw new AgentRegistryError('Tool is required');
    }
    
    if (!params.params || typeof params.params !== 'object') {
      throw new AgentRegistryError('Tool parameters must be an object');
    }
  }
  
}
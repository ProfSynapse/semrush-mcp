import { IAgent } from './interfaces.js';
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
      // Get agent definition from registry
      const registryAgent = unifiedToolRegistry.getAgent(agent.name);
      if (!registryAgent) continue;
      
      const modes = registryAgent.availableModes;
      const modeNames = modes.map(m => m.name).join(', ');
      
      // Build a list of available tools for each mode
      const modeToolsMap: Record<string, string[]> = {};
      for (const mode of modes) {
        modeToolsMap[mode.name] = mode.availableTools.map(t => t.name);
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
              tool: modes[0]?.availableTools[0]?.name || 'example_tool',
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
   * @throws ToolValidationError if parameters don't match the schema
   */
  async executeTool(agentName: string, modeName: string, toolName: string, params: any): Promise<any> {
    // Get the agent
    const agent = this.getAgent(agentName);
    if (!agent) {
      logger.error(`Agent not found: ${agentName}`);
      throw new AgentRegistryError(`Agent not found: ${agentName}. Available agents: ${this.getAllAgents().map(a => a.name).join(', ')}`);
    }
    
    // Check if the agent/mode/tool exists in the registry
    const registryAgent = unifiedToolRegistry.getAgent(agentName);
    if (!registryAgent) {
      logger.error(`Agent not found in registry: ${agentName}`);
      throw new AgentRegistryError(`Agent not found in registry: ${agentName}`);
    }
    
    const registryMode = unifiedToolRegistry.getMode(agentName, modeName);
    if (!registryMode) {
      const availableModes = registryAgent.availableModes.map(m => m.name).join(', ');
      logger.error(`Mode not found in registry: ${modeName}`);
      throw new AgentRegistryError(`Mode not found: ${modeName}. Available modes for ${agentName}: ${availableModes}`);
    }
    
    const registryTool = unifiedToolRegistry.getTool(agentName, modeName, toolName);
    if (!registryTool) {
      const availableTools = registryMode.availableTools.map(t => t.name).join(', ');
      logger.error(`Tool not found in registry: ${toolName}`);
      throw new AgentRegistryError(`Tool not found: ${toolName}. Available tools for ${agentName}/${modeName}: ${availableTools}`);
    }
    
    try {
      // Execute the tool through the agent's execute method
      logger.info(`Executing tool: ${agentName}/${modeName}/${toolName}`);
      return await agent.execute(modeName, toolName, params);
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
   * @throws ToolValidationError if parameters don't match the schema
   */
  async executeHighLevelTool(toolName: string, params: any): Promise<any> {
    try {
      // Validate the high-level parameters
      this.validateHighLevelParams(params);
      
      // Extract the agent name from the tool name
      const agentName = toolName.replace('semrush', '').toLowerCase();
      
      // Extract the mode, tool, and params from the parameters
      const { mode, tool, params: toolParams } = params;
      
      // Get the agent from the registry
      const registryAgent = unifiedToolRegistry.getAgent(agentName);
      if (!registryAgent) {
        logger.error(`Agent not found in registry: ${agentName}`);
        throw new AgentRegistryError(`Agent not found: ${agentName}. Please check the agent name and try again.`);
      }
      
      // Check if the mode exists for this agent
      const registryMode = unifiedToolRegistry.getMode(agentName, mode);
      if (!registryMode) {
        const availableModes = registryAgent.availableModes.map(m => m.name).join(', ');
        logger.error(`Mode not found for agent ${agentName}: ${mode}`);
        throw new AgentRegistryError(`Mode not found: ${mode}. Available modes for ${agentName}: ${availableModes}`);
      }
      
      // Check if the tool exists for this mode
      const registryTool = unifiedToolRegistry.getTool(agentName, mode, tool);
      if (!registryTool) {
        const availableTools = registryMode.availableTools.map(t => t.name).join(', ');
        logger.error(`Tool not found for mode ${mode}: ${tool}`);
        
        // Check if the tool exists in other modes
        let foundInOtherMode = false;
        let correctMode = '';
        
        for (const m of registryAgent.availableModes) {
          if (m.availableTools.some(t => t.name === tool)) {
            foundInOtherMode = true;
            correctMode = m.name;
            break;
          }
        }
        
        if (foundInOtherMode) {
          throw new AgentRegistryError(`Tool not found: ${tool}. This tool is available in the '${correctMode}' mode, not '${mode}' mode. Please update your request to use mode: '${correctMode}' instead.`);
        } else {
          throw new AgentRegistryError(`Tool not found: ${tool}. Available tools for ${agentName}/${mode}: ${availableTools}`);
        }
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

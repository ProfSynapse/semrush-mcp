/**
 * Core interfaces for the hierarchical Agent-Mode-Tool architecture
 */

/**
 * Interface for a parameter definition
 */
export interface IParameterDefinition {
  type: string;
  description: string;
  required: boolean;
  default?: any;
  examples?: any[];
}

/**
 * Interface for a tool definition
 */
export interface IToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, IParameterDefinition>;
  examples: {
    params: Record<string, any>;
  }[];
}

/**
 * Interface for a mode definition
 */
export interface IModeDefinition {
  name: string;
  description: string;
  availableTools: IToolDefinition[];
}

/**
 * Interface for an agent definition
 */
export interface IAgentDefinition {
  name: string;
  description: string;
  availableModes: IModeDefinition[];
}

/**
 * Interface for an agent that can execute tools
 */
export interface IAgent {
  /**
   * The name of the agent
   */
  name: string;

  /**
   * Description of what the agent provides
   */
  description: string;

  /**
   * Execute a tool with the provided parameters
   * @param mode The mode to use
   * @param tool The tool to execute
   * @param params The parameters for the tool
   */
  execute(mode: string, tool: string, params: Record<string, any>): Promise<any>;
}

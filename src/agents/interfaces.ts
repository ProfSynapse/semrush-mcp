/**
 * Core interfaces for the Agent-Mode-Tool architecture
 */

/**
 * Interface for a tool that can be executed
 */
export interface ITool {
  /**
   * The name of the tool
   */
  name: string;

  /**
   * Description of what the tool does
   */
  description: string;

  /**
   * JSON Schema defining the input parameters for the tool
   */
  inputSchema: object;

  /**
   * Execute the tool with the provided parameters
   * @param params The parameters for the tool
   * @returns A promise that resolves to the result of the tool execution
   */
  execute(params: any): Promise<any>;
}

/**
 * Interface for a mode that contains tools
 */
export interface IMode {
  /**
   * The name of the mode
   */
  name: string;

  /**
   * Description of what the mode provides
   */
  description: string;

  /**
   * Register a tool with this mode
   * @param tool The tool to register
   */
  registerTool(tool: ITool): void;

  /**
   * Get all tools registered with this mode
   * @returns An array of tools
   */
  getTools(): ITool[];

  /**
   * Get a specific tool by name
   * @param name The name of the tool to get
   * @returns The tool, or undefined if not found
   */
  getTool(name: string): ITool | undefined;

  /**
   * Execute a tool by name with the provided parameters
   * @param name The name of the tool to execute
   * @param params The parameters for the tool
   * @returns A promise that resolves to the result of the tool execution
   */
  executeTool(name: string, params: any): Promise<any>;
}

/**
 * Interface for an agent that contains modes
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
   * Register a mode with this agent
   * @param mode The mode to register
   */
  registerMode(mode: IMode): void;

  /**
   * Get all modes registered with this agent
   * @returns An array of modes
   */
  getModes(): IMode[];

  /**
   * Get a specific mode by name
   * @param name The name of the mode to get
   * @returns The mode, or undefined if not found
   */
  getMode(name: string): IMode | undefined;
}
import { IMode, ITool } from '../agents/interfaces.js';

/**
 * Base implementation of the IMode interface
 */
export class BaseMode implements IMode {
  /**
   * Map of tools registered with this mode
   */
  protected tools: Map<string, ITool> = new Map();

  /**
   * Create a new BaseMode
   * @param name The name of the mode
   * @param description Description of what the mode provides
   */
  constructor(
    public name: string,
    public description: string
  ) {}

  /**
   * Register a tool with this mode
   * @param tool The tool to register
   */
  registerTool(tool: ITool): void {
    this.tools.set(tool.name, tool);
  }

  /**
   * Get all tools registered with this mode
   * @returns An array of tools
   */
  getTools(): ITool[] {
    return Array.from(this.tools.values());
  }

  /**
   * Get a specific tool by name
   * @param name The name of the tool to get
   * @returns The tool, or undefined if not found
   */
  getTool(name: string): ITool | undefined {
    return this.tools.get(name);
  }

  /**
   * Execute a tool by name with the provided parameters
   * @param name The name of the tool to execute
   * @param params The parameters for the tool
   * @returns A promise that resolves to the result of the tool execution
   * @throws Error if the tool is not found
   */
  async executeTool(name: string, params: any): Promise<any> {
    const tool = this.getTool(name);
    if (!tool) {
      throw new Error(`Tool not found: ${name}`);
    }
    return await tool.execute(params);
  }
}
/**
 * @deprecated This class is deprecated and will be removed in a future version.
 * Use the unified registry instead.
 */
export class BaseTool {
  /**
   * The name of the tool in the unified registry
   */
  private registryToolName: string;

  /**
   * Create a new BaseTool
   * @param name The name of the tool
   * @param description Description of what the tool does
   * @param inputSchema JSON Schema defining the input parameters for the tool
   * @param executeFunction The function to execute when the tool is called
   * @param registryToolName Optional name of the tool in the unified registry
   */
  constructor(
    public name: string,
    public description: string,
    public inputSchema: object,
    private executeFunction: (params: any) => Promise<any>,
    registryToolName?: string
  ) {
    console.warn('BaseTool is deprecated. Use the unified registry instead.');
    // If no registry tool name is provided, use the tool name
    this.registryToolName = registryToolName || name;
  }

  /**
   * Execute the tool with the provided parameters
   * @param params The parameters for the tool
   * @returns A promise that resolves to the result of the tool execution
   */
  async execute(params: any): Promise<any> {
    console.warn('BaseTool.execute is deprecated. Use the unified registry instead.');
    return await this.executeFunction(params);
  }
}

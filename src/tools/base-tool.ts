import { ITool } from '../agents/interfaces.js';
import { logger } from '../config.js';
import { unifiedToolRegistry, ToolValidationError } from '../validation/unified-tool-registry.js';

/**
 * Base implementation of the ITool interface
 */
export class BaseTool implements ITool {
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
    // If no registry tool name is provided, use the tool name
    this.registryToolName = registryToolName || name;
  }

  /**
   * Execute the tool with the provided parameters
   * @param params The parameters for the tool
   * @returns A promise that resolves to the result of the tool execution
   * @throws ToolValidationError if parameters don't match the schema
   */
  async execute(params: any): Promise<any> {
    try {
      // Step 1: Validate and normalize parameters using the unified registry
      logger.debug(`Validating parameters for tool ${this.name}`);
      let processedParams = params;
      
      try {
        // Use the unified registry for validation and normalization
        processedParams = unifiedToolRegistry.validateAndNormalizeParams(this.registryToolName, params);
      } catch (validationError) {
        // If the tool is not in the registry, fall back to the input schema
        if (validationError instanceof ToolValidationError && validationError.message.includes('Tool not found')) {
          logger.warn(`Tool ${this.registryToolName} not found in registry, falling back to input schema`);
          // We're not doing validation here since we're falling back to the old behavior
          // This is for backward compatibility
        } else {
          throw validationError;
        }
      }
      
      // Step 2: Execute the tool with validated parameters
      logger.debug(`Executing tool ${this.name}`);
      return await this.executeFunction(processedParams);
    } catch (error) {
      // Re-throw validation errors
      if (error instanceof ToolValidationError) {
        throw error;
      }
      
      // Log and re-throw other errors
      logger.error(`Error executing tool ${this.name}: ${(error as Error).message}`);
      throw error;
    }
  }
}
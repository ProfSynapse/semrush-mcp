/**
 * Unified Tool Registry for Semrush MCP
 *
 * This module provides a centralized registry for all tools, their schemas,
 * and parameter mappings. It serves as a single source of truth for tool
 * definitions and validation.
 *
 * The registry is designed to be modular, with tool schemas defined in agent-specific files.
 */

/**
 * Common transformations for parameters
 */
export const transformations = {
  /**
   * Transforms a comma-separated string to an array
   */
  commaStringToArray: (value: string): string[] => {
    if (typeof value !== 'string') return value;
    return value.split(',').map(item => item.trim());
  },
  
  /**
   * Transforms an array to a comma-separated string
   */
  arrayToCommaString: (value: any[]): string => {
    if (!Array.isArray(value)) return value;
    return value.join(',');
  },
  
  /**
   * Ensures a value is lowercase
   */
  lowercase: (value: string): string => {
    if (typeof value !== 'string') return value;
    return value.toLowerCase();
  },
  
  /**
   * Ensures a domain is properly formatted (removes protocol, path, etc.)
   */
  formatDomain: (value: string): string => {
    if (typeof value !== 'string') return value;
    
    // Remove protocol
    let domain = value.replace(/^https?:\/\//, '');
    
    // Remove path and query parameters
    domain = domain.split('/')[0];
    
    // Remove port
    domain = domain.split(':')[0];
    
    return domain.toLowerCase();
  },
  
  /**
   * Formats a date to YYYY-MM-DD
   */
  formatDate: (value: string | Date): string => {
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    
    if (typeof value !== 'string') return value;
    
    // Try to parse the date
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }
    
    return date.toISOString().split('T')[0];
  }
};

/**
 * Interface for a parameter definition
 */
export interface ParameterDefinition {
  type: string;
  description: string;
  required: boolean;
  aliases?: string[];
  enum?: string[];
  transform?: (value: any) => any;
  default?: any;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  minItems?: number;
  maxItems?: number;
  pattern?: string;
  items?: {
    type: string;
    description?: string;
  };
}

/**
 * Interface for a tool definition
 */
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, ParameterDefinition>;
  modes: string[];
  agents: string[];
  examples?: Record<string, any>[];
}

/**
 * Error thrown when tool validation fails
 */
export class ToolValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ToolValidationError';
  }
}

/**
 * Interface for a tool schema registry
 */
export interface IToolSchemaRegistry {
  registerTool(tool: ToolDefinition): void;
  getTool(name: string): ToolDefinition | undefined;
  getAllTools(): ToolDefinition[];
  getToolsForAgent(agentName: string): ToolDefinition[];
  getToolsForMode(modeName: string): ToolDefinition[];
  getToolsForAgentAndMode(agentName: string, modeName: string): ToolDefinition[];
  isToolAvailable(toolName: string, agentName: string, modeName: string): boolean;
  getModesForTool(toolName: string, agentName: string): string[];
  validateAndNormalizeParams(toolName: string, params: Record<string, any>): Record<string, any>;
  getToolSchema(toolName: string): object;
}

/**
 * The unified tool registry
 */
export class UnifiedToolRegistry implements IToolSchemaRegistry {
  private tools: Map<string, ToolDefinition> = new Map();
  
  /**
   * Register a tool with the registry
   * @param tool The tool definition to register
   */
  registerTool(tool: ToolDefinition): void {
    this.tools.set(tool.name, tool);
  }
  
  /**
   * Get a tool by name
   * @param name The name of the tool to get
   * @returns The tool definition, or undefined if not found
   */
  getTool(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }
  
  /**
   * Get all tools in the registry
   * @returns An array of tool definitions
   */
  getAllTools(): ToolDefinition[] {
    return Array.from(this.tools.values());
  }
  
  /**
   * Get all tools for a specific agent
   * @param agentName The name of the agent
   * @returns An array of tool definitions
   */
  getToolsForAgent(agentName: string): ToolDefinition[] {
    return this.getAllTools().filter(tool => tool.agents.includes(agentName));
  }
  
  /**
   * Get all tools for a specific mode
   * @param modeName The name of the mode
   * @returns An array of tool definitions
   */
  getToolsForMode(modeName: string): ToolDefinition[] {
    return this.getAllTools().filter(tool => tool.modes.includes(modeName));
  }
  
  /**
   * Get all tools for a specific agent and mode
   * @param agentName The name of the agent
   * @param modeName The name of the mode
   * @returns An array of tool definitions
   */
  getToolsForAgentAndMode(agentName: string, modeName: string): ToolDefinition[] {
    return this.getAllTools().filter(tool => 
      tool.agents.includes(agentName) && tool.modes.includes(modeName)
    );
  }
  
  /**
   * Check if a tool is available for a specific agent and mode
   * @param toolName The name of the tool
   * @param agentName The name of the agent
   * @param modeName The name of the mode
   * @returns True if the tool is available, false otherwise
   */
  isToolAvailable(toolName: string, agentName: string, modeName: string): boolean {
    const tool = this.getTool(toolName);
    if (!tool) return false;
    return tool.agents.includes(agentName) && tool.modes.includes(modeName);
  }
  
  /**
   * Get the appropriate modes for a tool
   * @param toolName The name of the tool
   * @param agentName The name of the agent
   * @returns An array of mode names
   */
  getModesForTool(toolName: string, agentName: string): string[] {
    const tool = this.getTool(toolName);
    if (!tool) return [];
    return tool.modes.filter(mode => tool.agents.includes(agentName));
  }
  
  /**
   * Validate and normalize parameters for a tool
   * @param toolName The name of the tool
   * @param params The parameters to validate
   * @returns The normalized parameters
   * @throws ToolValidationError if validation fails
   */
  validateAndNormalizeParams(toolName: string, params: Record<string, any>): Record<string, any> {
    const tool = this.getTool(toolName);
    if (!tool) {
      throw new ToolValidationError(`Tool not found: ${toolName}`);
    }
    
    const result: Record<string, any> = {};
    const paramErrors: string[] = [];
    const missingRequired: string[] = [];
    
    // Track which parameters have been processed to detect unknown parameters
    const processedParams = new Set<string>();
    
    // First pass: apply defaults and check for required parameters
    for (const [paramName, paramDef] of Object.entries(tool.parameters)) {
      // Apply default value if parameter is not provided
      if (params[paramName] === undefined) {
        if (paramDef.default !== undefined) {
          result[paramName] = paramDef.default;
        } else if (paramDef.required) {
          // Check if any aliases are provided
          let foundAlias = false;
          if (paramDef.aliases) {
            for (const alias of paramDef.aliases) {
              if (params[alias] !== undefined) {
                result[paramName] = params[alias];
                processedParams.add(alias);
                foundAlias = true;
                break;
              }
            }
          }
          
          if (!foundAlias) {
            missingRequired.push(paramName);
          }
        }
      } else {
        result[paramName] = params[paramName];
        processedParams.add(paramName);
      }
    }
    
    // If there are missing required parameters, throw an error
    if (missingRequired.length > 0) {
      throw new ToolValidationError(
        `Missing required parameters for tool '${toolName}': ${missingRequired.join(', ')}`
      );
    }
    
    // Second pass: validate and transform parameters
    for (const [paramName, paramValue] of Object.entries(result)) {
      const paramDef = tool.parameters[paramName];
      
      try {
        // Apply transformation if needed
        if (paramDef.transform && paramValue !== undefined) {
          result[paramName] = paramDef.transform(paramValue);
        }
        
        // Validate type
        this.validateType(paramValue, paramDef.type, paramName);
        
        // Validate enum values
        if (paramDef.enum && !paramDef.enum.includes(paramValue)) {
          paramErrors.push(
            `Invalid value for '${paramName}'. Expected one of: ${paramDef.enum.join(', ')}, got: ${paramValue}`
          );
        }
        
        // Validate pattern
        if (paramDef.pattern && typeof paramValue === 'string') {
          const regex = new RegExp(paramDef.pattern);
          if (!regex.test(paramValue)) {
            paramErrors.push(
              `Invalid format for '${paramName}'. Value '${paramValue}' does not match pattern: ${paramDef.pattern}`
            );
          }
        }
        
        // Validate minimum/maximum for numbers
        if ((paramDef.type === 'number' || paramDef.type === 'integer') && typeof paramValue === 'number') {
          if (paramDef.minimum !== undefined && paramValue < paramDef.minimum) {
            paramErrors.push(
              `Invalid value for '${paramName}'. Value ${paramValue} is less than minimum ${paramDef.minimum}`
            );
          }
          if (paramDef.maximum !== undefined && paramValue > paramDef.maximum) {
            paramErrors.push(
              `Invalid value for '${paramName}'. Value ${paramValue} is greater than maximum ${paramDef.maximum}`
            );
          }
        }
        
        // Validate minLength/maxLength for strings
        if (paramDef.type === 'string' && typeof paramValue === 'string') {
          if (paramDef.minLength !== undefined && paramValue.length < paramDef.minLength) {
            paramErrors.push(
              `Invalid length for '${paramName}'. String length ${paramValue.length} is less than minimum length ${paramDef.minLength}`
            );
          }
          if (paramDef.maxLength !== undefined && paramValue.length > paramDef.maxLength) {
            paramErrors.push(
              `Invalid length for '${paramName}'. String length ${paramValue.length} is greater than maximum length ${paramDef.maxLength}`
            );
          }
        }
        
        // Validate minItems/maxItems for arrays
        if (paramDef.type === 'array' && Array.isArray(paramValue)) {
          if (paramDef.minItems !== undefined && paramValue.length < paramDef.minItems) {
            paramErrors.push(
              `Invalid array length for '${paramName}'. Array length ${paramValue.length} is less than minimum ${paramDef.minItems}`
            );
          }
          if (paramDef.maxItems !== undefined && paramValue.length > paramDef.maxItems) {
            paramErrors.push(
              `Invalid array length for '${paramName}'. Array length ${paramValue.length} is greater than maximum ${paramDef.maxItems}`
            );
          }
          
          // Validate array items if items schema is provided
          if (paramDef.items && paramValue.length > 0) {
            for (let i = 0; i < paramValue.length; i++) {
              try {
                this.validateType(paramValue[i], paramDef.items.type, `${paramName}[${i}]`);
              } catch (error) {
                paramErrors.push((error as Error).message);
              }
            }
          }
        }
      } catch (error) {
        paramErrors.push((error as Error).message);
      }
    }
    
    // Check for unknown parameters
    for (const paramName of Object.keys(params)) {
      if (!processedParams.has(paramName)) {
        // Check if this is an alias for any parameter
        let isAlias = false;
        for (const [definedParam, paramDef] of Object.entries(tool.parameters)) {
          if (paramDef.aliases && paramDef.aliases.includes(paramName)) {
            isAlias = true;
            break;
          }
        }
        
        if (!isAlias) {
          paramErrors.push(`Unknown parameter: '${paramName}'`);
        }
      }
    }
    
    // If there are validation errors, throw an error with all the issues
    if (paramErrors.length > 0) {
      throw new ToolValidationError(
        `Validation failed for tool '${toolName}':\n${paramErrors.join('\n')}`
      );
    }
    
    return result;
  }
  
  /**
   * Validate that a value matches the expected type
   * @param value The value to validate
   * @param expectedType The expected type
   * @param path The current path in the object (for error messages)
   * @throws ToolValidationError if validation fails
   */
  private validateType(value: any, expectedType: string, path: string): void {
    let valid = false;
    
    switch (expectedType) {
      case 'string':
        valid = typeof value === 'string';
        break;
      case 'number':
        valid = typeof value === 'number' && !isNaN(value);
        break;
      case 'integer':
        valid = typeof value === 'number' && !isNaN(value) && Number.isInteger(value);
        break;
      case 'boolean':
        valid = typeof value === 'boolean';
        break;
      case 'object':
        valid = typeof value === 'object' && value !== null && !Array.isArray(value);
        break;
      case 'array':
        valid = Array.isArray(value);
        break;
      case 'null':
        valid = value === null;
        break;
    }
    
    if (!valid) {
      throw new ToolValidationError(
        `Invalid type for '${path}'. Expected ${expectedType}, got ${Array.isArray(value) ? 'array' : typeof value}`
      );
    }
  }
  
  /**
   * Convert a tool definition to a JSON schema
   * @param toolName The name of the tool
   * @returns The JSON schema for the tool
   public getToolSchema(toolName: string): object {
     const tool = this.getTool(toolName);
     if (!tool) {
       throw new ToolValidationError(`Tool not found: ${toolName}`);
     }
     
     const properties: Record<string, any> = {};
     const required: string[] = [];
     
     for (const [paramName, paramDef] of Object.entries(tool.parameters)) {
       const property: Record<string, any> = {
         type: paramDef.type,
         description: paramDef.description
       };
       
       if (paramDef.enum) {
         property.enum = paramDef.enum;
       }
       
       if (paramDef.minLength !== undefined) {
         property.minLength = paramDef.minLength;
       }
       
       if (paramDef.maxLength !== undefined) {
         property.maxLength = paramDef.maxLength;
       }
       
       if (paramDef.minimum !== undefined) {
         property.minimum = paramDef.minimum;
       }
       
       if (paramDef.maximum !== undefined) {
         property.maximum = paramDef.maximum;
       }
       
       if (paramDef.minItems !== undefined) {
         property.minItems = paramDef.minItems;
       }
       
       if (paramDef.maxItems !== undefined) {
         property.maxItems = paramDef.maxItems;
       }
       
       if (paramDef.pattern) {
         property.pattern = paramDef.pattern;
       }
       
       if (paramDef.items) {
         property.items = {
           type: paramDef.items.type
         };
         
         if (paramDef.items.description) {
           property.items.description = paramDef.items.description;
         }
       }
       
       if (paramDef.examples) {
         property.examples = paramDef.examples;
       }
       
       properties[paramName] = property;
      
      if (paramDef.required) {
        required.push(paramName);
      }
    }
    
    return {
      type: 'object',
      properties,
      required
    };
  }
}

/**
 * Create an empty unified tool registry
 */
export function createUnifiedToolRegistry(): UnifiedToolRegistry {
  return new UnifiedToolRegistry();
}

/**
 * Singleton instance of the unified tool registry
 */
export const unifiedToolRegistry = new UnifiedToolRegistry();

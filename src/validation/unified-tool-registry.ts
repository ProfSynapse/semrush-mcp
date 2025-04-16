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
  examples?: any[];
}

/**
 * Interface for a tool definition within a mode
 */
export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, ParameterDefinition>;
  examples: {
    params: Record<string, any>;
  }[];
}

/**
 * Interface for a mode definition within an agent
 */
export interface ModeDefinition {
  name: string;
  description: string;
  availableTools: ToolDefinition[];
}

/**
 * Interface for an agent definition
 */
export interface AgentDefinition {
  name: string;
  description: string;
  availableModes: ModeDefinition[];
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
 * Interface for a unified registry managing agents, modes, and tools
 */
export interface IToolSchemaRegistry {
  registerAgent(agent: AgentDefinition): void;
  getAgent(name: string): AgentDefinition | undefined;
  getAllAgents(): AgentDefinition[];
  getMode(agentName: string, modeName: string): ModeDefinition | undefined;
  getTool(agentName: string, modeName: string, toolName: string): ToolDefinition | undefined;
  findToolMode(agentName: string, toolName: string): { modeName: string; tool: ToolDefinition } | undefined;
  validateAndNormalizeParams(agentName: string, modeName: string, toolName: string, params: Record<string, any>): Record<string, any>;
  getToolSchema(agentName: string, modeName: string, toolName: string): object;
}

/**
 * Common transformations for parameters
 */
export const transformations = {
  commaStringToArray: (value: string): string[] => {
    if (typeof value !== 'string') return value;
    return value.split(',').map(item => item.trim());
  },
  
  arrayToCommaString: (value: any[]): string => {
    if (!Array.isArray(value)) return value;
    return value.join(',');
  },
  
  lowercase: (value: string): string => {
    if (typeof value !== 'string') return value;
    return value.toLowerCase();
  },
  
  formatDomain: (value: string): string => {
    if (typeof value !== 'string') return value;
    let domain = value.replace(/^https?:\/\//, '');
    domain = domain.split('/')[0];
    domain = domain.split(':')[0];
    return domain.toLowerCase();
  },
  
  formatDate: (value: string | Date): string => {
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    if (typeof value !== 'string') return value;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }
    return date.toISOString().split('T')[0];
  }
};

/**
 * The unified registry for managing agents, modes, and tools
 */
export class UnifiedToolRegistry implements IToolSchemaRegistry {
  private agents: Map<string, AgentDefinition> = new Map();
  
  registerAgent(agent: AgentDefinition): void {
    this.agents.set(agent.name, agent);
  }
  
  getAgent(name: string): AgentDefinition | undefined {
    return this.agents.get(name);
  }
  
  getAllAgents(): AgentDefinition[] {
    return Array.from(this.agents.values());
  }
  
  getMode(agentName: string, modeName: string): ModeDefinition | undefined {
    const agent = this.getAgent(agentName);
    if (!agent) return undefined;
    return agent.availableModes.find(mode => mode.name === modeName);
  }
  
  getTool(agentName: string, modeName: string, toolName: string): ToolDefinition | undefined {
    const mode = this.getMode(agentName, modeName);
    if (!mode) return undefined;
    return mode.availableTools.find(tool => tool.name === toolName);
  }

  findToolMode(agentName: string, toolName: string): { modeName: string; tool: ToolDefinition } | undefined {
    const agent = this.getAgent(agentName);
    if (!agent) return undefined;

    for (const mode of agent.availableModes) {
      const tool = mode.availableTools.find(t => t.name === toolName);
      if (tool) {
        return { modeName: mode.name, tool };
      }
    }
    return undefined;
  }
  
  validateAndNormalizeParams(agentName: string, modeName: string, toolName: string, params: Record<string, any>): Record<string, any> {
    const tool = this.getTool(agentName, modeName, toolName);
    if (!tool) {
      const agent = this.getAgent(agentName);
      if (!agent) {
        throw new ToolValidationError(`Agent not found: ${agentName}`);
      }

      const correctMode = this.findToolMode(agentName, toolName);
      if (correctMode) {
        throw new ToolValidationError(
          `Configuration Error: Tool not found: ${toolName}. This tool is available in the '${correctMode.modeName}' mode, not '${modeName}' mode. Please update your request to use mode: '${correctMode.modeName}' instead.`
        );
      }
      
      const mode = this.getMode(agentName, modeName);
      if (mode) {
        const availableTools = mode.availableTools.map(t => t.name).join(', ');
        throw new ToolValidationError(
          `Configuration Error: Tool not found: ${toolName}. Available tools for ${agentName}/${modeName}: ${availableTools}`
        );
      } else {
        const availableModes = agent.availableModes.map(m => m.name).join(', ');
        throw new ToolValidationError(
          `Configuration Error: Invalid mode '${modeName}' for agent '${agentName}'. Available modes: ${availableModes}`
        );
      }
    }

    // Parameter validation logic remains the same
    const result: Record<string, any> = {};
    const paramErrors: string[] = [];
    const missingRequired: string[] = [];
    const processedParams = new Set<string>();
    
    // First pass: apply defaults and check required parameters
    for (const [paramName, paramDef] of Object.entries(tool.parameters)) {
      if (params[paramName] === undefined) {
        if (paramDef.default !== undefined) {
          result[paramName] = paramDef.default;
        } else if (paramDef.required) {
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
    
    if (missingRequired.length > 0) {
      throw new ToolValidationError(
        `Validation Error: Missing required parameters for tool '${toolName}': ${missingRequired.join(', ')}`
      );
    }

    // Second pass: validate and transform parameters
    for (const [paramName, paramValue] of Object.entries(result)) {
      const paramDef = tool.parameters[paramName];
      try {
        if (paramDef.transform && paramValue !== undefined) {
          result[paramName] = paramDef.transform(paramValue);
        }
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
        let isAlias = false;
        for (const [, paramDef] of Object.entries(tool.parameters)) {
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
    
    if (paramErrors.length > 0) {
      throw new ToolValidationError(
        `Validation Error: Validation failed for tool '${toolName}': ${paramErrors.join('. ')}`
      );
    }
    
    return result;
  }
  
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
        `Invalid type for '${path}'. Expected ${expectedType}, got ${Array.isArray(value) ? 'array' : typeof value}. Please check the parameter type and format.`
      );
    }
  }
  
  getToolSchema(agentName: string, modeName: string, toolName: string): object {
    const tool = this.getTool(agentName, modeName, toolName);
    if (!tool) {
      throw new ToolValidationError(
        `Configuration Error: Tool '${toolName}' not found in mode '${modeName}' for agent '${agentName}'. Please check the tool name and mode.`
      );
    }
    
    const properties: Record<string, any> = {};
    const required: string[] = [];
    
    for (const [paramName, paramDef] of Object.entries(tool.parameters)) {
      const property: Record<string, any> = {
        type: paramDef.type,
        description: paramDef.description
      };
      
      if (paramDef.enum) property.enum = paramDef.enum;
      if (paramDef.minLength !== undefined) property.minLength = paramDef.minLength;
      if (paramDef.maxLength !== undefined) property.maxLength = paramDef.maxLength;
      if (paramDef.minimum !== undefined) property.minimum = paramDef.minimum;
      if (paramDef.maximum !== undefined) property.maximum = paramDef.maximum;
      if (paramDef.minItems !== undefined) property.minItems = paramDef.minItems;
      if (paramDef.maxItems !== undefined) property.maxItems = paramDef.maxItems;
      if (paramDef.pattern) property.pattern = paramDef.pattern;
      
      if (paramDef.items) {
        property.items = { type: paramDef.items.type };
        if (paramDef.items.description) {
          property.items.description = paramDef.items.description;
        }
      }
      
      if (paramDef.examples) property.examples = paramDef.examples;
      
      properties[paramName] = property;
      if (paramDef.required) required.push(paramName);
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

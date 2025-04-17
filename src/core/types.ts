/**
 * Type definitions for the BCP architecture
 * 
 * This module provides the foundational types that ensure type safety
 * for tool definitions, parameters, and BCP relationships.
 */

/**
 * Handler function for tool execution
 */
export interface ToolHandler<P = any, R = any> {
  (params: P): Promise<R>;
}

/**
 * Schema property definition
 */
export interface SchemaProperty {
  type: string;
  description: string;
  pattern?: string;
  enum?: string[];
  default?: any;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  items?: any;
  properties?: Record<string, SchemaProperty>;
  required?: string[];
}

/**
 * Input schema for tool parameters
 */
export interface InputSchema {
  type: string;
  properties: Record<string, SchemaProperty>;
  required: string[];
  examples?: any[];
}

/**
 * Tool definition with type safety
 */
export interface ToolDefinition<P = any, R = any> {
  name: string;
  description: string;
  inputSchema: InputSchema;
  handler: ToolHandler<P, R>;
}

/**
 * Bounded Context Pack (BCP) definition
 */
export interface BCP {
  domain: string;
  description: string;
  tools: ToolDefinition[];
}

/**
 * Error thrown when tool validation fails
 */
export class ToolValidationError extends Error {
  constructor(
    message: string,
    public readonly toolName: string,
    public readonly params?: Record<string, any>
  ) {
    super(message);
    this.name = 'ToolValidationError';
  }
}

/**
 * Possible error types for API calls
 */
export type ApiErrorType = 
  | 'network_error'     // Connection/network issues
  | 'auth_error'        // API key issues
  | 'validation_error'  // Invalid parameters
  | 'parsing_error'     // Response parsing issues
  | 'rate_limit'        // API rate limiting
  | 'server_error'      // Internal server errors
  | 'unknown';          // Unspecified errors

/**
 * Error thrown when API calls fail
 */
export class ApiError extends Error {
  /**
   * Create a new API error
   * 
   * @param message - Error message
   * @param status - HTTP status code or custom error code
   * @param endpoint - API endpoint or operation type
   * @param type - Type of error that occurred
   * @param details - Additional error details (e.g. invalid parameters, parsing issues)
   */
  constructor(
    message: string,
    public readonly status?: number,
    public readonly endpoint?: string,
    public readonly type: ApiErrorType = 'unknown',
    public readonly details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  /**
   * Get a human-readable error message
   */
  public getReadableMessage(): string {
    let msg = this.message;

    if (this.type === 'auth_error') {
      msg += '\nPlease check your API key and make sure it is valid.';
    }
    else if (this.type === 'validation_error' && this.details?.params) {
      msg += '\nInvalid parameters: ' + JSON.stringify(this.details.params, null, 2);
    }
    else if (this.type === 'rate_limit') {
      msg += '\nYou have exceeded the API rate limit. Please try again later.';
    }

    if (this.endpoint) {
      msg += `\nEndpoint: ${this.endpoint}`;
    }
    if (this.status) {
      msg += `\nStatus: ${this.status}`;
    }

    return msg;
  }
}

/**
 * Helper function to validate parameters against schema
 */
export function validateParams<T>(
  params: any,
  schema: InputSchema,
  toolName: string
): T {
  const errors: string[] = [];
  const result: Record<string, any> = {};

  // Check for required parameters
  for (const required of schema.required) {
    if (params[required] === undefined) {
      errors.push(`Missing required parameter: ${required}`);
    }
  }

  // Validate each parameter
  for (const [key, value] of Object.entries(params)) {
    const propSchema = schema.properties[key];
    
    if (!propSchema) {
      errors.push(`Unknown parameter: ${key}`);
      continue;
    }

    // Type validation
    if (propSchema.type === 'string' && typeof value !== 'string') {
      errors.push(`Parameter ${key} must be a string`);
      continue;
    }

    if (propSchema.type === 'number' && typeof value !== 'number') {
      errors.push(`Parameter ${key} must be a number`);
      continue;
    }

    if (propSchema.type === 'integer' && (!Number.isInteger(value))) {
      errors.push(`Parameter ${key} must be an integer`);
      continue;
    }

    if (propSchema.type === 'boolean' && typeof value !== 'boolean') {
      errors.push(`Parameter ${key} must be a boolean`);
      continue;
    }

    if (propSchema.type === 'array' && !Array.isArray(value)) {
      errors.push(`Parameter ${key} must be an array`);
      continue;
    }

    // Additional validations for strings
    if (typeof value === 'string') {
      if (propSchema.minLength !== undefined && value.length < propSchema.minLength) {
        errors.push(`Parameter ${key} must be at least ${propSchema.minLength} characters`);
      }
      
      if (propSchema.maxLength !== undefined && value.length > propSchema.maxLength) {
        errors.push(`Parameter ${key} must be at most ${propSchema.maxLength} characters`);
      }
      
      if (propSchema.pattern && !new RegExp(propSchema.pattern).test(value)) {
        errors.push(`Parameter ${key} must match pattern: ${propSchema.pattern}`);
      }
      
      if (propSchema.enum && !propSchema.enum.includes(value)) {
        errors.push(`Parameter ${key} must be one of: ${propSchema.enum.join(', ')}`);
      }
    }

    // Additional validations for numbers
    if (typeof value === 'number') {
      if (propSchema.minimum !== undefined && value < propSchema.minimum) {
        errors.push(`Parameter ${key} must be at least ${propSchema.minimum}`);
      }
      
      if (propSchema.maximum !== undefined && value > propSchema.maximum) {
        errors.push(`Parameter ${key} must be at most ${propSchema.maximum}`);
      }
    }

    // Additional validations for arrays
    if (Array.isArray(value)) {
      if (propSchema.minItems !== undefined && value.length < propSchema.minItems) {
        errors.push(`Parameter ${key} must have at least ${propSchema.minItems} items`);
      }
      
      if (propSchema.maxItems !== undefined && value.length > propSchema.maxItems) {
        errors.push(`Parameter ${key} must have at most ${propSchema.maxItems} items`);
      }
    }

    // Add to result if valid
    result[key] = value;
  }

  // Apply defaults for missing optional parameters
  for (const [key, propSchema] of Object.entries(schema.properties)) {
    if (result[key] === undefined && propSchema.default !== undefined) {
      result[key] = propSchema.default;
    }
  }

  if (errors.length > 0) {
    throw new ToolValidationError(
      `Validation failed for tool ${toolName}:\n${errors.join('\n')}`,
      toolName,
      params
    );
  }

  return result as T;
}

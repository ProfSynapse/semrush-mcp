/**
 * Type-safe tool registry implementation
 * This module provides a strongly-typed registry system that enforces
 * type safety and mode relationships at compile time.
 */

import {
  AgentType,
  DomainMode,
  KeywordMode,
  TypedToolDefinition,
  ToolParameters,
  ValidatedParams,
  ToolValidationError,
  ValidationRules,
  TypedParameter
} from '../types/tool-types.js';

/**
 * Type-safe registry key using template literal types
 */
type RegistryKey = `${AgentType}.${string}.${string}`;

/**
 * Interface for registered tool with compile-time type checking
 */
interface RegisteredTool<
  A extends AgentType,
  M extends DomainMode | KeywordMode,
  P extends ToolParameters
> {
  definition: TypedToolDefinition<A, M, P>;
  validateParams: (params: Record<string, any>) => ValidatedParams<P>;
}

/**
 * Type-safe tool registry that enforces parameter and mode relationships
 * at compile time while providing runtime validation
 */
export class TypedToolRegistry {
  private tools = new Map<RegistryKey, RegisteredTool<any, any, any>>();

  /**
   * Register a new tool with compile-time type checking
   */
  register<
    A extends AgentType,
    M extends DomainMode | KeywordMode,
    P extends ToolParameters
  >(definition: TypedToolDefinition<A, M, P>): void {
    const key = this.getToolKey(definition.agent, definition.mode, definition.name);
    
    if (this.tools.has(key)) {
      throw new Error(`Tool already registered: ${key}`);
    }

    const validateParams = (params: Record<string, any>): ValidatedParams<P> => {
      const errors: string[] = [];
      const validatedParams: Partial<ValidatedParams<P>> = {};

      // Check for required parameters and validate types
      for (const [paramName, paramDef] of Object.entries(definition.parameters) as Array<[string, TypedParameter]>) {
        const value = params[paramName] ?? paramDef.default;

        if (value === undefined) {
          if (paramDef.required) {
            errors.push(`Missing required parameter: ${paramName}`);
          }
          continue;
        }

        if (!paramDef.validate(value)) {
          errors.push(`Invalid type for parameter ${paramName}`);
          continue;
        }

        // Validate against rules
        const validationErrors = this.validateAgainstRules(value, paramDef, paramName);
        if (validationErrors.length > 0) {
          errors.push(...validationErrors);
          continue;
        }

        (validatedParams as any)[paramName] = value;
      }

      // Check for unknown parameters
      for (const paramName of Object.keys(params)) {
        if (!definition.parameters[paramName]) {
          errors.push(`Unknown parameter: ${paramName}`);
        }
      }

      if (errors.length > 0) {
        throw new ToolValidationError(
          `Validation failed for tool ${definition.name}:\n${errors.join('\n')}`
        );
      }

      // Cast to full ValidatedParams type after all validations pass
      return validatedParams as unknown as ValidatedParams<P>;
    };

    this.tools.set(key, {
      definition,
      validateParams
    });
  }

  /**
   * Execute a tool with full type safety and runtime validation
   */
  async execute<
    A extends AgentType,
    M extends DomainMode | KeywordMode,
    P extends ToolParameters
  >(
    agent: A,
    mode: M,
    toolName: string,
    params: Record<string, any>
  ): Promise<any> {
    const key = this.getToolKey(agent, mode, toolName);
    const tool = this.tools.get(key) as RegisteredTool<A, M, P> | undefined;

    if (!tool) {
      throw new Error(
        `Tool not found: ${toolName} (agent: ${agent}, mode: ${mode})`
      );
    }

    const validatedParams = tool.validateParams(params);
    return await tool.definition.execute(validatedParams);
  }

  /**
   * Get all tools registered for a specific agent and mode
   */
  getTools<A extends AgentType, M extends DomainMode | KeywordMode>(
    agent: A,
    mode: M
  ): Array<TypedToolDefinition<A, M, any>> {
    const prefix = `${agent}.${mode}`;
    const tools: Array<TypedToolDefinition<A, M, any>> = [];

    for (const [key, tool] of this.tools.entries()) {
      if (key.startsWith(prefix)) {
        tools.push(tool.definition);
      }
    }

    return tools;
  }

  /**
   * Get a specific tool's definition
   */
  getTool<A extends AgentType, M extends DomainMode | KeywordMode>(
    agent: A,
    mode: M,
    toolName: string
  ): TypedToolDefinition<A, M, any> | undefined {
    const key = this.getToolKey(agent, mode, toolName);
    return this.tools.get(key)?.definition;
  }

  /**
   * Generate a unique key for tool registry
   */
  private getToolKey(
    agent: AgentType,
    mode: DomainMode | KeywordMode,
    toolName: string
  ): RegistryKey {
    return `${agent}.${mode}.${toolName}`;
  }

  /**
   * Validate a parameter value against its validation rules
   */
  private validateAgainstRules(
    value: any,
    paramDef: TypedParameter & ValidationRules,
    paramName: string
  ): string[] {
    const errors: string[] = [];

    if (typeof value === 'string') {
      if (paramDef.minLength !== undefined && value.length < paramDef.minLength) {
        errors.push(
          `${paramName} length (${value.length}) is less than minimum (${paramDef.minLength})`
        );
      }
      if (paramDef.maxLength !== undefined && value.length > paramDef.maxLength) {
        errors.push(
          `${paramName} length (${value.length}) is greater than maximum (${paramDef.maxLength})`
        );
      }
      if (paramDef.pattern && !paramDef.pattern.test(value)) {
        errors.push(
          `${paramName} value "${value}" does not match pattern ${paramDef.pattern}`
        );
      }
    }

    if (typeof value === 'number') {
      if (paramDef.minimum !== undefined && value < paramDef.minimum) {
        errors.push(
          `${paramName} value (${value}) is less than minimum (${paramDef.minimum})`
        );
      }
      if (paramDef.maximum !== undefined && value > paramDef.maximum) {
        errors.push(
          `${paramName} value (${value}) is greater than maximum (${paramDef.maximum})`
        );
      }
    }

    if (Array.isArray(value)) {
      if (paramDef.minItems !== undefined && value.length < paramDef.minItems) {
        errors.push(
          `${paramName} array length (${value.length}) is less than minimum (${paramDef.minItems})`
        );
      }
      if (paramDef.maxItems !== undefined && value.length > paramDef.maxItems) {
        errors.push(
          `${paramName} array length (${value.length}) is greater than maximum (${paramDef.maxItems})`
        );
      }
    }

    if (paramDef.enum && !paramDef.enum.includes(value)) {
      errors.push(
        `${paramName} value "${value}" must be one of: ${paramDef.enum.join(', ')}`
      );
    }

    return errors;
  }
}

/**
 * Singleton instance of the typed tool registry
 */
export const typedToolRegistry = new TypedToolRegistry();

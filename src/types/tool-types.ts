/**
 * Type system for strongly-typed tool definitions and execution
 * This module provides the foundational types that ensure compile-time
 * safety for tool definitions, parameters, and mode relationships.
 */

/**
 * Supported agent types in the system
 */
export enum AgentType {
  DOMAIN = 'domain',
  KEYWORD = 'keyword'
}

/**
 * Available modes for the domain agent
 */
export enum DomainMode {
  OVERVIEW = 'overview',
  TRAFFIC = 'traffic',
  BACKLINKS = 'backlinks',
  COMPETITORS = 'competitors'
}

/**
 * Available modes for the keyword agent
 */
export enum KeywordMode {
  OVERVIEW = 'overview',
  RESEARCH = 'research',
  DOMAIN_KEYWORDS = 'domain_keywords'
}

/**
 * Supported parameter types in the system
 */
export enum TypeName {
  STRING = 'string',
  NUMBER = 'number',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT = 'object'
}

/**
 * Base interface for parameter validation rules
 */
export interface ValidationRules {
  required?: boolean;
  pattern?: RegExp;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  enum?: readonly string[];
}

/**
 * Type-safe parameter definition with validation
 */
export interface TypedParameter<T = any> extends ValidationRules {
  type: TypeName;
  description: string;
  required: boolean;
  default?: T;
  validate: (value: T) => boolean;
  examples?: T[];
}

/**
 * Helper type to extract parameter types from a parameter definition
 */
export type ParamType<T extends TypedParameter> = T extends TypedParameter<infer P> ? P : never;

/**
 * Type-safe tool parameter collection
 */
export type ToolParameters = Record<string, TypedParameter>;

/**
 * Helper type to extract validated parameter values
 */
export type ValidatedParams<T extends ToolParameters> = {
  [K in keyof T]: ParamType<T[K]>;
};

/**
 * Type-safe tool example definition
 */
export interface ToolExample<P extends ToolParameters> {
  description: string;
  params: ValidatedParams<P>;
}

/**
 * Type-safe tool definition
 */
export interface TypedToolDefinition<
  A extends AgentType,
  M extends DomainMode | KeywordMode,
  P extends ToolParameters
> {
  agent: A;
  mode: M;
  name: string;
  description: string;
  parameters: P;
  examples: ToolExample<P>[];
  execute: (params: ValidatedParams<P>) => Promise<any>;
}

/**
 * Helper type to get all modes for an agent
 */
export type AgentModes<A extends AgentType> = A extends AgentType.DOMAIN
  ? DomainMode
  : A extends AgentType.KEYWORD
  ? KeywordMode
  : never;

/**
 * Type-safe mode definition
 */
export interface TypedModeDefinition<
  A extends AgentType,
  M extends DomainMode | KeywordMode
> {
  agent: A;
  mode: M;
  name: string;
  description: string;
  tools: Record<string, TypedToolDefinition<A, M, any>>;
}

/**
 * Error thrown when tool validation fails
 */
export class ToolValidationError extends Error implements Error {
  name: string = 'ToolValidationError';
  constructor(message: string) { 
    super(message);
  }
}

/**
 * Parameter validation helper functions
 */
export const validators = {
  string: (value: any): value is string => typeof value === 'string',
  number: (value: any): value is number => typeof value === 'number' && !isNaN(value),
  integer: (value: any): value is number => Number.isInteger(value),
  boolean: (value: any): value is boolean => typeof value === 'boolean',
  array: (value: any): value is Array<any> => Array.isArray(value),
  object: (value: any): value is object => typeof value === 'object' && value !== null && !Array.isArray(value)
};

/**
 * Helper functions to create type-safe parameters
 */
export const createParam = {
  string: (opts: Omit<TypedParameter<string>, 'type' | 'validate'>): TypedParameter<string> => ({
    type: TypeName.STRING,
    validate: validators.string,
    ...opts
  }),
  
  number: (opts: Omit<TypedParameter<number>, 'type' | 'validate'>): TypedParameter<number> => ({
    type: TypeName.NUMBER,
    validate: validators.number,
    ...opts
  }),

  integer: (opts: Omit<TypedParameter<number>, 'type' | 'validate'>): TypedParameter<number> => ({
    type: TypeName.INTEGER,
    validate: validators.integer,
    ...opts
  }),

  boolean: (opts: Omit<TypedParameter<boolean>, 'type' | 'validate'>): TypedParameter<boolean> => ({
    type: TypeName.BOOLEAN,
    validate: validators.boolean,
    ...opts
  }),

  array: <T>(opts: Omit<TypedParameter<T[]>, 'type' | 'validate'>): TypedParameter<T[]> => ({
    type: TypeName.ARRAY,
    validate: validators.array,
    ...opts
  }),

  object: <T extends object>(opts: Omit<TypedParameter<T>, 'type' | 'validate'>): TypedParameter<T> => ({
    type: TypeName.OBJECT,
    validate: validators.object,
    ...opts
  })
};

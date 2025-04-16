/**
 * Base Schema Definitions
 * 
 * This file contains the base schema types and validation functions
 * that are used across all tools.
 */

import { ParameterDefinition } from '../validation/unified-tool-registry.js';

/**
 * Schema validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Schema validation options
 */
export interface ValidationOptions {
  allowUnknownParams?: boolean;
  strictTypeChecking?: boolean;
}

/**
 * Schema validation context
 */
export interface ValidationContext {
  path: string;
  options: ValidationOptions;
}

/**
 * Schema type for parameters
 */
export enum SchemaType {
  STRING = 'string',
  NUMBER = 'number',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
  NULL = 'null'
}

/**
 * Schema format for string parameters
 */
export enum StringFormat {
  DATE = 'date',
  DATE_TIME = 'date-time',
  EMAIL = 'email',
  HOSTNAME = 'hostname',
  URI = 'uri',
  DOMAIN = 'domain',
  KEYWORD = 'keyword'
}

/**
 * Common transformations for parameters
 */
export const schemaTransformations = {
  /**
   * Convert a comma-separated string to an array
   */
  commaStringToArray: (value: string): string[] => {
    if (typeof value !== 'string') return value;
    return value.split(',').map(item => item.trim());
  },
  
  /**
   * Convert an array to a comma-separated string
   */
  arrayToCommaString: (value: any[]): string => {
    if (!Array.isArray(value)) return value;
    return value.join(',');
  },
  
  /**
   * Convert a string to lowercase
   */
  lowercase: (value: string): string => {
    if (typeof value !== 'string') return value;
    return value.toLowerCase();
  },
  
  /**
   * Format a domain string (remove protocol, www, etc.)
   */
  formatDomain: (value: string): string => {
    if (typeof value !== 'string') return value;
    let domain = value.replace(/^https?:\/\//, '');
    domain = domain.split('/')[0];
    domain = domain.split(':')[0];
    return domain.toLowerCase();
  },
  
  /**
   * Format a date string
   */
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
  },

  /**
   * Convert a string to an array of strings
   */
  stringToArray: (value: any): any[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
    return [value];
  },

  /**
   * Convert a semicolon or comma-separated string to an array
   */
  splitStringToArray: (value: any): any[] => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      return value.split(/[;,]/).map(k => k.trim()).filter(k => k.length > 0);
    }
    return [value];
  }
};

/**
 * Schema validation functions
 */
export const schemaValidation = {
  /**
   * Validate a value against a schema type
   */
  validateType: (value: any, expectedType: SchemaType | string, path: string): ValidationResult => {
    let valid = false;
    
    switch (expectedType) {
      case SchemaType.STRING:
        valid = typeof value === 'string';
        break;
      case SchemaType.NUMBER:
        valid = typeof value === 'number' && !isNaN(value);
        break;
      case SchemaType.INTEGER:
        valid = typeof value === 'number' && !isNaN(value) && Number.isInteger(value);
        break;
      case SchemaType.BOOLEAN:
        valid = typeof value === 'boolean';
        break;
      case SchemaType.OBJECT:
        valid = typeof value === 'object' && value !== null && !Array.isArray(value);
        break;
      case SchemaType.ARRAY:
        valid = Array.isArray(value);
        break;
      case SchemaType.NULL:
        valid = value === null;
        break;
      default:
        valid = true; // Unknown type, assume valid
    }
    
    if (!valid) {
      return {
        valid: false,
        errors: [`Invalid type for '${path}'. Expected ${expectedType}, got ${Array.isArray(value) ? 'array' : typeof value}. Please check the parameter type and format.`]
      };
    }
    
    return { valid: true, errors: [] };
  },
  
  /**
   * Validate a string value against a pattern
   */
  validatePattern: (value: string, pattern: string, path: string): ValidationResult => {
    const regex = new RegExp(pattern);
    if (!regex.test(value)) {
      return {
        valid: false,
        errors: [`Invalid format for '${path}'. Value '${value}' does not match pattern: ${pattern}`]
      };
    }
    
    return { valid: true, errors: [] };
  },
  
  /**
   * Validate a value against an enum
   */
  validateEnum: (value: any, enumValues: any[], path: string): ValidationResult => {
    if (!enumValues.includes(value)) {
      return {
        valid: false,
        errors: [`Invalid value for '${path}'. Expected one of: ${enumValues.join(', ')}, got: ${value}`]
      };
    }
    
    return { valid: true, errors: [] };
  },
  
  /**
   * Validate a number value against minimum and maximum
   */
  validateNumberRange: (value: number, minimum?: number, maximum?: number, path: string): ValidationResult => {
    const errors: string[] = [];
    
    if (minimum !== undefined && value < minimum) {
      errors.push(`Invalid value for '${path}'. Value ${value} is less than minimum ${minimum}`);
    }
    
    if (maximum !== undefined && value > maximum) {
      errors.push(`Invalid value for '${path}'. Value ${value} is greater than maximum ${maximum}`);
    }
    
    return { valid: errors.length === 0, errors };
  },
  
  /**
   * Validate a string value against minLength and maxLength
   */
  validateStringLength: (value: string, minLength?: number, maxLength?: number, path: string): ValidationResult => {
    const errors: string[] = [];
    
    if (minLength !== undefined && value.length < minLength) {
      errors.push(`Invalid length for '${path}'. String length ${value.length} is less than minimum length ${minLength}`);
    }
    
    if (maxLength !== undefined && value.length > maxLength) {
      errors.push(`Invalid length for '${path}'. String length ${value.length} is greater than maximum length ${maxLength}`);
    }
    
    return { valid: errors.length === 0, errors };
  },
  
  /**
   * Validate an array value against minItems and maxItems
   */
  validateArrayLength: (value: any[], minItems?: number, maxItems?: number, path: string): ValidationResult => {
    const errors: string[] = [];
    
    if (minItems !== undefined && value.length < minItems) {
      errors.push(`Invalid array length for '${path}'. Array length ${value.length} is less than minimum ${minItems}`);
    }
    
    if (maxItems !== undefined && value.length > maxItems) {
      errors.push(`Invalid array length for '${path}'. Array length ${value.length} is greater than maximum ${maxItems}`);
    }
    
    return { valid: errors.length === 0, errors };
  },
  
  /**
   * Validate a parameter value against a parameter definition
   */
  validateParameter: (value: any, paramDef: ParameterDefinition, path: string): ValidationResult => {
    const errors: string[] = [];
    
    // Validate type
    const typeResult = schemaValidation.validateType(value, paramDef.type, path);
    if (!typeResult.valid) {
      errors.push(...typeResult.errors);
      return { valid: false, errors };
    }
    
    // Validate enum
    if (paramDef.enum && !paramDef.enum.includes(value)) {
      errors.push(`Invalid value for '${path}'. Expected one of: ${paramDef.enum.join(', ')}, got: ${value}`);
    }
    
    // Validate pattern
    if (paramDef.pattern && typeof value === 'string') {
      const patternResult = schemaValidation.validatePattern(value, paramDef.pattern, path);
      if (!patternResult.valid) {
        errors.push(...patternResult.errors);
      }
    }
    
    // Validate number range
    if ((paramDef.type === 'number' || paramDef.type === 'integer') && typeof value === 'number') {
      const rangeResult = schemaValidation.validateNumberRange(value, paramDef.minimum, paramDef.maximum, path);
      if (!rangeResult.valid) {
        errors.push(...rangeResult.errors);
      }
    }
    
    // Validate string length
    if (paramDef.type === 'string' && typeof value === 'string') {
      const lengthResult = schemaValidation.validateStringLength(value, paramDef.minLength, paramDef.maxLength, path);
      if (!lengthResult.valid) {
        errors.push(...lengthResult.errors);
      }
    }
    
    // Validate array length
    if (paramDef.type === 'array' && Array.isArray(value)) {
      const arrayLengthResult = schemaValidation.validateArrayLength(value, paramDef.minItems, paramDef.maxItems, path);
      if (!arrayLengthResult.valid) {
        errors.push(...arrayLengthResult.errors);
      }
      
      // Validate array items
      if (paramDef.items && value.length > 0) {
        for (let i = 0; i < value.length; i++) {
          const itemResult = schemaValidation.validateType(value[i], paramDef.items.type, `${path}[${i}]`);
          if (!itemResult.valid) {
            errors.push(...itemResult.errors);
          }
        }
      }
    }
    
    return { valid: errors.length === 0, errors };
  }
};

/**
 * Parameter definition creation options
 */
export interface ParameterCreationOptions {
  type: SchemaType | string;
  description: string;
  required: boolean;
  options?: Partial<ParameterDefinition>;
}

/**
 * Create a parameter definition with common options
 */
export function createParameterDefinition(options: ParameterCreationOptions): ParameterDefinition {
  return {
    type: options.type,
    description: options.description,
    required: options.required,
    ...(options.options || {})
  };
}

/**
 * Parameter creation options
 */
export interface StringParamOptions {
  description: string;
  required: boolean;
  options?: Partial<ParameterDefinition>;
}

/**
 * Create a string parameter definition
 */
export function createStringParam(options: StringParamOptions): ParameterDefinition {
  return {
    type: SchemaType.STRING,
    description: options.description,
    required: options.required,
    ...(options.options || {})
  };
}

/**
 * Shorthand for creating a string parameter definition
 */
export function string(description: string, required = false, options?: Partial<ParameterDefinition>): ParameterDefinition {
  return createStringParam({ description, required, options });
}

/**
 * Parameter creation options
 */
export interface NumberParamOptions {
  description: string;
  required: boolean;
  options?: Partial<ParameterDefinition>;
}

/**
 * Create a number parameter definition
 */
export function createNumberParam(options: NumberParamOptions): ParameterDefinition {
  return {
    type: SchemaType.NUMBER,
    description: options.description,
    required: options.required,
    ...(options.options || {})
  };
}

/**
 * Shorthand for creating a number parameter definition
 */
export function number(description: string, required = false, options?: Partial<ParameterDefinition>): ParameterDefinition {
  return createNumberParam({ description, required, options });
}

/**
 * Parameter creation options
 */
export interface BooleanParamOptions {
  description: string;
  required: boolean;
  options?: Partial<ParameterDefinition>;
}

/**
 * Create a boolean parameter definition
 */
export function createBooleanParam(options: BooleanParamOptions): ParameterDefinition {
  return {
    type: SchemaType.BOOLEAN,
    description: options.description,
    required: options.required,
    ...(options.options || {})
  };
}

/**
 * Shorthand for creating a boolean parameter definition
 */
export function boolean(description: string, required = false, options?: Partial<ParameterDefinition>): ParameterDefinition {
  return createBooleanParam({ description, required, options });
}

/**
 * Parameter creation options
 */
export interface ArrayParamOptions {
  description: string;
  required: boolean;
  itemType: SchemaType | string;
  itemDescription?: string;
  options?: Partial<ParameterDefinition>;
}

/**
 * Create an array parameter definition
 */
export function createArrayParam(options: ArrayParamOptions): ParameterDefinition {
  const mergedOptions = options.options || {};
  return {
    type: SchemaType.ARRAY,
    description: options.description,
    required: options.required,
    items: {
      type: options.itemType,
      description: options.itemDescription || mergedOptions.items?.description
    },
    ...(options.options || {})
  };
}

/**
 * Shorthand for creating an array parameter definition
 */
export function array(
  description: string, 
  itemType: SchemaType | string, 
  required = false, 
  options?: Partial<ParameterDefinition>
): ParameterDefinition {
  return createArrayParam({ 
    description, 
    required, 
    itemType,
    options
  });
}

/**
 * Base Schema Definitions
 *
 * This file contains the base schema types and validation functions
 * that are used across all tools.
 */

/**
 * Base parameter definition interface
 */
export interface ParameterDefinition {
  type: SchemaType | string;
  description: string;
  required: boolean;
  transform?: (value: any) => any;
  validate?: (value: any) => boolean | string;
  aliases?: string[];
  errorMessages?: {
    type?: string;
    pattern?: string;
    enum?: string;
    required?: string;
    range?: string;
    length?: string;
  };
  [key: string]: any;  // Allow additional properties
}

/**
 * Enhanced parameter definition for better type checking
 */
export interface EnhancedParameterDefinition extends ParameterDefinition {
  aliases?: string[];                // Alternative parameter names
  errorMessages?: {                  // Custom error messages
    type?: string;                   // Custom type error message
    pattern?: string;                // Custom pattern error message
    enum?: string;                   // Custom enum error message
    required?: string;               // Custom required field error message
    range?: string;                  // Custom range error message
    length?: string;                 // Custom length error message
  };
  transform?: (value: any) => any;   // Value transformation function
  validate?: (value: any) => boolean | string; // Custom validation function
}

/**
 * Schema validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  transformedValue?: any;            // Transformed value after validation
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
  /** Convert a comma‑separated string to an array */
  commaStringToArray: (value: string): string[] => {
    if (typeof value !== 'string') return value;
    return value.split(',').map(item => item.trim()).filter(item => item.length > 0);
  },

  /** Convert an array to a comma‑separated string */
  arrayToCommaString: (value: any[]): string => {
    if (!Array.isArray(value)) return value;
    return value.join(',');
  },

  /** Convert a string to lowercase and trim */
  lowercase: (value: string): string => {
    if (typeof value !== 'string') return value;
    return value.toLowerCase().trim();
  },

  /** Format a domain string (remove protocol, www, etc.) */
  formatDomain: (value: string): string => {
    if (typeof value !== 'string') return value;
    // Remove protocol
    let domain = value.replace(/^https?:\/\//, '');
    // Remove paths and query params
    domain = domain.split(/[/?#]/)[0];
    // Remove port number
    domain = domain.split(':')[0];
    // Remove www prefix and trim
    domain = domain.replace(/^www\./, '').trim();
    // Convert to lowercase
    return domain.toLowerCase();
  },

  /** Format a date string */
  formatDate: (value: string | Date): string => {
    if (value instanceof Date) {
      return value.toISOString().split('T')[0];
    }
    if (typeof value !== 'string') return value;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${value}. Please use YYYY-MM-DD format.`);
    }
    return date.toISOString().split('T')[0];
  },

  /** Convert a string (or scalar) to an array of strings */
  stringToArray: (value: any): string[] => {
    if (Array.isArray(value)) return value.map((v: any) => String(v).trim()).filter((v: string) => v.length > 0);
    if (typeof value === 'string') {
      // Check if it looks like a JSON array string
      if (value.trim().startsWith('[') && value.trim().endsWith(']')) {
        try {
          return JSON.parse(value).map((v: any) => String(v).trim()).filter((v: string) => v.length > 0);
        } catch (e: unknown) {
          // If not valid JSON, treat as single item (ignore parse error)
          return [value.trim()];
        }
      }
      return [value.trim()];
    }
    return [String(value).trim()];
  },

  /** Convert a semicolon‑ or comma‑separated string to an array */
  splitStringToArray: (value: any): string[] => {
    if (Array.isArray(value)) return value.map((v: any) => String(v).trim()).filter((v: string) => v.length > 0);
    if (typeof value === 'string') {
      // Check if it looks like a JSON array string
      if (value.trim().startsWith('[') && value.trim().endsWith(']')) {
        try {
          return JSON.parse(value).map((v: any) => String(v).trim()).filter((v: string) => v.length > 0);
        } catch (e: unknown) {
          // If not valid JSON, split by delimiters (ignore parse error)
      return value.split(/[;,]/).map((k: string) => k.trim()).filter((k: string) => k.length > 0);
        }
      }
      return value.split(/[;,]/).map((k: string) => k.trim()).filter((k: string) => k.length > 0);
    }
    return [String(value).trim()];
  }
};

/**
 * Schema validation functions
 */
export const schemaValidation = {
  /** Validate a value against a schema type */
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
        errors: [
          `Invalid type for '${path}'. Expected ${expectedType}, got ${Array.isArray(value) ? 'array' : typeof value}. Please check the parameter type and format.`
        ]
      };
    }

    return { valid: true, errors: [] };
  },

  /** Validate a string value against a pattern */
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

  /** Validate a value against an enum */
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
   * (path is now required **before** the optional bounds)
   */
  validateNumberRange: (
    value: number,
    path: string,
    minimum?: number,
    maximum?: number
  ): ValidationResult => {
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
   * (path is now required **before** the optional lengths)
   */
  validateStringLength: (
    value: string,
    path: string,
    minLength?: number,
    maxLength?: number
  ): ValidationResult => {
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
   * (path is now required **before** the optional bounds)
   */
  validateArrayLength: (
    value: any[],
    path: string,
    minItems?: number,
    maxItems?: number
  ): ValidationResult => {
    const errors: string[] = [];

    if (minItems !== undefined && value.length < minItems) {
      errors.push(`Invalid array length for '${path}'. Array length ${value.length} is less than minimum ${minItems}`);
    }
    if (maxItems !== undefined && value.length > maxItems) {
      errors.push(`Invalid array length for '${path}'. Array length ${value.length} is greater than maximum ${maxItems}`);
    }

    return { valid: errors.length === 0, errors };
  },

  /** Validate a parameter value against a parameter definition */
  validateParameter: (value: any, paramDef: EnhancedParameterDefinition, path: string): ValidationResult => {
    const errors: string[] = [];
    let transformedValue = value;

    // Apply custom transform if provided
    if (paramDef.transform) {
      try {
        transformedValue = paramDef.transform(value);
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        errors.push(`Transform error for '${path}': ${errorMessage}`);
        return { valid: false, errors };
      }
    }

    // Apply custom validation if provided
    if (paramDef.validate) {
      const validationResult = paramDef.validate(transformedValue);
      if (typeof validationResult === 'string') {
        errors.push(validationResult);
        return { valid: false, errors, transformedValue };
      } else if (!validationResult) {
        errors.push(`Custom validation failed for '${path}'`);
        return { valid: false, errors, transformedValue };
      }
    }

    // Validate type
    const typeResult = schemaValidation.validateType(transformedValue, paramDef.type, path);
    if (!typeResult.valid) {
      errors.push(paramDef.errorMessages?.type || typeResult.errors[0]);
      return { valid: false, errors, transformedValue };
    }

    // Validate enum
    if (paramDef.enum && !paramDef.enum.includes(transformedValue)) {
      errors.push(paramDef.errorMessages?.enum || 
        `Invalid value for '${path}'. Expected one of: ${paramDef.enum.join(', ')}, got: ${transformedValue}`);
    }

    // Validate pattern
    if (paramDef.pattern && typeof transformedValue === 'string') {
      const patternResult = schemaValidation.validatePattern(transformedValue, paramDef.pattern, path);
      if (!patternResult.valid) {
        errors.push(paramDef.errorMessages?.pattern || patternResult.errors[0]);
      }
    }

    // Validate number range
    if ((paramDef.type === 'number' || paramDef.type === 'integer') && typeof transformedValue === 'number') {
      const rangeResult = schemaValidation.validateNumberRange(
        transformedValue,
        path,
        paramDef.minimum,
        paramDef.maximum
      );
      if (!rangeResult.valid) {
        errors.push(paramDef.errorMessages?.range || rangeResult.errors[0]);
      }
    }

    // Validate string length
    if (paramDef.type === 'string' && typeof transformedValue === 'string') {
      const lengthResult = schemaValidation.validateStringLength(
        transformedValue,
        path,
        paramDef.minLength,
        paramDef.maxLength
      );
      if (!lengthResult.valid) {
        errors.push(paramDef.errorMessages?.length || lengthResult.errors[0]);
      }
    }

    // Validate array length and items
    if (paramDef.type === 'array' && Array.isArray(transformedValue)) {
      // Array length validation
      const arrayLengthResult = schemaValidation.validateArrayLength(
        transformedValue,
        path,
        paramDef.minItems,
        paramDef.maxItems
      );
      if (!arrayLengthResult.valid) {
        errors.push(paramDef.errorMessages?.length || arrayLengthResult.errors[0]);
      }

      // Array items validation
      if (paramDef.items && transformedValue.length > 0) {
        for (let i = 0; i < transformedValue.length; i++) {
          const itemResult = schemaValidation.validateType(
            transformedValue[i], 
            paramDef.items.type, 
            `${path}[${i}]`
          );
          if (!itemResult.valid) {
            errors.push(itemResult.errors[0]);
          }
        }
      }
    }

    return { 
      valid: errors.length === 0, 
      errors,
      transformedValue: transformedValue !== value ? transformedValue : undefined
    };
  }
};

/* -------------------------------------------------------------------------- */
/*                    Convenience helpers for parameter defs                  */
/* -------------------------------------------------------------------------- */

export interface ParameterCreationOptions {
  type: SchemaType | string;
  description: string;
  required: boolean;
  options?: Partial<EnhancedParameterDefinition>;
}

export function createParameterDefinition(options: ParameterCreationOptions): EnhancedParameterDefinition {
  return {
    type: options.type,
    description: options.description,
    required: options.required,
    ...(options.options || {})
  };
}

/* ---------- string -------------------------------------------------------- */

export interface StringParamOptions {
  description: string;
  required: boolean;
  options?: Partial<EnhancedParameterDefinition>;
}

export function createStringParam(options: StringParamOptions): EnhancedParameterDefinition {
  return {
    type: SchemaType.STRING,
    description: options.description,
    required: options.required,
    ...(options.options || {})
  };
}

export function string(description: string): EnhancedParameterDefinition;
export function string(description: string, required?: boolean): EnhancedParameterDefinition;
export function string(description: string, required?: boolean, options?: Partial<EnhancedParameterDefinition>): EnhancedParameterDefinition {
  return createStringParam({ description, required: required ?? false, options });
}

/* ---------- number -------------------------------------------------------- */

export interface NumberParamOptions {
  description: string;
  required: boolean;
  options?: Partial<EnhancedParameterDefinition>;
}

export function createNumberParam(options: NumberParamOptions): EnhancedParameterDefinition {
  return {
    type: SchemaType.NUMBER,
    description: options.description,
    required: options.required,
    ...(options.options || {})
  };
}

export function number(description: string): EnhancedParameterDefinition;
export function number(description: string, required?: boolean): EnhancedParameterDefinition;
export function number(description: string, required?: boolean, options?: Partial<EnhancedParameterDefinition>): EnhancedParameterDefinition {
  return createNumberParam({ description, required: required ?? false, options });
}

/* ---------- boolean ------------------------------------------------------- */

export interface BooleanParamOptions {
  description: string;
  required: boolean;
  options?: Partial<EnhancedParameterDefinition>;
}

export function createBooleanParam(options: BooleanParamOptions): EnhancedParameterDefinition {
  return {
    type: SchemaType.BOOLEAN,
    description: options.description,
    required: options.required,
    ...(options.options || {})
  };
}

export function boolean(description: string): EnhancedParameterDefinition;
export function boolean(description: string, required?: boolean): EnhancedParameterDefinition;
export function boolean(description: string, required?: boolean, options?: Partial<EnhancedParameterDefinition>): EnhancedParameterDefinition {
  return createBooleanParam({ description, required: required ?? false, options });
}

/* ---------- array --------------------------------------------------------- */

export interface ArrayParamOptions {
  description: string;
  required: boolean;
  itemType: SchemaType | string;
  itemDescription?: string;
  options?: Partial<EnhancedParameterDefinition>;
}

export function createArrayParam(options: ArrayParamOptions): EnhancedParameterDefinition {
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

export function array(description: string, itemType: SchemaType | string): EnhancedParameterDefinition;
export function array(description: string, itemType: SchemaType | string, required: boolean): EnhancedParameterDefinition;
export function array(description: string, itemType: SchemaType | string, required: boolean, options: Partial<EnhancedParameterDefinition>): EnhancedParameterDefinition;
export function array(description: string, itemType: SchemaType | string, required?: boolean, options?: Partial<EnhancedParameterDefinition>): EnhancedParameterDefinition {
  return createArrayParam({
    description,
    required: required ?? false,
    itemType,
    options
  });
}

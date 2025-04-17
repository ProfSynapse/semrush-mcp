/**
 * Keyword-specific Schema Definitions
 * 
 * This file contains schema definitions for keyword-related tools.
 */

import { 
  SchemaType, 
  schemaTransformations, 
  createStringParam, 
  createBooleanParam, 
  createArrayParam,
  createParameterDefinition,
  EnhancedParameterDefinition
} from './base-schema.js';

/**
 * Keyword validation error messages
 */
const keywordErrorMessages = {
  type: 'Keyword must be a text string',
  length: 'Keyword must be between 2 and 80 characters',
  pattern: 'Keyword contains invalid characters',
  required: 'Keyword is required'
};

/**
 * Keywords array validation error messages
 */
const keywordsArrayErrorMessages = {
  type: 'Keywords must be provided as an array or comma-separated string',
  length: 'Number of keywords exceeds maximum limit',
  required: 'At least one keyword is required'
};

/**
 * Create a keyword parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a keyword
 */
export function createKeywordParam(required = true): EnhancedParameterDefinition {
  return createStringParam({
    description: 'Keyword or phrase to analyze (e.g., "digital marketing", "seo tools"). IMPORTANT: Must be a single string, not an array. Use specific, targeted phrases for best results. Do not include special characters or excessive punctuation.',
    required,
    options: {
      transform: schemaTransformations.lowercase,
      minLength: 2,
      maxLength: 80,
      examples: ['digital marketing', 'seo tools', 'best practices'],
      errorMessages: keywordErrorMessages,
      pattern: '^[a-zA-Z0-9\\s\\-\'",.!?]+$',
      validate: (value: string) => {
        if (value.trim().length === 0) return 'Keyword cannot be empty';
        if (value.match(/\s{2,}/)) return 'Keyword cannot contain multiple consecutive spaces';
        if (value.match(/[<>{}[\]\\|@#$%^&*_+=]/)) return 'Keyword contains unsupported special characters';
        return true;
      }
    }
  });
}

/**
 * Create a keywords array parameter definition
 * @param maxItems Maximum number of keywords allowed
 * @param required Whether the parameter is required
 * @returns A parameter definition for a keywords array
 */
export function createKeywordsArrayParam(maxItems = 100, required = true): EnhancedParameterDefinition {
  return createArrayParam({
    description: `Array of keywords to analyze (maximum ${maxItems}). IMPORTANT: Must be an array like ["keyword1", "keyword2"], not a single string. Used for batch analysis tools like batch_keyword_overview and keyword_difficulty. Each keyword should be a specific, targeted phrase.`,
    required,
    itemType: SchemaType.STRING,
    itemDescription: 'Keyword to analyze (e.g., "digital marketing", "seo tools")',
    options: {
      maxItems,
      minItems: 1,
      transform: (value: any) => {
        // Handle both string array and comma-separated string
        if (typeof value === 'string') {
          return value.split(/[;,]/).map((k: string) => schemaTransformations.lowercase(k.trim()));
        }
        return Array.isArray(value) ? value.map(k => schemaTransformations.lowercase(k)) : [value];
      },
      examples: [['digital marketing', 'seo tools'], ['keyword research', 'content marketing', 'link building']],
      errorMessages: keywordsArrayErrorMessages,
      validate: (value: any[]) => {
        if (!Array.isArray(value)) return 'Must provide an array of keywords';
        if (new Set(value).size !== value.length) return 'Duplicate keywords are not allowed';
        if (value.some(k => k.length < 2)) return 'Each keyword must be at least 2 characters long';
        if (value.some(k => k.length > 80)) return 'Each keyword must be at most 80 characters long';
        return true;
      }
    }
  });
}

/**
 * Sort parameter validation error messages
 */
const sortErrorMessages = {
  type: 'Sort field must be a string',
  enum: 'Invalid sort field. Please use one of the supported fields',
  required: 'Sort field is required'
};

/**
 * Sort order validation error messages
 */
const sortOrderErrorMessages = {
  type: 'Sort order must be a string',
  enum: 'Sort order must be either "asc" or "desc"',
  required: 'Sort order is required'
};

/**
 * Filter validation error messages
 */
const filterErrorMessages = {
  type: 'Filter must be a valid object',
  pattern: 'Filter has invalid structure',
  required: 'Filter criteria is required',
  validate: 'Filter values must be valid numbers'
};

/**
 * Create a boolean parameter definition for restrict_to_db
 * @param required Whether the parameter is required
 * @returns A parameter definition for restrict_to_db
 */
export function createRestrictToDbParam(required = false): EnhancedParameterDefinition {
  return createBooleanParam({
    description: 'Search in single database only. When true, only searches the specified database. When false, may return results from multiple databases.',
    required,
    options: {
      default: false,
      examples: [true, false]
    }
  });
}

/**
 * Create a sort parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for sort
 */
export function createSortParam(required = false): EnhancedParameterDefinition {
  return createStringParam({
    description: 'Sort results by the specified field. Available sort fields depend on the specific tool.',
    required,
    options: {
      enum: ['volume', 'difficulty', 'cpc', 'competition', 'relevance'],
      examples: ['volume', 'difficulty'],
      errorMessages: sortErrorMessages,
      transform: (value: string) => value.toLowerCase().trim()
    }
  });
}

/**
 * Create a sort order parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for sort order
 */
export function createSortOrderParam(required = false): EnhancedParameterDefinition {
  return createStringParam({
    description: 'Sort order for results (ascending or descending).',
    required,
    options: {
      enum: ['asc', 'desc'],
      default: 'desc',
      examples: ['asc', 'desc'],
      errorMessages: sortOrderErrorMessages,
      transform: (value: string) => value.toLowerCase().trim()
    }
  });
}

/**
 * Create a filter parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for filter
 */
export function createFilterParam(required = false): EnhancedParameterDefinition {
  return createParameterDefinition({
    type: SchemaType.OBJECT,
    description: 'Filter results based on specified criteria. The structure depends on the specific tool.',
    required,
    options: {
      examples: [
        { volume: { min: 1000 } },
        { difficulty: { max: 70 } },
        { cpc: { min: 0.5, max: 5 } }
      ],
      errorMessages: filterErrorMessages,
      validate: (value: any) => {
        if (!value || typeof value !== 'object') return 'Filter must be an object';
        
        // Check filter structure
        const validFields = ['volume', 'difficulty', 'cpc', 'competition'];
        const validOperators = ['min', 'max'];
        
        for (const [field, criteria] of Object.entries(value)) {
          if (!validFields.includes(field)) {
            return `Invalid filter field "${field}". Valid fields are: ${validFields.join(', ')}`;
          }
          
          if (!criteria || typeof criteria !== 'object') {
            return `Filter criteria for "${field}" must be an object with min/max values`;
          }
          
          for (const [op, val] of Object.entries(criteria as any)) {
            if (!validOperators.includes(op)) {
              return `Invalid operator "${op}" for "${field}". Use min or max`;
            }
            
            if (typeof val !== 'number' || isNaN(val)) {
              return `Filter value for "${field}.${op}" must be a number`;
            }
          }
        }
        
        return true;
      }
    }
  });
}

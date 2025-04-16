/**
 * Keyword-specific Schema Definitions
 * 
 * This file contains schema definitions for keyword-related tools.
 */

import { ParameterDefinition } from '../validation/unified-tool-registry.js';
import { 
  SchemaType, 
  schemaTransformations, 
  createStringParam, 
  createBooleanParam, 
  createArrayParam,
  createParameterDefinition
} from './base-schema.js';

/**
 * Create a keyword parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a keyword
 */
export function createKeywordParam(required = true): ParameterDefinition {
  return createStringParam({
    description: 'Keyword or phrase to analyze (e.g., "digital marketing", "seo tools"). IMPORTANT: Must be a single string, not an array. Use specific, targeted phrases for best results. Do not include special characters or excessive punctuation.',
    required,
    options: {
      transform: schemaTransformations.lowercase,
      minLength: 2,
      maxLength: 80,
      examples: ['digital marketing', 'seo tools', 'best practices']
    }
  });
}

/**
 * Create a keywords array parameter definition
 * @param maxItems Maximum number of keywords allowed
 * @param required Whether the parameter is required
 * @returns A parameter definition for a keywords array
 */
export function createKeywordsArrayParam(maxItems = 100, required = true): ParameterDefinition {
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
          return value.split(/[;,]/).map((k: string) => k.trim());
        }
        return Array.isArray(value) ? value : [value];
      },
      examples: [['digital marketing', 'seo tools'], ['keyword research', 'content marketing', 'link building']]
    }
  });
}

/**
 * Create a boolean parameter definition for restrict_to_db
 * @param required Whether the parameter is required
 * @returns A parameter definition for restrict_to_db
 */
export function createRestrictToDbParam(required = false): ParameterDefinition {
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
export function createSortParam(required = false): ParameterDefinition {
  return createStringParam({
    description: 'Sort results by the specified field. Available sort fields depend on the specific tool.',
    required,
    options: {
      enum: ['volume', 'difficulty', 'cpc', 'competition', 'relevance'],
      examples: ['volume', 'difficulty']
    }
  });
}

/**
 * Create a sort order parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for sort order
 */
export function createSortOrderParam(required = false): ParameterDefinition {
  return createStringParam({
    description: 'Sort order for results (ascending or descending).',
    required,
    options: {
      enum: ['asc', 'desc'],
      default: 'desc',
      examples: ['asc', 'desc']
    }
  });
}

/**
 * Create a filter parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for filter
 */
export function createFilterParam(required = false): ParameterDefinition {
  return createParameterDefinition({
    type: SchemaType.OBJECT,
    description: 'Filter results based on specified criteria. The structure depends on the specific tool.',
    required,
    options: {
      examples: [
        { volume: { min: 1000 } },
        { difficulty: { max: 70 } },
        { cpc: { min: 0.5, max: 5 } }
      ]
    }
  });
}

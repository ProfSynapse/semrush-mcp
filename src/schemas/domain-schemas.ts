/**
 * Domain-specific Schema Definitions
 * 
 * This file contains schema definitions for domain-related tools.
 */

import { ParameterDefinition } from '../validation/unified-tool-registry.js';
import { 
  SchemaType, 
  schemaTransformations, 
  createStringParam, 
  createNumberParam, 
  createArrayParam 
} from './base-schema.js';

/**
 * Create a domain parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a domain
 */
export function createDomainParam(required = true): ParameterDefinition {
  return createStringParam({
    description: 'Domain name to analyze (e.g., "semrush.com", "ahrefs.com"). IMPORTANT: Do not include http:// or https:// prefixes, www. is optional. Must be a single domain string, not an array. For domain-specific tools, use this parameter instead of "keyword".',
    required,
    options: {
      transform: schemaTransformations.formatDomain,
      pattern: '^([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$',
      examples: ['example.com', 'subdomain.example.org']
    }
  });
}

/**
 * Create a database parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a database
 */
export function createDatabaseParam(required = false): ParameterDefinition {
  return createStringParam({
    description: 'Database to use (country code). Specifies which regional database to query for results. Default is "us" if not specified.',
    required,
    options: {
      enum: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'ru', 'jp', 'in', 'cn'],
      default: required ? undefined : 'us',
      examples: ['us', 'uk', 'de']
    }
  });
}

/**
 * Create a limit parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a limit
 */
export function createLimitParam(required = false): ParameterDefinition {
  return createNumberParam({
    description: 'Maximum number of results to return (range: 1-1000). Controls the size of the result set.',
    required,
    options: {
      minimum: 1,
      maximum: 1000,
      default: 100,
      examples: [10, 50, 100]
    }
  });
}

/**
 * Create a target parameter definition (for backlinks)
 * @param required Whether the parameter is required
 * @returns A parameter definition for a target
 */
export function createTargetParam(required = true): ParameterDefinition {
  return createStringParam({
    description: 'Domain or URL to analyze for backlinks (e.g., "semrush.com", "ahrefs.com/blog"). Can be a full domain or a specific URL path. Used specifically for backlink analysis tools. Do not include http:// or https:// prefixes.',
    required,
    options: {
      transform: schemaTransformations.formatDomain,
      examples: ['example.com', 'example.com/page']
    }
  });
}

/**
 * Create a domains array parameter definition
 * @param maxItems Maximum number of domains allowed
 * @param required Whether the parameter is required
 * @returns A parameter definition for a domains array
 */
export function createDomainsArrayParam(maxItems = 5, required = true): ParameterDefinition {
  return createArrayParam({
    description: `Array of domains to analyze (maximum ${maxItems} domains). IMPORTANT: Must be an array like ["example.com", "example.org"], not a single string. Each domain should be formatted without http/https prefixes.`,
    required,
    itemType: SchemaType.STRING,
    itemDescription: 'Domain to analyze (e.g., "semrush.com", "ahrefs.com")',
    options: {
      maxItems,
      minItems: 1,
      transform: (value: any) => {
        // Handle both string array and comma-separated string
        if (typeof value === 'string') {
          return value.split(',').map((d: string) => schemaTransformations.formatDomain(d.trim()));
        }
        if (Array.isArray(value)) {
          return value.map((d: string) => schemaTransformations.formatDomain(d));
        }
        return value;
      },
      examples: [['example.com', 'example.org']]
    }
  });
}

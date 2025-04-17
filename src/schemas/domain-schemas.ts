/**
 * Domain-specific Schema Definitions
 * 
 * This file contains schema definitions for domain-related tools.
 */
import { 
  SchemaType, 
  schemaTransformations, 
  createStringParam, 
  createNumberParam, 
  createArrayParam,
  EnhancedParameterDefinition 
} from './base-schema.js';

/**
 * Domain validation error messages
 */
const domainErrorMessages = {
  type: 'Domain must be a string value (e.g., "example.com")',
  pattern: 'Invalid domain format. Domain should be like "example.com" without http/https prefix',
  length: 'Domain name is too long or too short',
  required: 'Domain name is required'
};

/**
 * Target validation error messages
 */
const targetErrorMessages = {
  type: 'Target must be a string value (e.g., "example.com" or "example.com/page")',
  format: 'Invalid target format. Should be a domain with optional path, without http/https prefix',
  required: 'Target URL is required'
};

/**
 * Database validation error messages
 */
const databaseErrorMessages = {
  type: 'Database must be a string value (country code)',
  enum: 'Invalid database. Must be one of the supported country codes',
  required: 'Database country code is required'
};

/**
 * Create a domain parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a domain
 */
export function createDomainParam(required = true): EnhancedParameterDefinition {
  return createStringParam({
    description: 'Domain name to analyze (e.g., "semrush.com", "ahrefs.com"). IMPORTANT: Do not include http:// or https:// prefixes, www. is optional. Must be a single domain string, not an array. For domain-specific tools, use this parameter instead of "keyword".',
    required,
    options: {
      transform: schemaTransformations.formatDomain,
      pattern: '^([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$',
      examples: ['example.com', 'subdomain.example.org'],
      errorMessages: domainErrorMessages,
      validate: (value: string) => {
        if (!value.includes('.')) return 'Domain must include a valid top-level domain';
        if (value.startsWith('-') || value.endsWith('-')) return 'Domain cannot start or end with a hyphen';
        return true;
      }
    }
  });
}

/**
 * Create a database parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a database
 */
export function createDatabaseParam(required = false): EnhancedParameterDefinition {
  return createStringParam({
    description: 'Database to use (country code). Specifies which regional database to query for results. Default is "us" if not specified.',
    required,
    options: {
      enum: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'ru', 'jp', 'in', 'cn'],
      default: required ? undefined : 'us',
      examples: ['us', 'uk', 'de'],
      errorMessages: databaseErrorMessages,
      transform: (value: string) => value.toLowerCase().trim()
    }
  });
}

/**
 * Limit validation error messages
 */
const limitErrorMessages = {
  type: 'Limit must be a number',
  range: 'Limit must be between 1 and 1000',
  required: 'Result limit is required'
};

/**
 * Create a limit parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a limit
 */
export function createLimitParam(required = false): EnhancedParameterDefinition {
  return createNumberParam({
    description: 'Maximum number of results to return (range: 1-1000). Controls the size of the result set.',
    required,
    options: {
      minimum: 1,
      maximum: 1000,
      default: 100,
      examples: [10, 50, 100],
      errorMessages: limitErrorMessages,
      transform: (value: any) => {
        // Convert string numbers to actual numbers
        if (typeof value === 'string') {
          const num = parseInt(value, 10);
          if (isNaN(num)) {
            throw new Error('Limit must be a valid number');
          }
          return num;
        }
        return value;
      },
      validate: (value: number) => {
        if (!Number.isInteger(value)) return 'Limit must be a whole number';
        return true;
      }
    }
  });
}

/**
 * Create a target parameter definition (for backlinks)
 * @param required Whether the parameter is required
 * @returns A parameter definition for a target
 */
export function createTargetParam(required = true): EnhancedParameterDefinition {
  return createStringParam({
    description: 'Domain or URL to analyze for backlinks (e.g., "semrush.com", "ahrefs.com/blog"). Can be a full domain or a specific URL path. Used specifically for backlink analysis tools. Do not include http:// or https:// prefixes.',
    required,
    options: {
      transform: schemaTransformations.formatDomain,
      examples: ['example.com', 'example.com/page'],
      errorMessages: targetErrorMessages,
      aliases: ['domain'], // Allow 'domain' as an alias for 'target'
      validate: (value: string) => {
        if (!value.includes('.')) return 'Target must include a valid domain name';
        if (value.includes('?')) return 'Target should not include query parameters';
        if (value.includes('#')) return 'Target should not include fragment identifiers';
        return true;
      }
    }
  });
}

/**
 * Create a domains array parameter definition
 * @param maxItems Maximum number of domains allowed
 * @param required Whether the parameter is required
 * @returns A parameter definition for a domains array
 */
export function createDomainsArrayParam(maxItems = 5, required = true): EnhancedParameterDefinition {
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
          return value.split(/[,;]/).map((d: string) => schemaTransformations.formatDomain(d.trim()));
        }
        if (Array.isArray(value)) {
          return value.map((d: string) => schemaTransformations.formatDomain(d));
        }
        return value;
      },
      examples: [['example.com', 'example.org']],
      errorMessages: {
        type: 'Domains must be provided as an array or comma-separated string',
        length: `Number of domains must be between 1 and ${maxItems}`,
        required: 'At least one domain is required'
      },
      validate: (value: any[]) => {
        if (!Array.isArray(value)) return 'Must provide an array of domains';
        if (value.some(d => !d.includes('.'))) return 'All domains must include a valid top-level domain';
        if (new Set(value).size !== value.length) return 'Duplicate domains are not allowed';
        return true;
      }
    }
  });
}

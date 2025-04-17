/**
 * Helper functions for creating common parameter definitions
 * 
 * This module provides reusable functions for creating parameter definitions
 * that are commonly used across different tools.
 */

import { TypedParameter, createParam } from '../types/tool-types.js';

/**
 * Common transformations for parameters
 */
export const transformations = {
  commaStringToArray: (value: string): string[] => {
    if (typeof value !== 'string') return value as any;
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
    if (typeof value !== 'string') return value as any;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${value}`);
    }
    return date.toISOString().split('T')[0];
  }
};

/**
 * Create a keyword parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a keyword
 */
export function createKeywordParam(required: boolean = true): TypedParameter<string> {
  return createParam.string({
    description: 'Keyword or phrase to analyze (e.g., "digital marketing", "seo tools"). IMPORTANT: Must be a single string, not an array. Use specific, targeted phrases for best results. Do not include special characters or excessive punctuation.',
    required,
    minLength: 2,
    maxLength: 80,
    examples: ['digital marketing', 'seo tools']
  });
}

/**
 * Create a database parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a database
 */
export function createDatabaseParam(required: boolean = false): TypedParameter<string> {
  return createParam.string({
    description: 'Database to use (country code). Specifies which regional database to query for results. Default is "us" if not specified. NOTE: For traffic tools, use "country" parameter instead of "database".',
    required,
    enum: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'ru', 'jp', 'in', 'cn'] as readonly string[],
    default: required ? undefined : 'us',
    examples: ['us', 'uk', 'ca']
  });
}

/**
 * Create a domain parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a domain
 */
export function createDomainParam(required: boolean = true): TypedParameter<string> {
  return createParam.string({
    description: 'Domain name to analyze (e.g., "semrush.com", "ahrefs.com"). IMPORTANT: Do not include http:// or https:// prefixes, www. is optional. Must be a single domain string, not an array. For domain-specific tools, use this parameter instead of "keyword".',
    required,
    pattern: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
    examples: ['semrush.com', 'ahrefs.com']
  });
}

/**
 * Create a limit parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a limit
 */
export function createLimitParam(required: boolean = false): TypedParameter<number> {
  return createParam.integer({
    description: 'Maximum number of results to return (range: 1-1000). Controls the size of the result set. This is optional and defaults to 100. NOTE: Not all tools support this parameter (e.g., keyword_overview does NOT accept a limit parameter).',
    required,
    minimum: 1,
    maximum: 1000,
    default: 100,
    examples: [10, 50, 100, 500]
  });
}

/**
 * Create a country parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a country
 */
export function createCountryParam(required: boolean = false): TypedParameter<string> {
  return createParam.string({
    description: 'Country code for traffic data (e.g., "us", "uk", "ca"). Specifies which country\'s traffic data to analyze. Default is "us" if not specified. IMPORTANT: Traffic tools use "country" parameter, NOT "database" parameter.',
    required,
    enum: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'ru', 'jp', 'in', 'cn'] as readonly string[],
    default: 'us',
    examples: ['us', 'uk', 'ca']
  });
}

/**
 * Create a target parameter definition (for backlinks)
 * @param required Whether the parameter is required
 * @returns A parameter definition for a target
 */
export function createTargetParam(required: boolean = true): TypedParameter<string> {
  return createParam.string({
    description: 'Domain or URL to analyze for backlinks (e.g., "semrush.com", "ahrefs.com/blog"). Can be a full domain or a specific URL path. Used specifically for backlink analysis tools. Do not include http:// or https:// prefixes.',
    required,
    examples: ['semrush.com', 'ahrefs.com/blog']
  });
}

/**
 * Create a domains array parameter definition
 * @param maxItems Maximum number of domains allowed
 * @param required Whether the parameter is required
 * @returns A parameter definition for a domains array
 */
export function createDomainsArrayParam(maxItems: number = 5, required: boolean = true): TypedParameter<string[]> {
  return createParam.array({
    description: `Array of domains to analyze (maximum ${maxItems} domains). IMPORTANT: Must be an array like ["example.com", "example.org"], not a single string. Used for comparative analysis tools like traffic_summary. Each domain should be formatted without http/https prefixes.`,
    required,
    maxItems,
    minItems: 1,
    examples: [['semrush.com', 'ahrefs.com'], ['google.com', 'bing.com', 'yahoo.com']]
  });
}

/**
 * Create a keywords array parameter definition
 * @param maxItems Maximum number of keywords allowed
 * @param required Whether the parameter is required
 * @returns A parameter definition for a keywords array
 */
export function createKeywordsArrayParam(maxItems: number = 100, required: boolean = true): TypedParameter<string[]> {
  return createParam.array({
    description: `Array of keywords to analyze (maximum ${maxItems}). IMPORTANT: Must be an array like ["keyword1", "keyword2"], not a single string. Used for batch analysis tools like batch_keyword_overview and keyword_difficulty. Each keyword should be a specific, targeted phrase.`,
    required,
    maxItems,
    minItems: 1,
    examples: [['digital marketing', 'seo tools'], ['content marketing', 'social media', 'email marketing']]
  });
}

/**
 * Custom parameter validation functions
 */
export const customValidators = {
  isDomain: (value: string): boolean => {
    if (typeof value !== 'string') return false;
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(value);
  },
  
  isValidKeyword: (value: string): boolean => {
    if (typeof value !== 'string') return false;
    return value.length >= 2 && value.length <= 80;
  },
  
  isValidDate: (value: string): boolean => {
    if (typeof value !== 'string') return false;
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
};

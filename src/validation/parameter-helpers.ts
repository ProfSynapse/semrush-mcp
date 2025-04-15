/**
 * Helper functions for creating common parameter definitions
 * 
 * This module provides reusable functions for creating parameter definitions
 * that are commonly used across different tools.
 */

import { ParameterDefinition, transformations } from './unified-tool-registry.js';

/**
 * Create a keyword parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a keyword
 */
export function createKeywordParam(required: boolean = true): ParameterDefinition {
  return {
    type: 'string',
    description: 'Keyword or phrase to analyze (e.g., "digital marketing", "seo tools"). Use specific, targeted phrases for best results. Do not include special characters or excessive punctuation.',
    required,
    aliases: ['phrase', 'query'],
    transform: transformations.lowercase,
    minLength: 2,
    maxLength: 80
  };
}

/**
 * Create a database parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a database
 */
export function createDatabaseParam(required: boolean = false): ParameterDefinition {
  return {
    type: 'string',
    description: 'Database to use (country code). Specifies which regional database to query for results. Default is "us" if not specified.',
    required,
    enum: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'ru', 'jp', 'in', 'cn'],
    default: required ? undefined : 'us'
  };
}

/**
 * Create a domain parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a domain
 */
export function createDomainParam(required: boolean = true): ParameterDefinition {
  return {
    type: 'string',
    description: 'Domain name to analyze (e.g., "semrush.com", "ahrefs.com"). IMPORTANT: Do not include http:// or https:// prefixes, www. is optional. For domain-specific tools, use this parameter instead of "keyword".',
    required,
    transform: transformations.formatDomain,
    pattern: '^([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}$'
  };
}

/**
 * Create a limit parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a limit
 */
export function createLimitParam(required: boolean = false): ParameterDefinition {
  return {
    type: 'number',
    description: 'Maximum number of results to return (range: 1-1000). Controls the size of the result set. NOTE: Not all tools support this parameter (e.g., keyword_overview does NOT accept a limit parameter).',
    required,
    minimum: 1,
    maximum: 1000,
    default: 100
  };
}

/**
 * Create a country parameter definition
 * @param required Whether the parameter is required
 * @returns A parameter definition for a country
 */
export function createCountryParam(required: boolean = false): ParameterDefinition {
  return {
    type: 'string',
    description: 'Country code for traffic data (e.g., "us", "uk", "ca"). Specifies which country\'s traffic data to analyze. Default is "us" if not specified.',
    required,
    enum: ['us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'ru', 'jp', 'in', 'cn'],
    default: 'us'
  };
}

/**
 * Create a target parameter definition (for backlinks)
 * @param required Whether the parameter is required
 * @returns A parameter definition for a target
 */
export function createTargetParam(required: boolean = true): ParameterDefinition {
  return {
    type: 'string',
    description: 'Domain or URL to analyze for backlinks (e.g., "semrush.com", "ahrefs.com/blog"). Can be a full domain or a specific URL path. Used specifically for backlink analysis tools.',
    required,
    transform: transformations.formatDomain
  };
}

/**
 * Create a domains array parameter definition
 * @param maxItems Maximum number of domains allowed
 * @param required Whether the parameter is required
 * @returns A parameter definition for a domains array
 */
export function createDomainsArrayParam(maxItems: number = 5, required: boolean = true): ParameterDefinition {
  return {
    type: 'array',
    description: `Array of domains to analyze (maximum ${maxItems} domains). Used for comparative analysis tools like traffic_summary. Each domain should be formatted without http/https prefixes.`,
    required,
    maxItems,
    minItems: 1,
    items: {
      type: 'string',
      description: 'Domain to analyze (e.g., "semrush.com", "ahrefs.com")'
    },
    transform: transformations.arrayToCommaString
  };
}

/**
 * Create a keywords array parameter definition
 * @param maxItems Maximum number of keywords allowed
 * @param required Whether the parameter is required
 * @returns A parameter definition for a keywords array
 */
export function createKeywordsArrayParam(maxItems: number = 100, required: boolean = true): ParameterDefinition {
  return {
    type: 'array',
    description: `Array of keywords to analyze (maximum ${maxItems}). Used for batch analysis tools like batch_keyword_overview and keyword_difficulty. Each keyword should be a specific, targeted phrase.`,
    required,
    maxItems,
    minItems: 1,
    items: {
      type: 'string',
      description: 'Keyword to analyze (e.g., "digital marketing", "seo tools")'
    },
    transform: transformations.arrayToCommaString
  };
}
/**
 * Configuration settings for the Keyword Agent
 * Handles settings and constants for keyword analysis operations
 */
export const KeywordAgentConfig = {
  // Batch processing settings
  batchSize: 100,
  maxKeywordsPerRequest: 50,
  
  // API request configuration
  rateLimitDelay: 1000,
  maxConcurrentRequests: 3,
  requestTimeout: 30000,
  retryAttempts: 3,
  
  // Analysis thresholds
  minSearchVolume: 10,
  maxKeywordLength: 100,
  minKeywordLength: 2,
  
  // Cache settings
  cacheDuration: 12 * 60 * 60 * 1000, // 12 hours
  maxCacheEntries: 10000,
  
  // Rate limiting
  maxRequestsPerMinute: 60,
  burstLimit: 10
};

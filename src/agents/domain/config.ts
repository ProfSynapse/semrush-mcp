/**
 * Configuration settings for the Domain Agent
 * Handles settings and constants for domain analysis operations
 */
export const DomainAgentConfig = {
  // API request configuration
  maxConcurrentRequests: 5,
  defaultTimeout: 30000,
  retryAttempts: 3,
  
  // Rate limiting settings
  requestDelay: 1000,
  maxRequestsPerMinute: 30,
  
  // Analysis settings
  minDomainLength: 3,
  maxDomainLength: 253,
  
  // Cache settings
  cacheDuration: 24 * 60 * 60 * 1000, // 24 hours
  maxCacheSize: 1000
};

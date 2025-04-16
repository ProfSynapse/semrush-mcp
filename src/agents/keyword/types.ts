/**
 * Type definitions for Keyword Agent
 * Contains interfaces and types for keyword analysis functionality
 */

/**
 * Result of a keyword analysis operation
 */
export interface KeywordAnalysisResult {
  keyword: string;
  metrics: KeywordMetrics;
  serp: SerpData;
  trend: KeywordTrend[];
}

/**
 * Core keyword metrics
 */
export interface KeywordMetrics {
  searchVolume: number;
  difficulty: number;
  cpc: number;
  competition: number;
  clicks: {
    organic: number;
    paid: number;
  };
}

/**
 * SERP (Search Engine Results Page) data
 */
export interface SerpData {
  topResults: SerpResult[];
  features: string[];
  totalResults: number;
  paidCount: number;
}

/**
 * Individual SERP result
 */
export interface SerpResult {
  url: string;
  title: string;
  position: number;
  type: ResultType;
  metrics?: {
    trafficShare: number;
    relevance: number;
  };
}

/**
 * Historical trend data for a keyword
 */
export interface KeywordTrend {
  date: Date;
  searchVolume: number;
  difficulty: number;
  cpc: number;
}

/**
 * Input parameters for keyword analysis
 */
export interface KeywordAnalysisParams {
  keyword: string;
  location?: string;
  language?: string;
  device?: DeviceType;
  historical?: boolean;
}

/**
 * Type of search result
 */
export type ResultType = 'organic' | 'featured' | 'knowledge' | 'local' | 'video' | 'image';

/**
 * Device type for search
 */
export type DeviceType = 'desktop' | 'mobile' | 'tablet';

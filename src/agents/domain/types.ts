/**
 * Type definitions for Domain Agent
 * Contains interfaces and types for domain analysis functionality
 */

/**
 * Result of a domain analysis operation
 */
export interface DomainAnalysisResult {
  domain: string;
  metrics: DomainMetrics;
  analysis: AnalysisData;
  lastUpdated: Date;
}

/**
 * Core domain metrics
 */
export interface DomainMetrics {
  trafficScore: number;
  authorityScore: number;
  backlinks: number;
  organicTraffic: number;
  paidTraffic: number;
}

/**
 * Detailed analysis data for a domain
 */
export interface AnalysisData {
  competitors: string[];
  keywords: {
    organic: string[];
    paid: string[];
  };
  marketShare: number;
  visibilityTrend: VisibilityTrend[];
}

/**
 * Trend data point for domain visibility
 */
export interface VisibilityTrend {
  date: Date;
  visibility: number;
  change: number;
}

/**
 * Input parameters for domain analysis
 */
export interface DomainAnalysisParams {
  domain: string;
  includeHistorical?: boolean;
  timeframe?: TimeFrame;
  competitors?: number;
}

/**
 * Time frame for analysis
 */
export type TimeFrame = '1m' | '3m' | '6m' | '12m' | 'all';

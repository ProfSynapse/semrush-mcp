/**
 * Utility functions for keyword analysis operations
 * Provides common keyword-related functionality used across the keyword agent
 */

import { KeywordAnalysisResult, KeywordMetrics, SerpData, KeywordTrend } from '../types.js';
import { KeywordAgentConfig } from '../config.js';

export class KeywordOperations {
  /**
   * Validates a keyword according to configuration rules
   * @param keyword Keyword to validate
   * @returns True if keyword is valid, false otherwise
   */
  static validateKeyword(keyword: string): boolean {
    if (!keyword) return false;
    
    // Check length constraints
    if (keyword.length < KeywordAgentConfig.minKeywordLength || 
        keyword.length > KeywordAgentConfig.maxKeywordLength) {
      return false;
    }

    // Basic keyword format validation (alphanumeric with spaces and basic punctuation)
    const keywordRegex = /^[a-zA-Z0-9\s.,?!-]+$/;
    return keywordRegex.test(keyword);
  }

  /**
   * Formats keyword metrics for consistent output
   * @param metrics Raw metrics to format
   * @returns Formatted metrics object
   */
  static formatKeywordMetrics(metrics: any): KeywordMetrics {
    return {
      searchVolume: Number(metrics.searchVolume || 0),
      difficulty: Number(Number(metrics.difficulty || 0).toFixed(2)),
      cpc: Number(Number(metrics.cpc || 0).toFixed(2)),
      competition: Number(Number(metrics.competition || 0).toFixed(2)),
      clicks: {
        organic: Number(metrics.clicks?.organic || 0),
        paid: Number(metrics.clicks?.paid || 0)
      }
    };
  }

  /**
   * Sanitizes and normalizes a keyword
   * @param keyword Keyword to normalize
   * @returns Normalized keyword
   */
  static normalizeKeyword(keyword: string): string {
    // Convert to lowercase and trim whitespace
    keyword = keyword.toLowerCase().trim();
    
    // Remove multiple spaces
    keyword = keyword.replace(/\s+/g, ' ');
    
    // Remove leading/trailing punctuation
    keyword = keyword.replace(/^[.,!?-]+|[.,!?-]+$/g, '');
    
    return keyword;
  }

  /**
   * Merges multiple keyword analysis results
   * @param results Array of analysis results to merge
   * @returns Merged analysis result
   */
  static mergeAnalysisResults(results: KeywordAnalysisResult[]): KeywordAnalysisResult {
    if (!results.length) {
      throw new Error('No results to merge');
    }

    return {
      keyword: results[0].keyword,
      metrics: this.calculateAverageMetrics(results.map(r => r.metrics)),
      serp: this.mergeSerpData(results.map(r => r.serp)),
      trend: this.mergeKeywordTrends(results.map(r => r.trend))
    };
  }

  /**
   * Calculates average metrics from multiple sets
   * @private
   */
  private static calculateAverageMetrics(metricsArray: KeywordMetrics[]): KeywordMetrics {
    const sum = metricsArray.reduce((acc, metrics) => ({
      searchVolume: acc.searchVolume + metrics.searchVolume,
      difficulty: acc.difficulty + metrics.difficulty,
      cpc: acc.cpc + metrics.cpc,
      competition: acc.competition + metrics.competition,
      clicks: {
        organic: acc.clicks.organic + metrics.clicks.organic,
        paid: acc.clicks.paid + metrics.clicks.paid
      }
    }));

    const count = metricsArray.length;
    return {
      searchVolume: Math.round(sum.searchVolume / count),
      difficulty: Number((sum.difficulty / count).toFixed(2)),
      cpc: Number((sum.cpc / count).toFixed(2)),
      competition: Number((sum.competition / count).toFixed(2)),
      clicks: {
        organic: Math.round(sum.clicks.organic / count),
        paid: Math.round(sum.clicks.paid / count)
      }
    };
  }

  /**
   * Merges SERP data from multiple sources
   * @private
   */
  private static mergeSerpData(serpArray: SerpData[]): SerpData {
    const features = new Set<string>();
    let totalResults = 0;
    let paidCount = 0;

    serpArray.forEach(serp => {
      serp.features.forEach(feature => features.add(feature));
      totalResults += serp.totalResults;
      paidCount += serp.paidCount;
    });

    return {
      // Use the most recent SERP results
      topResults: serpArray[0].topResults,
      features: Array.from(features),
      totalResults: Math.round(totalResults / serpArray.length),
      paidCount: Math.round(paidCount / serpArray.length)
    };
  }

  /**
   * Merges keyword trends from multiple sources
   * @private
   */
  private static mergeKeywordTrends(trendsArray: KeywordTrend[][]): KeywordTrend[] {
    // Use the most recent trend data
    return trendsArray[0];
  }

  /**
   * Groups keywords by intent or category
   * @param keywords Array of keywords to group
   * @returns Map of category to keywords
   */
  static groupKeywordsByIntent(keywords: string[]): Map<string, string[]> {
    const groups = new Map<string, string[]>();
    
    keywords.forEach(keyword => {
      const intent = this.detectKeywordIntent(keyword);
      if (!groups.has(intent)) {
        groups.set(intent, []);
      }
      groups.get(intent)?.push(keyword);
    });
    
    return groups;
  }

  /**
   * Detects the likely intent of a keyword
   * @private
   */
  private static detectKeywordIntent(keyword: string): string {
    const informationalPatterns = /how|what|why|when|where|guide|tutorial/i;
    const transactionalPatterns = /buy|price|cost|cheap|deal|sale/i;
    const navigationalPatterns = /login|signin|account|support/i;
    const commercialPatterns = /best|top|review|compare|vs/i;

    if (informationalPatterns.test(keyword)) return 'informational';
    if (transactionalPatterns.test(keyword)) return 'transactional';
    if (navigationalPatterns.test(keyword)) return 'navigational';
    if (commercialPatterns.test(keyword)) return 'commercial';
    
    return 'other';
  }
}

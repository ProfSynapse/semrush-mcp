/**
 * Utility functions for domain analysis operations
 * Provides common domain-related functionality used across the domain agent
 */

import { DomainAnalysisResult, DomainMetrics, AnalysisData } from '../types.js';
import { DomainAgentConfig } from '../config.js';

export class DomainOperations {
  /**
   * Validates a domain name according to standard rules
   * @param domain Domain name to validate
   * @returns True if domain is valid, false otherwise
   */
  static validateDomain(domain: string): boolean {
    if (!domain) return false;
    
    // Check length constraints
    if (domain.length < DomainAgentConfig.minDomainLength || 
        domain.length > DomainAgentConfig.maxDomainLength) {
      return false;
    }

    // Basic domain format validation
    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  }

  /**
   * Formats domain metrics for consistent output
   * @param metrics Raw metrics to format
   * @returns Formatted metrics object
   */
  static formatDomainMetrics(metrics: any): DomainMetrics {
    return {
      trafficScore: Number(Number(metrics.trafficScore || 0).toFixed(2)),
      authorityScore: Number(Number(metrics.authorityScore || 0).toFixed(2)),
      backlinks: Number(metrics.backlinks || 0),
      organicTraffic: Number(metrics.organicTraffic || 0),
      paidTraffic: Number(metrics.paidTraffic || 0)
    };
  }

  /**
   * Sanitizes and normalizes a domain name
   * @param domain Domain name to normalize
   * @returns Normalized domain name
   */
  static normalizeDomain(domain: string): string {
    return domain.toLowerCase().trim();
  }

  /**
   * Merges multiple domain analysis results
   * @param results Array of analysis results to merge
   * @returns Merged analysis result
   */
  static mergeAnalysisResults(results: DomainAnalysisResult[]): DomainAnalysisResult {
    if (!results.length) {
      throw new Error('No results to merge');
    }

    return {
      domain: results[0].domain,
      metrics: this.calculateAverageMetrics(results.map(r => r.metrics)),
      analysis: this.mergeAnalysisData(results.map(r => r.analysis)),
      lastUpdated: new Date()
    };
  }

  /**
   * Calculates average metrics from multiple sets
   * @private
   */
  private static calculateAverageMetrics(metricsArray: DomainMetrics[]): DomainMetrics {
    const sum = metricsArray.reduce((acc, metrics) => ({
      trafficScore: acc.trafficScore + Number(metrics.trafficScore),
      authorityScore: acc.authorityScore + Number(metrics.authorityScore),
      backlinks: acc.backlinks + metrics.backlinks,
      organicTraffic: acc.organicTraffic + metrics.organicTraffic,
      paidTraffic: acc.paidTraffic + metrics.paidTraffic
    }));

    const count = metricsArray.length;
    return {
      trafficScore: Number((sum.trafficScore / count).toFixed(2)),
      authorityScore: Number((sum.authorityScore / count).toFixed(2)),
      backlinks: Math.round(sum.backlinks / count),
      organicTraffic: Math.round(sum.organicTraffic / count),
      paidTraffic: Math.round(sum.paidTraffic / count)
    };
  }

  /**
   * Merges analysis data from multiple sources
   * @private
   */
  private static mergeAnalysisData(analysisArray: AnalysisData[]): AnalysisData {
    const competitors = new Set<string>();
    const organicKeywords = new Set<string>();
    const paidKeywords = new Set<string>();
    let totalMarketShare = 0;

    analysisArray.forEach(analysis => {
      analysis.competitors.forEach(competitor => competitors.add(competitor));
      analysis.keywords.organic.forEach(keyword => organicKeywords.add(keyword));
      analysis.keywords.paid.forEach(keyword => paidKeywords.add(keyword));
      totalMarketShare += analysis.marketShare;
    });

    return {
      competitors: Array.from(competitors),
      keywords: {
        organic: Array.from(organicKeywords),
        paid: Array.from(paidKeywords)
      },
      marketShare: Number((totalMarketShare / analysisArray.length).toFixed(2)),
      visibilityTrend: analysisArray[0].visibilityTrend // Use first result's trend data
    };
  }
}

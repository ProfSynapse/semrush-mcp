/**
 * Keyword Tools Index
 * 
 * Exports all keyword tools and their execution functions for easy import in the keyword agent.
 */

// Tool definitions
import { keyword_overview } from './keyword_overview.js';
import { batch_keyword_overview } from './batch_keyword_overview.js';
import { related_keywords } from './related_keywords.js';
import { broad_match_keywords } from './broad_match_keywords.js';
import { phrase_questions } from './phrase_questions.js';
import { keyword_difficulty } from './keyword_difficulty.js';
import { domain_organic_keywords } from './domain_organic_keywords.js';
import { domain_paid_keywords } from './domain_paid_keywords.js';

// Export tool definitions
export { 
  keyword_overview,
  batch_keyword_overview,
  related_keywords,
  broad_match_keywords,
  phrase_questions,
  keyword_difficulty,
  domain_organic_keywords,
  domain_paid_keywords
};

// Define execution functions from tool definitions with type assertions for compatibility
export const executeKeywordOverview = keyword_overview.execute as (params: Record<string, any>) => Promise<any>;
export const executeBatchKeywordOverview = batch_keyword_overview.execute as (params: Record<string, any>) => Promise<any>;
export const executeRelatedKeywords = related_keywords.execute as (params: Record<string, any>) => Promise<any>;
export const executeBroadMatchKeywords = broad_match_keywords.execute as (params: Record<string, any>) => Promise<any>;
export const executePhraseQuestions = phrase_questions.execute as (params: Record<string, any>) => Promise<any>;
export const executeKeywordDifficulty = keyword_difficulty.execute as (params: Record<string, any>) => Promise<any>;
export const executeDomainOrganicKeywords = domain_organic_keywords.execute as (params: Record<string, any>) => Promise<any>;
export const executeDomainPaidKeywords = domain_paid_keywords.execute as (params: Record<string, any>) => Promise<any>;

// Tool execution map
export const toolExecutors: Record<string, (params: Record<string, any>) => Promise<any>> = {
  keyword_overview: executeKeywordOverview,
  batch_keyword_overview: executeBatchKeywordOverview,
  related_keywords: executeRelatedKeywords,
  broad_match_keywords: executeBroadMatchKeywords,
  phrase_questions: executePhraseQuestions,
  keyword_difficulty: executeKeywordDifficulty,
  domain_organic_keywords: executeDomainOrganicKeywords,
  domain_paid_keywords: executeDomainPaidKeywords
};

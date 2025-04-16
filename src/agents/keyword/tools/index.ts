/**
 * Keyword Tools Index
 * 
 * Exports all keyword tools and their execution functions for easy import in the keyword agent.
 */

// Tool definitions
export { keyword_overview } from './keyword_overview.js';
export { batch_keyword_overview } from './batch_keyword_overview.js';
export { related_keywords } from './related_keywords.js';
export { broad_match_keywords } from './broad_match_keywords.js';
export { phrase_questions } from './phrase_questions.js';
export { keyword_difficulty } from './keyword_difficulty.js';
export { domain_organic_keywords } from './domain_organic_keywords.js';
export { domain_paid_keywords } from './domain_paid_keywords.js';

// Import execution functions
import { executeKeywordOverview as _executeKeywordOverview } from './keyword_overview.js';
import { executeBatchKeywordOverview as _executeBatchKeywordOverview } from './batch_keyword_overview.js';
import { executeRelatedKeywords as _executeRelatedKeywords } from './related_keywords.js';
import { executeBroadMatchKeywords as _executeBroadMatchKeywords } from './broad_match_keywords.js';
import { executePhraseQuestions as _executePhraseQuestions } from './phrase_questions.js';
import { executeKeywordDifficulty as _executeKeywordDifficulty } from './keyword_difficulty.js';
import { executeDomainOrganicKeywords as _executeDomainOrganicKeywords } from './domain_organic_keywords.js';
import { executeDomainPaidKeywords as _executeDomainPaidKeywords } from './domain_paid_keywords.js';

// Re-export execution functions
export const executeKeywordOverview = _executeKeywordOverview;
export const executeBatchKeywordOverview = _executeBatchKeywordOverview;
export const executeRelatedKeywords = _executeRelatedKeywords;
export const executeBroadMatchKeywords = _executeBroadMatchKeywords;
export const executePhraseQuestions = _executePhraseQuestions;
export const executeKeywordDifficulty = _executeKeywordDifficulty;
export const executeDomainOrganicKeywords = _executeDomainOrganicKeywords;
export const executeDomainPaidKeywords = _executeDomainPaidKeywords;

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

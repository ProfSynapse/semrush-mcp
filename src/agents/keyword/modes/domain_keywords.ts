/**
 * Domain Keywords Mode
 * 
 * Provides domain-specific keyword tools.
 */

import { AgentType, KeywordMode, TypedModeDefinition } from '../../../types/tool-types.js';
import { domain_organic_keywords, domain_paid_keywords } from '../tools/index.js';

/**
 * Mode definition for domain_keywords
 */
export const domain_keywords: TypedModeDefinition<AgentType.KEYWORD, KeywordMode.DOMAIN_KEYWORDS> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.DOMAIN_KEYWORDS,
  name: 'domain_keywords',
  description: 'Domain-specific keyword tools',
  tools: {
    domain_organic_keywords,
    domain_paid_keywords
  }
};

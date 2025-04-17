/**
 * Keyword Research Mode
 * 
 * Provides keyword research and suggestions.
 */

import { AgentType, KeywordMode, TypedModeDefinition } from '../../../types/tool-types.js';
import { 
  related_keywords, 
  broad_match_keywords, 
  phrase_questions, 
  keyword_difficulty 
} from '../tools/index.js';

/**
 * Mode definition for research
 */
export const research: TypedModeDefinition<AgentType.KEYWORD, KeywordMode.RESEARCH> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.RESEARCH,
  name: 'research',
  description: 'Keyword research and suggestions',
  tools: {
    related_keywords,
    broad_match_keywords,
    phrase_questions,
    keyword_difficulty
  }
};

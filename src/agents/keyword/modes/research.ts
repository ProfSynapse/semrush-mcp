/**
 * Keyword Research Mode
 * 
 * Provides keyword research and suggestions.
 */

import { ModeDefinition } from '../../../validation/unified-tool-registry.js';
import { 
  related_keywords, 
  broad_match_keywords, 
  phrase_questions, 
  keyword_difficulty 
} from '../tools/index.js';

/**
 * Mode definition for research
 */
export const research: ModeDefinition = {
  name: 'research',
  description: 'Keyword research and suggestions',
  availableTools: [
    related_keywords,
    broad_match_keywords,
    phrase_questions,
    keyword_difficulty
  ]
};

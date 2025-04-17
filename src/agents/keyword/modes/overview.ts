/**
 * Keyword Overview Mode
 * 
 * Provides keyword overview and metrics.
 */

import { AgentType, KeywordMode, TypedModeDefinition } from '../../../types/tool-types.js';
import { keyword_overview, batch_keyword_overview } from '../tools/index.js';

/**
 * Mode definition for overview
 */
export const overview: TypedModeDefinition<AgentType.KEYWORD, KeywordMode.OVERVIEW> = {
  agent: AgentType.KEYWORD,
  mode: KeywordMode.OVERVIEW,
  name: 'overview',
  description: 'Keyword overview and metrics',
  tools: {
    keyword_overview,
    batch_keyword_overview
  }
};

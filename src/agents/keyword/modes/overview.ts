/**
 * Keyword Overview Mode
 * 
 * Provides keyword overview and metrics.
 */

import { ModeDefinition } from '../../../validation/unified-tool-registry.js';
import { keyword_overview, batch_keyword_overview } from '../tools/index.js';

/**
 * Mode definition for overview
 */
export const overview: ModeDefinition = {
  name: 'overview',
  description: 'Keyword overview and metrics',
  availableTools: [
    keyword_overview,
    batch_keyword_overview
  ]
};

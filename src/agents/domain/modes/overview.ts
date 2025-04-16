/**
 * Domain Overview Mode
 * 
 * Provides basic domain metrics and rankings.
 */

import { ModeDefinition } from '../../../validation/unified-tool-registry.js';
import { domain_ranks } from '../tools/domain_ranks.js';

/**
 * Mode definition for overview
 */
export const overview: ModeDefinition = {
  name: 'overview',
  description: 'Domain overview and metrics',
  availableTools: [
    domain_ranks
  ]
};

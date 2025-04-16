/**
 * Domain Competitors Mode
 * 
 * Provides domain competition analysis.
 */

import { ModeDefinition } from '../../../validation/unified-tool-registry.js';
import { domain_competitors } from '../tools/domain_competitors.js';

/**
 * Mode definition for competitors
 */
export const competitors: ModeDefinition = {
  name: 'competitors',
  description: 'Domain competition analysis',
  availableTools: [
    domain_competitors
  ]
};

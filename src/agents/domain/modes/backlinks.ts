/**
 * Domain Backlinks Mode
 * 
 * Provides domain backlinks analysis.
 */

import { ModeDefinition } from '../../../validation/unified-tool-registry.js';
import { backlinks } from '../tools/backlinks.js';
import { backlinks_refdomains } from '../tools/backlinks_refdomains.js';

/**
 * Mode definition for backlinks
 */
export const backlinks_mode: ModeDefinition = {
  name: 'backlinks',
  description: 'Domain backlinks analysis',
  availableTools: [
    backlinks,
    backlinks_refdomains
  ]
};

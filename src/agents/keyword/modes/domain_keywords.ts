/**
 * Domain Keywords Mode
 * 
 * Provides domain-specific keyword tools.
 */

import { ModeDefinition } from '../../../validation/unified-tool-registry.js';
import { domain_organic_keywords, domain_paid_keywords } from '../tools/index.js';

/**
 * Mode definition for domain_keywords
 */
export const domain_keywords: ModeDefinition = {
  name: 'domain_keywords',
  description: 'Domain-specific keyword tools',
  availableTools: [
    domain_organic_keywords,
    domain_paid_keywords
  ]
};

/**
 * Domain Backlinks Mode
 * 
 * Provides domain backlinks analysis.
 */

import { AgentType, DomainMode, TypedModeDefinition } from '../../../types/tool-types.js';
import { backlinks } from '../tools/backlinks.js';
import { backlinks_refdomains } from '../tools/backlinks_refdomains.js';

/**
 * Mode definition for backlinks
 */
export const backlinks_mode: TypedModeDefinition<AgentType.DOMAIN, DomainMode.BACKLINKS> = {
  agent: AgentType.DOMAIN,
  mode: DomainMode.BACKLINKS,
  name: 'backlinks',
  description: 'Domain backlinks analysis',
  tools: {
    backlinks,
    backlinks_refdomains
  }
};

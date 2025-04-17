/**
 * Domain Competitors Mode
 * 
 * Provides domain competition analysis.
 */

import { AgentType, DomainMode, TypedModeDefinition } from '../../../types/tool-types.js';
import { domain_competitors } from '../tools/domain_competitors.js';

/**
 * Mode definition for competitors
 */
export const competitors: TypedModeDefinition<AgentType.DOMAIN, DomainMode.COMPETITORS> = {
  agent: AgentType.DOMAIN,
  mode: DomainMode.COMPETITORS,
  name: 'competitors',
  description: 'Domain competition analysis',
  tools: {
    domain_competitors
  }
};

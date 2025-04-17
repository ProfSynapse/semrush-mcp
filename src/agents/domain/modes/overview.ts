/**
 * Domain Overview Mode
 * 
 * Provides basic domain metrics and rankings.
 */

import { AgentType, DomainMode, TypedModeDefinition } from '../../../types/tool-types.js';
import { domain_ranks } from '../tools/domain_ranks.js';

/**
 * Mode definition for overview
 */
export const overview: TypedModeDefinition<AgentType.DOMAIN, DomainMode.OVERVIEW> = {
  agent: AgentType.DOMAIN,
  mode: DomainMode.OVERVIEW,
  name: 'overview',
  description: 'Domain overview and metrics',
  tools: {
    domain_ranks
  }
};

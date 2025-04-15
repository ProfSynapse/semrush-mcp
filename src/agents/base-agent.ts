import { IAgent, IMode } from './interfaces.js';

/**
 * Base implementation of the IAgent interface
 */
export class BaseAgent implements IAgent {
  /**
   * Map of modes registered with this agent
   */
  protected modes: Map<string, IMode> = new Map();

  /**
   * Create a new BaseAgent
   * @param name The name of the agent
   * @param description Description of what the agent provides
   */
  constructor(
    public name: string,
    public description: string
  ) {}

  /**
   * Register a mode with this agent
   * @param mode The mode to register
   */
  registerMode(mode: IMode): void {
    this.modes.set(mode.name, mode);
  }

  /**
   * Get all modes registered with this agent
   * @returns An array of modes
   */
  getModes(): IMode[] {
    return Array.from(this.modes.values());
  }

  /**
   * Get a specific mode by name
   * @param name The name of the mode to get
   * @returns The mode, or undefined if not found
   */
  getMode(name: string): IMode | undefined {
    return this.modes.get(name);
  }
}
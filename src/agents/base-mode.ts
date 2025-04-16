/**
 * @deprecated This class is deprecated and will be removed in a future version.
 * Use the unified registry instead.
 */
export class BaseMode {
  constructor(
    public name: string,
    public description: string
  ) {
    console.warn('BaseMode is deprecated. Use the unified registry instead.');
  }

  registerTool(): void {
    console.warn('BaseMode.registerTool is deprecated. Use the unified registry instead.');
  }

  getTools(): any[] {
    console.warn('BaseMode.getTools is deprecated. Use the unified registry instead.');
    return [];
  }

  getTool(): undefined {
    console.warn('BaseMode.getTool is deprecated. Use the unified registry instead.');
    return undefined;
  }

  async executeTool(): Promise<any> {
    console.warn('BaseMode.executeTool is deprecated. Use the unified registry instead.');
    throw new Error('BaseMode is deprecated. Use the unified registry instead.');
  }
}

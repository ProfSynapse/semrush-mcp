# Agent-Mode Architecture for MCP Servers

This guide explains how to transform any Model Context Protocol (MCP) server into a domain-specific agent architecture with modes and tools.

## Overview

The Agent-Mode Architecture organizes tools into a hierarchical structure:

1. **Agents**: Top-level domain-specific categories (e.g., Domain, Keyword)
2. **Modes**: Functional groupings within each agent (e.g., Overview, Research)
3. **Tools**: Individual functions that perform specific tasks

This architecture provides several benefits:
- Cleaner organization of related functionality
- Better discoverability through logical grouping
- Simplified client interaction with high-level agents
- Extensibility for adding new functionality

## Implementation Steps

### 1. Define Core Interfaces

Start by defining the core interfaces for your architecture:

```typescript
// interfaces.ts
export interface ITool {
  name: string;
  description: string;
  inputSchema: object;
  execute(params: any): Promise<any>;
}

export interface IMode {
  name: string;
  description: string;
  registerTool(tool: ITool): void;
  getTools(): ITool[];
  getTool(name: string): ITool | undefined;
  executeTool(name: string, params: any): Promise<any>;
}

export interface IAgent {
  name: string;
  description: string;
  registerMode(mode: IMode): void;
  getModes(): IMode[];
  getMode(name: string): IMode | undefined;
}
```

### 2. Create Base Implementations

Implement base classes for each interface:

```typescript
// base-tool.ts
export class BaseTool implements ITool {
  constructor(
    public name: string,
    public description: string,
    public inputSchema: object,
    private executeFunction: (params: any) => Promise<any>
  ) {}

  async execute(params: any): Promise<any> {
    return await this.executeFunction(params);
  }
}

// base-mode.ts
export class BaseMode implements IMode {
  protected tools: Map<string, ITool> = new Map();
  
  constructor(
    public name: string,
    public description: string
  ) {}
  
  registerTool(tool: ITool): void {
    this.tools.set(tool.name, tool);
  }
  
  getTools(): ITool[] {
    return Array.from(this.tools.values());
  }
  
  getTool(name: string): ITool | undefined {
    return this.tools.get(name);
  }
  
  async executeTool(name: string, params: any): Promise<any> {
    const tool = this.getTool(name);
    if (!tool) {
      throw new Error(`Tool not found: ${name}`);
    }
    return await tool.execute(params);
  }
}

// base-agent.ts
export class BaseAgent implements IAgent {
  protected modes: Map<string, IMode> = new Map();
  
  constructor(
    public name: string,
    public description: string
  ) {}
  
  registerMode(mode: IMode): void {
    this.modes.set(mode.name, mode);
  }
  
  getModes(): IMode[] {
    return Array.from(this.modes.values());
  }
  
  getMode(name: string): IMode | undefined {
    return this.modes.get(name);
  }
}
```

### 3. Create an Agent Registry

Implement a registry to manage all agents:

```typescript
// agent-registry.ts
export class AgentRegistry {
  private agents: Map<string, IAgent> = new Map();
  
  registerAgent(agent: IAgent): void {
    this.agents.set(agent.name, agent);
  }
  
  getAgent(name: string): IAgent | undefined {
    return this.agents.get(name);
  }
  
  getAllAgents(): IAgent[] {
    return Array.from(this.agents.values());
  }
  
  // Expose high-level tools for each agent
  getAvailableTools(): any[] {
    const tools: any[] = [];
    
    for (const agent of this.getAllAgents()) {
      tools.push({
        name: `${agent.name.charAt(0).toUpperCase() + agent.name.slice(1)}Agent`,
        description: agent.description,
        inputSchema: {
          type: 'object',
          properties: {
            mode: { 
              type: 'string', 
              description: `Mode to use (${agent.getModes().map(m => m.name).join(', ')})` 
            },
            tool: { 
              type: 'string', 
              description: 'Tool to execute' 
            },
            params: { 
              type: 'object', 
              description: 'Parameters for the tool' 
            }
          },
          required: ['mode', 'tool', 'params']
        }
      });
    }
    
    return tools;
  }
  
  // Execute a high-level tool
  async executeHighLevelTool(toolName: string, params: any): Promise<any> {
    const agentName = toolName.replace('Agent', '').toLowerCase();
    const { mode, tool, params: toolParams } = params;
    
    return await this.executeTool(agentName, mode, tool, toolParams);
  }
  
  // Execute a specific tool
  async executeTool(agentName: string, modeName: string, toolName: string, params: any): Promise<any> {
    const agent = this.getAgent(agentName);
    if (!agent) {
      throw new Error(`Agent not found: ${agentName}`);
    }
    
    const mode = agent.getMode(modeName);
    if (!mode) {
      throw new Error(`Mode not found: ${modeName}`);
    }
    
    return await mode.executeTool(toolName, params);
  }
}
```

### 4. Implement Domain-Specific Agents

Create agent classes for each domain:

```typescript
// domain-agent.ts
export class DomainAgent extends BaseAgent {
  constructor() {
    super('domain', 'Domain analysis tools');
    
    // Initialize modes
    this.initializeOverviewMode();
    this.initializeCompetitorsMode();
    // ... other modes
  }
  
  private initializeOverviewMode(): void {
    const overviewMode = new BaseMode('overview', 'Domain overview tools');
    
    // Create and register tools
    const domainOverviewTool = new BaseTool(
      'domain_overview',
      'Get domain overview data',
      {
        type: 'object',
        properties: {
          domain: { type: 'string' },
          // ... other properties
        },
        required: ['domain']
      },
      async (params) => {
        // Implement tool functionality
        return await apiClient.getDomainOverview(params.domain);
      }
    );
    
    overviewMode.registerTool(domainOverviewTool);
    this.registerMode(overviewMode);
  }
  
  // ... other mode initialization methods
}
```

### 5. Update MCP Server Implementation

Modify your MCP server to use the new architecture:

```typescript
// index.ts
// Create the agent registry
const agentRegistry = new AgentRegistry();

// Register agents
agentRegistry.registerAgent(new DomainAgent());
agentRegistry.registerAgent(new KeywordAgent());
// ... register other agents

// Set up MCP request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: agentRegistry.getAvailableTools(),
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const args = request.params.arguments;
  
  try {
    // Handle high-level agent tools
    if (toolName.endsWith('Agent')) {
      const result = await agentRegistry.executeHighLevelTool(toolName, args);
      
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result),
          },
        ],
      };
    }
    
    // Handle legacy tools if needed
    // ...
    
    // Unknown tool
    return {
      isError: true,
      content: [{ type: 'text', text: `Unknown tool: ${toolName}` }],
    };
  } catch (error) {
    // Handle errors
    return {
      isError: true,
      content: [{ type: 'text', text: `Error: ${error.message}` }],
    };
  }
});
```

### 6. Implement Backward Compatibility (Optional)

If you need to support legacy tool names:

```typescript
// legacy-mapping.ts
export const LEGACY_TOOL_MAPPING: Record<string, { agent: string, mode: string, tool: string }> = {
  'legacy_tool_name': { agent: 'domain', mode: 'overview', tool: 'domain_overview' },
  // ... other mappings
};

// In your request handler:
if (LEGACY_TOOL_MAPPING[toolName]) {
  const { agent, mode, tool } = LEGACY_TOOL_MAPPING[toolName];
  return await agentRegistry.executeTool(agent, mode, tool, args);
}
```

## Best Practices

### Organizing Agents and Modes

1. **Agent Granularity**: Create agents for major functional domains (e.g., Search, Analytics, Content)
2. **Mode Organization**: Group related tools into logical modes based on:
   - Functionality (Overview, Research, Analysis)
   - User workflows (Planning, Execution, Reporting)
   - Data types (Text, Images, Metrics)

### Tool Design

1. **Consistent Naming**: Use consistent naming patterns for tools
   - `<noun>_<verb>` (e.g., `domain_analyze`, `keyword_research`)
   - `<verb>_<noun>` (e.g., `analyze_domain`, `research_keyword`)

2. **Clear Descriptions**: Provide clear, concise descriptions for agents, modes, and tools

3. **Input Schemas**: Define comprehensive input schemas with:
   - Descriptive property names
   - Clear property descriptions
   - Appropriate data types
   - Required vs. optional parameters

### Implementation Considerations

1. **Error Handling**: Implement robust error handling at each level
   - Agent-level errors (agent not found)
   - Mode-level errors (mode not found)
   - Tool-level errors (tool not found, execution errors)

2. **Validation**: Validate inputs at each level
   - Agent/mode/tool name validation
   - Parameter validation against schemas

3. **Logging**: Implement detailed logging for debugging
   - Log agent/mode/tool access
   - Log parameter values (excluding sensitive data)
   - Log execution results and errors

## Example: Converting an Existing MCP Server

### Before (Flat Structure)

```typescript
const TOOLS = [
  {
    name: 'search_query',
    description: 'Search for a query',
    inputSchema: { /* ... */ },
  },
  {
    name: 'search_images',
    description: 'Search for images',
    inputSchema: { /* ... */ },
  },
  {
    name: 'analytics_pageviews',
    description: 'Get page view analytics',
    inputSchema: { /* ... */ },
  },
  // ... many more tools
];

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const args = request.params.arguments;
  
  switch (toolName) {
    case 'search_query':
      return await handleSearchQuery(args);
    case 'search_images':
      return await handleSearchImages(args);
    case 'analytics_pageviews':
      return await handleAnalyticsPageviews(args);
    // ... many more cases
  }
});
```

### After (Agent-Mode Structure)

```typescript
// Create agents
const searchAgent = new BaseAgent('search', 'Search tools');
const analyticsAgent = new BaseAgent('analytics', 'Analytics tools');

// Create modes
const queryMode = new BaseMode('query', 'Query search tools');
const imageMode = new BaseMode('image', 'Image search tools');
const pageviewMode = new BaseMode('pageview', 'Pageview analytics tools');

// Create tools
const searchQueryTool = new BaseTool(
  'search',
  'Search for a query',
  { /* inputSchema */ },
  async (params) => await handleSearchQuery(params)
);

const searchImagesTool = new BaseTool(
  'search',
  'Search for images',
  { /* inputSchema */ },
  async (params) => await handleSearchImages(params)
);

const analyticsPageviewsTool = new BaseTool(
  'get',
  'Get page view analytics',
  { /* inputSchema */ },
  async (params) => await handleAnalyticsPageviews(params)
);

// Register tools with modes
queryMode.registerTool(searchQueryTool);
imageMode.registerTool(searchImagesTool);
pageviewMode.registerTool(analyticsPageviewsTool);

// Register modes with agents
searchAgent.registerMode(queryMode);
searchAgent.registerMode(imageMode);
analyticsAgent.registerMode(pageviewMode);

// Register agents with registry
agentRegistry.registerAgent(searchAgent);
agentRegistry.registerAgent(analyticsAgent);
```

## Conclusion

The Agent-Mode Architecture provides a scalable, maintainable approach to organizing MCP tools. By grouping related functionality into logical domains and modes, you can create a more intuitive API for clients while maintaining flexibility and extensibility for future growth.

This pattern works well for any MCP server that provides a diverse set of tools across multiple domains, allowing you to present a clean, organized interface to clients while maintaining a modular, maintainable codebase.
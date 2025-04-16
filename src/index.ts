import { config, logger, logConfigStatus } from './config.js';
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';
import { SemrushApiError } from './semrush-api.js';
import { AgentRegistry, AgentRegistryError } from './agents/agent-registry.js';
import { DomainAgent } from './agents/domain/domain-agent.js';
import { KeywordAgent } from './agents/keyword/keyword-agent.js';
import { ToolValidationError } from './validation/unified-tool-registry.js';

// Create the agent registry
const agentRegistry = new AgentRegistry();

// Register agents
agentRegistry.registerAgent(new DomainAgent());
agentRegistry.registerAgent(new KeywordAgent());

// Helper function to handle errors consistently
const handleError = (error: unknown) => {
  // Handle specific error types with custom messages
  if (error instanceof ToolValidationError) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Validation Error: ${error.message}`,
        },
      ],
    };
  }
  
  if (error instanceof AgentRegistryError) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Configuration Error: ${error.message}`,
        },
      ],
    };
  }
  
  if (error instanceof SemrushApiError) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `API Error: ${error.message}. Status: ${error.status}`,
        },
      ],
    };
  }

  // Generic error handling
  return {
    isError: true,
    content: [
      {
        type: 'text',
        text: `Unexpected error: ${(error as Error).message || 'Unknown error'}`,
      },
    ],
  };
};

// Create the MCP server
const server = new Server(
  {
    name: "semrush-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},    // We support tools
      resources: {}, // We support resources
      prompts: {}    // We support prompts
    },
  }
);

// Set up request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: agentRegistry.getAvailableTools(),
}));

server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: [],
}));

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [],
}));

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  const args = request.params.arguments as Record<string, any>;
  
  logger.info(`Tool called: ${toolName}`);
  
  try {
    // Handle high-level tools (semrushDomain, semrushKeyword)
    if (toolName.startsWith('semrush') && !toolName.includes('_')) {
      const result = await agentRegistry.executeHighLevelTool(toolName, args);
      
      // Format the response for better readability
      const formattedData = typeof result.data === 'string'
        ? result.data
        : JSON.stringify(result.data, null, 2);
      
      return {
        content: [
          {
            type: 'text',
            text: formattedData,
          },
        ],
      };
    }
    
    // If we get here, it's an unknown tool
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Unknown tool: ${toolName}. Please use the high-level format (e.g., 'semrushKeyword' or 'semrushDomain') with appropriate mode, tool, and params.`,
        },
      ],
    };
  } catch (error) {
    logger.error(`Error while executing tool: ${(error as Error).message}`);
    return handleError(error);
  }
});

// Start the server
async function runServer() {
  try {
    // Log configuration status
    logConfigStatus();

    // Create and connect the transport
    const transport = new StdioServerTransport();
    await server.connect(transport);

    logger.info(chalk.green('Semrush MCP Server started'));
    logger.info(chalk.blue(`Available agents: ${agentRegistry.getAllAgents().map(a => a.name).join(', ')}`));
    
    // Log available tools
    const tools = agentRegistry.getAvailableTools();
    logger.info(chalk.yellow(`Available tools: ${tools.map(t => t.name).join(', ')}`));
    
    // Log validation and mapping capabilities
    logger.info(chalk.cyan('Schema validation and parameter mapping enabled'));
  } catch (error) {
    logger.error(`Failed to start server: ${(error as Error).message}`);
    process.exit(1);
  }
}

runServer().catch((error) => {
  logger.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});

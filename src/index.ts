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
import { DomainAgent } from './agents/domain/domain-agent.js';
import { KeywordAgent } from './agents/keyword/keyword-agent.js';
import { ToolValidationError } from './types/tool-types.js';
import { AgentType, DomainMode, KeywordMode } from './types/tool-types.js';
import { executeTool, getAvailableModes, getAvailableTools } from './tools/tool-executor.js';
import { typedToolRegistry } from './validation/typed-tool-registry.js';

// Create and register agents with the typed registry
const domainAgent = new DomainAgent();
const keywordAgent = new KeywordAgent();

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

// Get available tools in MCP format
function getAvailableToolsForMCP() {
  const tools = [];
  
  // Create a high-level tool for Domain agent
  const domainModes = getAvailableModes(AgentType.DOMAIN);
  tools.push({
    name: 'semrushDomain',
    description: 'Access Semrush domain data - Use this tool to analyze domains and their metrics',
    inputSchema: {
      type: 'object',
      properties: {
        mode: {
          type: 'string',
          description: `Mode to use (${domainModes.join(', ')})`,
          enum: domainModes
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
      required: ['mode', 'tool', 'params'],
      examples: [
        {
          mode: DomainMode.OVERVIEW,
          tool: 'domain_ranks',
          params: {
            target: 'example.com'
          }
        }
      ]
    }
  });
  
  // Create a high-level tool for Keyword agent
  const keywordModes = getAvailableModes(AgentType.KEYWORD);
  tools.push({
    name: 'semrushKeyword',
    description: 'Access Semrush keyword data - Use this tool to research keywords and their metrics',
    inputSchema: {
      type: 'object',
      properties: {
        mode: {
          type: 'string',
          description: `Mode to use (${keywordModes.join(', ')})`,
          enum: keywordModes
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
      required: ['mode', 'tool', 'params'],
      examples: [
        {
          mode: KeywordMode.OVERVIEW,
          tool: 'keyword_overview',
          params: {
            keyword: 'digital marketing',
            database: 'us'
          }
        }
      ]
    }
  });
  
  return tools;
}

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
  tools: getAvailableToolsForMCP(),
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
    if (toolName === 'semrushDomain') {
      const { mode, tool, params } = args;
      
      // Validate mode
      if (!Object.values(DomainMode).includes(mode)) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Invalid mode: ${mode}. Available modes: ${Object.values(DomainMode).join(', ')}`,
            },
          ],
        };
      }
      
      // Execute the tool
      const result = await executeTool(
        AgentType.DOMAIN,
        mode as DomainMode,
        tool,
        params
      );
      
      // Format the response for better readability
      const formattedData = typeof result === 'string'
        ? result
        : JSON.stringify(result, null, 2);
      
      return {
        content: [
          {
            type: 'text',
            text: formattedData,
          },
        ],
      };
    }
    
    if (toolName === 'semrushKeyword') {
      const { mode, tool, params } = args;
      
      // Validate mode
      if (!Object.values(KeywordMode).includes(mode)) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Invalid mode: ${mode}. Available modes: ${Object.values(KeywordMode).join(', ')}`,
            },
          ],
        };
      }
      
      // Execute the tool
      const result = await executeTool(
        AgentType.KEYWORD,
        mode as KeywordMode,
        tool,
        params
      );
      
      // Format the response for better readability
      const formattedData = typeof result === 'string'
        ? result
        : JSON.stringify(result, null, 2);
      
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
    logger.info(chalk.blue(`Available agents: domain, keyword`));
    
    // Log available tools
    const tools = getAvailableToolsForMCP();
    logger.info(chalk.yellow(`Available tools: ${tools.map(t => t.name).join(', ')}`));
    
    // Log domain tools
    const domainModes = getAvailableModes(AgentType.DOMAIN);
    for (const mode of domainModes) {
      const modeTools = getAvailableTools(AgentType.DOMAIN, mode as DomainMode);
      logger.info(chalk.cyan(`Domain ${mode} tools: ${modeTools.join(', ')}`));
    }
    
    // Log keyword tools
    const keywordModes = getAvailableModes(AgentType.KEYWORD);
    for (const mode of keywordModes) {
      const modeTools = getAvailableTools(AgentType.KEYWORD, mode as KeywordMode);
      logger.info(chalk.cyan(`Keyword ${mode} tools: ${modeTools.join(', ')}`));
    }
    
    // Log validation capabilities
    logger.info(chalk.cyan('Type-safe validation and parameter mapping enabled'));
  } catch (error) {
    logger.error(`Failed to start server: ${(error as Error).message}`);
    process.exit(1);
  }
}

runServer().catch((error) => {
  logger.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});

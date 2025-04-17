/**
 * MCP Server with BCP Architecture
 * 
 * Implements a Model Context Protocol server with Bounded Context Packs (BCP)
 * for static tool registration.
 */

import { BCP, ToolDefinition, ToolValidationError, validateParams } from './types.js';
import { createSemrushApiClient, SemrushApiClient } from './api-client.js';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

/**
 * SemrushBCPServer class
 * 
 * Implements the MCP Server with BCP architecture
 */
export class SemrushBCPServer {
  private server: McpServer;
  private apiClient: SemrushApiClient;
  
  /**
   * Create a new Semrush BCP Server
   * 
   * @param apiKey - Semrush API key (provided by Claude Desktop)
   */
  constructor(apiKey: string) {
    // Create API client
    this.apiClient = createSemrushApiClient(apiKey);
    
    // Create MCP server
    this.server = new McpServer({
      name: 'semrush-bcp-server',
      version: '1.0.0',
      description: 'Semrush MCP Server with BCP Architecture'
    });
    
    // Register all tools
    this.registerAllTools();
  }
  
  /**
   * Register all tools from all BCPs
   */
  private async registerAllTools(): Promise<void> {
    // Register Domain tools
    this.registerDomainTools();
    
    // Register Keyword tools
    this.registerKeywordTools();
    
    // Register Backlinks tools
    this.registerBacklinksTools();
  }
  
  /**
   * Get available BCPs
   */
  private getAvailableBCPs(): string[] {
    // Return the list of available BCPs
    return ['Domain', 'Keyword', 'Backlinks'];
  }
  
  /**
   * Register Domain tools
   */
  private registerDomainTools(): void {
    // Register the main Domain tool
    this.server.tool(
      'semrushDomain',
      {
        operation: z.enum(['ranks', 'competitors']).describe('Operation to perform'),
        domain: z.string().regex(/^([a-z0-9-]+\.)+[a-z]{2,}$/).describe('Target domain to analyze (without http/https)'),
        database: z.enum(['us', 'uk', 'ca', 'au']).default('us').describe('Database to use'),
        limit: z.number().int().min(1).max(100).default(10).describe('Maximum number of results (only used for competitors operation)')
      },
      async ({ operation, domain, database = 'us', limit = 10 }) => {
        try {
          // Dispatch to the appropriate operation
          let result;
          switch (operation) {
            case 'ranks':
              result = await this.apiClient.getDomainOverview(domain, database);
              break;
            case 'competitors':
              result = await this.apiClient.getDomainCompetitors(domain, database, limit);
              break;
            default:
              throw new Error(`Unknown operation: ${operation}`);
          }
          
          return {
            content: [{ type: 'text', text: JSON.stringify(result) }]
          };
        } catch (error) {
          return {
            content: [{ type: 'text', text: `Error: ${(error as Error).message}` }],
            isError: true
          };
        }
      }
    );
  }
  
  /**
   * Register Keyword tools
   */
  private registerKeywordTools(): void {
    // Register the main Keyword tool
    this.server.tool(
      'semrushKeyword',
      {
        operation: z.enum(['overview', 'related', 'difficulty']).describe('Operation to perform'),
        keyword: z.string().min(1).max(255).describe('Keyword to analyze'),
        database: z.enum(['us', 'uk', 'ca', 'au']).default('us').describe('Database to use'),
        limit: z.number().int().min(1).max(1000).default(100).describe('Maximum number of results (only used for related operation)')
      },
      async ({ operation, keyword, database = 'us', limit = 100 }) => {
        try {
          // Dispatch to the appropriate operation
          let result;
          switch (operation) {
            case 'overview':
              result = await this.apiClient.getKeywordOverview(keyword, database);
              break;
            case 'related':
              result = await this.apiClient.getRelatedKeywords(keyword, database, limit);
              break;
            case 'difficulty':
              result = await this.apiClient.getKeywordDifficulty(keyword, database);
              break;
            default:
              throw new Error(`Unknown operation: ${operation}`);
          }
          
          return {
            content: [{ type: 'text', text: JSON.stringify(result) }]
          };
        } catch (error) {
          return {
            content: [{ type: 'text', text: `Error: ${(error as Error).message}` }],
            isError: true
          };
        }
      }
    );
  }
  
  /**
   * Register Backlinks tools
   */
  private registerBacklinksTools(): void {
    // Register the main Backlinks tool
    this.server.tool(
      'semrushBacklinks',
      {
        operation: z.enum(['list', 'refdomains']).describe('Operation to perform'),
        target: z.string().regex(/^([a-z0-9-]+\.)+[a-z]{2,}$/).describe('Target domain to analyze (without http/https)'),
        limit: z.number().int().min(1).max(1000).default(100).describe('Maximum number of results')
      },
      async ({ operation, target, limit = 100 }) => {
        try {
          // Dispatch to the appropriate operation
          let result;
          switch (operation) {
            case 'list':
              result = await this.apiClient.getBacklinks(target, { limit });
              break;
            case 'refdomains':
              result = await this.apiClient.getBacklinksRefdomains(target, limit);
              break;
            default:
              throw new Error(`Unknown operation: ${operation}`);
          }
          
          return {
            content: [{ type: 'text', text: JSON.stringify(result) }]
          };
        } catch (error) {
          return {
            content: [{ type: 'text', text: `Error: ${(error as Error).message}` }],
            isError: true
          };
        }
      }
    );
  }
  
  /**
   * Start the server
   */
  async start(): Promise<void> {
    try {
      // Create and connect the transport
      const transport = new StdioServerTransport();
      await this.server.connect(transport);
      
      // Use stderr for logging to avoid interfering with the JSON-RPC protocol
      console.error('Semrush BCP Server started');
      console.error('Available tools: semrushDomain, semrushKeyword, semrushBacklinks');
    } catch (error) {
      console.error('Failed to start server:', error);
      throw error;
    }
  }
  
  /**
   * Get the API client
   */
  getApiClient(): SemrushApiClient {
    return this.apiClient;
  }
}

/**
 * Create and start a Semrush BCP Server
 * 
 * @param apiKey - Semrush API key (provided by Claude Desktop)
 * @returns SemrushBCPServer instance
 */
export async function createServer(apiKey: string): Promise<SemrushBCPServer> {
  const server = new SemrushBCPServer(apiKey);
  await server.start();
  return server;
}

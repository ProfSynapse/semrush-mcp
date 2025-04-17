/**
 * Semrush BCP Server Entry Point
 * 
 * This is the main entry point for the Semrush BCP Server.
 * It creates and starts the server with the BCP architecture.
 */

import { createServer } from './core/server.js';

/**
 * Main function to start the server
 */
async function main(): Promise<void> {
  try {
    // The API key will be provided by Claude Desktop
    // For development, we can use a placeholder
    const apiKey = process.env.SEMRUSH_API_KEY || 'api-key-from-claude-desktop';
    
    // Create and start the server
    const server = await createServer(apiKey);
    
    // Use stderr for logging to avoid interfering with the JSON-RPC protocol
    console.error('Semrush BCP Server is running');
    console.error('Available tools:');
    console.error('- semrushDomain: Domain analysis (ranks, competitors)');
    console.error('- semrushKeyword: Keyword research (overview, related, difficulty)');
    console.error('- semrushBacklinks: Backlink analysis (list, refdomains)');
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.error('Shutting down server...');
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      console.error('Shutting down server...');
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

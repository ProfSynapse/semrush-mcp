# Semrush MCP Server

A Model Context Protocol (MCP) server for Semrush API with Bounded Context Packs (BCP) architecture.

## What is BCP?

Bounded Context Packs (BCP) is an architecture pattern for MCP servers that organizes tools into self-contained bundles that map to a single bounded context. This approach solves the problem of "tool bloat" in MCP servers by:

1. **Organized Structure**: Tools are organized into logical bounded contexts
2. **Clear Boundaries**: Each BCP has a clear responsibility and domain
3. **Maintainable Codebase**: Easy to add new operations to existing BCPs

## Architecture

```
semrush-bcp/
├── src/
│   ├── core/
│   │   ├── types.ts           # Shared type definitions
│   │   ├── server.ts          # MCP server implementation
│   │   └── api-client.ts      # Semrush API client
│   │
│   ├── bcps/
│   │   ├── Domain/
│   │   │   ├── ranks.tool.ts
│   │   │   ├── competitors.tool.ts
│   │   │   └── index.ts       # Domain BCP barrel
│   │   │
│   │   ├── Keyword/
│   │   │   ├── overview.tool.ts
│   │   │   ├── related.tool.ts
│   │   │   ├── difficulty.tool.ts
│   │   │   └── index.ts       # Keyword BCP barrel
│   │   │
│   │   └── Backlinks/
│   │       ├── list.tool.ts
│   │       ├── refdomains.tool.ts
│   │       └── index.ts       # Backlinks BCP barrel
│   │
│   └── index.ts               # Entry point
```

## Available Tools

### Domain Tool

The `semrushDomain` tool provides domain analysis capabilities:

```javascript
// Get domain ranks
semrushDomain({
  operation: "ranks",
  domain: "example.com",
  database: "us"
})

// Get domain competitors
semrushDomain({
  operation: "competitors",
  domain: "example.com",
  limit: 20
})
```

### Keyword Tool

The `semrushKeyword` tool provides keyword research capabilities:

```javascript
// Get keyword overview
semrushKeyword({
  operation: "overview",
  keyword: "digital marketing",
  database: "us"
})

// Get related keywords
semrushKeyword({
  operation: "related",
  keyword: "digital marketing",
  database: "us",
  limit: 50
})

// Get keyword difficulty
semrushKeyword({
  operation: "difficulty",
  keyword: "digital marketing",
  database: "us"
})
```

### Backlinks Tool

The `semrushBacklinks` tool provides backlink analysis capabilities:

```javascript
// Get backlinks list
semrushBacklinks({
  operation: "list",
  target: "example.com",
  limit: 100
})

// Get referring domains
semrushBacklinks({
  operation: "refdomains",
  target: "example.com",
  limit: 50
})
```

## Usage

### Claude Desktop Configuration

```json
{
  "mcpServers": {
    "semrush": {
      "command": "node",
      "args": ["c:\\path\\to\\dist\\index.js"],
      "env": {
        "SEMRUSH_API_KEY": "INSERT_KEY"
      },
      "disabled": false,
      "autoApprove": []
      }
    }
  }
```

### Example Conversation

```
User: I want to analyze example.com

Claude: I can help you analyze example.com using the Semrush API.
[Calls semrushDomain with operation="ranks", domain="example.com"]
Here are the domain metrics for example.com...

User: What are some related keywords to "digital marketing"?

Claude: Let me find related keywords for "digital marketing".
[Calls semrushKeyword with operation="related", keyword="digital marketing"]
Here are some related keywords for "digital marketing"...
```

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

### Adding a New Operation

1. Create a new tool file in the appropriate BCP directory
2. Update the main tool's schema and handler to include the new operation
3. Update the API client if needed

Example tool file:

```typescript
import { ToolDefinition } from '../../core/types.js';
import { createSemrushApiClient } from '../../core/api-client.js';

export const tool: ToolDefinition = {
  name: 'example',
  description: 'Example tool',
  inputSchema: {
    type: 'object',
    properties: {
      param: {
        type: 'string',
        description: 'Example parameter'
      }
    },
    required: ['param']
  },
  handler: async (params) => {
    const apiClient = createSemrushApiClient('api-key');
    return await apiClient.someMethod(params.param);
  }
};
```

## License

MIT

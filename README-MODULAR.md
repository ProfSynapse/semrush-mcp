# Semrush MCP Modular Structure

This document explains the modular structure of the Semrush MCP tools and how to add new tools and modes.

## Directory Structure

```
src/
  agents/
    domain/
      tools/           # Individual domain tools
        domain_ranks.ts
        domain_competitors.ts
        ...
        index.ts       # Exports all tools and executors
      modes/           # Domain modes
        overview.ts
        competitors.ts
        ...
        index.ts       # Exports all modes
      domain-agent.ts  # Main domain agent
      config.ts        # Domain agent configuration
      types.ts         # Domain-specific types
    keyword/
      tools/           # Individual keyword tools
        keyword_overview.ts
        related_keywords.ts
        ...
        index.ts       # Exports all tools and executors
      modes/           # Keyword modes
        overview.ts
        research.ts
        ...
        index.ts       # Exports all modes
      keyword-agent.ts # Main keyword agent
      config.ts        # Keyword agent configuration
      types.ts         # Keyword-specific types
```

## How to Add a New Tool

1. Create a new file in the appropriate `tools/` directory (e.g., `src/agents/domain/tools/new_tool.ts`)
2. Define the tool and its execution function:

```typescript
import { semrushApi } from '../../../semrush-api.js';
import { createDomainParam, createDatabaseParam } from '../../../validation/parameter-helpers.js';
import { ToolDefinition } from '../../../validation/unified-tool-registry.js';

// Tool definition
export const new_tool: ToolDefinition = {
  name: 'new_tool',
  description: 'Description of what the tool does',
  parameters: {
    // Define parameters using helper functions or custom definitions
    param1: createDomainParam(true),
    param2: createDatabaseParam(false)
  },
  examples: [{
    params: {
      param1: "example.com",
      param2: "us"
    }
  }]
};

// Execution function
export async function executeNewTool(params: Record<string, any>): Promise<any> {
  const { param1, param2 } = params;
  
  // Validate parameters
  if (!param1) {
    throw new Error('Param1 is required');
  }
  
  // Call the API
  return await semrushApi.someApiMethod(param1, param2);
}
```

3. Add the tool to the appropriate `tools/index.ts` file:

```typescript
// Add to exports
export { new_tool } from './new_tool.js';
export { executeNewTool } from './new_tool.js';

// Add to toolExecutors map
export const toolExecutors = {
  // ... existing tools
  new_tool: executeNewTool
};
```

4. Add the tool to the appropriate mode file (e.g., `src/agents/domain/modes/some_mode.ts`):

```typescript
import { ModeDefinition } from '../../../validation/unified-tool-registry.js';
import { existing_tool, new_tool } from '../tools/index.js';

export const some_mode: ModeDefinition = {
  name: 'some_mode',
  description: 'Mode description',
  availableTools: [
    existing_tool,
    new_tool  // Add the new tool here
  ]
};
```

## How to Add a New Mode

1. Create a new file in the appropriate `modes/` directory (e.g., `src/agents/domain/modes/new_mode.ts`)
2. Define the mode and include the tools it should contain:

```typescript
import { ModeDefinition } from '../../../validation/unified-tool-registry.js';
import { tool1, tool2 } from '../tools/index.js';

export const new_mode: ModeDefinition = {
  name: 'new_mode',
  description: 'Description of the new mode',
  availableTools: [
    tool1,
    tool2
  ]
};
```

3. Add the mode to the appropriate `modes/index.ts` file:

```typescript
export { new_mode } from './new_mode.js';
```

4. Add the mode to the agent's `setupRegistry` method in the agent file:

```typescript
private setupRegistry(): void {
  unifiedToolRegistry.registerAgent({
    name: 'domain',
    description: 'Domain analysis tools and capabilities',
    availableModes: [
      overview,
      competitors,
      new_mode  // Add the new mode here
    ]
  });
}
```

## Benefits of the Modular Structure

1. **Maintainability**: Each tool and mode is defined in its own file, making it easier to maintain and update.
2. **Scalability**: New tools and modes can be added without modifying existing code.
3. **Readability**: The code is more organized and easier to understand.
4. **Testability**: Individual tools and modes can be tested in isolation.
5. **Reusability**: Tool definitions and execution functions can be reused across different modes.

## Best Practices

1. Use the parameter helper functions when possible to ensure consistent parameter definitions.
2. Include detailed descriptions and examples for each tool.
3. Validate parameters in the execution function to provide clear error messages.
4. Group related tools into appropriate modes.
5. Use meaningful names for tools and modes that reflect their purpose.

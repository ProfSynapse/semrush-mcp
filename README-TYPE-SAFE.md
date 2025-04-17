# Type-Safe Architecture for Semrush MCP

This document describes the new type-safe architecture implemented for the Semrush MCP server. The architecture provides compile-time safety for tool definitions, parameters, and mode relationships.

## Key Components

### 1. Type-First Tool Registry

The new architecture uses a type-first approach to tool registration and validation. This means that tools are defined with TypeScript types that enforce relationships between agents, modes, tools, and parameters.

Key files:
- `src/types/tool-types.ts`: Core type definitions
- `src/validation/typed-tool-registry.ts`: Type-safe tool registry

### 2. Tool Manifest System

The tool manifest system provides a single source of truth for tool definitions. It ensures that all tools are properly defined with the correct parameters and examples.

Key files:
- `src/manifests/tools-manifest.ts`: Tool manifest definitions

### 3. Tool Builder and Executor

The tool builder and executor provide type-safe APIs for creating and executing tools. They ensure that tools are properly defined and that parameters are validated at runtime.

Key files:
- `src/tools/tool-builder.ts`: Type-safe tool creation
- `src/tools/tool-executor.ts`: Type-safe tool execution

## Migration Guide

### Files Already Migrated

The following files have been migrated to the new type-safe architecture:

**Domain Agent:**
- `src/agents/domain/domain-agent.ts`
- `src/agents/domain/modes/backlinks.ts`
- `src/agents/domain/modes/overview.ts`
- `src/agents/domain/modes/competitors.ts`
- `src/agents/domain/tools/backlinks.ts`
- `src/agents/domain/tools/backlinks_refdomains.ts`
- `src/agents/domain/tools/domain_ranks.ts`
- `src/agents/domain/tools/domain_competitors.ts`

**Keyword Agent:**
- `src/agents/keyword/keyword-agent.ts`
- `src/agents/keyword/modes/overview.ts`
- `src/agents/keyword/modes/research.ts`
- `src/agents/keyword/modes/domain_keywords.ts`
- `src/agents/keyword/tools/keyword_overview.ts`
- `src/agents/keyword/tools/related_keywords.ts`
- `src/agents/keyword/tools/batch_keyword_overview.ts`

### All Files Successfully Migrated

All files have been successfully migrated to the new type-safe architecture. The migration included:

**Domain Agent:**
- `src/agents/domain/domain-agent.ts`
- `src/agents/domain/modes/backlinks.ts`
- `src/agents/domain/modes/overview.ts`
- `src/agents/domain/modes/competitors.ts`
- `src/agents/domain/tools/backlinks.ts`
- `src/agents/domain/tools/backlinks_refdomains.ts`
- `src/agents/domain/tools/domain_ranks.ts`
- `src/agents/domain/tools/domain_competitors.ts`

**Keyword Agent:**
- `src/agents/keyword/keyword-agent.ts`
- `src/agents/keyword/modes/overview.ts`
- `src/agents/keyword/modes/research.ts`
- `src/agents/keyword/modes/domain_keywords.ts`
- `src/agents/keyword/tools/keyword_overview.ts`
- `src/agents/keyword/tools/related_keywords.ts`
- `src/agents/keyword/tools/batch_keyword_overview.ts`
- `src/agents/keyword/tools/broad_match_keywords.ts`
- `src/agents/keyword/tools/domain_organic_keywords.ts`
- `src/agents/keyword/tools/domain_paid_keywords.ts`
- `src/agents/keyword/tools/keyword_difficulty.ts`
- `src/agents/keyword/tools/phrase_questions.ts`

### Migration Steps

To migrate a tool file, follow these steps:

1. Update the imports:
   ```typescript
   // Old imports
   import { ToolDefinition } from '../../../validation/unified-tool-registry.js';
   import { createKeywordParam } from '../../../schemas/keyword-schemas.js';
   
   // New imports
   import { createParam, AgentType, KeywordMode, TypedToolDefinition, ToolParameters, ValidatedParams } from '../../../types/tool-types.js';
   import { createKeywordParam } from '../../../validation/parameter-helpers.js';
   ```

2. Create a parameter interface:
   ```typescript
   interface MyToolParams extends ToolParameters {
     keyword: ReturnType<typeof createKeywordParam>;
     // Add other parameters as needed
   }
   ```

3. Update the tool definition:
   ```typescript
   // Old definition
   export const my_tool: ToolDefinition = {
     name: 'my_tool',
     // ...
   };
   
   // New definition
   export const my_tool: TypedToolDefinition<AgentType.KEYWORD, KeywordMode.RESEARCH, MyToolParams> = {
     agent: AgentType.KEYWORD,
     mode: KeywordMode.RESEARCH,
     name: 'my_tool',
     // ...
   };
   ```

4. Update the examples:
   ```typescript
   // Old examples
   examples: [
     {
       params: {
         keyword: "example"
       }
     }
   ]
   
   // New examples
   examples: [
     {
       description: 'Example description',
       params: {
         keyword: "example"
       }
     }
   ]
   ```

5. Move the execution function into the tool definition:
   ```typescript
   // Old execution function
   export async function executeMyTool(params: Record<string, any>): Promise<any> {
     // ...
   }
   
   // New execution function in the tool definition
   execute: async (params: ValidatedParams<MyToolParams>): Promise<any> => {
     // ...
   }
   ```

## Benefits of the New Architecture

1. **Compile-Time Safety**: The new architecture provides compile-time safety for tool definitions, parameters, and mode relationships. This means that errors are caught at compile time rather than runtime.

2. **Type Inference**: The new architecture provides type inference for tool parameters and results. This means that you get auto-completion and type checking when using tools.

3. **Single Source of Truth**: The tool manifest system provides a single source of truth for tool definitions. This ensures that all tools are properly defined with the correct parameters and examples.

4. **Improved Developer Experience**: The new architecture provides a better developer experience with auto-completion, type checking, and better error messages.

5. **Reduced Runtime Errors**: By catching errors at compile time, the new architecture reduces the number of runtime errors that can occur.

# Troubleshooting the Modular Structure

This document provides solutions to common issues that may arise when working with the modular structure of the Semrush MCP tools.

## Schema Validation System

The Semrush MCP tools use a robust schema validation system to ensure that parameters are properly validated before being passed to the API. The schema validation system is defined in the `src/schemas/` directory and consists of the following files:

- `base-schema.ts`: Contains the base schema types and validation functions.
- `domain-schemas.ts`: Contains schema definitions for domain-related tools.
- `keyword-schemas.ts`: Contains schema definitions for keyword-related tools.

These files provide a set of functions for creating parameter definitions with proper validation. For example:

```typescript
// Create a string parameter
createStringParam({
  description: 'Description of the parameter',
  required: true,
  options: {
    minLength: 2,
    maxLength: 80,
    examples: ['example1', 'example2']
  }
});

// Create a number parameter
createNumberParam({
  description: 'Description of the parameter',
  required: true,
  options: {
    minimum: 1,
    maximum: 1000,
    default: 100,
    examples: [10, 50, 100]
  }
});

// Create a boolean parameter
createBooleanParam({
  description: 'Description of the parameter',
  required: false,
  options: {
    default: false,
    examples: [true, false]
  }
});

// Create an array parameter
createArrayParam({
  description: 'Description of the parameter',
  required: true,
  itemType: SchemaType.STRING,
  itemDescription: 'Description of the array items',
  options: {
    maxItems: 100,
    minItems: 1,
    examples: [['item1', 'item2'], ['item3', 'item4']]
  }
});
```

These functions help ensure that parameters are properly validated and provide helpful error messages when validation fails.

## TypeScript Errors with Function Exports

### Issue

When using the modular structure, you might encounter TypeScript errors like:

```
Cannot find name 'executeDomainRanks'.
Cannot find name 'executeKeywordOverview'.
```

These errors occur in the index.ts files when trying to re-export functions from individual tool files.

### Solution

The issue is related to how TypeScript handles exports and imports. To fix this, use the following pattern in your index.ts files:

1. First, import the functions with aliases:

```typescript
// Import execution functions with aliases
import { executeDomainRanks as _executeDomainRanks } from './domain_ranks.js';
import { executeDomainCompetitors as _executeDomainCompetitors } from './domain_competitors.js';
```

2. Then, re-export them as constants:

```typescript
// Re-export execution functions
export const executeDomainRanks = _executeDomainRanks;
export const executeDomainCompetitors = _executeDomainCompetitors;
```

3. Use these constants in your toolExecutors map:

```typescript
// Tool execution map
export const toolExecutors: Record<string, (params: Record<string, any>) => Promise<any>> = {
  domain_ranks: executeDomainRanks,
  domain_competitors: executeDomainCompetitors
};
```

This approach avoids TypeScript's issues with direct re-exports and ensures that the functions are properly recognized.

## Tool Not Found Errors

### Issue

When using the tools, you might encounter errors like:

```
Configuration Error: Tool not found: domain_organic_organic. Available tools for domain/traffic: traffic_summary, traffic_sources
```

### Solution

1. Double-check the tool names in your code against the available tools listed in the error message.
2. Make sure the tool is properly registered in the appropriate mode file.
3. Ensure the tool is properly exported from its file and imported in the index.ts file.
4. Check that the tool is included in the toolExecutors map in the index.ts file.

## Parameter Validation Errors

### Issue

When using the tools, you might encounter errors like:

```
Validation Error: Missing required parameters for tool 'traffic_summary': targets
```

or

```
Validation Error: Validation failed for tool 'traffic_summary': Invalid type for 'targets'. Expected array, got string.
```

### Solution

1. Check the parameter requirements in the tool definition.
2. Make sure you're providing all required parameters.
3. Ensure the parameter types match the expected types (e.g., arrays vs. strings).
4. Use the parameter helper functions to create consistent parameter definitions.

## API Errors

### Issue

When using the tools, you might encounter errors like:

```
API Error: Request failed with status code 400. Status: 400
```

### Solution

1. Check your API key and make sure it's valid.
2. Verify that your account has access to the requested API endpoint.
3. Check the parameters you're passing to the API to ensure they're valid.
4. Some tools may require additional subscriptions from Semrush.

## Circular Dependencies

### Issue

You might encounter circular dependency warnings or errors when importing from index.ts files.

### Solution

1. Avoid circular dependencies by organizing your imports carefully.
2. Use the pattern described above for re-exporting functions.
3. Consider using a different file structure if circular dependencies persist.

## Best Practices

1. Always use the parameter helper functions when possible to ensure consistent parameter definitions.
2. Include detailed descriptions and examples for each tool.
3. Validate parameters in the execution function to provide clear error messages.
4. Group related tools into appropriate modes.
5. Use meaningful names for tools and modes that reflect their purpose.
6. Follow the modular structure pattern for adding new tools and modes.

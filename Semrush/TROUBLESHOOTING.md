# Semrush MCP Tools Troubleshooting Guide

This guide provides solutions for common errors encountered when using the Semrush MCP tools.

## Common Error Patterns

### 1. Tool Not Found Errors

#### Error Pattern:
```
Configuration Error: Tool not found: [incorrect_tool_name]. Available tools for [agent]/[mode]: [available_tools]
```

#### Common Causes:
- Using an incorrect tool name
- Using a tool in the wrong mode

#### Examples and Solutions:

| Error | Solution |
|-------|----------|
| `Tool not found: domain_organic_competitors` | Use `domain_organic_organic` instead in the competitors mode |
| `Tool not found: domain_organic` | Use `domain_organic_keywords` in the domain_keywords mode |
| `Tool not found: backlinks_overview` | Use `backlinks` or `backlinks_refdomains` in the backlinks mode |

#### How to Fix:
- Double-check the tool name against the available tools listed in the error message
- If the error mentions the tool is available in a different mode, update your request to use that mode

### 2. Parameter Type Errors

#### Error Pattern:
```
Validation Error: Invalid type for '[parameter]'. Expected [type], got [actual_type]
```

#### Common Causes:
- Providing a string when an array is expected
- Providing an array when a string is expected

#### Examples and Solutions:

| Error | Solution |
|-------|----------|
| `Invalid type for 'phrase'. Expected array, got string` | Use an array of strings: `["keyword1", "keyword2"]` instead of `"keyword"` |
| `Invalid type for 'domains'. Expected array, got string` | Use an array of domains: `["example.com", "example.org"]` instead of `"example.com"` |
| `Invalid type for 'domain'. Expected string, got array` | Use a single string: `"example.com"` instead of `["example.com"]` |

#### How to Fix:
- For array parameters, always use the format: `["item1", "item2"]`
- For string parameters, use a single string without brackets: `"example"`

### 3. Missing Required Parameters

#### Error Pattern:
```
Validation Error: Missing required parameters for tool '[tool_name]': [missing_params]
```

#### Common Causes:
- Omitting a required parameter
- Using the wrong parameter name

#### Examples and Solutions:

| Error | Solution |
|-------|----------|
| `Missing required parameters for tool 'traffic_summary': domains` | Include the `domains` parameter as an array |
| `Missing required parameters for tool 'keyword_difficulty': phrase` | Include the `phrase` parameter as an array of keywords |
| `Missing required parameters for tool 'domain_ranks': domain` | Include the `domain` parameter as a string |

#### How to Fix:
- Add all required parameters listed in the error message
- Check parameter names for typos

### 4. Parameter Conflicts

#### Error Pattern:
```
Validation Error: Unknown parameter: '[parameter]'
```

#### Common Causes:
- Using `database` parameter with traffic tools (which use `country` instead)
- Using parameters that don't exist for a specific tool

#### Examples and Solutions:

| Error | Solution |
|-------|----------|
| `Unknown parameter: 'database'` (with traffic tools) | Use `country` parameter instead of `database` for traffic tools |
| `Unknown parameter: 'keyword'` (with domain tools) | Use `domain` parameter instead of `keyword` for domain tools |

#### How to Fix:
- Remove the unknown parameter
- Replace with the correct parameter if applicable

## Tool-Specific Guidelines

### Domain Agent

#### Traffic Tools
- `traffic_summary`: Requires an array of domains in the `domains` parameter (max 5)
- `traffic_sources`: Requires a single domain in the `domain` parameter
- Both use `country` parameter, NOT `database` parameter

#### Backlinks Tools
- Available tools: `backlinks` and `backlinks_refdomains`
- Both use `target` parameter for the domain or URL to analyze

### Keyword Agent

#### Keyword Difficulty Tool
- Requires an array of keywords in the `phrase` parameter
- Example: `"phrase": ["keyword1", "keyword2"]`

#### Domain Keywords Tools
- Available tools: `domain_organic_keywords` and `domain_paid_keywords`
- Both require a single domain in the `domain` parameter

## Parameter Format Guidelines

### Domains
- Do not include http:// or https:// prefixes
- Examples: `"example.com"`, `"subdomain.example.com"`

### Arrays
- Always use square brackets: `["item1", "item2"]`
- For single items, still use array format: `["item1"]`

### Country/Database Codes
- Use lowercase two-letter country codes: `"us"`, `"uk"`, `"ca"`, etc.

# Semrush MCP Tools Troubleshooting Guide

This guide provides solutions for common errors encountered when using the Semrush MCP tools.

## Known Issues

### Traffic Tools API Errors

The traffic tools (`traffic_summary` and `traffic_sources`) may return API errors with status code 400. This is likely because these tools require an additional subscription from Semrush. If you encounter these errors, please check your Semrush subscription level or contact Semrush support.

Example error:
```
API Error: Request failed with status code 400. Status: 400
```

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
| `Tool not found: domain_organic_competitors` | Use `domain_competitors` instead in the competitors mode |
| `Tool not found: domain_organic` | Use `domain_organic_keywords` in the domain_keywords mode |
| `Tool not found: backlinks_overview` | Use `backlinks` or `backlinks_refdomains` in the backlinks mode |
| `Tool not found: keyword_suggestions` | Use `related_keywords` in the research mode |

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
| `Invalid type for 'keywords'. Expected array, got string` | Use an array of strings: `["keyword1", "keyword2"]` instead of `"keyword"` |
| `Invalid type for 'targets'. Expected array, got string` | Use an array of domains: `["example.com", "example.org"]` instead of `"example.com"` |
| `Invalid type for 'domain'. Expected string, got array` | Use a single string: `"example.com"` instead of `["example.com"]` |
| `Invalid type for 'target'. Expected string, got array` | Use a single string: `"example.com"` instead of `["example.com"]` |

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
| `Missing required parameters for tool 'traffic_summary': targets` | Include the `targets` parameter as an array |
| `Missing required parameters for tool 'keyword_difficulty': keywords` | Include the `keywords` parameter as an array of keywords |
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
- `traffic_summary`: Requires an array of domains in the `targets` parameter (max 200)
  - Example: `"targets": ["example.com", "competitor.com"]`
  - Common error: Providing a string instead of an array
- `traffic_sources`: Requires a single domain in the `target` parameter
  - Example: `"target": "example.com"`
- Both use `country` parameter, NOT `database` parameter
  - Example: `"country": "us"` (not `"database": "us"`)
- Both support `display_date` parameter in YYYY-MM-01 format
  - Example: `"display_date": "2024-03-01"`
- **Important**: These tools may require an additional subscription from Semrush

#### Backlinks Tools
- Available tools: `backlinks` and `backlinks_refdomains` (not `backlinks_overview`)
- Both use `target` parameter for the domain or URL to analyze
  - Example: `"target": "example.com"` or `"target": "example.com/blog"`

### Keyword Agent

#### Research Mode Tools
- Available tools: `related_keywords`, `broad_match_keywords`, `phrase_questions`, `keyword_difficulty`
- `related_keywords` was previously called `keyword_suggestions` in some documentation
- Most tools use a single keyword in the `keyword` parameter
  - Example: `"keyword": "digital marketing"`
- `keyword_difficulty` requires an array of keywords in the `keywords` parameter
  - Example: `"keywords": ["keyword1", "keyword2"]`

#### Domain Keywords Tools
- Available tools: `domain_organic_keywords` and `domain_paid_keywords` (not `domain_organic`)
- Both require a single domain in the `domain` parameter
  - Example: `"domain": "example.com"`
- `domain_organic_keywords` finds keywords a domain ranks for in organic search
- `domain_paid_keywords` finds keywords a domain bids on in paid search

## Parameter Format Guidelines

### Domains and Targets
- Do not include http:// or https:// prefixes
- For single domains: `"domain": "example.com"` or `"target": "example.com"`
- For multiple domains: `"targets": ["example.com", "competitor.com"]`

### Arrays
- Always use square brackets: `["item1", "item2"]`
- For single items, still use array format: `["item1"]`
- Common error: Providing a string when an array is expected
  - Incorrect: `"targets": "example.com"`
  - Correct: `"targets": ["example.com"]`

### Country/Database Codes
- Use lowercase two-letter country codes: `"us"`, `"uk"`, `"ca"`, etc.
- Traffic tools use `country` parameter, not `database` parameter

# Semrush MCP Modular Structure Quick Reference

This document provides a quick reference for the modular structure of the Semrush MCP tools.

## Domain Agent

### Overview Mode

- **domain_ranks**: Get overview data for a domain - provides comprehensive metrics including traffic, keywords, and rankings.

### Competitors Mode

- **domain_competitors**: Get competitors for a domain in organic search.

### Backlinks Mode

- **backlinks**: Get backlinks for a domain or URL.
  - The correct tool name is "backlinks", not "backlinks_overview".

- **backlinks_refdomains**: Get referring domains for a domain or URL.

## Keyword Agent

### Overview Mode

- **keyword_overview**: Get search volume and metrics for a keyword.
  - Pass a single keyword string.

- **batch_keyword_overview**: Analyze up to 100 keywords at once.
  - Requires an ARRAY of keywords in the "keywords" parameter.

### Research Mode

- **related_keywords**: Get semantically related keywords.
  - Pass a single keyword string.
  - This tool was previously called "keyword_suggestions" in some documentation.

- **broad_match_keywords**: Get broad match and alternative queries.
  - Pass a single keyword string.

- **phrase_questions**: Get question-based keywords.
  - Pass a single keyword string.

- **keyword_difficulty**: Get ranking difficulty scores for up to 100 keywords.
  - Requires an ARRAY of keywords in the "keywords" parameter, not a single string.
  - Example: Use ["keyword1", "keyword2"] not "keyword".

### Domain Keywords Mode

- **domain_organic_keywords**: Get organic keywords for a domain.
  - The correct tool name is "domain_organic_keywords", not "domain_organic".
  - This is the tool to use for finding which keywords a domain ranks for in organic search.

- **domain_paid_keywords**: Get paid keywords for a domain.
  - This is the tool to use for finding which keywords a domain is bidding on in paid search.

## Common Parameters

- **domain**: Domain name without http/https prefix. Example: "example.com" not "https://example.com".
- **database**: Two-letter database code (default: us). Example: "us", "uk", "ca", etc.
- **country**: Two-letter country code (default: us). Used in traffic tools instead of database.
- **keyword**: Single keyword string. Example: "digital marketing".
- **keywords**: Array of keywords. Example: ["digital marketing", "seo tools"].
- **target**: Domain or URL for backlinks analysis. Example: "example.com".
- **targets**: Array of domains for traffic analysis. Example: ["example.com", "example.org"].
- **limit**: Maximum number of results to return (default varies by tool).

## Common Errors and Solutions

- **Tool not found**: Check the tool name and make sure it's registered in the appropriate mode.
- **Missing required parameters**: Check the parameter requirements in the tool definition.
- **Invalid parameter type**: Ensure the parameter types match the expected types (e.g., arrays vs. strings).
- **API Error**: Check your API key, account access, and parameters.

## Adding New Tools

1. Create a new file in the appropriate `tools/` directory.
2. Define the tool and its execution function.
3. Add the tool to the appropriate `tools/index.ts` file.
4. Add the tool to the appropriate mode file.

## Adding New Modes

1. Create a new file in the appropriate `modes/` directory.
2. Define the mode and include the tools it should contain.
3. Add the mode to the appropriate `modes/index.ts` file.
4. Add the mode to the agent's `setupRegistry` method.

For more detailed information, see the [README-MODULAR.md](../README-MODULAR.md) and [TROUBLESHOOTING-MODULAR.md](./TROUBLESHOOTING-MODULAR.md) files.

# Semrush MCP Usage Guide

This guide provides detailed instructions for using the Semrush Model Context Protocol (MCP) tools for keyword and domain research. It includes parameter requirements, examples, and best practices to help you avoid common configuration errors.

## Table of Contents

1. [Introduction](#introduction)
2. [Keyword Research Tools](#keyword-research-tools)
   - [related_keywords](#related_keywords)
   - [broad_match_keywords](#broad_match_keywords)
   - [phrase_questions](#phrase_questions)
   - [domain_keywords](#domain_keywords)
3. [Domain Research Tools](#domain-research-tools)
   - [domain_overview](#domain_overview)
4. [Common Parameters](#common-parameters)
5. [Error Troubleshooting](#error-troubleshooting)
6. [Example Workflows](#example-workflows)

## Introduction

The Semrush MCP provides tools for SEO research through two main agents:

- **Keyword Agent**: Tools for keyword analysis and research
- **Domain Agent**: Tools for domain analysis and competitive research

Each agent has multiple modes with specific tools. This guide focuses on the most commonly used tools and how to properly configure them.

## Keyword Research Tools

### related_keywords

This tool finds keywords related to your target keyword, helping you expand your keyword list.

**Agent**: keyword  
**Mode**: research

**Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| keyword | string | Yes | - | The keyword to find related terms for |
| database | string | No | "us" | Database to use (country code) |
| limit | number | No | 100 | Maximum number of results (1-1000) |

**Example Usage**:

```json
{
  "keyword": "digital marketing",
  "database": "us",
  "limit": 50
}
```

**Notes**:
- The `keyword` parameter is case-insensitive and will be converted to lowercase.
- You can use `phrase` as an alias for `keyword`.
- Valid database values include: 'us', 'uk', 'ca', 'au', 'de', 'fr', 'es', 'it', 'br', 'ru', 'jp', 'in', 'cn'

### broad_match_keywords

This tool finds broad matches and alternative search queries for your keyword.

**Agent**: keyword  
**Mode**: research

**Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| keyword | string | Yes | - | The keyword to find broad matches for |
| database | string | No | "us" | Database to use (country code) |
| limit | number | No | 100 | Maximum number of results (1-1000) |

**Example Usage**:

```json
{
  "keyword": "content strategy",
  "database": "us",
  "limit": 100
}
```

**Notes**:
- This tool uses 20 API units per line of results.
- The `keyword` parameter is case-insensitive and will be converted to lowercase.
- You can use `phrase` as an alias for `keyword`.

### phrase_questions

This tool finds questions containing your keyword, which is useful for content creation and addressing user queries.

**Agent**: keyword  
**Mode**: research

**Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| keyword | string | Yes | - | The keyword to find questions for |
| database | string | No | "us" | Database to use (country code) |
| limit | number | No | 100 | Maximum number of results (1-1000) |

**Example Usage**:

```json
{
  "keyword": "seo",
  "database": "us",
  "limit": 50
}
```

**Notes**:
- This tool uses 20 API units per line of results.
- The `keyword` parameter is case-insensitive and will be converted to lowercase.
- You can use `phrase` as an alias for `keyword`.

### domain_keywords

This tool retrieves organic keywords for a specific domain.

**Agent**: keyword  
**Mode**: research

**Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| domain | string | Yes | - | Domain name to analyze (e.g., "example.com") |
| database | string | No | "us" | Database to use (country code) |

**Example Usage**:

```json
{
  "domain": "semrush.com",
  "database": "us"
}
```

**Notes**:
- The domain parameter will be automatically formatted to remove protocols (http://, https://), paths, and query parameters.
- For example, "https://www.example.com/page?query=test" will be converted to "www.example.com".
- The domain is case-insensitive and will be converted to lowercase.

## Domain Research Tools

### domain_overview

This tool provides comprehensive overview data for a domain, including organic/paid search traffic, keywords, and rankings.

**Agent**: domain  
**Mode**: overview

**Parameters**:

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| domain | string | Yes | - | Domain name to analyze (e.g., "example.com") |
| database | string | No | "us" | Database to use (country code) |

**Example Usage**:

```json
{
  "domain": "ahrefs.com",
  "database": "us"
}
```

**Notes**:
- The domain parameter will be automatically formatted to remove protocols (http://, https://), paths, and query parameters.
- For example, "https://www.example.com/page?query=test" will be converted to "www.example.com".
- The domain is case-insensitive and will be converted to lowercase.

## Common Parameters

### Database Parameter

The `database` parameter specifies the country database to use for your search. It's available in most tools and defaults to "us" (United States) if not specified.

**Valid values**:
- 'us' - United States
- 'uk' - United Kingdom
- 'ca' - Canada
- 'au' - Australia
- 'de' - Germany
- 'fr' - France
- 'es' - Spain
- 'it' - Italy
- 'br' - Brazil
- 'ru' - Russia
- 'jp' - Japan
- 'in' - India
- 'cn' - China

### Limit Parameter

The `limit` parameter controls the maximum number of results returned. It's available in most tools and defaults to 100 if not specified.

**Valid range**: 1-1000

## Error Troubleshooting

### Common Errors and Solutions

1. **Missing Required Parameter**
   - Error: `Missing required parameters for tool 'tool_name': parameter_name`
   - Solution: Ensure you provide all required parameters for the tool.

2. **Invalid Database Value**
   - Error: `Invalid value for 'database'. Expected one of: us, uk, ca, au, de, fr, es, it, br, ru, jp, in, cn`
   - Solution: Use only the supported country codes listed above.

3. **Invalid Limit Value**
   - Error: `Invalid value for 'limit'. Value X is less than minimum 1` or `Value X is greater than maximum 1000`
   - Solution: Ensure the limit value is between 1 and 1000.

4. **Domain Format Issues**
   - Error: `Invalid format for 'domain'`
   - Solution: Provide a valid domain name. The system will automatically format it, but it should be a recognizable domain.

5. **Tool Not Available in Mode**
   - Error: `Tool 'tool_name' is not available in mode 'mode_name'`
   - Solution: Make sure you're using the correct agent and mode for the tool.

## Example Workflows

### Comprehensive Keyword Research

1. Start with domain overview to understand a competitor's performance:
   ```json
   {
     "agent": "domain",
     "mode": "overview",
     "tool": "domain_overview",
     "parameters": {
       "domain": "competitor.com",
       "database": "us"
     }
   }
   ```

2. Find their top keywords:
   ```json
   {
     "agent": "keyword",
     "mode": "research",
     "tool": "domain_keywords",
     "parameters": {
       "domain": "competitor.com",
       "database": "us"
     }
   }
   ```

3. Expand your keyword list with related keywords:
   ```json
   {
     "agent": "keyword",
     "mode": "research",
     "tool": "related_keywords",
     "parameters": {
       "keyword": "target keyword",
       "database": "us",
       "limit": 100
     }
   }
   ```

4. Find question-based keywords for content creation:
   ```json
   {
     "agent": "keyword",
     "mode": "research",
     "tool": "phrase_questions",
     "parameters": {
       "keyword": "target keyword",
       "database": "us",
       "limit": 50
     }
   }
   ```

5. Explore broad match variations:
   ```json
   {
     "agent": "keyword",
     "mode": "research",
     "tool": "broad_match_keywords",
     "parameters": {
       "keyword": "target keyword",
       "database": "us",
       "limit": 100
     }
   }
   ```

By following this guide, you should be able to effectively use the Semrush MCP tools for keyword and domain research while avoiding common configuration errors.
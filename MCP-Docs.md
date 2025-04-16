# Semrush MCP Documentation

## Overview

This document provides information about the Semrush MCP tools, their parameters, and usage patterns.

## Domain Analysis Tools

### Overview Mode
- `domain_overview`: Get comprehensive domain metrics
  ```json
  {
    "domain": "example.com",
    "database": "us" // optional, defaults to "us"
  }
  ```

### Competitors Mode
- `competitors`: Get domain competitors
  ```json
  {
    "domain": "example.com",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```

### Traffic Mode
- `traffic_summary`: Get traffic summary for multiple domains
  ```json
  {
    "domains": ["example1.com", "example2.com"], // up to 5 domains
    "database": "us", // optional
    "country": "us" // optional
  }
  ```
- `traffic_sources`: Get traffic sources for a domain
  ```json
  {
    "domain": "example.com",
    "country": "us" // optional
  }
  ```

### Backlinks Mode
- `backlinks`: Get backlinks for a domain or URL
  ```json
  {
    "target": "example.com", // or use "domain" or "url"
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```
- `backlinks_domains`: Get referring domains
  ```json
  {
    "target": "example.com", // or use "domain" or "url"
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```

## Keyword Analysis Tools

### Overview Mode
- `keyword_overview`: Get keyword metrics and data
  ```json
  {
    "keyword": "example keyword",
    "database": "us",
    "restrict_to_db": false // optional, defaults to false
  }
  ```
- `batch_keyword_overview`: Analyze multiple keywords
  ```json
  {
    "keywords": ["keyword1", "keyword2"], // up to 100 keywords
    "database": "us"
  }
  ```

### Research Mode
- `related_keywords`: Get related keywords
  ```json
  {
    "keyword": "example keyword",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```
- `broad_match_keywords`: Get broad match variations
  ```json
  {
    "keyword": "example keyword",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```
- `phrase_questions`: Get question phrases containing keyword
  ```json
  {
    "keyword": "example keyword",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```
- `domain_keywords`: Get domain's keywords
  ```json
  {
    "domain": "example.com",
    "database": "us" // optional
  }
  ```

### Competition Mode
- `keyword_organic_results`: Get organic rankings
  ```json
  {
    "keyword": "example keyword",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```
- `keyword_paid_results`: Get paid search results
  ```json
  {
    "keyword": "example keyword",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```
- `keyword_ads_history`: Get historical ad copies
  ```json
  {
    "keyword": "example keyword",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```

### Analysis Mode
- `keyword_difficulty`: Get keyword difficulty scores
  ```json
  {
    "keywords": ["keyword1", "keyword2"], // up to 100 keywords
    "database": "us" // optional
  }
  ```

### Domain Keywords Mode
- `domain_organic_keywords`: Get organic keywords for domain
  ```json
  {
    "domain": "example.com",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```
- `domain_paid_keywords`: Get paid keywords for domain
  ```json
  {
    "domain": "example.com",
    "database": "us", // optional
    "limit": 10 // optional
  }
  ```

## Common Parameters

### Database Options
Valid database values: "us", "uk", "ca", "au", "de", "fr", "es", "it", "br", "ru", "jp", "in", "cn"

### Parameter Transformations
- Domains are automatically formatted (removes http/https/www)
- Keywords are converted to lowercase
- Arrays can be provided as comma-separated strings or arrays

## Error Handling

Common error scenarios and solutions:

1. **Missing Required Parameters**
   - Ensure all required parameters are provided
   - Check parameter aliases if applicable (e.g., target/domain/url)

2. **Invalid Parameter Values**
   - Database must be one of the supported country codes
   - Domain format must be valid (e.g., "example.com")
   - Arrays must not exceed size limits

3. **API Errors**
   - 404: Invalid endpoint or resource not found
   - 400: Invalid request parameters
   - 429: Rate limit exceeded

# Semrush MCP Tools Quick Reference

This guide provides examples of correct usage for each Semrush MCP tool.

## Domain Agent

### Overview Mode

#### domain_ranks
```json
{
  "mode": "overview",
  "tool": "domain_ranks",
  "params": {
    "domain": "example.com",
    "database": "us"
  }
}
```

### Competitors Mode

#### domain_competitors
```json
{
  "mode": "competitors",
  "tool": "domain_competitors",
  "params": {
    "domain": "example.com",
    "database": "us",
    "limit": 10
  }
}
```

### Traffic Mode

#### traffic_summary
```json
{
  "mode": "traffic",
  "tool": "traffic_summary",
  "params": {
    "targets": ["example.com", "competitor.com"],
    "country": "us",
    "display_date": "2024-03-01"
  }
}
```

> **Note**: This tool may require an additional subscription from Semrush. If you receive a 400 error, check your subscription level.

#### traffic_sources
```json
{
  "mode": "traffic",
  "tool": "traffic_sources",
  "params": {
    "target": "example.com",
    "country": "us",
    "display_date": "2024-03-01",
    "limit": 10
  }
}
```

> **Note**: This tool may require an additional subscription from Semrush. If you receive a 400 error, check your subscription level.

### Backlinks Mode

#### backlinks
```json
{
  "mode": "backlinks",
  "tool": "backlinks",
  "params": {
    "target": "example.com",
    "limit": 10
  }
}
```

#### backlinks_refdomains
```json
{
  "mode": "backlinks",
  "tool": "backlinks_refdomains",
  "params": {
    "target": "example.com",
    "limit": 10
  }
}
```

## Keyword Agent

### Overview Mode

#### keyword_overview
```json
{
  "mode": "overview",
  "tool": "keyword_overview",
  "params": {
    "keyword": "digital marketing",
    "database": "us"
  }
}
```

#### batch_keyword_overview
```json
{
  "mode": "overview",
  "tool": "batch_keyword_overview",
  "params": {
    "keywords": ["digital marketing", "seo tools", "content marketing"],
    "database": "us"
  }
}
```

### Research Mode

#### related_keywords
```json
{
  "mode": "research",
  "tool": "related_keywords",
  "params": {
    "keyword": "digital marketing",
    "database": "us",
    "limit": 10
  }
}
```

> **Note**: This tool was previously called `keyword_suggestions` in some documentation.

#### broad_match_keywords
```json
{
  "mode": "research",
  "tool": "broad_match_keywords",
  "params": {
    "keyword": "digital marketing",
    "database": "us",
    "limit": 10
  }
}
```

#### phrase_questions
```json
{
  "mode": "research",
  "tool": "phrase_questions",
  "params": {
    "keyword": "digital marketing",
    "database": "us",
    "limit": 10
  }
}
```

#### keyword_difficulty
```json
{
  "mode": "research",
  "tool": "keyword_difficulty",
  "params": {
    "keywords": ["digital marketing", "seo tools", "content marketing"],
    "database": "us"
  }
}
```

### Domain Keywords Mode

#### domain_organic_keywords
```json
{
  "mode": "domain_keywords",
  "tool": "domain_organic_keywords",
  "params": {
    "domain": "example.com",
    "database": "us",
    "limit": 10
  }
}
```

> **Note**: The correct tool name is `domain_organic_keywords`, not `domain_organic`.

#### domain_paid_keywords
```json
{
  "mode": "domain_keywords",
  "tool": "domain_paid_keywords",
  "params": {
    "domain": "example.com",
    "database": "us",
    "limit": 10
  }
}
```

## Parameter Guidelines

### Common Parameters

- **domain**: A single domain string without http/https prefix
  - ✅ `"domain": "example.com"`
  - ❌ `"domain": "https://example.com"`
  - ❌ `"domain": ["example.com"]`

- **targets**: An array of domain strings (for traffic_summary)
  - ✅ `"targets": ["example.com", "competitor.com"]`
  - ❌ `"targets": "example.com"` (common error)

- **target**: A single domain string (for traffic_sources and backlinks)
  - ✅ `"target": "example.com"`
  - ❌ `"target": ["example.com"]`

- **keyword**: A single keyword string
  - ✅ `"keyword": "digital marketing"`
  - ❌ `"keyword": ["digital marketing"]`

- **keywords**: An array of keyword strings (for batch tools)
  - ✅ `"keywords": ["digital marketing", "seo tools"]`
  - ❌ `"keywords": "digital marketing"`

- **database**: A two-letter country code string
  - ✅ `"database": "us"`
  - ❌ `"database": ["us"]`

- **country**: A two-letter country code string (for traffic tools)
  - ✅ `"country": "us"`
  - ❌ `"country": ["us"]`

- **limit**: A number between 1 and 1000
  - ✅ `"limit": 10`
  - ❌ `"limit": "10"`

### Mode-Specific Notes

- **Traffic Mode**: Uses `country` parameter, not `database`
- **Backlinks Mode**: Uses `target` parameter for domain/URL
- **Research Mode**: `keyword_difficulty` requires array in `keywords` parameter
- **Domain Keywords Mode**: Uses `domain_organic_keywords`, not `domain_organic`

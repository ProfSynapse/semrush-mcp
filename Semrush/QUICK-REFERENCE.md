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

#### domain_organic_organic
```json
{
  "mode": "competitors",
  "tool": "domain_organic_organic",
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
    "domains": ["example.com", "competitor.com"],
    "country": "us"
  }
}
```

#### traffic_sources
```json
{
  "mode": "traffic",
  "tool": "traffic_sources",
  "params": {
    "domain": "example.com",
    "country": "us"
  }
}
```

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
    "phrase": ["digital marketing", "seo tools", "content marketing"],
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

- **domains**: An array of domain strings
  - ✅ `"domains": ["example.com", "competitor.com"]`
  - ❌ `"domains": "example.com"`

- **keyword**: A single keyword string
  - ✅ `"keyword": "digital marketing"`
  - ❌ `"keyword": ["digital marketing"]`

- **phrase**: An array of keyword strings
  - ✅ `"phrase": ["digital marketing", "seo tools"]`
  - ❌ `"phrase": "digital marketing"`

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
- **Research Mode**: `keyword_difficulty` requires array in `phrase` parameter

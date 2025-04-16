# Semrush API Testing Guide

## Domain Analysis Tools

### Tool Configurations

1. **Domain Ranks (Overview)**
```typescript
{
  tool: "domain_ranks",
  params: {
    domain: "example.com",
    database: "us",  // optional, defaults to "us"
    export_columns: "Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,Sh,Sv"  // optional
  }
}
```

2. **Competitors (Organic)**
```typescript
{
  tool: "domain_organic_organic",
  params: {
    domain: "example.com",
    database: "us",  // optional, defaults to "us"
    limit: 10  // optional
  }
}
```

3. **Traffic Analysis**
```typescript
// Traffic Summary
{
  tool: "traffic_summary",
  params: {
    domains: ["domain1.com", "domain2.com"],  // max 5 domains
    country: "us"  // optional, defaults to "us"
  }
}

// Traffic Sources
{
  tool: "traffic_sources",
  params: {
    domain: "example.com",
    country: "us"  // optional, defaults to "us"
  }
}
```

4. **Backlinks Analysis**
```typescript
// Backlinks
{
  tool: "backlinks",
  params: {
    target: "example.com",  // domain or URL
    database: "us",  // optional, defaults to "us"
    limit: 10  // optional
  }
}

// Referring Domains
{
  tool: "backlinks_refdomains",
  params: {
    target: "example.com",  // domain or URL
    database: "us",  // optional, defaults to "us"
    limit: 10  // optional
  }
}
```

## Keyword Analysis Tools

1. **Keyword Overview**
```typescript
// Single Database Overview
{
  tool: "keyword_overview",
  params: {
    keyword: "example keyword",
    database: "us",
    restrict_to_db: true  // optional, defaults to false
  }
}

// Batch Overview
{
  tool: "batch_keyword_overview",
  params: {
    keywords: ["keyword1", "keyword2"],  // up to 100 keywords
    database: "us"  // required for batch
  }
}
```

2. **Keyword Research**
```typescript
// Related Keywords
{
  tool: "related_keywords",
  params: {
    keyword: "example keyword",
    database: "us",  // optional, defaults to "us"
    limit: 10  // optional
  }
}

// Broad Match Keywords
{
  tool: "broad_match_keywords",
  params: {
    keyword: "example keyword",
    database: "us",  // optional, defaults to "us"
    limit: 10  // optional
  }
}

// Question Keywords
{
  tool: "phrase_questions",
  params: {
    keyword: "example keyword",
    database: "us",  // optional, defaults to "us"
    limit: 10  // optional
  }
}
```

3. **Domain Keywords**
```typescript
// Organic Keywords
{
  tool: "domain_organic_keywords",
  params: {
    domain: "example.com",
    database: "us",  // optional, defaults to "us"
    limit: 10  // optional
  }
}

// Paid Keywords
{
  tool: "domain_paid_keywords",
  params: {
    domain: "example.com",
    database: "us",  // optional, defaults to "us"
    limit: 10  // optional
  }
}
```

## Error Handling and Recovery

1. **Parameter Validation Errors**
```typescript
// Missing Required Parameters
{
  error: 'Domain is required',
  status: 400
}

// Invalid Array Length
{
  error: 'Maximum 5 domains allowed',
  status: 400
}
```

2. **API Response Errors**
```typescript
// Authentication Error
{
  error: 'Invalid API key',
  status: 401
}

// Not Found Error
{
  error: 'Resource not found',
  status: 404
}

// Rate Limit Error
{
  error: 'Rate limit exceeded',
  status: 429
}
```

3. **Retry Strategy**
```typescript
// For rate limit (429) errors:
const retryWithBackoff = async (fn: () => Promise<any>, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s, etc.
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
        continue;
      }
      throw error;
    }
  }
};
```

## Important Notes

1. Database Parameter:
- All database codes are two letters (e.g., 'us', 'uk', 'de')
- Mobile databases use 'mobile-' prefix
- Extended databases use '-ext' suffix

2. Target/Domain Parameters:
- `target` automatically detects URL vs domain
- URLs must include protocol (http:// or https://)
- Domain validation removes protocol and 'www'

3. Limits and Quotas:
- Traffic summary: Max 5 domains
- Batch keywords: Max 100 keywords
- Results per page: Default varies by endpoint
- Rate limit: 10 requests per second

4. Best Practices:
- Use batch operations when possible
- Cache results for standard timeframes
- Implement exponential backoff for rate limits
- Validate parameters before making API calls
- Handle API units balance proactively

## Testing Strategy

1. Test Parameter Validation:
```typescript
// Test required parameters
await expect(tool.execute({}))
  .rejects.toThrow('Domain is required');

// Test array limits
await expect(tool.execute({domains: ['d1','d2','d3','d4','d5','d6']}))
  .rejects.toThrow('Maximum 5 domains allowed');

// Test parameter types
await expect(tool.execute({keywords: "not an array"}))
  .rejects.toThrow('Keywords must be an array');
```

2. Test Error Handling:
```typescript
// Test API errors
await expect(tool.execute(invalidParams))
  .rejects.toThrow(SemrushApiError);

// Test rate limiting
await expect(Promise.all(manyRequests))
  .rejects.toThrow('Rate limit exceeded');

// Test retry mechanism
const result = await retryWithBackoff(() => 
  tool.execute(params)
);
```

3. Test Data Validation:
```typescript
// Test response format
const response = await tool.execute(params);
expect(response).toHaveProperty('data');
expect(response).toHaveProperty('status');

// Test data types
expect(Array.isArray(response.data)).toBe(true);
expect(response.status).toBe(200);
```

## Troubleshooting Common Issues

1. Authentication Issues:
- Verify API key is set in environment variables
- Check subscription status for required endpoints
- Ensure API units balance is sufficient

2. Rate Limiting:
- Implement exponential backoff
- Use caching for frequent requests
- Monitor rate limit headers

3. Data Format Issues:
- Always validate input parameters
- Check response content type
- Handle CSV parsing errors

4. Network Issues:
- Implement request timeouts
- Add retry logic for network errors
- Log full error details for debugging

## Additional Resources

1. API Documentation:
- [Semrush API Documentation](https://developer.semrush.com/api/)
- [API Error Codes](https://developer.semrush.com/api/basics/errors/)
- [Rate Limits](https://developer.semrush.com/api/basics/rate-limits/)

2. Development Tools:
- [API Console](https://www.semrush.com/api-console/)
- [API Units Calculator](https://www.semrush.com/api-analytics/api-units/)
- [API Testing Tools](https://www.semrush.com/api-analytics/tools/)

# Semrush MCP Tools Changelog

## 2025-04-16 Updates

### Fixed Issues

1. **Traffic Tools Improvements**
   - Added better error handling for traffic tools (`traffic_summary` and `traffic_sources`)
   - Added notes that these tools may require additional Semrush subscription
   - Improved parameter validation for `targets` parameter (must be an array)
   - Enhanced error messages to be more descriptive

2. **Tool Name Clarifications**
   - Added notes about `related_keywords` being previously called `keyword_suggestions`
   - Added notes about `domain_organic_keywords` being the correct name (not `domain_organic`)
   - Improved descriptions for backlinks tools to clarify available options

3. **Parameter Validation Enhancements**
   - Improved array parameter handling for both domains and keywords
   - Added better transformation functions to handle both string and array inputs
   - Enhanced error messages for type mismatches

4. **Documentation Updates**
   - Updated TROUBLESHOOTING.md with more specific guidance and examples
   - Updated QUICK-REFERENCE.md with correct tool names and parameter formats
   - Added notes about common errors and how to avoid them

### Known Issues

- Traffic tools (`traffic_summary` and `traffic_sources`) may still return API errors with status code 400 if the user doesn't have the required Semrush subscription level.

## How to Use This Update

1. **For Traffic Tools**
   - Always use an array format for the `targets` parameter: `"targets": ["example.com"]`
   - Use `country` parameter instead of `database` parameter
   - Be aware that these tools may require additional subscription

2. **For Keyword Research**
   - Use `related_keywords` (not `keyword_suggestions`)
   - For `keyword_difficulty`, use an array in the `keywords` parameter

3. **For Domain Keywords**
   - Use `domain_organic_keywords` (not `domain_organic`)
   - Use `domain_paid_keywords` for paid search keywords

4. **For Backlinks**
   - Use `backlinks` or `backlinks_refdomains` (not `backlinks_overview`)
   - Use a single string in the `target` parameter

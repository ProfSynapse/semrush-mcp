# Semrush MCP Server

A Model Context Protocol (MCP) server implementation that provides tools for accessing Semrush API data.

## Features

The Semrush MCP server provides tools for:

- **Domain Analytics**
  - Domain overview information
  - Organic and paid keywords analysis
  - Competitor analysis

- **Keyword Analytics**
  - Keyword overview data
  - Related keyword discovery

- **Backlink Analysis**
  - Backlink data
  - Referring domains analysis

- **Traffic Analytics**
  - Traffic summary for domains
  - Traffic sources analysis
  - (Note: Requires .Trends API subscription)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Semrush API key:
   ```
   SEMRUSH_API_KEY=your_api_key_here
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the server:
   ```bash
   npm run start
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SEMRUSH_API_KEY` | Your Semrush API key | (Required) |
| `API_CACHE_TTL_SECONDS` | Time to cache API responses | 300 |
| `API_RATE_LIMIT_PER_SECOND` | Maximum API requests per second | 10 |
| `NODE_ENV` | Environment (development/production) | development |
| `PORT` | Server port | 3000 |
| `LOG_LEVEL` | Logging level | info |

## Available Tools

| Tool Name | Description | Required Parameters |
|-----------|-------------|---------------------|
| `semrush_domain_overview` | Get domain overview data | domain, [database] |
| `semrush_domain_organic_keywords` | Get organic keywords for domain | domain, [database], [limit] |
| `semrush_domain_paid_keywords` | Get paid keywords for domain | domain, [database], [limit] |
| `semrush_competitors` | Get organic search competitors | domain, [database], [limit] |
| `semrush_backlinks` | Get backlinks for a domain/URL | target, [limit] |
| `semrush_backlinks_domains` | Get referring domains | target, [limit] |
| `semrush_keyword_overview` | Get keyword overview data | keyword, [database] |
| `semrush_related_keywords` | Find related keywords | keyword, [database], [limit] |
| `semrush_keyword_overview_single_db` | Get detailed keyword data for specific database | keyword, database |
| `semrush_batch_keyword_overview` | Analyze up to 100 keywords at once | keywords, database |
| `semrush_keyword_organic_results` | Get domains ranking in organic results | keyword, database, [limit] |
| `semrush_keyword_paid_results` | Get domains in paid search results | keyword, database, [limit] |
| `semrush_keyword_ads_history` | Get 12-month history of domains bidding on keyword | keyword, database, [limit] |
| `semrush_broad_match_keywords` | Get broad matches and alternate search queries | keyword, database, [limit] |
| `semrush_phrase_questions` | Get question-based keywords | keyword, database, [limit] |
| `semrush_keyword_difficulty` | Get difficulty index for ranking in top 10 | keywords, database |
| `semrush_traffic_summary` | Get traffic summary data for domains | domains, [country] |
| `semrush_traffic_sources` | Get traffic sources data | domain, [country] |
| `semrush_api_units_balance` | Check API units balance | check: true |

Parameters in [brackets] are optional.

## API Units Consumption

API requests to Semrush consume API units from your account. Different types of requests have different costs. You can check your API units balance using the `semrush_api_units_balance` tool.

### Keyword Reports API Units Consumption

| Tool | API Units per Line |
|------|-------------------|
| `semrush_keyword_overview` | 10 |
| `semrush_keyword_overview_single_db` | 10 |
| `semrush_batch_keyword_overview` | 10 |
| `semrush_keyword_organic_results` | 10 |
| `semrush_keyword_paid_results` | 20 |
| `semrush_related_keywords` | 40 |
| `semrush_keyword_ads_history` | 100 |
| `semrush_broad_match_keywords` | 20 |
| `semrush_phrase_questions` | 40 |
| `semrush_keyword_difficulty` | 50 |

## Adding to Cursor or Claude

To add this MCP server to Cursor or Claude:

### Cursor

1. In Cursor, go to Settings > MCP Servers
2. Click "Add Server"
3. Configure the server with the following settings:
   - **Name**: `Semrush MCP` (or any name you prefer)
   - **Type**: `command`
   - **Command**: `node`
   - **Arguments**: `/path/to/semrush-mcp/dist/index.js` (replace with your actual path)
   - **Environment Variables**:
     - `SEMRUSH_API_KEY`: Your Semrush API key
     - Other optional variables as needed
4. Click "Save"

### Claude Desktop

Configure the MCP server in the Claude Desktop settings following the documentation.

## Development

To run the server in development mode:

```bash
npm run dev
```

## Security Notes

- Never share your Semrush API key publicly
- API key provides access to your API units balance
- Exposing credentials can lead to unauthorized API usage and unexpected charges

## License

[MIT](./LICENSE) 
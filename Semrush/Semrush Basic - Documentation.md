---
title: "Semrush Developers"
description:
clipdate: 2025-04-14
source: "https://developer.semrush.com/api/v3/analytics/basic-docs/"
published:
tags:
  - "analytics"
  - "api"
  - "semrush"
  - "domainAnalytics"
  - "organicResearch"
  - "keywordAnalytics"
  - "backlinkAnalytics"
  - "apiKeyAuthentication"
  - "csvResponse"
  - "filters"
  - "sorting"
  - "serpFeatures"
  - "historicalData"
  - "errorHandling"
  - "regionalDatabases"
  - "apiUsage"
---
> [!summary]- Summary
> - Semrush Analytics API provides various reports including Domain Analytics, Organic Research, Advertising Research, Keyword Gap Analysis, Keyword Analytics, and Backlink Analytics.
> - Authentication is done via API keys assigned to users after subscribing.
> - All report responses are returned in CSV format.
> - Column names are fixed but their order can be changed.
> - Multiple regional databases are available for different countries and search types (desktop, mobile, extended).
> - Filters can be applied using the display_filter parameter with URL-encoded strings.
> - Sorting is available on many fields using the display_sort parameter.
> - SERP Features are supported with corresponding codes and descriptions.
> - Historical data is available but costs more API units.
> - Error messages are defined with codes, descriptions, and recommended actions.
> - Cookies used on the site are categorized into Necessary, Preferences, Analytical, Marketing, and Other cookies.

It's a group of products with Analytics reports including:

- Domain Analytics
- Organic Research
- Advertising Research
- Keyword Gap Analysis
- Keyword Analytics
- Backlink Analytics

Request authentication is provided via API keys. An API key is assigned to each user after subscribing to Semrush. You'll find it in [**Subscription info** > **API units**](https://www.semrush.com/accounts/subscription-info/api-units/). If your API key is unavailable there, refer to [How to get API documentation](https://developer.semrush.com/api/basics/how-to-get-api/).

Never share your API key publicly. If you share an API call example, replace your key with a placeholder such as `https://api.semrush.com/?key=<key>`.

Your API key also gives access to your API unit balance. Exposing your credentials can result in your account being compromised, which could lead to unexpected charges.

Tips and tricks:

- Column names can't be changed
- Order of columns can be changed
- Number of columns can be increased
- Semrush will only remove old columns after notifying users

| Name | Description | API |
| --- | --- | --- |
| Ab | Place on the SERP where an ad appeared (top, side, or bottom blocks). | Domain Paid Search Keywords, Subdomain Paid Search Keywords, Subfolder Paid Search Keywords |
| Ac | Estimated budget spent buying keywords in Google Ads for ads that appear in paid search results (monthly estimation). | Competitors in Paid Search, PLA Competitors, Keyword Ads History, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Ad | Keywords a website is buying in Google Ads for ads that appear in paid search results. | Competitors in Organic Search, Competitors in Paid Search, PLA Competitors, Keyword Ads History, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Am | Changes in the number of paid keywords. | Winners and Losers |
| At | Traffic brought to the website via paid search results. | Competitors in Paid Search, PLA Competitors, Keyword Ads History, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Bm | Changes in paid traffic. | Winners and Losers |
| Cm | Changes in paid traffic price. | Winners and Losers |
| Co | Competitive density of advertisers using the given term for their ads. One (1) means the highest competition. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain vs. Domain, Keyword Overview (all databases), Keyword Overview (one database), Batch Keyword Overview (one database), Related Keywords, Broad Match Keyword, Phrase questions, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Cp | Average price in USD advertisers pay for a user's click on an ad containing a particular keyword (Google Ads). | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain Ad History, Domain vs. Domain, Keyword Overview (all databases), Keyword Overview (one database), Batch Keyword Overview (one database), Related Keywords, Broad Match Keyword, Phrase questions, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Cr | Competition level based on the total number of keywords of each domain and the number of keywords the domains have in common. | Competitors in Organic Search, Competitors in Paid Search, PLA Competitors |
| Cv | Keyword coverage represents the percentage of ads displayed for a particular keyword in the last 12 months (100% = 12 months). | Domain Ad History |
| Db | Regional database (US, UK, Italy, etc.). | Keyword Overview (all databases), Domain Overview (all databases), Subdomain Overview (all databases), Subfolder Overview (all databases), URL Overview (all databases) |
| Dn | Domain name. | Competitors in Organic Search, Competitors in Paid Search, PLA Competitors, Organic Results, Paid Results, Keyword Ads History, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subfolder Overview (one database), Subfolder Overview (all databases), URL Overview (one database), URL Overview (all databases) |
| Ds | Ad text. | Domain Paid Search Keywords, Ads Copies, Domain Ad History, Keyword Ads History, Subdomain Paid Search Keywords, Subfolder Paid Search Keywords, URL paid search keywords |
| Dt | Current date. | Domain Ad History, Keyword Overview (all databases), Keyword Ads History, Domain Overview (all databases), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (history), URL Overview (all databases) |
| Fk | All SERP Features triggered by a keyword. For a full list of available features, refer to the SERP Features section. | Domain Organic Search Keywords, Organic Results, Related Keywords, Broad Match Keyword, Subdomain Organic Search Keywords, Subfolder Organic Search Keywords, Subfolder Organic Search Keywords, URL organic search keywords |
| Fp | SERP features in which a domain appears on SERP for a keyword. For a full list of available features, refer to the SERP Features section. | Domain Organic Search Keywords, Organic Results, Subdomain Organic Search Keywords, Subfolder Organic Search Keywords, Subfolder Organic Search Keywords, URL organic search keywords |
| Fl | (Deprecated) SERP features in which a domain appears on SERP for a keyword. | Organic Results |
| FKn | Total number of SERP Features triggered by the keywords that your domain ranks for. Columns with specified numbers should be separated with commas: FK1,FK2..FKn, where n is the number of a SERP feature from this list. | Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| FPn | Total number of SERP Features that your domain ranks in. Columns with changed numbers should be separated with commas: FP1,FP2..FPn, where n is the number of a SERP feature from this list. | Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Ip | IP address. | Referring domains, Referring IPs |
| In | Keyword intents (0 - Commercial, 1 - Informational, 2 - Navigational, 3 - Transactional). | Domain Organic Search Keywords, Keyword Overview (all databases), Keyword Overview (one database), Batch Keyword Overview (one database), Related Keywords, Broad Match Keyword, Phrase questions, Subdomain Organic Search Keywords, Subfolder Organic Search Keywords, URL organic search keywords |
| Ipu | Total number of positions with unknown intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| Ip0 | Total number of positions with the Commercial intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| Ip1 | Total number of positions with the Informational intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| Ip2 | Total number of positions with the Navigational intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| Ip3 | Total number of positions with the Transactional intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| Itu | Total amount of traffic with unknown intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| It0 | Total amount of traffic with the Commercial intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| It1 | Total amount of traffic with the Informational intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| It2 | Total amount of traffic with the Navigational intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| It3 | Total amount of traffic with the Transactional intent. | Domain Organic Pages, Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Organic Pages, URL Overview (one database) |
| Icu | Total cost of traffic with unknown intent. | Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subfolder Overview (one database), URL Overview (one database) |
| Ic0 | Total cost of traffic with the Commercial intent. | Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subfolder Overview (one database), URL Overview (one database) |
| Ic1 | Total cost of traffic with the Informational intent. | Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subfolder Overview (one database), URL Overview (one database) |
| Ic2 | Total cost of traffic with the Navigational intent. | Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subfolder Overview (one database), URL Overview (one database) |
| Ic3 | Total cost of traffic with the Transactional intent. | Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subfolder Overview (one database), URL Overview (one database) |
| Kd | Estimate of how difficult it would be to rank well in organic search results for a particular keyword. The higher the percentage, the harder it is to achieve high rankings for the given keyword. | Domain Organic Search Keywords, Domain vs. Domain, Keyword Overview (all databases), Keyword Overview (one database), Batch Keyword Overview (one database), Related Keywords, Broad Match Keyword, Phrase questions, Keyword Difficulty, Subdomain Organic Search Keywords, Subfolder Organic Search Keywords, URL organic search keywords |
| Np | Common keywords that domains are ranking for in Google's top 100 organic search results. | Competitors in Organic Search, Competitors in Paid Search, PLA Competitors |
| Nq | Average number of times users have searched for a given keyword per month. We calculate this value over the last 12 months. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain Ad History, Domain vs. Domain, Domain PLA Search Keywords, Keyword Overview (all databases), Keyword Overview (one database), Batch Keyword Overview (one database), Related Keywords, Broad Match Keyword, Phrase questions, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Nr | Total number of organic results returned for a given keyword at the last date of collection. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain vs. Domain, Keyword Overview (all databases), Keyword Overview (one database), Batch Keyword Overview (one database), Related Keywords, Broad Match Keyword, Phrase questions, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Oc | Estimated price of organic keywords in Google Ads. | Competitors in Organic Search, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Oe | Keywords that the domain is still ranking for within the top 100 positions for, but has moved up in ranking since their previous position. | Domain Overview (one database), Domain Overview (history) |
| Oi | Results that have decreased in ranking, yet still remain in the top 100. | Domain Overview (one database), Domain Overview (history) |
| Ol | Keywords that the domain was previously ranking for within the top 100 positions, but isn't any longer. | Domain Overview (one database), Domain Overview (history) |
| Om | Changes in the number of organic keywords. | Winners and Losers |
| On | New keywords that the domain is ranking for within the top 100 organic results based on the chosen time period. | Domain Overview (one database), Domain Overview (history) |
| Or | Keywords that bring users to a website via Google's top 100 organic search results. | Competitors in Organic Search, Competitors in Paid Search, PLA Competitors, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Ot | Traffic brought to a website via Google's top 100 organic search results. | Competitors in Organic Search, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| P0 | Position of the first queried domain for a particular keyword in Google's top 100 organic or paid search results. | Domain vs. Domain |
| P1 | Position of the second queried domain for a particular keyword in Google's top 100 organic or paid search results. | Domain vs. Domain |
| P2 | Position of the third queried domain for a particular keyword in Google's top 100 organic or paid search results. | Domain vs. Domain |
| P3 | Position of the fourth queried domain for a particular keyword in Google's top 100 organic or paid search results. | Domain vs. Domain |
| P4 | Position of the fifth queried domain for a particular keyword in Google's top 100 organic or paid search results. | Domain vs. Domain |
| Pc | Number of keywords. | Ads Copies, PLA Copies, Domain Organic Pages, Domain Organic Subdomains, Subdomain Organic Pages, Subfolder Organic Pages |
| Pd | Difference between the previous position a domain was earning with a particular keyword and its current position. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain PLA Search Keywords, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords |
| Ph | Keyword bringing users to the website via Google's top 100 organic search results. | Domain Organic Search Keywords, Domain Paid Search Keywords, Ads Copies, Domain Ad History, Domain vs. Domain, Domain PLA Search Keywords, Keyword Overview (all databases), Keyword Overview (one database), Batch Keyword Overview (one database), Related Keywords, Broad Match Keyword, Phrase questions, Keyword Difficulty, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Po | Position the URL gets with a particular keyword in Google's top 100 organic or paid search results. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain Ad History, Domain PLA Search Keywords, Organic Results, Keyword Ads History, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Pp | Position the domain gets with a particular keyword in Google's top 100 organic or paid search results. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain PLA Search Keywords, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords |
| Pr | Price of promoted product. | Domain PLA Search Keywords, PLA Copies |
| Pt | Type of position (the regular organic position or the specific SERP Feature). | Domain Organic Search Keywords, Organic Results, Subdomain Organic Search Keywords, Subfolder Organic Search Keywords, URL organic search keywords |
| Rk | Semrush rating of the website's popularity based on organic traffic coming from Google's top 100 organic search results. | Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, URL Overview (all databases) |
| Rr | Degree of relevance of the result keyword to the seed keyword. | Related Keywords |
| Sc | Estimated price to pay for the PPC ads to rank for the keywords where the domain is ranking in the SERP Features. | Competitors in Organic Search, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Scm | Changes in the organic traffic cost driven by SERP Feature positions. | Winners and Losers |
| Sh | Number of keywords the website is using for product listing ads. | PLA Competitors, Domain Overview (all databases), Subdomain Overview (all databases), Subfolder Overview (all databases), URL Overview (all databases) |
| Sn | Shop name. | Domain PLA Search Keywords |
| Sv | Number of unique product listing ads (PLA Copies). | Domain Overview (all databases), Subdomain Overview (all databases), Subfolder Overview (all databases), URL Overview (all databases) |
| Sr | Number of keywords where the domain ranks in SERP Features. | Competitors in Organic Search, Domain Organic Pages, Domain Organic Subdomains, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), Subfolder Organic Pages, URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Srb | Number of branded keywords where the domain ranks in SERP Features. | Domain Overview (all databases), Domain Overview (history), Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Srl | Keywords that the domain was previously ranking for in SERP Features, but isn't any longer. | Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Overview (all databases), Subfolder Overview (one database), Subfolder Overview (all databases), URL Overview (one database), URL Overview (all databases) |
| Srm | Changes in the number of keywords with SERP Feature positions. | Winners and Losers |
| Srn | New keywords that the domain is ranking for in SERP Features based on the chosen time period. | Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Overview (all databases), Subfolder Overview (one database), Subfolder Overview (all databases), URL Overview (one database), URL Overview (all databases) |
| St | Amount of estimated organic traffic driven to an analyzed domain from a SERP Feature position over a specific period of time. | Competitors in Organic Search, Domain Organic Pages, Domain Organic Subdomains, Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Winners and Losers, Semrush Rank, Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subdomain Organic Pages, Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), Subfolder Organic Pages, URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Stb | Amount of estimated organic traffic driven to an analyzed domain from a SERP Feature position on a branded keyword over a specific period of time. | Domain Overview (all databases), Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Overview (all databases), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), Subfolder Overview (all databases), URL Overview (one database), URL Overview (history), URL Overview (all databases) |
| Stm | Changes in the traffic driven by SERP Feature postions. | Winners and Losers |
| Tc | Percentage of the domain's total traffic cost that is attributed to a particular keyword. | Domain Organic Search Keywords, Domain Paid Search Keywords, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Tg | Amount of estimated organic traffic driven to an analyzed domain with a given keyword over a specific period of time. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain Organic Pages, Domain Organic Subdomains, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subdomain Organic Pages, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, Subfolder Organic Pages, URL organic search keywords, URL paid search keywords |
| Td | Interest of searchers in a particular keyword during the last 12 months. This metric is based on changes in the number of queries per month. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain vs. Domain, Keyword Overview (one database), Batch Keyword Overview (one database), Related Keywords, Broad Match Keyword, Phrase questions, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Tm | Changes in organic traffic. | Winners and Losers |
| Tr | Share of traffic driven to the website with a particular keyword for a specified period. | Domain Organic Search Keywords, Domain Paid Search Keywords, Domain Ad History, Domain Organic Pages, Domain Organic Subdomains, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subdomain Organic Pages, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, Subfolder Organic Pages, URL organic search keywords, URL paid search keywords |
| Ts | UNIX Timestamp. | Domain Organic Search Keywords, Domain Paid Search Keywords, Ads Copies, Domain PLA Search Keywords, PLA Copies, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, URL organic search keywords, URL paid search keywords |
| Tt | Ad title. | Domain Paid Search Keywords, Ads Copies, Domain Ad History, Domain PLA Search Keywords, PLA Copies, Keyword Ads History, Subdomain Paid Search Keywords, Subfolder Paid Search Keywords, URL paid search keywords |
| Um | Changes in organic traffic cost. | Winners and Losers |
| Un | Ad ID. | Domain Paid Search Keywords, Ads Copies, PLA Copies, Subdomain Paid Search Keywords, Subfolder Paid Search Keywords |
| Ur | URL of the target page. | Domain Organic Search Keywords, Domain Paid Search Keywords, Ads Copies, Domain Ad History, Domain PLA Search Keywords, PLA Copies, Domain Organic Pages, Domain Organic Subdomains, Organic Results, Paid Results, Keyword Ads History, Subdomain Organic Search Keywords, Subdomain Paid Search Keywords, Subdomain Organic Pages, Subfolder Organic Search Keywords, Subfolder Paid Search Keywords, Subfolder Organic Pages |
| Vu | Visible URL. | Domain Paid Search Keywords, Ads Copies, Domain Ad History, Paid Results, Keyword Ads History, Subdomain Paid Search Keywords, Subfolder Paid Search Keywords |
| Xn | Organic Position Distribution. Keywords bringing users to the website via Google's top 100 organic search results are grouped depending on the domain’s ranking for them. Columns with specified numbers should be separated with commas: X0,X1..X9,XA, where n is:      0: 1-3   1: 4-10   2: 11-20   3: 21-30   4: 31-40   5: 41-50   6: 51-60   7: 61-70   8: 71-80   9: 81-90   A: 91-100 | Domain Overview (one database), Domain Overview (history), Subdomain Overview (one database), Subdomain Overview (history), Subfolder Overview (one database), Subfolder Overview (history), URL Overview (one database), URL Overview (history) |
| anchor | Clickable backlink text. | Backlinks, Anchors |
| ascore | Authority Score is a Semrush proprietary metric used to measure the overall quality of the domain/URL and its influence on SEO. The score is based on the number of backlinks, referring domains, organic search traffic, and other data. | Backlinks overview, Competitors, Batch comparison |
| backlinks\_num | Number of backlinks to a given domain. | Referring domains, Referring IPs, TLD distribution, Referring domains by country, Anchors, Indexed pages, Competitors, Comparison by referring domains, Batch comparison, Historical data |
| category\_name | Name of the category. Categories may consist of one, two or three levels. Levels are divided by a slash (/). Example of one-level category: “/Business & Industrial”. Example of three-level category: “/Internet & Telecom/Web Services/Web Design & Development” | Categories profile, Categories |
| common\_refdomains | The number of referring domains that link back to both the analyzed and competing domains. | Competitors |
| country | Country that the referring domains are associated with. | Referring domains by country |
| date | Unix timestamp. Corresponds to the date that the data was collected. | Historical data (Backlinks) |
| domain | Domain name. | Referring domains, Comparison by referring domains |
| domain\_ascore | Domain Authority Score is our proprietary metric used to measure overall quality of domain and influence on SEO. The score is based on the number of backlinks, referring domains, organic search traffic, and other data. | Referring domains, Comparison by referring domains |
| domains\_num | Total number of domains, including common referring domains, linking to a given domain. | Backlinks overview, Referring IPs, TLD distribution, Referring domains by country, Anchors, Indexed pages, Competitors, Batch comparison, Historical data |
| external\_num | Number of the source page's links that point to pages of other websites. | Backlinks, Indexed pages |
| first\_seen | Timestamp on which Semrush first noticed a backlink. | Backlinks, Referring domains, Referring IPs, Anchors |
| follows\_num | Number of follow backlinks. | Backlinks overview, Batch comparison |
| form | Whether the link is from a form or not. Possible values: true, false. | Backlinks |
| forms\_num | Number of backlinks from forms. | Backlinks overview, Batch comparison |
| frame | Whether the link is from inside the <iframe scr> attribute or not. Possible values: true, false. | Backlinks |
| frames\_num | Number of backlinks from inside the <iframe scr> attribute. | Backlinks overview, Batch comparison |
| image | Whether the link is from an image or not. Possible values: true, false. | Backlinks |
| images\_num | Number of backlinks from images. | Backlinks overview, Batch comparison |
| image\_alt | Alt text of the backlink image. | Backlinks |
| image\_url | URL of the image backlink's location. | Backlinks |
| internal\_num | Number of the source page’s links that point to webpages of the same website. | Backlinks, Indexed pages |
| ipclassc\_num | Number of unique IP addresses of referring domains belonging to class C. Class C networks range from 192.0.0.0 through 223.255.255.0, with the network number contained in the first three octets. | Backlinks overview |
| ips\_num | Number of unique IP addresses hosting referring domains. | Backlinks overview, Batch comparison |
| last\_seen | Timestamp on which Semrush last noticed a backlink. | Backlinks, Referring domains, Referring IPs, Anchors, Indexed pages |
| lostlink | Whether the link is lost or not. Possible values: true, false. | Backlinks |
| matches\_num | Number of analyzed domains that have backlinks from the indicated domain. | Comparison by referring domains |
| neighbour | Domain with a similar backlink profile to the analyzed domain. | Competitors |
| newlink | Whether the link is new or not. Possible values: true, false. | Backlinks |
| nofollow | Whether the link is a nofollow link or not. Possible values: true, false. | Backlinks |
| nofollows\_num | Number of nofollow backlinks. | Backlinks overview, Batch comparison |
| page\_ascore | Page Authority Score is a proprietary Semrush metric used to measure the overall quality of the URL and its influence on SEO. The score is based on the number of backlinks, referring domains, organic search traffic, and other data. | Backlinks |
| rating | Level of confidence that this domain belongs to this category (ranged from 0 to 1). | Categories profile, Categories |
| redirect\_url | Last URL in a redirect chain. | Backlinks |
| response\_code | Server response code. | Backlinks, Indexed pages |
| score | Authority Score of queried domain on the historical date. | Historical data (Backlinks) |
| similarity | This metric is calculated based on the number of referring domains to each competitor and the total number of common referring domains to all competitors. If websites have a large number of common referring domains, they can be considered competitors. | Competitors |
| sitewide | Whether the link is a sitewide link or not. Possible values: true, false. | Backlinks |
| source\_title | Title of the source page. | Backlinks, Indexed pages |
| source\_size | Size of the source page in bytes. | Backlinks |
| source\_url | URL of the source page. | Backlinks, Indexed pages |
| sponsored\_num | Number of sponsored backlinks. | Backlinks overview |
| target\_title | Title of the target page. | Backlinks |
| target\_url | URL of the target page. | Backlinks |
| texts\_num | Number of text backlinks. | Backlinks overview, Batch comparison |
| total | Total number of backlinks leading to the analyzed domain/URL. | Backlinks overview |
| ugc\_num | Number of backlinks identified as User Generated Content (UGC). | Backlinks overview |
| urls\_num | Number of referring URLs. | Backlinks overview |
| zone | Domain TLD. | TLD distribution |

Show all

Regional database types:

- Desktop: Specified as a two-letter code.
- Mobile: Specified as a two-letter code with the `mobile-` prefix.
- Extended: Specified as a two-letter code with the `-ext` suffix.

> Mobile and extended databases aren't available for any requests in the Keyword reports.

| Code | Region | Research types | Google search domain |
| --- | --- | --- | --- |
| us | United States | Organic, Adwords, PLA, Keywords | google.com |
| uk | United Kingdom | Organic, Adwords, PLA, Keywords | google.co.uk |
| ca | Canada | Organic, Adwords, PLA, Keywords | google.ca |
| ru | Russia | Organic, Adwords, PLA, Keywords | google.ru |
| de | Germany | Organic, Adwords, PLA, Keywords | google.de |
| fr | France | Organic, Adwords, PLA, Keywords | google.fr |
| es | Spain | Organic, Adwords, PLA, Keywords | google.es |
| it | Italy | Organic, Adwords, PLA, Keywords | google.it |
| br | Brazil | Organic, Adwords, PLA, Keywords | google.com.br |
| au | Australia | Organic, Adwords, PLA, Keywords | google.com.au |
| ar | Argentina | Organic, Adwords, PLA, Keywords | google.com.ar |
| be | Belgium | Organic, Adwords, PLA, Keywords | google.be |
| ch | Switzerland | Organic, Adwords, PLA, Keywords | google.ch |
| dk | Denmark | Organic, Adwords, PLA, Keywords | google.dk |
| fi | Finland | Organic, Adwords, Keywords | google.fi |
| hk | Hong Kong | Organic, Adwords, PLA, Keywords | google.com.hk |
| ie | Ireland | Organic, Adwords, PLA, Keywords | google.ie |
| il | Israel | Organic, Adwords, Keywords | google.co.il |
| mx | Mexico | Organic, Adwords, PLA, Keywords | google.com.mx |
| nl | Netherlands | Organic, Adwords, PLA, Keywords | google.nl |
| no | Norway | Organic, Adwords, PLA, Keywords | google.no |
| pl | Poland | Organic, Adwords, PLA, Keywords | google.pl |
| se | Sweden | Organic, Adwords, PLA, Keywords | google.se |
| sg | Singapore | Organic, Adwords, PLA, Keywords | google.com.sg |
| tr | Turkey | Organic, Adwords, PLA, Keywords | google.com.tr |
| jp | Japan | Organic, Adwords, PLA, Keywords | google.co.jp |
| in | India | Organic, Adwords, PLA, Keywords | google.co.in |
| hu | Hungary | Organic, Adwords, Keywords | google.hu |
| af | Afghanistan | Organic, Adwords, Keywords | google.com.af |
| al | Albania | Organic, Adwords, Keywords | google.al |
| dz | Algeria | Organic, Adwords, Keywords | google.dz |
| ao | Angola | Organic, Adwords, Keywords | google.co.ao |
| am | Armenia | Organic, Adwords, Keywords | google.am |
| at | Austria | Organic, Adwords, PLA, Keywords | google.at |
| az | Azerbaijan | Organic, Adwords, Keywords | google.az |
| bh | Bahrain | Organic, Adwords, Keywords | google.com.bh |
| bd | Bangladesh | Organic, Adwords, Keywords | google.com.bd |
| by | Belarus | Organic, Adwords, Keywords | google.by |
| bz | Belize | Organic, Adwords, Keywords | google.com.bz |
| bo | Bolivia | Organic, Adwords, Keywords | google.com.bo |
| ba | Bosnia and Herzegovina | Organic, Adwords, Keywords | google.ba |
| bw | Botswana | Organic, Adwords, Keywords | google.co.bw |
| bn | Brunei | Organic, Adwords, Keywords | google.com.bn |
| bg | Bulgaria | Organic, Adwords, Keywords | google.bg |
| cv | Cabo Verde | Organic, Adwords, Keywords | google.cv |
| kh | Cambodia | Organic, Adwords, Keywords | google.com.kh |
| cm | Cameroon | Organic, Adwords, Keywords | google.cm |
| cl | Chile | Organic, Adwords, PLA, Keywords | google.cl |
| co | Colombia | Organic, Adwords, PLA, Keywords | google.com.co |
| cr | Costa Rica | Organic, Adwords, Keywords | google.co.cr |
| hr | Croatia | Organic, Adwords, Keywords | google.hr |
| cy | Cyprus | Organic, Adwords, Keywords | google.com.cy |
| cz | Czech Republic | Organic, Adwords, PLA, Keywords | google.cz |
| cd | Congo | Organic, Adwords, Keywords | google.cd |
| do | Dominican Republic | Organic, Adwords, Keywords | google.com.do |
| ec | Ecuador | Organic, Adwords, Keywords | google.com.ec |
| eg | Egypt | Organic, Adwords, Keywords | google.com.eg |
| sv | El Salvador | Organic, Adwords, Keywords | google.com.sv |
| ee | Estonia | Organic, Adwords, Keywords | google.ee |
| et | Ethiopia | Organic, Adwords, Keywords | google.com.et |
| ge | Georgia | Organic, Adwords, Keywords | google.ge |
| gh | Ghana | Organic, Adwords, Keywords | google.com.gh |
| gr | Greece | Organic, Adwords, Keywords | google.gr |
| gt | Guatemala | Organic, Adwords, Keywords | google.com.gt |
| gy | Guyana | Organic, Adwords, Keywords | google.gy |
| ht | Haiti | Organic, Adwords, Keywords | google.ht |
| hn | Honduras | Organic, Adwords, Keywords | google.hn |
| is | Iceland | Organic, Adwords, Keywords | google.is |
| id | Indonesia | Organic, Adwords, PLA, Keywords | google.co.id |
| jm | Jamaica | Organic, Adwords, Keywords | google.com.jm |
| jo | Jordan | Organic, Adwords, Keywords | google.jo |
| kz | Kazakhstan | Organic, Adwords, Keywords | google.kz |
| kw | Kuwait | Organic, Adwords, Keywords | google.com.kw |
| lv | Latvia | Organic, Adwords, Keywords | google.lv |
| lb | Lebanon | Organic, Adwords, Keywords | google.com.lb |
| lt | Lithuania | Organic, Adwords, Keywords | google.lt |
| lu | Luxembourg | Organic, Adwords, Keywords | google.lu |
| mg | Madagascar | Organic, Adwords, Keywords | google.mg |
| my | Malaysia | Organic, Adwords, PLA, Keywords | google.com.my |
| mt | Malta | Organic, Adwords, Keywords | google.com.mt |
| mu | Mauritius | Organic, Adwords, Keywords | google.mu |
| md | Moldova | Organic, Adwords, Keywords | google.md |
| mn | Mongolia | Organic, Adwords, Keywords | google.mn |
| me | Montenegro | Organic, Adwords, Keywords | google.me |
| ma | Morocco | Organic, Adwords, Keywords | google.co.ma |
| mz | Mozambique | Organic, Adwords, Keywords | google.co.mz |
| na | Namibia | Organic, Adwords, Keywords | google.com.na |
| np | Nepal | Organic, Adwords, Keywords | google.com.np |
| nz | New Zealand | Organic, Adwords, PLA, Keywords | google.co.nz |
| ni | Nicaragua | Organic, Adwords, Keywords | google.com.ni |
| ng | Nigeria | Organic, Adwords, Keywords | google.com.ng |
| om | Oman | Organic, Adwords, Keywords | google.com.om |
| py | Paraguay | Organic, Adwords, Keywords | google.com.py |
| pe | Peru | Organic, Adwords, Keywords | google.com.pe |
| ph | Philippines | Organic, Adwords, PLA, Keywords | google.com.ph |
| pt | Portugal | Organic, Adwords, PLA, Keywords | google.pt |
| ro | Romania | Organic, Adwords, Keywords | google.ro |
| sa | Saudi Arabia | Organic, Adwords, Keywords | google.com.sa |
| sn | Senegal | Organic, Adwords, Keywords | google.sn |
| rs | Serbia | Organic, Adwords, Keywords | google.rs |
| sk | Slovakia | Organic, Adwords, Keywords | google.sk |
| si | Slovenia | Organic, Adwords, Keywords | google.si |
| za | South Africa | Organic, Adwords, PLA, Keywords | google.co.za |
| kr | South Korea | Organic, Adwords, Keywords | google.co.kr |
| lk | Sri Lanka | Organic, Adwords, Keywords | google.lk |
| th | Thailand | Organic, Adwords, Keywords | google.co.th |
| bs | Bahamas | Organic, Adwords, Keywords | google.bs |
| tt | Trinidad and Tobago | Organic, Adwords, Keywords | google.tt |
| tn | Tunisia | Organic, Adwords, Keywords | google.tn |
| ua | Ukraine | Organic, Adwords, Keywords | google.com.ua |
| ae | United Arab Emirates | Organic, Adwords, PLA, Keywords | google.ae |
| uy | Uruguay | Organic, Adwords, Keywords | google.com.uy |
| ve | Venezuela | Organic, Adwords, Keywords | google.co.ve |
| vn | Vietnam | Organic, Adwords, Keywords | google.com.vn |
| zm | Zambia | Organic, Adwords, Keywords | google.co.zm |
| zw | Zimbabwe | Organic, Adwords, Keywords | google.co.zw |
| ly | Libya | Organic, Adwords, Keywords | google.com.ly |
| mobile-us | United States | Organic, Adwords | google.com |
| mobile-uk | United Kingdom | Organic, Adwords | google.com |
| mobile-ca | Canada | Organic, Adwords | google.ca |
| mobile-de | Germany | Organic, Adwords | google.de |
| mobile-fr | France | Organic, Adwords | google.fr |
| mobile-es | Spain | Organic, Adwords | google.es |
| mobile-it | Italy | Organic, Adwords | google.it |
| mobile-br | Brazil | Organic, Adwords | google.com.br |
| mobile-au | Australia | Organic, Adwords | google.com.au |
| mobile-dk | Denmark | Organic, Adwords | google.dk |
| mobile-mx | Mexico | Organic, Adwords | google.com.mx |
| mobile-nl | Netherlands | Organic, Adwords | google.nl |
| mobile-se | Sweden | Organic, Adwords | google.se |
| mobile-tr | Turkey | Organic, Adwords | google.com.tr |
| mobile-in | India | Organic, Adwords | google.co.in |
| mobile-id | Indonesia | Organic, Adwords | google.co.id |
| mobile-il | Israel | Organic, Adwords | google.co.il |
| il-ext | Israel Ext | Organic, Adwords | google.co.il-ext |
| tr-ext | Turkey Ext | Organic, Adwords, PLA | google.co.tr-ext |
| dk-ext | Denmark Ext | Organic, Adwords | google.dk-ext |
| no-ext | Norway Ext | Organic, Adwords | google.no-ext |
| se-ext | Sweden Ext | Organic, Adwords | google.se-ext |
| fi-ext | Finland Ext | Organic, Adwords | google.fi-ext |
| ch-ext | Switzerland Ext | Organic, Adwords, PLA | google.ch-ext |
| mobile-il-ext | Israel Ext | Organic, Adwords | google.co.il-ext |
| pa | Panama | Organic, Adwords, Keywords | google.com.pa |
| pk | Pakistan | Organic, Adwords, Keywords | google.com.pk |
| tw | Taiwan | Organic, Adwords, Keywords | google.com.tw |
| qa | Qatar | Organic, Adwords, Keywords | google.com.qa |

Show all

| Name | Description | Recommended action |
| --- | --- | --- |
| ERROR 40:: MANDATORY PARAMETER action NOT SET OR EMPTY | The required 'action' parameter is missing, or its value is not set. | Add the parameter to your request or set its value. |
| ERROR 41:: MANDATORY PARAMETER type NOT SET OR EMPTY | The required 'type' parameter is missing, or its value is not set. | Add the parameter to your request or set its value. |
| ERROR 42:: MANDATORY PARAMETER domain NOT SET OR EMPTY | The required 'domain' parameter is missing, or its value is not set. | Add the parameter to your request or set its value. |
| ERROR 43:: MANDATORY PARAMETER phrase NOT SET OR EMPTY | The required 'phrase' parameter is missing, or its value is not set. | Add the parameter to your request or set its value. |
| ERROR 44:: MANDATORY PARAMETER url NOT SET OR EMPTY | The required 'url' parameter is missing, or its value is not set. | Add the parameter to your request or set its value. |
| ERROR 46:: MANDATORY PARAMETER database NOT SET OR EMPTY | The required 'database' parameter is missing, or its value is not set. | Add the parameter to your request or set its value. |
| ERROR 48:: REQUEST METHOD NOT ALLOWED, USE GET | Invalid request method. | Use the HTTP GET method. |
| ERROR 50:: NOTHING FOUND | No information related to your request was found. | Double-check the request parameters. If they are correct but yield no results, contact the Semrush Support Team and provide them with your API request. |
| ERROR 110:: INVALID IMPORT KEY | The API key has an incorrect format. | Go to the Subscription info section to find the correct API key. |
| ERROR 120:: WRONG KEY - ID PAIR | You tried to use an unknown API key. | Go to the Subscription info section to find the correct API key. |
| ERROR 130:: API DISABLED | Your subscription doesn't let you use API. | Upgrade your subscription plan to get access to the API. |
| ERROR 131:: LIMIT EXCEEDED | The API request limit for the requested report has been reached. | Contact the Semrush Support Team. |
| ERROR 132:: API UNITS BALANCE IS ZERO | The API unit limit has been reached. | You have used all your API units. To continue using the API, recharge your balance or upgrade your subscription. |
| ERROR 133:: DB ACCESS DENIED | You are not allowed to access the requested database. | Contact the Semrush Sales Team to get access to more databases. |
| ERROR 134:: TOTAL LIMIT EXCEEDED | The total API request limit has been reached. | Contact the Semrush Support Team. |
| ERROR 135:: API REPORT TYPE DISABLED | 1\. The report you're trying to access is no longer available. 2. The subscription has ended. | 1\. Check if there's another report that suits your needs or contact the Semrush Support Team.   2\. Update your subscription or contact the Semrush Support Team. |
| ERROR 136:: Multiple limits not allowed | Internal limit error. | Contact the Semrush Support Team. |
| ERROR 402:: Request param not valid | The API key is incorrect. | Go to the Subscription info section to find the correct API key. |
| ERROR 402:: Request param not valid:: Duplicate domains | The 'targets' parameter contains duplicated values. | Remove the duplicated values from the 'targets' parameter. |
| ERROR 404:: Not found | Internal error. User information wasn't found in the Semrush database. | Contact the Semrush Support Team. |
| ERROR 500:: Internal Error | Internal error. | Try again later or contact the Semrush Support Team. |
| ERROR 10000:: Wrong parameter '{parameter}'. {description}. | Invalid parameter value. | Specify the value according to the description. |
| ERROR 10001:: Wrong parameter '{parameter}'. {description}. | The parameter is duplicated. | Remove the duplicated parameter from your request. |
| ERROR 10010:: Wrong parameter '{parameter}'. {description}. | The parameter value is out of range. | Specify the value according to the description. |
| ERROR 10011:: Wrong parameter '{parameter}'. {description}. | The parameter value is less than the minimum value. | Specify the value according to the description. |
| ERROR 10012:: Wrong parameter '{parameter}'. {description}. | The parameter value is greater than the maximum value. | Specify the value according to the description. |
| ERROR 10013:: Wrong parameter '{parameter}'. {description}. | The required parameter is not specified. | Specify the required parameter. |
| ERROR 10014:: Wrong parameter '{parameter}'. {description}. | The parameter has duplicated values. | Check the request and remove duplicate parameter values. |
| ERROR 10015:: Wrong parameter '{parameter}'. {description}. | The parameter can't be used with other request parameter values. | Specify the parameters or values according to the description. |
| ERROR 10030:: Wrong parameter '{parameter}'. {description}. | The parameter has too many values. | Check the request and reduce the number of values according to the description. |
| ERROR 10031:: Wrong parameter '{parameter}'. {description}. | The parameter doesn't have enough values. | Check the request and the missing values according to the description. |
| ERROR 10040:: Wrong parameter '{parameter}'. {description}. | The 'selected\_targets' parameter mustn't contain more domains than 'targets' with the segment equal to 'excludes'. | Ensure 'selected\_targets' aligns with the 'excludes' segment limit and adjust domains accordingly. |
| ERROR 10041:: Wrong parameter '{parameter}'. {description}. | Not all the 'selected\_targets' domains are specified in the 'targets' parameter. | In 'selected\_targets', specify only those domains that are indicated in the 'targets' parameter. |
| ERROR 10042:: Wrong parameter '{parameter}'. {description}. | Invalid parameter value. The value is not a domain. | Specify the domain. |
| ERROR 10043:: Wrong parameter '{parameter}'. {description}. | Invalid parameter value. | Specify the first day of the month. |
| ERROR 10044:: Wrong parameter '{parameter}'. {description}. | Invalid parameter value. | Specify the value according to the description. |
| ERROR 10045:: Wrong parameter '{parameter}'. {description}. | Invalid parameter value. | Specify the value according to the description. |

Show all

To apply filters to a report, add the **`display_filter`** parameter with a URL-encoded string that contains filters separated by **`|`** (**%7C**). Max. number of filters that can be applied at once is 25.

A single filter consists of `<sign>|<field>|<operation>|<value>`, where:

- **`<sign>`**: `+` (**%2B**) or `-` (**%2D**) to include or exclude the corresponding data.
- **`<field>`**: Possible fields are listed in the tables in the upcoming sections.
- **`<operation>`**: Possible operations are listed in the **Operations** section and depend on the field type.
- **`<value>`**: Possible values depend on the field.

> Some ready-to-use functions might encode the **+** sign incorrectly. Make sure that it's encoded as **%2B**.

### Example requests

Find organic keywords with the transactional intent (1st filter) for which the target domain ranks below 5th position (2nd filter) Copy code

https://api.semrush.com/?type=domain\_organic&key=YOUR\_API\_KEY&display\_limit=10&export\_columns=Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,In,Pp&domain=toyota.com&display\_sort=tr\_desc&database=us&display\_filter=%2B%7CIn%7CEq%7C3%7C%2B%7CPp%7CGt%7C5

### Metric fields

| Value | Description |
| --- | --- |
| Co | Competitive density of advertisers using the given term for their ads. One (1) indicates the highest competition. |
| Cp | Average price in USD that advertisers pay for a user's click on an ad containing a particular keyword (Google Ads). |
| Db | Regional database (US, UK, Italy, etc.). |
| Hs | Whether or not a report's line returns historical data. |
| Wc | Word Count. Allows to filter the results for keywords with certain number of terms in them. For example, "more than 3 words, but less than 5." |
| Nq | Average number of times users have searched for a given keyword per month. Semrush calculates this value over the last 12 months. |
| Nr | Total number of organic results returned for a given keyword on the last date of data gathering. |
| P0 | Position of the first queried domain for a particular keyword in Google's top 100 organic or paid search results. |
| P1 | Position of the second queried domain for a particular keyword in Google's top 100 organic or paid search results. |
| P2 | Position of the third queried domain for a particular keyword in Google's top 100 organic or paid search results. |
| P3 | Position of the fourth queried domain for a particular keyword in Google's top 100 organic or paid search results. |
| P4 | Position of the fifth queried domain for a particular keyword in Google's top 100 organic or paid search results. |
| Ph | Keyword bringing users to the website via Google's top 100 organic search results. You can enter multiple keywords by separating them with a comma. A comma is treated as an OR operator. Max. 300 characters. |
| Po | Position a URL is in for a particular keyword in Google's top 100 organic or paid search results. |
| Pp | Position of the Ad at the time of previous data gathering. |
| Pr | Price of promoted product. |
| Qu | Query. |
| Rt | Report type. |
| Tc | Percentage of the domain's total traffic cost that is attributed to a particular keyword. |
| Tr | Share of traffic driven to the website by a particular keyword for a specified period. |
| Ts | UNIX Timestamp. |
| Tt | Title of a product listing ad (PLA) that represents the name of a promoted product. |
| Ur | URL of the target page (Backlinks). |
| Vu | Visible URL. |
| In | Filter by keyword intent. Possible values: 0 (Commercial), 1 (Informational), 2 (Navigational), 3 (Transactional). |
| Ipu | Number of positions with unknown intent. |
| Ip0 | Number of positions with the Commercial intent. |
| Ip1 | Number of positions with the Informational intent. |
| Ip2 | Number of positions with the Navigational intent. |
| Ip3 | Number of positions with the Transactional intent. |

Show all

### Text fields

| Value | Description |  |
| --- | --- | --- |
| Ph | Keyword bringing users to the URL via Google's top 100 organic search results. |  |
| Qu | Query. |  |
| Rt | Report type. |  |
| Ur | URL displayed in search results for the given keyword. |  |
| Vu | Display URL. This is the URL displayed on the Ad, identifying the site for users. |  |
| title | Title of a text ad. |  |
| text | Text of a text ad. |  |
| ad | Concatenated title, text and visible URL of a text ad. |  |
| url | Visible URL, target URL, or domain name. |  |

Show all

### Fields with fixed values

| Value | Description |  |
| --- | --- | --- |
| Db | Regional database (US, UK, Italy, etc.). Possible values: 'us', 'uk', 'mobile-uk', 'ca', 'mobile-ca', 'ru', 'de', 'mobile-de', 'fr', 'mobile-fr', 'es', 'mobile-es', 'it', 'mobile-it', 'br', 'mobile-br', 'au', 'mobile-au', 'bing-us', 'ar', 'be', 'ch', 'dk', 'mobile-dk', 'fi', 'hk', 'ie', 'il', 'mobile-il', 'mx', 'mobile-mx', 'nl', 'mobile-nl', 'no', 'pl', 'se', 'mobile-se', 'sg', 'tr', 'mobile-tr', 'jp', 'in', 'mobile-in', 'hu', 'mobile-us'. |  |
| Hs | Whether or not a report's line returns historical data. Possible values: '0', '1'. |  |
| type | Backlink type. Possible values: 'nofollow', 'frame', 'form', 'image'. |  |
| zone | Backlink TLD zone. |  |
| Br | Branded keywords. Possible values:'0', '1', '3'.   '0': Not Branded   '1': Branded for other domain   '3': Branded |  |

Show all

### Operations

`<operation>` can be set depending on the field type.

#### For metric fields

| Value | Description |  |
| --- | --- | --- |
| Eq | Equals |  |
| Gt | Greater than |  |
| Lt | Less than |  |

#### For text fields

| Value | Description |  |
| --- | --- | --- |
| Bw | Starts with |  |
| Ew | Ends with |  |
| Eq | Exactly matching |  |
| Co | Containing |  |
| Wm | Word matching |  |

Show all

#### For fields with fixed values

Leave the field blank.

The table provides a list of supported SERP features with their codes and descriptions and indicates whether a particular SERP feature includes a direct link to the target domain.

| Code | Name | Linking to domain | Description |
| --- | --- | --- | --- |
| 0 | Instant answer | No | A direct answer to a user's search query that is usually displayed at the top of organic search results in the form of a gray-bordered box. |
| 1 | Knowledge panel | Yes | A block with brief information related to a searched topic that appears to the right of organic search results. |
| 2 | Carousel | No | A row of horizontally scrollable images displayed at the top of search results. |
| 3 | Local pack | Yes | A map with three local results that appears at the top of organic search results for a local search query. |
| 4 | Top stories | Yes | A card-style snippet presenting up to three news-related results relevant to user's search query, which is usually displayed between organic search results. |
| 5 | Image pack | Yes | A collection of images related to a search query that is usually displayed between organic search results. |
| 6 | Sitelinks | Yes | A set of links to other pages of a website that is displayed under the main organic search result and for brand-related search queries. |
| 7 | Reviews | Yes | Organic search results marked with star ratings and including the number of reviews the star rating is based on. |
| 8 | Tweet | No | A card-style snippet displaying the most recent tweets related to a search query. |
| 9 | Video | Yes | Video results with a thumbnail displayed along with other organic search results. |
| 10 | Featured video | Yes | A video result to a search query that is displayed at the top of all organic search results. |
| 11 | Featured Snippet | Yes | A short answer to a user's search query with a link to the third-party website it is taken from that appears at the top of all organic search results. |
| 12 | AMP | No | Pages that are more mobile-friendly. Google doesn't distinguish them from other search results. |
| 13 | Image | Yes | An image result with a thumbnail displayed along with other organic search results. |
| 14 | Ads top | No | A series of ads that appear at the top of the first search results page. |
| 15 | Ads bottom | No | A series of ads that appear at the bottom of the first search results page. |
| 16 | Shopping ads | No | A row of horizontally scrollable paid shopping results that appear at the top of a search results page for a brand or product search query, and include the website's name, pricing, and product image. |
| 17 | Hotels Pack | No | A block that displays hotels related to a search query. Hotel results include information on prices and rating, and allows users to check availability for certain dates. |
| 18 | Jobs search | No | A number of job listings related to a search query that appear at the top of the search results page. Job listings include the job title, the company offering the job, a site where the listing was posted, etc. |
| 19 | Featured images | No | A collection of images is usually displayed at the top of the SERP if Google considers visual results to be more relevant than text results. Only for mobile devices. |
| 20 | Video Carousel | Yes | A row of horizontally scrollable videos displayed among search results. |
| 21 | People also ask | Yes | A series of questions that may relate to a search query that appears in an expandable grid box labeled "People also ask" between search results. |
| 22 | FAQ | Yes | A list of questions related to a particular search that shows up for a particular organic search result. When clicked on, each of the questions reveals the answer. |
| 23 | Flights | No | A block that displays flights related to a search query. Flight results include information on flight dates, duration, the number of transfers and prices. Data is taken from Google Flights. |
| 24 | Find results on | Yes | A block of domains displayed above a map. |
| 25 | Recipes | Yes | A block of recipes displayed at the top of the search results page. |
| 26 | Related Topics | No | A block that contains a list of topics related to the search query. |
| 27 | Twitter сarousel | Yes | A carousel of tweets displayed among organic search results. |
| 28 | Indented | Yes | A list of related pages from the highest organic search result. |
| 29 | News | Yes | A list of trending news displayed among organic search results. |
| 30 | Address Pack | No | A map with the most popular places displayed at the top of the search results page. |
| 31 | Application | Yes | An app from the App Store or Play Store displayed among organic search results. Only on mobile devices. |
| 32 | Events | No | A list of relevant events displayed at the top of organic search results. |
| 34 | Popular products | No | A carousel of reviewed products available for purchasing. |
| 35 | Related products | No | A carousel of related products available for purchasing. |
| 36 | Related searches | No | A list of related searches displayed among organic search results. |
| 37 | See results about | No | A list of more precise queries displayed on the right of the search results page. |
| 38 | Short videos | Yes | A block of vertical videos. Only on mobile devices. |
| 39 | Web stories | Yes | A block of vertical stories. Only on mobile devices. |
| 40 | Application list | Yes | A list of apps displayed among organic   search results. Only on mobile devices. |
| 41 | Buying guide | Yes | A block of questions about the product's features. |
| 42 | Organic carousel | Yes | A carousel with organic results at the top of the SERP. |
| 43 | Things to know | Yes | A block of the most common related questions. |
| 44 | Datasets | Yes | A list of scientific datasets. |
| 45 | Discussions and forums | Yes | A block of related discussions. |
| 46 | Explore brands | Yes | A list of related brands. |
| 47 | Questions and answers | Yes | A carousel of related questions and answers. |
| 48 | Popular stores | Yes | A list of popular related stores. |
| 49 | Refine | No | A block of related search queries with clarifying keywords. |
| 50 | People also search | No | A carousel of competitor brands and companies at the bottom of the SERP. |
| 51 | Ads middle | No | A series of ads that appear in the middle of the first search results page. |
| 52 | AI overview | Yes | An answer generated by AI. |

Show all

The SERP features codes can be included in the `FKn` and `FPn` columns (as listed in [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) table) when making requests to retrieve data on keyword-specific SERP features and their positions. These columns are used with the `export_columns` parameter; however, not all requests accept `FKn` and `FPn` as part of `export_columns`.

### Example request

Retrieve ranking data for the domain, including keyword-specific SERP feature insights Copy code

https://api.semrush.com/?key=API\_KEY&type=domain\_ranks&export\_columns=Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,Sh,Sv,FK1,FP1&domain=apple.com&database=us

This example retrieves [SERP feature data for your domain](https://developer.semrush.com/api/v3/analytics/overview-reports/#domain-overview-all-databases/), where `FP1` shows the count of times the domain ranks within a specific SERP feature (in this case, 1 is for Knowledge panel), and `FK1` shows the total occurrences of this feature for keywords the domain ranks for, whether or not the domain appears in it.

You can sort the response results by different parameters in ascending or descending order.

To set the sorting in an Analytics report request, include the `display_sort` parameter with the target sorting rule. You can set only one sorting rule per request.

For example, you can sort keywords by traffic share in descending order in the [Domain Organic Search Keywords](https://developer.semrush.com/api/v3/analytics/domain-reports/#domain-organic-search-keywords/) request:

Set the display\_sort request parameter to tr\_desc Copy code

https://api.semrush.com/?type=domain\_organic&key=YOUR\_API\_KEY&display\_filter=%2B%7CPh%7CCo%7Cseo&display\_limit=10&export\_columns=Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td&domain=seobook.com&display\_sort=tr\_desc&database=us

| Name | Description |
| --- | --- |
| am\_asc | Sorting by changes in paid keywords in ascending order (Am) |
| am\_desc | Sorting by changes in paid keywords in descending order (Am) |
| bm\_asc | Sorting by changes in paid traffic in ascending order (Bm) |
| bm\_desc | Sorting by changes in paid traffic in descending order (Bm) |
| cg\_asc | Sorting by traffic cost in ascending order (Cg) |
| cg\_desc | Sorting by traffic cost in descending order (Cg) |
| cm\_asc | Sorting by changes in ads traffic price in ascending order (Cm) |
| cm\_desc | Sorting by changes in ads traffic price in descending order (Cm) |
| co\_asc | Sorting by competition in ascending order (Co) |
| co\_desc | Sorting by competition in descending order (Co) |
| cp\_asc | Sorting by CPC in ascending order (Cp) |
| cp\_desc | Sorting by CPC in descending order (Cp) |
| cr\_asc | Sorting by competition level in ascending order (Cr) |
| cr\_desc | Sorting by competition level in descending order (Cr) |
| cv\_asc | Sorting by coverage in ascending order (Cv) |
| cv\_desc | Sorting by coverage in descending order (Cv) |
| dt\_asc | Sorting by the date of the last update in ascending order (Ts) |
| dt\_desc | Sorting by the date of the last update in descending order (Ts) |
| kd\_asc | Sorting by keyword difficulty in ascending order (Kd) |
| kd\_desc | Sorting by keyword difficulty in descending order (Kd) |
| np\_asc | Sorting by common keywords in ascending order (Np) |
| np\_desc | Sorting by common keywords in descending order (Np) |
| nq\_asc | Sorting by volume in ascending order (Nq) |
| nq\_desc | Sorting by volume in descending order (Nq) |
| nr\_asc | Sorting by the number of results in ascending order (Nr) |
| nr\_desc | Sorting by the number of results in descending order (Nr) |
| om\_asc | Sorting by changes in organic keywords in ascending order (Om) |
| om\_desc | Sorting by changes in organic keywords in descending order (Om) |
| p0\_asc | Sorting by a position of the 1st domain in ascending order (P0) |
| p0\_desc | Sorting by a position of the 1st domain in descending order (P0) |
| p1\_asc | Sorting by a position of the 2nd domain in ascending order (P1) |
| p1\_desc | Sorting by a position of the 2nd domain in descending order (P1) |
| p2\_asc | Sorting by a position of the 3rd domain in ascending order (P2) |
| p2\_desc | Sorting by a position of the 3rd domain in descending order (P2) |
| p3\_asc | Sorting by a position of the 4th domain in ascending order (P3) |
| p3\_desc | Sorting by a position of the 4th domain in descending order (P3) |
| p4\_asc | Sorting by a position of the 5th domain in ascending order (P4) |
| p4\_desc | Sorting by a position of the 5th domain in descending order (P4) |
| pc\_asc | Sorting by number of keywords in ascending order (Pc) |
| pc\_desc | Sorting by number of keywords in descending order (Pc) |
| po\_asc | Sorting by a position in ascending order (Po) |
| po\_desc | Sorting by a position in descending order (Po) |
| pr\_asc | Sorting by price in ascending order (Pr) |
| pr\_desc | Sorting by price in descending order (Pr) |
| scm\_asc | Sorting by changes in the organic traffic cost driven by SERP Feature positions in ascending order (Scm) |
| scm\_desc | Sorting by changes in the organic traffic cost driven by SERP Feature positions in descending order (Scm) |
| srm\_asc | Sorting by changes in the number of keywords with SERP Feature positions in ascending order (Srm) |
| srm\_desc | Sorting by changes in the number of keywords with SERP Feature positions in descending order (Srm) |
| stm\_asc | Sorting by changes in the traffic driven by SERP Feature postions in ascending order (Stm) |
| stm\_desc | Sorting by changes in the traffic driven by SERP Feature postions in descending order (Stm) |
| tc\_asc | Sorting by traffic cost share in ascending order (Tc) |
| tc\_desc | Sorting by traffic cost share in descending order (Tc) |
| tg\_asc | Sorting by traffic in ascending order (Tg) |
| tg\_desc | Sorting by traffic in descending order (Tg) |
| tm\_asc | Sorting by changes in organic traffic in ascending order (Tm) |
| tm\_desc | Sorting by changes in organic traffic in descending order (Tm) |
| tr\_asc | Sorting by traffic share in ascending order (Tr) |
| tr\_desc | Sorting by traffic share in descending order (Tr) |
| ts\_asc | Sorting by timestamp in descending order (Ts) |
| ts\_desc | Sorting by timestamp in descending order (Ts) |
| um\_asc | Sorting by changes in organic traffic price in ascending order (Um) |
| um\_desc | Sorting by changes in organic traffic price in descending order (Um) |
| last\_seen\_asc | Sorting by the last-seen date in ascending order (last\_seen) |
| last\_seen\_desc | Sorting by the last-seen date in descending order (last\_seen) |
| first\_seen\_asc | Sorting by the first-seen date in ascending order (first\_seen) |
| first\_seen\_desc | Sorting by the first-seen date in descending order (first\_seen) |
| times\_seen\_asc | Sorting by the number of times seen in ascending order (times\_seen) |
| times\_seen\_desc | Sorting by the number of times seen in descending order (times\_seen) |
| ads\_count\_asc | Sorting by the number of display ads in ascending order (ads\_count) |
| ads\_count\_desc | Sorting by the number of display ads in descending order (ads\_count) |

Show all

Most analytic reports let you download [historical data](https://www.semrush.com/kb/64-historical-data).

Historical data costs more than regular data requests. For example, in the [Domain Overview (all databases)](https://developer.semrush.com/api/v3/analytics/overview-reports/#domain-overview-all-databases/) report, the historical data cost 50 API units per line while the current data is 10 API units per line.

To check the historical data price, click the icon next to the regular request price:

![](https://storage.googleapis.com/ui-kit-flags/images/Screenshot_2025-03-17_at_12.52.00.original.png?Expires=1744706703&GoogleAccessId=papyrus-semrush-developer%40semrush-developer-prod-tf.iam.gserviceaccount.com&Signature=YRKmoY9vLzA55jColrI%2B2UpKybGZ7upSRB0palj83hwXZWmuf%2BtVCjfFXwMe%2FC9SHGjF0QKpOooTTC3krlbFePd5o7UoVNK1GyutdF4Jx%2FzXpwQGm5o6kqMtwVsHOaO4q6OQAyWckeav2r44%2BHpkLcb4ya37SdiYiCOH2meV3TIgQfY9h83%2FR%2BsmnO0XUgnhoLE8s5X8Zl54kSaDpOxp1dEvZtEhrHKvHuAt1I%2F6ExM7rKy6PoVEbvqlIOcWsNT7Em9GwZ%2FQhmmzMyBF8%2FAjFkvzZoRN7E%2B2RdeQen2Ap32yumdEiwHsOPKfeKYAgyg6JXxKPr%2F9FQfzT%2BlhNRc5fg%3D%3D)

Some reports, like [Domain Overview (history)](https://developer.semrush.com/api/v3/analytics/overview-reports/#domain-overview-history/), provide only historical data. For these reports, the displayed request price already applies to historical data.

Was this page helpful?

**Example**
```python
import requests

# Define your API key
API_KEY = 'YOUR_API_KEY'

# Define the request parameters
params = {
    'type': 'domain_organic',
    'key': API_KEY,
    'domain': 'seobook.com',
    'database': 'us',
    'export_columns': 'Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td',
    'display_limit': 10,
    'display_sort': 'tr_desc',
    'display_filter': '%2B%7CPh%7CCo%7Cseo'  # filter: include keywords containing 'seo'
}

# Make the GET request
response = requests.get('https://api.semrush.com/', params=params)

# Check response status
if response.status_code == 200:
    # Print response text (CSV data)
    print(response.text)
else:
    print(f'Error: {response.status_code}')
```

This example requests the top 10 organic keywords for the domain 'seobook.com' from the US database, sorted by traffic share in descending order, filtering for keywords containing 'seo'. The response is in CSV format.
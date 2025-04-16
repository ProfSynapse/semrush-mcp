---
title: "Semrush Developers"
description:
clipdate: 2025-04-14
source: "https://developer.semrush.com/api/v3/analytics/backlinks/"
published:
tags:
  - "backlinks"
  - "api"
  - "semrush"
  - "backlinkAnalysis"
  - "seoTools"
  - "referringDomains"
  - "backlinksOverview"
  - "backlinksReport"
  - "referringIPs"
  - "tldDistribution"
  - "keywords"
  - "competitors"
  - "anchorTexts"
  - "indexedPages"
  - "historicalData"
  - "apiUsage"
  - "apiRequest"
  - "responseFormat"
  - "apiSorting"
  - "pagination"
  - "apiFiltering"
---
> [!summary]- Summary
> - The documentation covers the Backlinks API available in Semrush Analytics.
> - It includes various reports: Backlinks Overview, Backlinks, Referring Domains, Referring IPs, TLD Distribution, Referring Domains by Country, Anchors, Indexed Pages, Competitors, Comparison by Referring Domains, Batch Comparison, Authority Score Profile, Categories Profile, Categories, and Historical Data.
> - Each report has specific required parameters such as `type`, `key` (API Key), `target` (domain or URL), `target_type` (root_domain, domain, url), and `export_columns` (comma-separated columns to return).
> - API endpoints are accessed via GET requests to `https://api.semrush.com/analytics/v1/`.
> - Pricing is based on API units per request or per line depending on the report.
> - Sorting, limiting, offsetting, and filtering options are available for many reports.
> - Response examples are provided in semicolon-separated values format.
> - The API key is required and is available after subscription.
> - Backlink reports help analyze backlinks, referring domains, competitors, anchor texts, and backlink profiles over time.
> - The documentation also includes request examples and response examples for each report type.
> - Useful for SEO, competitive analysis, and backlink monitoring.

Price: **40 API units per request**

This report provides a summary of backlinks, including their type, referring domains, and IP addresses for a domain, root domain, or URL.

[About the Backlink Analytics Overview report ›](https://www.semrush.com/kb/500-backlinks-overview-report)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_overview | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |
| export\_columns \* |  | Required columns must be separated by commas. |

\* Fields marked by an asterisk (\*) are required

Price: **40 API units per line**

This report lists backlinks for a domain, root domain, or URL.

[About the Backlinks report ›](https://www.semrush.com/kb/501-backlinks-report-manual)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks | Report type. |
| key \* | API\_KEY | Identification key assigned to each user after subscribing to Semrush. You'll find it in [**Subscription info** > **API units**](https://www.semrush.com/accounts/subscription-info/api-units/). |
| target \* |  | Root domain, domain, or URL. |
| target\_type \* | root\_domain, domain, or url | Type of requested target. |
| export\_columns |  | This parameter lets you get only the columns with the data you need. Specify the required columns separating them by a comma. If this parameter isn't specified, all columns are shown by default. |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results—in either ascending or descending order.   Default: page\_ascore\_desc |
| display\_limit | integer | Number of results to return. If this parameter isn't specified or equals `0`, 10,000 lines are returned by default.  The available range is between `0` and `1000000`. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |
| display\_filter |  | Filters for columns.   Note that you can't currently use the `urlanchor` filter for domains with a large backlink profile. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example (top 5 new follow links) Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks&target=searchenginejournal.com&target_type=root_domain&export_columns=page_ascore,source_title,source_url,target_url,anchor,external_num,internal_num,first_seen,last_seen&display_limit=5&display_filter=%2B%7Ctype%7C%7Cnewlink%7C%2B%7Ctype%7C%7Cfollow
```

Response example (top 5 new follow links) Copy code

```
page_ascore;source_title;source_url;target_url;anchor;external_num;internal_num;first_seen;last_seen
80;JDN : E-business, FinTech, Big Data, IoT, tendances média, décideurs...;https://www.journaldunet.com/;https://www.searchenginejournal.com/duckduckgo-is-now-a-default-search-engine-option-on-android-in-the-eu/343073/#close;A partir de mars 2020 DuckDuckGo fera partie des moteurs de recherche proposés par défaut sur Android;137;177;1578929242;1578990011
76;cnBeta.COM - 中文业界资讯站;https://www.cnbeta.com/;https://www.searchenginejournal.com/duckduckgo-is-now-a-default-search-engine-option-on-android-in-the-eu/343073/#close;将成为欧盟 Android 设备的默认搜索引擎选项;68;558;1578902621;1578928080
71;Podcast Alley - Your Place for Podcasting News & Featured Podcasts;https://www.podcastalley.com/;https://www.searchenginejournal.com/bing-pages-this-marketing-oclock-podcast/342897/;Introducing Bing Pages & This Week’s Digital Marketing News [PODCAST] - Search Engine Journal;94;10;1578913376;1578917297
71;Podcast Alley - Your Place for Podcasting News & Featured Podcasts;https://www.podcastalley.com/;https://www.searchenginejournal.com/b2b-paid-advertising-greg-finn-podcast/342657/;B2B Paid Advertising in 2020 with Greg Finn [PODCAST] - Search Engine Journal;94;10;1578576343;1578582160
71;Podcast Alley - Your Place for Podcasting News & Featured Podcasts;https://www.podcastalley.com/;https://www.searchenginejournal.com/google-ads-message-extensions-marketing-oclock-podcast/341909/;Goodbye, Google Ads’ Message Extensions & More News [PODCAST] - Search Engine Journal;94;10;1578300986;1578312791
```

Price: **40 API units per line**

This report lists domains pointing to the queried domain, root domain, or URL.

[About the Referring Domains report ›](https://www.semrush.com/kb/503-backlinks-referring-domains-report-manual)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_refdomains | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |
| export\_columns \* |  | Required columns must be separated by commas. |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results in ascending or descending order.   Default: `backlinks_num_desc`. |
| display\_limit | integer | The number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |
| display\_filter |  | Filters for columns. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example (top 5 referring domains) Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_refdomains&target=searchenginejournal.com&target_type=root_domain&export_columns=domain_ascore,domain,backlinks_num,ip,country,first_seen,last_seen&display_limit=5
```

Response example (top 5 referring domains) Copy code

```
domain_ascore;domain;backlinks_num;ip;country;first_seen;last_seen
86;libsyn.com;1850868;204.16.246.222;us;1495338484;1580410670
38;customerguru.in;503992;37.60.254.149;us;1532739198;1578767338
58;obs.co.kr;386005;59.25.202.101;kr;1565621989;1580411659
22;recip-links.com;354282;52.95.147.26;ca;1524707034;1580411673
38;goldenarticles.net;348079;89.190.202.12;bg;1544015188;1580411732
```

Price: **40 API units per line**

This report lists IP addresses where backlinks to a domain, root domain, or URL are coming from.

[About the Referring IPs report ›](https://www.semrush.com/kb/503-backlinks-referring-domains-report-manual#referring-ips)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_refips | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |
| export\_columns \* |  | Required columns must be separated by commas. |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results in ascending or descending order.   Default: `domains_num_desc`. |
| display\_limit | integer | The number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_refips&target=searchenginejournal.com&target_type=root_domain&export_columns=ip,country,domains_num,backlinks_num,first_seen,last_seen&display_limit=5
```

Response example Copy code

```
ip;country;domains_num;backlinks_num;first_seen;last_seen
78.69.18.135;se;664;1195;1371696859;1580409277
192.0.78.12;us;357;3675;1534413883;1580408412
192.0.78.13;us;356;4012;1533338180;1580408397
172.217.15.65;us;306;617;1473348232;1580411014
172.217.164.161;us;300;581;1473018187;1580396737
```

Price: **40 API units per line**

This report shows the referring domain distribution depending on the top-level domain (TLD) type.

[About the Referring Domains report ›](https://www.semrush.com/kb/503-backlinks-referring-domains-report-manual)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_tld | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |
| export\_columns \* | zone, domains\_num, backlinks\_num | Required columns must be separated by commas. |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results in ascending or descending order.   Default: `domains_num_desc`. |
| display\_limit | integer | The number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_tld&target=searchenginejournal.com&target_type=root_domain&export_columns=zone,domains_num,backlinks_num&display_limit=5
```

Response example Copy code

```
zone;domains_num;backlinks_num
com;27755;11645051
net;1894;1684571
org;1486;800180
uk;1267;22572
au;645;9531
```

Price: **40 API units per line**

This report shows the referring domain distribution by country. The IP address of a domain is used to define a country.

[About the Referring Domains report ›](https://www.semrush.com/kb/503-backlinks-referring-domains-report-manual)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_geo | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |
| export\_columns \* | country, domains\_num, backlinks\_num | Required columns must be separated by commas. |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results in ascending or descending order.   Default: `domains_num_desc`. |
| display\_limit | integer | The number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_geo&target=searchenginejournal.com&target_type=root_domain&export_columns=country,domains_num,backlinks_num&display_limit=5
```

Response example Copy code

```
country;domains_num;backlinks_num
United States;36489;5463278
Germany;2594;149154
United Kingdom;1750;102385
France;917;99323
Canada;791;695950
```

Price: **40 API units per line**

This report lists anchor texts used in backlinks leading to the queried domain, root domain, or URL. It also includes the number of backlinks and referring domains per anchor.

[About the Anchors report ›](https://www.semrush.com/kb/502-backlinks-anchors-report-manual)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_anchors | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |
| export\_columns \* |  | Required columns must be separated by commas. |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results in ascending or descending order.   Default: `backlinks_num_desc`. |
| display\_limit | integer | The number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_anchors&target=searchenginejournal.com&target_type=root_domain&export_columns=anchor,domains_num,backlinks_num,first_seen,last_seen&display_limit=5
```

Response example Copy code

```
anchor;domains_num;backlinks_num;first_seen;last_seen
search engine journal;8113;691263;1370650463;1580411804
93% of people;3;354284;1524707034;1580411673
the growth of social media v2.0 | search engine journal;1;251996;1532739198;1578767338
more;57;153884;1452198531;1580411620
read more >;2;114350;1545826610;1580411612
```

Price: **40 API units per line**

This report shows indexed pages of the queried domain.

[About the Indexed Pages report ›](https://www.semrush.com/kb/505-backlinks-indexed-pages-report)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_pages | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |
| export\_columns \* |  | Required columns must be separated by commas. |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results in ascending or descending order.   Default: `backlinks_num_desc`. |
| display\_limit | integer | The number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_pages&target=searchenginejournal.com&target_type=root_domain&export_columns=source_url,source_title,response_code,backlinks_num,domains_num,last_seen,external_num,internal_num&display_sort=domains_num_desc&display_limit=5
```

Response example Copy code

```
source_url;source_title;response_code;backlinks_num;domains_num;last_seen;external_num;internal_num
https://www.searchenginejournal.com/;Search Engine Journal - SEO, Search Marketing News and Tutorials;200;129873;3602;1580113263;16;405
http://www.searchenginejournal.com/;;301;213841;3543;1580400186;0;0
https://www.searchenginejournal.com/seo-101/seo-statistics/;60+ Mind-Blowing Search Engine Optimization Stats - SEO 101;200;11746;1675;1580367611;88;156
https://www.searchenginejournal.com/24-eye-popping-seo-statistics/42665/;;301;3127;822;1579709305;0;0
https://www.searchenginejournal.com/seo-guide/;A Complete Guide to SEO | Search Engine Journal;200;12856;743;1580411596;19;130
```

Price: **40 API units per line**

This report lists domains that share a similar backlink profile with the analyzed domain.

[About the Competitors report ›](https://www.semrush.com/kb/750-competitors)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_competitors | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |
| export\_columns \* |  | Required columns must be separated by commas. |
| display\_limit | integer | The number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_competitors&target=searchenginejournal.com&target_type=root_domain&export_columns=ascore,neighbour,similarity,common_refdomains,domains_num,backlinks_num&display_limit=5
```

Response example Copy code

```
ascore;neighbour;similarity;common_refdomains;domains_num;backlinks_num
80;searchengineland.com;36;17584;79939;42840590
74;searchenginewatch.com;34;11537;47115;35855777
68;wordstream.com;32;9575;37065;1750926
77;moz.com;31;15732;103754;21136846
76;marketingland.com;30;9058;39986;9756098
```

Price: **40 API units per line**

This report shows how many backlinks are sent to you and your competitors from the same referring domains.

[About the Referring Domains report ›](https://www.semrush.com/kb/503-backlinks-referring-domains-report-manual)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_matrix | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| targets\[\] \* |  | An array of items, where an item is a root domain, domain, or URL. |
| target\_types\[\] \* |  | An array of items, where an item is a type of requested target specified in the `targets[]` parameter. |
| export\_columns \* |  | Required columns must be separated by commas. |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results in ascending or descending order. |
| display\_limit | integer | The number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |
| display\_filter |  | Filters for columns. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example (domains that don't link to searchenginejournal.com) Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_matrix&targets[]=searchenginejournal.com&targets[]=searchengineland.com&target_types[]=root_domain&target_types[]=root_domain&export_columns=domain,domain_ascore,matches_num,backlinks_num&display_limit=5&display_filter=%2B%7Cbacklinksnum_0%7CEq%7C0
```

Price: **40 API units per line**

Compare your backlink profile and link-building progress with those of your competitors.

[About the Bulk Backlink Analysis report ›](https://www.semrush.com/kb/884-bulk-backlink-analysis-2)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_comparison | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| targets\[\] \* |  | An array of items, where an item is a root domain, subdomain, or URL.   The limit is 200 targets. |
| target\_types\[\] \* |  | An array of items, where an item is a type of requested target specified in the `targets[]` parameter. |
| export\_columns \* |  | Required columns must be separated by commas. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_comparison&targets[]=ebay.com&targets[]=amazon.com&target_types[]=root_domain&target_types[]=root_domain&export_columns=target,target_type,ascore,backlinks_num,domains_num,ips_num,follows_num,nofollows_num,texts_num,images_num,forms_num,frames_num
```

Response example Copy code

```
target;target_type;ascore;backlinks_num;domains_num;ips_num;follows_num;nofollows_num;texts_num;images_num;forms_num;frames_num
ebay.com;root_domain;94;15248332274;461273;321889;6863043986;8385235217;11753970129;3487503037;6183483;675625
amazon.com;root_domain;94;6258027263;2679680;1012020;3901022285;2355705949;4522715595;1637657601;14954399;82699668
```

Price: **100 API units per request**

This report returns the distribution of referring domains by Authority Score.

When you run a query for a domain, in return, for each Authority Score value from 0 to 100, you receive a number of domains with at least one link pointing to the queried domain.

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_ascore\_profile | The report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| target \* |  | A root domain, domain, or URL address. |
| target\_type \* | root\_domain, domain or url | A type of requested target. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_ascore_profile&target=searchenginejournal.com&target_type=root_domain
```

Response example Copy code

```
ascore;domains_num
0;941
1;60
2;114
3;227
4;433
5;810
...
95;2
96;0
97;1
98;1
99;0
100;0
```

Price: **40 API units per line**

This report returns a list of categories that the referring domains of the queried domain belong to.

When you run a query for a domain, in each line, you get a category and the number of domains in that category with at least one link pointing to the queried domain. The results are sorted by the number of referring domains in descending order. This report is generated based on the first 10,000 referring domains for the queried domain.

[About the Referring Domains report ›](https://www.semrush.com/kb/503-backlinks-referring-domains-report-manual)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_categories\_profile | Report type. |
| key \* | API\_KEY | Identification key assigned to each user after subscribing to Semrush. You'll find it in [**Subscription info** > **API units**](https://www.semrush.com/accounts/subscription-info/api-units/). |
| target \* |  | Root domain, domain, or URL. |
| target\_type \* | root\_domain, domain or url | Type of requested target. |
| export\_columns \* | category\_name, rating | This parameter lets you get only the columns with the data you need. Specify the required columns separating them by a comma. If this parameter isn't specified, all columns are shown by default.  Note that `rating` as the parameter name doesn't correspond to the data returned. The data reflects the number of domains in the category that have backlinks to the queried domain. |
| display\_limit | integer | Number of results returned to a request. If this parameter isn't specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter lets you skip a specified number of results before sending a report.  Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_categories_profile&target=searchenginejournal.com&target_type=root_domain&export_columns=category_name,rating&display_limit=5
```

Response example Copy code

```
category_name;rating
/Business & Industrial/Advertising & Marketing/Marketing;2188
/Internet & Telecom/Web Services/Search Engine Optimization & Marketing;1975
/Business & Industrial/Advertising & Marketing/Brand Management;1725
/Business & Industrial/Advertising & Marketing/Sales;1116
/Internet & Telecom/Web Services/Web Design & Development;1001
```

Price: **50 API units per request**

This report returns a list of categories that the queried domain belongs to.

When you run a query for a domain, in each line, you get a category and a rating. The rating reflects the level of confidence that this domain belongs to this category (ranging from 0 to 1). The results are sorted by the rating.

[About the Referring Domains report ›](https://www.semrush.com/kb/503-backlinks-referring-domains-report-manual)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_categories | Report type. |
| key \* | API\_KEY | Identification key assigned to each user after subscribing to Semrush. You'll find it in [**Subscription info** > **API units**](https://www.semrush.com/accounts/subscription-info/api-units/). |
| target \* |  | Root domain, subdomain, or URL. |
| target\_type \* | root\_domain, subdomain or url | Type of requested target. |
| export\_columns \* | category\_name, rating | This parameter lets you get only the columns with the data you need. Specify the required columns separating them by a comma. If this parameter isn't specified, all columns are shown by default.  Rating is the level of confidence that the domain specified as `target` belongs to this category. It ranges from 0 to 1, with a number closer to 1 showing a high confidence level. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_categories&target=searchenginejournal.com&target_type=root_domain&export_columns=category_name,rating
```

Response example Copy code

```
category_name;rating
/Internet & Telecom/Web Services/Search Engine Optimization & Marketing;0.931905
/Internet & Telecom/Web Services/Affiliate Programs;0.880989
/Business & Industrial/Advertising & Marketing/Marketing;0.872495
/Internet & Telecom/Search Engines;0.821398
/Business & Industrial/Advertising & Marketing/Brand Management;0.813207
```

Price: **40 API units per line**

This report returns only monthly historical trends of multiple backlinks and referring domains for the queried domain.

When you run a query for a domain, in return, in each line, you receive a date (Unix timestamp) and the number of backlinks and referring domains the queried domain had at that time. Results are sorted by date from the most recent to the oldest.

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | backlinks\_historical | Report type. |
| key \* | API\_KEY | Identification key assigned to each user after subscribing to Semrush. You'll find it in [**Subscription info** > **API units**](https://www.semrush.com/accounts/subscription-info/api-units/). |
| target \* | example.com | Target type. Root domain only. |
| target\_type \* | root\_domain | Type of requested target. |
| export\_columns \* | date, backlinks\_num, domains\_num, score | This parameter lets you get only the columns with the data you need. Specify the required columns separating them by a comma. If this parameter isn't specified, all columns are shown by default. |
| display\_limit | integer | Number of results returned to a request. If this parameter is not specified or equals `0`, the default value will be 10,000 lines. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.   Keep in mind that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/analytics/v1/

Request example Copy code

```
https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_historical&target=searchenginejournal.com&target_type=root_domain&export_columns=date,backlinks_num,domains_num&display_limit=5
```

Response example Copy code

```
date;backlinks_num;domains_num
1618185600;18768868;266988
1617580800;19005841;270238
1616976000;19145818;270371
1616371200;20011497;309865
1615766400;20669614;383991
```

Was this page helpful?

**Example**
```bash
# Example: Fetch Backlinks Overview report for a domain
curl "https://api.semrush.com/analytics/v1/?key=YOUR_API_KEY&type=backlinks_overview&target=example.com&target_type=root_domain&export_columns=ascore,total,domains_num,urls_num,ips_num,ipclassc_num,follows_num,nofollows_num,sponsored_num,ugc_num,texts_num,images_num,forms_num,frames_num"
```

```python
import requests

api_key = 'YOUR_API_KEY'
url = 'https://api.semrush.com/analytics/v1/'
params = {
    'key': api_key,
    'type': 'backlinks',
    'target': 'example.com',
    'target_type': 'root_domain',
    'export_columns': 'page_ascore,source_title,source_url,target_url,anchor,external_num,internal_num,first_seen,last_seen',
    'display_limit': 5,
    'display_filter': '+|type||newlink|+|type||follow'
}

response = requests.get(url, params=params)
print(response.text)  # CSV style response
```

This example fetches the top 5 new follow backlinks for the root domain `example.com`. Replace `YOUR_API_KEY` with your actual API key.
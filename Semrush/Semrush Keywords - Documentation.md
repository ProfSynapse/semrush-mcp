---
title: "Semrush Developers"
description:
clipdate: 2025-04-14
source: "https://developer.semrush.com/api/v3/analytics/keyword-reports/"
published:
tags:
  - "keywordOverview"
  - "semrushApi"
  - "seoAnalysis"
  - "ppcAnalysis"
  - "keywordData"
  - "apiUsage"
  - "exportParameters"
  - "regionalDatabase"
  - "organicResults"
  - "paidResults"
  - "relatedKeywords"
  - "keywordDifficulty"
  - "apiRequest"
  - "apiResponse"
  - "apiAuthentication"
---
> [!summary]- Summary
> - Semrush API provides various keyword-related reports for SEO and PPC analysis.
> - Reports include Keyword Overview (all or one database), Batch Keyword Overview, Organic Results, Paid Results, Related Keywords, Keyword Ads History, Broad Match Keyword, Phrase Questions, and Keyword Difficulty.
> - Each report requires parameters like type, API key, phrase (keyword), and database.
> - Optional parameters include export options, display limits, filters, sorting, and date.
> - API endpoints use GET requests to https://api.semrush.com/ with query parameters.
> - Pricing is based on API units per line of data returned.
> - Response formats are typically CSV with specified columns.
> - Historical pricing and additional details are provided for some reports.
> - Documentation includes example requests and responses for each report type.

Price: **10 API units per line**

This report provides a keyword summary, including its volume, CPC, competition level, and the number of results in [all regional databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/).

[About the Keyword Overview report ›](https://www.semrush.com/kb/257-keyword-overview)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_all | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database | database | Regional database. If this parameter isn't specified, your request is sent to all regional databases.  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| export\_escape | 1 | If this parameter uses the value "1", the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter uses the value "0", the response will be sent as a URL-encoded string; if "1", the response will not be converted. |
| export\_columns | Dt, Db, Ph, Nq, Cp, Co, Nr, In, Kd | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_all&key=API_KEY&phrase=seo&export_columns=Dt,Db,Ph,Nq,Cp,Co,Nr
```

Response example Copy code

```
Date;Database;Keyword;Search Volume;CPC;Competition
201903;bo;seo;390;0.44;0.03
201903;hu;seo;1900;0.82;0.45
201903;th;seo;5400;0.96;0.49
201903;cr;seo;590;0.43;0.14
```

Price: **10 API units per line**

This report provides a keyword summary, including its volume, CPC, competition level, and the number of results in a chosen [regional database](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/).

[About the Keyword Overview report ›](https://www.semrush.com/kb/257-keyword-overview)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_this | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| export\_escape | 1 | If this parameter uses the value "1", the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter uses the value "0", the response will be sent as a URL-encoded string; if "1", the response will not be converted. |
| display\_date | date in format "YYYYMM15" | Use this parameter to get data for a past month. For example, for December 2023, set this parameter to `20231215`. If you want to get the most recent data, don't use this parameter or leave the value empty. |
| export\_columns | Ph, Nq, Cp, Co, Nr, Td, In, Kd | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_this&key=API_KEY&phrase=seo&export_columns=Ph,Nq,Cp,Co,Nr,Td&database=us
```

Response example Copy code

```
Keyword;Search Volume;CPC;Competition;Number of Results;Trends
seo;110000;14.82;0.5;678000000;0.81,1.00,1.00,1.00,1.00,0.81,0.81,0.81,0.81,0.81,0.81,0.81
```

Price: **10 API units per line**

This report provides a summary of up to 100 keywords, including their volume, CPC, competition level, and the number of results in a chosen [regional database](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/).

[About the bulk keyword analysis in Keyword Overview ›](https://www.semrush.com/kb/257-keyword-overview#bulk)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_these | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| export\_escape | 1 | If this parameter uses the value "1", the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter uses the value "0", the response will be sent as a URL-encoded string; if "1", the response will not be converted. |
| display\_date | date in format "YYYYMM15" | Use this parameter to get data for a past month. For example, for December 2023, set this parameter to `20231215`. If you want to get the most recent data, don't use this parameter or leave the value empty. |
| export\_columns | Ph, Nq, Cp, Co, Nr, Td, In, Kd | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_these&key=API_KEY&phrase=ebay;seo&export_columns=Ph,Nq,Cp,Co,Nr,Td&database=us
```

Response example Copy code

```
Keyword;Search Volume;CPC;Competition;Number of Results
ebay;45500000;0.54;0.01;1880000000
seo;110000;14.82;0.5;678000000
```

Price: **10 API units per line**

This report lists domains ranking in Google's top 100 organic search results with a requested keyword.

[About the keyword organic value analysis in Keyword Overview ›](https://www.semrush.com/kb/257-keyword-overview#organic)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_organic | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  When using the `positions_type` parameter in the "all" type, the number of results returned by the request is limited by positions, not by rows.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`. |
| export\_escape | 1 | If this parameter uses the value "1", the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter uses the value "0", the response will be sent as a URL-encoded string; if "1", the response will not be converted. |
| display\_date | date in format "YYYYMM15" | Use this parameter to get data for a past month. For example, for December 2023, set this parameter to `20231215`. If you want to get the most recent data, don't use this parameter or leave the value empty. |
| export\_columns | Po, Pt, Dn, Ur, Fk, Fp, Fl | Required columns must be separated by commas. If this parameter isn't specified, the default columns (Dn, Ur, Fk) are sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| positions\_type | organic, all | “ `organic` ” indicates results with only the traditional organic positions on the SERP. This is the default value.  “ `all` ” indicates results that contain the traditional organic positions and the SERP Features as positions. In that case, the “ `Pt` ” column will return “ `-1` ” for the organic or SERP feature code. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_organic&key=API_KEY&phrase=seo&export_columns=Dn,Ur,Fk,Fp&database=us&display_limit=10
```

Response example Copy code

```
Domain;Url;Keywords SERP Features;SERP Features
moz.com;https://moz.com/beginners-guide-to-seo;1;6
moz.com;https://moz.com/learn/seo/what-is-seo;1;
searchengineland.com;https://searchengineland.com/guide/what-is-seo;1;
google.com;https://developers.google.com/search/docs/beginner/seo-starter-guide;1;6
neilpatel.com;https://neilpatel.com/what-is-seo/;1;
wikipedia.org;https://en.wikipedia.org/wiki/Search_engine_optimization;1;
wordstream.com;https://www.wordstream.com/seo;1;
wordstream.com;https://www.wordstream.com/blog/ws/2015/04/30/seo-basics;1;
ahrefs.com;https://ahrefs.com/blog/seo-basics/;1;
searchenginewatch.com;https://www.searchenginewatch.com/2016/01/21/seo-basics-22-essentials-you-need-for-optimizing-your-site/;1;
```

Price: **20 API units per line**

This report lists domains ranking in Google's paid search results with a requested keyword.

[About the keyword advertising value analysis in Keyword Overview ›](https://www.semrush.com/kb/257-keyword-overview#advertising)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_adwords | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`. |
| export\_escape | 1 | If this parameter is set to " `1` ", the report’s columns will be wrapped in double quotation marks (`"`). |
| export\_decode | 1 or 0 | If this parameter is set to " `0` ", the response will be sent as a URL-encoded string; if it's set to " `1` ", the response will not be converted. |
| display\_date | date in the "YYYYMM15" format | Use this parameter to get data for a past month. For example, for December 2023, set this parameter to `20231215`. If you want to get the most recent data, don't use this parameter or leave the value empty. |
| export\_columns | Dn, Ur, Vu | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_adwords&key=API_KEY&phrase=seo&export_columns=Dn,Ur,Vu&database=us&display_limit=10
```

Response example Copy code

```
Domain;Url;Visible Url
wix.com;http://www.wix.com/;www.wix.com/
webcreationus.com;http://amp.webcreationus.com/google/seo;amp.webcreationus.com/google/seo
wix.com;http://www.wix.com/;www.wix.com/
wix.com;http://www.wix.com/;www.wix.com/
brunnerworks.com;http://www.brunnerworks.com/;www.brunnerworks.com/
wix.com;http://www.wix.com/;www.wix.com/
brunnerworks.com;http://www.brunnerworks.com/;www.brunnerworks.com/
wix.com;http://www.wix.com/;www.wix.com/
rankingcoach.com;http://www.rankingcoach.com/;www.rankingcoach.com/
hinadm.com;http://www.hinadm.com/;www.hinadm.com/
```

Price: **40 API units per line**

This report provides an extended list of related keywords, synonyms, and variations relevant to a queried term in a chosen database.

[About the related keyword analysis in Keyword Overview ›](https://www.semrush.com/kb/257-keyword-overview#3)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_related | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`. |
| export\_escape | 1 | If this parameter uses the value "1", the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter uses the value "0", the response will be sent as a URL-encoded string; if "1", the response will not be converted. |
| export\_columns | Ph, Nq, Cp, Co, Nr, Td, Rr, Fk, In, Kd | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter | Ph, Nq, Cp, Co, Nr, Wc, Fk, Kd | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Response example Copy code

```
Keyword;Search Volume;CPC;Competition;Number of Results;Trends;Related Relevance;SERP Features
beginners guide;880;0;0.01;1750000000;0.82,1.00,0.82,1.00,0.82,0.82,0.67,0.82,1.00,1.00,1.00,1.00;0.05;1,6,7,20,21
best po sites;880;0.14;0.38;1040000000;0.67,0.67,0.67,1.00,0.67,0.20,0.20,0.25,0.25,0.04,0.01,0.02;0.05;15,20,21
best seo;880;6.55;0.33;631000000;0.45,0.77,1.00,0.45,0.77,0.77,1.00,0.68,0.45,0.55,0.68,0.55;0.15;4,6,11,22
how seo works;880;3.93;0.28;164000000;0.55,1.00,0.77,0.77,0.68,0.45,0.45,0.45,0.45,0.45,0.77,0.68;0.15;6,11,20,21,22
how to improve seo;880;2.9;0.34;233000000;1.00,0.88,0.88,0.88,0.88,0.88,0.72,0.72,0.72,0.72,1.00,0.88;0.1;11,20,21
page two of google;880;0;0;7640000000;0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.36,0.20,0.13,0.55,0.13;0.05;5,9,21
search e;880;2.3;0.1;24160000000;0.88,0.72,0.88,0.72,0.72,0.72,0.88,1.00,0.88,1.00,0.88,0.72;0.05;4,6,8
search engine optimization definition;880;5.2;0.09;29800000;0.88,0.88,1.00,0.72,0.39,0.39,0.59,0.88,1.00,0.88,0.88,0.88;0.45;0,1,6,15,20,21,22
seo for beginners;880;2.45;0.29;18500000;0.68,0.68,1.00,1.00,0.77,0.77,0.55,0.45,0.45,0.45,0.55,0.68;0.3;6,11,20,21,22
seo for dummies;880;1.93;0.98;2850000;0.68,1.00,1.00,0.68,0.77,0.68,0.68,0.68,0.55,0.55,0.77,0.68;0.05;1,6,7,20,21
```

Price: **100 API units per line**

This report shows domains that have bid on a requested keyword in the last 12 months and their positions in paid search results.

[About the keyword advertising value analysis in Keyword Overview ›](https://www.semrush.com/kb/257-keyword-overview#advertising)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_adwords\_historical | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`. |
| export\_escape | 1 | If this parameter uses the value "1", the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter uses the value "0", the response will be sent as a URL-encoded string; if "1", the response will not be converted. |
| export\_columns | Dn, Dt, Po, Ur, Tt, Ds, Vu, At, Ac, Ad | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_adwords_historical&key=API_KEY&display_limit=1&export_columns=Dn,Dt,Po,Ur,Tt,Ds,Vu&phrase=movie&database=us
```

Response example Copy code

```
Domain;Date;Position;Url;Title;Description;Visible Url
blendedmovie.com;20140515;1;47.xg4ken.com/media/redir.php%3Fprof%3D626%26camp%3D58398%26affcode%3Dkw599%26cid%3D36205335494%26networkType%3Dsearch%26kdv%3Dc%26url%5B%5D%3Dhttp%253A%252F%252Fblendedmovie.com%252F%2523home&ved=0CBoQ0Qw;Blended Movie - blendedmovie.com;A wildly different family vacation. Out 5/23. Buy Tickets Today!;www.blendedmovie.com/
blendedmovie.com;20140415;;;;;
blendedmovie.com;20140315;;;;;
blendedmovie.com;20140215;;;;;
blendedmovie.com;20140115;;;;;
blendedmovie.com;20131215;;;;;
blendedmovie.com;20131115;;;;;
blendedmovie.com;20131015;;;;;
blendedmovie.com;20130915;;;;;
blendedmovie.com;20130815;;;;;
blendedmovie.com;20130715;;;;;
blendedmovie.com;20130615;;;;;
```

Price: **20 API units per line**

The report lists broad matches and alternate search queries, including particular keywords or keyword expressions.

[About the related keyword analysis in Keyword Overview ›](https://www.semrush.com/kb/257-keyword-overview#3)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_fullsearch | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`. |
| export\_escape | 1 | If this parameter uses the value "1", the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter uses the value "0", the response will be sent as a URL-encoded string; if "1", the response will not be converted. |
| export\_columns | Ph, Nq, Cp, Co, Nr, Td, Fk, In, Kd | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter | Ph, Nq, Cp, Co, Nr, Wc, Fk, Kd | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_fullsearch&key=API_KEY&phrase=seo&export_columns=Ph,Nq,Cp,Co,Nr,Td,Fk&database=us&display_limit=10&display_sort=nq_desc&display_filter=%2B|Nq|Lt|1000
```

Response example Copy code

```
Keyword;Search Volume;CPC;Competition;Number of Results;Trends;SERP Features
affordable seo;880;13.91;0.22;29900000;0.45,0.55,0.30,0.45,0.81,1.00,0.63,0.45,0.55,0.63,0.55,0.45;6,7,22
affordable seo services;880;15.67;0.11;24000000;0.37,0.55,0.25,0.25,0.68,1.00,1.00,0.68,1.00,1.00,0.55,0.45;6,11,15,22
arizona seo;880;6.05;0.02;15900000;0.72,0.72,0.88,0.59,1.00,0.88,1.00,1.00,0.88,0.88,0.59,0.59;3,20
atlanta seo expert;880;17.99;0.13;4090000;0.25,1.00,1.00,0.20,0.20,0.20,0.30,0.20,0.16,0.11,0.09,0.11;6,7,9,20
best seo;880;6.55;0.33;631000000;0.77,1.00,0.45,0.77,0.77,1.00,0.68,0.45,0.55,0.68,0.55,0.55;4,6,11,22
best seo plugin for wordpress;880;2.74;0.1;11700000;0.77,0.68,0.55,0.55,0.68,0.55,0.55,0.55,0.55,1.00,0.77,0.77;11,20,21,22
best seo plugin wordpress;880;3.09;0.09;12800000;0.68,0.68,0.77,0.68,0.55,0.55,0.68,0.55,0.55,0.55,0.55,1.00;11,20,21,22
boca raton seo;880;7.58;0.11;2770000;1.00,1.00,0.25,0.16,0.37,0.30,0.20,0.11,0.11,0.16,0.16,0.16;3,5,6,20
boston seo agency;880;15.21;0.1;8630000;0.20,1.00,1.00,0.07,0.06,0.13,0.16,0.11,0.07,0.09,0.07,0.07;3,5,20,22
boston seo expert;880;12.73;0.04;4380000;0.25,1.00,1.00,0.13,0.13,0.11,0.45,0.20,0.13,0.13,0.09,0.09;6,9,20,22
```

Price: **40 API units per line**

The report lists phrase questions relevant to a queried term in a chosen database.

[About the related keyword analysis in Keyword Overview ›](https://www.semrush.com/kb/257-keyword-overview#3)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_questions | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Keyword or keyword expression you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter. |
| display\_offset | integer | This parameter lets you skip a specified number of results before sending a report.  If you use the `display_offset` option, increase the `display_limit` value by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`. |
| export\_escape | 1 | If this parameter value is " `1` ", the report's columns are wrapped in double quotation marks (`"`). |
| export\_decode | 1 or 0 | If this parameter value is " `0` ", the response is sent as a URL-encoded string. If it's " `1` ", the response isn't converted. |
| export\_columns | Ph, Nq, Cp, Co, Nr, Td, In, Kd | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results—in either ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter | Ph, Nq, Cp, Co, Nr, Kd | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_questions&key=API_KEY&phrase=seo&export_columns=Ph,Nq,Cp,Co,Nr,Td&database=us&display_limit=10&display_sort=nq_desc&display_filter=%2B|Nq|Lt|1000
```

Response example Copy code

```
Keyword;Search Volume;CPC;Competition;Number of Results;Trends
how to seo;880;5.23;0.16;611000000;0.88,1.00,1.00,1.00,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88
how does seo work;590;3.6;0.09;183000000;0.67,0.82,0.82,1.00,0.82,0.82,0.82,0.82,0.82,0.82,1.00,0.67
how to improve seo;590;7.11;0.4;135000000;0.82,0.82,1.00,0.82,0.82,1.00,0.82,0.82,0.82,0.82,1.00,0.82
what is seo and how it works;590;5.69;0.18;188000000;0.44,0.54,0.82,1.00,1.00,0.67,0.54,0.67,0.67,0.82,1.00,1.00
how seo works;480;6.62;0.24;163000000;0.81,1.00,1.00,1.00,1.00,0.81,0.81,0.81,0.81,0.66,1.00,1.00
kim min seo;480;0;0;51100000;0.55,0.55,0.36,0.36,0.36,0.55,0.44,0.67,0.44,0.55,1.00,0.67
what is seo writing;480;2.16;0.12;158000000;0.66,1.00,0.66,0.81,1.00,1.00,0.81,1.00,1.00,1.00,0.81,0.66
how much does seo cost;390;7.44;0.31;80300000;0.81,0.81,0.81,0.81,0.81,1.00,0.81,0.67,0.67,0.67,0.81,0.67
kim seo hyung;390;0;0;9000000;0.54,0.67,0.54,0.54,0.54,1.00,0.81,0.81,0.67,0.67,0.81,1.00
ko seo hyun;390;0;0.01;0;0.04,0.06,0.07,0.07,0.04,0.13,0.30,0.09,0.81,1.00,0.45,0.13
```

Price: **50 API units per line**

This report provides keyword difficulty, an index that helps to estimate how difficult it would be to seize competitors' positions in organic search within Google's top 10 with a queried search term.

[Learn more about keyword difficulty ›](https://www.semrush.com/kb/1158-what-is-kd)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | phrase\_kdi | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| phrase \* | phrase | Phrase (from 1 to 100 keywords separated by semicolons) |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| export\_escape | 1 | If this parameter uses the value "1", the report’s columns will be wrapped in double quotation marks ("). |
| export\_columns | Ph, Kd | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=phrase_kdi&key=API_KEY&export_columns=Ph,Kd&phrase=ebay;seo&database=us
```

Response example Copy code

```
Keyword;Keyword Difficulty Index

ebay;95.10

seo;78.35
```

Was this page helpful?

**Example**
```bash
# Example: Get Keyword Overview (one database) for keyword 'seo' in US database
curl "https://api.semrush.com/?type=phrase_this&key=YOUR_API_KEY&phrase=seo&export_columns=Ph,Nq,Cp,Co,Nr,Td&database=us"
```

Response example:
```
Keyword;Search Volume;CPC;Competition;Number of Results;Trends
seo;110000;14.82;0.5;678000000;0.81,1.00,1.00,1.00,1.00,0.81,0.81,0.81,0.81,0.81,0.81,0.81
```

```python
import requests

API_KEY = 'YOUR_API_KEY'
endpoint = 'https://api.semrush.com/'
params = {
    'type': 'phrase_this',
    'key': API_KEY,
    'phrase': 'seo',
    'export_columns': 'Ph,Nq,Cp,Co,Nr,Td',
    'database': 'us'
}

response = requests.get(endpoint, params=params)
print(response.text)
```

This example fetches keyword overview data for the keyword "seo" from the US database using the Semrush API.
---
title: "Semrush Developers"
description:
clipdate: 2025-04-14
source: "https://developer.semrush.com/api/v3/analytics/domain-reports/"
published:
tags:
  - "domainReports"
  - "semrushApi"
  - "organicSearchKeywords"
  - "paidSearchKeywords"
  - "adsCopies"
  - "competitorsReport"
  - "adHistory"
  - "keywordGap"
  - "productListingAds"
  - "apiUsage"
  - "apiParameters"
  - "exportColumns"
  - "requestExamples"
  - "responseFormat"
  - "apiPricing"
---
> [!summary]- Summary
> - The documentation covers Semrush API domain reports under Analytics.
> - Reports include Domain Organic Search Keywords, Domain Paid Search Keywords, Ads Copies, Competitors in Organic and Paid Search, Domain Ad History, Domain vs. Domain, Domain PLA Search Keywords, PLA Copies, PLA Competitors, Domain Organic Pages, and Domain Organic Subdomains.
> - Each report type has a specific 'type' parameter to be used in API requests.
> - API requests require parameters like 'type', 'key' (API key), 'domain', 'database', and optional parameters like 'display_limit', 'display_filter', 'export_columns', 'display_sort', etc.
> - Prices for API usage are specified per line of data returned.
> - Historical pricing and data availability is also noted.
> - Request and response examples are provided for each report type.
> - Response formats are typically CSV with specified columns.
> - Documentation includes links to related Semrush knowledge base articles for deeper understanding.

Price: **10 API units per line**

This report lists keywords that bring users to a domain via Google's top 100 organic search results. You can get monthly rankings from as far back as 2012–2016, [depending on the database](https://www.semrush.com/kb/64-historical-data), or daily rankings for the last 31 days (with `display_daily`).

[About the Organic Research Overview report ›](https://www.semrush.com/kb/890-Organic-Research-Overview)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_organic | Report type. |
| key \* | API\_KEY | Identification key assigned to each user after subscribing to Semrush. You'll find it in [**Subscription info** > **API units**](https://www.semrush.com/accounts/subscription-info/api-units/). |
| domain \* | example.com | Unique name of a website you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | Number of results returned to a request. If this parameter isn't specified or is set to `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter lets you skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report's columns will be wrapped in double quotation marks ("). |
| display\_date |  | Date for which data will be shown. You can roll back to a date in the past or choose the current date.   Use the `YYYYMM15` format for monthly changes.   Use the `YYYYMMDD` format for daily changes.   If the parameter isn't specified, data on the latest available daily ranking changes is shown. |
| display\_daily | 1 | This parameter lets you get daily updates on position changes in the last 31 days. If the parameter isn't specified, your report will show monthly results for the current and previous months.   This option is applied only when the `display_positions` parameter is set. |
| export\_columns |  | This parameter lets you get only the columns with the data you need. Specify the required columns separating them by a comma. If this parameter isn't specified, the default columns will be sent (`Ph`, `Po`, `Pp`, `Pd`, `Nq`, `Cp`, `Ur`, `Tr`, `Tc`, `Co`, `Nr`, `Td`).  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter lets you choose which column you'd like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_positions | new, lost, rise or fall | `new`: Keywords that brought a domain to Google's top 100 organic or paid search results.   `lost`: Keywords that no longer bring a domain to Google's top 100 organic or paid search results.   `rise`: Keywords that helped a domain rank higher in Google's top 100 organic or paid search results.   `fall`: Keywords that are currently helping a domain remain in the Google top 100, though its ranking may have decreased. |
| display\_filter |  | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |
| display\_positions\_type | organic, all, serp\_features | `organic`: Keywords where a domain ranks only in the standard organic positions on SERPs. Default value.   `all`: Keywords where a domain ranks in the standard organic positions and the keywords where a domain ranks in SERP Features.   `serp_features`: Keywords where a domain ranks only in SERP Features. |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_organic&key=YOUR_API_KEY&display_filter=%2B%7CPh%7CCo%7Cseo&display_limit=10&export_columns=Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td&domain=seobook.com&display_sort=tr_desc&database=us
```

Response example Copy code

```
Keyword;Position;Previous Position;Position Difference;Search Volume;CPC;Url;Traffic (%);Traffic Cost (%);Competition;Number of Results;Trends
seo;9;10;1;110000;14.82;http://www.seobook.com/;17.53;44.40;0.50;0;0.81,1.00,1.00,1.00,1.00,0.81,0.81,0.81,0.81,0.81,0.81,0.81
seobook;1;1;0;1300;4.54;http://www.seobook.com/;5.52;4.28;0.32;379000;0.62,0.81,0.62,0.81,0.81,0.62,0.62,0.81,0.81,0.62,1.00,0.81
seo tools;6;6;0;8100;10.54;http://tools.seobook.com/;2.15;3.87;0.54;321000000;0.67,0.82,0.82,1.00,0.82,0.82,0.67,0.67,0.67,0.67,0.82,0.82
seo basics;2;2;0;1600;6.84;http://www.seobook.com/learn-seo/seo-basics/;1.10;1.29;0.22;42500000;0.81,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,0.81,1.00,0.81
seo book keyword tool;1;1;0;110;16.73;http://tools.seobook.com/keyword-tools/seobook/;0.46;1.33;0.34;5340000;0.41,0.41,0.52,0.52,0.65,0.82,0.65,1.00,1.00,0.82,0.65,0.41
seo book keyword density;1;1;0;110;6.64;http://tools.seobook.com/general/keyword-density/;0.46;0.53;0.15;539000;0.14,0.43,0.43,0.33,0.33,0.24,0.52,0.67,0.81,0.81,1.00,1.00
free seo tools;6;6;0;1600;7.18;http://tools.seobook.com/;0.42;0.52;0.60;204000000;0.68,0.84,1.00,1.00,1.00,0.84,0.84,1.00,1.00,0.84,1.00,0.84
learn seo;8;8;0;1900;7.76;http://www.seobook.com/learn-seo/;0.30;0.40;0.47;396000000;0.67,0.79,0.79,0.79,0.79,0.79,1.00,0.79,0.79,0.67,0.79,0.67
aaron seo;1;1;0;70;0.00;http://www.seobook.com/;0.29;0.00;0.03;16300000;0.22,0.56,0.11,0.44,0.11,0.11,0.11,0.33,0.11,1.00,0.78,0.22
seo book keyword suggestion tool free download;1;1;0;70;0.00;http://tools.seobook.com/;0.29;0.00;0.14;775000;0.29,1.00,0.00,0.43,0.00,0.00,0.14,0.00,0.14,0.00,0.00,0.43
```

Price: **20 API units per line**

This report lists keywords that bring users to a domain via Google's paid search results.

[About the Advertising Research Positions report ›](https://www.semrush.com/kb/508-ad-research-positions-report)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_adwords | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of a website you’d like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request. If this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 1,000,000. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; otherwise, the response won't be converted. |
| display\_date | date in format "YYYYMM15" | A date for which the report will be shown. You can roll back to a date in the past or choose the current date. |
| export\_columns |  | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_positions | new, lost, rise or fall | The `new` value indicates keywords that brought a domain to Google's top 100 organic or paid search results;   `lost` indicates keywords that no longer bring a domain to Google's top 100 organic or paid search results;   `rise` indicates keywords that helped a domain get a higher ranking in Google's top 100 organic or paid search results;   `fall` indicates keywords that are currently helping a domain remain in the Google top 100, though its ranking may have decreased. |
| display\_filter |  | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_adwords&key=YOUR_API_KEY&display_limit=10&export_columns=Ph,Po,Pp,Pd,Nq,Cp,Vu,Tr,Tc,Co,Nr,Td&domain=ebay.com&display_sort=po_asc&database=us
```

Response example Copy code

```
Keyword;Position;Previous Position;Position Difference;Search Volume;CPC;Visible Url;Traffic (%);Traffic Cost;Competition;Number of Results;Trends
g tube pads amazon;1;1;0;30;0.36;www.ebay.com/;0.00;0;0.88;3130000;0.14,0.14,0.43,0.14,0.71,0.14,0.57,0.14,1.00,0.14,0.14,0.14
13.8 v power supply;1;1;0;140;1.24;www.ebay.com/;0.00;8;1.00;9750000;0.82,0.82,0.52,1.00,0.82,0.65,0.65,0.65,0.82,0.82,0.82,1.00
ruger 22 250 magazine;1;1;0;10;0.02;www.ebay.com/22+250+magazine;0.00;0;0.64;1370000;1.00,0.60,0.80,0.40,0.20,0.20,0.20,0.20,0.20,0.20,0.20,0.40
nike roshe run woven rainbow buy online;1;1;0;50;0.00;www.ebay.com/;0.00;0;0.00;34;0.00,0.00,0.00,0.00,0.00,0.00,0.00,1.00,0.00,0.00,0.00,0.00
wildside under the influence vinyl;1;1;0;30;0.00;;0.00;0;0.00;83;0.11,0.11,1.00,0.11,0.33,0.22,0.00,0.11,0.00,0.11,0.11,0.11
rca 45 record player;1;1;0;10;0.20;www.ebay.com/;0.00;0;1.00;1170000;0.03,0.13,0.03,0.08,0.03,0.03,0.03,0.08,0.03,0.18,0.18,1.00
uber store;1;1;0;720;2.43;www.ebay.com/Uber+store;0.00;82;0.52;149000000;0.67,0.82,0.55,0.67,0.67,0.67,0.82,1.00,0.82,0.82,0.82,0.82
mouse maze for sale;1;1;0;40;0.16;;0.00;0;1.00;7410000;1.00,0.50,0.50,1.00,0.50,0.50,0.50,1.00,0.50,0.50,0.50,1.00
air britain;1;1;0;140;0.64;www.ebay.com/;0.00;4;0.08;64200000;1.00,1.00,1.00,1.00,0.82,0.82,0.82,1.00,0.82,0.82,0.82,0.53
esoterica stonehaven;1;1;0;140;0.02;;0.00;0;0.08;67;0.81,0.81,0.35,0.65,0.42,0.27,0.27,0.35,0.54,0.54,1.00,0.54
```

Price: **40 API units per line**

This report shows unique ad copies Semrush noticed when the domain ranked in Google's paid search results for keywords from our databases.

[About the Ads Copies report ›](https://www.semrush.com/kb/511-ad-research-ad-copies-report)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_adwords\_unique | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of a website you’d like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request. If this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; otherwise, the response won't be converted. |
| export\_columns | Ph,Un,Tt,Ds,Vu,Ur,Pc,Ts | The required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort | pc\_asc, pc\_desc | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter | Tt, Ds, Vu | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_adwords_unique&key=YOUR_API_KEY&display_limit=3&export_columns=Tt,Ds,Vu,Ur,Pc&domain=ebay.com&database=us
```

Response example Copy code

```
Title;Description;Visible Url;Url;Number of Keywords
Authentic Designer Goods - Clothing Shoes and Accessories;Prada Gucci Burberry Lanvin Chanel ;www.ebay.com/usr/luxeloveshop;http://www.ebay.com/usr/luxeloveshop&ved=0CHYQ0Qw;633
Boat For Sale on eBay;Huge selection of Boat For Sale.Free Shipping available. Buy Now!;www.ebay.com/;http://rover.ebay.com/rover/1/711-42618-2056-0/2%3Fmpre%3Dhttp%253A%252F%252Fwww.ebay.com%252Fsch%252Fi.html%253F_nkw%253Dboat%252520for%252520sale%26keyword%3Dboat%2Bfor%2Bsale%26crlp%3D35687221484_2416792%26MT_ID%3D69%26geo_id%3D10232%26adpos%3D1s4%26device%3Dc&ved=0CIABENEM;361
Personalize Phone Cases - ebay.com;iPhone, iPod, HTC, Samsung, Sony, LG. Prices as low as $9.98.;www.stores.ebay.com/FSC25;http://www.stores.ebay.com/FSC25&ved=0CBMQ0Qw;273
```

Price: **40 API units per line**

This report lists a domain's competitors in organic search results.

[About the Organic Research Competitors report ›](https://www.semrush.com/kb/496-organic-research-competitors-report)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_organic\_organic | Report type. |
| key \* | API\_KEY | The identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of the website you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter lets you skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report's columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; otherwise, the response won't be converted. |
| display\_date | date in format "YYYYMM15" | The date for which the report will be shown. You can roll back to a date in the past or choose the current date. |
| export\_columns | Dn, Cr, Np, Or, Ot, Oc, Ad, Sr, St, Sc | The required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort | np\_desc, np\_asc, cr\_desc, cr\_asc | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_organic_organic&key=YOUR_API_KEY&display_limit=10&export_columns=Dn,Cr,Np,Or,Ot,Oc,Ad&domain=seobook.com&database=us
```

Response example Copy code

```
Domain;Competitor Relevance;Common Keywords;Organic Keywords;Organic Traffic;Organic Cost;Adwords Keywords
seochat.com;0.13;338;11021;5640;9690;0
seocentro.com;0.12;237;2196;8091;43478;0
internetmarketingninjas.com;0.12;323;15751;16182;30168;20
webconfs.com;0.12;265;6689;4291;14093;0
link-assistant.com;0.12;326;18255;13089;51583;26
wordtracker.com;0.12;289;7685;11254;51352;1
keywordtool.io;0.11;337;19247;103615;145337;1
kwfinder.com;0.10;259;4885;8260;33067;2
seoreviewtools.com;0.10;240;4537;7181;32502;0
smallseotools.com;0.10;469;21126;299488;450094;10
```

Price: **40 API units per line**

This report lists a domain’s competitors in paid search results.

[About the Advertising Research Competitors report ›](https://www.semrush.com/kb/510-ad-research-competitors-report)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_adwords\_adwords | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of a website you’d like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; otherwise, the response won't be converted. |
| display\_date | date in format "YYYYMM15" | A date on which a report will be shown. You can roll back to a date in the past or choose the current date. |
| export\_columns | Dn, Cr, Np, Ad, At, Ac, Or | The required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort | np\_desc, np\_asc, cr\_desc, cr\_asc | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_adwords_adwords&key=YOUR_API_KEY&display_limit=10&export_columns=Dn,Cr,Np,Ad,At,Ac,Or&domain=ebay.com&database=us
```

Response example Copy code

```
Domain;Competitor Relevance;Common Keywords;Adwords Keywords;Adwords Traffic;Adwords Cost;Organic Keywords
bestdeals.today;0.07;192427;4180961;231702687;219085005;98743
amazon.com;0.07;337566;7674897;606923091;363744884;76392627
discount99.us;0.04;21583;82580;486315;307513;0
netdeals.com;0.03;27343;740384;38400483;28864800;6
walmart.com;0.03;21533;558633;146423426;31455771;19967088
blackfridaydeals2016.co;0.02;23660;1091009;75093364;65877087;0
informationvine.com;0.02;25758;1377703;86672506;90105545;0
target.com;0.02;21805;1037283;52256534;51634896;9181821
savesmart.com;0.02;11659;151845;5477272;5183214;8
shop411.com;0.02;29103;1896105;84369570;98212347;0
```

Price: **100 API units per line**

This report shows keywords a domain has bid on in the last 12 months and its positions in paid search results.

[About the Ads History report ›](https://www.semrush.com/kb/512-ad-research-ads-history-report)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_adwords\_historical | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of a website you’d like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report’s columns will be wrapped in double quotation marks ("). |
| export\_columns |  | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort | cv\_asc, cv\_desc | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter | Ph, Nq, Cp, Tr | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_adwords_historical&key=YOUR_API_KEY&display_limit=1&export_columns=Ph,Dt,Po,Cp,Nq,Tr,Ur,Tt,Ds,Vu&domain=amazon.com&database=us
```

Response example Copy code

```
Keyword;Date;Position;CPC;Search Volume;Traffic (%);Url;Title;Description;Visible Url
amazon;20181215;1;0.02;83100000;3905700;https://www.amazon.com/;Amazon.com Official Site | Free 2-Day Shipping with Prime Ad www.amazon.com/;Earth's biggest selection of books, electronics, apparel & more at low prices. Fast Shipping. Try Prime for Free. Save with Our Low Prices. Explore Amazon Devices. Read Ratings & Reviews. Shop Our Huge Selection. Shop Best Sellers & Deals.;
amazon;20181115;1;0.02;83100000;3905700;https://www.amazon.com/;Amazon.com® Official Site | Huge Selection & Great Prices Ad www.amazon.com/;Free Two-Day Shipping with Prime. Read Ratings & Reviews. Explore Amazon Devices. Fast Shipping.;
amazon;20181015;1;0.02;83100000;3905700;http://www.amazon.com/;Amazon.com Official Site | Huge Selection & Great Prices;Free Two-Day Shipping with Prime. Read Ratings & Reviews. Try Prime for Free. Explore Amazon Devices. Shop Best Sellers & Deals. Save with Our Low Prices. Shop Our Huge Selection. Fast Shipping.;www.amazon.com/
amazon;20180915;1;0.02;83100000;3905700;http://www.amazon.com/;Amazon.com Official Site | Free 2-Day Shipping with Prime;Earth's biggest selection of books, electronics, apparel & more at low prices.;www.amazon.com/
amazon;20180815;1;0.02;83100000;3905700;http://www.amazon.com/;Amazon.com | Amazon® Official Site | Huge Selection & Great Prices;Free Two-Day Shipping with Prime. Explore Amazon Devices. Shop Our Huge Selection. Read Ratings & Reviews. Try Prime for Free. Fast Shipping. Save with Our Low Prices.;www.amazon.com/
amazon;20180715;1;0.02;83100000;3905700;http://www.amazon.com/;amazon - Official Site | Huge Selection at amazon.com;Discounted Contemporary Furniture at amazon .com;www.amazon.com/
amazon;20180615;1;0.02;83100000;3905700;http://www.amazon.com/music;Amazon.com - Amazon Music Unlimited - 3 months for 99¢;Limited-time offer! 3 months of music streaming for $0.99. Alexa ready. Try now.;www.amazon.com/music
amazon;20180515;1;0.02;83100000;3905700;http://www.amazon.com/music;Amazon.com - Amazon Music Unlimited - 3 months for 99¢;Limited-time offer! 3 months of music streaming for $0.99. Alexa ready. Try now.;www.amazon.com/music
amazon;20180415;1;0.02;83100000;3905700;http://www.amazon.com/music;Amazon.com - Amazon Music Unlimited - 3 months for 99¢;Limited-time offer! 3 months of music streaming for $0.99. Alexa ready. Try now.;www.amazon.com/music
amazon;20180315;1;0.02;83100000;3905700;http://www.amazon.com/music;Amazon.com - Amazon Music Unlimited - 3 months for 99¢;Limited-time offer! 3 months of music streaming for $0.99. Alexa ready. Try now.;www.amazon.com/music
amazon;20180215;1;0.02;83100000;3905700;http://www.amazon.com/;;Free Two-Day Shipping with Prime.;www.amazon.com/
amazon;20180115;1;0.02;83100000;3905700;http://www.amazon.com/music;Amazon.com - Amazon Music Unlimited - 3 months for 99¢;Limited-time offer! 3 months of music streaming for $0.99. Alexa ready. Try now.;www.amazon.com/music
```

Price: **80 API units per line**

This report allows users to compare up to five domains by common keywords, unique keywords, all keywords, or search terms that are unique to the first domain.

[About the Keyword Gap tool ›](https://www.semrush.com/kb/28-keyword-gap)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_domains | Report type. |
| key \* | API\_KEY | Identification key assigned to each user after subscribing to Semrush. You'll find it in [**Subscription info** > **API units**](https://www.semrush.com/accounts/subscription-info/api-units/). |
| domains \* | string | URL-encoded string that contains domains in a specified format, separated by the `\|` symbol.   This format requires a domain to include `<sign>\|<type>\|<domain>`, where:   • `<sign>` means possible operations: `+`, `-`, `*`, or `/`.   • `<type>` can be `or` for organic keywords or `ad` for paid keywords.   • `<domain>` indicates a domain name.  You can use the following combinations to see:   • Shared keywords: `*\|or\|<your domain>\|*\|or\|<domain2>\|*\|or\|<domain3>` (in this example)   • All keywords: `*\|or\|<your domain>\|+\|or\|<domain2>\|+\|or\|<domain3>`   • Unique keywords for your domain: `*\|or\|<your domain>\|-\|or\|<domain2>\|-\|or\|<domain3>`   • Untapped keywords for your domain: `*\|or\|<domain2>\|+\|or\|<domain3>\|-\|or\|<your domain>`   • Missing keywords for your domain: `*\|or\|<domain2>\|*\|or\|<domain3>\|-\|or\|<your domain>`   • Keywords only in one of the domains: `*\|or\|<your domain>\|/\|or\|<domain2>\|/\|or\|<domain3>` (only available via API)  URL encoding reference › |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | Number of results returned to a request. If this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report's columns will be wrapped in double quotation marks (`"`). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; otherwise, the response won't be converted. |
| display\_date | date in the "YYYYMM15" format | Report date. You can roll back to a date in the past or choose the current date. |
| export\_columns |  | This parameter lets you get only the columns with the data you need. Specify the required columns separating them by a comma. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter allows you to choose by which column you would like to sort your results in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter | Ph, P0, P1, P2, P3, P4, Nq, Cp, Co, Nr | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_domains&key=YOUR_API_KEY&database=us&display_limit=10&domains=%2A%7Cor%7Cnike.com%7C%2A%7Cor%7Cadidas.com%7C%2A%7Cor%7Creebok.com&export_columns=Ph,P0,P1,P2,Co,Nq,Cp
```

Response example Copy code

```
Keyword;nike.com;adidas.com;reebok.com;Competition;Search Volume;CPC
shoes;69;33;81;1.00;1500000;0.91
basketball shoes;1;11;14;1.00;368000;0.39
man;30;41;68;0.00;301000;0.22
running;26;31;33;0.01;301000;1.26
shoes for men;44;25;49;1.00;301000;0.71
shoes for women;60;27;39;1.00;301000;0.77
running shoes;2;21;22;1.00;201000;0.88
soccer cleats;5;6;74;1.00;165000;0.35
hoodies for men;51;44;53;1.00;135000;0.92
kids shoes;7;21;38;1.00;135000;0.72
```

Price: **30 API units per line**

This report lists keywords that trigger a domain’s product listing ads (PLA) to appear in Google's paid search results.

[About the PLA Positions report ›](https://www.semrush.com/kb/519-product-listing-ads-positions)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_shopping | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of a website you’d like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter is not specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; otherwise, the response won't be converted. |
| export\_columns | Ph,Po,Pp,Pd,Nq,Sn,Ur,Tt,Pr,Ts | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter | Ph,Po,Nq,Ur,Tt,Pr | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_shopping&key=YOUR_API_KEY&domain=ebay.com&database=us&display_limit=3&display_sort=nq_desc&export_columns=Ph,Po,Pp,Pd,Nq,Sn,Ur,Tt,Pr,Ts
```

Response example Copy code

```
Keyword;Position;Previous Position;Position Difference;Search Volume;Shop Name;Url;Title;Product Price;Timestamp
apple watch;5;0;-5;1830000;eBay;http://www.ebay.com/i/123473122981;Apple Watch Series 2 - 38MM - Aluminum Case - White Sport Band - Smartwatch;169.99;1548155351
playstation;5;0;-5;673000;eBay;http://www.ebay.com/i/113408567972;877 Fully Tested Ps Vita PCH-1100 AB01 Crystal Black Console System Fw 3.68;95.94;1548148745
playstation;7;0;-7;673000;eBay;http://www.ebay.com/i/113493854733;Sony PlayStation 2 PS2 Fat Console Controller W/ Cords - Boots Up Refurbished;34.07;1548148745
```

Price: **60 API units per line**

This report shows product listing ad (PLA) copies Semrush noticed when the domain ranked in Google's paid search results for keywords from our databases.

[About the PLA Copies report ›](https://www.semrush.com/kb/520-product-listing-ads-copies)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_shopping\_unique | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of a website you’d like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report's columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; otherwise, the response won't be converted. |
| export\_columns | Tt,Pr,Ur,Pc,Un,Ts | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort | pr\_asc, pr\_desc, pc\_asc, pc\_desc | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter | Tt,Pr | Filters for columns.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_shopping_unique&key=YOUR_API_KEY&domain=ebay.com&database=us&display_limit=3&export_columns=Tt,Pr,Ur,Pc
```

Response example Copy code

```
Title;Product Price;Url;Number of Keywords
Windows 7 Professional 32/64 Bit Activation Key;6.1;http://www.ebay.com/i/323416369252;390
Microsoft Windows 7 Ultimate 32/64 Bit SP1&2 Download Link & MS Activation Key;4.99;http://www.ebay.com/i/202550754305;245
1080P DIY Spy Hidden Nanny Micro Pinhole Built-in Battery HD Camera DVR Recorder;32;http://www.ebay.com/i/192495737640;236
```

Price: **60 API units per line**

This report lists domains the requested domain is competing against in Google's paid search results with product listing ads (PLA).

[About the PLA Competitors report ›](https://www.semrush.com/kb/521-product-listing-ads-competitors)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_shopping\_shopping | Report type. |
| key \* | API\_KEY | An identification key assigned to a user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of a website you’d like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter allows you to skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report's columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; otherwise, the response won't be converted. |
| export\_columns | Dn,Cr,Np,Sh,Ad,At,Ac,Or | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort | np\_asc, np\_desc, cr\_asc, cr\_desc | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_shopping_shopping&key=YOUR_API_KEY&domain=ebay.com&database=us&display_limit=10&display_sort=np_desc&export_columns=Dn,Cr,Np,Ad,At,Ac,Or
```

Response example Copy code

```
Domain;Competitor Relevance;Common Keywords;Adwords Keywords;Adwords Traffic;Adwords Cost;Organic Keywords
walmart.com;0.17;316712;555313;145469121;30624447;19966933
amazon.com;0.13;488457;7126039;568143801;329123277;76322373
etsy.com;0.08;117812;38328;22363968;3015402;9654230
newegg.com;0.05;61108;11250;6273638;2207224;2190128
jet.com;0.05;60721;9777;151975;161632;634721
target.com;0.05;62272;1037704;51821814;51369601;9143593
homedepot.com;0.04;67022;492858;103685779;56643236;7106954
zoro.com;0.04;60008;56711;1996755;1891827;304263
poshmark.com;0.04;52296;10435;5570134;1155108;2321101
bestbuy.com;0.04;45126;96379;54662964;20450677;5160927
```

Price: **10 API units per line**

This report shows unique pages of the analyzed domain ranking in Google's top 100 organic search results.

[About the Organic Research Pages report ›](https://www.semrush.com/kb/497-organic-research-pages-report)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_organic\_unique | Report type. |
| key \* | API\_KEY | Identification key assigned to each user after subscribing to Semrush. You'll find it in [**Subscription info** > **API units**](https://www.semrush.com/accounts/subscription-info/api-units/). |
| domain \* | example.com | Unique name of the website you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter lets you skip a specified number of results before sending a report.  If you use the `display_offset` option, increase the `display_limit` value by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter is set to `1`, the report's columns will be wrapped in double quotation marks (`"`). |
| export\_decode | 1 or 0 | If this parameter is set to `0`, the response will be sent as a URL-encoded string; if it's set to `1`, the response won't be converted. |
| display\_date | date in format "YYYYMM15" | The date for which the report will be shown. You can roll back to a date in the past or choose the current date. |
| export\_columns |  | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |
| display\_filter |  | Filters for columns.  [Filters](https://developer.semrush.com/api/v3/analytics/basic-docs/#filters/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_organic_unique&key=YOUR_API_KEY&display_filter=%2B%7CPc%7CGt%7C100&display_limit=10&export_columns=Ur,Pc,Tg,Tr&domain=seobook.com&display_sort=tr_desc&database=us
```

Response example Copy code

```
Url;Number of Keywords;Traffic;Traffic (%)
http://www.seobook.com/;317;2488;15.14
http://tools.seobook.com/meta-medic/;492;1289;7.84
http://tools.seobook.com/robots-txt/generator/;197;1133;6.89
http://tools.seobook.com/;588;1015;6.17
http://tools.seobook.com/ppc-tools/free-ppc-ad-coupons.html;930;916;5.57
http://tools.seobook.com/general/keyword-density/;417;794;4.83
http://tools.seobook.com/keyword-tools/seobook/;262;729;4.43
http://tools.seobook.com/server-header-checker/;322;722;4.39
http://tools.seobook.com/robots-txt/;319;583;3.54
http://tools.seobook.com/keyword-list/generator.php;103;469;2.85
```

Price: **10 API units per line**

This report shows subdomains of the analyzed domain ranking in Google's top 100 organic search results.

[About the Organic Research Subdomains report ›](https://www.semrush.com/kb/774-organic-subdomains)

###### Request parameters

| Name | Value/Type | Description |
| --- | --- | --- |
| type \* | domain\_organic\_subdomains | Report type. |
| key \* | API\_KEY | An identification key assigned to the user after subscribing to Semrush. The key is available on the Profile page. |
| domain \* | example.com | Unique name of the website you'd like to investigate. |
| database \* | database | Regional database (one value from the list).  [Databases](https://developer.semrush.com/api/v3/analytics/basic-docs/#databases/) |
| display\_limit | integer | The number of results returned to a request; if this parameter isn't specified or equals `0`, the default value will be 10,000 lines.  The maximum number of returned results is 100,000. If you need more results, use the `display_offset` parameter.  The maximum value for `display_limit` is 4,000,000. |
| display\_offset | integer | This parameter lets you skip a specified number of results before sending a report.  Remember that if you use the `display_offset` option, the `display_limit` value should be increased by the value set in `display_offset`.  If you need more than the first 100,000 results, add the `display_offset` value to `display_limit`.  Keep in mind that the `display_limit` value must not exceed 4,000,000. |
| export\_escape | 1 | If this parameter uses the `1` value, the report’s columns will be wrapped in double quotation marks ("). |
| export\_decode | 1 or 0 | If this parameter uses the `0` value, the response will be sent as a URL-encoded string; if `1`, the response won't be converted. |
| display\_date | date in format "YYYYMM15" | The date for which a report will be shown. You can roll back to a date in the past or choose an actual date. |
| export\_columns | Ur, Pc, Tg, Tr, Sr, St | Required columns must be separated by commas. If this parameter isn't specified, the default columns will be sent.  [Columns](https://developer.semrush.com/api/v3/analytics/basic-docs/#columns/) |
| display\_sort |  | This parameter lets you choose which column you would like to sort your results by, in ascending or descending order.  [Sortings](https://developer.semrush.com/api/v3/analytics/basic-docs/#sortings/) |

\* Fields marked by an asterisk (\*) are required

Endpoint (GET) Copy code

https://api.semrush.com/

Request example Copy code

```
https://api.semrush.com/?type=domain_organic_subdomains&key=YOUR_API_KEY&display_limit=10&export_columns=Ur,Pc,Tg,Tr&domain=apple.com&database=us
```

Response example Copy code

```
Url;Number of Keywords;Traffic;Traffic (%)
itunes.apple.com;12576097;80811145;53.47
www.apple.com;1461853;43132944;28.54
support.apple.com;1255701;21914725;14.50
discussions.apple.com;1042589;2163623;1.43
trailers.apple.com;67190;799797;0.53
developer.apple.com;125007;713958;0.47
secure.store.apple.com;3036;482174;0.32
checkcoverage.apple.com;4368;210723;0.14
beta.apple.com;1113;205472;0.14
appleid.apple.com;351;139299;0.09
```

Was this page helpful?

**Example**
```bash
# Example: Retrieve top 10 organic keywords for domain 'seobook.com' from US database
curl "https://api.semrush.com/?type=domain_organic&key=YOUR_API_KEY&display_limit=10&domain=seobook.com&database=us&export_columns=Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td&display_sort=tr_desc"
```

Response (CSV):
```
Keyword;Position;Previous Position;Position Difference;Search Volume;CPC;Url;Traffic (%);Traffic Cost (%);Competition;Number of Results;Trends
seo;9;10;1;110000;14.82;http://www.seobook.com/;17.53;44.40;0.50;0;0.81,1.00,...
seobook;1;1;0;1300;4.54;http://www.seobook.com/;5.52;4.28;0.32;379000;0.62,0.81,...
...
```

```python
# Python example using requests to fetch domain organic keywords
import requests

api_url = "https://api.semrush.com/"
params = {
    'type': 'domain_organic',
    'key': 'YOUR_API_KEY',
    'domain': 'seobook.com',
    'database': 'us',
    'display_limit': 10,
    'export_columns': 'Ph,Po,Pp,Pd,Nq,Cp,Ur,Tr,Tc,Co,Nr,Td',
    'display_sort': 'tr_desc'
}

response = requests.get(api_url, params=params)
print(response.text)
```

Replace 'YOUR_API_KEY' with your actual Semrush API key.
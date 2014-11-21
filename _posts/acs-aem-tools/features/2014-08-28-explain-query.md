---
layout: acs-aem-tools_feature
title: Explain Query
description: Understand how Oak's query engine is executing queries
date: 2014-08-28
thumbnail: /images/explain-query/thumbnail.png
initial-release: 0.0.12
categories: acs-aem-tools
tags: acs-aem-tools-features
---

## Getting Started

> Explain Query only works on AEM6 with Oak based repositories (TarMK/MongoMK)

Install the ACS AEM Tools package via the AEM Package Manager and then open Explain Query from the AEM Tools console, or directly at [/etc/acs-tools/explain-query.html](http://localhost:4502/etc/acs-tools/explain-query.html)

To get to the AEM Tools console from the Touch UI, from the left rail navigation, select Tools > ACS AEM Tools > Explain Query.

## Overview

Explain Query is a tool that explains how Oak is executing a query. For any given query, Oak attempts to figure out the best way to execute based on the repositories defined Oak indexes (under /oak:index). Depending on the query, different indexes may be chosen by Oak. Understanding how Oak is executing a query is the first step to optimizing the query.

![Explain Query]({{ site.data.acs-aem-tools.baseurl }}/images/explain-query/screenshot.png)

Explain Query has several features:

* Xpath, JCR-SQL and JCR-SQL2 support
* Option to execute the provided query and report the acutal query execution time
* Slow query detection; Explain query will warn you about potentially slow queries. 
* Reports the Oak indexed used to execute the query
* Displays the actual Oak Query engine explanation
* Provides click-to-load list of Slow and Popular queries

![Explain Query - Slow and Popular Queries]({{ site.data.acs-aem-tools.baseurl }}/images/explain-query/slow-and-popular.png)

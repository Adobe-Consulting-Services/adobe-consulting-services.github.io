---
layout: acs-aem-tools_feature
title: Query Editor
description: Build and debug QueryBuilder queries in real time!
date: 2014-03-23 01:00:00
thumbnail: /images/query-editor/thumbnail.png
initial-release: 0.0.4
tags: acs-aem-tools-features new
---

QueryEditor is a WebUI that allows QueryBuilder queries to be written, executed and debugged in real time.  

## Getting Started

![AEM Tools]({{ site.data.acs-aem-tools.baseurl }}/images/query-editor/miscadmin.png)


Install the ACS AEM Tools package via the AEM Package Manager and then open Query Editor from the AEM Tools console, or directly at [/etc/acs-tool/query-editor.html](http://localhost:4502/etc/acs-tools/query-editor.html)

> To get to the AEM Tools console from the Touch UI, from the left rail navigation, select Tools > Operations > Configuration.

![Query Editor]({{ site.data.acs-aem-tools.baseurl }}/images/query-editor/query-editor.png)

Simply enter your [QueryBuilder](http://dev.day.com/docs/en/cq/current/dam/customizing_and_extendingcq5dam/query_builder.html) params in the left editor pane, and the results will display in the right pane.

Querying can be set to "Auto Query" which will execute and display the results of the QueryBuilder query from the left pane and its input, or this can be disabled and manual execution of the query can be triggered via the "Run Query" button in the top right.

## Pro Tip
* To activate code completion, press `Ctrl-Space`.
* On a Mac, `Cmd-click` on a any `path` value in the results to jump to that result in CRXDE Lite.

![Query Editor - Cmd Click]({{ site.data.acs-aem-tools.baseurl }}/images/query-editor/cmd-click.png)


## Warning

* Be careful when using "Auto Query" mode as you made inadvertantly intiate an expensive query and cause your Query Editor to be temporarily unresponsive.

## Links

* [QueryBuilder Docs](http://dev.day.com/docs/en/cq/current/dam/customizing_and_extendingcq5dam/query_builder.html)
* [QueryBuiler Predicate Evaluators](http://dev.day.com/docs/en/cq/current/javadoc/com/day/cq/search/eval/PredicateEvaluator.html)
* [QueryBuilder Introductory Slidedeck](http://www.slideshare.net/alexkli/cq5-querybuilder-adapttoberlin-2011)
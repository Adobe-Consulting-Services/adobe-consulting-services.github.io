---
layout: acs-aem-commons_feature
title: Sort JCR Nodes
description: Need to alphabetize child pages or tags?
feature-tags: authoring administration
---

## Purpose

Sort Nodes is a tool to sort child nodes by node name or jcr:title, for example, to alphabetize pages or tags in Sites Admin .

## How to Use

### AEM GUI
In AEM, navigate to the Tools > ACS AEM Commons > Sort JCR Nodes

In the path field, enter the the target path to sort. You choose whether to sort by node name (default) or by jcr:title and whether sort should be case-sensitive.

![Sort Nodes - Web UI](images/sort-nodes.png)

### HTTP POST

The code in ACS Commons extends the [Sling POST Servlet](https://sling.apache.org/documentation/bundles/manipulating-content-the-slingpostservlet-servlets-post.html) with the `acs-commons:sortNodes` operation which makes sorting script-friendly. 

####  sort children of /content/someFolder by node name, case-insensitive (defaults)
```
curl -F":operation=acs-commons:sortNodes" http://localhost:4502/content/someFolder
```
####  sort children of /content/someFolder by jcr:title, case-sensitive 
```
curl -F":operation=acs-commons:sortNodes" \
-F":byTitle=true" \
-F":caseSensitive=true" \
http://localhost:4502/content/someFolder
```


### Request Parameters



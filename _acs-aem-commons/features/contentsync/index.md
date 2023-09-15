---
layout: acs-aem-commons_feature
title: Content Sync
description: Synchronize content between AEM instances.
date: 2023-08-02
tags: aem-65 aem-cs
initial-release: 6.2.0
---

## Purpose
Incrementally synchronize content between AEM Author instances.

ACS Content Sync is yet another solution aiming to overcome the shortcomings of using CRX Package Manager / VLT RCP 
to copy content between AEM environments.

### Why do I need Content Sync?
Using CRX Package Manager to copy content between AEM environments has a number of limitations:

- CRX Package Manager requires escalated access, which is not always possible, especially in production environments
- Installing a package resets the version history.  
- There are challenges to set up incremental updates.

### What can I sync?
In general - any content resources, like
- Pages
- Assets
- Experience Fragments
- Content Fragments
- Tags

### How does Content Sync Work?
Content Sync uses JSON Export/Import between Sling GET/POST servlets. The tool fetches a catalog of resources from the source instance, e.g.
```
/content/path1  lastModified1
/content/path2  lastModified2
/content/path3  lastModified3
```
then it compares it with the local state, computes the delta and synchronizes it via JSON Export/Import.

### What can I sync?
In general - any content resources, like

- Pages
- Assets
- Experience Fragments
- Content Fragments
- Tags
- /conf/* data

### How many HTTP calls does Content Sync make?
The ballpark estimation is O(N) where N is the number of content resources (cq:Page, dam:Asset, etc.) being sync-ed.
For example, it takes an HTTP call to sync a `cq:Page` resource, so to sync a tree of _N_ `cq:Page` nodes the tool will make minimum _N_ HTTP calls.
To sync a _dam:Asset_ resource the tool will make an HTTP call to grab the _jcr:content_ and sub-nodes, and an HTTP call  to grab binary data for each rendition. 

## Features
- AEM CS compatible, e.g. you can sync https://author-xxxxx.adobeaemcloud.com from https://author-yyyyy.adobeaemcloud.com
- Binary data is preserved
- Version history is preserved
- Node ordering is preserved
- Incremental updates based on _jcr:lastModified/cq:lastModified_

## How to Use

In order to use the Content Sync tool, you need the latest version of ACS Commons installed on the source and target AEM instances.

### Configure Sling Get Servlet
Create an OSGi configuration for PID `org.apache.sling.servlets.get.DefaultGetServlet` and make sure that:
- JSON Renderer is enabled
- JSON Max Results parameter is set to at least 1000
- Legacy ECMA date format is unchecked

  ![image](images/sling-get-servlet.png)

### Configure the host(s) to synchronize from

Navigate to the Content Sync tool http://localhost:4502/apps/acs-commons/content/contentsync.html and click the _Configure_
button in top right corner:

![image](images/configure.png)

Add a host to synchronize from: 
![image](images/configure-host.png)

The _contentsync-user_ user needs read permissions on the content you are going to sync. 

### Run the Content Sync tool
Navigate to the Content Sync tool http://localhost:4502/apps/acs-commons/content/contentsync.html and select a path to synchronize.
The default mode is Incremental, which means only new or modified resources will be downloaded. If the Incremental option is unchecked
then the tool will do full sync and download the entire content tree.

The 'On-complete' workflow option allows you to define a custom post-update action. 
For example, you can define a workflow to clear properties like cq:replicationStatus, or automatically publish a resource
if it is published in the source environment.

![image](images/sync.png)

## Pluggable Update Strategy
The strategy to select incremental delta is pluggable.
The default algorithm is based on the _cq:lastModified/jcr:lastModified_ timestamp.
As an example, Content Sync ships with _AssetChecksumStrategy_ strategy which synchronizes dam:Asset nodes based 
on the _dam:sha1_ checksum in the asset metadata.

Users can plug-in their custom strategies by implementing _com.adobe.acs.commons.contentsync.UpdateStrategy_ interface;


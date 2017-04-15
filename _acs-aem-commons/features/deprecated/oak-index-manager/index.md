---
layout: acs-aem-commons_feature
title: Oak Index Manager
description: Get Oak index status and re-index too!
date: 2014-07-23
redirect_from: /acs-aem-commons/features/oak-index-manager.html
tags: deprecated
feature-tags: administration
initial-release: 1.7.0
---

## Why is this deprecated?

AEM 6.2+ now contains a better and more current version of Oak Index Manager located at:

* [http://localhost:XXXX/libs/granite/operations/content/diagnosis/tool.html/granite_oakindexmanager](http://localhost:4502/libs/granite/operations/content/diagnosis/tool.html/granite_oakindexmanager)


## Purpose

Finding and reindexing Oak Indexes in AEM6 can be a chore as the number of indexes grow large. Oak Index Manager provides a simple WebUI for viewing existing indexes, if they are re-indexing and the ability to initiate re-indexing.

## Prerequisites

An AEM6 Oak-based repository is required. This does not work with a Jackrabbit 2/CRX2 based repository.

## How to Use

1. Install the ACS AEM Commons package
2. As the "admin" user, open Tools > ACS Commons > Oak Index Manager

![image](iamges/screenshot.png)

## Caution!

Re-indexing can be an expensive operation. Please ensure you understand the impact of the system before performing a reindex, and especially a bulk re-index.
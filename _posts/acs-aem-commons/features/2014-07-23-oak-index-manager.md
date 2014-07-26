---
layout: acs-aem-commons_feature
title: Oak Index Manager
description: Get Oak index status and re-index too!
date: 2014-07-24
thumbnail: /images/oak-index-manager/thumbnail.png
feature-tags: administration
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.7.0
---

## Purpose

Finding and reindexing Oak Indexes in AEM6 can be a chore as the number of indexes grow large. Oak Index Manager provides a simple WebUI for viewing existing indexes, if they are re-indexing and the ability to initiate re-indexing.

## Prerequisites

An AEM6 Oak-based repository is required. This does not work with a Jackrabbit 2/CRX2 based repository.

## How to Use

1. Install the ACS AEM Commons package
2. As the "admin" user, open Tools > ACS Commons > Oak Index Manager

![image](/acs-aem-commons/images/oak-index-manager/screenshot.png)

## Caution!

Re-indexing can be an expensive operation. Please ensure you understand the impact of the system before performing a reindex, and especially a bulk re-index.
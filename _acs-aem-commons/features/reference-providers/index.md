---
layout: acs-aem-commons_feature
title: Page and Design Reference Providers
description: Notify authors when dependencies need to be activated.
date: 2014-04-05
redirect_from: /acs-aem-commons/features/reference-providers.html
feature-tags: aem-65 aem-cs
initial-release: 1.6.0
---

## Purpose

Help authors avoid stale content by prompting them to activate referenced pages and designs.

![image](images/example.png)

> It is a known issue that custom reference providers, such as these, always show up under the "Unknown" category.

## How to Use

Both components need to be enabled by creating `sling:OsgiConfig` nodes named `com.adobe.acs.commons.wcm.impl.PagesReferenceProvider` and `com.adobe.acs.commons.wcm.impl.DesignReferenceProvider`. There are not any configurable properties, so just an empty node will suffice.

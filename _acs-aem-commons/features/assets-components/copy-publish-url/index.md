---
layout: acs-aem-commons_feature
title: Copy Publish URL
description: Grab the published asset URL!
sub-feature: true
date: 2017-10-24
feature-tags: authoring
initial-release: 3.12.0
last-updated-release: 4.0.0
---

## Purpose

AEM authors quickly want to grab the asset's publish URL for sharing or for use with external tools like Adobe Target.

## How to Setup

{% include acs-aem-commons/wrapper-client-library.html path='/apps/acs-commons/authoring/dam-copy-publishurl/.content.xml#L11-L17' %}

Note that your [AEM Externalizer](https://helpx.adobe.com/experience-manager/6-4/sites/developing/using/externalizer.html) OSGi service must be set up for the Publish URL to use the correct domain.

## How to Use

1. Ensure the asset is published
2. Click into the asset
3. Click the new **Get Publish URL** button
4. Copy the Publish URL


![Get Publish URL](images/dam-copy-publish-url.png)


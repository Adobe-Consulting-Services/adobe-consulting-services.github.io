---
layout: acs-aem-tools_feature
title: Resource Type/Template Updater
description: Update sling:resourceType and cq:Templates in bulk!
date: 2015-12-14
thumbnail: /images/csv-resource-type-updater/thumbnail.png
initial-release: 0.0.24
categories: acs-aem-tools
tags: acs-aem-tools-features
---

## Getting Started

Install the ACS AEM Tools package via the AEM Package Manager and then open CSV Resource Type (and cq:Template) Updater from the AEM Tools console, or directly at [/etc/acs-tools/tag-maker.html](http://localhost:4502/etc/acs-tools/csv-resource-type-updater.html)

To get to the AEM Tools console from the Touch UI, from the left rail navigation, select Tools > ACS AEM Tools > CSV Resource Type Updater.

## Overview

Resource Type Updater is a tool aimed at updating `sling:resourceType` and `cq:Template` properties in bulk; bulk meaning multiple nodes and multiple mappings.

Resource Type Updater takes a CSV file of 2 columns:

* Column 1: FROM value
* Column 2: TO value

Example CSV entry: `foundation/components/title,myapp/components/content/heading`

This tool supports updating `sling:resourceType` and `cq:template` properties as specified by in the WebUI at run time.

> If a resource to update is locked, this tools will report that resource as a failure and continue to the next candidate resource.

![CSV](/acs-aem-tools/images/csv-resource-type-updater/csv.png)

![WebUI Form](/acs-aem-tools/images/csv-resource-type-updater/web-ui.png)

![Results](/acs-aem-tools/images/csv-resource-type-updater/results.png)

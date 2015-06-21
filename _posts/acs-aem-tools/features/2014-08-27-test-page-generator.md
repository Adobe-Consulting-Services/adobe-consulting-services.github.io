---
layout: acs-aem-tools_feature
title: Test Page Generator
description: Generate tons of Pages for testing at scale
date: 2014-08-27
thumbnail: /images/test-page-generator/thumbnail.png
initial-release: 0.0.12
categories: acs-aem-tools
tags: acs-aem-tools-features
---

## Getting Started

> Explain Query only works on AEM6 with Oak based repositories (TarMK/MongoMK)

Install the ACS AEM Tools package via the AEM Package Manager and then open Test Page Generator from the AEM Tools console, or directly at [/etc/test-page-generator/test-page-generator.html](http://localhost:4502/etc/acs-tools/test-page-generator.html)

To get to the AEM Tools console from the Touch UI, from the left rail navigation, select Tools > ACS AEM Tools > Test Page Generator.

## Overview

Test Page Generator is a utility to automatically generator large numbers of pages to test and validate behaviors at scale.

![AEM Test Page Generator]({{ site.data.acs-aem-tools.baseurl }}/images/test-page-generator/screenshot-initial.png)

![AEM Test Page Generator - Filled Out]({{ site.data.acs-aem-tools.baseurl }}/images/test-page-generator/screenshot-filled-out.png)

* All Property values will be stored as String or String[]
* Denote String[] properties by checking Multi and comma-delimitting the values
* Server-side evaluated JavaScript can be used to create "dynamic values" in properties; If the property value begins with {{ and ends with }} the contents of the braces will be evaluated by the JS Script Engine.
  * All JS must evaluate to a String or Number; expressions evaluating to a JavaScript object will fail.
* Buckets can be created as CQ Pages or Folders (Since v.0.0.18)

![AEM Test Page Generator - Running]({{ site.data.acs-aem-tools.baseurl }}/images/test-page-generator/screenshot-running.png)

* Be patient while it runs; Large generators can take some time. Performance will differ based on TarPM vs TarMK vs MongoMK as well

![AEM Test Page Generator - Complete]({{ site.data.acs-aem-tools.baseurl }}/images/test-page-generator/screenshot-complete.png)

* When complete, some information will be provided and a link to the new content tree in CRXDE Lite

![AEM Test Page Generator - Results]({{ site.data.acs-aem-tools.baseurl }}/images/test-page-generator/screenshot-crxdelite.png)

* Spot-check your generated pages to make sure everything looks good!

---
layout: acs-aem-tools_feature
title: CSV Resource Type Updater
description: Changing sling:resourceType and cq:template has never been simpler!
date: 2015-10-20
thumbnail: /images/csv-resource-type-updater/thumbnail.png
categories: acs-aem-tools
tags: acs-aem-tools-features new
initial-release: 0.0.24
---

## Getting Started

Install the ACS AEM Tools package via the AEM Package Manager and then open CSV Resource Type Updater from the AEM Tools console, or directly at [/etc/acs-tools/csv-resource-type-updater.html](http://localhost:4502/etc/acs-tools/csv-resource-type-updater.html)

To get to the AEM Tools console from the Touch UI, from the left rail navigation, select Tools > ACS AEM Tools > CSV Resource Type Updater.

## Overview

CSV Resource Type Updater is a tool that bulk updates `sling:resourceType` or `cq:template` properties based on CSV map file.

## Important Considerations

On Oak based AEM instances, ensure that there are Oak Indexes for `sling:resourceType` and `cq:template` before running. These should be installed with AEM 6.0+.

## How to Use

Create the a CSV that contains the current value in the first column and the target value in the second column.

> Note: When updating both sling:resourceType and cq:template two CSV files are required; one CSV for sling:resourceType and another for cq:template.

![CSV Resource Type Updater - CSV](/acs-aem-tools/images/csv-resource-type-updater/csv.png)

Upload the CSV file, define the content tree to consider and select the property to update (`sling:resourceType` or `cq:template`). The other options can be left as default (unless you know you need to change them and why).


![CSV Resource Type Updater UI](/acs-aem-tools/images/csv-resource-type-updater/web-ui.png)

Press the Update button and be patient.

A list of paths that were successfully updated will display. If any failures occur, these will be listed as well.

Normally failures occur because the resource is LOCKED.

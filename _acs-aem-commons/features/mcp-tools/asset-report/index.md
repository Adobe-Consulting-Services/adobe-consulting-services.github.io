---
layout: acs-aem-commons_feature
title: Asset Reporting
description: Details reporting on all your assets
date: 2017-09-01
initial-release: 3.10.0
tags: aem-65 aem-cs
---

This reporting process identifies how much space is being used in a folder and its subfolders across all assets.

![Asset Report](./images/asset-report.png)

* **Folder**: Base path to start the report from
* **Levels**: Number of levels to report.

It is worth noting that levels only dictates how granular the report will be, but all folders will be scanned regardless.  The report indicates for a folder, how much cumulative space is used by the assets in that folder as well as all subfolders from that level.  So even if it isn't indicated in the report, the roll-up behavior means it should capture everything regardless.

---
layout: acs-aem-commons_feature
title: Responsive Column Control
description: Give your authors maximal column layout flexibility.
date: 2014-01-14
redirect_from: /acs-aem-commons/features/responsive-column-control.html
tags: deprecated
initial-release: 1.5.0
---

## Why is this deprecated?

Since AEM 6.2, responsive columns (or any column for that matter) should be defined using using the AEM Layout Container and Template Editor approach.


## Purpose

This generic column control component allows authors to define column widths as a percentage.

![Responsive Column Control Dialog](images/dialog.png)


## How to Use

1. Ensure that *either* the `acs-commons.components` client library is embedded into your site's client library or the `acs-commons.main` client library is included on your pages (this library embeds `acs-commons.components`).
2. Enable the "Responsive Column Control" component using Design Mode.

## Notes

**Before removing columns**, delete or move any components from these columns. Once a column is deleted, any component data placed in deleted columns will persist in CRX, however it will be inaccessible to authors and end users, requiring application support team to delete. 
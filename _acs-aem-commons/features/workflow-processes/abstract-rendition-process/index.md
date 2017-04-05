---
layout: acs-aem-commons_feature
title: Abstract Rendition Modifying Process
description: Ease your workflow development
sub-feature: true
date: 2013-10-02
initial-release: 1.0.0
---

## Purpose
Abstract asset workflow which performs some action on a particular rendition (which was presumably created by an earlier workflow process).

## How to use
1. Install the ACS AEM Commons package
2. Add the ACS AEM Commons bundle as a dependency to your code project
3. Extend the `com.adobe.acs.commons.dam.AbstractRenditionModifyingProcess` and implement the abstract methods.

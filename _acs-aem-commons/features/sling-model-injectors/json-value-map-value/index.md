---
layout: acs-aem-commons_feature
title: JSON ValueMap Value Injector
description: Injects a value from a JSON object
date: 2019-02-05
feature-tags: backend-dev
initial-release: 4.0.0
---

## Purpose

Parses a Resource property value that contains a JSON object (as a String), and returns the value in the JSON obeject at the provided key.

* Supports a List, Collection, Set or Single value.
* Note: not supported by the javax.Inject annotation because of performance reasons. Only direct annotation is supported.


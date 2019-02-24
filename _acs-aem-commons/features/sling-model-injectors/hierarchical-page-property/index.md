---
layout: acs-aem-commons_feature
title: Hierarchical Page Property Injector
description: Injects a hierarchical page property
date: 2019-02-05
feature-tags: backend-dev
initial-release: 4.0.0
---

## Purpose

Injects a hierarchical page property.

 * Traverses upwards in the page hierarchy until the property is found.
 * Note: not supported by the javax.Inject annotation because of performance reasons. Only direct annotation is supported.

## Example

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @HierarchicalPageProperty
        private String inheritedTitle;

        ...
    }
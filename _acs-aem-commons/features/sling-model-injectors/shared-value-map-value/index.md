---
layout: acs-aem-commons_feature
title: Shared Component Properties Injector
description: Injects a Shared Component property
date: 2018-05-05
tags: aem-65 aem-cs
initial-release: 3.17.0
---

## Purpose

Provides convenience for for accessing Shared Properties as implemented by ACS Commons [Shared Component Properties](/acs-aem-commons/features/shared-component-properties/index.html).

## How to Use

The feature is very similar in usage to the standard `ValueMapValue` annotation.

## Example

    @Model(adaptables = {SlingHttpServletRequest.class, Resource.class})
    public final class SharedComponentPropsExampleModel {

        @SharedValueMapValue(type = SharedComponentProperties.ValueTypes.SHARED)
        private String sharedProp;

        @SharedValueMapValue(type = SharedComponentProperties.ValueTypes.GLOBAL)
        private String globalProp;

        // type will be MERGED by default
        @SharedValueMapValue
        private String mergedProp;
    }

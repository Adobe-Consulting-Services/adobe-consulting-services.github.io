---
layout: acs-aem-commons_feature
title: Shared Component Properties Injector
description: Injects a Share Component property
date: 2018-05-05
feature-tags: backend-dev
initial-release: 3.17.0
---

## Purpose

Provides convenience for for accessing Shared Properties as implemented by ACS Commons [Shared Component Properties](/acs-aem-commons/features/shared-component-properties/index.html).

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

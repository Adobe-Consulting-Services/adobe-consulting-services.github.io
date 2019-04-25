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

        @SharedValueMapValue(name = "titleText", type = SharedComponentProperties.ValueTypes.SHARED)
        private String shared;

        @SharedValueMapValue(name = "titleText", type = SharedComponentProperties.ValueTypes.GLOBAL)
        private String global;

        @SharedValueMapValue(name = "titleText", type = SharedComponentProperties.ValueTypes.MERGED)
        private String merged;

        public String getGlobal() {
            return global;
        }

        public String getShared() {
            return shared;
        }

        public String getMerged() {
            return merged;
        }
    }

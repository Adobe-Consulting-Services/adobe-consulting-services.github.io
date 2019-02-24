---
layout: acs-aem-commons_feature
title: i18n Injector
description: Injects a localized property value
date: 2019-02-05
feature-tags: backend-dev
initial-release: 4.0.0
---

## Purpose

Injects I18n text into a field, based on the underlying resource in case of resource adaptation, or request.

 * Note: not supported by the javax.Inject annotation because of performance reasons. Only direct annotation is supported.

## Example

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @I18N
        private String localizedTitle;

        ...
    }
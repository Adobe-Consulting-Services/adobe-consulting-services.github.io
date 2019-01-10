---
layout: acs-aem-commons_feature
title: I18n Sling Models Injector
description: Inject I18n object or values into your Sling Models classes
date: 2014-04-08
redirect_from: /acs-aem-commons/features/aem-sling-models-injectors.html
feature-tags: backend-dev, new
tags: new
initial-release: 4.0.0
---

## Purpose

Allows for [Sling Models](http://sling.apache.org/documentation/bundles/models.html) classes and interfaces to be injected with I18n objects and / or values.

Injections are available when adapting either a `Resource` or `SlingHttpServletRequest` object.
Note: Out of performance reasons, only the I18n can be injected using the generic `@Inject`. The String values need to be annotated with `@I18N`.

## Example

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @I18N
        private I18n i18n;

        @I18N("com.adobe.i18n.backButtonText")
        private String backButtonText
        
        @PostConstruct
        public void init(){
            String text = i18n.get("com.adobe.i18n.backButtonText");
            //do something
        }
        
        public String getBackButtonText() {
            return backButtonText;
        }
    }

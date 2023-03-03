---
layout: acs-aem-commons_feature
title: Child Resource From Request Injector
description: Injects a resource as a sling model, using a sling request as the adaptable
date: 2019-06-12
feature-tags: aem-65 aem-cs
initial-release: 4.2.0
---

## Purpose

This injector is similar to the standard `@ChildResource` injector provided by sling, but with a key difference in that
it uses a mock request object pointed to the resource path as the adaptable, allowing the sling model to reference the
request and other sling bindings not otherwise accessible when adapting a resource directly.  This is particularly
useful when injecting instances of WCM Core components, which are generally not adaptable from `Resource` and thus
fail to inject via the standard `@ChildResource` injector. 

## How to Use

The feature is very similar in usage to the standard `ChildResource` annotation.

## Example

    @Model(adaptables = {SlingHttpServletRequest.class})
    public final class ParentModel {
        @ChildResourceFromRequest
        private ChildModel child;
    
        @ChildResourceFromRequest
        private List<ChildModel> childList;
    }

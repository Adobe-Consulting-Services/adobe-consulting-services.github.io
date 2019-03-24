---
layout: acs-aem-commons_feature
title: Hierarchical Page Property Sling Models Injector
description: Inject Hierarchical Page ValueMap properties in your sling model
date: 2019-02-08
redirect_from: /acs-aem-commons/features/aem-sling-models-injectors.html
feature-tags: backend-dev, new
tags: new
initial-release: 4.0.0
---

## Purpose

Allows for [Sling Models](http://sling.apache.org/documentation/bundles/models.html) to inject a inherited page property (jcr:content of the page) into your sling model.
This works whether you have your sling model on the page itself, or if you have a resource that resides under a page.
Used PageManager.getContainingPage to retrieve the page.

If the property is not on the current page, will use InheritanceValueMap to attempt to retrieve property from parent pages.
Notice: Please consider if using context aware configuration is better for your use case.

Apart from above, behaves exactly like @ValueMapValue, which supports a single primitive value, or a list / collection / array of primitives.
Injections are available when adapting either a `Resource` or `SlingHttpServletRequest` object.
Note: Out of performance reasons, only works with `@HierarchicalPageProperty` as annotation, not `@Inject`.

## Example

    //we set our design property (cq:designPath) on our language root page.
    //now we want to use that property in a component that is somewhere down in the hierarchy.

    //design property located on:  /content/acs-commons/en/jcr:content

    //injected resource path:      /content/acs-commons/en/page/jcr:content/mycomponent

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @HierarchicalPageProperty("cq:designPath")
        private String design designPath;

        public String getDesignPath() {
            //outputs design property set on our language root page with path: /content/acs-commons/en
            return designPath;
        }
    }

---
layout: acs-aem-commons_feature
title: AEM Objects Sling Models Injector
description: Inject AEM objects into your Sling Models classes
date: 2014-04-08
redirect_from: /acs-aem-commons/features/aem-sling-models-injectors.html
tags: aem-65 aem-cs
initial-release: 1.6.0
---

## Purpose

Allows for [Sling Models](http://sling.apache.org/documentation/bundles/models.html) classes and interfaces to be injected with common AEM-related objects, namely those made available using `<cq:defineObjects/>`:

* `resource`
* `resourceResolver`
* `componentContext`
* `pageManager`

* `currentPage`
* `resourcePage`
* `designer`
* `currentDesign`
* `resourceDesign`
* `currentStyle`
* `session`
* `xssApi`

Also allows some direct injections that adapt from resourceResolver. (since 6.6.1)
This adapts if the field has the appropriate class declared.

* [TagManager](https://developer.adobe.com/experience-manager/reference-materials/6-5/javadoc/com/day/cq/tagging/TagManager.html)
* [AssetManager](https://developer.adobe.com/experience-manager/reference-materials/6-5/javadoc/com/adobe/granite/asset/api/AssetManager.html)
* [AssetManager - old interface](https://developer.adobe.com/experience-manager/reference-materials/6-5/javadoc/com/day/cq/dam/api/AssetManager.html)
* [QueryBuilder](https://developer.adobe.com/experience-manager/reference-materials/6-5/javadoc/com/day/cq/search/QueryBuilder.html)
* [ContentPolicyManager](https://developer.adobe.com/experience-manager/reference-materials/6-5/javadoc/com/day/cq/wcm/api/policies/ContentPolicyManager.html)
* [Externalizer](https://developer.adobe.com/experience-manager/reference-materials/6-5/javadoc/com/day/cq/commons/Externalizer.html)

Most injections are available when adapting either a `Resource` or `SlingHttpServletRequest` object, with these exceptions, which only work when adapting a `SlingHttpServletRequest` object:

* `currentPage`
* `componentContext`
* `xssApi`
* `currentDesign`

## Example

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @AemObject
        private Page resourcePage;

        public Page getResourcePage() {
            return resourcePage;
        }
    }

---
layout: acs-aem-commons_feature
title: Tag Property Sling Models Injector
description: Inject a Tag object from your properties in your sling model
date: 2024-04-01
redirect_from: /acs-aem-commons/features/aem-sling-models-injectors.html
tags: aem-65 aem-cs
initial-release: 6.6.0
---

## Purpose

Allows for [Sling Models](http://sling.apache.org/documentation/bundles/models.html) to inject a Tag or Tags object from your properties in your sling model.
You can inject both a single Tag or a collection, list, set or array of Tags.

The property must be a String or a String array, and the value must be the tag ID or tag IDs.
The tag ID is the tag path, e.g. `/content/cq:tags/geometrixx-outdoors/seasons/summer`.

Injections are available when adapting either a `Resource` or `SlingHttpServletRequest` object.

Why not AEMObject for this purpose? Because we need to specify inheritance which is not possible with AEMObject.
AemObject also does not provide a value method, which is needed to easily specify the property key.
Also, AEMObject works on bindings / context, and this injection resolves from a property value.

## Example - inject a single Tag from component property "myTag"

    import com.adobe.acs.commons.models.injectors.annotation.TagProperty; 

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        // if more then 1 tag is selected, only the first one will be injected
        // myTag can be both a normal String or a String array
        @TagProperty
        private Tag myTag;

        public Set<Tag> getTags()() {
            // gets the tags
            return tagSet;
        }
    }


## Example - inject Tags from the Page Properties into the component Model

    import com.adobe.acs.commons.models.injectors.annotation.TagProperty;

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @Via(type = PageContentResourceViaType.class)
        @TagProperty("cq:tags")
        private Set<Tag> tagSet;

        public Set<Tag> getTags()() {
            // gets the tags
            return tagSet;
        }
    }


## Example - inject Tags from the Page Properties into the component Model, inherited upwards until a page with tags is found

    import com.adobe.acs.commons.models.injectors.annotation.TagProperty;

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @Via(type = PageContentResourceViaType.class)
        @TagProperty(value="cq:tags", inherit = true)
        private Set<Tag> tagSet;

        public Set<Tag> getTags()() {
            // gets the tags
            return tagSet;
        }
    }

---
layout: acs-aem-commons_feature
title: Hierarchical Page Property Sling Models Injector
description: Inject Hierarchical Page ValueMap properties in your sling model
date: 2019-02-08
redirect_from: /acs-aem-commons/features/aem-sling-models-injectors.html
tags: aem-65 aem-cs
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
        private String designPath;

        public String getDesignPath() {
            //outputs design property set on our language root page with path: /content/acs-commons/en
            return designPath;
        }
    }

# Updates in 6.6.0
## Via adapter - get the page content resource to adapt from


    // our page sling model, based upon the page jcr:content resource.
    @Model(adaptables = { Resource.class },
    adapters = { TestModel.class}
    )
    @Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
    public class TestModel {
    
        @Optional
        @ValueMapValue
        private String myVal;
    
        public String getMyVal() {
            return myVal;
        }
    }

    // our component sling model, referencing the page sling model
    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

            //inject our page sling model from the page jcr:content. easy!
            @Via(type = PageContentResourceViaType.class, value = "resourcePage")
            @Self(injectionStrategy = InjectionStrategy.OPTIONAL)
            PageModel testModel;
    }

### You can do more with the Via annotation! Example, inject ValueMap values, although we already have that in annotations.

    // our component sling model, referencing the page sling model
    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

            //inject our page sling model from the page jcr:content. easy!
            @Via(type = PageContentResourceViaType.class, value = "resourcePage")
            @ValueMapValue
            private String myVal;
    }

## Example - currentPage (useful when using request wrappers)

    //we set our design property (cq:designPath) on our language root page.
    //now we want to use that property in a component that is somewhere down in the hierarchy.

    //design property located on:  /content/acs-commons/en/jcr:content

    //current page path:      /content/acs-commons/en/page/jcr:content/mycomponent

    //resource page path:      /content/acs-commons/en/other-page

    //resource included path:      /content/acs-commons/en/other-page/jcr:content/mycomponent

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @HierarchicalPageProperty(value="cq:designPath", useCurrentPage=true)
        private String designPath;

        public String getDesignPath() {
            //outputs design property set on our language root page with path: /content/acs-commons/en
            return designPath;
        }
    }

## Example - currentPage (useful when using request wrappers)

    public class TestModel {

         /**
         * Start traversing upwards in the hierarchy from a specific level, skipping lower levels.
         * @since 6.0.16
         * @see https://developer.adobe.com/experience-manager/reference-materials/6-5/javadoc/com/day/cq/wcm/api/Page.html#getAbsoluteParent-int-
         *   | level | returned                        |
         *  |     0 | /content                        |
         *  |     1 | /content/geometrixx             |
         *  |     2 | /content/geometrixx/en          |
         *  |     3 | /content/geometrixx/en/products |
         *  |     4 | null
         * If we'd use 1 in this example, we would skip over level 2 and 3.
        */
        @HierarchicalPageProperty(traverseFromAbsoluteParent  = 1)
        private String skipLevelHierarchicalPagePropertyString;

        public String getSkipLevelHierarchicalPagePropertyString() {
            //outputs design property set on our language root page with path: /content/acs-commons/en
            return skipLevelHierarchicalPagePropertyString;
        }
    }

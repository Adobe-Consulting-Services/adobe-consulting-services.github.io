---
layout: acs-aem-commons_feature
title: Content Policy Sling Models Injector
description: Inject values from the ContentPolicy (component or page) in your sling model
date: 2024-04-01
redirect_from: /acs-aem-commons/features/aem-sling-models-injectors.html
tags: aem-65 aem-cs
initial-release: 6.6.0
---

## Purpose

Allows for [Sling Models](http://sling.apache.org/documentation/bundles/models.html) to inject ValueMap values or perform adaptions from the content policy ValueMap into your sling model.




Injections are available when adapting either a `Resource` or `SlingHttpServletRequest` object.

## Example - inject "linkDisabled" into the sling model, from the content policy set on the component level
    import com.adobe.acs.commons.models.injectors.annotation.ContentPolicyValue;

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {
    
            @ContentPolicyValue
            private boolean linkDisabled;
    }

## Example - inject "clientlibsAsync" into the sling model, from the content policy set on the page level

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {
    
           @ContentPolicyValue(usePagePolicy= true)
           private boolean clientlibsAsync;
    }

## Example - inject "linkDisabled" into the sling model, from the content policy set on the component level

    import com.adobe.acs.commons.models.via.annotations.ContentPolicyViaType;

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

            // use @Via to get the ContentPolicyValueMap object, then @ValueMapValue to get the value from the object
            @ValueMapValue
            @Via(type = ContentPolicyViaType.class)
            private boolean linkDisabled;
        
    }


    import com.adobe.acs.commons.models.via.annotations.ContentPolicyViaType;
## Example - inject "clientlibsAsync" into the sling model, from the content policy set on the page level
    import com.adobe.acs.commons.models.via.annotations.ContentPolicyViaType;

    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel
    {

            // in this case, use VIA_RESOURCE_PAGE to get the content policy from the page
            @ValueMapValue
            @Via(value=ContentPolicyViaType.VIA_RESOURCE_PAGE, type = ContentPolicyViaType.class)
            @Optional
            private boolean clientlibsAsync;
    }

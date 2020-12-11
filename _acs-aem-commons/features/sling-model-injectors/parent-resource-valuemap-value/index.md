---
layout: acs-aem-commons_feature
title: Parent Resource ValueMap Value Injector
description: Configure components to inherit parent component properties
date: 2020-12-10
redirect_from: /acs-aem-commons/features/parent-resource-valuemap-value.html 
feature-tags: backend-dev component-dev
initial-release: 4.9.0
---

## Purpose
Pulling parent component properties into the child component is currently not supported by Apache Sling Models.
Parent Resource ValueMap Value injector/annotation addresses the scenario in which one or more components have to inherit parent 
component properties. This annotation functions similarly to the `@ValueMapValue` annotation; it gets the parent 
component property into the Sling Model if available. Injections are available when adapting either a Resource 
or SlingHttpServletRequest object.

### Features
- It searches only the component hierarchy but not the page hierarchy and doesn't search the page properties.
- `maxLevel` can be configured on the annotation to set a limit on number of parent nodes to search and avoid overhead.
- No alteration of existing functionality, i.e instance-level component properties are unaffected.

### Problems Being Solved:
If there is a use-case in which multiple components inherit parent component properties, developers tend to:

- Create custom methods and implementing multiple times for different components
- Use JCR API to adapt Session/ResourceResolver to the respective parent component's node

## How to Use

- Inject the properties into your component’s Sling Model using the `@ParentResourceValueMapValue` annotation. 
- Set the `maxLevel` property value if you know the level of the parent, or the parent of the parent component, which 
has the property you need. 
- Please note that if `maxLevel` is not explicitly set, it will set to default value `-1`.

## Example
    @Model(adaptables = {Resource.class, SlingHttpServletRequest.class},
           adapters = {AccordionItem.class})
    public class AccordionItemImpl implements AccordionItem {
        
       @ParentResourceValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL, maxLevel = 2, name = "jcr:title")
       private String accordionTitle;
    
       @ParentResourceValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
       private String ctaButtonText;
    
       @ParentResourceValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
       private String ctaButtonLink;
    
       @ParentResourceValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL, maxLevel = 1)
       private Boolean enableCta;
    }
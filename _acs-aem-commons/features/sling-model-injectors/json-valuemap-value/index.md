---
layout: acs-aem-commons_feature
title: JsonValueMapValue Sling Models Injector
description: Inject JSON objects into your Sling Models classes
date: 2014-04-08
redirect_from: /acs-aem-commons/features/aem-sling-models-injectors.html
feature-tags: backend-dev, new
tags: new
initial-release: 4.0.0
---

## Purpose

Allows for [Sling Models](http://sling.apache.org/documentation/bundles/models.html) to inject a valuemap value (String or String array) that contain(s) valid JSON, to inject a compatible Object or list of Object.
The object must correspond to the JSON.

A single string property can be parsed into a valid corresponding POJO.

A string array property can be parsed into a:


* `Collection (List will be used)`
* `List`
* `Set`
* `Array`

Containing valid corresponding POJO.
Injections are available when adapting either a `Resource` or `SlingHttpServletRequest` object.


## Example


    String singleValue = resource.getValueMap().get("singleValue", String.class);
    //equals: {"property1": "somevalue", "property2": "othervalue"}
    
    String multiValue = resource.getValueMap().get("multipleValues", String[].class);
    //equals: {"property1": "somevalue", "property2": "othervalue"}, 
    //        {"property1": "anotherValue", "property2": "nothinginteresting"}
    


    //our POJO that represents the JSON 
    public class SimpleJsonPojo{
        private String property1;
        private Integer property2;
    }


    @Model(adaptables = { SlingHttpServletRequest.class, Resource.class })
    public class TestModel {

        @JsonValueMapValue
        private SimpleJsonPojo singleValue;
        
        @JsonValueMap("multipleValues")
        private List<SimpleJsonPojo> multipleList;
        
        @JsonValueMap("multipleValues")
        private Set<SimpleJsonPojo> multipleSet;
               
        @JsonValueMap("multipleValues")
        private SimpleJsonPojo[] multipleArray;
        
        public SimpleJsonPojo getSingleValue(){
            return singleValue;
        }

        public Set<SimpleJsonPojo> getMultipleSet() {
            return multipleSet;
        }
        
        public List<SimpleJsonPojo> getMultipleList() {
            return multipleList;
        }
                
        public SimpleJsonPojo[] multipleArray() {
            return multipleArray;
        }
    }

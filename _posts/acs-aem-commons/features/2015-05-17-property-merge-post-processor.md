---
layout: acs-aem-commons_feature
title: Property Merge POST Processor
description: Merge data into a single property
date: 2015-05-17
thumbnail: /images/property-merge-post-processor/thumbnail.png
feature-tags: component-dev
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.10.0
---

## Purpose

Collect data from multiple dialog inputs and combine them into a single property.

This is great for creating multiple Dialog inputs, say for tags, restricting each input specifically to that Tags use case, but storing the data to the common `cq:tags` property. 

While pointing multiple dialog fields to a single property and combining the values is supported, OOTB, each dialog field will display the combined set of values.

![Property Merge](/acs-aem-commons/images/property-merge-post-processor/property-merge.png)

## How to Use

Add the following POST parameters

	:<sourceProp1>@PropertyMerge=<destinationProp>
	:<sourceProp2>@PropertyMerge=<destinationProp>

	:<destinationProp>@PropertyMerge.AllowDuplicates=true|false
	:<destinationProp>@PropertyMerge.TypeHint=String|Date|Long|Double|Boolean

Example

	:aTags@PropertyMerge=abcTags
	:bTags@PropertyMerge=abcTags
	:cTags@PropertyMerge=abcTags
	:abcTags@PropertyMerge.AllowDuplicates=true
	:abcTags@PropertyMerge.TypeHint=String

	:dTags@PropertyMerge=deTags
	:eTags@PropertyMerge=deTags
	:deTags@PropertyMerge.AllowDuplicates=false
	:deTags@PropertyMerge.TypeHint=String
		
Adding the above as request params will merge aTags, bTags, cTags into abcTags and dTags, eTags into deTags

Note the `:` prefix to ensure these params are ignored by the OOTB Sling POST Servlet, and not written to the underlying resource.

#### Example of ExtJS Dialog XML
	
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="cq:Dialog"
    activeTab="0"
    xtype="tabpanel">
    <items jcr:primaryType="cq:WidgetCollection">
        <tab1
            jcr:primaryType="cq:Widget"
            xtype="panel">
            <items jcr:primaryType="cq:WidgetCollection">
            	<animal-tags
                    jcr:primaryType="cq:Widget"
                    fieldLabel="Animal Tags"
                    name="./animalTags"
                    xtype="tags"/>
            	<plant-tags
                    jcr:primaryType="cq:Widget"
                    fieldLabel="Plant Tags"
                    name="./plantTags"
                    xtype="tags"/>		
	            <cq-tags
                    jcr:primaryType="cq:Widget"
                    fieldLabel="Merged Tags"
                    name="./cq:tags"
					readonly="{Boolean}true"
                    xtype="tags"/>
                <animal-tags-property-merge
                    jcr:primaryType="cq:Widget"
                    ignoreData="{Boolean}true"
                    name=":animalTags@PropertyMerge"
                    value="cq:tags"
                    xtype="hidden"/> 
                <plant-tags-property-merge
                    jcr:primaryType="cq:Widget"
                    ignoreData="{Boolean}true"
                    name=":plantTags@PropertyMerge"
                    value="cq:tags"
                    xtype="hidden"/> 			
                <cq-tags-property-merge-allow-duplicates
                    jcr:primaryType="cq:Widget"
                    ignoreData="{Boolean}true"
                    name=":PropertyMerge.AllowDuplicates"
                    value="false"
                    xtype="hidden"/> 						
                <cq-tags-property-merge-type-hint
                    jcr:primaryType="cq:Widget"
                    ignoreData="{Boolean}true"
                    name=":PropertyMerge.TypeHint"
                    value="String"
                    xtype="hidden"/> 						
				</items>
			</tab1>
		</items>
</jcr:root>
{% endhighlight %}
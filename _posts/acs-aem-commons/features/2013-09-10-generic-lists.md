---
layout: acs-aem-commons_feature
title: Generic Lists
description: Easy creation of simple name/value pair lists
date: 2013-09-10
thumbnail: /images/generic-lists/thumbnail.png
feature-tags: component-dev backend-dev
tags: acs-aem-commons-features
categories: acs-aem-commons features
initial-release: 1.0.0
---

## Purpose

Generic Lists are a feature allowing easy creation and management of lists of title/value pairs.

## How to Use

### Creating Lists

Generic Lists are represented as CQ Pages under `/etc/acs-commons/lists`, e.g. `/etc/acs-commons/lists/age-ranges`. They are editable by using the Tools screen:

![image]({{ site.data.acs-aem-commons.baseurl }}/images/generic-lists/in-miscadmin.png)

On a list page, the items in the list are components within a parsys. New items can be created using the Sidekick. Items can be removed using the context menu.

![image]({{ site.data.acs-aem-commons.baseurl }}/images/generic-lists/editor.png)

### Using Lists in Classic UI Dialogs

One of the primary purposes of Generic Lists is to populate a selection widget in a component (or page) dialog. To do this, set the `options` configuration property to the list path *plus* `/jcr:content.list.json`. For example:

{% highlight xml %}
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Widget"
    fieldLabel="Target"
    name="./target"
    options="/etc/acs-commons/lists/age-ranges/_jcr_content.list.json"
    type="select"
    xtype="selection"/>
{% endhighlight %}

This can also be used in multifield scenarios.

In both cases, the JCR property will be set to the *value* of the list item.

### Using Lists in Touch UI Dialogs (since 1.8.0)

In a Touch UI dialog, a generic concept called a _datasource_ is used to populate select-style components. For this, you can use a Generic Lists-specific data source:

{% highlight xml %}
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="nt:unstructured"
    sling:resourceType="granite/ui/components/foundation/form/select"
    fieldLabel="Social Service"
    name="./social">
    <datasource
        jcr:primaryType="nt:unstructured"
        sling:resourceType="acs-commons/components/utilities/genericlist/datasource"
        path="/etc/acs-commons/lists/sharethis-services" />
</jcr:root>
{% endhighlight %}


### Using Lists in Touch UI Metadata Asset Editor (since 1.8.0)

In the Touch UI Metadata Asset Editor, you can provide the name to the list *prefixed* with _/mnt/acs-commons/lists_ (e.g. _ /mnt/acs-commons/lists/sharethis-services_ for _/etc/acs-commons/lists/sharethis-services_) as the JSON Path for a Dropdown list. You may optionally include the _json_ extension.

![image]({{ site.data.acs-aem-commons.baseurl }}/images/generic-lists/metadata-editor.png)

> One quirk of the Metadata Asset Editor is that the JSON support is not dynamic. You must update the editor when the list changes.

## API

You will frequently need to do two things with lists:

1. Get all the items in the list.
2. Lookup the title of a particular value from the list.

To do this, first obtain the `com.day.cq.wcm.api.Page` object for the list page:

{% highlight java %}
    PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
    Page listPage = pageManager.getPage("/etc/acs-commons/lists/targets");
{% endhighlight %}
    
Then adapt the `Page` object to a `com.adobe.acs.commons.genericlists.GenericList` object:

{% highlight java %}
    GenericList list = listPage.adaptTo(GenericList.class);
{% endhighlight %}

The `GenericList` interface has two methods:

* `getItems()` - returns a `java.util.List` of the items in the list.
* `lookupTitle(String)` - return the title of a particular value from the list.


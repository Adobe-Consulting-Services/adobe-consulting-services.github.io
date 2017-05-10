---
layout: acs-aem-commons_feature
title: Stylesheet Inliner
description: Replaces stylesheet references with &lt;style&gt; elements containing their contents
date: 2016-11-30
feature-tags: component-dev backend-dev
tags: 
initial-release: 2.9.0
---

## Purpose

Causes <link> elements referencing stylesheets to be inlined into output as <style> elements.  This is helpful when a page is to be used as an email, where external stylesheet references aren't often supported by email clients.  

Works for clientlibs and static resources. Links found in <head> will be added at the beginning of <body>, whereas those found in <body> will be added where they're found.

## How to Use

Add a Sling rewriter configuration node (example below) that includes the `inline-css` transformer type to you project. Requests with the "inline-css" selector will have their styles inlined.


### Note

This re-writer does **NOT** support

* URIs embedded in CSS or JavaScript
* Relative URIs, e.g. `etc/clientlibs/mysite/styles.css`
* URIs including a scheme, e.g. `http://example.com/etc/clientlibs/mysite/styles.css` and `//example.com/etc/clientlibs/mysite/styles.css`
* ClientLibs included by Javascript (e.g. when leveraging the property channels)

## Rewriter Configuration Node

The easiest way to configure the rewriter pipline is just to copy `/libs/cq/config/rewriter/default` to a path inside your application, e.g. `/apps/myapp/config/rewriter/inline-css`. Note that the configuration node *must* be inside a four-level path that ends in `config/rewriter`.

To validate that your configuration was successful, look at the Sling Rewriter tab in the OSGi Web Console.

	/apps/myapp/config/rewriter/inline-css.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="sling:Folder"
    contentTypes="[text/html]"
    enabled="{Boolean}true"
    generatorType="htmlparser"
    order="{Long}1"
    serializerType="htmlwriter"
    transformerTypes="[linkchecker,inline-css]"/>
{% endhighlight %}        

> Other transformers may or may not be necessary. Please refer to the default configuration at `/libs/cq/config/rewriter/default` to see the default set of transformers.

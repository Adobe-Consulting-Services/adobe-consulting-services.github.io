---
layout: acs-aem-commons_feature
title: Static Reference Rewriter
description: Minimize your static request size.
date: 2013-07-01
redirect_from: /acs-aem-commons/features/static-reference-rewriter.html
feature-tags: component-dev
tags: updated
initial-release: 1.0.0
---

## Purpose

Using only configuration, automatically rewrite HTML to serve images, CSS, JavaScript, and other static assets from an cookieless domain, as described in [Google's PageSpeed Recommendations](https://developers.google.com/speed/docs/best-practices/request#ServeFromCookielessDomain).

## Prerequisites

Before configuring this rewriter component, it is first necessary to set up at least one alternate domain. This requires some DNS work, possibly configuration changes in your web server and/or CDN. Ideally, this is a new top-level domain, e.g. `www.staticmysite.com`, but it is also possible to use a second-level domain, e.g. `static.mysite.com`. For sites with many static assets, you can set up multiple domains, using a technique called [Domain Sharding](http://www.stevesouders.com/blog/2009/05/12/sharding-dominant-domains/) to maximize the number of simultaneous requests the browser will issue. If you are using Domain Sharding, the domains must follow some definable pattern as described below.

## Configuration

### Component Configuration

First, you must configure the rewriter pipeline component. This is done using OSGi configuration. It is a factory component using the PID `com.adobe.acs.commons.rewriter.impl.StaticReferenceRewriteTransformerFactory`. This allows you to specify multiple configurations to handle multi-site deployments and/or deployments where a different domain is used for different path segments (i.e. `/etc/designs/site` on one domain and `/content/dam/site` on a different domain).

    /apps/myapp/config.prod/com.adobe.acs.commons.rewriter.impl.StaticReferenceRewriteTransformerFactory-SomeFriendlyName

> You will typically want to put this configuration under a runmode-specific folder, e.g. `config.prod` as the host pattern will be different per stage.

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    pipeline.type="mysite-static-refs"
    attributes="[img:src\,srcset,link:href,script:src]"
    matchingPatterns="[img:srcset;(\/content\/dam\/.+?[jpg|png]) .+?w]"
    host.count="{Long}2"
    host.pattern="static{}.mysite.com"
    prefixes="[/etc/designs/mysite,/content/dam/mysite]"/>
{% endhighlight %}

* `pipeline.type` - This is the pipeline component name which will be referenced from the rewriter configuration below.
* `attributes` - The list of HTML element/attribute pairs which will be rewritten.
* `matchingPatterns` (since 3.11.0) - The list of HTML element/attribute/regex patterns specifying how to find the url part in the attribute value. This is used to pre-prend host to more complex attribute values like in the case of srcset. The url part must be the first matching group within the pattern. This means that a call to Matcher.group(1) should return the url part of the complex value.
Format is: <element>:<attribute>;<regex-pattern>
* `host.count` - If you are using Domain Sharding, this is the number of domains.
* `host.pattern` - If you are *not* using Domain Sharding, this is simply the static host name. If you are using Domain Sharding, this will be a pattern used to generate the static domain names, replacing the string `{}` with a number between 1 and the `host.count` value.
* `prefixes` - This list of path prefixes which will be rewritten.

### Rewriter Pipeline Configuration

The easiest way to configure the rewriter pipline is just to copy `/libs/cq/config/rewriter/default` to a path inside your application, e.g. `/apps/myapp/config/rewriter/mysite. Note that the configuration node *must* be inside a four-level path that ends in `config/rewriter`.

To validate that your configuration was successful, look at the Sling Rewriter tab in the OSGi Web Console.

	/apps/myapp/config/rewriter/mysite.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="sling:Folder"
    contentTypes="[text/html]"
    enabled="{Boolean}true"
    generatorType="htmlparser"
    order="{Long}1"
    serializerType="htmlwriter"
    transformerTypes="[linkchecker,mysite-static-refs]"/>
{% endhighlight %}        

> Other transformers may or may not be necessary. Please refer to the default configuration at `/libs/cq/config/rewriter/default` to see the default set of transformers. Note that if you are using the [Versioned ClientLibs Rewriter]({{ site.data.acs-aem-commons.baseurl }}/features/versioned-clientlibs.html), that pipeline component must come *before* the Static Reference Rewriter.

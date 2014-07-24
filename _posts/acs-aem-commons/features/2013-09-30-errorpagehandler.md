---
layout: acs-aem-commons_feature
title: Error Page Handler
description: Create authorable error pages with ease
date: 2013-09-30
thumbnail: /images/errorpagehandler/thumbnail.png
feature-tags: authoring standard
tags: acs-aem-commons-features updated
categories: acs-aem-commons features
initial-release: 1.0.0
---

> New in version 1.6.0 the ACS AEM Commons Error Page Handler comes w a light in-memory TTL-based caching layer to greatly enhance performance.

## Purpose

Provide an author-able means for defining, creating and managing custom Error pages per content tree/site.

## Overview

### Edit/Design mode

#### 40x Handling
Author is displayed the corresponding error page

#### 50x Handling
Normal/OOTB 500x/Exception error handling behavior is respected. JSP exceptions are displayed inline w the JSP.

### Preview mode

#### 40x Handling
Author is displayed the corresponding Error page

#### 50x Handling

![image](/acs-aem-commons/images/errorpagehandler/preview-error-page.png)

A custom "Error page" is displayed that includes the Request Progress and Stack Trace.

### Disabled (Publish) mode

The corresponding Error page is displayed.

## How to Use

> Watch a [video on how to use the ACS AEM Commons Error Page Handler](http://aemcasts.com/aem/episode-11.html).

* Create the proxy overlays for Sling errorhandler scripts (404.jsp and default.jsp) which include the acs-commons counterparts.

Create the overlay for 404.jsp

    /apps/sling/servlet/errorhandler/404.jsp

{% highlight jsp %}
<%@page session="false"%><%
%><%@include file="/apps/acs-commons/components/utilities/errorpagehandler/404.jsp" %>
{% endhighlight %}


Then create the overlay for the default.jsp

    /apps/sling/servlet/errorhandler/default.jsp

{% highlight jsp %}
<%@page session="false"%><%
%><%@include file="/apps/acs-commons/components/utilities/errorpagehandler/default.jsp" %>
{% endhighlight %}

* In your base page implementation, add the following `cq:Widget` to the Page Properties dialog

{% highlight xml %}
<errorpages
    jcr:primaryType="cq:Widget"
    path="/apps/acs-commons/components/utilities/errorpagehandler/dialog/errorpages.infinity.json"
    xtype="cqinclude"/>
{% endhighlight %}

OR create a your own custom pathfield widget

{% highlight xml %}
<errorpages
    jcr:primaryType="cq:Widget"
    fieldLabel="Error Pages"
    fieldDescription="Error pages for this content tree"
    name="./errorPages"
    xtype="pathfield"/>
{% endhighlight %}


* Create a sling:OsgiConfig node to enable the Error Page Handler

  /apps/myapp/config/com.adobe.acs.commons.errorpagehandler.impl.ErrorPageHandlerImpl.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    enabled="{Boolean}true"
    serve-authenticated-from-cache="{Boolean}true"
    ttl="{Long}300"/>
{% endhighlight %}

> Note: ttl is the TTL of the in-memory error page cache in seconds

* Create a CQ Page that will act as the default Error page, and also contain all custom variations of error pages.
Each error page's "name" (Node name) should correspond to the HTTP Response Status code it should respond to.
  * 500: Internal Server Error
  * 404: Not Found
  * 403: Forbidden

  Typically only 404 and 500 are needed with everything else using the fallback (default error page) as the messaging around these tends to be less useful to Web site visitors.
A common pattern is to create this at the site's root under a node named "errors"
  
  * Ex. /content/geometrixx/en/errors

* Create any error-specific pages under this default error page created in Step 2. Note, it is critical that the page NAMES (node names) follow status codes. The Page Titles can be anything.

  * Ex. /content/geometrixx/en/errors/404
  * Ex. /content/geometrixx/en/errors/500

* Edit the Page Properties of the site's root node, and in the new "Error Pages" dialog input (Step 1) select the default error page (Step 2).
  
  * Ex. ./errorPages => /content/geometrixx/en/errors
* Further customizations can be made via the OSGi Configuration for the *ACS AEM Commons - Error Page Handler* Configuration, including a "System wide" fallback error page.

***Note:*** At this time the full Sling exception-name look-up scheme is not supported. Implementing a *500* error page is sufficient.



## In Memory TTL-based Cache (Since v1.5.0)

Introduced in ACS AEM Commons 1.5.0, Error Page Handler comes w an in-memory TTL based. It is recommended you upgrade to 1.5.0 and configure the cache per your requirements using the sling:OsgiConfig settings outlined above.


### JMX MBean

* The cache implementation is an implementation detail and may change over time without notice; This may change the MBean behavior, attributes and operations. *

An ErrorPageHandler MBean is available when the Error Page Handler is enabled. This MBean reports on the In Memory caches entries, size in KB, hit/miss rates. It also provides functionality to clear the cache and to view the contents of the cache.

![image](/acs-aem-commons/images/errorpagehandler/mbean-1.png)

Error Page Handler Cache overview

![image](/acs-aem-commons/images/errorpagehandler/mbean-2.png)

Viewing the contents of the cache for a particular entry


## Error Images (Since v1.7.0)

Introduced in ACS AEM Commons 1.7.0, Error Page Handler supports serving an "error image" in the event a request with a qualified "image" extension (jpg, jpeg, png and gif) cannot be found. The OSGi config properties described in futher detail below int he Advanced section can be used to configure this feature.

* error-images.enabled
* error-images.path


## Advanced Sling OSGi Configuration

The Error Page Handler has a few more advanced settings that are typically unused/left as default.

    /apps/myapp/config/com.adobe.acs.commons.errorpagehandler.impl.ErrorPageHandlerImpl.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    enabled="{Boolean}true"
    serve-authenticated-from-cache="{Boolean}true"
    ttl="{Long}300"
    error-page.system-path="/content/error"
    error-page.fallback-name="500"
    />
{% endhighlight %}

* `enabled` true/false to toggle the Error Page Handler on and off

* `cache.serve-authenticated` true allows authenticated requests to service the the in-memory cache. If your error pages do not contain any server-side personalization, this should be set to true to maximize cache effectiveness. (Since v1.5.0)

* `cache.ttl` TTL in seconds for the in-memory Error Page Handler cache; Defaults to 300 seconds (5 mins). (Since v1.5.0)

* `error-page.system-path` is the absolute path to system Error page resource to serve if no other more appropriate error pages can be found. Does not include extension.

* `error-page.fallback-name` defines the error page name (not path) to use if a valid Error Code/Error Servlet Name cannot be retrieved from the Request. Defaults to `500`

* `error-page.extension` defines the extension to call the fallback error page with; This is almost ALWAYS "html" unless the application is using non-standard extensions.

* `paths` define a list of valid inclusive content trees under which error pages may reside, along with the name of the the default error page for the content tree. This is a fallback/less powerful option to adding the `./errorPages`property to CQ Page property dialogs.

* `error-images.enabled` boolean value; true to enable, false to disable. Defaults to false. (Since version 1.7.0)

* `error-images.path` is a &lt;selectors.extension&gt; (ex. `.img.png`) absolute path to a nt:file image, or relative path to a image component resource.
If an extension or relative path, this value is applied to the resolved error page. (ex. if error-image.path is 'jcr:content/image.img.png' and the resolve error path is '/content/acme/error' then '/content/acme/error/jcr:content/image.img.png' will be used to render the image.). Defaults to '.img.png' which will render the error page's Page image. (Since version 1.7.0)


***Note: It is better to use the Page Properties-defined `errorPages` than the `paths` in the OSGi Configuration. Typically `paths` is left blank.***


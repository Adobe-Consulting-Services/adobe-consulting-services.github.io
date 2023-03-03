---
layout: acs-aem-commons_feature
title: Permission Sensitive Cache Servlet
description: Make your dispatcher cache respect ACLs.
date: 2017-12-05
redirect_from: /acs-aem-commons/features/permission-sensitive-cache.html
tags: aem-65 aem-cs
initial-release: 3.13.0
---

## Purpose

Reusable Permission Sensitive Cache Servlet to be used on the [/auth_checker](https://helpx.adobe.com/experience-manager/kb/PSCachingDelivery.html) configuration of the dispatcher

## How to use
* Create an sling:OsgiConfig config for `com.adobe.acs.commons.dispatcher.impl.PermissionSensitiveCacheServlet`.
* Add a multi String property `sling.servlet.paths`.
* Property value should be the path you want the `/url` config in the Dispatcher `/auth_checker` to call.

## Example OSGi Configuration
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="sling:OsgiConfig"
    sling.servlet.paths="[/bin/mysite/wcm/permissioncheck]"/>

{% endhighlight %}

## Example Dispathcer Configuration
{% highlight xml %}
/auth_checker
  {
  /url "/bin/mysite/wcm/permissioncheck"
       
  /filter
    {
    /0000
      {
      /glob "*"
      /type "deny"
      }
    /0001
      {
      /glob "*.html"
      /type "allow"
      }
    }

  /headers
    {
    /0000
      {
      /glob "*"
      /type "deny"
      }
    /0001
      {
      /glob "Set-Cookie:*"
      /type "allow"
      }
    }
  }

{% endhighlight %}

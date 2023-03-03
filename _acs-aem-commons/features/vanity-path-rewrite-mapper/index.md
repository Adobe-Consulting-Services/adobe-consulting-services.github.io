---
layout: acs-aem-commons_feature
title: Vanity Path Rewrite Mapper
description: Have your path rewriting and vanities too!
date: 2017-08-08
feature-tags: aem-65 aem-cs
initial-release: 3.10.0
---

## Purpose

This is for everyone that loathes /etc/maps! 

If you're a big fans of [using the Sling Resource Resolver Factory to rewrite outgoing URLs and httpd with mod_rewrite, to rewrite them back to AEM paths](http://www.cognifide.com/our-blogs/cq/multidomain-cq-mappings-and-apache-configuration/),
then you know the big draw-back with this approach is it prevents use of sling vanity paths, since they'll get `/content/xxx` slapped on the front of them by httpd, 
and thus not resolve to the actual sling vanity path. 

This feature uses a clever approach to handle sling vanity paths that are auto-prefixed by httpd, and make sure they resolve to the correct vanity resource.  

## How to use

### Via ACS AEM Commons Error Handler (v3.10.0+)

* In the [ACS AEM Commons Error Page Handler OSGi Configuration](http://localhost:4502/system/console/configMgr/com.adobe.acs.commons.errorpagehandler.impl.ErrorPageHandlerImpl), enable "Vanity Dispatch Check" (`vanity.dispatch.enabled="{Boolean}true"`).

### Via custom integration in the Sling Error Handler

* This feature injects itself into the request processing in Sling's 404 error handler. Create (or augment your existing) 404 overlay by creating/editing a file at: 

    `/apps/sling/servlet/errorhandler/404.jsp`

In your overlay `404.jsp` place (or incorporate) the following code:

{%highlight jsp%}    
<%@page session="false"
        import="com.adobe.acs.commons.wcm.vanity.VanityURLService"%><%
%><%@include file="/libs/foundation/global.jsp" %><%
    final VanityURLService vanityURLService = sling.getService(VanityURLService.class);
    
    if (vanityURLService != null && vanityURLService.dispatch(slingRequest, slingResponse)){
        return;
    }      
%><%@include file="/libs/sling/servlet/errorhandler/404.jsp" %>
{%endhighlight%}


## How this works

### Assume the following configuration

* Resource Resolver Factory removes the path prefix `/content/example`
* HTTPD mod_rewrite prepends `/content/example` to all requests that don't start will well known path prefixes (/content, /etc, /bin, etc.)

### The following HTTP Request processing describe the vanity path resolution

1. When a user clicks on a link to `/my-page.html`,
2. The HTTP request to `/my-page.html` passes through https/dispatcher and is prefixed with `/content/example`
3. The request is reverse proxied back to AEM, with the full and proper URL `/content/example/my-page.html` which resolve to a `cq:Page` and all is well.
4. When a user clicks on a link to vanity path `/my-vanity`
5. The HTTP request to `/my-vanity` passes through httpd/dispatcher and is prefixed with `/content/example` (since httpd doesnt know anything about vanities)
6. The request is reverse proxied back to AEM, with the invalid URL `/content/example/my-vanity` which AEM cannot resolve.
7. AEM sends the request to its internal Sling Error Handler for 404s
8. ACS Commons Vanity Path Rewrite Mapper hooks into Sling's 404 error handler 
9. In the 404 error handler, the ACS Commons VanityPathService does the following:
    1. `resourceResolver.map("/content/example/my-vanity")`  trims `/content/example` to `/my-vanity`
    2. A checks is ade to ensure the  mapped value (`/my-vanity`) is not the same original value (`/content/example/my-vanity`)
        * If it is, then its not a rewritten URL and the original 404 resolution is correct.
    3. `resourceResolver.resolve("/my-vanity")` determines if this new trimmed path (`/my-vanity`) resolves to a resource, including via `sling:vanityPaths`.
    4. If the call to `resolve(..)` returns `null,` then it's not a vanity path, and the original 404 is respected.
    5. Else if, the call to `resolve(..)` is NOT null, then it IS vanity path, and the user is forwarded to that resource.
---
layout: acs-aem-commons_feature
title: HTTP Caching Headers
description: Effortlessly control caching behavior for browser/CDN and Dispatcher
date: 2015-12-04
redirect_from:
    - /acs-aem-commons/features/dispatcher-ttl.html
    - /acs-aem-commons/features/dispatcher-ttl/index.html
tags: aem-65 aem-cs
initial-release: 2.2.0
---

> [!IMPORTANT]
> This feature was previously known as *Dispatcher TTL*, however it can also be used without the Dispatcher TTL feature therefore it has been renamed to the more generic name *HTTP Caching Headers*. The configuration PIDs still refer to the original name for backwards-compatibility reasons.


# Purpose

Easily set caching headers on responses as described in [RFC 9111](https://www.rfc-editor.org/rfc/rfc9111.html). This includes both `Cache-Control` and `Expires` headers. Those headers determine for how long a response is cached in both browsers as well as proxies/CDNs. Optionally the [Dispatcher](https://experienceleague.adobe.com/en/docs/experience-manager-dispatcher/using/dispatcher) can be configured to respect those headers as well.

You can configure cache expiration times (time-to-live, TTL) with either `Cache-Control` or `Expires` headers set through servlet filters (either [OSGi HTTP Whiteboard Spec 1.1](https://docs.osgi.org/specification/osgi.cmpn/7.0.0/service.http.whiteboard.html) or [Sling Filters](https://sling.apache.org/documentation/the-sling-engine/filters.html)) for specific request URL patterns or response types.

# How to Use

## Create OSGi Configurations

All servlet filters can be configured via **factory** configurations, i.e. you can configure arbitrarily many
filters with one of the mechanism outlined in <https://sling.apache.org/documentation/bundles/configuration-installer-factory.html>.
All filters are only ever active in case all the following conditions are met:

1. request method is GET
1. No URL parameters (can be overridden with boolean service property `allow.all.params`)
1. Request coming from AEM Dispatcher (`Server-Agent` request header is `Communique-Dispatcher`), see also the following note.

### Note

This feature expects that the Dispatcher was involved in the request chain. This expectation is managed via a known HTTP header. To simulate the Dispatcher, add the necessary HTTP header to the request:

> Server-Agent: Communique-Dispatcher

An example _cURL_ request to add this header:

> curl -v -H "Server-Agent: Communique-Dispatcher" http://localhost:4502/content/test -u admin:admin

The output of the above would be:

{% highlight bash %}
*   Trying ::1...
* connect to ::1 port 4502 failed: Connection refused
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 4502 (#0)
* Server auth using Basic with user 'admin'
> GET /content/test HTTP/1.1
> Host: localhost:4502
> Authorization: Basic YWRtaW46YWRtaW4=
> User-Agent: curl/7.43.0
> Accept: */*
> Server-Agent: Communique-Dispatcher
> 
< HTTP/1.1 404 Not Found
< Date: Tue, 18 Oct 2016 00:17:22 GMT
< Cache-Control: max-age=10000
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< Set-Cookie: cq-authoring-mode=CLASSIC;Path=/;Expires=Tue, 25-Oct-2016 00:17:22 GMT
< Expires: Thu, 01 Jan 1970 00:00:00 GMT
< Content-Type: text/html; charset=ISO-8859-1
< Transfer-Encoding: chunked
< 
* Connection #0 to host localhost left intact
{% endhighlight %}


### Request URL Pattern Based

All configuration in this section are for OSGi HTTP Whiteboard servlet filters (i.e. they kick in prior to any Sling handling). They all have the following property in common:

* `filter.pattern`: A regular expression pattern matched against the request's URL path (prior resource resolving)


Description | PID | Properties
--- | --- | ---
Sets a `Cache-Control` response header with `max-age` directive | `com.adobe.acs.commons.http.headers.impl.DispatcherMaxAgeHeaderFilter` |  `max.age`: Max age value (in seconds) to put in `Cache-Control` header. 
Sets an `Expires` response header which expires daily at the given time | `com.adobe.acs.commons.http.headers.impl.DailyExpiresHeaderFilter` |`expires.time`: Time of day in GMT timezone at which the content expires (in format `HH:mm`). Is interpreted as GMT timezone.
Sets an `Expires` response header which expires weekly at the given time | `com.adobe.acs.commons.http.headers.impl.DailyExpiresHeaderFilter` |`expires.time`: Time of day in GMT timezone at which the content expires (in format `HH:mm`). `expires.day-of-week`: Day of week to expire the content. Allowed values: `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`.
Sets an `Expires` response header which expires monthly at the given time | `com.adobe.acs.commons.http.headers.impl.DailyExpiresHeaderFilter` |`expires.time`: Time of day in GMT timezone at which the content expires (in format `HH:mm`). `expires.day-of-month`: Day of month at which the content expires. Will expire on the closest day if the given day does not exist in the current month. E.g. If set to 31, in February will expire on the 28th (or 29th on leap-year).


### Resource Type Based 

All configurations in this section are for Sling Servlet filters (i.e. they are triggered only if the request is handled by Sling). They all have the following property in common:

`max.age`: Max age value (in seconds) to put in `Cache-Control` header. 

Description | PID | Properties
--- | --- | ---
Sets a `Cache-Control` response header with `max-age` directive for the given resource type | `com.adobe.acs.commons.http.headers.impl.ResourceTypeBasedDispatcherMaxAgeHeaderFilter` | `resource.types`: Array of resource types, at least one given type must match the request's type (via `Resource.isResourceType(...)`, i.e. also considering resource type inheritance) for this filter to be active.
Sets a `Cache-Control` response header with `max-age` directive according to a property value of the request's resource | `com.adobe.acs.commons.http.headers.impl.PropertyBasedDispatcherMaxAgeHeaderFilter` | `property.name`: Property name containing the `max-age` directive value in seconds. In case this is not a valid integer it will use the fallback value from `max.age`. `inherit.property.value`: In case the property value equals the one given here this filter is skipped.


## Usage with Dispatcher

It is mandatory to [store the Caching response headers in the Dispatcher](https://experienceleague.adobe.com/en/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration#caching-http-response-headers) in order to also serve it for cached responses.

Optionally one can make the Dispatcher also switch from explicit invalidation (default) to implicit [TTL based invalidation](https://experienceleague.adobe.com/en/docs/experience-manager-dispatcher/using/configuring/dispatcher-configuration#configuring-time-based-cache-invalidation-enablettl) via the property `/enableTTL "1"`.

## Usage with CDN

Most CDNs respect `Cache-Control` headers by default. For example the [Fastly CDN used in AEMaaCS](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/content-delivery/caching#html-text) does that. For other CDNs please refer to their documentation.


---
layout: acs-aem-commons_feature
title: Dispatcher TTL
description: Effortlessly take advantage of Dispatcher's TTL caching
date: 2015-12-04
redirect_from: /acs-aem-commons/features/dispatcher-ttl.html
feature-tags: aem-65 aem-cs
initial-release: 2.2.0
---

> Requires AEM Dispatcher v4.1.11+

## Purpose

Easily set TTL headers on Requests in support of [AEM Dispatcher 4.1.11](https://www.adobeaemcloud.com/content/companies/public/adobe/dispatcher/dispatcher.html) TTL support.

ACS AEM Commons Dispatcher TTL allows Response Headers to be set instructing AEM Dispatcher to respect a TTL-based timeout. This feature does expect that a Dispatcher is in the request chain. To enable support in other scenarios, see the [note](#note).

The following expiration configurations are supported

* Max-Age
* Daily
* Weekly
* Monthly

## How to Use

### Configure AEM Dispatcher

First ensure sure [AEM Dispatcher 4.1.11](https://www.adobeaemcloud.com/content/companies/public/adobe/dispatcher/dispatcher.html) or greater is installed. Then in `dispatcher.any` set `/enableTTL "1"`.


### Create OSGi Configurations

Create the a series of `sling:OsgiConfig`'s each representing a Path and TTL-scheme.

In your AEM Content project, create a `sling:Folder` under your application's `/apps` folder.

### Max Age

`/apps/mysite/config/com.adobe.acs.commons.http.headers.impl.DispatcherMaxAgeHeaderFilter-paths-set-1.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    filter.pattern="[/content/site/products/(.*)]"
    max.age="60"
    />
{% endhighlight %}   

* `max.age`: Max age value (in seconds) to put in Cache Control header.  

### Daily

`/apps/mysite/config/com.adobe.acs.commons.http.headers.impl.DailyExpiresHeaderFilter-paths-set-2.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    filter.pattern="[/content/site/team/(.*)]"
    expires.time="14:30"
    />
{% endhighlight %}   

* `max.age`: Max age value (in seconds) to put in Cache Control header.  
* `expires.time`: Time of day which the content expires (HH:mm)


### Weekly

`/apps/mysite/config/com.adobe.acs.commons.http.headers.impl.WeeklyExpiresHeaderFilter-paths-set-3.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    filter.pattern="[/content/site/services/(.*)]"
    expires.time="14:30"
    expires.day-of-week="Monday"
    />
{% endhighlight %}   

* `max.age`: Max age value (in seconds) to put in Cache Control header.  
* `expires.time`: Time of day which the content expires (HH:mm)
* `expires.day-of-week`: Day of week to expire the content. Allowed values: `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`.


### Monthly

`/apps/mysite/config/com.adobe.acs.commons.http.headers.impl.MonthlyExpiresHeaderFilter-paths-set-4.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    filter.pattern="[/content/site/locations/(.*)]"
    expires.time="14:30"
    expires.day-of-month="15"
    />
{% endhighlight %}   

* `max.age`: Max age value (in seconds) to put in Cache Control header.  
* `expires.time`: Time of day which the content expires (HH:mm)
* `expires.day-of-month`: Day of month to expire the content. Will expire on the closes day. Ex. If set to 31, in February will expire on the 28th (or 29th on leap-year).


## Note

This feature expects that the Dispatcher was involved in the request chain. This expectation is managed via a known HTTP Header. To simulate the Dispatcher, add the necessary HTTP header to the request:

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

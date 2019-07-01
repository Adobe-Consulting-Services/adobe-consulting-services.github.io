---
layout: acs-aem-commons_subpage
title: Http Cache - Header / Cookie exclusions
---

[<< back to HTTP Cache Table of Contents](../index.html)

#### Configuring global response header / cookie exclusion on the cache engine (HttpCacheEngineImpl)

Central controlling unit for http cache.  
Define a `sling:OsgiConfig` `/apps/mysite/config/com.adobe.acs.commons.httpcache.engine.impl.HttpCacheEngineImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    httpcache.engine.excluded.response.cookies.global="[myLoginCookieKey1,myLoginCookieKey2]"
    httpcache.engine.excluded.response.headers.global="[acs-commons-(.*)]"
 />
 {% endhighlight %}
 
  * `httpcache.engine.excluded.response.cookies.global ` List of header keys (as regex) that should NOT be put in the cached response, to be served to the output.
  * `httpcache.engine.excluded.response.headers.global` List of cookie keys that will NOT be put in the cached response, to be served to the output.
    
It is also possible to specify the cookie / header exclusion on a [config specific level](base-config.html).
The exclusions from the global and config specific specifications are combined and applied to the captured response.
This logic to exclude the specified headers / cookies is executed when a cache object is being created for storage. 

This means that there is a performance penalty on the initial storage if complex regex statements are used, but once stored, there is no penalty for retrieving and serving the cache.
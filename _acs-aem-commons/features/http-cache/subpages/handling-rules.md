---
layout: acs-aem-commons_subpage
title: Http Cache - Handling rules
---

[<< back to HTTP Cache Table of Contents](../index.html)

#### Configuring global rules on the cache engine (HttpCacheEngineImpl)

Central controlling unit for http cache.  
Define a `sling:OsgiConfig` `/apps/mysite/config/com.adobe.acs.commons.httpcache.engine.impl.HttpCacheEngineImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    httpcache.engine.cache.handling.rules.global="[pid-of-rule-1, pid-of-rule-2, pid-of-rule-3]"
 />
{% endhighlight %}



### Creating a new global cache handling rule

Cache handling rules provide touch-points to plug in custom logic on key cache handling events. They are modeled as OSGi services implementing `com.adobe.acs.commons.httpcache.rule.HttpCacheHandlingRule`. The contract is that the current cache action will be continued only if the methods implementing the interface returns true. A convenient abstract class  `com.adobe.acs.commons.httpcache.rule.AbstractHttpCacheHandlingRule` has been provided facilitating the sub classes to override just the intended methods. The best practice is to have a rule overriding just one method.

Event  | Method | OOTB rules
------------- | ------------- | -------------
On qualifying http requests | onRequestReceive | `com.adobe.acs.commons.httpcache.rule.impl.CacheOnlyGetRequest`, `com.adobe.acs.commons.httpcache.rule.impl.DoNotCacheRequestWithQueryString`
On caching the response | onResponseCache | `com.adobe.acs.commons.httpcache.rule.impl.CacheOnlyResponse200`, `com.adobe.acs.commons.httpcache.rule.impl.DoNotCacheZeroSizeResponse`, `com.adobe.acs.commons.httpcache.rule.impl.HonorCacheControlHeaders`
On delivering from cache | onCacheDeliver | `com.adobe.acs.commons.httpcache.rule.impl.MarkResponseAsCacheDelivered`
On invalidating the cache  | onCacheInvalidate |

Rules which are configured to `httpcache.engine.cache-handling-rules.global` of `com.adobe.acs.commons.httpcache.engine.impl.HttpCacheEngineImpl` are applicable for all cache configs (hence, all cache-able requests) and called global cache handling rules.



- `httpcache.engine.cache-handling-rules.global` Set of service pid of global cache handling rules. These rules are applied to all cache configs and hence all cache-able requests.


### Creating new config specific cache handling rule

Any cache handling rule explained above applied only to specific cache config via `httpcache.config.cache-handling-rules.pid` of `com.adobe.acs.commons.httpcache.config.impl.HttpCacheConfigImpl` is called cache config specific rule.


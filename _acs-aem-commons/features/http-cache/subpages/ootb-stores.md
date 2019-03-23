---
layout: acs-aem-commons_subpage
title: Http Cache - Out of the Box stores
---

[<< back to HTTP Cache Table of Contents](../index.html)

Currently there are 3 OOTB stores available: 


* `com.adobe.acs.commons.httpcache.store.mem.impl.MemHttpCacheStoreImpl` RAM memory based store built using Guava
* `com.adobe.acs.commons.httpcache.store.caffeine.impl.CaffeineMemHttpCacheStoreImpl` RAM memory based store built using Caffeine (since 4.0.0) 
* `com.adobe.acs.commons.httpcache.store.jcr.impl.JCRHttpCacheStoreImpl` JCR based store that stores into /var/acs-commons (since 3.14.0)



### Which store to use?
In general, the MemHttpCacheStoreImpl store (default) is recommended for the obvious reason that it's the fastest. However MemHttpCacheStoreImpl does not support the expiry time per HttpCacheConfig instance. In case this is needed you can use CaffeineMemHttpCacheStoreImpl, which is a bit heavier but still pretty lightweight. 

However, if you have cache entries that are that big or many that they cannot be stored in the RAM memory, the JCR store is a good choice. The JCR store also supports the expiry time per HttpCacheConfig functionality.
Also, the JCR storage means that the cache won't be flushed on a server restart as it's persisted while the Memory based stores are lost if the AEM process is stopped for any reason.

The caffeine store has a [dependency]('https://mvnrepository.com/artifact/com.github.ben-manes.caffeine/caffeine/2.1.0') to caffeine that must be provided by the project, and only will be activated if the caffeine 3rd party bundle is active. 


#### Configuring In-mem cache store (MemHttpCacheStoreImpl)

In-memory store for caching http responses.

Define a `sling:OsgiConfig` `/apps/mysite/config/com.adobe.acs.commons.httpcache.store.mem.impl.MemHttpCacheStoreImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    httpcache.cachestore.memcache.ttl="-1"
    httpcache.cachestore.memcache.maxsize="10"
 />
{% endhighlight %}

- `httpcache.cachestore.memcache.ttl` Time To Live (TTL) of cached items in seconds. Value of '-1' disables the TTL behavior.
- `httpcache.cachestore.memcache.maxsize` Max size of the cache store in MB.  Once the store reaches the set size, least recently used entry would be evicted.


#### Configuring In-mem cache store (CaffeineMemHttpCacheStoreImpl)

In-memory store for caching http responses.

Define a `sling:OsgiConfig` `/apps/mysite/config/com.adobe.acs.commons.httpcache.store.caffeine.impl.CaffeineMemHttpCacheStoreImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    httpcache.cachestore.caffeinecache.ttl="-1"
    httpcache.cachestore.caffeinecache.maxsize="10"
 />
{% endhighlight %}

- `httpcache.cachestore.caffeinecache.ttl` Time To Live (TTL) of cached items in seconds. Value of '-1' disables the TTL behavior.
- `httpcache.cachestore.caffeinecache.maxsize` Max size of the cache store in MB.  Once the store reaches the set size, least recently used entry would be evicted.



#### Configuring JCR cache store (JCRHttpCacheStoreImpl)

JCR store for caching http responses.

Define a `sling:OsgiConfig` `/apps/mysite/config/com.adobe.acs.commons.httpcache.store.mem.impl.JCRHttpCacheStoreImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    scheduler.expression="0 0 12 1/1 * ? *"
	httpcache.config.jcr.rootpath="/var/acs-commons/httpcache"
	httpcache.config.jcr.bucketdepth="10"
	httpcache.config.jcr.savedelta="500"
	httpcache.config.jcr.expiretimeinseconds="-1"
 />
{% endhighlight %}

- `scheduler.expression` The cron expression on which to run clean-up checks
- `httpcache.config.jcr.rootpath` Points to the location of the cache root parent node in the JCR repository
- `httpcache.config.jcr.bucketdepth` The depth the bucket tree goes. Minimum value is 1. This value can be used for tweaking performance
- `httpcache.config.jcr.savedelta` The threshold to perform session.save() on add,remove and modify actions when handling the cache
- `httpcache.config.jcr.expiretimeinmiliseconds` Expiry time of a cache entry in seconds. If on the scheduled cleanup the node has expired, it will be evicted. (-1 for no expiry)


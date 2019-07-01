---
layout: acs-aem-commons_subpage
title: Http Cache - Caffeine Store
---

[<< back to HTTP Cache Table of Contents](../index.html)

## Dependency

First of all, make sure that the [caffeine cache bundle](https://mvnrepository.com/artifact/com.github.ben-manes.caffeine/caffeine/2.6.2) is present in the OSGI-Container of AEM. 
The code here was tested with caffeine version 2.6.2 but could / should work with other versions as well, especially higher ones.

## Activating the store

To activate the caffeine store after the caffeine bundle is in a running state, simply define a  `sling:OsgiConfig`  
                                                                                                
`/apps/mysite/config/com.adobe.acs.commons.httpcache.store.caffeine.impl.CaffeineMemHttpCacheStoreImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    httpcache.cachestore.caffeine.ttl="{Long}360000"
    httpcache.cachestore.caffeine.maxsize="{Long}50"
 />
 {% endhighlight %}  
 
 * `httpcache.cachestore.caffeine.ttl` TTL for all entries in this cache in seconds. Default to -1 meaning no TTL.
 * `httpcache.cachestore.caffeine.maxsize` Default to 10MB. If cache size goes beyond this size, least used entry will be evicted from the cache 
 
## Validating if the activation succeeded

After performing these steps, check the log files for any errors regarding `CaffeineMemHttpCacheStoreImpl`. 

Also check the [Felix Console](localhost:4502/system/console/components) to see if CaffeineMemHttpCacheStoreImpl is in an active state. 

If active, you have successfully installed / configured the caffeine store.
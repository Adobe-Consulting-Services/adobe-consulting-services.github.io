---
layout: acs-aem-commons_subpage
title: Http Cache - Base Configuration
---

[<< back to HTTP Cache Table of Contents](../index.html)


#### Configuring cache config (HttpCacheConfig)

Modeled as OSGi configuration factory and hence multiple configurations allowed.

To create a configuration, define a `sling:OsgiConfig`  

`/apps/mysite/config/com.adobe.acs.commons.httpcache.config.impl.HttpCacheConfigImpl-uniquename.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    httpcache.config.order="1000"
    httpcache.config.requesturi.patterns="[/content/my-site/(.*).html, /content/my-site/products(.*).json]"
    httpcache.config.requesturi.patterns.blacklisted="[/content/my-site(.*)no-cache(.*)]"
    httpcache.config.request.authentication="authenticated"
    httpcache.config.invalidation.oak.paths="[/content/my-site/(.*)]"
    httpcache.config.expiry.on.create="{Long}50000"
    cacheConfigExtension.target="(&(service.factoryPid=com.adobe.acs.commons.httpcache.config.impl.GroupHttpCacheConfigExtension)(config.name=unique-confg-name-of-extension))"
    cacheKeyFactory.target="(&(service.factoryPid=com.adobe.acs.commons.httpcache.config.impl.GroupHttpCacheConfigExtension)(config.name=unique-confg-name-of-extension))"
    httpcache.config.cache.handling.rules.pid="[pid-of-rule1, pid-of-rule2]"
 />
 {% endhighlight %}     

* `httpcache.config.cachestore` Which cache store to use. Default is `MEM`. Out of the box, can be `MEM`, `JCR`, `CAFFEINE` or any custom implemented HttpCacheStore.getStoreType()'s return value.
* `httpcache.config.order` Default value is 1000. Evaluated in ascending order. Determines the ordering of cache config while selecting config for the given HTTP request. If 2 cache config with the same order matches, caching is abandoned as it's a conflict.
* `httpcache.config.requesturi.patterns` Set of whitelisted request URI applicable for this config. Expressed in REGEX.
* `httpcache.config.requesturi.patterns.blacklisted` Set of blacklisted request URI. Expressed in REGEX. This is applied post applying `httpcache.config.requesturi.patterns` and hence has an overriding effect.
* `httpcache.config.request.authentication` Authentication requirement for this cache config.
  * Allowed values: `anonynous`, `authenticated` or `both`.
* `httpcache.config.invalidation.oak.paths` Set of JCR paths for which all the cache entries derived from this config will be invalidated on receiving an cache invalidation job.
* `cacheConfigExtension.target` Service pid of the `CacheConfigExtension` custom implementation. Expressed in LDAP syntax. This could also be a combination of `service.factoryPid` and `config.name`.
* `cacheKeyFactory.target` Service pid of the `CacheKeyFactory` custom implementation. Expressed in LDAP syntax. This could also be a combination of `service.factoryPid` and `config.name`.
* `httpcache.config.cache-handling-rules.pid` Service pid of cache handling rules applied for this config. Note that this is cache config specific rule while the global set of rules set at cache engine are applied to all cache configs.
* `httpcache.config.filter-scope` specifies if the HTTP Cache config should be evaluated at the Sling Request or Include level. Valid values are `REQUEST` or `INCLUDE`. Available since v2.6.0/3.2.0 - prior all caching occurred at the REQUEST level which is the default.

Since 4.0.0 and not supported by default MEM cache store (use JCR or Caffeine)
* `httpcache.config.expiry.on.create ` Sets a expiry time in milliseconds that is specific to cache entries that belong to this configuration. 
* `httpcache.config.expiry.on.update` Refresh expiry time on update, specific to cache entries that belong to this configuration.
* `httpcache.config.expiry.on.read` Refresh expiry time on read, specific to cache entries that belong to this configuration.
    * If above are not specified, per store TTL will be used. If specified, overrides store TTL (for entries that belong to configuration)
    * These options have `-1L` (disabled) as default.
    
With this in place, the HTTP cache is enabled. Notice that if the factory reference doesn't resolve ( `cacheKeyFactory.target`) the config will not be active, and the filter won't either. Check the OSGI components tab in the Felix console.

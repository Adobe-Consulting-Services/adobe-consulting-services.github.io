---
layout: acs-aem-commons_subpage
title: Http Cache - Configuration Extensions / Custom Key Factories
---

[<< back to HTTP Cache Table of Contents](../index.html)


Cache config (`com.adobe.acs.commons.httpcache.config.HttpCacheConfig`) can be extended through implementation of config extension (`com.adobe.acs.commons.httpcache.config.HttpCacheConfigExtension`). A typical developer use-case (but not limited to) for this is to achieve caching of personalized requests. User group based implementation of cache config extension
 
The following config extensions are provided OOTB:

* `com.adobe.acs.commons.httpcache.config.impl.GroupHttpCacheConfigExtension` authenticated user group cache rules / personalization. 
* `com.adobe.acs.commons.httpcache.config.impl.ResourceTypeHttpCacheConfigExtension` resource type / path based cache rules
* `com.adobe.acs.commons.httpcache.config.impl.RequestParameterHttpCacheConfigExtension` request parameter based cache rules / personalization
* `com.adobe.acs.commons.httpcache.config.impl.RequestCookieHttpCacheConfigExtension` request cookie based cache rules / personalization
* `com.adobe.acs.commons.httpcache.config.impl.RequestHeaderHttpCacheConfigExtension` request header based cache rules / personalization
* `com.adobe.acs.commons.httpcache.config.impl.ValueMapValueHttpCacheConfigExtension` request resource's value map values based cache rules
* `com.adobe.acs.commons.httpcache.config.impl.CombinedCacheConfigExtension` allows you to combine multiple extensions into 1 to promote reuse

All of the above are compatible with the JCR cache (Serializable).  
Relation between `HttpCacheConfig` and `HttpCacheConfigExtension` established through OSGi reference target filter `cacheConfigExtension.target` at `com.adobe.acs.commons.httpcache.config.impl.HttpCacheConfigImpl`.



## Example OOTB config extension / key factories configurations:


`com.adobe.acs.commons.httpcache.config.impl.GroupHttpCacheConfigExtension-uniquename.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
	configName="unique-name"
	httpcache.config.extension.user.groups.allowed="[group1, group2]"
 />
 {% endhighlight %}     
 
 This extension config will tell the engine only to cache a response, if the request is authenticated in AEM, and the usergroup is 'group1' or 'group2'.
 The factory will create exactly 2 variants per request's resource, group1 and group2.
 

`com.adobe.acs.commons.httpcache.config.impl.ResourceTypeHttpCacheConfigExtension-myresourceconfig.xml`
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
	configName="my-resource-config"
	httpcache.config.extension.paths.allowed="['/content/acs-commons/mycontainerpage/(.*)/jcr:content/(.*)']"
	httpcache.config.extension.resourcetypes.allowed="['/apps/acs-commons/components/my-cacheable-component']" 	
 />
 {% endhighlight %}  

This extension config will tell the engine only to cache a response, if the request's resource has a resource type of `/apps/acs-commons/components/my-cacheable-component`, and the path matches the regex `/content/acs-commons/mycontainerpage/(.*)/jcr:content/(.*)`. 
The factory will in this case create only 1 variant per request's resource.

## Added since 4.0.0:

`com.adobe.acs.commons.httpcache.config.impl.RequestParameterHttpCacheConfigExtension-myrequestparameterconfig.xml`
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    configName="my-request-parameter-config"
    allowedKeys="[pageView,page]" 
    allowedValues="[pageView=compact|medium|large]"
    emptyAllowed="{Boolean}false"
 />
 {% endhighlight %}  
 
This extension config will tell the engine only to cache a response, if the request has the request parameters pageView (must be of value compact,medium or large) and page (any value). 
The factory will create a variant of the request's resource of each possible combination of pageView / page query parameters that is requested.
 
 
`com.adobe.acs.commons.httpcache.config.impl.RequestCookieHttpCacheConfigExtension-myrequestcookieconfig.xml` 
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    configName="my-request-cookie-config"
    allowedKeys="[myCustomUserGroupFromMiddleware]" 
    allowedValues="[myCustomUserGroupFromMiddleware=superUser|normal|loyalUser]"
    emptyAllowed="{Boolean}true"
 />
 {% endhighlight %}  
 
This extension config will tell the engine only to cache any response, because emptyAllowed is set to true. 
However, the factory will create a cache variant for a non-match (standard), but also for the request's that have the request cookie `myCustomUserGroupFromMiddleware` with these exact values: `superUser`, `normal`, `loyalUser`. 
This allows you to serve different cached content for these requests but also cached content for normal requests.
  
 
`com.adobe.acs.commons.httpcache.config.impl.RequestHeaderHttpCacheConfigExtension-myrequestheaderconfig.xml`
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    configName="my-request-header-config"
    allowedKeys="[my-custom-header]" 
    emptyAllowed="{Boolean}false"
 />
 {% endhighlight %}  
 This extension config will tell the engine only to cache a response, if the request has the request header my-custom-header (any value).
 The factory will create a variant of the request's resource of each my-custom-header value. **Important**! Use this in combination with other config restrictions when using a JCR store, otherwise, this opens up the possibility to flood the server by spamming requests with diffferent header values.
  
 
`com.adobe.acs.commons.httpcache.config.impl.ValueMapValueHttpCacheConfigExtension-myvaluemapconfig.xml` 
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    configName="my-valuemap-config"
    allowedKeys="[resourceIsCacheAble]" 
    allowedValues="[resourceIsCacheAble={Boolean}true]"
    emptyAllowed="{Boolean}false"
 />
 {% endhighlight %}  
 This extension config will tell the engine only to cache a response, if the request's resource has a Boolean property named resourceIsCacheAble that is set to true.
 Useful when you want to put a flag enable or disabling caching from the author view.
 
`com.adobe.acs.commons.httpcache.config.impl.CombinedCacheConfigExtension-combinedgroupandresourceconfig.xml`
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    configName="combined-group-and-resource-config"
    cacheConfigExtension.target="(|(service.factoryPid=com.adobe.acs.commons.httpcache.config.impl.ValueMapValueHttpCacheConfigExtension)(configName=my-valuemap-config)(((service.factoryPid=com.adobe.acs.commons.httpcache.config.impl.RequestCookieHttpCacheConfigExtension)(configName=my-request-cookie-config)" 
    cacheKeyFactory.target="(|(service.factoryPid=com.adobe.acs.commons.httpcache.config.impl.ValueMapValueHttpCacheConfigExtension)(configName=my-valuemap-config)(((service.factoryPid=com.adobe.acs.commons.httpcache.config.impl.RequestCookieHttpCacheConfigExtension)(configName=my-request-cookie-config))" 
    emptyAllowed="{Boolean}false"
 />
 {% endhighlight %}

This extension config will aggregate multiple cache configs into 1 (Using LinkedList) and apply all of these to the config. 
Handy if you need the functionality of multiple OOTB config extensions in your config, or if you need these and a project-specific extension as well.
For instance (example above): You need the ValueMapValueHttpCacheConfigExtension because you want to check for `resourceIsCacheAble` equals true, and then ALSO to provide different cached entries for the request cookie value `myCustomUserGroupFromMiddleware`.  Using the example above, this can be done without writing your own extension code, but just with 3 `sling:OsgiConfig` files. 

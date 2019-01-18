---
layout: acs-aem-commons_subpage
title: Http Cache - Creating custom config extension
---

[<< back to HTTP Cache Table of Contents](../index.html)


### Extending cache config

{% highlight java %}

@Component(configurationPolicy = ConfigurationPolicy.REQUIRE, service = HttpCacheConfigExtension.class)
@Designate(ocd = WeRetailHttpCacheConfigExtension.Config, factory = true)
public class WeRetailHttpCacheConfigExtension implements HttpCacheConfigExtension {

    //our own service
    @Reference
    private WeRetailUserService userService;

    //config name
    private String configName;

    private boolean allowAnonymous;

    @ObjectClassDefinition(name = "ACS AEM Commons - HTTP Cache - WeRetailHttpCacheConfigExtension.")
    public @interface Config {

        @AttributeDefinition(name = "Config Name")
        String configName() default EMPTY;

        boolean cacheAnonymous() default false;
    }

    @Override
    public boolean accepts(SlingHttpServletRequest request, HttpCacheConfig cacheConfig){

        if(allowAnonymous){
            //in this case we always will cache the request. Different variants will be handled by our keyfactory.
            return true;
        }

        return userService.doesUserExist(request);
    }

    public void activate(WeRetailHttpCacheConfigExtension.Config config){
        this.configName = config.configName();
        this.allowAnonymous = config.cacheAnonymous();
    }
}

{% endhighlight %}  

Now, we can use our custom WeRetailHttpCacheConfigExtension by creating a sling:OsgiConfig named `com.weretail.cache.WeRetailHttpCacheConfigExtension-example.xml`:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    configName="example"
    allowAnonymous="{Boolean}true"
 />
 {% endhighlight %} 

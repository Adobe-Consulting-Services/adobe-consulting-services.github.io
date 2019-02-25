---
layout: acs-aem-commons_subpage
title: Http Cache - Creating custom key factory
---

[<< back to HTTP Cache Table of Contents](../index.html)

<iframe width="560" height="315" src="https://www.youtube.com/embed/0J9iyOOQNX8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

CacheKeyFactory (`com.adobe.acs.commons.httpcache.keys.CacheKeyFactory`) is tied to HttpCacheConfig (`com.adobe.acs.commons.httpcache.config.impl.HttpCacheConfigImpl`) via cache config's OSGi property `cacheKeyFactory.target`. CacheKeyFactory builds CacheKeys (`com.adobe.acs.commons.httpcache.keys.CacheKey`). Custom implementation of CacheKeyFactory should provide its own CacheKey. Often these implementations factor in the custom implementation of Cache config extension (`com.adobe.acs.commons.httpcache.config.HttpCacheConfigExtension`). The OOTB extensions mentioned above also implement the CacheKeyFactory interface, with the exception of the CombinedCacheConfigExtension. The factory variant is: 
* `com.adobe.acs.commons.httpcache.config.impl.CombinedCacheKeyFactory` allows you to combine multiple factories into 1 to promote reuse

If you want your CacheKey to work in the JCR store, you need to provide an implementation of writeObject / readObject for serialization. 
[writeObject](https://docs.oracle.com/javase/7/docs/platform/serialization/spec/output.html#861) 
[readObject](https://docs.oracle.com/javase/7/docs/platform/serialization/spec/input.html#2971) 

The abstract class com.adobe.acs.commons.httpcache.keys.AbstractCacheKey contains parentReadObject and parentWriteObject as protected methods to provide serialization logic for it's fields.
You will need to serialize your fields accordingly so they may be persisted in the JCR.



Example implementation:



{% highlight java %}

@Component(configurationPolicy = ConfigurationPolicy.REQUIRE, service = CacheKeyFactory.class)
@Designate(ocd = WeRetailCacheKeyFactory.class,factory = true)
public class WeRetailCacheKeyFactory implements CacheKeyFactory {

    //our own service
    @Reference
    private WeRetailUserService userService;
    
    //config name
    private String configName;

    //our configuration
    @ObjectClassDefinition(name = "ACS AEM Commons - HTTP Cache - WeRetailCacheKeyFactory.")
    public @interface Config {
        @AttributeDefinition(name = "Config Name")
        String configName() default EMPTY;
    }

    //our own custom cache key implementation.
    class WeRetailCacheKey extends AbstractCacheKey implements CacheKey, Serializable {

        //this will hold the userId retrieved by our custom business logic
        private String userId;

        //this constructor is used to actually build keys that will be used to populate the cache stores with
        public WeRetailCacheKey(SlingHttpServletRequest request, HttpCacheConfig cacheConfig) {
            super(request, cacheConfig);

            this.userId = userService.getUserId(request);
        }

        //this constructor is only used to see if a config belongs to this key
        public WeRetailCacheKey(String uri, HttpCacheConfig cacheConfig) {
            super(uri, cacheConfig);
            this.userId = StringUtils.EMPTY;
        }

        //lets implement writeObject and readObject so that our keys will be serializable for the JCR cache.
        protected void writeObject(ObjectOutputStream o) throws IOException {
            super.parentWriteObject(o);
            o.writeObject(userId);
        }

        protected void readObject(ObjectInputStream o) throws IOException, ClassNotFoundException {
            super.parentReadObject(o);
            this.userId = (String) o.readObject();
        }

        //of course we need to implement equals and hashcode, the provide differentiation logic. 
        //this is where the magic happens.
        @Override 
        public boolean equals(Object o) {
            if (!super.equals(o)) {
                return false;
            }

            if (o == null) {
                return false;
            }

            WeRetailCacheKey that = (WeRetailCacheKey) o;
            return new EqualsBuilder()
                    .append(getUri(), that.getUri())
                    .append(getResourcePath(), that.getResourcePath())
                    .append(getUserId(), that.getUserId())
                    .isEquals();
        }

        @Override
        public int hashCode() {
            return new HashCodeBuilder(17, 37)
                    .append(getUri())
                    .append(getUserId()).toHashCode();
        }

        public String getUserId() {
            return userId;
        }
    }

    //this method is used to actually build keys that will be used to populate the cache stores with
    @Override
    public CacheKey build(SlingHttpServletRequest request, HttpCacheConfig cacheConfig){
        return new WeRetailCacheKey(request, cacheConfig);
    }

    //this method is only used to see if a config belongs to this key
    @Override
    public CacheKey build(String resourcePath, HttpCacheConfig cacheConfig){
        return new WeRetailCacheKey(resourcePath, cacheConfig);
    }

    //this method is only used to see if a config belongs to this key
    @Override
    public boolean doesKeyMatchConfig(CacheKey key, HttpCacheConfig cacheConfig){
        // Check if key is instance of WeRetailCacheKeyz.
        if (!(key instanceof WeRetailCacheKey)) {
            return false;
        }
        // Validate if key request uri can be constructed out of uri patterns in cache config.
        return new WeRetailCacheKey(key.getUri(), cacheConfig).equals(key);
    }
    
    @Activate
    public void activate(WeRetailCacheKeyFactory.Config config){
        this.configName = config.configName();
    }
}

{% endhighlight %}  

Now, we can use our custom WeRetailCacheKeyFactory by creating a sling:OsgiConfig named `com.weretail.cache.WeRetailCacheKeyFactory-example.xml`:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    configName="example"
 />
 {% endhighlight %} 

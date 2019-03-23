---
layout: acs-aem-commons_subpage
title: Http Cache - Creating custom cache storeo
---

[<< back to HTTP Cache Table of Contents](../index.html)



### Creating new Cache store

HttpCache framework allows multiple cache stores to co-exist at run time. Choice of cache store to be used can be made while configuring cache configs. Custom cache store should implement HttpCacheStore (com.adobe.acs.commons.httpcache.store.HttpCacheStore) interface.
Implementing the methods will result in a working store.  The method getStoreType() must return a unique value that describes the store. This can be then used in the `httpcache.config.cachestore` property in the HttpCacheConfig configuration, to use your custom store.

{% highlight java %}

@Component(service = HttpCacheStore.class )
public class WeRetailStoreImpl implements HttpCacheStore {
    @Override
    public void put(CacheKey key, CacheContent content) throws HttpCacheDataStreamException {

    }

    @Override
    public boolean contains(CacheKey key) {
        return false;
    }

    @Override
    public CacheContent getIfPresent(CacheKey key) {
        return null;
    }

    @Override
    public long size() {
        return 0;
    }

    @Override
    public void invalidate(CacheKey key) {

    }

    @Override
    public void invalidate(HttpCacheConfig cacheConfig) {

    }

    @Override
    public void invalidateAll() {

    }

    @Override
    public TempSink createTempSink() {
        return null;
    }

    @Override
    public String getStoreType() {
        return "WERETAIL";
    }
}

{% endhighlight %} 

---
layout: acs-aem-commons_feature
title: Children as Property Resource Wrapper API
description: Mock nodes as JSON in properties? What?!
date: 2017-02-20
feature-tags: aem-65 aem-cs
initial-release: 2.10.0/3.7.0
---

## Purpose

Serializes super-flat children into a single property as a JSON object. This tends to be more performant than "real" no structures especially when packaging them up or distributing them.

An example use case, happens in the Financial Service industry where day-based data must be stored/modeled.
```
/etc/products/product-class-x/jcr:content/performance-data

./2007-01-01@propertyA=xxx
./2007-01-01@propertyB=xxx
./2007-01-01@propertyC=xxx

...

./2017-01-01@propertyA=xxx
./2017-01-01@propertyB=xxx
./2017-01-01@propertyC=xxx
```

Even if the nodes are sharded to `2017/01/01/entry` daily data for one data-set, 
this uses ~ 365 * 17 (# of years), so in this example:  ~ 3650 nodes. Multiple that by various product classes x products and the number of nodes can reach the 100k's and even millions.

 
## How to

Review the [ChildrenAsPropertyResource APIs](https://adobe-consulting-services.github.io/acs-aem-commons/apidocs/com/adobe/acs/commons/synth/children/package-summary.html)

### Writing Data

{% highlight java %}
// Get the real resource to store the data to; be default the JSON will be persisted in a property named `children` 
Resource real = resolver.getResource("/etc/products/product-class-x/jcr:content/performance-data");

// Wrap the real resource, which will provide a set of methods to write or read the synthetic children
ChildrenAsPropertyResource wrapper = new ChildrenAsPropertyResource(real);

// Create the children that will be persisted to the JSON
Resource child = wrapper.create("child-1", "nt:unstructured");

// Turn the synthetic child to a ModifiableValueMap and write any data you please
ModifiableValueMap mvm = child.adaptTo(ModifiableValueMap.class);
mvm.put("prop-1", "some data");
mvm.put("prop-2", Calendar.getInstance());


// When done with all the writes to your synthetic child, persist these changes to the actual resource (this will turn it from in-memory state in `child` to JSON format)
wrapper.persist();

// Commit the persisted changes to the JCR 
resolver.commit();
{% endhighlight %}


### Reading Data

{% highlight java %}
// Get the real resource that has the serialized children
Resource real = resolve.getResource("/etc/products/product-class-x/jcr:content/performance-data");

// Wrap the real resource, which will provide a set of methods to write or read the synthetic children
ChildrenAsPropertyResource wrapper = new ChildrenAsPropertyResource(real);

// Read from the wrapper resource as you would any resource
for (Resource child : wrapper.getChildren()) {
  child.getValueMap().get("prop-1", String.class);
}      
{% endhighlight %}



## Unscientific Benchmarks

Unscientific metrics on operations using flat "real" nodes vs children as properties.

#### Add operation of 10,000 nodes
* Real nt:unstructured: 8,773ms ~> 8s
* Real oak:Unstructured: 6,374ms ~> 6s
* Unsorted property based: 632ms ~> 0.6s
* Sorted property based: 1,167ms ~> 1s


#### Add operation of 100,000 nodes
* Real nt:unstructured: 160,227ms ~> 160s
* Real oak:Unstructured: 87,324ms ~> 87s  - Package built in 101,377ms
* Sorted property based: 6,646ms ~> 7s
* Property based: 5,240ms ~> 5s - Package built in 4,528ms

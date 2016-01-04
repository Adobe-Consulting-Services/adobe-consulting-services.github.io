---
layout: acs-aem-commons_feature
title: Ensure Oak Index
description: Include Oak Indexes in your app package
date: 2015-10-02
thumbnail: /images/ensure-oak-index/thumbnail.png
feature-tags: backend-dev
tags: acs-aem-commons-features updated
categories: acs-aem-commons features
initial-release: 2.1.0

---

![JCR Compare](/acs-aem-commons/images/ensure-oak-index/osgi-console.png)

## Purpose

The Oak repository used by AEM 6, allows from fine tuning of search performance via the definition of [Oak Index definitions](https://jackrabbit.apache.org/oak/docs/query/lucene.html). The index definition nodes, usually stored under `/oak:index`, define the index and also store the index data (in a node structure invisible to the AEM tooling).

Ideally the Oak Index definitions used by an application could be stored with in the application's content package, however, it is possible (and even likely) that upon deployment the content packages index definition may wipe out the actual index data (again, invisible via AEM tooling) when updating the node, necessitating a reindex, which depending on the repository size and index configuration can be costly (and generally unneccessary).

Ensure Oak Index is tooling that allows Oak Index Definitions (referred to in this document as Ensure Definitions) to be defined in a content package, and then safely translated to real Oak Indexes.

## How to Use

As of v2.2.0, the management of Oak Indexes has been moved to an async Sling Job to ensure the work does not block bundle activation.

### Define the Ensure Definitions

In your AEM Content project, create a `sling:Folder` under your application's `/apps` folder.

Example: `/apps/mysite/oak-index@jcr:primaryType=sling:Folder`

Under this folder, create Ensure Definitions for each Oak Index you want to ensure is created/updated. Ensure Definitions are identical to `oak:QueryIndexDefinition` nodes, except they MUST be of type `oak:Unstructured`.

See details on defining Ensure Definitions below.

### Create the Ensure Oak Index OSGi Configuration

Once all the Ensure Definitions are defined, create a `sling:OsgiConfig` factory config instructing EnsureOakIndex where to find the Ensure Definitions and then where to ensure they are created/updated/deleted.

`/apps/mysite/config/com.adobe.acs.commons.oak.impl.EnsureOakIndex-mysite.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    ensure-definitions.path="/apps/mysite/oak-index"
    oak-indexes.path="/oak:index"
    />
{% endhighlight %}     

### Deployment

Now, deploy the package containing the Ensure Definitions and the OSGi Configuration. Set logging to *INFO* on `com.adobe.acs.commons.oak.impl.EnsureOakIndex` to see what Oak Indexes are managed.

## Ensure Definitions

* Place Ensure Definitions in a `sling:Folder`, the `sling:Folder` can be named anything but convention named it `oak-index`
* Ensure Definition nodes must be `oak:Unstructured`
* Ensure Definition nodes can be multi-levels deep, supporting Lucene Property Index definitions.
* Define the Ensure Definition exactly as you would the Oak Index you wish to create/update (with the exception of the `jcr:primaryType` as noted above)


### Special Properties

Ensure Oak Index supports special properties on the Ensure Definition nodes.

### Ignore

Property Name: `ignore`

An Ensure Definition can be ignored completely by setting `@ignore=true`.

* `/apps/mysite/oak-index/ignore-this-index@ignore=true`

### Disabled (as of v.2.2.0)

Property Name: `disable`

An Ensure Definition can mark an Oak Index as disabled (but NOT deleted) by setting `@disable=true`.

* `/apps/mysite/oak-index/disable-this-index@disable=true`


### Delete

Property Name: `delete`

To delete an existing Oak Index, create an Ensure Definition with the same node name as the Oak Index to delete, and add the property `@delete=true`. If no index can be found to delete, this will note it in the log and continue.

* `/apps/mysite/oak-index/legacy-index@delete=true`


### Force reindex

Property Name: `forceReindex`

On create or update, the Oak Index can be marked to be immediately re-indexed by setting @forceRefresh=true`.

* `/apps/mysite/oak-index/always-reindex-this-index@forceReindex=true`

### Recreate on Update

Property Name: @recreateOnUpdate`

The default behavior for updating Oak Index properties is to perform an in place update to avoid deleting the actual indexed data (invisible to AEM). To force the Oak Index to be be fully deleted and then recreated on an update, set `@recreateOnUpdate=true`

> Note this should be used sparingly. It is almost always better to use the forceReindex option

* `/apps/mysite/oak-index/index-with-junk-data@recreateOnUpdate=true`

## Example Ensure Definition

* /apps/mysite/oak-index/uuid

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="oak:Unstructured"
    type="property"
    propertyNames="[uuid]"
    entryCount="{Long}1"
    recreateOnUpdate="{Boolean}true"
    forceIndex="{Boolean}true"
    />
{% endhighlight %}   

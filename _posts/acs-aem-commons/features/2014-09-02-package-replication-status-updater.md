---
layout: acs-aem-commons_feature
title: Package Replication Status Updater
description: Replicate content packages and have your cake too!
date: 2014-09-02
thumbnail: /images/package-replication-status-updater/thumbnail.png
feature-tags: content-migration
tags: acs-aem-commons-features administration
categories: acs-aem-commons features
initial-release: 1.8.0
---

## Purpose

Packages are a great way to promot large collections of content from Author to Publish servers. However, package replication does not mark the covered content on AEM Author as activated, making it difficult for content authors to understand if the content is in fact activated. Even more dangerous, OOTB tooling like "delete" and "move" will not automatically deactivate the content resulting in orphaned content on AEM Publish.

The ACS AEM Commons Package Replication Status Updater combats this problems by inspecting the contents of any replicated package, and marking applicable content with the appropriate replication status on AEM Author.

## How to Use

To enable Package Replication Status Updating, create a new `sling:OsgiConfig` node (typically only on AEM Author instances)

    /apps/myapp/config.author/com.adobe.acs.commons.replication.status.impl.JcrPackageReplicationStatusEventHandler.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    node-types="[cq:ReplicationStatus,cq:PageContent,dam:AssetContent,rep:User,rep:Group,sling:OrderedFolder/nt:unstructured]"
    replicated-by="Package Replication"
    replicated-at="Package Last Modified"
    />
{% endhighlight %}        

* `node-types`: A String array of node-types (or mixins) that are candidates for replication status updates. 
   * Added in 1.9.0, hierarchy node-type definitions are supported to allow setting replication status on sling:OrderedFolder's jcr:content nodes. This can be leveraged for custom node-type hierarchies.
   * Default: [cq:ReplicationStatus,cq:PageContent,dam:AssetContent,rep:User,rep:Group,sling:OrderedFolder/nt:unstructured]
* `replicated-by`: Marks the replicator for the package content. Accepts a principal name or any String.
   * Default: Package Replication
* `replicated-at`: Marks the replication time for the content. Accepts "Package Last Modified" or "Current Time"
	* Package Last Modified: Marks the content as replicated the last time the Package was modified (aka Built)
	* Current Time: Marks the content as replicated at the current time (now)
	* Default: Package Last Modified

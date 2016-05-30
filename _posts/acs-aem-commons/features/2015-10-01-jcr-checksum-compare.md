---
layout: acs-aem-commons_feature
title: JCR Compare
description: See what content is different between JCRs
date: 2015-10-1
thumbnail: /images/jcr-compare/thumbnail.png
feature-tags: administration content-migration
tags: acs-aem-commons-features
categories: acs-aem-commons features
initial-release: 2.1.0

---

![JCR Compare](/acs-aem-commons/images/jcr-compare/jcr-compare.png)

## Purpose

Quickly compares the contents of AEM instances. JCR Compare computes checksums for specified node types (via an aggregated checksum of that node's descendants) across multiple AEM instances and then compares the checksum results to identify what node (and node sub-systems) are the same or different.

This is a useful tool for checking for content inconsistencies across AEM instances that would be otherwise difficult to find.

> The checksum computation cost is a function of the amount of data being compared. Large amounts of data will be costly to collect and compare.

## Usage

### Setup

Ensure the following

1. Install ACS AEM Commons 2.1.0+ on all AEM instances that require comparing.
2. The browser running the JCR Checksum Compare WebUI has access to all the hosts being compared.
3. The proper credentials are being used for each host configuration (ie. admin)
4. The following servlet paths are not blocked (especially when accessing remote AEM instances via a host-name protected via Dispatcher). **Note: Under NO circumstance should the following paths be publicly accessible.**
 * /bin/acs-commons/jcr-compare.hashes.txt
 * /bin/acs-commons/jcr-compare.dump.json


Access the tool on the base AEM instance at
http://localhost:4502/etc/acs-commons/jcr-compare.html
[/etc/acs-commons/jcr-compare.html](http://localhost:4502/etc/acs-commons/jcr-compare.html)

### Configuration Tab

The Configuration Tab is defines what AEM instances are compared, and what the comparison criteria is.

#### Hosts

![JCR Compare - Configuration - Hosts](/acs-aem-commons/images/jcr-compare/configuration-hosts.png)

The hosts that are eligible for comparison.

The convenience hostname of `localhost` can be used to reference the AEM Instance (host and port) that the browser is interacting with, using the logged in user's credentials.


#### Paths

![JCR Compare - Configuration - Paths](/acs-aem-commons/images/jcr-compare/configuration-paths.png)

A set of paths can be defined to include in the comparison.

Note: the larger the content trees to compare, the longer and more taxing the comparison will be.

##### Default

* `/content`


#### Query

![JCR Compare - Configuration - Query](/acs-aem-commons/images/jcr-compare/configuration-query.png)

A query can be provided to generate the results to include. Note if both paths and a query is configured, a union of the results will be displayed.


#### Node types

![JCR Compare - Configuration - Node Types](/acs-aem-commons/images/jcr-compare/configuration-node-types.png)

Node types define what node times are eligible for representing a node sub-system that will have a checksum generated for it. Generally this is an aggregate node like a `jcr:content` node (Ex. `cq:PageContent` or `cq:AssetContent`)

##### Defaults

* `cq:PageContent`
* `dam:AssetContent`
* `cq:Tag`


#### Node types to exclude

![JCR Compare - Configuration - Node Types to Exclude](/acs-aem-commons/images/jcr-compare/configuration-node-types-to-exclude.png)

When computing the checksum for a candidate Node type (see above configuration), these node types will be excluded.

##### Defaults

* `rep:ACL`
* `cq:meta`


#### Node types to exclude

![JCR Compare - Configuration - Properties to Exclude](/acs-aem-commons/images/jcr-compare/configuration-properties-to-exclude.png)

When computing the checksum for a candidate Node type (see above configuration) these properties are excluded from the checksum generation process. These are usually properties that are known to be divergent between AEM instances.

##### Defaults

* `jcr:mixinTypes`
* `jcr:created`
* `jcr:createdBy`
* `jcr:lastModified`
* `jcr:lastModifiedBy`
* `cq:lastModified`
* `cq:lastModifiedBy`
* `cq:lastReplicated`
* `cq:lastReplicatedBy`
* `cq:lastReplicationAction`
* `jcr:versionHistory`
* `jcr:predecessors`
* `jcr:baseVersion`

#### Sorted multi-value properties

![JCR Compare - Configuration - Sorted Multi-value Properties](/acs-aem-commons/images/jcr-compare/configuration-sort-properties.png)

Properties defined in this list will have their order taken into account when comparing the nodes.

For example, if cq:tags is included in this list and

* AEM Author has `/content/my-page/jcr:content@cq:tags`=`[animals:dog,animals:cat]`
* AEM Publish has `/content/my-page/jcr:content@cq:tags`=`[animals:cat,animals:dog]`

This discrepancy in the order would cause JCR Compare to identify these are a delta.

##### Defaults

* `cq:tags`

### Content Comparison Tab

![JCR Compare - Content Comparison](/acs-aem-commons/images/jcr-compare/content-comparison.png)

The Content Comparison Tab lets you compare 2 hosts (defined in the Configuration Tab) using the comparison configuration (also defined in the Content Configuration Tab).

![JCR Compare - Content Comparison - JSON Compare](/acs-aem-commons/images/jcr-compare/content-comparison-json.png)

Click on non-matching results to open up a node-system (JSON-based) content comparison and see exactly what the different in content is.

> Comparison data collection can be a long running operation depending on the content trees/queries defined. Please ensure the configuration can be accommodated.

### JSON dump

![JCR Compare - Downloads - JSON](/acs-aem-commons/images/jcr-compare/download-json.png)

Basic functionality exists for downloading the raw JSON Dump for the comparison defined in the Configuration Tab.

> This functionality currently does not support the authentication credentials defined with each Host.


# JCR Compare via curl

To use the tool, do the following:

1. `HTTP GET /bin/acs-commons/jcr-compare.hashes.txt?path=/content/my-site` where `/content/my-site` should be replaced with the path you want to generate hashes for. For example:
`curl -u admin:admin http://localhost:4502/bin/acs-commons/jcr-compare.hashes.txt?path=/content/my-site > hashes_pub1.txt`
2. Save the output to a file and sort the results using the sort command on a linux machine then diff them. For example:

{% highlight xml %}
cat hashes_pub1.txt | sort > hashes_pub1_sorted.txt
cat hashes_pub2.txt | sort > hashes_pub2_sorted.txt
diff hashes_pub1_sorted.txt hashes_pub2_sorted.txt
{% endhighlight %}

Once you know which paths are different then you can go to each server you retrieved a diff against and use the `HTTP GET /bin/acs-commons/jcr-compare.dump.json` servlet to get a dump of the content. For example here is how you would request this for a particular node:

`curl -u admin:admin http://localhost:4502/bin/acs-commons/jcr-compare.dump.json?paths=/content/my-site/en/jcr:content`

Then you can use a JSON diff tool to visualize the differences: [http://tlrobinson.net/projects/javascript-fun/jsondiff](http://tlrobinson.net/projects/javascript-fun/jsondiff)

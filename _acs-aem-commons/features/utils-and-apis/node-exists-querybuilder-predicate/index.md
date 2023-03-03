---
layout: acs-aem-commons_feature
title: NodeExists QueryBuilder Predicate
description: Check if a node exists or not via a query!
sub-feature: true
date: 2013-02-12
feature-tags: aem-65 aem-cs
initial-release: 2.10.0/3.7.0
---

## Purpose

Provide a QueryBuilder predicate that allows for querying on the existance of nodes. This is great for checking if DAM Assets ahve all renditions.

## How to Use

Include this in your QueryBuilder query.

## 

* `nodeExists.or`  
  * When `nodeExists.or = false` (the default), all `nodeExists.exists` and `nodeExists.notexists` conditions for this predicate are `AND'd` together to determine if the result node is included.
  * When `nodeExists.or = true` (the default), all `nodeExists.exists` and `nodeExists.notexists` conditions for this predicate are `OR'd` together to determine if the result node is included.    
  * Options: true | false
  * Default: false
  * Example: 
  
* `nodeExists.exists`
  * Value: node to verify the existence of, relative to the query result node. This relative path must exist for this expression to return true.
  
* `nodeExists.notexists`
  * Value: node to verify the absence of, relative to the query result node. This relative path must NOT exist for this expression to return true.

### Example

{% highlight xml %}
type=dam:Asset
nodeExists.or=true
nodeExists.exists=jcr:content/renditions/original
nodeExists.2_exists=jcr:content/renditions/cq5dam.thumbnail.48.48.png
nodeExists.1_notexists=jcr:content/renditions/cq5dam.web.1280.1280.png
nodeExists.2_notexists=jcr:content/renditions/cq5dam.web.600.400.png
{% endhighlight %}

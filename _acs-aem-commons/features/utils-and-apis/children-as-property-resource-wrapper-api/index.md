---
layout: acs-aem-commons_feature
title: Children as Property Resource Wrapper API
description: ...
sub-feature: true
date: 2017-02-20
feature-tags: backend-dev
tags: new
initial-release: 2.10.0/3.7.0
---

## Purpose

Serializes super-flat children into a single property as a JSON object. This tends to be more performant than "real" no structures.

An example use case, is the serialization over over
 
 
 


## How to

`com.adobe.acs.commons.synth.children`

## ...

Unscientific metrics on operations using flat "real" nodes vs children as properties.

#### Add operation of 10,000 nodes
* Real nt:unstructured: 8,773ms ~> 8s
* Real oak:Unstructured: 6,374ms ~> 6s
* Unsorted property based: 632ms ~> 0.6s
* Sorted property based: 1,167ms ~> 1s


#### Add operation of 100,000 nodes
* Real nt:unstructured: 160,227ms ~> 160s
* Real oak:Unstructured: 87,324ms ~> 87s  - Package built in 101,377ms
* Property based: 5,240ms ~> 5s - Package built in 4,528ms
* Sorted property based: 6,646ms ~> 7s
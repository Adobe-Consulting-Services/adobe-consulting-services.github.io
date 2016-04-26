---
layout: acs-aem-commons_feature
title: Path Render Condition
description: Show and hide your nodes in Touch UI based on the current path.
date: 2016-04-25
thumbnail: /images/default/thumbnail.png
feature-tags: component-dev
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 2.4.0/3.0.0
---

## Purpose

Path Based Rendercondition lets you show and hide your nodes in Touch UI based on the current path you are in.
Want to show a custom action in the toolbar only when you are under /content/<mysite>? Use this render condition.
Only want to allow users to delete assets only under /content/dam/<myassets>? Use this render condition.

## How to Use

>[Renderconditions Public Document](https://docs.adobe.com/docs/en/aem/6-1/ref/granite-ui/api/jcr_root/libs/granite/ui/components/foundation/rendercondition.html)

Add a "rendercondition" node under any node and watch it go to work.


### Example Dialog

In the example below, the "Remove Workflow Instances" node will only show up for paths under `/content/geometrixx/en`

```<?xml version="1.0" encoding="UTF-8"?>
 <jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
     jcr:description="Remove Workflow Instances"
     jcr:primaryType="nt:unstructured"
     jcr:title="Workflow Remover"
     href="/etc/acs-commons/workflow-remover.html"
     id="acs-commons-workflow-remover"
     target="_blank">
     <rendercondition
         jcr:primaryType="nt:unstructured"
         sling:resourceType="acs-commons/granite/ui/components/renderconditions/path"
         path="/content/geometrixx/en/.*"/>
 </jcr:root>
```

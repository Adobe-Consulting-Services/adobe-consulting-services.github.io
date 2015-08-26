---
layout: acs-aem-commons_feature
title: Icon Picker
description: Add visual icon picker to dialogs
date: 2015-08-25
thumbnail: /images/iconpicker/thumbnail.png
feature-tags: component-dev
tags: acs-aem-commons-features new
categories: acs-aem-commons features
---

## Purpose

Adds a visual icon selection to AEM Component Dialogs.

> Currently, this feature only supports Font Awesome, but other icon fonts may be supported in the future.

## Usage

### Setup

A [Generic List](generic-list.html) must be created to hold the available icons. One is provided containing *all* icons in Font Awesome 4.4.0 icons, but projects will likely want to provide their own lists with the appropriate subset of icons. The value of each list item is the icon class name (e.g. `fa-film`).

Ensure that the appropriate font is available on your site. This can be done by adding the client library category `acs-commons.fontawesome` as a dependency for your site's main client library.

### Touch UI

For Touch UI, add a component definition to your dialog with a `sling:resourceType` of `acs-commons/components/authoring/graphiciconselect`. It must have a `datasource` child node which loads the icon list. For example:

    <icon xmlns:jcr="http://www.jcp.org/jcr/1.0"
          xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
          jcr:primaryType="nt:unstructured"
          fieldLabel="Icon" name="./icon"
          sling:resourceType="acs-commons/components/authoring/graphiciconselect">
                <datasource jcr:primaryType="nt:unstructured"
                            path="/etc/acs-commons/lists/font-awesome-icons"
                            sling:resourceType="acs-commons/components/utilities/genericlist/datasource"/>
    </icon>

### Classic UI

For Classic UI, add a widget using the xtype `graphiciconselection`.

    <icon xmlns:jcr="http://www.jcp.org/jcr/1.0"
          jcr:primaryType="cq:Widget" fieldLabel="Icon" name="./icon" 
          options="/etc/acs-commons/lists/font-awesome-icons/_jcr_content.list.json"
          xtype="graphiciconselection"/>

### Component Code

In your component code, output the appropriate markup, e.g.

    <c:if test="${!empty properties.icon}"><i class="fa ${properties.icon}"></i></c:if>
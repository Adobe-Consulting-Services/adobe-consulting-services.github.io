---
layout: acs-aem-commons_feature
title: Icon Picker
description: Add visual icon picker to dialogs
date: 2015-08-25
redirect_from: /acs-aem-commons/features/icon-picker.html
tags: aem-65 aem-cs
initial-release: 2.0.0
last-updated-release: 4.0.0
---

<div class="banner--notice">
<a href="/acs-aem-commons/pages/releases/4-0-0.html" target="_blank">As of ACS AEM Commons 4.0.0 all UI Widgets must be explicitly enabled</a>
</div>


> In version 2.1.0 the default `fa` CSS class has been removed. If you have created a custom Font Awesome generic list using 2.0.0, you will need to prefix each value with the `fa` CSS class.

## Purpose

Adds a visual icon selection to AEM Component Dialogs.

## Usage

### Wrapper Client Library (required as of 4.0.0)

The following wrapper Client Library node definition must be used to enable this feature.

* [Wrapper Client Library node definition](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/ui.apps/src/main/content/jcr_root/apps/acs-commons/touchui-widgets/icon-picker/.content.xml)

### Setup

A [Generic List](/acs-aem-commons/features/generic-lists.html) must be created to hold the available icons. One is provided containing *all* icons in Font Awesome 4.4.0 icons, but projects will likely want to provide their own lists with the appropriate subset of icons. The value of each list item is the icon class name (e.g. `fa fa-film`).

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

### Component Code

In your component code, output the appropriate markup, e.g.

    <c:if test="${!empty properties.icon}"><i class="${properties.icon}"></i></c:if>

### Using Other Icon Fonts

In order to use an icon font other than Font Awesome, you must do the following:

1. Create a Generic List as described above pointing to the specific icon classes.
2. Point the widget/component at your Generic List.
3. Create a new Client Library with the categories `cq.widgets` and `cq.authoring.dialog` with the CSS required for the specific font. For a specific example [download this package which enables Brandico](https://files.acrobat.com/a/preview/265e6578-936d-4ffc-8b14-99355c8baf08)

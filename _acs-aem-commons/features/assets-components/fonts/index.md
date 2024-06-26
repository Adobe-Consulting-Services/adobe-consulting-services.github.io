---
layout: acs-aem-commons_feature
title: Asset Fonts
description: Quickly see what fonts are used in an asset!
sub-feature: true
date: 2016-05-29
tags: aem-65 aem-cs
initial-release: 3.1.0
last-updated-release: 4.0.0
---

> This feature is AEM 6.2+ ONLY!

## Purpose

Images and documented edited with Adobe creative applications contain a variety of interesting metadata automatically inserted into them using the XMP metadata standard. AEM provides components for viewing and editing simple text and numeric values but in some cases, the metadata is defined in a structure and so the primitive fields can't display them properly.

## How to Use

{% include acs-aem-commons/wrapper-client-library.html path='/apps/acs-commons/components/dam/custom-component-activator/clientlib/.content.xml#L11-L17' %}

In order to take advantage of the automatic activation of any of these components, it is necessary to activate an OSGi component which handles the activation.

To do this, create a new node named `com.adobe.acs.commons.dam.impl.CustomComponentActivatorListServlet` of type `sling:OsgiConfig` in any valid `config` folder in the repository.

## Fonts

The Fonts component displays the fonts used in an asset. These are group by font face.

![Fonts](images/fonts.png)

### Activation

To activate this component, add a new disabled text field with the "Map to property" setting of `./jcr:content/metadata/xmpTPg:Fonts`.

![Fonts Activation](images/fonts-activation.png)

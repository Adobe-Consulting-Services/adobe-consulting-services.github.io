---
layout: acs-aem-commons_feature
title: Assets Geolocation Map
description: See from whence your assets hail!
date: 2016-05-29
thumbnail: /images/assets-geo-map/thumbnail.png
feature-tags: authoring
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 3.1.0
---

> This feature is AEM 6.2 ONLY!

## Purpose

Provide a way to rewrite the values in the `exif:GPSLatitude` and `exif:GPSLongitude` metadata fields from their stored notation (`DD,MM.SS[NEWS]`) to the more user-friendly `DD° MM' SS" [NEWS]` view.

Provide a visual map in the Assets metadata editor view, powered by OpenStreeMap via the Leaflet (http://leafletjs.com/) JS library.

![Geolocation Map](/acs-aem-commons/images/assets-geo-map/image.png)

## How to Use

To configure the display JavaScript bit, you need to add

`wrapperClass=acs-dam-location-degrees`

To the metadata field definition for exif:GPSLatitude and exif:GPSLongitude

To add the map, create a new component of type `acs-commons/components/dam/asset-location-map` in the metadata schema editor.

### Example

{% highlight xml %}
<col2
    jcr:primaryType="nt:unstructured"
    granite:rel="aem-assets-metadata-form-column"
    listOrder="1"
    sling:resourceType="granite/ui/components/coral/foundation/container">
  <items
      jcr:primaryType="nt:unstructured">
    <header
        jcr:primaryType="nt:unstructured"
        fieldLabel="Scheduled (de)activation"
        sling:resourceType="dam/gui/coral/components/admin/schemaforms/formbuilder/sectionfield">
      <granite:data
        jcr:primaryType="nt:unstructured"
        metaType="section"/>
    </header>

    <ontime
        jcr:primaryType="nt:unstructured"
        displayedFormat="YYYY-MM-DD HH:mm"
        fieldLabel="On Time"
        name="./jcr:content/onTime"
        renderReadOnly="true" sling:resourceType="granite/ui/components/coral/foundation/form/datepicker"
        type="datetime">
      <granite:data
        jcr:primaryType="nt:unstructured"
        metaType="datepicker"
        typeHint="Date"/>
    </ontime>

    <offime
        jcr:primaryType="nt:unstructured"
        displayedFormat="YYYY-MM-DD HH:mm"
        fieldLabel="Off Time"
        name="./jcr:content/offTime"
        renderReadOnly="true"
        sling:resourceType="granite/ui/components/coral/foundation/form/datepicker" type="datetime">
      <granite:data
        jcr:primaryType="nt:unstructured"
        metaType="datepicker"
        typeHint="Date"/>
    </offime>

    <header2
        jcr:primaryType="nt:unstructured"
        fieldLabel="Location" sling:resourceType="dam/gui/coral/components/admin/schemaforms/formbuilder/sectionfield">
      <granite:data
        jcr:primaryType="nt:unstructured"
        metaType="section"/>
    </header2>

    <latitude
        jcr:primaryType="nt:unstructured"
        disabled="true"
        fieldLabel="Latitude"
        name="./jcr:content/metadata/exif:GPSLatitude"
        renderReadOnly="true"
        showEmptyInReadOnly="true" sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
        wrapperClass="acs-dam-location-degrees">
      <granite:data
        jcr:primaryType="nt:unstructured"
        metaType="text"/>
    </latitude>

    <longitude
        jcr:primaryType="nt:unstructured"
        disabled="true"
        fieldLabel="Longitude"
        name="./jcr:content/metadata/exif:GPSLongitude"
        renderReadOnly="true"
        showEmptyInReadOnly="true"
        sling:resourceType="granite/ui/components/coral/foundation/form/textfield"
        wrapperClass="acs-dam-location-degrees">
      <granite:data jcr:primaryType="nt:unstructured" metaType="text"/>
    </longitude>

    <map
      jcr:primaryType="nt:unstructured"
      sling:resourceType="acs-commons/components/dam/asset-location-map"/>
  </items>

  <jcr:content jcr:primaryType="nt:unstructured"/>

</col2>
{% endhighlight %}

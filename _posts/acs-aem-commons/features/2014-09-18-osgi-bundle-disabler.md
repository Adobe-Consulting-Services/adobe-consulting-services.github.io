---
layout: acs-aem-commons_feature
title: OSGi Bundle Disabler
description: Disable OSGi Bundles as part of your build
date: 2014-09-18
thumbnail: /images/default/thumbnail.png
feature-tags: administration
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.7.5
---

## Purpose

The OSGi Bundle Disabler allowes OSGi bundles to be stopped by configuration.

AEM contains some bundles (e.g. CRXDE) that are useful during the development, but should be stopped on production instances.   You may also want to disable certain features that are not in use.   
  
Whilst it is possible to manually stop these bundles through the Apache Felix console, you may wish to do this through configuration, so that:

* the number of manual steps for manual deployment are minimised
 
* if the bundle is inadvertently enabled, it will be immediately disabled once more
 

## Description

If a bundle is stopped in the Apache Felix console, that 'stopped' state will persist across restarts.  However, there is no way of preventing Apache Felix from starting it.

This service allows you to specify the symbolic names of bundles that you wish to stop.

When the BundleDisabler service starts it will check all of the OSGi bundles and stop any of those whose symbolic name has been specified.

When any other bundle is started, the service will receive a BundleEvent notification and stop that bundle if required.


## How to Use

* Define a `sling:OsgiConfig`'s

`/apps/mysite/config/com.adobe.acs.commons.util.impl.BundleDisabler.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    bundles="[org.apache.sling.jcr.webdav,com.day.crx.crxde-support]"
    />
{% endhighlight %}     

`bundles` is an array of the OSGi bundle symbolic names to disable.  

To find the symbolic name of a bundle, select a bundle in the Apache Felix bundles console and the symbolic name will be listed amongst the properties of that bundle.

If you create the configuration under config.production for example, this configuration could be enabled only when that runmode is set in your production environment.

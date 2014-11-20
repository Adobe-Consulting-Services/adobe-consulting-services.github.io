---
layout: acs-aem-commons_feature
title: OSGi Component &amp; Bundle Disabler
description: Disable OSGi Components &amp; Bundles as part of your build
date: 2014-09-23
thumbnail: /images/osgi-disabler/thumbnail.png
feature-tags: administration
tags: acs-aem-commons-features
categories: acs-aem-commons features
initial-release: 1.7.0
---

## Purpose

The ACS AEM Commons OSGi Component Disabler allows you to shutdown OSGi Components and Services by configuration, but only after they have been started. Similarly the ACS AEM Commons OSGi Bundle Disabler provides the same functionality but for entire OSGi Bundles.


## OSGi Component Disabler (Released in v1.7.0)

Some OSGi Components can interfere or simply be unneccessary for an implementation but cannot be turned off soley via configuration (or no configuration). The feature allows these OSGi Services and Components to be disabled as part of your applications configuration.

In Apache Felix the state of Components and Services is not persisted across restarts of its containing bundle.

For example, when you have a Bundle S containing a service T, and you manually stop the service T; after the bundle is stopped and started, the service T is up again.
 
This service allows you to specify the names of components, which shouldn't be running. Whenever an OSGI service event is fired, which services checks the status of this components and stops them if required.

Note 1: The component is always started, but this service takes care, that it is stopped immediately after. So if a behaviour you don't like already happens during the activation of this service, you cannot prevent it using the mechanism here.

Note 2: Using this service should always be considered as a workaround. The primary focus should be to fix the component you want to disable, so it's no longer required to disable it. If this component is part of Adobe AEM please raise a Daycare ticket for it.

## How to Use


* Define a `sling:OsgiConfig`'s

`/apps/mysite/config/com.adobe.acs.commons.util.impl.ComponentDisabler.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    components="[pid1,pid2]"
    />
{% endhighlight %}     

`components` is an array of the OSGi component PIDs to disable.


## OSGi Bundle Disabler (Released in v1.8.0)

The OSGi Bundle Disabler allows ensures that OSGi bundles can be stopped by configuration.

AEM contains some bundles (e.g. CRXDE) that are very useful during the development, but should be stopped on production instances.  Also it may be desirable to disable certain features that are not in use.   
  
Whilst it is possible to manually stop these bundles through the Felix console, it may be desirable to do this through configuration, so that:

* the number of manual steps for manual deployment are minimised
 
* if the bundle is inadvertently enabled, it will be immediately disabled once more

If a bundle is stopped in the Apache Felix console, that stopped state will persist across restarts.  However, there is no way of permanently configuring Apache Felix to never start specific bundle.   

This service allows you to specify the symbolic names of bundles that shouldn't be running.  

When the service starts it will check all of the installed bundles and stop any of those specified that are not already uninstalled.  

When any bundle is started, the service will receive a BundleEvent notification and stop that bundle if has been specified. 

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

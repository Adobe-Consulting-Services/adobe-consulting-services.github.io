---
layout: acs-aem-commons_feature
title: Component Error Handler
description: Don't let erring Components ruin your day
date: 2013-10-23
redirect_from: /acs-aem-commons/features/component-error-handler.html
tags: aem-65 aem-cs
initial-release: 1.2.0
---

## Purpose

Gracefully handle erring components with custom views. Edit, Preview and Publish modes can all have custom HTML snippets to display when a Component throws an error.

## How to Use

Create a new `sling:OsgiConfig` to define how each view should be handled. To leverage the ACS AEM Commons OOTB views use the `sling:OsgiConfig` node defined below. This configuration will be used globally across all sites and pages on the AEM instance. 

    /apps/myapp/config/com.adobe.acs.commons.wcm.impl.ComponentErrorHandlerImpl.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    edit.enabled="{Boolean}true"
    edit.html="/apps/acs-commons/components/utilities/component-error-handler/edit.html"
    preview.enabled="{Boolean}false"
    preview.html="/apps/acs-commons/components/utilities/component-error-handler/preview.html"
    publish.enabled="{Boolean}false"
    publish.html="/dev/null"
    />
{% endhighlight %}  

You can also create HTML snippets pointed to by the `prop.*.html` OSGi Config properties to fully custom experience. 

* Different views can be configured to point to the same HTML file
* CSS can be added inline to the HTML files to provide a particular aesthetic
* To hide erring component set the path to "/dev/null" or ""

## Suppression (Since 1.5.0)

As of version 1.5.0, there are two mechanisms for suppressing the component error handler:

* A list of resource types can be set using the `suppress-resource-types` OSGi property.
* The request attribute `com.adobe.acs.commons.wcm.component-error-handler.suppress` can be set to the boolean `true`.
    * Request attribute suppression prevents component error handling in two ways
        1. Errors occurring within the context of the include which sets the suppression request attribute will be supressess (allowing a component to suppress itself).
        2. Errors occuring in any include after the suppression request attribute is set, UNTIL the suppression request attribute it removed/set to false, will be suppressed.


## AEM6 Support (Since 1.9.4)

AEM6 SP1 introduced [an issue](https://github.com/Adobe-Consulting-Services/acs-aem-commons/issues/378) where the OOTB `WCM Developer Mode Filter` swallow component expceptions. To work around this, the `WCM Developer Mode Filter` Filter must have its service ranking adjusted as follows.

    /apps/myapp/config.author/com.day.cq.wcm.core.impl.WCMDeveloperModeFilter.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    wcmdevmodefilter.enabled="{Boolean}true"
    service.ranking="{Long}75000" />
{% endhighlight %}  

## Bug Fixes

* Version 1.8.0 resolves conflict with ACS AEM Commons Error Page Handler which prevented error pages from displaying under WCMMode Disabled mode on Publish tier.
* Version 1.9.4 resolves Filter order conflict w AEM6 SP1's `WCM Developer Mode Filter` (see above)

* AEM6 requires adjusting the service ranking of the OOTB AEM WCMDeveloperModeFilter. This can be done by creating `sling:OsgiConfig` as follow. 

    /apps/myapp/config.author/com.day.cq.wcm.core.impl.WCMDeveloperModeFilter.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    wcmdevmodefilter.enabled="{Boolean}true"
    service.ranking="{Long}75000"
    />
{% endhighlight %}  

## Service User

On AEM 6.2 or above, this service uses a Service User for repository access. This user is configured with
the expected permissions required, but additional permissions may be required if your repository design
deviates from the expected structure.

User name: `acs-commons-component-error-handler-service`

ACLs:

* `jcr:read` on `/apps` and `/content`

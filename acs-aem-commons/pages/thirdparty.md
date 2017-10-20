---
layout: acs-aem-commons_default
title: Third Party Dependencies
---

# {{ page.title }}

ACS AEM Commons does not have **required** third party dependencies. This means that for most functionality, the only dependencies are the libraries included with the base AEM version.


Certain features do have third party dependencies. Depending upon the nature of the feature, the lack of a dependency may result in the complete feature being unusable or only partially disabled. In cases where the entire feature is dependent upon a third party library, that feature may be isolated into a separate Java bundle which will not resolve without the dependency. In cases where the feature is partially usable, optional OSGi imports will be used.


Third party dependencies will generally be made available in content package form. In cases where OSGi bundles are already available, we will simply package those bundles into a package. In cases where an OSGi bundle is not available, we will wrap dependencies into OSGi bundles and then make a content package available for easy deployment.

<hr/>

## Packaged Third-party Dependencies

[Learn more about and Download the third-party dependencies](/pages/acs-aem-bundles.html)

<hr/>

## Using ACS AEM Commons without 3rd-party dependencies

#### Available since version 1.6.0

When running the "full" ACS AEM Commons bundle, benign errors appear in the error.log if the below third-party bundle depdencies are not installed. While these errors do not harm the operation of AEM or ACS AEM Commons (other than preventing the associated ACS AEM Commons behaviors).

{% highlight xml %}
    <dependency>
        <groupId>com.adobe.acs</groupId>
        <artifactId>acs-aem-commons-content</artifactId>
        <version>{{ site.data.acs-aem-commons.version }}</version>
        <classifier>min</classifier>
        <type>content-package</type>
    </dependency>
{% endhighlight %}



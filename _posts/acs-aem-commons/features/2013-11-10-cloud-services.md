---
layout: acs-aem-commons_feature
title: AEM Cloud Services
description: Integrate with cloud services like a Pro!
date: 2013-11-10
thumbnail: /images/cloud-services/thumbnail.png
tags: acs-aem-commons-features updated
categories: acs-aem-commons features
initial-release: 1.2.0
---

### Currently only supported in AEM 5.6.1+

Due to a AEM 5.6.0 product issue.

> In order to use these Cloud Services, ensure that the Cloud Service configuration components are included in *both* the head and body of the page. This typically is done by including `<cq:include script="/libs/cq/cloudserviceconfigs/components/servicelibs/servicelibs.jsp"/>` in _headlibs.jsp_ and `<cq:include path="cloudservices" resourceType="cq/cloudserviceconfigs/components/servicecomponents"/>` in _body.jsp_. If you run into trouble with these Cloud Services, compare your page component scripts to the Foundation page component.

## Adobe Dynamic Tag Manager (DTM)

Centrally manage and distribute JavaScript across all your web properties.

![image]({{ site.data.acs-aem-commons.baseurl }}/images/cloud-services/dtm.png)

### How to Use

1. Navigate to `AEM Author > Tools > Cloud Services Configurations`
2. Select `Adobe Dynamic Tag Manager`
3. Select `New > New Page`
4. Select `Adobe Dynamic Tag Manager Configuration` and open the newly created page
5. Enter the Header Script URL and Footer JavaScript provided by the [Adobe DTM site](http://dtm.adobe.com)
6. Apply this Adobe Dynamic Tag Manager Configuration to any AEM Page in the usual manner
	`Page Properties > Cloud Services Tab > Add Service > Adobe Dynamic Tag Manager > Select the configuration`


## Typekit

Leverage Adobe Typekit's web-fonts to make your AEM web sites stand out on the Web.

![image]({{ site.data.acs-aem-commons.baseurl }}/images/cloud-services/typekit.png)

### How to Use

1. Navigate to `AEM Author > Tools > Cloud Services Configurations`
2. Select `Typekit`
3. Select `New > New Page`
4. Select `Typekit Configuration` and open the newly created page
5. Enter your Kit ID
6. Apply this Typekit Configuration to any AEM Page in the usual manner
	`Page Properties > Cloud Services Tab > Add Service > TypeKit > Select the configuration`


## Share This (Since 1.7.0)

Leverage Share This to easily add social sharing to your site.

![image]({{ site.data.acs-aem-commons.baseurl }}/images/cloud-services/sharethis.png)

### How to Use

1. Navigate to `AEM Author > Tools > Cloud Services Configurations`
2. Select `Share This`
3. Select `New > New Page`
4. Select `Share This Configuration` and open the newly created page
5. Enter your Publisher ID
6. Configure the other options as needed.
7. Apply this Share This Configuration to any AEM Page in the usual manner
	`Page Properties > Cloud Services Tab > Add Service > Share This > Select the configuration`



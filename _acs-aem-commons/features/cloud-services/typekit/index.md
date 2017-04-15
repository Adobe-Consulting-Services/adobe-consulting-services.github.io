---
layout: acs-aem-commons_feature
title: Typekit Cloud Service
description: Use your fonts!
date: 2013-11-10
sub-feature: true
initial-release: 1.2.0
---
## Purpose

Leverage Adobe Typekit's web-fonts to make your AEM web sites stand out on the Web.

## General Requirements

In order to use these Cloud Services, ensure that the Cloud Service configuration components are included in *both* the head and body of the page. This typically is done by including `<cq:include script="/libs/cq/cloudserviceconfigs/components/servicelibs/servicelibs.jsp"/>` in _headlibs.jsp_ and `<cq:include path="cloudservices" resourceType="cq/cloudserviceconfigs/components/servicecomponents"/>` in _body.jsp_. If you run into trouble with these Cloud Services, compare your page component scripts to the Foundation page component.

## Special Requirement when using AEM 6.1+

On AEM 6.1, use of these components generally require enabling of the CQ Configuration Manager component, which is disabled by default. This is required for cross-compatibility with AEM 6.0 and AEM 6.1.

![image](images/enable-configuration-manager.png)

This must be done in both author and publish.


![image](images/typekit.png)

### How to Use

1. Navigate to `AEM Author > Tools > Cloud Services Configurations`
2. Select `Typekit`
3. Select `New > New Page`
4. Select `Typekit Configuration` and open the newly created page
5. Enter your Kit ID
6. Apply this Typekit Configuration to any AEM Page in the usual manner
	`Page Properties > Cloud Services Tab > Add Service > TypeKit > Select the configuration`


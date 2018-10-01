---
layout: acs-aem-commons_feature
title: Adobe I/O APIs
description: AEM + Adobe I/O = ♥
date: 2018-09-24
feature-tags: backend-dev
initial-release: 3.18.0
---

## Purpose

This feature enables you to make Adobe I/O api-calls, whereby all the plumbing is done for you.

## How to

Follow this article to setup your integration on Adobe I/O: https://blogs.adobe.com/experiencedelivers/uncategorized/calling-api-adobe-o/

Once this is done...

1. Configure `ACS AEM Commons - Adobe I/O Integration Configuration` via [/system/console/configMgr](http://localhost:4502/system/console/configMgr)
2. The values need to be copied for the integration on [https://console.adobe.io](https://console.adobe.io).
3. The private key needs to be copied include the header and footer lines (`BEGIN PRIVATE KEY / END PRIVATE KEY`)
4. Login claims can be found under the JWT-tab, values are like [https://ims-na1.adobelogin.com/s/ent_campaign_sdk](https://ims-na1.adobelogin.com/s/ent_campaign_sdk)

![Adobe I/O Integration](./images/adobeio-configuration.jpg)

Once this is done, you can configure the endpoints you want to use, an example is displayed here.

![Endpoint configuration](./images/adobeio-endpoint-config.jpg)

After all these configurations you can use the health check (/system/console/healthcheck) 'adobeio' to test this all.

![Adobe I/O healthcheck](./images/adobeio-healthcheck.jpg)

## How to use this in your code?

When you have defined your endpoints you can use them inside your code like this

    @Reference(target = "(id=target-activities)")
    private EndpointService endpointService;

Once you have the reference to the EndpointService you can execute the Adobe I/O api calls.

## JavaDocs

The full Java Docs for this API can be found at:

* [https://adobe-consulting-services.github.io/acs-aem-commons/apidocs/com/adobe/acs/commons/adobeio/service/package-summary.html](https://adobe-consulting-services.github.io/acs-aem-commons/apidocs/com/adobe/acs/commons/adobeio/service/package-summary.html)

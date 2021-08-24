---
layout: acs-aem-commons_subpage
title: Redirect Manager - Support For Sling Mappings
---

## Support For Sling Mappings

In the simplest form ACS Redirect Manager maps a JCR path to another JCR path , e.g. 

```/content/we-retail/en/page1 => /content/we-retail/en/page2```

which means the redirect target will be put in the `Location` header as is:
```shell
$ curl -I http://localhost:4503/content/we-retail/en/page1.html
HTTP/1.1 302 Found
Location: /content/we-retail/en/page2.html
```

This may not work for setups where Dispatcher forces shortened URLs via mod_rewrite rules, e.g.
```shell
https://www.we-retail.com/en/page1.html # HTTP 200
https://www.we-retail.com/content/we-retail/en/page2.html # HTTP 404, only shortened paths are accepted
```
in such a case client expects a shortened url in the Location header, e.g.  
```shell
$ curl -I https://www.we-retail.com/en/page1.html
HTTP/1.1 302 Found
Location: /en/page2.html   # or https://www.we-retail.com/en/page2.html
```

To meet this requirement ACS Redirect Manager supports [Sling Mappings](https://sling.apache.org/documentation/the-sling-engine/mappings-for-resource-resolution.html) 
. With this feature redirect target will be passed through ResourceResolver#map before setting the _Location_ header.

### Enable Sling Mappings 
Sling Mappings in Redirect Filter are disabled by default. To enable this feature check the 'Rewrite Location Headers' checkbox in the OSGi configuration 
or add a `rewriteUrls="{Boolean}true"` parameter in the OSGi configuration:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
          jcr:primaryType="sling:OsgiConfig"
          rewriteUrls="{Boolean}true"
          enabled="{Boolean}true"/>
```

### Example

In the example below we will setup Sling Mappings for the We.Retail site and use them to map redirect rules. 

#### We.Retail Sling Mappings
Create a node _/etc/map/https/www.we-retail.com_ with the following content:

```json
{
  "jcr:primaryType": "sling:Folder",
  "www.we-retail.com": {
    "jcr:primaryType": "sling:Mapping",
    "sling:internalRedirect": [
      "/content/we-retail",
      "/content/dam/we-retail"
    ]
  }
}
```
With this mappings Sling will map a full JCR path to a shortened domain URL, e.g. 
```java
// map /content/we-retail/en/page1 to https://www.we-retail.com/en/page1
String mappedUrl = resourceResolver.map("/content/we-retail/en/page1"); // returns https://www.we-retail.com/en/page1
```
where the domain and schema are taken from the path by naming conventions. See the [Mappings for Resource Resolution](https://sling.apache.org/documentation/the-sling-engine/mappings-for-resource-resolution.html) page for more details.
 
#### Mapping Redirect Target
With the mappings above the Location header will be passed through `ResourceResolver#map` and user will get a shortened domain URL, e.g.

```shell
$ curl -I http://localhost:4503/content/we-retail/en/page1.html
HTTP/1.1 302 Found
Location: https://www.we-retail.com/en/page2.html  # mapped from /content/we-retail/en/page2.html
```

#### Mapping Redirect Source
Support for Sling Mappings provides another handy feature: when mappings are enabled Redirect Filter will first try to match  
the full JCR path, e.g. _/content/we-retail/en/page1.html_ and if it didn't match it will try to match the mapped path, e.g. _/en/page1.html_

This makes it possible to define redirect rules either in terms of full JCR paths or in shortened paths. For example, the two rules below are equivalent:

```shell
# /content/we-retail/en/page => /content/we-retail/en/welcome

$ curl -I http://localhost:4503/content/we-retail/en/page.html
HTTP/1.1 302 Found
Location: https://www.we-retail.com/en/welcome.html  # mapped from /content/we-retail/en/page2.html

```
and
```shell
# /en/page => /en/welcome

$ curl -I http://localhost:4503/content/we-retail/en/page.html
HTTP/1.1 302 Found
Location: /en/welcome.html  # redirect target as is

```

In the second case Redirect Filter will first try to lookup a rule by the JCR Path (_/content/we-retail/en/page_) 
and then will try to match the mapped path (_/en/page_) . 

## Custom Location Rewriter

There can be cases clients would want to apply custom logic to rewrite the Location header before delivery.
Redirect Manager provides a hook which allows to register a class to rewrite urls:

```java
package com.adobe.acs.commons.redirects;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.osgi.service.component.annotations.Component;

@Component
public class MyLocationAdjuster implements LocationHeaderAdjuster{
    @Override
    public String adjust(SlingHttpServletRequest request, String location) {

        if(location.startsWith("/content/we-retail/de/")){
            String loc = StringUtils.substringAfter(location,"/content/we-retail/de/");
            return "https://www.we-retail.de/" + loc;
        }
        return location;
    }
}
```

You can use it as an alternative to Sling Mappings.


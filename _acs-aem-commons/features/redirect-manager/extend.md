---
layout: acs-aem-commons_subpage
title: Redirect Manager - Extending Functionality
---

## Extending Functionality

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

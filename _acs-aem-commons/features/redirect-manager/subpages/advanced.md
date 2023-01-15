---
layout: acs-aem-commons_subpage
title: Redirect Manager - Advanced Configuration
redirect_from: /acs-aem-commons/features//redirect-manager/advanced.html
---

### Additional Response Headers

The `additionalHeaders` parameter specifies additional response headers to apply on delivery in the name: value format, e.g.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
          jcr:primaryType="sling:OsgiConfig"
          enabled="{Boolean}true"
          additionalHeaders="[Cache-Control: max-age=3600,Cache-Control: no-store]"
/>
```

```shell
$ curl -I http://localhost:4503/content/we-retail/page1.html
HTTP/1.1 302 Found
Location: /content/we-retail/page2.html
Cache-Control: max-age=3600
Cache-Control: no-store
```


### Preserving Query String

The `preserveQueryString` parameter controls whether query string will be preserved in redirects, e.g.

```shell
$ curl -I http://localhost:4503/content/we-retail/page1.html?a=1&b=2
HTTP/1.1 302 Found
Location: /content/we-retail/page2.html?a=1&b=2     # query string preserved
```

The default value is `true`. Set `preserveQueryString` to false to drop query string parameters in redirects:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
          jcr:primaryType="sling:OsgiConfig"
          enabled="{Boolean}true"
          preserveQueryString="{Boolean}false"
/>
```

```shell
$ curl -I http://localhost:4503/content/we-retail/page1.html?a=1&b=2
HTTP/1.1 302 Found
Location: /content/we-retail/page2.html   # no query string
```

### Preserving Extensions

By default, redirect manager preserves extension if it is present in the request. 
This lets you define redirects without the `.html` extension and redirect manager will automatically append it. 

#### Example. 
Notice .html in the Location header. 
| Source                             | Target                             | Status Code |
|------------------------------------|------------------------------------|-------------|
| /content/geometrixx/us/en/about-us | /content/we-retail/us/en/about-us | 302         |

```shell
$ curl -I http://localhost:4503/content/geometrixx/us/en/about-us.html
HTTP/1.1 302 Found
Location: /content/we-retail/us/en/about-us.html
```

This behaviour is controlled by  the `preserveExtension` flag.  Set it to `false` to disable appending extensions:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
          jcr:primaryType="sling:OsgiConfig"
          enabled="{Boolean}true"
          preserveExtension="{Boolean}false"
/>
```

```shell
$ curl -I http://localhost:4503/content/geometrixx/us/en/about-us.html
HTTP/1.1 302 Found
Location: /content/we-retail/us/en/about-us
```
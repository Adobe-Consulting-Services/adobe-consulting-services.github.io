---
layout: acs-aem-commons_subpage
title: Search
redirect_from: /acs-aem-commons/features/redirect-manager/manage.html
---

## Redirecting in Dispatcher with Apache httpd RewriteMap Directive

> [!NOTE]
> This feature requires AEMaaCS version 18311 or higher and ACS AEM Commons version 6.10.0 or higher.

Since ACS AEM Commons v6.10.0, Redirect Manager supports [Pipeline-free URL Redirects](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/content-delivery/pipeline-free-url-redirects) in Dispatcher.

When this option is used, Redirect Manager compiles redirects into a text file, e.g. http://localhost:4502/conf/my-site/settings/redirects.txt, which is further used by Dispatcher to convert into the [RewriteMap](https://httpd.apache.org/docs/2.4/mod/mod_rewrite.html#rewritemap) and evaluate the redirect rules in Apache, without requests hitting AEM at all.

#### http://localhost:4502/conf/my-site/settings/redirects.txt
```
# Redirect Map File
/legacy/page1 /en/page1
/legacy/page2 /en/page2
/legacy/page3 /en/page3
```


### Configuration

To enable pipeline-free URL redirects you need to update your dispatcher configuration. Make sure you use the [flexible mode file structure](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/implementing/content-delivery/validation-debug#flexible-mode-file-structure).

In the simplest case you will need to touch two files:

#### Redirect Map File
```
+src
    + conf.d
        + rewrites
            - rewrite.rules             # defines the redirect rules
    + opt-in
        - managed-rewrite-maps.yaml     # tells Dispatcher what redirect configurations to pull from Redirect Manager
```


#### managed-rewrite-maps.yaml
```yaml
maps:
  - name: my-site-301.map
    path: /conf/my-site/settings/redirects.301.txt
  - name: my-site-302.map
    path: /conf/my-site/settings/redirects.302.txt
```
The `301|302` selector filters the output by status code.
Dispatcher will sync these configuartions into the local storage under the *fixed* location `/tmp/rewrites/`, and then you can reference them in the rewrite rules.

#### rewrite.rules
```
# RewriteMap from managed rewrite maps
RewriteMap my-site-301.map dbm=sdbm:/tmp/rewrites/my-site-301.map
RewriteCond ${my-site-301.map:$1} !=""
RewriteRule ^(.*)$ ${my-site-301.map:$1|/} [L,R=301]

RewriteMap my-site-302.map dbm=sdbm:/tmp/rewrites/my-site-302.map
RewriteCond ${my-site-302.map:$1} !=""
RewriteRule ^(.*)$ ${my-site-302.map:$1|/} [L,R=302]
```

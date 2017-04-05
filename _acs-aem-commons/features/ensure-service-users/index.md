---
layout: acs-aem-commons_feature
title: Ensure Service User
description: Ensure your service users exist!
date: 2017-02-14
feature-tags: backend-dev 
tags: new
initial-release: 3.10.0
---

## Purpose

Since AEM 6.2, service users are used to access the JCR instead of using the administrative resource resolver. Service users require ACLs applied to provide only enough access for the service user to perform its function.

Because of this, projects often require the definition of many service users and ACLs, which traditionally are managed in manually in a discrete permissions package. The management of the service users can be confusing and error-prone.

The Ensure Service User facilitates defining service users and their ACLs in OSGi configurations, and will intelligently ensure they exist on the target AEM instances.


## Configuration

Create an OSGi configuration for each service user:

    /apps/my-app/config/com.adobe.acs.commons.util.impl.EnsureServiceUser-myServiceUser

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    principalName="my-service-user"
    type="add"
    ensure-immediately="{Boolean}true"
    aces ="[type=allow;permissions=jcr:read,rep:write;path=/content/foo;rep:glob=/jcr:content/*]"
{% endhighlight %}

### OSGi Config Properties

`principalName`

* The service user name
* Can be just the principal name or the absolute path where the user should be stored in the JCR
    * my-service-user OR /home/users/system/my-service-user

`type`

* Options: add OR remove
* Add will ensure the existance of the service user and ACLs
* Remove ensures that the service user and any ACLs are removed
* Defaults to `add`

`ensure-immediately`

* Options: true OR false
* When set to true, the ensurance is performed whenever this bundle is loaded.
* Defaults to true

`aces`

* Array of ACE definitions to ensure for the principal
* Format: `type=allow;permissions=jcr:read,rep:write;path=/content/foo;rep:glob=/jcr:content/*`
  * `type: allow OR deny` 
    * Required
  * `permissions`: comma delimited list of valid JCR permissions
    * Required
  * `path`: absolute content path which the ACE will be applied
    * Required
  * `rep:glob=<single glob-pattern>`
    * Optional
    * Example: `rep:glob=*/jcr:content/renditions/original`
  * `rep:prefixes=<comma-delimited list of prefixes>`
    * List of namespace prefixes
    * Optional
    * Example: `rep:prefixes=cq,dam`
  * `rep:ntNames=&lt;comma-delimited list of ntNames&gt;`
    * Optional
    * Example: `rep:ntNames=cq:Page,cq:PageContent`
  * `rep:itemNames=<comma-delimited list of itemNames>`
    * List of namespace prefixes
    * Optional
    * Example: `rep:itemNames=cq:lastModifiedBy,jcr:lastModifiedBy`
    
For more information on `rep:glob`, `rep:ntNames`, `rep:itemNames` and `rep:prefixes` [http://jackrabbit.apache.org/oak/docs/security/authorization/restriction.html](Apache Oak Restrictions documentation)
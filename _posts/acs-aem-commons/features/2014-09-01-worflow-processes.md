---
layout: acs-aem-commons_feature
title: Workflow Processes
description: Helpful Workflow processes
date: 2014-09-01
thumbnail: /images/workflow-processes/thumbnail.png
tags: acs-aem-commons-features authoring administration
categories: acs-aem-commons features
initial-release: 1.8.0
---

## Send Template'd E-Mail Workflow Process (v1.9.0)

Based on the payload the email parameters are pre-populate with JCR properties:

* If payload is a **DAM asset** then the param map is populated with `[dam:Asset]/jcr:content/metadata` node properties
* If the payload is **cq:Page** then the param map is populated with `[cq:Page]/jcr:content` properties
* The param map keys are the Node's property names and the values the `String` representations of the property value. For `String[]` properties the value is one comma separated String.
  * Currently `String[]` are checked for multiple properties.

Include additional parameters added to E-mail params

* **wfStepTitle**: Title of workflow step
* **wfModelTitle**: Name of workflow model
* **authorLink**: Uses AuthorUIHelper service to create a link to the payload on author
* **publishLink**: Uses AEM Externalizer service to create a link to the payload on Publish

WF Process is configured using the OOTB Process Step with the following workflow arguments:

* **sendTo**: Path to a CQ user or group. An E-mail will be sent to the user. In the case of a group, an E-mail  is sent to all members.
* **emailTemplate**: Absolute path to the E-mail template to use in the JCR repository.
* **dateFormat**: (optional) SimpleDateFormat string for converting Calendar properties to a String to be used in the email (i.e: yyyy-MM-dd hh:mm)

![image](/acs-aem-commons/images/workflow-processes/send-templated-email-wf-process/wf-step.png)

To support the **authorLink** mentioned above the ACS AEM Commons Author UI Helper can be configured.

![image](/acs-aem-commons/images/workflow-processes/send-templated-email-wf-process/author-ui-helper.png)

Define a @sling:OsgiConfig@ to customize the Author UI Helper Service `/apps/mysite/config.author/com.adobe.acs.commons.wcm.impl.AuthorUIHelperImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
	jcr:primaryType="sling:OsgiConfig"
	isTouch="{Boolean}true"
	wcmEditorTouchURL="/editor.html"
	wcmEditorClassicURL="/cf#"
	damEditorTouchURL="/assetdetails.html"
	damEditorClassicURL="/damadmin#"/>
{% endhighlight %}

The default settings are as follows. If the defaults are applicable to your use case there is no need to create an OSGi Configuration. Typically the only property changed is `isTouch` to `{Boolean}false` is the ClassicUI is used for Page editting.

## Replicated By Workflow Initiator (v1.8.0)

Mark content as replicated by the Workflow Initiator. This Workflow Process is essential when leveraging AEM's built-in Request for Activation and Request for Deactivation Workflow models.

![image](/acs-aem-commons/images/workflow-processes/replicated-by-workflow-initiator.png)

A new Workflow Process step that executed Replicated By Workflow Initiator can be added to the end of this model, and content will be marked as being Activated/Deactived by the user that initiated the replication request.

![image](/acs-aem-commons/images/workflow-processes/replicated-by-workflow-initiator-config.png)

## Content Traversing Workflow - Synthetic Workflow Wrapper

Synthetic Workflow Wrapper is a Process steps that will traverse the entire content tree, and process the each `dam:Asset` or `cq:Page` using the provided workflow model as ACS Commons synthetic workflow.

Processing the tree in a serial fashion allows for a more controlled workflow execution decreasing the chances of overloading AEM. Setting `throttle` to `true` decreases the chances further.

![Workflow - Synthetic Workflow Wrapper](/acs-aem-commons/images/workflow-processes/synthetic-workflow-wrapper-process-args.png)

### Process Args options

* `throttle`
  * `true` or `false`
  * Defaults to `false`
  * If `true`, throttles the execution using ACS Commons Throttled Task Runner (part of ACS Commons Fast Action Manager)
* `traverseTree`
  * `true` or `false`
  * Defaults to `false`
  * If `true`, walks the entire content tree under the payload looking for the first `dam:Asset` nodes to process (does not process sub-Assets)
* `saveInterval`
  * The number of sub-payloads to process before saving.
* `workflowModelId`
  * The absolute path to the `cq:Workflow` to execute as Synthetic Workflow.
  * Note this workflow must be ACS Commons Synthetic Workflow compatible.

{% highlight xml %}
throttle=true|false
traverseTree=true|false
saveInterval=1024
workflowModelId=/etc/workflow/models/dam/update_asset
{% endhighlight %}


## Content Traversing Workflow - Replicate with Options

**Replication with Options** is a Process steps that will traverse the entire content tree, and process the each `dam:Asset` or `cq:Page`, replicating each node based on the Process Args.

Processing the tree in a serial fashion allows for a more controlled workflow execution decreasing the chances of overloading AEM. Setting `throttle` to `true` decreases the chances further.

![Workflow - Synthetic Workflow Wrapper](/acs-aem-commons/images/workflow-processes/replicate-with-options-process-args.png)

### Process Args Options

* `replicationActionType`
  * Options include [ReplicationActionType's](aem/6-0/develop/ref/javadoc/com/day/cq/replication/ReplicationActionType.html): ACTIVATE | DEACTIVATE | DELETE
* `throttle`
  * `true` or `false`
  * Defaults to `false`
  * If `true`, throttles the execution using ACS Commons Throttled Task Runner (part of ACS Commons Fast Action Manager)
* `traverseTree`
  * `true` or `false`
  * Defaults to `false`
  * If `true`, walks the entire content tree under the payload looking for the first `dam:Asset` nodes to process (does not process sub-Assets)
* `synchronous`
  * `true` or `false`
  * Defaults to `false`
  * Typically best to set to `true` to ensure the replication queue does not build up.
* `suppressVersions`
  * `true` or `false`
  * Defaults to `false`
  * Typically best to set to `false` if version are not required (as their creation is work to be done)

  {% highlight xml %}
  replicationActionType=ACTIVATE|DEACTIVATE|DELETE
  synchronous=true|false
  suppressVersions=true|false
  throttle=true|false
  traverseTree=true|false
  {% endhighlight %}

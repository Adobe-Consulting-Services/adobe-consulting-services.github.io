---
layout: acs-aem-commons_feature
title: Workflow Remover
description: Power-tooling for workflow removal
date: 2015-05-18
thumbnail: /images/workflow-remover/thumbnail.png
feature-tags: administration
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.10.0
---

## Purpose

During content migration, bulk ingest, development, or just unanticipated situations, large volumnes of Workflow instances can amass. When large volumes of Workflow instances exist in AEM, system resources may become taxed.

While AEM has OOTB support for Workflow maintenance, this functionality has limitations (ex. only workflow instances older than 1 day can be removed).

ACS AEM Commons' Workflow Remover helps bridge the gap and provide power-tooling to remove unwanted Workflow instances.

## How to Use

### Web UI

In AEM, navigate to the Tools > ACS AEM Commons > Workflow Remover

![Workflow Remover - Web UI](/acs-aem-commons/images/workflow-remover/web-ui.png)

* Status: [Required] Select the statuses for the Workflows to be removed. 
 * If no status is selected, no Workflow instances will be removed.
* Payload Paths: [Optional] Worflow payload paths must match at least one regex to be removed.
* Older Than: [Optional] Worflow instances must be created older than this time.
* Models: [Optional] Workflow models that are eligible for removal.
  * If no models are selected, all models are eligible for removal.

The Workflow Remover Web UI will show status from the last successful Workflow Removal execution.

![Workflow Remover - Status](/acs-aem-commons/images/workflow-remover/status.png)


### Scheduled Service

ACS AEM Commons' Workflow Remover can also be used to schedule removal of workflow instances sing the same criteria as the Web UI.

![Workflow Remover - Scheduler](/acs-aem-commons/images/workflow-remover/scheduler-osgi-config.png)


#### OSGi Configuration

Define a `sling:OsgiConfig` with the following attributes.

	/apps/mysite/config.author/com.adobe.acs.commons.workflow.bulk.removal.impl.WorkflowInstanceRemoverScheduler-pdfs.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.ortg/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    scheduler.expression="0 1 0 ? * *"
	workflow.statuses="[ABORTED,COMPLETE,RUNNING,SUSPENDED,STALE]"
	workflow.models="[/etc/workflow/models/dam/adddamsize/jcr:content/modelm/etc/workflow/models/my-app/my-workflow-model/jcr:content/model]",
	workflow.payloads="[/content/dam/.+/.*\.pdf(/.*)?]",
	workflow.older-than="1234567890"
	
    />
{% endhighlight %}

* scheduler.expression: The usual Sling Scheduler expression (see www.cronmaker.com)
* workflow.statuses: Only remove Workflow Instances that have one of these statuses
	* ABORTED,COMPLETE,RUNNING,SUSPENDED,STALE
* workflow.models: Only remove Workflow Instances that belong to one of these WF Models.
	* Example: /etc/workflow/models/dam/adddamsize/jcr:content/model
* workflow.payloads: Only remove Workflow Instances whose payloads match one of these regex patterns.
* worlflow.older-than: Only remove Workflow Instances whose payloads are older than this UTC Time in milliseconds.

Note: 

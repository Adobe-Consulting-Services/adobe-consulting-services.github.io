---
layout: acs-aem-commons_feature
title: Workflow Remover
description: Power-tooling for workflow removal
date: 2015-05-18
redirect_from: /acs-aem-commons/features/workflow-remover.html 
feature-tags: administration
initial-release: 1.10.0
last-updated-release: 4.3.4
---

## Purpose

During content migration, bulk ingest, development, or just unanticipated situations, large volumes of Workflow instances can amass.

AEM has OOTB support for Workflow clean-up via Granite Console and JMX however may not satisfy all use cases. ACS AEM Commons' Workflow Remover helps bridge the gap and provide power-tooling to remove unwanted Workflow instances.

## How to Use

### Web UI

In AEM, navigate to the (1) Tools > (2) ACS AEM Commons > (3) Manage Controlled Processes

![Launching Workflow Remover](images/start_1.png)

From the MCP console, click "Start Process." (4)

![Launching Workflow Remover](images/start_2.png)

Select the Workflow Remover process from the list and click next. (5)

![Launching Workflow Remover](images/start_3.png)

## Options

![Workflow Remover options](images/options.png)

* Workflow Payload Paths: [Optional] Workflow payload paths must match at least one regex to be removed.  Click the add button to add additional paths.
* Workflows Older Than: [Optional] Workflow instances must be created older than this time.
* Workflow Models: [Optional] Workflow models that are eligible for removal.
  * If no models are selected, all models are eligible for removal.
* Workflow Statuses: [Required] Select the statuses for the Workflows to be removed.
 * If no status is selected, no Workflow instances will be removed.   Click the add button to select multiple statuses if desired.

Once you click start, the process will be run and managed by MCP.  When it is complete a report of removed items is provided

![Workflow Remover - Status](images/report_header.png)


### Scheduled Service

ACS AEM Commons' Workflow Remover can also be used to schedule removal of workflow instances sing the same criteria as the Web UI.

![Workflow Remover - Scheduler](images/scheduler-osgi-config.png)


#### OSGi Configuration

Define a `sling:OsgiConfig` with the following attributes.

	/apps/mysite/config.author/com.adobe.acs.commons.workflow.bulk.removal.impl.WorkflowInstanceRemoverScheduler-pdfs.xml

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.ortg/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"

    scheduler.expression="0 1 0 ? * *"
    workflow.statuses="[ABORTED,COMPLETED,RUNNING,SUSPENDED,STALE]"
    workflow.models="[/etc/workflow/models/dam/adddamsize/jcr:content/modelm/etc/workflow/models/my-app/my-workflow-model/jcr:content/model]"
    workflow.payloads="[/content/dam/.+/.*\.pdf(/.*)?]"
    workflow.older-than="1234567890"
    max-duration="60"

    />
{% endhighlight %}

* scheduler.expression: The usual Sling Scheduler expression (see www.cronmaker.com)
* workflow.statuses: Only remove Workflow Instances that have one of these statuses
	* ABORTED,COMPLETE,RUNNING,SUSPENDED,STALE
* workflow.models: Only remove Workflow Instances that belong to one of these WF Models.
	* Example: /etc/workflow/models/dam/adddamsize/jcr:content/model
* workflow.payloads: Only remove Workflow Instances whose payloads match one of these regex patterns.
* worlflow.older-than: Only remove Workflow Instances whose payloads are older than this UTC Time in milliseconds.
* max-duration: Max number of minutes to run. 0 for no limit.


## Service User

On AEM 6.2 or above, this service uses a Service User for repository access. This user is configured with
the expected permissions required, but additional permissions may be required if your repository design
deviates from the expected structure.

User name: `acs-commons-workflow-remover-service`

ACLs:

* `jcr:read`, `jcr:write` on `/etc/workflow/instances`

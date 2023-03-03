---
layout: acs-aem-commons_feature
title: Set Replication Status
description: Updates replication status via WF! 
date: 2017-05-08
feature-tags: aem-65 aem-cs
initial-release: 2.12.0/3.9.0
---

## Purpose

Sets the cq:lastReplicated, cq:lastReplicateBy and cq:lastReplicatedAction on the payload to the values provided in the Workflow process's PROCESS_ARGS.

During asset migrations, after using a tool like VLT-RCP to transfer assets to a puvblish server, this process can be used in conjunction with [Bulk Workflow Manager](/acs-aem-commons/features/bulk-workflow-manager/index.html) to mark the assets that were VLT'ed over as replicated.

## How to Use

A new Workflow Process step that executes Set Replication Status can be added to a workflow model, and the WF Processes Process ARGS can be supplied as defined below.

[Workflow process step](thumbnail.png)

### Process Args Options

Set the Workflow Process Steps' PROCESS_ARGS to a line break-delimited list of property pairs, which are in turn delimited by `=`.

* replicationAction
  * The replication action to use in the replication status property
  * Options: ACTIVATED, DEACTIVATED, CLEAR
    * CLEAR will remove all replication state from the resource (including replication date, and replicated by)
  * Required field. No default provided. 

* replicationDate
  * The date/time to use in the replicated at property
  * Accepts format: yyyy-MM-dd'T'HH:mm
  * Defaults to Now

* replicatedBy
  * The user name to use in the replicated by property
  * Defaults to 'migration'

Example:

{% highlight xml %}
replicationDate=2017-01-20T14:30
replicatedBy=ireasor
replicationAction=ACTIVATED
{% endhighlight %}



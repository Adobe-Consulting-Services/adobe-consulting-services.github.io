---
layout: acs-aem-commons_feature
title: Bulk Workflow Manager
description: Finally execute Workflow at scale!
date: 2016-07-24
thumbnail: /images/bulk-workflow-manager/thumbnail.png
feature-tags: administration content-migration
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 2.6.0/3.2.0
---

> This version of Bulk Workflow Manager replaces the previous [Bulk Workflow Manager v1](/acs-aem-commons/features/bulk-workflow-manager-v1.html).

# Purpose

Execute Workflow in bulk across a variety of resources is difficult in AEM. OOTB Workflow initiation is on a per resource basis, via Workflow Packages or folders of limited size (15).

The ACS AEM Commons Bulk Workflow Manager allows resources to be selected via a query (QueryBuilder, xPath, JCR-SQL, JCR-SQl2) or list, and put under managed Workflow execution ensuring only a fixed number of items are queued or under workflow at a time.

Bulk Workflow Manager supports executing OOTB AEM Workflow, Serial [Synthetic Workflow](/acs-aem-commons/features/synthetic-workflow.html) or [Synthetic Workflow](/acs-aem-commons/features/synthetic-workflow.html) via [Fast Action Manager](/acs-aem-commons/features/fast-action-manager.html).

# How to Use

* Log in to AEM Author
* Navigate to the Classic UI Tools Console (from the Touch UI, this is Tools:Operations:Configuration)
* Under the `acs-commmons` folder, create a folder named `Bulk Workflow Manager`
* Under the `Bulk Workflow Manager` folder, create a new Page of Template type "Bulk Workflow Manager"
![image](/acs-aem-commons/images/bulk-workflow-manager/step-1.png)
* Use the configuration forms to define the Bulk Workflow run.
![image](/acs-aem-commons/images/bulk-workflow-manager/step-2.png)
* Upon pressing "Start Bulk Workflow" the resources will be queried and prepped for workflow. Please note, if the repository is large and the query inefficient it may take some time to collected all candidate resources. Ensure your query is correct before starting Bulk Workflow. During Bulk Workflow execution, the process can be stopped.
![image](/acs-aem-commons/images/bulk-workflow-manager/step-3.png)
* Stopped Bulk Workflow processes can be resumed. Note; Bulk Workflow Manager processing will stop/restart automatically during re-deploys of the ACS AEM Commons bundle.
![image](/acs-aem-commons/images/bulk-workflow-manager/step-4.png)
* When the Bulk Workflow exection is complete, the page will display the final results.
![image](/acs-aem-commons/images/bulk-workflow-manager/step-5.png)
* To start another Bulk Workflow run, create a new `Bulk Workflow Manager` page.

## Runner Types

### AEM OOTB Workflow

Select AEM OOTB Workflow to execute the workflow using the AEM Workflow Engine. This provides all the usual functionality AEM Workflow provides. This uses the Sling Job Engine and large sets 10,000+ payloads, this can be slower as as Bulk Workflow Manager throttles/manages the # of workflows being executed at once.

### Synthetic Workflow

Select Synthetic Workflow to execute the workflow using [ACS Commons Synthetic Workflow](/acs-aem-commons/features/synthetic-workflow.html), in a single thread and serial fashion. This requires that the Workflow model is supported by Synthetic Workflow; make sure to full test the workflow model against Synthetic Workflow become processing payloads at scale.  

### Synthetic Workflow w/ FAM

Select Synthetic Workflow to execute the workflow using [ACS Commons Synthetic Workflow](/acs-aem-commons/features/synthetic-workflow.html), but allow [ACS Commons Fast Action Manager](/acs-aem-commons/features/fast-action-manager.html) to run the work in a multi-threaded fashion. This is typically the fastest approach but carries all the same considerations in the use of Synthetic Workflow.

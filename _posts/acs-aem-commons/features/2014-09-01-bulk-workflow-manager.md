---
layout: acs-aem-commons_feature
title: Bulk Workflow Manager
description: Finally execute Workflow at scale!
date: 2014-09-01
thumbnail: /images/bulk-workflow-manager/thumbnail.png
feature-tags: administration content-migration
tags: acs-aem-commons-features updated
categories: acs-aem-commons features
initial-release: 1.8.0
---

# Purpose

Execute Workflow in bulk across a variety of resources is difficult in AEM. OOTB Workflow initiation is on a per resource basis, or via Workflow Packages; which are manual creations and supported only by certain Workflow steps.

The ACS AEM Commons Bulk Workflow Manager allows resources to be selected via a query, and put under managed Workflow execution ensuring only a fixed number of items are queued or under workflow at a time.

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


* Auto-resume toggle (added in v1.10.0) - Bulk Workflow Manager now has an OSGi config that allows disabling the automatic resumption of Bulk Workflow Manager when the ACS AEM Commons bundle starts. When auto-resume is enabled, Bulk Workflow Manager will attempt to resume 'stopped via deactivation' bulk workflow jobs under /etc/acs-commons/bulk-workflow-manager. 


---
layout: acs-aem-commons_feature
title: Workflow Delegation
description: Have one workflow kick off another workflow!
sub-feature: true
date: 2017-02-01
tags: authoring administration new
initial-release: 2.7.0/3.10.0
---

## Purpose

Allow the OOTB "Request for Activation" workflow to execute different WF steps based on the payload.

For example, when the Workflow is executed on a pages under `/content/en/pages` an approval workflow is required, however pages under `/content/en/pages/faq` do not require the approval workflow, and on `/content/dam/products` a more rigorous approval workflow is required.

## How to Use

Arguments should be provided as PROCESS_ARGS to the workflow Process Step:

    workflowModelProperty=<propName>    
    defaultWorkflowModel=<absolutePathToDefaultWorkflowModel>
    terminateWorkflowOnDelegation=true|false
    
### PROCESS_ARGS descriptions
* `propName` is the name of the property which contains the paths of the workflow models. Optional.
    * A property of this name must exist on the node hierarchy (`[cq:Page]/jcr:content` or `[sling:Folder]/jcr:content` or `[sling:OrderedFolder]/jcr:content`)
    * The value of this property much be a valid, Workflow model path for example: `/etc/workflow/models/my-workflow-model` OR  `/etc/workflow/models/my-workflow-model/jcr:content/model`
* `defaultWorkflowModel` the path to the default Workflow Model, which is used as fallback. Optional.
    * Example: `/etc/workflow/models/request_for_activation` OR  `/etc/workflow/models/request_for_activation/jcr:content/model`
* `terminateWorkflowOnDelegation` is true or false and dictates if the current workflow will continue executing after delegation. Optional, defaults to false
    *  This can be useful to avoid having a single workflow under multiple workflows (depending on how the workflows are setup).
    *  If a configured Workflow Model Id can be resolved, via the content hierarchy (directly) or the the default Workflow Model Id param (fallback) but that Workflow Model cannot be resolved, then a WorkflowException is thrown.
---
layout: acs-aem-commons_feature
title: Synthetic Workflow
description: Workflow Process execution has never been faster
date: 2014-10-12	
thumbnail: /images/synthetic-workflow/thumbnail.png
feature-tags: backend-dev content-migration
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.9.0
---

## Purpose

Content processing at scale can be challenging in AEM, especally when business process in encapsulated by AEM Workflow process, which is challenging and even slow to execute as scale (even with ACS AEM Commons Bulk Workflow Manager).

ACS AEM Commons Synthetic Workflow is designed to facilitate the execute of AEM Workflow Processes (Java WorkflowProcesses) without engaging the AEM Workflow Enging which has large amount of overheard; Job management, Workflow instance node creation and management.

## Supported Workflow Features

* Synthetic Workflow ONLY supports OSGi Workflow Processes
* `wfSession.terminate(..)`, `wfSession.restart(..)` are supported if SyntheticWorkflow objects are passed to them. This limits their use to self-termination or self-restarting.
  * `wfSession.restart(..)` restarts the entire worflow execution up to 3 times per payload
* `workItem` MetaDataMap (local to a Workflow Process step)
* `workflow` and `workflowData` MetaDataMap (shares throughout the Workflow execution for a payload)
  * `workflow` and `workflowData` MetaDataMaps are the same object
* Workflow Process MetaDataMaps are supported (Ex. Providing `PROCESS_ARGS` for each Workflow Process being executed)
* Workflow Processes are executed in the order they are defined in the `workflowProcess` array.

## Unsupported Workflow Features

* Does NOT support ECMA workflow steps, dialog participant steps, etc.
* Synthetic Workflow does NOT support Routes and executes Workflow Processes serially.
* Unsupported operations throw UnsupportedOperation Exceptions; Test your Synthetic Workflow run on a representative sample set to ensure the candidate Workflow Process steps do not use unimplemented features.
* `wfSession.complete(..)` is not supported as it requires a Route which is an unsupported abstraction by Synthetic Workflow.


## How to Use

### Collect the Workflow Process to execute

Collect the Workflow process labels (OSGi Property: `process.label`) to execute.

![image](/acs-aem-commons/images/synthetic-workflow/process-label.png)

Collect and define all required Workflow process args.

![image](/acs-aem-commons/images/synthetic-workflow/process-args.png)


### Write Synthetic Workflow execution code

Write code to collect resources, and call `SyntheticWorkflowRunner.execute(...)` for each resource. The collection code is 100% custom and can be driven by query, tree traversal, etc. based on the use case.

`SyntheticWorkflowRunner` provides options to commit to repository after each Workflow Process step executes, or after all Workflow Process steps execute for a payload. Alternatively, the execution code can set these to false and save in batches. Select/implement the option most appropriate for selected Workflow Process steps and use case.

#### Example DAM Asset processing code

The following code executes the OOTB DAM Asset Workflow Processes against a DAM Folder's contents.

* Extract Meta Data
* Create Thumbnail
* Create Web Enabled Image
* Update Folder Thumbnail Process

{% highlight jsp %}

<%@include file="/libs/foundation/global.jsp"%><%
%><%@page session="false" contentType="text/html; charset=utf-8" 
	pageEncoding="UTF-8"
    import="org.apache.sling.api.resource.*,
    java.util.*,
    javax.jcr.*,
    com.adobe.acs.commons.workflow.synthetic.*,
    com.day.cq.dam.commons.util.DamUtil,
    com.day.cq.wcm.api.*,
    com.day.cq.dam.api.*"%><%

    /* Get Synthetic Workflow Runner service */
    SyntheticWorkflowRunner swr = sling.getService(SyntheticWorkflowRunner.class);   

    /* Prepare any Workflow Process Args as needed for each Workflow Process step you will invoke */

    Map<String, Map<String, Object>> processArgs = new HashMap<String, Map<String, Object>>(); 
    
    /* Create Thumbnail Process Args
     * 
     * This will create 6 thumbnails for the Asset using the [width:height] params provided.
     * 
     * Note: The PROCESS_ARGS value is a String and not a String[]; This is an impl detail
     * of the OOTB Create Thumbnail Workflow Process
     */   
    Map<String, Object> createThumbnailArgs = new HashMap<String, Object>();
    createThumbnailArgs.put(SyntheticWorkflowRunner.PROCESS_ARGS, 
        "[140:100],[48:48],[319:319],[10:10],[100:100],[600:600]");
    processArgs.put("Create Thumbnail", createThumbnailArgs);    
    
    
    /* Web Rendition Process Args
     * 
     * This will create a 1000px PNG web rendition of the Asset
     * 
     * Note: The PROCESS_ARGS value is a String[] and not a String; This is an impl detail
     * of the OOTB Create Web Enabled Image Workflow Process
     */
    Map<String, Object> createWebEnabledImageArgs = new HashMap<String, Object>();
    createWebEnabledImageArgs.put(SyntheticWorkflowRunner.PROCESS_ARGS, new String[] { 
        "dimension:1000:1000", ",mimetype:image/png", "quality:40",
        "skip:application/pdf", "skip:audio/mpeg","skip:video/(.*)" 
    } );
    processArgs.put("Create Web Enabled Image", createWebEnabledImageArgs);

    /* Collect the Resource to execute the Workflow against */
    String rootPath = "/content/dam/synthetic-workflow";
    Resource root = resourceResolver.getResource(rootPath);
    int count = 0;
    for(Resource r : root.getChildren()) {
        if(DamUtil.resolveToAsset(r) == null) { continue; }

        boolean saveAfterEachWFProcess = false;
        boolean saveAtEndOfAllWFProcesses = false;
        
        swr.execute(resourceResolver, r.getPath(), new String[] { 
        	"Extract Meta Data",
        	"Create Thumbnail",
        	"Create Web Enabled Image",
        	"Update Folder Thumbnail Process"
        	} , processArgs, saveAfterEachWFProcess, saveAtEndOfAllWFProcesses);

        if(++count % 1000 == 0) {
        	// Save in batches of 1000; How data is saved should be driven by the use case.
        	resourceResolver.commit();
        }	

        // Final save to catch stragglers
    	resourceResolver.commit();
    }    
%>
{% endhighlight %}


## Notes

Make sure to **disable any Launchers/Event Listeners that should not be triggered** during the Synthetic Worflow execution on payload or related resources.

## Example

This example shows applying OOTB AEM6 DAM Asset Update WF against unprocessed assets using Synthetic Workflow leveraging these OOTB WF Steps

* Extract Meta Data
* Create Thumbnail
* Create Web Enabled Image
* Create Reference
	* Note this is an invalid name and will not execute; See in logs screenshot
* Update Folder Thumbnail Process

Disable launchers and upload "raw" images to DAM
![Synthetic Workflow Example](/acs-aem-commons/images/synthetic-workflow/example-1.png)

Create your script to execute the Synthetic Workflow (example uses [AEM Fiddle](http://adobe-consulting-services.github.io/acs-aem-tools/features/aem-fiddle.html))

![Synthetic Workflow Example](/acs-aem-commons/images/synthetic-workflow/example-2.png)

Log output of Synthetic Workflow executing. Note how it skips missing WF Processes with an ERROR message.
![Synthetic Workflow Example](/acs-aem-commons/images/synthetic-workflow/example-3.png)


Post-Synthetic Workflow DAM listing.
![Synthetic Workflow Example](/acs-aem-commons/images/synthetic-workflow/example-4.png)

Note the custom Redition sizes specified in the Synthetic Workflow script.
![Synthetic Workflow Example](/acs-aem-commons/images/synthetic-workflow/example-5.png)



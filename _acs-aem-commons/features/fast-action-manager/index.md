---
layout: acs-aem-commons_feature
title: Fast Action Manager
description: aka FACEMELTER
date: 2016-04-25
redirect_from: /acs-aem-commons/features/fast-action-manager.html
feature-tags: backend-dev content-migration
tags: acs-aem-commons-features
initial-release: 2.4.0/3.0.0
---


## Purpose

Fast Action Manager is a easy-to-use API that allows for parallelized and (intelligently) throttled execution of Synthetic Workflow, Replication, or anything else you want!

## How to Use

> [Fast Action Manager JavaDocs](http://adobe-consulting-services.github.io/acs-aem-commons/apidocs/com/adobe/acs/commons/fam/package-summary.html)

The Action Manager is built on top of the Throttled Task Runner providing a convenient way to run many of AEM-specific activities.  Set up your own work using `deferredWithResolver` which is the simplest call to schedule work to run at some future point.  Your action is passed in as a lambda or function reference such that it is invoked with a ready-to-use resource resolver.  There's no need to catch errors or close the resolver!  If your action generates an error it is logged for you.  If you want to catch the error for retry purposes, there are also several types of retry facilities provided (see "If at first you don't succeed" below.)

Generally speaking the ActionManager is used to perform the same action against many target resources in the JCR, though that's not necessarily a requirement for using it.  Two ways to identify which resources to operate on are the following:
- For working on a tree, or to walk a tree looking for nodes to process, use a visitor pattern.  See the "Lambda Visitors" section below for examples.
- To run the same action(s) against query results you can do like the examples (below) and use `withQueryResults` instead.

~~At the end of scheduling work, it is important to add cleanup tasks.  These close all opened resolvers so that there are no JCR session leaks.~~ Note: As of recently, cleanup of resource resolvers is completely automatic.  You must remember to close your original resource resolver which you use to create the ActionManager, but any additional resource resolves it creates internally are closed when it is finished.  The way that the action manager handles JCR sessions is that it clones the resource resolver provided at the time of creation.  The original resource resolver can be closed at any point without affecting the scheduled work.

Once work is scheduled to run, you can check on the status using the provided JMX MBeans.  The `ThrottledTaskRunner` bean lets you get current running stats of the actual work being done.  The Action Manager Factory bean lets you get an overview of all action managers that have been created and how much work they have pending, if any, as well as total run-time and any errors that have occurred.

You can programatically check by tracking down the ActionManager instance via the ActionManagerFactory service as well.

### Lambda Visitors
> [SimpleFilteringResourceVisitor JavaDocs](https://adobe-consulting-services.github.io/acs-aem-commons/apidocs/com/adobe/acs/commons/util/visitors/SimpleFilteringResourceVisitor.html)

If your target nodes are exactly an entire subtree of nodes, maybe with a light amount of programmatic filtering, then using a query is likely not always the best idea.  The new updated FAM also includes visitors that allow simple lambda expressions for the following:

* Determine what nodes should be traversed (setTraversalFilter) -- Default is all
* Determine what properties should be visited (setPropertyFilter) -- Default is all
* Provide visitor for traversed resources
   * Note: Visitors are expected to be BiFunctions which are provided the Resource and the node level (integer)
   * Even if you don't need the level parameter you still have to accept it.  This is shown in the example below.
* Provide visitor for leaf nodes, which are the nodes which are the first level of nodes not traversed
* Provide visitor for properties, which is given a Map.Entry<String, Object> and the node level

For traversing folder structures and working with folder contents, there is a TreeFilteringResourceVisitor which allows you to specify the node types of nodes which should be traversed.  Everything else is treated as a leaf node.  This is extremely useful for travering tree structures of folders with assets.  Both visitors allow you to decide if they should work as depth-first (which is default) or breadth-first, which works better in some cases like creating tree structures.

{% highlight java %}
    // This example assumes there is some method "buildDestinationFolder" which creates a folder as a clone of a current folder
    // The implementation of that method isn't necessarily important for this example, this just shows how the visitor part works.
    ActionManager manager = amf.createTaskManager("Copy folder structure", resourceResolver);
    TreeFilteringResourceVisitor folderVisitor = new TreeFilteringResourceVisitor();
    folderVisitor.setBreadthFirstMode();
    folderVisitor.setResourceVisitor((res, level) -> {
        String path = res.getPath();
        manager.deferredWithResolver(Actions.retry(5, 100, rr -> buildDestinationFolder(rr, path)));
    });
    folderVisitor.accept(rr.getResource(sourcePath));
{% endhighlight %}

### If at first you don't succeed...

There are many cases where retry logic is necessary to ensure that work is completed even though there are race conditions which might cause occasional issues.  This happens a lot, for example, when building recursive tree structures.  There are two main flavors of retry logic provided.

#### Retrying a single action
If the activity performed is a read-only kind of action or is something which is ideally executed by itself (such as executing transient workflow) then the Actions.retry method is the best choice:

{% highlight java %}
    manager.deferredWithResolver(Actions.retry(5, 100, rr -> buildDestinationFolder(rr, path)));
{% endhighlight %}

Likewise you can pass Actions.retry(...) in to the withQueryResults method as well for query-based actions.

#### Retrying a stack of actions
If the activity is designed to commit content changes, then ActionBatch is a more convenient option.  The difference is that all actions are executed sequentially and if any of them fail, the resolver is refreshed and all actions are retied again in order.  It is preferred to commit content changes in batches, say 10 at a time, rather than individually as it can be much faster overall.  Note: There is currently no support for "withQueryResults" to use ActionBatch internally, so it mostly lends itself to other iterator patterns such as visitor or simple for-loops.  Once the iterator or visitor is completed defining all the work, the commitBatch() method must be called to schedule the final batch of work.

{% highlight java %}
        ActionBatch batch = new ActionBatch(actionManager, 10);  // Content is saved in batches of 10
        TreeFilteringResourceVisitor folderVisitor = new TreeFilteringResourceVisitor();
        folderVisitor.setBreadthFirstMode();
        folderVisitor.setLeafVisitor((res, level) -> {
            String path = res.getPath();
            if (!path.endsWith("jcr:content")) {
                batch.add(rr -> moveItem(rr, path));  // moveItem relocates the node somewhere...
            }
        });
        folderVisitor.accept(rr.getResource(sourcePath));
        batch.commitBatch(); // Note: VERY IMPORTANT!  Must always commit the batch at the end.
{% endhighlight %}

### OSGi Configuration

The Throttled Task Runner is OSGi configurable.

![Throttled Task Runner - OSGi Configuration](images/throttled-task-runner-osgi.png)

* Max threads: Recommended not to exceed the number of CPU cores. Default 4.
* Max CPU %: Used to throttle activity when CPU exceeds this amount. Range is 0..1; -1 means disable this check.
* Max Heap %: Used to throttle activity when heap usage exceeds this amount. Range is 0..1; -1 means disable this check.
* Cooldown time: Time to wait for cpu/mem cooldown between throttle checks (in milliseconds)
* Watchdog time: Maximum time allowed (in ms) per action before it is interrupted forcefully.

### JMX MBeans

#### Throttled Task Runner MBean 

![Throttled Task Runner - JMX Mbean](images/throttled-task-runner-jmx.png)

#### Action Manager MBean 

![Action Manager - JMX Mbean](images/action-manager-jmx.png)

### Developing with the Fast Action Manager APIs

To use Fast Action Manager (FAM) write a small code harness that collects the resources to process along w/ the desired processing.

### Example Code: Fast Action Manager calling Synthetic Workflow on DAM Update assets

This sample code executes the OOTB DAM Asset Update Workflow Model on all assets under a designated path.

{% highlight jsp %}

<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false"
        contentType="text/html; charset=utf-8"
        pageEncoding="UTF-8"
        import="com.adobe.acs.commons.workflow.synthetic.*,
                com.adobe.acs.commons.fam.*,
                com.adobe.acs.commons.fam.actions.*"%><%

    SyntheticWorkflowRunner swr = sling.getService(SyntheticWorkflowRunner.class);
    ActionManagerFactory trf = sling.getService(ActionManagerFactory.class);
    DeferredActions actions = sling.getService(DeferredActions.class);
    SyntheticWorkflowModel model = swr.getSyntheticWorkflowModel(
        resourceResolver, "/etc/workflow/models/dam/update_asset", true
    );

    TaskManager manager = trf.createTaskManager("Fiddle", resourceResolver);
    int numberOfAssets = manager.withQueryResults(
        "SELECT * FROM [dam:Asset] as a WHERE ISDESCENDANTNODE(a,'/content/dam/my-asset-folder')",
        "JCR-SQL2",
        Actions.startSyntheticWorkflows(model, swr)
    );
%>
Finished adding <%=numberOfAssets%> items.

{% endhighlight %}


### Example Code: Fast Action Manager replicating assets

This sample code replicates all DAM assets under the designated path.

{% highlight jsp %}
<%@include file="/libs/foundation/global.jsp"%>
<%@page session="false"
        contentType="text/html; charset=utf-8"
        pageEncoding="UTF-8"
        import="com.adobe.acs.commons.fam.*,
               com.adobe.acs.commons.fam.actions.*,
               com.day.cq.replication.*"%><%

    ActionManagerFactory amf = sling.getService(ActionManagerFactory.class);
    Replicator replicator = sling.getService(Replicator.class);
    String agentId = "AGENT_ID";
    ReplicationOptions publishOptions = new ReplicationOptions();
    publishOptions.setFilter(new AgentIdFilter(agentId));
    ActionManager manager = amf.createTaskManager("Activate to "+agentId, resourceResolver);

    int numberOfAssets = manager.withQueryResults(
        "SELECT * FROM [dam:Asset] as a WHERE ISDESCENDANTNODE(a,'/content/dam/my-asset-folder')",
        "JCR-SQL2",
        ReplicationActions.activateAllWithOptions(replicator, publishOptions)
    );
%>

Finished adding <%=numberOfAssets%> items to the activation queue <%=agentId%>.

{% endhighlight %}


### Example Code: Chain Fast Action Manager actions
{% highlight jsp %}
...
Actions.startSyntheticWorkflows(model, swr).andThen(
   ReplicationActions.activateAllWithOptions(replicator, publishOptions)
)
...
{% endhighlight %}

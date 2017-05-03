---
layout: acs-aem-commons_feature
title: Automatic Package Replication
description: Automatically build and replicate an AEM Package on a timmer, event trigger or workflow
date: 2017-05-07
thumbnail: /images/automatic-package-replication/automatic-package-replication.png
feature-tags: administraton backend-dev
tags: acs-aem-commons-features
categories: acs-aem-commons features
initial-release: 3.8.0
---

## Purpose

Allows developers to easily build and replicate a pre-defined AEM Package from a schedule, trigger or workflow process. AEM packages can be used to easily promote large amounts of content from Author to Publisher instances without having the load of tree replications. 

## Using Automatic Package Replication

There are two primary methods for invoking the Automatic Package Replication feature. This can be invoked by a scheduler / event or can be invoked as a workflow process step. 

## Schedules or Event Triggers

To use the Automatic Package Replication feature:

1. Create and configure an AEM Package in the [Package Manager](https://docs.adobe.com/docs/en/aem/6-0/administer/content/package-manager.html), including the filters for the package
2. Navigate to [/miscadmin#/etc/acs-commons/automatic-package-replication](http://localhost:4502/miscadmin#/etc/acs-commons/automatic-package-replication) on your environment. 
3. Create a new page of the type `Automatic Package Replication Configuration`
4. Open and configure the Automatic Package Replication configuration

![Automatic Package Replication Configuration](/acs-aem-commons/images/automatic-package-replication/configuration.png)

### Configuration Fields

The following fields are supported for configuring the Automatic Package Replication instance:

 - **Title** *Required* - The jcr:title of the page
 - **Package Path** *Required* - The path of the package to build and replicate. This will display a list of the currently available packages.
 - **Trigger** *Required* - The trigger for this Automatic Package Replication configuration, may be one of:
   - *Cron* - Triggers on a schedule
   - *Sling Event* - Triggers on a Sling Event topic
 - **Cron Trigger** *Required if Cron* - The [Quartz Cron Trigger expression](http://www.quartz-scheduler.org/documentation/quartz-2.x/tutorials/crontrigger.html) for the schedule on which to invoke this configuration
 - **Event Topic** *Required if Sling Event* - The [Sling OSGi Event topic](http://felix.apache.org/documentation/subprojects/apache-felix-event-admin.html) name to invoke this configuration. You can view and trigger events from the OSGi Console at [/system/console/events](http://localhost:4502/system/console/events)
 - **Event Filter** - A LDAP expression for filtering the events on which the configuration should be invoked.

## Workflow Process

To invoke the Automatic Package Replication feature from a workflow, add a `Process Step` into your workflow and configure it as such:

 - **Process** - `Build and Replicate Package`
 - **Arguments** - The path to the package to build and replicate

![Automatic Package Replication Workflow Configuration](/acs-aem-commons/images/automatic-package-replication/workflow-configuration.png)
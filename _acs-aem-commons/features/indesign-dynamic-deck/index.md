---
layout: acs-aem-commons_feature
title: InDesign Dynamic Deck
description: Generate InDesign documents from AEM Assets
date: 2020-03-02
feature-tags: new forms authoring 
initial-release: 4.6.0
---

## Purpose
This tool was created to enable automation of business processes that involve InDesign documents.  It gives AEM the ability to generate InDesign documents directly from AEM Assets. End-user updates to generated InDesign documents can be saved back to AEM Assets.  Setting up this automation is straightforward (no code is required) even for highly-customized documents.

Benefits include:
* Greatly reduce labor required to create and maintain InDesign documents.
* Eliminate human error inherent in the manual process.
* Ensure that all data and imagery shown on InDesign documents is always up to date.

## Solution Overview

The tool requires three inputs to generate an InDesign document:
* AEM Assets
* An InDesign document template
* An XML document that specifies AEM-to-InDesign mapping.
![Dynamic Deck - Solution Overview](images/solution-overview.png)

### InDesign Template
This tool uses InDesign’s XML import functionality to insert data and imagery from AEM into generated InDesign documents.
The following screen grab shows a template document with Structure Panel open and field tagging highlighted. 
![Dynamic Deck - Simple Template with Structure and Tagged Fields](images/simple-tempate-with-structure-and-tagged-fields.jpg) 

### AEM-to-InDesign Mapping (XML)
The “secret sauce” in this solution is the XML file that specifies AEM-to-InDesign mapping.

In the screen grab below, line 9 in the XML specifies that the dc:title metadata property on the AEM Asset should be imported into the field associated with the TITLE element.
![Dynamic Deck - Property Mapping for Text Data](images/property-mapping---text-data.jpg) 

Line 8 in the XML specifies that the Asset itself, the binary, should be imported into the field associated with the IMAGE element.
![Dynamic Deck - Property Mapping for Image Data](images/property-mapping---image-data.jpg) 

Line 7 identifies the ITEM element (and implicitly, its children) as iterable, or repeating.  Notice that this generated document has over 30 ITEM elements.  The ITEM XML only needs to be specified once; it will be applied repeatedly.
![Dynamic Deck - Property Mapping for Iterables](images/property-mapping---iterable.jpg) 

This shows a generated document with Structure Panel open and Tagging highlighted.
![Dynamic Deck - Property Mapping for Generated Document](images/property-mapping---generated-document.jpg) 

### Asset Selection
There are three ways to specify what AEM Assets will be imported into the InDesign document:
* AEM Collection
* AEM Tag
* Query (SQL2)

Using the AEM Collections or Tags is most straightforward for end-users.  The Query-driven approach is more flexible and precise.

The Dynaic Deck Query configuration page can be launched from the Query List button on the Dynamic Deck Dynamo dialog, shown below in the Running the Tool section.  The query configuration page looks like this:
![Dynamic Deck - Query Configuration Page](images/query-configurations2.jpg) 

### Data Sync
User updates to generated documents can be written back to the source AEM Assets. This requies  setting is-data-sync="true" in the mapping XML for each field that should be synchronized. See lines 4 and 11 in the XML example above.

## Tool Setup

### InDesign CC Server
This tool requires InDesign CC Server.  Any recent version will work, but your server version must match your desktop version. On localhost, start InDesign server as follows:
{% highlight console %}
./InDesignServer -port 8080
{% endhighlight %}

### Samples Package
The [InDesign Dynamic Deck Samples package](/acs-aem-commons/features/indesign-dynamic-deck/indesign-dynamic-deck-samples-1.2.zip) includes everything needed to generate two different example documents.  Use the Simple Template to generate a document from We.Retail Assets.  The Get Outside Template generates a document from assets that are installed with the Samples package.  InDesign templates are provided for InDesign CC Server 2018 and 2020.

Installing the Samples package adds the following artifacts to AEM:
* Template files, installed at /content/dam/dynamic-deck-dynamo/templates.
* A destination folder for generated documents, at /content/dam/dynamic-deck-dynamo/destination. 
* A master asset, used by the Get Outside example, installed at /content/dam/dynamic-deck-dynamo/master-assets/get-outside-master-asset.jpg.
* Example SQL2 query definitions.  These are implemented as a Generic List installed at /etc/acs-commons/lists/dynamic-deck-query-list.
* Data Sync workflow model. This is installed at /conf/global/settings/workflow/models/indesign-dynamic-deck-data-sync and /var/workflow/models/indesign-dynamic-deck-data-sync. The Data Sync workflow process step is installed with ACS AEM Commons.
* Data Sync workflow launcher, installed at /conf/global/settings/workflow/launcher/config/indesign-dynamic-deck-data-sync-launcher.  The launcher fires on XML rendition modified.  The launcher is installed Enabled.

## Running the Tool
Do this to generate the Simple Example deck (assuming you have InDesign CC Server 2018 installed):
![Dynamic Deck - Generate Simple Example](images/generate-simple-example-4.jpg) 

You should get this:
![Dynamic Deck - Generate Simple Example](images/generate-simple-example-results2.jpg) 

Note that by default the We.Retail Assets have no Tags applied.  To test deck generation using Tags you must first manually apply Tags.  This can be done quickly as follows:
* In Assets search for "Gloves"
* Select all .jpeg's, only .jpeg's
* Click Properties
* Apply Tag We.Retail -> Apparel -> Gloves to all selected Assets and Save
* Generate a deck with the same tag.

Collections works as you would expect.  Try it.

### Tips for creating InDesign document templates

Coming soon.  Please create an Github issue if you need this.

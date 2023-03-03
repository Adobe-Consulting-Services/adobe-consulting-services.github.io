---
layout: acs-aem-commons_feature
title: MCP Asset Ingestion Tools
description: Take the terrible out of terabyte-scale workloads.
date: 2017-12-01
tags: aem-65
initial-release: 3.10.0
last-updated-release: 3.17.0
---

These are the [MCP](/acs-aem-commons/features/mcp/index.html) Asset Ingestion Tools provided by ACS AEM Commons available at `Tools > ACS AEM Commons > Manage Controlled Process > Start Process`.

----

{% include acs-aem-commons/sub-features.html %}

This sub-module provides many ways to ingest assets in large quantities.

Asset ingestion, also sometimes called asset migration or asset import, is a very broad area with many available solutions.  The overall process is described pretty well [in the AEM documentation](https://helpx.adobe.com/experience-manager/6-4/assets/using/assets-migration-guide.html) but note that the tools in MCP were not available at the time it was written.

When deciding on which migration route to use, there are some basic questions you should answer first:

- How many assets?
- How much data is it, or put another way: how big are the files combined?
- Where is the data relative to AEM right now?
- How often do you need to do this?

### Data is local, AEM is local

If both AEM and the data are near each other already then putting the files in a network shared folder (or a SAN) is a good route.  After mounting the same shared folder to the server running AEM, then the standard asset ingestor (which is file-based) can be used to load files from a local or a mounted network directory.

If you want to ingest files into AEM and also want to provide additional metadata at the same time, the URL Asset Importer can work in this scenario using its support for file:// urls, which are files located in a filesystem accessible to AEM directly.

### Data is local, AEM is not local

If the data is in your local network, but AEM isn't, then you must consider:
- What is the speed between where the data is today and where AEM is?  If the files are in your local network, but AEM is hosted offsite such as in AWS, how fast is your upload speed to the internet? **Hint:** Use [Speedtest](https://www.speedtest.net) or [MLab Network Diagnostic test](https://www.measurementlab.net/tests/ndt/)  
- How long will it take to upload that much data?  [Here's a calculator](http://downloadtimecalculator.com/Upload-Time-Calculator.html) to help you answer that.  Once you know your upload speed and the total size of your data, it is pretty easy to do the division and calculate how long it takes to upload that much data.

If the answer is a long, long time (as in several days, weeks, etc) then it is worth having a conversation with your provider (such as the customer service engineer assigned to your contract) to discuss shipping physical media.

If the transfer time isn't too large of a concern then it is possible to upload assets into an Amazon S3 bucket and use the Amazon S3 ingestor to process them that way.  You can also upload small batches of files using more out-of-the-box product features if they are suitable to your needs.

### Data is not local

If the data is already in an Amazon S3 bucket then there is an ingestor capable of reading in assets directly.  If the assets are in a remote location accessible via a web browser, then the URL Asset Ingestor might be a good option since it can download remotely located assets.

### Large scale challenges

When ingesting several thousand assets, there are some things to consider which are described in the assets migration guide linked above.  Also consider options provided such as bypassing asset workflow, which is a convenient way to prevent firing off thousands of workflow instances without having to first disable workflow.  Other pitfalls are described here [in this link](https://helpx.adobe.com/experience-manager/kb/comon-aem-assets-ingestion-issues.html).  If you have any questions don't hesitate to ask us questions at the bottom of the page.

### Infrequent ingestion

If you only have to do a one-time import, or something that is otherwise infrequent, then the options mentioned above should suffice for relatively moderate workloads.

### Frequent ingestion or other large-scale options
If your needs are greater than the cases presented so far, there are quite a few options not listed here (some range the gamut all the way to petabyte-scale workloads!)  It is recommended that you speak with your customer support engineer or account representative to help identify other options that fit your needs.  Some solutions include, but are not limited to, loading content directly from an active S3 content bucket, or setting up additional instances of AEM to scale ingestion processing.
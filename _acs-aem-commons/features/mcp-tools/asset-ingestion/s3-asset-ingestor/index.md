---
layout: acs-aem-commons_feature
title: S3 Asset Ingestor
description: Load a S3 bucket of assets into AEM
date: 2017-11-01
initial-release: 3.11.0
feature-tags: aem-65
tags: aemcs-incompatible
---

This is essentially the same as the [File Asset Ingestor](../asset-ingestor/index.html), but pulls files from an Amazon S3 bucket instead of the local filesystem.  You can load a directory of assets into AEM very easily with this tool.  Because of the ability to overload a server with assets, this tool only appears for the "admin" user right now.

This process depends upon the presence of the S3 SDK bundle. If you are using the S3 DataStore, this is already present. For other installations (e.g. using the FileDataStore), you should follow the instructions to install the OSGi bundles in the S3 DataStore Feature Pack, but do *not* install the configurations. Instructions for downloading the S3 DataStore Feature Pack can be found at the following links: [for AEM 6.2](https://helpx.adobe.com/experience-manager/6-2/sites/deploying/using/data-store-config.html#AmazonS3DataStore), [for AEM 6.3](https://docs.adobe.com/docs/en/aem/6-3/deploy/platform/data-store-config.html#Amazon%20S3%20Data%20Store)

![S3 Asset Ingestor](./images/s3-asset-ingestor.png)

* **Retry pause**: Used as retry pause between createFolder, createAsset actions and etc...
* **Retries**: Actions to attempt.
* **Dry run**: If checked, no assets will be imported but a report will be produced.  This is useful for testing out the data file for integrity.
* **Detailed Report**: If checked, a list of all imported assets will be produced.  If unchecked, only a summary will be provided.
* **Inhibit Workflow**: If checked, the process will attempt to bypass DAM Update Asset workflow.  This requires the workflow launcher have the following in the _exclude list_ setting: `event-user-data:changedByWorkflowProcess`.  If using this option. also consider using bulk workflow afterwards to process assets after the import has finished completely.
* **Preserve Filename**: If checked, file name is preserved as asset name.  If unchecked, asset name will support only the following characters: letters, digits, hyphens, underscores, another chars will be replaced with hyphens.
* **Target JCR Folder**: Where to store the assets in AEM
* **Folders filter**: Comma-delimited list of folders to filter, useful for bypassing thumnail folders and such. If you want to exclude folder name add '-' sign before name. If you want to include name, just write folder name or add '+' sign before name.
* **Files filter**: Comma-delimited list of files to filter, also useful for bypassing additional metadata files which might not be useful in a DAM setting. If you want to exclude file name add '-' sign before name. If you want to include name, just write file name or add '+' sign before name.
* **Extensions filter**: Comma-delimited list of file extensions to filter. If you want to exclude extension add '-' sign before name. If you want to include extension, just write extension or add '+' sign before name.
* **Existing action**: Decide what should happen if the DAM contains a target file already, such as if the ingestion is resumed after a previous abort
    * Replace: Replace the asset already in AEM (this can slow things down compared to skip)
    * Skip: Skip the asset
    * Version: Create a version of the asset and upload a fresh copy.  This is the safest, but slowest, option.
* **Minimum size**: The minimum file size (in bytes) that is required for importing a file.  Anything smaller is ignored. (0 = no minimum)
* **Maximum size**: The maximum file size allowed (in bytes); anything larger is skipped. (-1 = no maximum -- NOT RECOMMENDED!)
* **Bucket**: Name of the S3 bucket which contains the files.
* **Access Key**: Amazon Web Services Access Key
* **Secret Key**: Amazon Web Services Secret Key
* **S3 Base Path**: Optional prefix for files in the S3 bucket.
* **Endpoint URL**: Optional URL if your bucket is in a non-standard location.

This process has two steps:

1. Create folder structure
2. Import assets
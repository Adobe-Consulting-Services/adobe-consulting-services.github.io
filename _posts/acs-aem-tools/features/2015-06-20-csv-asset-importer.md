---
layout: acs-aem-tools_feature
title: CSV Asset Importer
description: Easily import assets w/ metadata!
date: 2015-06-20
thumbnail: /images/csv-asset-importer/thumbnail.png
initial-release: 0.0.22
categories: acs-aem-tools
tags: acs-aem-tools-features new
---

## Getting Started


Install the ACS AEM Tools package via the AEM Package Manager and then open CSV Asset Importer from the AEM Tools console, or directly at [/etc/acs-tools/csv-asset-importer.html](http://localhost:4502/etc/acs-tools/csv-asset-importer.html)

To get to the AEM Tools console from the Touch UI, from the left rail navigation, select Tools > ACS AEM Tools > CSV Asset Importer.

## Overview

CSV Asset Importer is a tool that accepts a CSV file whose rows represent an Asset to importer.


## Important Considerations 

Before importing...

* http://localhost:4502/system/console/configMgr > Day CQ Tagging Service by default removes references to non-existing Tags from the `cq:tags` property. Ensure this is properly configured before importing.
* When using AEM6/Oak and specifying the `Asset Uniqueness Column Name` ensure that you have a Oak Index for this property else long traversal queries may execute.
* When importing Assets OOTB Launchers will kick off many Asset related workflows. Ensure all the appropriate launchers are enabled/disabled and that your system is tuned to handle the volumne of Workflows that will be invoked.
	* If needed leverage the `Batch Size` and `Throttle in MS` to provide pauses in ingestion to allow AEM to catch up.
* Setup a INFO (or DEBUG) Sling Logger for `com.adobe.acs.tools.csv_asset_importer` to monitor import progress at http://localhost:4502/system/console/slinglog


## How to Use


 Create the Asset metadata to import in Excel and export as CSV

![CSV Asset Importer - Excel](/acs-aem-tools/images/csv-asset-importer/excel.png)

 Ensure that the files to import are available from the AEM instance executing the import are `<Absolute File Dump Location>/<relSrcPath>`. The AEM process must have read access to these files.

![CSV Asset Importer - Web UI](/acs-aem-tools/images/csv-asset-importer/web-ui.png)

Execute the importer; Please see the Important Considerations section above! This may take some time to process. A Logger can be setup for `com.adobe.acs.tools.csv_asset_importer` to monitor progress.

![CSV Asset Importer - Web UI Results](/acs-aem-tools/images/csv-asset-importer/results-web-ui.png)

When the import is complete, review the Logs for errors. Wait for any Workflow to full complete, then verify the results.

![CSV Asset Importer - AEM DAM Admin Results](/acs-aem-tools/images/csv-asset-importer/results-dam-admin.png)

![CSV Asset Importer - AEM Document Results](/acs-aem-tools/images/csv-asset-importer/results-dam-admin-document.png)

![CSV Asset Importer - CRXDE Results](/acs-aem-tools/images/csv-asset-importer/results-crxde.png)

### Column Definition Row

The first row which defined the Columns in the CSV. Each Column corresponds to a property on the Asset's metadata node which to write the corresponding values.

Column definitions are in the format:

* `propertyName` the property will be persisted as a single value String
* `propertyName {{"{{ Type "}}}}` the property will be presisted as a single value of type Type 
	* Valid Types are: 
		* `String`
		* `Long``
			* `Int` or `Integer` can also be used, but are persisted as `Long` in JCR
		* `Double`
		* `Boolean`
			* Values can be `TRUE` or `FALSE`
		* `Date`
			* This expects the ISO Date format
			* `Calendar` can also be used, but is persusted as `Date` in JCR
* `propertyName {{ "{{ Type : multi "}}}}` the property will be persisted as multi-value of type Type in the JCR

Note that there are 2 required Column definitions

* `absTargetPath` this is the absolute path in the JCR where the Asset will be imported to
* `relSrcPath` this is the relative (from a provided root path) path to the file to ingest for the asset. This file must be available from the AEM instance executing the importer.


### Multi-values

If a row is marked as multi via `propertyName {{"{{ Type : multi "}}}}`, multi-values are delimited by default via `|`. The multi-value delimiter is configurable via the Web UI.

### Empty Values

If a column has an empty value, that property will be not exist on the Asset's metadata node.

### Asset Defintion Rows

Rows 2-N each represent an Asset to import.







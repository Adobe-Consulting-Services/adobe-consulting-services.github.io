---
layout: acs-aem-commons_default
title: Extending Report Builder
description: How to extend the report builder functionality
date: 2017-01-19
tags: aem-65 aem-cs
initial-release: 3.14.0
---

[&lt; Back to Report Builder](index.html) 

# Extending Reports

The report builder can be customized to provide new [report executors](#creating-a-report-executor), [column types](#creating-a-report-column) and [parameter types](#creating-a-report-parameter). 

## Creating a Report Executor

Report Executors are used to execute the report based on the parameters and return the results. Report Executors do not need to return Resources, but all exisiting columns do expect Resource-based results.

To create a custom Report Executor:

1. Register a component with the `componentGroup` "ACS Commons - Report Builder Config" 
2. Updated the component dialog to write the property `reportExecutor` upon saving the configuration. The value should be the fully qualified name of the Report Executor Java class. See the [query-config](https://github.com/Adobe-Consulting-Services/acs-aem-commons/tree/master/content/src/main/content/jcr_root/apps/acs-commons/components/utilities/report-builder/configs/queryconfig) component for an example of this.
3. Add a default script (e.g. {component-name}.jsp), this will be called when editing the report to render the column configuration. See [queryconfig/queryconfig.jsp](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/content/src/main/content/jcr_root/apps/acs-commons/components/utilities/report-builder/configs/queryconfig/queryconfig.jsp) as an example.
2. Register a [Sling Model](https://sling.apache.org/documentation/bundles/models.html) implementing the [ReportExecutor](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/bundle/src/main/java/com/adobe/acs/commons/reports/api/ReportExecutor.java) interface. See the [QueryReportExecutor](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/bundle/src/main/java/com/adobe/acs/commons/reports/models/QueryReportExecutor.java) as an example.

Once you have this model successfully registered, you should be able to [configure your report](configuring.html) to use your new Report Executor.

## Creating a Report Column

Report columns are used to render a particular cell of a report result. All of the provided Report Columns use Sling Resources, but this is not a hard requirement. To create a custom Report Column:


1. Register a component with the `componentGroup` "ACS Commons - Report Builder Column"
2. If this column should be added to the CSV export, the component can write the property `exporter` upon saving the configuration. The value should be the fully qualified name of the Java used to export the result to CSV for this column. See the [containing-page](https://github.com/Adobe-Consulting-Services/acs-aem-commons/tree/master/content/src/main/content/jcr_root/apps/acs-commons/components/utilities/report-builder/columns/containing-page) component for an example of this.
3. Add a default script (e.g. {component-name}.jsp), this will be called when editing the report to render the column configuration. See [containing-page/containing-page.jsp](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/content/src/main/content/jcr_root/apps/acs-commons/components/utilities/report-builder/columns/containing-page/containing-page.jsp) as an example.
4. Add a results.jsp script, this will be called when the column is rendered for a result. This should render a [Coral Table Cell](https://helpx.adobe.com/experience-manager/6-3/sites/developing/using/reference-materials/coral-ui/coralui3/Coral.Table.html) with the results. See [containing-page/results.jsp](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/content/src/main/content/jcr_root/apps/acs-commons/components/utilities/report-builder/columns/containing-page/results.jsp) as an example.
5. Register a [Sling Model](https://sling.apache.org/documentation/bundles/models.html) implementing the [ReportCellCSVExporter](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/bundle/src/main/java/com/adobe/acs/commons/reports/api/ReportCellCSVExporter.java) interface. See the [PathReportCellCSVExporter](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/bundle/src/main/java/com/adobe/acs/commons/reports/models/PathReportCellCSVExporter.java) as an example.

## Creating a Report Parameter

Report Parameters are used to allow users to pass variables to the Report Executor. 

To create a custom Report Parameter:

1. Create a component with the `componentGroup` "ACS Commons - Report Builder Parameter"
2. Have this component set the property `resourceType` upon save. This should be the Sling Resource Type of the component to render this Parameter field. The existing components leverage existing Granite UI components including: `granite/ui/components/coral/foundation/form/textfield` and `granite/ui/components/coral/foundation/form/datepicker`
3. Add a default script (e.g. {component-name}.jsp), this will be called when editing the report to render the column configuration. See [basic/basic.jsp](https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/content/src/main/content/jcr_root/apps/acs-commons/components/utilities/report-builder/parameters/basic/basic.jsp) as an example.

**Note** - if you want to make an additional existing Granite component available in the Basic Parameter options, add an entry in the [Report Parameter Components ACS Commons List](http://localhost:4502/cf#/etc/acs-commons/lists/report-parameter-components)
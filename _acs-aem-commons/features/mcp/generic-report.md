---
layout: acs-aem-commons_feature
title: MCP - Generic Report
---

[<< back to MCP Table of Contents](index.html)

The GenericReport is a simple facility for persisting a report of columnar data, retrieving it via a Sling model, and displaying it as either a simple table or an Excel spreadsheet.

## Identifying columns

For starters, the report header is defined using an enumeration such as the following:

```
public static enum Column {
    level, asset_count, subfolder_count,
    rendition_count, version_count, subasset_count,
    @FieldFormat(ValueFormat.storageSize)
    original_size,
    @FieldFormat(ValueFormat.storageSize)
    rendition_size,
    @FieldFormat(ValueFormat.storageSize)
    version_size,
    @FieldFormat(ValueFormat.storageSize)
    subasset_size,
    @FieldFormat(ValueFormat.storageSize)
    combined_size;
}
```

## FieldFormat annotations / ValueFormat
In the above example, some columns require additional formatting.  Using the @FieldFormat to specify the ValueFormat required, you can add additional formatting columns.  This is currently only useful for storage sizes, as this is the only defined value format at the moment.  The field format annotation is not required for plain text or numeric fields, however.

## Identifying rows
Each row is represented as an EnumMap object, such that the enumeration is the same as the above that identifies the columns, and the column values are represented by map entries.

In the generic report class there are two ways that reporting data can be provided, either with a list of rows (enum maps) or as a Map<String, EnumMap> data structure.  The list data structure is simpler and more general purpose.  The nested map scenario is a bit special and allows the data to be formatted such that the key represents something like a node path or other unique identifier.  For reports that need to accumulate values (such as the Asset Report) this is a more convenient choice.

## Hooking up reporting to a Process Definition
The Process Definition interface requires that a method `storeReport` be declared.  This is called at the moment a process has terminated and gives that process an opprotunity to persist any information captured in a report.  There is no direct mandate that this be a Generic Report per se, that is up to the developer.

To store a Generic Report, the developer has to do two steps: set the row data and then commit the data to the JCR.
```
    report.setRows(reportData, "Path", Column.class);
    report.persist(rr, instance.getPath() + "/jcr:content/report");
```

This example uses the more complex nested Map data structure.  This method variation takes a second parameter which becomes the leftmost column of the spreadsheet, and the value in each row is taken from the key for that corresponding map entry.  So for example this is the path being reported on each row for this example report.  For reports that are a list of rows, there are only two required parameters: The list of rows and the enumeration class which identifies the columns.

**NOTE:** At the moment the report path needs to always be generated like the above at `/jcr:content/report` relative to the process instance JCR path -- if you are using this with MCP processes.  At some point in the futue this might be simplified with a more convenient utility function to provide the reporting path so that the string is not hard-coded.

## Report displays, and other notes on reuse

The report is genereated as a standard sling component with the component type `acs-commons/components/utilities/process-instance/process-generic-report`.  The servlet which generates the excel documents is registered to that same resource type but for the xls extension.  The process-instance component demonstrates how to form links to these pretty easily.  There's no complex logic required to generate these paths; you just need to know the path of the containing process instance.  Otherwise if using generic reports elsewhere outside of MCP, you use path of where the report was stored as you would for any other kind of Sling component.
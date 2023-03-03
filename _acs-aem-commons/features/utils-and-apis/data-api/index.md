---
layout: acs-aem-commons_feature
title: Data APIs
description: Simplify working with data
date: 2018-05-04
redirect_from: /acs-aem-commons/features/data-api.html
feature-tags: aem-65 aem-cs
initial-release: 3.17.0
---

The Data API provides useful abstractions for working with data from various sources and converting it into some kind of format that can be more easily stored in AEM.

## Spreadsheet

The Spreadsheet API `com.adobe.acs.commons.data.Spreadsheet` is built on top of Apache POI and is designed to simplify the work of reading structured tabular data from an XLSX file.

### Structure

In order to be processed correctly, an XLSX file must have the required data located in the first sheet of the workbook.  Other sheets are ignored, and can be used for other functions such as lookup tables and so on.

In order to identify values for each row by a usable name, the first row (herein called the header row) identifies each column.  If a column should have at most one value, then there should only be one column with that name.  If a column could have many values, you don't have to cram all of the values into one cell.  You can create multiple columns which all have the same name in duplicate, and it will be processed as if it were one large column with multiple values.

It is recommended to use the first sheet to cleanly identify all required data without any scratch areas that might be misinterpreted as data.  If additional scratch columns are needed, then make sure to leave the header row empty for those columns.  Any column that does not have a name in the header row will be effectively skipped.

It is possible to instruct the Spreadsheet API that certain columns are required for processing purposes.  If a list of required column names is provided, then a row will be discarded if it does not have a value for that column.  *IMPORTANT NOTE:* If a required column is indicated but is not present in the header row of the file, effectively the whole file will be ignored.  When in doubt, check your file for a correct header.

### Column naming rules

Column names should ideally follow the same naming rules as JCR properties.  Names should include only the following types of characters if you plan to map data to AEM properties using this API:

- Upper and Lower case letters (A-Z, a-z)
- Numbers (0-9)
- Plus, Minus, Underscore characters (+, -, _)

To simplify things, the API also has an option to convert property names automatically such that everything is made lower-case and any unsupported characters are converted into underscores.  Some tools that work with data importing will likely turn this option on by default.

### Column type hinting

By default a column is assumed to be a single-value String.  It is possible add some hints in the header for that column to instruct the API to interpret the contents differently.  Here are some examples:

| Header column  | Real name | Translation                             | Example values |
|----------------|-----------|-----------------------------------------|----------------|
| myCol@int      | myCol     | Integer numbers between +/- 2.1 billion | -999           |
| myCol2@integer | myCol2    | Same as above                           | 12345678       |
| otherCol@long  | otherCol  | Long numbers betwen +/- 9.2 quintillion | 14309128340123 |
| price@double   | price     | 64-bit floating point number            | 10.1434        |
| other@number   | other     | Same (also means "double")              | -0.3412        |
| deadline@date  | deadline  | A representation of date and time †     | Jan 1 1980     |
| ...            | ...       | Also can use calendar, cal, or time     |                |
| alive@boolean  | alive     | Boolean value (yes/no, true/false) ‡    | Y, True, T, 1  |
| finished@bool  | finished  | Same as boolean                         |                |
| val@string     | val       | String value                            | Hello World!   |
| val@str        | val       | Also means string                       | Ooga Booga!    |
| val            | val       | Assumed to be string by default         | Okay!          |

† Date conversion works most reliably if Excel already has cells set up as dates to start with.  Some attempt is made to convert non-date values into proper dates but only a few basic patterns are detected.

‡ Boolean conversion is pretty basic, using the following rules:
* Any value beginning with the letters X, T, Y (any case) or a non-zero number.
* Anything else is treated as false.

_Note in 3.17.0+:_ Regardless of type hints provided, if you request the string value of any column, it will return the display representation of the cell as it appears in Excel.  Meaning if it is formatted as a percentage you will get something like 100.00%, not 1.0, as the value of toString().

### Multi-value columns

It is also possible to provide additional hinting that a value should be split into a list as well.  To do this put square braces at the end of the type hint [] -- if you want to specificy the separator place it inside the braces like this [:]

| Header column  | Real name | Translation                             | Example values |
|----------------|-----------|-----------------------------------------|----------------|
| myCol@int[]    | myCol     | List of numbers separated by ,          | 1,100,-999     |
| myCol2@int[:]  | myCol2    | List of numbers separated by :          | 1:2:3:4        |
| cq:tags@[]     | cq:tags   | List of strings separated by ,          | tag:A/B,tag:B  |

As stated above, columns having the same name are treated as one column with multiple values.  In this case there is no need to worry about using separator characters because using separate excel columns is itself separating the different values already.  As an edge case, it is a good idea to add a hint to the columns as a list using a separator character that is not in the text just to ensure it doesn't try to split the values up.  For example [~~] would tell it to use a double-tilde sequence as a separator which is unlikely to ever appear in natural text.  You don't have to do this for all columns, just the first one is sufficient.

## Variant

Variant `com.adobe.acs.commons.data.Variant` is an abstraction of a simple value that can be converted into an other simple type in most cases.  This is the heart of the Spreadsheet API, but it is also incredibly useful on its own.  The primary goal of a variant is to accept data from any source format and have the interpretation of that value provided at a later point.

A common example is that data from a file might be loaded as a set of strings.  Later on, some of that data might require interpretation as numbers.  By having a type-neutral representation it is much easier to pass that data as a Variant rather than pre-emptively casting that data to an intermediate type which could lose precision or meaning.

Variant also has a static convenience method called "convert" which lets you leverage the type conversion logic if you just need to use data conversion without creating Variants.

Variants can also represent multiple source variables.  For example, if a date and a preferred representation of the date are both known then both values can be set, such that getting a Date will return the already-processed date, but requesting a String value will return the provided representation.  This has a lot of other useful implications.

Supported types for variant values include:

* All java primitives except char (int, byte, short, long, double, float, boolean)
* Strings
* Date / Calendar / Instant

There are type conversion methods for basic types, but to simplify cases such as reflection there is also a method called `asType` where the target type can be provided as well.  Note that it is possible to get a null for values that do not convert successfully, so it is imperative that the code check for nulls when getting values out of a Variant.

Date conversion from string is also provided and uses all possible combination of long and short variations from the SimpleDateFormat API in Java.  If these patterns are insufficient then you will have to parse source dates and provide the parsed Date to Variant instead of the String.

## CompositeVariant
Composite Variant `com.adobe.acs.commons.data.CompositeVariant` builds upon Variant to add a couple new abstractions.  The first is that it can represent one or many variants (hence composite).  This is incredibly useful if data is processed in a way where it will not be known right away if a value is supposed to be treated as a single value or later combined with other values in a list.  By representing the data in a composite variant structure, additional values can later be appended and the resulting type conversion to array is automatic.

The other useful function of the composite variant is that, combined with Variant's type conversions, this class provides conversion to the property types understood by the Resource value map data type rules.  This makes it much easier to build data import and other similar tools which don't require a lot of messy type conversion.


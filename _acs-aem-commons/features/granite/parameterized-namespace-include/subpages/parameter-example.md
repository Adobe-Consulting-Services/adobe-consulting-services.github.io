---
layout: acs-aem-commons_subpage
title:  Parameterized Namespace Granite Include - Parameterized Snippet Example
---

[<< back to Parameterized Namespace Granite Include index](../index.html)

## Parameters Example

Using the parameters mechanism in our include component, you can write snippets that can be reused by multiple components that could not be used before.

It allows you to customize various values per include, such as a fieldLabel, fieldDescription, whether to show or hide a field or not, to give it default values etc. 


### Syntax 

The way it works is that give defined a property value (not key!) in the dialog XML the following expression:

    
$&#x0007B;&#x0007B;(OptionalTypeCast)parameterKey(:OptionalDefaultValue&#x0007D;&#x0007D;


So at minimum you will need:


$&#x0007B;&#x0007B;parameterKey&#x0007D;&#x0007D;


When you want to typecast that value to a Boolean:


$&#x0007B;&#x0007B;(Boolean)parameterKey&#x0007D;&#x0007D;


And if you also would live to give it a default value of true:


$&#x0007B;&#x0007B;(Boolean)parameterKey:true&#x0007D;&#x0007D;

### The example




## Possible Typecasts 

Currently the possible typecasts are : Boolean, Long, Double, String.

The input here is case insensitive. 

More typecasts may be added in the future.
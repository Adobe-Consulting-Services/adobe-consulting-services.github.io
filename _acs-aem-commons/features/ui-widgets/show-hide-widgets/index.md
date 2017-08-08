---
layout: acs-aem-commons_feature
title: Show/Hide Widgets
description: Use checkboxes and drop-downs to conditionally show/hide other fields!
date: 2017-02-10
feature-tags: component-dev
initial-release: 2.7.0/3.10.0
---


## Purpose

This is an enhancement to the ACS Commons multi-field component. 

This enhancements enables show/hide of multiple dialog fields based on the toggling of checkbox or select fields. 
The state of the checkbox/select would only effect the current row of multi-field.

## How to use

### Select field (aka Drop-down field)
1. Add the empty property `cq-dialog-multifield-dropdown-showhide` to the select element
2. Add the data attribute `cq-dialog-showhide-target` to the select element whose value is a selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
4. Add the target class to each target component that can be shown/hidden
5. Add the class hidden to each target component to make them initially hidden
6. Add the attribute `showhidetargetvalue` to each target component, the value should equal the value of the select
7. Option that will un-hide this element


### Checkbox field
1. Add the empty property `cq-dialog-multifield-checkbox-showhide` to the checkbox element
2. Add the data attribute `cq-dialog-showhide-target` to the checkbox element, whose value is a selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
3. Add the target class to each target component that can be shown/hidden
4. Add the class hidden to each target component to make them initially hidden
5. Add the attribute `showhidetargetvalue` to each target component, the value should equal to:
    * `true` if the field is to be displayed when Checkbox is selected
    * `false` if the field is to be displayed when Checkbox is unselected
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

### Wrapper Client Library (required as of 4.0.0)

The following wrapper Client Library node definition must be used to enable this feature.

* [Wrapper Client Library node definition](https://github.com/Adobe-Consulting-Services/acs-aem-commons/tree/master/ui.apps/src/main/content/jcr_root/apps/acs-commons/touchui-widgets/showhidedialogfields/.content.xml)

## How to use

### Select field (aka Drop-down field)
1. Add the empty property `acs-cq-dialog-dropdown-checkbox-showhide` to the dropdown/select or checkbox element
2. Add the data attribute acs-cq-dialog-dropdown-checkbox-showhide-target to the dropdown/select or checkbox element, 
   whose value is a selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
4. Add the target class to each target component that can be shown/hidden
5. Add the class hidden to each target component to make them initially hidden
6. Add the attribute `acs-dropdownshowhidetargetvalue` to each target component, the value should equal the value of the select option that will unhide this element. Multiple values can be provided separated with spaces.

### Checkbox field
1. Add the empty property `acs-cq-dialog-dropdown-checkbox-showhide` to the dropdown/select or checkbox element
2. Add the data attribute acs-cq-dialog-dropdown-checkbox-showhide-target to the dropdown/select or checkbox element, 
   whose value is a selector, usually a specific class name, to find all possible target elements that can be shown/hidden.
4. Add the target class to each target component that can be shown/hidden
5. Add the class hidden to each target component to make them initially hidden
6. Add the attribute `acs-checkboxshowhidetargetvalue` to each target component, the value should equal to:
 - 'true' if the field is to be displayed when Checkbox is selected.
 - '' if the field is to be displayed when Checkbox is unselected (value of false is made empty in JavaScript).

7. Add both acs-dropdownshowhidetargetvalue and acs-checkboxshowhidetargetvalue attribute to each target component, which should beunhidden based on combination of dropdown and checkbox value.
8. The acs-dropdownshowhidetargetvalue and/or acs-checkboxshowhidetargetvalue attribute can be added to dialog tab items to show and hide them.
9. (optional) add css class acs-commons-field-required-allow-hidden to provided required field validation, which turns off when the field is hidden

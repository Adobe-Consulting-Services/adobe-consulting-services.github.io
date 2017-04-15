---
layout: acs-aem-commons_feature
title: CoralUI Angular Directives
description: Cut down on duplicate markup in custom Coral UI interfaces
date: 2015-08-12
redirect_from: /acs-aem-commons/features/coral-angular.html
---

> This feature is primarily intended for use within ACS AEM Commons itself, but may be valuable for other users.

This Client Library includes a variety of AngularJS directives useful when building user interfaces based on CoralUI 2. Its primary function is to simplify the markup required, as seen in the examples below.

> This feature is **not** intended to be used while building Granite UI-based user interfaces.

# General Usage

1. Include the client library category `acs-commons.coralui.angularjs` as a dependency to your client library.
2. In your AngularJS module intialization, include `acsCoral` as a dependecy.

# Directives

## `acsCoralAlert`

Generates the appropriate markup for a [CoralUI alert](http://docs.adobe.com/docs/en/aem/6-0/develop/ref/coral-ui/docs/2.1.2-aem600-015/alert.html)

### Example

        <div acs-coral-alert data-alert-type="notice" data-alert-size="large" data-alert-title="Workflow Removal Executing">
            Please be patient as workflow removal runs. The removal status below will update removal progress.
        </div>

The alert message can be provided either as the body of the `<div>` element or as the `data-alert-message` attribute.

## `acsCoralHeading`

Generates the appropriate [heading](http://docs.adobe.com/docs/en/aem/6-0/develop/ref/coral-ui/docs/2.1.2-aem600-015/heading.html) `class` attribute based on the element name.

### Example

    <h1 acs-coral-heading>Some Heading</h1>

## `acsCoralList`

Adds the appropriate [list](http://docs.adobe.com/docs/en/aem/6-0/develop/ref/coral-ui/docs/2.1.2-aem600-015/list.html) and list item `class` attributes.

### Example

    <ul acs-coral-list>
        <li>First Item</li>
        <li>Second Item</li>
    </ul>

## `acsCoralCheckbox`

Creates the necessary markup for a CoralUI [checkbox](http://docs.adobe.com/docs/en/aem/6-0/develop/ref/coral-ui/docs/2.1.2-aem600-015/checkbox.html)

### Example

    <label acs-coral-checkbox>
        <input type="checkbox" ng-model="app.paintConnections">
        <span>Paint Connections</span>
    </label>

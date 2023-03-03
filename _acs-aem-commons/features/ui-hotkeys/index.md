---
layout: acs-aem-commons_feature
title: Layer Switcher
description: Switch active layer with a stroke of a key!
date: 2014-07-23
tags: aem-65 aem-cs
initial-release: 1.7.0
last-updated-release: 4.0.0
---

## Purpose

Switching between edit / preview and other layers in the AEM Touch UI requires numerous clicks. The UI hot-keys bind easy to use keystrokes to show various layers of the AEM UI.

## How to Use

{% include acs-aem-commons/wrapper-client-library.html path='/apps/acs-commons/authoring/switchlayers/.content.xml#L13-L19' %}

Open up a page in AEM using the UI page editing interface (not the Classic UI).

Use the following key strokes to show the corresponding layers.

* Edit: Ctrl + Shift + E
* Preview: Ctrl + Shift + P
* Annotate: Ctrl + Shift + A
* Developer: Ctrl + Shift + D
* Targeting: Ctrl + Shift + T
* Toggle Side Panel: Ctrl + Shift + S

## Note

This feature is "always on" for ACS AEM Commons 1.7.0 to 4.0.0.

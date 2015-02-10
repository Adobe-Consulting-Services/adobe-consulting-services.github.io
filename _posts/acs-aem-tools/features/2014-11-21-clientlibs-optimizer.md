---
layout: acs-aem-tools_feature
title: Client Library Optimizer
description: One embed to rule them all!
date: 2014-11-21
thumbnail: /images/clientlibs-optimizer/thumbnail.png
initial-release: 0.0.16
categories: acs-aem-tools
tags: acs-aem-tools-features updated
---

## Getting Started


Install the ACS AEM Tools package via the AEM Package Manager and then open Client Library Optimizer from the AEM Tools console, or directly at [/etc/acs-tools/clientlibs-optimizer.html](http://localhost:4502/etc/acs-tools/clientlibs-optimizer.html)

To get to the AEM Tools console from the Touch UI, from the left rail navigation, select Tools > ACS AEM Tools > Client Library Optimizer.

## Overview

Client Library Optimizer is a tool that accepts a list client library categories and derives the embed rule so they can all be compacted into a single include, reducing the # of HTTP requests required (ideally, to one).

![Clientlibs Optimizer](/acs-aem-tools/images/clientlibs-optimizer/screenshot.png)


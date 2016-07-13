---
layout: acs-aem-tools_feature
title: AEM Chrome Plug-in - Log Tracer
description: All your logs are belong to us
date: 2016-06-01
thumbnail: /images/aem-chome-plugin/thumbnail.png
initial-release: 0.1.0
categories: acs-aem-tools
tags: beta
---

[< Back to AEM Chrome Plug-in](/acs-aem-tools/aem-chrome-plugin)


## Quick Links

* [AEM Chrome Plug-in Download](https://chrome.google.com/webstore/detail/aem-chrome-plug-in/ejdcnikffjleeffpigekhccpepplaode)
* [Sling Log Tracer Bundle Download](http://search.maven.org/remotecontent?filepath=org/apache/sling/org.apache.sling.tracer/1.0.0/org.apache.sling.tracer-1.0.0.jar)

## Requirements

* Requires AEM 6.1+
* Requires Apache Sling Log Tracer to be installed and enabled on the target AEM instance
* This is is a development tool and should not be used on production instances.
* ACS AEM Tools is not required

## Purpose

AEM Chrome Plug-in - Log Tracer is a [Chrome browser](https://www.google.com/chrome/browser/desktop/index.html) extension that exposes server-side log information per-request in the browser.

AEM Chrome Plug-in - Log Tracer collects and exposes per-request:

1. AEM Logs (based on configurable package definitions)
2. Request Progress
3. Queries executed

## How to use AEM Chrome Plug-in - Log Tracer

1. Download and install [Sling Log Tracer 1.0.0+](http://search.maven.org/remotecontent?filepath=org/apache/sling/org.apache.sling.tracer/1.0.0/org.apache.sling.tracer-1.0.0.jar) via [AEM 6.1 Felix Console](http://localhost:4502/system/console/bundles) and ensure it is started/active.
2.  Enable [Sling Log Tracer via Felix ConfigMgr](http://localhost:4502/system/console/configMgr/configMgr/org.apache.sling.tracer.internal.LogTracer).
 * Make sure both "Enabled" and "Servlet Enabled" are checked.
 ![Sling Log Tracer OSGi Config](/acs-aem-tools/images/aem-chrome-plugin/sling-log-tracer-configmgr.png)
3. Install [AEM Chrome Plug-in](https://chrome.google.com/webstore/detail/aem-chrome-plug-in/ejdcnikffjleeffpigekhccpepplaode) via the Chrome web store.
4. Open up Chrome Dev Panels (Chrome > View > Developer > Dev Tools) and click on the AEM tab.
  * Pro tip: You can drag to re-arrange Dev Tool tabs.
   ![Chrome Dev Tools Bar](/acs-aem-tools/images/aem-chrome-plugin/chrome-dev-tools-bar.png)
5. Assuming you setup Sling Log tracer properly and the default AEM settings are used (http://localhost:4502 and admin/admin), the AEM Chrome Plug-in panel will display.
  ![AEM Chrome Plug-in Empty](/acs-aem-tools/images/aem-chrome-plugin/panel-empty.png)
6. If something is misconfigured you will be instructed to open the AEM Chrome Plug-in Options which will guide you to correcting the problem.
![AEM Chrome Plug-in Empty](/acs-aem-tools/images/aem-chrome-plugin/panel-error.png)
7. Open the AEM Chrome Plug-in Options as instructed (Chrome > Window > Extensions > AEM Chrome Plug-in > Options)
![AEM Chrome Plug-in Options](/acs-aem-tools/images/aem-chrome-plugin/options.png)
8. After AEM Chrome Plug-in Options does not report any issues, close and re-open Chrome dev tools (Step 4)
9. Use AEM Chrome Plug-in!
  * ![AEM Chrome Plug-in Requests](/acs-aem-tools/images/aem-chrome-plugin/requests.png)
  * ![AEM Chrome Plug-in Logs](/acs-aem-tools/images/aem-chrome-plugin/logs.png)
10. Pro tip: Use the inline "Mini-options" to quickly tune what data you're collecting based on what you're working on.
  * ![AEM Chrome Plug-in Mini-Options](/acs-aem-tools/images/aem-chrome-plugin/mini-options.png)

## How AEM Chrome Plug-in - Log Tracer Works

AEM Chrome Plug-in works in conjunction with [Apache Sling Log Tracer](https://sling.apache.org/documentation/bundles/log-tracers.html) to collect and expose server-side data to the browser.

1. AEM Chrome Plug-in intercepts requests made from Chrome browser to to AEM 6.1+
2. AEM Chrome Plug-in injects Sling Log Tracer headers defining what data Sling Log Tracer should collect for that request on the AEM server.
3. When the HTTP Request returns, a Sling Log Tracer UUID is provided in the HTTP Response. AEM Chrome Plug-in uses this UUID in a background HTTP Request to AEM to retrieve the log data collected by Sling Log Tracer.
4. AEM Chrome Plug-in parses and injects the log data into the AEM Chrome Plug-in Dev Panel.

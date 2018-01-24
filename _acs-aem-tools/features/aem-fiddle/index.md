---
layout: acs-aem-tools_feature
redirect_from: /acs-aem-tools/features/aem-fiddle.html
title: AEM Fiddle
description: Web-based AEM IDE perfect for POC’s, experimenting and running ad hoc scripts.
date: 2013-12-06
initial-release: 0.0.2
last-updated-release: 0.0.52
---

The intent of AEM Fiddle is to provide an accessible, developer friendly environment for experimentation, POCs and other one-off tasks. AEM Fiddle is **not** intended to be used as a full fledged application development environment.

AEM Fiddle's fundamental advantage over other AEM IDEs is: *time to execution*.

Most AEM IDE/development tooling requires the orchestration of scripts, resources and `sling:resourceTypes`. AEM Fiddle allows you to begin coding and executing your code in seconds (literally).


## Getting Started

![AEM Tools](images/miscadmin.png)

Install the ACS AEM Tools package via the AEM Package Manager and then open AEM Fiddle from the AEM Tools console, or directly at [/etc/acs-tool/aem-fiddle.html](http://localhost:4502/etc/acs-tools/aem-fiddle.html)

> To get to the AEM Tools console from the Touch UI, from the left rail navigation, select Tools > Operations > Configuration.

## Overview

The term "fiddle" is used to describe the script entered into the Web UI (left side of screen) to be executed against AEM.

![AEM Fiddle Overview](images/overview.png)

1. Write code to execute in AEM
2. Absolute path to resource used for script execution context (defaults to `/etc/acs-tools/aemfiddle/jcr:content`)
3. Button to run code defined in (1.)
	* Windows shortcut: Ctrl-K
	* OS X shortcut: Cmd-K

4. Displays the output of code execution
5. Toggles output between rendered HTML *(shown)* and HTML src view
6. Displays the time of execution and resource context
7. Opens dialog for creating a new input using script languages supported by the AEM install
8. Toggles the sidebar used to Creating, Updating, Loading and Deleting saves fiddles
9. Updates the active saved fiddle
10. Saves code from (1.) to the logged in user's profile
![AEM Fiddle - Create Fiddle](images/create.png)


11. Lists all previously saved fiddles
	* Clicking on the fiddle will load the code into (1.)

12. Deletes the fiddle

## Scripting Language Support

AEM Fiddle will allow you to code in any script language the AEM installation support. New scripting language support can be installed from [contributions to the Apache Sling project](https://github.com/apache/sling/tree/trunk/contrib/scripting).

![AEM Fiddle - Script Languages](images/script-languages.png)



## Error Handling
AEM Fiddle supports erring scripts by displaying the normal output of the error along with a Warning notification.

Note: Switching to HTML src view often makes reading the error messages easier.

![AEM Fiddle Errors](images/error.png)


## Extras

* The name AEM Fiddle and term "fiddle" were inspired by the popular [JSFiddle.net](http://jsfiddle.net)
* "My Fiddles" are stored under the logged in user's profile node. Ex. `/home/users/admin/profile/fiddles/demo-fiddle`


### event-user-data (Since v0.0.30)

`user-event-data` of `acs-aem-tools.aem-fiddle` is set for the JCR session used by this feature.
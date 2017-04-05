---
layout: acs-aem-commons_feature
title: ACL Packager
description: Easily zip up access control entries
sub-feature: true
date: 2014-01-20
feature-tags: administration
initial-release: 1.5.0
---

# Purpose

Frequently, access control entries need to be copied from one environment to another *without* copying the actual content itself, just the access control entries. This user interface allows you to define and build packages containing access control entries for particular paths and/or particular principals.

# How to Use

* Log in to AEM Author
* Navigate to the Classic UI Tools Console (from the Touch UI, this is Tools:Operations:Configuration)
* Under the `acs-commmons` folder, create a folder named `packagers` (NOTE: As of 1.6.0, this folder is created automatically)
* Under the `packagers` folder, create a new Page of Template type "ACL Packager"
![image](images/create_dialog.png)
* Use the Edit dialog to configure the package rules and configuration
![image](images/edit_dialog.png)
* The Preview button output a list of the access control entries which will be packaged.
![image](images/page_with_preview.png)
* The Create Package button (cut off in the above screenshot!)... creates the package
![image](images/created_package.png)
* Now that the Package definition has been created, go to CRX Package Manager by clicking on one of the links in the result message, Build and Download the package. 


## Bug Fixes

* Version 1.8.0 excludes `.tokens` nodes when packaging principals that caused problems when installing on AEM6/Oak repositories.
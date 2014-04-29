---
layout: acs-aem-commons_feature
title: ACL Packager
description: Easily zip up access control entries
date: 2014-01-20
thumbnail: /images/acl-packager/thumbnail.png
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.5.0
---

# Purpose

Frequently, access control entries need to be copied from one environment to another *without* copying the actual content itself, just the access control entries. This user interface allows you to define and build packages containing access control entries for particular paths and/or particular principals.

# How to Use

* Log in to AEM Author
* Navigate to the Classic UI Tools Console (from the Touch UI, this is Tools:Operations:Configuration)
* Under the `acs-commmons` folder, create a folder named `packagers` (Title can be anything).
* Under the `packagers` folder, create a new Page of Template type "ACL Packager"
![image](/acs-aem-commons/images/acl-packager/create_dialog.png)
* Use the Edit dialog to configure the package rules and configuration
![image](/acs-aem-commons/images/acl-packager/edit_dialog.png)
* The Preview button output a list of the access control entries which will be packaged.
![image](/acs-aem-commons/images/acl-packager/page_with_preview.png)
* The Create Package button (cut off in the above screenshot!)... creates the package
![image](/acs-aem-commons/images/acl-packager/created_package.png)
* Now that the Package definition has been created, go to CRX Package Manager by clicking on one of the links in the result message, Build and Download the package. 



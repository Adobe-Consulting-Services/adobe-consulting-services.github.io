---
layout: acs-aem-commons_feature
title: Authorizable Packager
description: Create package definitions of Authorizables
date: 2015-08-22
thumbnail: /images/authorizable-packager/thumbnail.png
feature-tags: administration
tags: acs-aem-commons-features updated
categories: acs-aem-commons features
initial-release: 2.0.0
---

# Purpose

ACS AEM Commons Authorizble Packager faciliates the creation Content Packages containing authorizables. Because these packages are based on the authorizable IDs, you do not need to worry about the use of intermediate path or the obfuscated user node names in AEM 6.1.

# How to Use

* Log in to AEM Author
* Navigate to the Classic UI Tools Console (from the Touch UI, this is Tools:Operations:Configuration)
* Under the `acs-commmons` folder, create a folder named `packagers`
* Under the `packagers` folder, create a new Page of Template type "Authorizable Packager"
![image](/acs-aem-commons/images/authorizable-packager/step-1.png)
* Use the Edit dialog to configure the package rules and configuration
![image](/acs-aem-commons/images/authorizable-packager/step-2.png)
* The Preview button output a list of the package filter entries which will be included.
* The Create Package button (cut off in the above screenshot!)... creates the package
* Now that the Package definition has been created, go to CRX Package Manager by clicking on one of the links in the result message, Build and Download the package.

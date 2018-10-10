---
layout: acs-aem-commons_feature
title: Authorizable Packager
description: Create package definitions of Authorizables
sub-feature: true
date: 2015-08-22
feature-tags: administration
initial-release: 2.0.0
---

# Purpose

ACS AEM Commons Authorizable Packager faciliates the creation Content Packages containing authorizables. Because these packages are based on the authorizable IDs, you do not need to worry about the use of intermediate path or the obfuscated user node names in AEM 6.1.

# How to Use

* Log in to AEM Author
* Navigate to the Classic UI Tools Console (from the Touch UI, this is Tools:Operations:Configuration)
* Under the `acs-commmons` folder, create a folder named `packagers`
* Under the `packagers` folder, create a new Page of Template type "Authorizable Packager"
![image](images/step-1.png)
* Use the Edit dialog to configure the package rules and configuration
![image](images/step-2.png)
* The Preview button output a list of the package filter entries which will be included.
* The Create Package button (cut off in the above screenshot!)... creates the package
* Now that the Package definition has been created, go to CRX Package Manager by clicking on one of the links in the result message, Build and Download the package.

## Using Authorizable Packagers on AEM Publish

Because the ACS Commons Packagers are built using the ClassicUI dialogs, the configuration dialogs are automatically force-disabled on AEM Publish.

In order to use Packages on AEM Publish, you must define the Package configuration on AEM Author, replicate the Packager page to AEM publish, and then Create the package on AEM Publish based on that replicated configuration.

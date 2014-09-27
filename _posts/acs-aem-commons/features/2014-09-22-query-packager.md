---
layout: acs-aem-commons_feature
title: Query Packager
description: Create package definitions from Queries
date: 2014-09-22
thumbnail: /images/query-packager/thumbnail.png
feature-tags: administration
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.8.0
---

# Purpose

ACS AEM commons Query Packager faciliates the creation of CQ Packages based on Xpath, JCR-SQL or JCR-SQL2 query results.

# How to Use

* Log in to AEM Author
* Navigate to the Classic UI Tools Console (from the Touch UI, this is Tools:Operations:Configuration)
* Under the `acs-commmons` folder, create a folder named `packagers`
* Under the `packagers` folder, create a new Page of Template type "Query Packager"
![image](/acs-aem-commons/images/query-packager/step-1.png)
* Use the Edit dialog to configure the package rules and configuration
![image](/acs-aem-commons/images/query-packager/step-2.png)
* The Preview button output a list of the package filter entries which will be included.
![image](/acs-aem-commons/images/query-packager/step-3.png)
* The Create Package button (cut off in the above screenshot!)... creates the package
![image](/acs-aem-commons/images/query-packager/step-4.png)
* Now that the Package definition has been created, go to CRX Package Manager by clicking on one of the links in the result message, Build and Download the package. 
![image](/acs-aem-commons/images/query-packager/step-5.png)



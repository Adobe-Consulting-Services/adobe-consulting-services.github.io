---
layout: acs-aem-commons_feature
title: ACS AEM Commons Utils APIs
description: A collection of common utils
sub-feature: true
date: 2013-06-30
feature-tags: backend-dev
initial-release: 1.0.0
---

## Purpose

Provide common utility functionality across projects.

## Overview

The best overview are the [ACS AEM Commons Utils JavaDocs](/acs-aem-commons/apidocs/com/adobe/acs/commons/util/package-summary.html).

Characteristics of the ACS AEM Commons Utils are:

* Static Java classes
* Do *NOT* have mutable state
* Do *NOT* have inherent access to OSGi/JCR/Sling context and typically do not require it
  * Any required context must be passed into the utility method

## ACS AEM Commons Utils List

<dl>
	<dt><code>CookieUtil</code></dt>
	<dd>Creation, deletion and modification of <span class="caps">HTTP</span> Cookies</dd>
	<dt><code>OsgiPropertyUtil</code></dt>
	<dd>Parsing OSGi component property String values into “complex” data structures (usually Maps or Key/Value pairs)</dd>
	<dt><code>PathInfoUtil</code></dt>
	<dd>Getting values from a <span class="caps">HTTP</span> Request’s Path and Query Params</dd>
	<dt><code>ResourceDataUtil</code></dt>
	<dd><p>Gets less-common data renditions from Resources including:</p>
<ul>
	<li>Getting the rendition of a resource as a <code>String</code></li>
	<li>Getting a <code>InputStream</code> representation of a <code>nt:file</code></li>
	<li>Getting a <code>String</code> representation of a <code>nt:file</code></li></ul></dd>
	<dt><code>TemplateUtil</code></dt>
	<dd>Utility methods for working with CQ Templates.</dd>
	<dt><code>TextUtil</code></dt>
	<dd>Gets default values, non-blank values. See also <a href="https://helpx.adobe.com/experience-manager/6-5/sites/developing/using/reference-materials/javadoc/com/day/text/TextUtils.html" target="_blank">CQ TextUtils</a> and <a href="http://commons.apache.org/proper/commons-lang/apidocs/org/apache/commons/lang3/StringUtils.html" target="_blank">Apache Commons StringUtils</a>.</dd>
	<dt><code>TypeUtil</code></dt>
	<dd>Intelligently determines Java object types and converts between types (including "unusual" transformations like Array to Map)</dd>
	<dt><code>ThreadContextClassLoaderTaskExecutor</code> (since 1.5.0)</dt>
	<dd>Execute a task (using the <code>Callabale</code> interface) after setting the Thread Context ClassLoader, and then resetting it upon completion of the task.</dd>
</dl>

---
layout: acs-aem-commons_feature
title: XSS JSP Functions
description: JSP Taglib for XSS Protection
date: 2013-12-11
tags: deprecated
feature-tags: component-dev standard
initial-release: 1.3.0
---

## Why is the deprecated?

Since AEM 6.0, you should be developing using HTL which auto-XSS protects. Manually using the XSS APIs is a deprecated approach to presentation layer development. 


## Purpose

Provide simple JSP EL functions for XSS protection using the [XSSAPI](http://dev.day.com/docs/en/cq/current/javadoc/com/adobe/granite/xss/XSSAPI.html) service provided by AEM.

## Usage

First, add the taglib declaration:

    <%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>

### Functions

* `xss:encodeForHTML(XSSAPI, String)`
* `xss:encodeForHTMLAttr(XSSAPI, String)`
* `xss:encodeForJSString(XSSAPI, String)`
* `xss:filterHTML(XSSAPI, String)`
* `xss:getValidDimension(XSSAPI, String, String)`
* `xss:getValidHref(XSSAPI, String)`
* `xss:getValidInteger(XSSAPI, String, int)`
* `xss:getValidJSToken(XSSAPI, String, String)`


See JavaDoc of [XSSAPI](http://dev.day.com/docs/en/cq/current/javadoc/com/adobe/granite/xss/XSSAPI.html) for more details. Also see the [XSS Cheat Sheet](https://dev.day.com/content/docs/en/cq/current/developing/securitychecklist/_jcr_content/par/download/file.res/xss_cheat_sheet.pdf).

### Example

    <%@include file="/libs/foundation/global.jsp"%><%
    %><%@ taglib prefix="xss" uri="http://www.adobe.com/consulting/acs-aem-commons/xss" %>
    ${xss:encodeForHTMLAttr(xssAPI, 'hi"')}

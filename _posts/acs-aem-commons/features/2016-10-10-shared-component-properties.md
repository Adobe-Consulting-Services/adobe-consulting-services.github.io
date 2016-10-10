---
layout: acs-aem-commons_feature
title: Sitewide Component Properties
description: Configure your components once and apply them globally with the ability to override locally.
date: 2016-06-10
thumbnail: /images/sitewide-component-properties/thumbnail.png
feature-tags: authoring
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 3.1.0
---

## Purpose

Expand AEM functionality to enable any component's configuration property settings to apply globally across all installed component instances. Additionally, any property can be overridden to uniquely apply to a single component instance.

Properties that apply to a single component instance will override any duplicate global property setting.  

## How to Use

Create your `_cq_dialog/dialog.xml` as usual with the properties you want to apply to a particular instance of your component.

Create a `_cq_dialogsitewide/dialog.xml` with the properties you want to apply to _all_ instances of your component. Note that duplicated properties found in `_cq_dialog` will override those found in `_cq_dialogsitewide`.

Call the wcm:defineObjects tag near the top of your component JSP.

### Example

{% highlight xml %}
<%@include file="/libs/foundation/global.jsp"%>
<%@ taglib prefix="wcm" uri="http://www.adobe.com/consulting/acs-aem-commons/wcm" %>
<wcm:defineObjects /><%
%>
...
{% endhighlight %}

With your component added to the Touch UI, configure the local values of your component properties with the wrench icon. Configure the global values of your component properties with the globe icon.


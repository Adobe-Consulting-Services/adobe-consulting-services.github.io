---
layout: acs-aem-commons_feature
title: cqinclude Namespace
description: Use your components as building blocks
date: 2015-05-19
thumbnail: /images/cqinclude-namespace/thumbnail.png
feature-tags: component-dev
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.10.2
---

## Purpose

The `cqinclude` "xtype" allows for modularization and re-use widgets and widget collections. This facilitates an elegant pattern of composition when creating AEM components; Larger components cant be composed of smaller components.

The `cqinclude` xtype is simple in that it pulls the targets widget node structure into the `cqincluding` component for re-use.  This is problematic when a n AEM component is composed of multiple sub-components and each sub-component use the same property names.

For example, a Feature component may be composed of a Title Component, Text Component and Button component. Both the Title component and Button component may store the label value to the property name `./jcr:title`. If both dialogs are combined into the Feature component's dialog via the OOTB `cqinclude`, there will be two fields saving to the same property, resulting in a mutli-value property with no real way to tell which value belongs to which sub-component.


## How to Use

The ACS AEM Commons CQInclude Namespace Servlet allows "prefixing" of property paths to be specified during the `cqinclude`. This servlet is invoked by the addition of the selectors:

	cqinclude.namespace.<namespace>

The include for Title component dialog may look like

	jcr:primaryType=cq:Widget 
	path=/apps/demo/components/title/dialog/items/tab.cqinclude.namespace.title.json 
	xtype=cqinclude

The include for Button component dialog may look like

	jcr:primaryType=cq:Widget
	path=/apps/acme/components/button/dialog/items/tab.cqinclude.namespace.button.json
	xtype=cqinclude

The dialog would then read/save the jcr:title from the respective includes as follows

	./title/jcr:title
	./button/jcr:title

cleanly separating the two.


## Example 

Feature component dialog; This namespace cqincludes dialogs from 3 other components.

{% highlight xml %}

<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
	    jcr:primaryType="cq:Dialog"
	    activeTab="0"
	    title="Featured Component"
	    xtype="tabpanel">
    <items jcr:primaryType="cq:WidgetCollection">
        <title-tab
		jcr:primaryType="cq:Widget"
		title="Title Tab"
		path="/apps/demo/components/title/dialog/tab.cqinclude.namespace.title.json"
		xtype="cqinclude"/>
        <text-tab
		jcr:primaryType="cq:Widget"
		title="Text Tab"
		path="/apps/demo/components/text/dialog/tab.cqinclude.namespace.text.json"
		xtype="cqinclude"/>
        <button-tab
		jcr:primaryType="cq:Widget"
		title="Button Tab"
		path="/apps/demo/components/button/dialog/tab.cqinclude.namespace.button.json"
		xtype="cqinclude"/>
	</items>
</jcr:root>

{% endhighlight %}


Feature component JSP; This includes other components; note youll want to ensure that these components do not have the Edit chrome drawn around them as this config has been moved to the Feature component's dialog. This can be done by forcing the same context or setting no decoration.

{% highlight jsp %}
<div class="feature-box">
	<% IncludeOptions.getOptions(slingRequest, true).forceSameContext(true); %>
	<cq:include path="title" resourceType="demo/components/title"/>

	<% IncludeOptions.getOptions(slingRequest, true).forceSameContext(true); %>
	<cq:include path="text" resourceType="demo/components/text"/>

	<div class="call-to-action">
		<% IncludeOptions.getOptions(slingRequest, true).forceSameContext(true); %>
		<cq:include path="button" resourceType="demo/components/button"/>	
	</div>
</div>
{% endhighlight %}




---
layout: acs-aem-commons_feature
title: Parameterized Namespace Granite Include
description: Include granite dialog snippets with parameters and / or a namespace, so you can reuse them better
date: 2020-03-08
redirect_from: /acs-aem-commons/features/granite.html
feature-tags: backend-dev, new, dialog, granite, coral
tags: new
initial-release: 4.5.0
---

## Purpose

The parameterized namespace include (acs-commons/granite/ui/components/include) can include dialog snippets with a namespace and or parameters.

The namespace mechanism is similar to the following [following deprecated feature](../../deprecated/cqinclude-namespace/index.html).

This allows you to reuse a dialog snippet multiple times in a dialog.

The parameters mechanism allows you to define parameters in your dialog snippets in the values.
For example the fieldLabel. You can define a default value, but override the default value when including the snippet.


## Examples

* [Namespacing](subpages/namespace-example.html): Simple but full example for demonstrating the namespacing with a dialog, Sling Model and HTL 

* [Parameters](subpages/parameter-example.html): Example of parameters used to include a snippet

## Configuration

The namespaced properties can be configured using the OSGI configuration. 
This allows you define extra properties to be automatically namespaced.
By default the values are name, fileNameParameter and fileReferenceParameter.

So if we need to have 'myCustomProperty' namespaced:


com.adobe.acs.commons.granite.ui.components.impl.include.NamespacedTransformedResourceProviderImpl.xml
{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    properties="[name,fileNameParameter,fileReferenceParameter,myCustomProperty]"
    jcr:primaryType="sling:OsgiConfig"/>
{% endhighlight %}
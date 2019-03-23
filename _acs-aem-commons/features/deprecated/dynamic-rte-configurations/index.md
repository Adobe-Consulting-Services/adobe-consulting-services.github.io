---
layout: acs-aem-commons_feature
title: Dynamic RTE Configuration
description: Create a re-usable RTE configurations
redirect_from: /acs-aem-commons/features/dynamic-rte-configurations.html
date: 2013-08-30
tags: deprecated
initial-release: 1.0.0
---

## Why is this deprecated?

Since 6.2, ClassicUI dialog development should be avoided. Since this is in direct support of the ClassicUI RTE widget, this feature is now deprecated.  

## Purpose

A common challenge we run into on complex projects is where multiple business units within a company want to use the
same component, but with different rich text editor configurations. For example, let's say you have a simple text component used on two sites:

* SiteA - `/content/sitea`
* SiteB - `/content/siteb`

On SiteA, the text component should include the default plugins. On SiteB, the same component has the default plugins **plus** the special characters plugin.

Using dynamic RTE configuration, this can be done without creating extra components. This also allows for the easy sharing of RTE configurations within a site. If `/apps/myco/components/content/text` and `/apps/myco/components/content/other-text` need to share the same RTE configuration, that can be easily done by using a named configuration. This is *even* true if `text` and `other-text` use different property names, something that is very challenging with `cqinclude`.

## How to Uses

{% include acs-aem-commons/wrapper-client-library.html path='/apps/acs-commons/rte-plugins/dialog-plugin/.content.xml#L12-L18'  %}

* Create a node structure under `/etc/rteconfig`. Each node directly under `/etc/rteconfig` defines a set of configurations, most commonly associated with a site. For the example above, you would have `/etc/rteconfig/sitea` and `/etc/rteconfig/siteb`.
* On these site nodes, set a `pattern` property with a regex defining when the rules within that node are applied, e.g. `/etc/rteconfig/sitea` would have a `pattern` of `/content/sitea/.*`
* Within the site nodes, create a node for each RTE configuration for that site. There is a special configuration name `default` which will be the default name.

{% highlight json %}
{
    "sitea" : {
        "pattern" : "/content/sitea/.*",
        "default" : {
            "includeDefault" : true
        }
    },
    "siteb" : {
        "pattern" : "/content/siteb/.*",
        "default" : {
            "includeDefault" : true,
            "misctools" : {
                "features": [ "specialchars" ]
            }
        }
    }
}
{% endhighlight %}

* In your component, instead of an `richtext` widget, use the xtype `slingscriptinclude` and the script name `rte.<config-name>.<field-name>.json.jsp`. If the config name is not specified, "default" is used. If the field name is not specified, then "text" is used.

> NOTE: When the `includeDefault` property is set to `true`, the configuration is layered on top of `/libs/foundation/components/text/dialog/items/tab1/items/text/rtePlugins`.

### Widget Customization (Since 1.2.2)

The Rich Text widgets provided by this configuration mechanism are, by default, very plain. Other than `rtePlugins`, only the following configuration options are set:

* `width` - set to 430
* `height` - set to 316
* `hideLabel` - set to true

If you want to alter the configuration, this is done through passing query parameters. However, due to the way the `slingscriptinclude` xtype works, you need to add an extension *after* the query parameter. If a `fieldLabel` parameter is passed, the `hideLabel` option will be automatically removed. See examples below.

### Examples

#### To load the "press" configuration:

{% highlight json %}
{
    "jcr:primaryType" : "cq:Widget",
    "xtype" : "slingscriptinclude",
    "script" : "rte.press.json.jsp"
}
{% endhighlight %}

#### To load the "default" configuration for a field named "text2"

{% highlight json %}
{
    "jcr:primaryType" : "cq:Widget",
    "xtype" : "slingscriptinclude",
    "script" : "rte.default.text2.json.jsp"
}
{% endhighlight %}

#### To load the "default" configuration for a field named "text" with a field label "Text"

{% highlight json %}
{
    "jcr:primaryType" : "cq:Widget",
    "xtype" : "slingscriptinclude",
    "script" : "rte.default.text.json?fieldLabel=Text.jsp"
}
{% endhighlight %}


#### To load the "default" configuration for a field named "text" with a custom stylesheet.

{% highlight json %}
{
    "jcr:primaryType" : "cq:Widget",
    "xtype" : "slingscriptinclude",
    "script" : "rte.default.text.json?externalStyleSheets=/etc/clientlibs/myco/source/mine.css.jsp"
}
{% endhighlight %}

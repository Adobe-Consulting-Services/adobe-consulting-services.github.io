---
layout: acs-aem-commons_feature
title: WCMMode Tags & Functions
description: JSP Taglib for working with WCM Mode
date: 2013-08-20
thumbnail: /images/wcmmode/thumbnail.png
feature-tags: component-dev standard
tags: acs-aem-commons-features
categories: acs-aem-commons features
initial-release: 1.0.0
---


## Purpose

Provide simple JSP custom tags and EL functions for determining the [WCMMode](http://dev.day.com/docs/en/cq/current/javadoc/com/day/cq/wcm/api/WCMMode.html).

## Usage

First, add the taglib declaration:

    <%@ taglib prefix="wcmmode" uri="http://www.adobe.com/consulting/acs-aem-commons/wcmmode" %>

### Tags

JSP tags available are:

* `<wcmmode:edit>`
* `<wcmmode:design>`
* `<wcmmode:preview>`
* `<wcmmode:disabled>`

In each case, the body of the tag will be evaluated if the current WCMMode matches the tag name, e.g.

{% highlight jsp %}
<wcmmode:edit>
This will be output in EDIT mode.
</wcmmode:edit>
{% endhighlight %}

Each tag also takes a `not` parameter which can be used to invert the logic, e.g.

{% highlight jsp %}
<wcmmode:edit not="true">
This will be output in everything except EDIT mode.
</wcmmode:edit>
{% endhighlight %}

### Functions

EL Functions available are:

* `wcmmode:isEdit(pageContext)`
* `wcmmode:isDesign(pageContext)`
* `wcmmode:isPreview(pageContext)`
* `wcmmode:isDisabled(pageContext)`

These would typically be used in a `<c:if>` tag, e.g.

{% highlight jsp %}
<c:if test="${empty properties['title'] && wcmmode:isEdit(pageContext)}">
    You probably want to populate the title in the dialog.
</c:if>
{% endhighlight %}

### Switching between Edit and Preview modes

By default AEM does not reload content when an author switches between Edit and Preview modes.  Since `wcmmode`
tags execute server-side, this means they are calculated using the mode the page was originally
loaded as.  For example, if an author loads a page in Edit mode, and then switches to Preview mode,
all content wrapped in `<wcmmode:edit>` will still display since the page was loaded originally in Edit mode.

In order for `wcmmode` tags to work correctly as the author switches between Edit and Preview mode without requiring
the author to manually refresh the browser page, you can add an authoring client library with category
`cq.authoring.editor.hook` that automatically refreshes the content behind the scenes as the author switches.

{% highlight js %}
(function ($, ns) {
    $(document).on('cq-layer-activated', function (event) {
        // Reload the content frame when switching between authoring modes, so that
        // functionality based on whether the user is Editing or Previewing works
        // correctly w/o having to manually refresh the page.
        if (event.prevLayer && event.layer !== event.prevLayer) {
            if (event.prevLayer !== 'Annotate' && event.layer !== 'Annotate') {
                ns.ContentFrame.reload();
            }
        }
    });
})(jQuery, Granite.author);
{% endhighlight %}

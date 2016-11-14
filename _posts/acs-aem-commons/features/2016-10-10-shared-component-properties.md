---
layout: acs-aem-commons_feature
title: Shared Component Properties
description: Configure components with properties shared across pages.
date: 2016-10-10
thumbnail: /images/shared-component-properties/thumbnail.png
feature-tags: authoring component-dev
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 2.8.0
---

## Purpose

Extend AEM functionality to allow components to be configured with shared content and properties that apply across all
instances of that component (or in some cases multiple components) on an entire site. 

### Features of Shared Component Properties:
- Component-specific "shared" properties can be configured for any component by adding a new "shared properties" dialog
- Component-agnostic "global" properties can be configured for any component by adding a new "global properties" dialog
- Authors can be allowed to override "global" and/or "shared" property values with "local" values.
    - e.g. A component can share content for 10 instances on a site, but still allow an 11th instance to have
  unique content
- Dialogs for "shared" and "global" properties are configured exactly like the OOTB component properties dialog,
meaning:
    - 100% dialog feature parity
    - No new learning required for implementation
- No alteration of existing functionality - instance-level component properties and dialogs are unaffected
- Supports both Touch UI and Classic UI


### Problem Being Solved:
Instances of the same AEM component are generally authored individually, leading to:

- Excessive copy and paste (error-prone)
- Labor-intensive and unmanageable content changes
- No reuse of content and properties without custom implementation

The AEM OOTB Reference component solves some cases, but

- It is an all or nothing deal - a Reference is an _exact_ copy of the referenced component
    - i.e. You cannot share a title or background image via a Reference if you want the body copy to differ
- Authors must track down the single "real" version of a component to make changes to it
- If not used carefully, Reference components can create a nasty spiderweb of content references across a site


## How to Use

### <a name="activation"></a>Activation

To enable Shared Component Properties, you must do the following:

1. *Enable the Shared Component Properties OSGi service.
1. *Add client libraries to include the new authoring options.
1. Specify a "page root path" pattern via OSGi config for `com.adobe.acs.commons.wcm.impl.PageRootProviderImpl`
1. Add `SharedComponentPropertiesPageInfoProvider` as an info provider for your page component

\* The first two steps can be accomplished by installing the 
[activation package](/acs-aem-commons/packages/shared-component-properties/shared-component-props-activate-1.0.zip),
which deploys configs to `/apps/shared-component-properties` and client libraries to
`/etc/clientlibs/shared-component-properties`.

#### <a name="activation-enable-service"></a>**1. Enabling the Shared Component Properties OSGi Service**
This is done via the Felix console or by deploying a blank OSGi configuration file from your project deployment.

`/apps/mysite/config.author/com.adobe.acs.commons.wcm.properties.shared.impl.SharedComponentPropertiesImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
  jcr:primaryType="sling:OsgiConfig"/>
{% endhighlight %}

#### <a name="activation-add-clientlibs"></a>**2. Adding the Client Libraries for Authoring**
The client libraries required for authoring Shared Component Properties are deployed via ACS AEM Commons, but disabled
by default.  To include these client libraries, you must create a new client library for the Touch UI and/or a new
client library for the Classic UI.  These libraries simply embed the real libraries from ACS AEM Commons, and must
include a (blank) js.txt file to trigger the JavaScript include.

Touch UI client library definition:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:ClientLibraryFolder"
    categories="cq.authoring.editor"
    embed="[acs-commons.shared-component-properties]"/>
{% endhighlight %}

Classic UI client library definition:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:ClientLibraryFolder"
    categories="cq.widgets"
    embed="[acs-commons.shared-component-properties.classic]"/>
{% endhighlight %}

#### <a name="activation-page-root"></a>**3. Specifying the Page Root Path**
Shared and global properties are stored under your site's root page (i.e. home page). As such, the feature requires you
to specify a path (regexp patterns supported) to your site's root page.

Example OSGI deployment pointed at the Geometrixx home page (/content/geometrixx/en):

`/apps/mysite/config.author/com.adobe.acs.commons.wcm.impl.PageRootProviderImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
  jcr:primaryType="sling:OsgiConfig"
  page.root.path="[/content/geometrixx/[a-z]{2}]"/>
{% endhighlight %}

#### <a name="activation-page-info-provider"></a>**4. Adding the Page Info Provider to your Page Component**
Page info providers are documented by AEM @ <https://docs.adobe.com/docs/en/aem/6-1/develop/components/pageinfo.html>.
Assuming your page component has a resourceSuperType of `foundation/components/page`, the simplest way to do this is to:

1. Go into CRXDE
1. Copy the node at `/libs/foundation/components/page/cq:infoProviders`
1. Paste the node (with its children) into your page component
1. Add a `nt:unstructured` node named `sharedComponentProps` under `/apps/(your page component)/cq:infoProviders`
1. Add a `className` property to the `sharedComponentProps` node with String value
`com.adobe.acs.commons.wcm.properties.shared.impl.SharedComponentPropertiesPageInfoProvider`
1. Restart AEM to ensure this change takes effect


### Adding Shared (Component-Specific) Properties
For any component, add a `dialogshared` (Touch UI) or `dialog_shared.xml` (Classic UI) dialog node similar to the
standard `cq:dialog` (Touch UI) or `dialog.xml` (Classic UI) dialog nodes.

Using the Touch UI, authors can launch the new shared properties dialog for this component by clicking
"Configure Shared Properties" (layers icon) to the right of "Configure" (wrench icon).
![Configure Shared Properties](/acs-aem-commons/images/shared-component-properties/edit-shared-properties.png)

Using the Classic UI, authors can launch the new shared properties dialog for this component by clicking "Edit
Shared".

Shared properties can be accessed from a component's JSP files by accessing `${bindings.sharedProperties}`. As an added
convenience, the `<wcm:defineObjects/>` tag can be used to make `${sharedProperties}` directly accessible.


### Adding Global (Component-Agnostic) Properties
For any component, add a `dialogglobal` (Touch UI) or `dialog_global.xml` (Classic UI) dialog node similar to the
standard `cq:dialog` (Touch UI) or `dialog.xml` (Classic UI) dialog nodes.

Using the Touch UI, authors can launch the new global properties dialog for this component by clicking
"Configure Global Properties" (globe icon) to the right of "Configure Shared Properties" (share icon).
![Configure Global Properties](/acs-aem-commons/images/shared-component-properties/edit-global-properties.png)

Using the Classic UI, authors can launch the new global properties dialog for this component by clicking "Edit Global".

Global properties can be accessed from a component's JSP files by accessing `${bindings.globalProperties}`. As an added
convenience, the `<wcm:defineObjects/>` tag can be used to make `${globalProperties}` directly accessible.


### Enable Property Overrides
Because a component's global, shared, and local (standard OOTB) properties are all saved to different locations in the
JCR, they can all safely reuse the same property names without fear of losing data. This also allows for functionality
where a shared value (when specified) can override a global value, and a local value (when specified) can override both
a shared and a global value.

To implement property value overrides, simply use the same property name at multiple levels (global, shared, local). In
a component's JSP file, a map of all properties with overrides correctly applied can be accessed via
`${bindings.mergedProperties}`. As an added convenience, the `<wcm:defineObjects/>` tag can be used to make
`${mergedProperties}` directly accessible.


### <a name="example"></a>Example
[Download the example package](/acs-aem-commons/packages/shared-component-properties/shared-component-props-example-1.0.zip)
and install using CRX Package Manager. This will add a new "Shared Component Properties Example" component at
`/apps/shared-component-properties-example/components/content/shared-component-props-example`. This component demonstrates shared and
global property dialogs for both the Touch UI and Classic UI, including property overrides.

NOTE: You will still need to follow the
[Activation]({{ site.data.acs-aem-commons.baseurl }}/features/shared-component-properties.html#activation)
steps above to enable Shared Component Properties on your AEM server.


## Permissions
In order for an author to see the options to configure shared and global properties, the author must have `write`
permissions to the root page (i.e. home page) of the site. This is where shared/global properties for a site are stored.


## <a name="permissions"></a>Troubleshooting
If you are having trouble getting AEM to show the authoring options for shared and global property dialogs, first
start by installing the
[Example]({{ site.data.acs-aem-commons.baseurl }}/features/shared-component-properties.html#example)
component and checking that you are able to see the options for opening the
shared and global dialogs for the "Shared Component Properties Example" component. If so, check for differences between
the dialogs on the example component and your custom component. If not, try logging in as the `admin` user (if you
aren't already) to ensure it is not an issue with
[Permissions]({{ site.data.acs-aem-commons.baseurl }}/features/shared-component-properties.html#permissions).
After ruling out permissions as the culprit, an issue with the
[Activation]({{ site.data.acs-aem-commons.baseurl }}/features/shared-component-properties.html#activation)
steps above is almost certainly the problem.

To debug an issue with Activation, first verify that you have successfully enabled the
"ACS AEM Commons - Shared Component Properties" OSGi service by checking the Felix console at
`http://localhost:4502/system/console/configMgr` - there should be a checkmark showing that the service is active.
If not, check that you have correctly deployed the config file from
[Enabling the Shared Component Properties OSGi Service]({{ site.data.acs-aem-commons.baseurl }}/features/shared-component-properties.html#activation-enable-service)
or take the shortcut by installing the provided
[activation package](/acs-aem-commons/packages/shared-component-properties/shared-component-props-activate-1.0.zip).

After verifying that the Shared Component Properties service is active, the next step is to check that the
Page Info Provider has been correctly added to your page component. To do this, go to
<http://localhost:4502/libs/wcm/core/content/pageinfo.json?path=(full path to your current page)> and search the
resulting JSON for `sharedComponentProperties`. If this element is present, your Page Info Provider is configured
correctly. If not, repeat the steps under
[Adding the Page Info Provider to your Page Component]({{ site.data.acs-aem-commons.baseurl }}/features/shared-component-properties.html#activation-page-info-provider)
extremely carefully, including the step to restart your AEM server. Once the Page Info Provider is configured correctly,
the JSON returned from the pageinfo.json URL will contain a `sharedComponentProperties` field.

If the Page Info Provider is confirmed to be configured correctly but you are still not seeing the authoring options to
open the shared or global properties for the example component, check the `enabled` value under
`sharedComponentProperties` in the pageinfo.json mentioned above.  If `enabled: false` then AEM is unable to find the
root page for the page being viewed.  To resolve this issue, verify the
[Page Root Path]({{ site.data.acs-aem-commons.baseurl }}/features/shared-component-properties.html#activation-page-root)
configuration. Start by checking that your OSGi configuration has been successfully deployed by going to
`http://localhost:4502/system/console/configMgr/com.adobe.acs.commons.wcm.impl.PageRootProviderImpl`. The
`page root path` should reflect the path that you have configured. If it does, then the next thing to check is that the
page you are authoring on matches the pattern of the page root path. For example, a page root path of 
`/content/mysite/[a-z]{2}` will not work if you are authoring on `/content/othersite/en/mypage` since the system is
unable to use the non-matching page root path to determine the root page. In a case where you need to support multiple
content roots, the OSGi configuration allows for a list of page root paths. Alternatively, a more complex page root path
pattern such as `/content/(mysite|othersite)/[a-z]{2}` can also be used.

If you are still not seeing the authoring options for shared or global properties for the example component after
verifying that pageinfo.json has `enabled: true` for `sharedComponentProperties`, the authoring client library for your
current authoring UI (classic or touch) has not been successfully included.  See the 
[Adding the Client Libraries for Authoring]({{ site.data.acs-aem-commons.baseurl }}/features/shared-component-properties.html#activation-add-clientlibs)
section above for details, or try installing the provided
[activation package](/acs-aem-commons/packages/shared-component-properties/shared-component-props-activate-1.0.zip).

If all else fails, try upping the log level of the following classes to DEBUG:

- `com.adobe.acs.commons.wcm.impl.PageRootProviderImpl`
- `com.adobe.acs.commons.wcm.properties.shared.impl.SharedComponentPropertiesBindingsValuesProvider`
- `com.adobe.acs.commons.wcm.properties.shared.impl.SharedComponentPropertiesPageInfoProvider`
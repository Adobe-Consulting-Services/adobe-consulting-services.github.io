---
layout: acs-aem-commons_subpage
title:  Parameterized Namespace Granite Include - Namespace Example
---

[<< back to Parameterized Namespace Granite Include index](../index.html)

## NameSpacing Example

As example we would like to include the [Image Core Component](https://docs.adobe.com/content/help/en/experience-manager-core-components/using/components/image.html) two times in our component and display it in HTL.
For this we will need to create a dialog, sling model and HTL. We'd like to avoid as much copy paste as possible and keep our feet DRY.
The following snippets show you how to do this leveraging this feature.


### Dialog

For the dialogs, we will need to include part of the core component's image dialog in our own dialog.

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
          xmlns:nt="http://www.jcp.org/jcr/nt/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:granite="http://www.adobe.com/jcr/granite/1.0"
    jcr:primaryType="nt:unstructured"
    jcr:title="Image"
    sling:resourceType="cq/gui/components/authoring/dialog"
    extraClientlibs="[core.wcm.components.image.v2.editor]"
    helpPath="https://www.adobe.com/go/aem_cmp_image_v2"
    trackingFeature="core-components:image:v2">
    <content
        jcr:primaryType="nt:unstructured"
        sling:resourceType="granite/ui/components/coral/foundation/container"
        granite:class="cmp-image__editor">
        <items jcr:primaryType="nt:unstructured">
            <tabs
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/coral/foundation/tabs"
                maximized="{Boolean}true">
                <items jcr:primaryType="nt:unstructured">
                    <asset-loggedin
                      jcr:primaryType="nt:unstructured"
                      jcr:title="Asset - Logged in"
                      sling:resourceType="acs-commons/granite/ui/components/include"
                      path="/apps/core/wcm/components/image/v2/image/cq:dialog/content/items/tabs/items/asset"
                      namespace="loggedInImage"
                      margin="{Boolean}true"/>
                    <asset-loggedout
                      jcr:primaryType="nt:unstructured"
                      jcr:title="Asset - Logged Out"
                      sling:resourceType="acs-commons/granite/ui/components/include"
                      path="/apps/core/wcm/components/image/v2/image/cq:dialog/content/items/tabs/items/asset"
                      namespace="loggedOutImage"
                      margin="{Boolean}true"/>
                    <metadata-loggedin
                      jcr:primaryType="nt:unstructured"
                      jcr:title="MetaData - Logged in"
                      sling:resourceType="acs-commons/granite/ui/components/include"
                      path="/apps/core/wcm/components/image/v2/image/cq:dialog/content/items/tabs/items/metadata"
                      namespace="loggedInImage"
                      margin="{Boolean}true"/>
                    <metadata-loggedout
                      jcr:primaryType="nt:unstructured"
                      jcr:title="MetaData - Logged Out"
                      sling:resourceType="acs-commons/granite/ui/components/include"
                      path="/apps/core/wcm/components/image/v2/image/cq:dialog/content/items/tabs/items/metadata"
                      namespace="loggedOutImage"
                      margin="{Boolean}true"/>
                 </items>
            </tabs>
        </items>
    </content>
</jcr:root>
{% endhighlight %}
                                
### CQ Template node

In order for the resource type core/wcm/components/image/v2/image to be added to the child node, we need to define the cq:template node under the component.
You can do this by creating a folder _cq_template with a .content.xml in that folder.
Put in the following contents:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0" xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          jcr:primaryType="nt:unstructured">
    <loggedInImage
            sling:resourceType="core/wcm/components/image/v2/image"
            jcr:primaryType="nt:unstructured"
    />
    <loggedOutImage
            sling:resourceType="core/wcm/components/image/v2/image"
            jcr:primaryType="nt:unstructured"
    />
</jcr:root>                                          
{% endhighlight %}              


### Sling Model

We would like to include the core component Image two times in our sling model.
Once for displaying a default image and a different image when you are logged in. 
These will be defined by the author

For our example we will use  [@ChildResourceFromRequest](../../sling-model-injectors/child-resource-from-request/index.html) because the target model (Image) adapts from SlingHttpRequest only.
If you can adapt from Resource, you should use the [@ChildResource](https://sling.apache.org/apidocs/sling8/org/apache/sling/models/annotations/injectorspecific/ChildResource.html) annotation from Sling Models.

{% highlight java %}
@Model(adaptables = { SlingHttpServletRequest.class })
public class WelcomeMessage {

    @ChildResourceFromRequest
    private Image loggedInImage;
    
    @ChildResourceFromRequest
    private Image loggedOutImage;

    private boolean isLoggedIn;
    
    @PostConstruct
    public void init(){
        //compute isLoggedIn somehow
    }

    public Image getImage() {
        return isLoggedIn ? loggedInImage : loggedOutImage;
    }
} 
{% endhighlight %}

### HTL

And in our HTL we can simply output our source using the javabean approach.

{% highlight html %}

<div sly-data-sly-use.welcome="${'com.acs.components.WelcomeMessage'}">
    <img src="${welcome.image.src>"/>
</div>
{% endhighlight %}
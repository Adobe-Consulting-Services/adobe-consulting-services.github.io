---
layout: acs-aem-commons_subpage
title:  Parameterized Namespace Granite Include - Parameterized Snippet Example
---

[<< back to Parameterized Namespace Granite Include index](../index.html)

## Parameters Example

Using the parameters mechanism in our include component, you can write snippets that can be reused by multiple components that could not be used before.

It allows you to customize various values per include, such as a fieldLabel, fieldDescription, whether to show or hide a field or not, to give it default values etc. 


### Syntax 

The way it works is that in a property value (not a property key!) in the dialog XML  you put the following expression:

{% raw %}
<figure class="highlight"><pre><code class="language-xml" data-lang="xml">${{(OptionalTypeCast)parameterKey(:OptionalDefaultValue}}</code></pre></figure>
{% endraw %}

So at minimum you will need:

{% raw %}
<figure class="highlight"><pre><code class="language-xml" data-lang="xml">${{parameterKey}}</code></pre></figure>
{% endraw %}


When you want to typecast that value to a Boolean:

{% raw %}
<figure class="highlight"><pre><code class="language-xml" data-lang="xml">${{(Boolean)parameterKey}}</code></pre></figure>
{% endraw %}

And if you also would live to give it a default value of true:

{% raw %}
<figure class="highlight"><pre><code class="language-xml" data-lang="xml">${{(Boolean)parameterKey:true}}</code></pre></figure>
{% endraw %}

### The example

Enough talk, now for the actual example. 
We will define 1 dialog snippet. The snippet will have a simple title and description.
But some stuff will be customize-able on a include basis.
The snippet will be created under: /apps/path/to/block.xml

{% raw %}

<figure class="highlight"><pre><code class="language-xml" data-lang="xml"><span class="cp">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</span>
<span class="nt">&lt;jcr:root</span> <span class="na">xmlns:sling=</span><span class="s">"http://sling.apache.org/jcr/sling/1.0"</span>
          <span class="na">xmlns:jcr=</span><span class="s">"http://www.jcp.org/jcr/1.0"</span> <span class="na">xmlns:nt=</span><span class="s">"http://www.jcp.org/jcr/nt/1.0"</span>
          <span class="na">jcr:primaryType=</span><span class="s">"nt:unstructured"</span>
          <span class="na">sling:resourceType=</span><span class="s">"granite/ui/components/foundation/section"</span><span class="nt">&gt;</span>
    <span class="nt">&lt;layout</span>
            <span class="na">jcr:primaryType=</span><span class="s">"nt:unstructured"</span>
            <span class="na">sling:resourceType=</span><span class="s">"granite/ui/components/foundation/layouts/fixedcolumns"</span>
            <span class="na">margin=</span><span class="s">"{Boolean}false"</span><span class="nt">/&gt;</span>
    <span class="nt">&lt;items</span> <span class="na">jcr:primaryType=</span><span class="s">"nt:unstructured"</span><span class="nt">&gt;</span>
        <span class="nt">&lt;column</span>
                <span class="na">jcr:primaryType=</span><span class="s">"nt:unstructured"</span>
                <span class="na">sling:resourceType=</span><span class="s">"granite/ui/components/foundation/container"</span><span class="nt">&gt;</span>
            <span class="nt">&lt;items</span> <span class="na">jcr:primaryType=</span><span class="s">"nt:unstructured"</span><span class="nt">&gt;</span>
                <span class="nt">&lt;title</span>
                        <span class="na">jcr:primaryType=</span><span class="s">"nt:unstructured"</span>
                        <span class="na">sling:resourceType=</span><span class="s">"granite/ui/components/coral/foundation/form/textfield"</span>
                        <span class="na">fieldLabel=</span><span class="s">"${{blockTitle}} title"</span>
                        <span class="na">fieldDescription=</span><span class="s">"The title of ${{blockTitle}}"</span>
                        <span class="na">name=</span><span class="s">"./title"</span><span class="nt">/&gt;</span>
                <span class="nt">&lt;description</span>
                        <span class="na">jcr:primaryType=</span><span class="s">"nt:unstructured"</span>
                        <span class="na">sling:resourceType=</span><span class="s">"granite/ui/components/coral/foundation/form/textfield"</span>
                        <span class="na">name=</span><span class="s">"./description"</span>
                        <span class="na">fieldLabel=</span><span class="s">"${{blockTitle}} description"</span>
                        <span class="na">fieldDescription=</span><span class="s">"The description of ${{blockTitle}}"</span>
                        <span class="na">maxlength=</span><span class="s">"${{(Long)descriptionMaxLength}}"</span>
                        <span class="na">required=</span><span class="s">"${{(Boolean)descriptionIsRequired:false}}"</span>
                <span class="nt">/&gt;</span>
                <span class="nt">&lt;extra</span>
                        <span class="na">jcr:primaryType=</span><span class="s">"nt:unstructured"</span>
                        <span class="na">sling:resourceType=</span><span class="s">"granite/ui/components/coral/foundation/form/textfield"</span>
                        <span class="na">name=</span><span class="s">"./extraInformation"</span>
                        <span class="na">hide=</span><span class="s">"${{hideExtra:false}}"</span>
                        <span class="na">fieldLabel=</span><span class="s">"Extra information of ${{blockTitle}}"</span>
                <span class="nt">/&gt;</span>
            <span class="nt">&lt;/items&gt;</span>
        <span class="nt">&lt;/column&gt;</span>
    <span class="nt">&lt;/items&gt;</span>

<span class="nt">&lt;/jcr:root&gt;</span></code></pre></figure>

{% endraw %}

Then we will define the actual dialog that will include the main snippet:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
          xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
          jcr:primaryType="nt:unstructured"
          jcr:title="My Component Demo"
          sling:resourceType="cq/gui/components/authoring/dialog">
    <content
            jcr:primaryType="nt:unstructured"
            sling:resourceType="granite/ui/components/foundation/container">
        <layout
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/layouts/tabs"
                type="nav"/>
        <items jcr:primaryType="nt:unstructured">
            <block1
                    jcr:primaryType="nt:unstructured"
                    jcr:title="Block 1"
                    sling:resourceType="acs-commons/granite/ui/components/include"
                    path="/apps/path/to/block"
                    namespace="block1"
                    margin="{Boolean}true">
                <parameters
                        jcr:primaryType="nt:unstructured"
                        blockTitle="Block1"
                        descriptionIsRequired="{Boolean}true"
                />
            </block1>
            <block2
                    jcr:primaryType="nt:unstructured"
                    jcr:title="Block 2"
                    sling:resourceType="acs-commons/granite/ui/components/include"
                    path="/apps/path/to/block"
                    namespace="block2"
                    margin="{Boolean}true">
                <parameters
                        jcr:primaryType="nt:unstructured"
                        blockTitle="Block2"
                        hideExtra="{Boolean}true"
                        descriptionMaxLength="{Long}15"
                />
            </block2>
        </items>
    </content>
</jcr:root>
{% endhighlight %} 

The result is the following dialog:

First tab (block1)
![image](../images/dialog-tab-block1.png)
As you can see, the titles / descriptions adjust according to the parameters.

Second tab (block2)
![image](../images/dialog-tab-block2.png)
As you can see the extra field is hidden here.

If you save the dialog this is the result in CRX:
![image](../images/crx-nodes.png)
![image](../images/crx-values.png)


## Possible Typecasts 

Currently the possible typecasts are : Boolean, Long, Double, String.

The input here is case insensitive. 

More typecasts may be added in the future.
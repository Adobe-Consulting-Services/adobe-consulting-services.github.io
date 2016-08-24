---
layout: acs-aem-commons_feature
title: Named Transform Image Servlet
description: Consistently resize, crop and transform images
date: 2014-09-18
thumbnail: /images/named-image-transform/thumbnail.png
feature-tags: component-dev
tags: acs-aem-commons-features
categories: acs-aem-commons features
initial-release: 1.5.0
---

## Purpose

Many web site designs demands consistency of images based on their use within components. For example, a panoramic spotlight may demand the image be 960 x 400, and bio picture must be 100 x 100 and greyscale.

The ACS AEM Commons Named Transform Image Servlet allows specific image transforms to be defined centrally via OSGi configurations. These image transforms can be easily invoked via parameterized HTTP GET requests to image resources in AEM.

## Example

The below DAM Asset image has been resizes, rotated, cropped and greyscaled as defined by the custom defined `my-transform-name` transform rule set.

bc. http://localhost:4502/content/dam/geometrixx/shapes/sq_plan.png.transform/my-transform-name/image.png

![](/acs-aem-commons/images/named-image-transform/my-transform-name-example.png)

( Original image on left. Transformed image on right. )

Supporting OSGi Configuration

![](/acs-aem-commons/images/named-image-transform/my-transform-name-osgi-config.png)

## Supported "image-y" resources

Almost any "image-like" resource can be requested using the named transform URI parameterization, and the underlying image will be derived and rendered using the transformation parameters.

* Pages (`cq:Page`)
  * HTTP GET `/content/acme/article.transform/feature/image.png`

* Image component resources
  * HTTP GET `/content/acme/article/_jcr_content/image.transform/feature/image.png`

* DAM Assets (`dam:Asset`)
  * HTTP GET `/content/dam/images/dog.jpg.transform/feature/image.jpg`

* DAM Asset Renditions
  * HTTP GET `/content/dam/images/dog.jpg/jcr:content/renditions/thumbnail.jpg.transform/feature/image.jpg`

* "Raw" Binary Images (`nt:file` or `nt:resource`)
  * HTTP GET `/etc/designs/acme/images/cat.png.transform/feature/image.jpg`


## How to Use

* Define any number of `sling:OsgiConfig`'s, each representing a different named transform

`/apps/mysite/config/com.adobe.acs.commons.images.impl.NamedImageTransformerImpl-myTransformName.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    name="my-transform"
    transforms="[resize:width=400,rotate:degrees=10]"/>
{% endhighlight %}

* **Order matters** when defining your image transformation rules. For example, a resize then crop can yield significantly different results than a crop then resize.


* Get the URI to a supported resource (see above) to transform
* add the `.transform` extension (append this even if the resource is named with an extension; like a DAM asset)
* Add an initial suffix segment that matches your transform name (Ex. `/my-transform`)
* Add a final suffix segment of `/image.<image-format-extension>` OR `/img.<image-format-extension>`

Resulting in

* `<img src="/content/mysite/article/_jcr_content/image.transform/my-transform/image.png"/>`

or

* `<img src="/content/dam/images/dog.jpg.transform/my-transform/img.png"/>`


### Chained Transformations (Available in v.1.9.0+)

Transforms can be chained by naming a series in the suffix.

* Transform rules on the left are overwritten by those on the right.
* Transform rules order is defined from left to right.

<pre>
<code>
/content/ira.png.transform/hero/small/image.png
</code>
</pre>

Where `hero` is a NamedTransform with ImageTransforms

<pre>
<code>
resize:width=100
greyscale:greyscale=true
</code>
</pre>

and `small` is a NamedTransform w ImageTransforms

<pre>
<code>
resize:width=50
</code>
</pre>

The combined transformation would result in:

<pre>
<code>
resize:width=50
greyscale:greyscale=true
</code>
</pre>

## ACS AEM Commons provided Image Transformers

<div class="section">
<h3>Greyscale</h3>
<p>Converts the image to greyscale.</p>
<p>Name</p>
<ul>
	<li><code>greyscale</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>None</code></li>
</ul>
<p>Example</p>
<ul>
	<li><code>greyscale</code><br>
</li></ul></div>

<div class="section">
<h3>Resize</h3>
<p>Resizes the image to the specified width and/or height.</p>
<p>Name</p>
<ul>
	<li><code>resize</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>width=[width in px]</code></li>
	<li><code>height=[height in px]</code></li>
</ul>
<p>Example</p>
<ul>
	<li><code>resize:width=200</code></li>
	<li><code>resize:height=300</code></li>
	<li><code>resize:width=400&amp;height=400</code><br>
</li></ul></div>

<div class="section">
<h3>Bounded Resize (v1.8.0+)</h3>
<p>Resizes the image but will not resize past maximum dimension constraints. Accepts two Integer params: height and width. Either width or height will scale to the parameterized limit. The other dimension scale automatically to maintain the original aspect ratio. If the original image is smaller than the configured dimensions the image won’t be resized. Upscale param can be set to <code>true</code> to allow upscaling smaller images.</p>
<p>Name</p>
<ul>
	<li><code>bounded-resize</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>width=[width in px]</code></li>
	<li><code>height=[height in px]</code></li>
	<li><code>upscale=true/false</code></li>
</ul>
<p>Example</p>
<ul>
	<li><code>bounded-resize:width=200</code></li>
	<li><code>bounded-resize:height=300</code></li>
	<li><code>bounded-resize:width=400&amp;height=400&amp;upscale=true</code><br>
</li></ul></div>

<div class="section">
<h3>Rotate</h3>
<p>Rotates the image.</p>
<p>Name</p>
<ul>
	<li><code>rotate</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>degrees=[degrees to rotate]</code></li>
</ul>
<p>Example</p>
<ul>
	<li><code>rotate:degrees=180</code><br>
</li></ul></div>

<div class="section">
<h3>Crop</h3>
<p>Crops the image to the specified bounds.</p>
<p>Name</p>
<ul>
	<li><code>crop</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>bounds=[x,y,width,height]</code></li>
	<li><code>smart=[boolean]</code> Defaults to true. Smart bounding will attempt to shift the specified crop-zone to fit within the image dimensions if the crop-zone falls outside the images dimensions.</li>
</ul>
<p>Example</p>
<ul>
	<li><code>crop:bounds=150,100,100,100</code></li>
	<li><code>crop:bounds=150,100,100,100&amp;smart=false</code><br>
</li></ul></div>

<div class="section">
<h3>Adjust Brightness/Contrast</h3>
<p>Adjusts the brightness and contrast of the image.</p>
<p>Note: This utilizes the Adobe CQ Layer adjust(..) method which does not seem to conform w common brightness/contrast expectations.</p>
<p>Name</p>
<ul>
	<li><code>adjust</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>brightness=[-255 .. 255]</code> (dark to light)</li>
	<li><code>contrast=[positive float]</code> (1.0 does not change contrast. &lt; 1.0 lower contrast. &gt; 1.0 enhance contrast.)</li>
</ul>
<p>Example</p>
<ul>
	<li><code>adjust:brightness=120&amp;contrast=0</code><br>
</li></ul></div>

<div class="section">
<h3>Multiply Blend (v.1.8.0+)</h3>
<p>Multiplies all of the <span class="caps">RGB</span> values of the image against a base color. Follows specification of Multiply blend from Adobe Photoshop (http://helpx.adobe.com/after-effects/using/blending-modes-layer-styles.html#Multiply)</p>
<p>Name</p>
<ul>
	<li><code>multiply</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>alpha=[0.0..1.0]</code> (Opacity, percentage)</li>
	<li><code>color=[000000..FFFFFF]</code> (Hex Color for use in blending; if specified, overrides all red/green/blue parameters)</li>
	<li><code>red=[0..255]</code> (Red value for use in blending; not required if using <code>color</code> parameter; default value: 255)</li>
	<li><code>green=[0..255]</code> (Green value for use in blending; not required if using <code>color</code> parameter; default value: 255)</li>
	<li><code>blue=[0..255]</code> (Blue value for use in blending; not required if using <code>color</code> parameter; default value: 255)</li>
</ul>
<p>Examples</p>
<ul>
	<li><code>multiply:alpha=.75&amp;color=3366FF</code></li>
	<li><code>multiply:alpha=.75&amp;red=51&amp;green=102&amp;blue=255</code><br>
</li></ul></div>

<div class="section">
<h3>Red/Green/Blue Shift (v.1.8.0+)</h3>
<p>Shifts the color of all pixels in an image. Parameters are a percentage of R/G/B value. Omit or set R/G/B shift value to 0 to keep current value. If any element of the color is shifted beyond min/max allowed (0..255) the min/max value is used. Based on http://pixastic.com/lib/docs/actions/coloradjust/</p>
<p>Name</p>
<ul>
	<li><code>rgb-shift</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>red=[-1.0..1.0]</code> (Percentage, amount of red to shift the image)</li>
	<li><code>green=[-1.0..1.0]</code> (Percentage, amount of green to shift the image)</li>
	<li><code>blue=[-1.0..1.0]</code> (Percentage, amount of blue to shift the image)</li>
</ul>
<p>Examples</p>
<ul>
	<li><code>rgb-shift:red=.5&amp;green=.25&amp;blue=-.60</code><br>
</li></ul></div>

<div class="section">
<h3>Quality (v.1.9.0+)</h3>
<pre><code>Known Issue: Setting quality above 82 causes rendition file-size to balloon dramatically (up to 2x original).</code></pre>
<p>Adjusts the quality of the output image. This leverages the <span class="caps">AEM</span> Product Layer API’s write method, so it only works on <span class="caps">JPEG</span> and <span class="caps">GIF</span> image types (<span class="caps">PNG</span> is not supported).</p>
<p>Quality is always executed <span class="caps">LAST</span>, no matter where is appears in the transform list.</p>
<p>Name</p>
<ul>
	<li><code>quality</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>quality=[0..100]</code> (0 is lowest quality, 100 is highest)</li>
	<li>If quality number is “out of bounds”, 82 will be used (<span class="caps">OOTB</span> <span class="caps">AEM</span> Default quality)</li>
</ul>
<p>Examples</p>
<ul>
	<li><code>quality:quality=75</code><br>
</li></ul></div>

<div class="section">
<h3>Scale (v.2.1.0+)</h3>
<p>Scale allows percent-based scaling of images.</p>
<p>Name</p>
<ul>
	<li><code>scale</code></li>
</ul>
<p>Params</p>
<ul>
	<li>@scale=decimal representation of percent to scale</li>
	<li>Example: 0.25 = 25%</li>
	<li>@round=up | down | round</li>
	<li>Default: round</li>
</ul>
<p>Examples</p>
<ul>
	<li><code>scale:scale=.75</code><br>
</li></ul></div>

<div class="section">
<h3>Letter/Pillar Box (v.2.1.0+)</h3>
<p>Adds a Letter/Pillar box support when the specified new dimensions don’t match aspect ratio of original image. The apporopriate boxing will be applied based on best fit for the calculated aspect ratio. The background of the boxing is configurable, however if using <span class="caps">JPG</span> encoding transparency is lost resulting in black.</p>
<p>Name</p>
<ul>
	<li><code>letter-pillar-box</code></li>
</ul>
<p>Params</p>
<ul>
	<li><code>width=[width in px]</code></li>
	<li><code>height=[height in px]</code></li>
	<li><code>alpha=[0.0..1.0]</code> (Opacity of background, percentage)</li>
	<li><code>color=[000000..FFFFFF]</code> (Hex Color for use in background)</li>
</ul>
<p>Examples</p>
<ul>
	<li><code>letter-pillar-box:width=600&amp;height=600</code></li>
	<li><code>letter-pillar-box:width=600&amp;height=600&amp;alpha=.65&amp;color=0F0F0F</code><br>
</li></ul></div>

---
layout: acs-aem-commons_feature
title: Quickly
description: Quickly navigate AEM
date: 2014-11-12
redirect_from: /acs-aem-commons/features/quickly.html
tags: deprecated
initial-release: 1.9.0
---

## Beta

Quickly is in Beta.

Full cross-browser support is not yet available. Chrome, Safari and FireFox are known to work on Windows and OSX. Internet Explorer 9 and above may work, but have not been tested.

Quickly injects itself into pages immediately before the closing body tag. Please report any conflicts between Quickly and AEM (or your application) to the [ACS AEM Commons GitHub Issues site](https://github.com/Adobe-Consulting-Services/acs-aem-commons/issues)

![](images/go-screenshot.png)

## Purpose

Quickly's goal is to speed up navigation throughout AEM using a HUD console that facilitates navigating AEM from the keyboard.

## How to Use

* Remember that Quickly is in Beta!

* Quickly works across AEM Web consoles: AEM's WebUIs, CRX Web UIs and even Felix Web consoles.

* Define a `sling:OsgiConfig` to enable the Quickly engine for AEM Authors Only.

`/apps/mysite/config.author/com.adobe.acs.commons.quickly.impl.QuicklyEngineImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    results.mode="[dev]"/>
{% endhighlight %}

* Set `results.mode` to blank for authoring oriented results
* Set `results.mode` to `dev` for developer oriented results in the console (like CRXDE Lite). This includes all the "authoring" Web UIs.


Or you can set it directly on your local via the [Adobe Web Console](http://localhost:4502/system/console/configMgr)

![](images/felix-configmgr.png)


### Open Quickly

* OS X Chrome/Safari ~> `Ctrl-Space`
* OS X FireFox ~> `Shift-Ctrl-Space`
* Windows Chrome/Safari ~> `Ctrl-Space`
* Windows FireFox ~> `Shift-Ctrl-Space`
* Internet Explorer has not been tested

### Close Quickly

* `Esc`

## Operations

Most operations support "type ahead" allowing filtering of results typing character sequences you are looking for. Select a result and press "enter" to go to the result.

<div class="section">
<p><img src="images/help.png" alt=""></p>
<h3>Help</h3>
<p>Displays the help menu of all the available Operations</p>
<ul>
    <li>Command: <code>help</code></li>
</ul>
</div>

<div class="section">
<p><img src="images/back.png" alt=""></p>
<h3>Back</h3>
<p>List of last 25 accessed URIs in <span class="caps">AEM</span> by the user. Values are stored in local storage in the user's Web browser.</p>
<ul>
    <li>Command: <code>back</code><br>
</li></ul></div>

<div class="section">
<p><img src="images/go.png" alt=""></p>
<h3>Go</h3>
<p>Go to a list of pre-defined Web UIs.</p>
<ul>
    <li>Command: <code>go</code></li>
    <li>Command: <code>go!</code> opens Web UI in a new browser tab</li>
</ul>
<p>Go support two "special" instructions that switch the current <span class="caps">AEM</span> Authoring mode. Selecting these will appear to do nothing, but it will update the <span class="caps">AEM</span> Authoring mode cookie resulting in future Quickly navigation to take you to the Touch/Classic version of the Web UIs.</p>
<ul>
    <li><code>go classic</code></li>
    <li><code>go touch</code></li>
</ul>
</div>

<div class="section">
<p><img src="images/docs.png" alt=""></p>
<h3>Docs</h3>
<p>Access Adobe's <span class="caps">AEM</span> documentation</p>
<ul>
    <li>Command: <code>docs</code></li>
    <li>Command: <code>docs [search-term]</code></li>
    <li>Searches for term on Adobe docs site using DuckDuckGo.com<br>
</li></ul></div>

<div class="section">
<p><img src="/acs-aem-commons/images/quickly/lastmod.png" alt=""></p>
<h3>Lastmod</h3>
<p>Find the last modified CQ Pages by user and date.</p>
<ul>
    <li>Command: <code>lastmod</code></li>
    <li>Command: <code>lastmod [userId] [ 1s | 2m | 3h | 4d | 5w | 6M | 7y ]</code></li>
    <li>Defaults to: lastmod [current user] 1d<br>
</li></ul></div>

<div class="section">
<p><img src="images/favorites.png" alt=""></p>
<h3>Favorites</h3>
<p>List of last 25 accessed URIs in <span class="caps">AEM</span> by the user. Values are stored in local storage in the user's Web browser; different browsers means different favorite lists.</p>
<ul>
    <li>Command: <code>*</code></li>
    <li>Command: <code>* rm</code></li>
    <li>Removes the selected Favorite from the list<br>
</li></ul></div>
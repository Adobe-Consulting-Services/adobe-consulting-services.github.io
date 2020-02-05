---
layout: acs-aem-commons_default
title: Using with Maven
youtube-id: ePXinpRWBzk
---

# {{ page.title }}

If you're using the Content Package Maven plugin, take these two easy steps:

## Step 1: Add ACS AEM Commons as a Dependency

Note that all `<dependency>` entries listed below can be defined at the Reactor pom.xml with the version, type and classifier, and the version-less/type-less/classifier-less dependencys can be used in the sub-project poms. The instructions below define the dependencies directly in each sub-project pom for clarity and succinctness. 

### For AEM as a Cloud Service (or any project built from AEM Maven Archetype 21 and above)

In the `<dependencies>` section of your _all project's pom.xml_ file, add this:

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons.ui.content</artifactId>
    <version>{{ site.data.acs-aem-commons.version }}</version>
    <type>content-package</type>
    <classifier>min</classifier> <!-- optional, see below -->
</dependency>

<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons.ui.apps</artifactId>
    <version>{{ site.data.acs-aem-commons.version }}</version>
    <type>content-package</type>
    <classifier>min</classifier> <!-- optional, see below -->
</dependency>
{% endhighlight %}

### For 6.3, 6.4, and 6.5

In the `<dependencies>` section of your _content project's pom.xml_ file, add this:

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-content</artifactId>
    <version>{{ site.data.acs-aem-commons.version }}</version>
    <type>content-package</type>
    <classifier>min</classifier> <!-- optional, see below -->
</dependency>
{% endhighlight %}

### For 6.2

In the `<dependencies>` section of your _content project's pom.xml_ file, add this:

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-content</artifactId>
    <version>{{ site.data.acs-aem-commons.version62 }}</version>
    <type>content-package</type>
    <classifier>min</classifier> <!-- optional, see below -->
</dependency>
{% endhighlight %}

### For 6.0 and 6.1

In the `<dependencies>` section of your _content project's pom.xml_ file, add this:

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-content</artifactId>
    <version>{{ site.data.acs-aem-commons.version60 }}</version>
    <type>content-package</type>
    <classifier>min</classifier> <!-- optional, see below -->
</dependency>
{% endhighlight %}

### Minimal Package

ACS AEM Commons has two distributions:

* The ''full'' package which includes all functionality.
* The ''min'' package which excludes functionality requiring 3rd party dependencies.

Currently, the only feature excluded from the ''min'' package is the [Twitter](/acs-aem-commons/features/twitter.html) integration.

To include the ''min'' package, add

{% highlight xml %}
<classifier>min</classifier>
{% endhighlight %}

inside the `<dependency>` element.

To include the ''full'' package, don't provide any `<classifier>` element inside the `<dependency>` element.

## Step 2: Add ACS AEM Commons as an Embed/Sub package

### For AEM as a Cloud Service (or any AEM Project genereated from AEM Project Maven Archetype 21 and above)

In the `filevault-package-maven-plugin` plugin configuration of your _all project's pom.xml_ file, add this:

{% highlight xml %}
<plugins>
    <plugin>
        <groupId>org.apache.jackrabbit</groupId>
        <artifactId>filevault-package-maven-plugin</artifactId>
        ...
        <configuration>
            <!-- allowIndexDefinitions is required as acs-aem-commons deploys 
                 ACLs to /oak:index which is detected as an "index definition", 
                 even though it's not really an oak index definition -->
            <allowIndexDefinitions>true</allowIndexDefinitions>
            ...
            <embeddeds>
                <embedded>
                    <groupId>com.adobe.aem.commons</groupId>
                    <artifactId>acs-aem-commons.ui.apps</artifactId>
                    <type>zip</type>
                    <target>/apps/my-app-packages/application/install</target>
                </embedded>
                <embedded>
                    <groupId>com.adobe.aem.commons</groupId>
                    <artifactId>acs-aem-commons.ui.content</artifactId>
                    <type>zip</type>
                    <target>/apps/my-app-packages/content/install</target>
                </embedded>
                ...
{% endhighlight %}


### For 6.x (and NOT generated from Maven AEM Project Maven Archetype 21 and above)

In the _content project's pom.xml_, within the configuration of the `content-package-maven-plugin`, add a `subPackage`:

{% highlight xml %}
<plugin>
    <groupId>com.day.jcr.vault</groupId>
    <artifactId>content-package-maven-plugin</artifactId>
    <extensions>true</extensions>
    <configuration>
        ...
        <subPackages>
            <subPackage>
                <groupId>com.adobe.acs</groupId>
                <artifactId>acs-aem-commons-content</artifactId>
                <filter>true</filter>
            </subPackage>
        </subPackages>
        ...
    </configuration>
</plugin>    
{% endhighlight %}

If using the `filevault-package-maven-plugin`, within it's configuration add a `subPackage` just like above and also add `allowIndexDefinitions` like below: 

{% highlight xml %}
<plugin>
    <groupId>org.apache.jackrabbit</groupId>
    <artifactId>filevault-package-maven-plugin</artifactId>
    <extensions>true</extensions>
    <configuration>
        <allowIndexDefinitions>true</allowIndexDefinitions>
        ...
        <subPackages>
            <subPackage>
                <groupId>com.adobe.acs</groupId>
                <artifactId>acs-aem-commons-content</artifactId>
                <filter>true</filter>
            </subPackage>
        </subPackages>
        ...
    </configuration>
</plugin>    
{% endhighlight %}

## Step 3: Add ACS AEM Commons Bundle as a Dependency (Optional)

In the `<dependencies>` section of the _pom.xml_ any maven projects that use ACS AEM Commons APIs (Java utils, TagLibs, etc.), add the dependency for the `acs-aem-commons-bundle` project. The `acs-aem-commons-bundle` will deployed as part of the `acs-aem-commons-content` package (above), however the dependency is required to compile your project when it uses ACS AEM Commons Java APIs.

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-bundle</artifactId>
    <version>{{ site.data.acs-aem-commons.version }}</version>
    <scope>provided</scope>
</dependency>
{% endhighlight %}

## Video Walk-through

{% include shared/youtube-player.html %}


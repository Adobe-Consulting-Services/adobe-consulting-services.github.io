---
layout: acs-aem-commons_default
title: Using with Maven
---

# {{ page.title }}

If you're using the Content Package Maven plugin, take these two easy steps:

## Step 1: Add ACS AEM Commons as a Dependency

In the `<dependencies>` section of your _content project's pom.xml_ file, add this:

{% highlight xml %}
    <dependency>
        <groupId>com.adobe.acs</groupId>
        <artifactId>acs-aem-commons-content</artifactId>
        <version>{{ site.data.acs-aem-commons.version }}</version>
        <type>content-package</type>
    </dependency>
{% endhighlight %}

This will include the ''full'' package. To include the ''minimal'' package, add

{% highlight xml %}
    <classifier>min</classifier>
{% endhighlight %}

inside the `<dependency>` element.

## Step 3: Add ACS AEM Common as a Sub Package

Then, (while still in the _content project's pom.xml_) within the configuration of the `content-package-maven-plugin`, add a `subPackage`:

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


## Step 4: Add ACS AEM Commons Bundle as a Dependency (Optional)

In the `<dependencies>` section of the _pom.xml_ any maven projects that use ACS AEM Commons APIs (Java utils, TagLibs, etc.), add the dependency for the `acs-aem-commons-bundle` project. The `acs-aem-commons-bundle` will deployed as part of the `acs-aem-commons-content` package (above), however the dependency is required to compile your project when it uses ACS AEM Commons Java APIs.

{% highlight xml %}
    <dependency>
        <groupId>com.adobe.acs</groupId>
        <artifactId>acs-aem-commons-bundle</artifactId>
        <version>{{ site.data.acs-aem-commons.version }}</version>
        <scope>provided</scope>
    </dependency>
{% endhighlight %}

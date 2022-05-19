---
layout: acs-aem-commons_default
title: Using with Maven
youtube-id: ePXinpRWBzk
---

# {{ page.title }}

If you're using the Content Package Maven plugin, take these two easy steps:

## Step 1: Add ACS AEM Commons as a Dependency

Note that all `<dependency>` entries listed below can be defined at the reactor pom.xml's `<dependencyManagement>` with the version, type and classifier, and the version-less dependencies can be used in the sub-project poms. The instructions below define the dependencies directly in each sub-project pom for clarity and succinctness. 

In the `<dependencies>` section of your _all (container-package) project's pom.xml_ file, add this:

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-content</artifactId>
    <version>{{ site.data.acs-aem-commons.version }}</version>
    <type>zip</type>
    <classifier>min</classifier> <!-- optional, see below -->
</dependency>
{% endhighlight %}

Please refer to [Compatibility](/acs-aem-commons/pages/compatibility.html) for the last version compatible with AEM 6.4 or older.

### Minimal Package (v5.3.0 and earlier)

__Version 5.3.0+ no longer has/needs a min package. For v5.3.0+ do not specify a classifier__

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

### For AEM as a Cloud Service (or any AEM Project generated from AEM Project Maven Archetype 21 and above)

For more information on the Maven Project structural changes in Maven Archetype 21, please review [Understand the Structure of a Project Content Package in AEM as a Cloud Service]
](https://docs.adobe.com/content/help/en/experience-manager-cloud-service/implementing/developing/aem-project-content-package-structure.html). Note that this project structure is compatible with AEM 6.x as well.

In the `filevault-package-maven-plugin` plugin configuration of your _all project's pom.xml_ file, add this:

{% highlight xml %}
<plugins>
    <plugin>
        <groupId>org.apache.jackrabbit</groupId>
        <artifactId>filevault-package-maven-plugin</artifactId>
        ...
        <configuration>
            <embeddeds>
                <embedded>
                    <groupId>com.adobe.acs</groupId>
                    <artifactId>acs-aem-commons-content</artifactId>
                    <type>zip</type>
                    <target>/apps/my-app-packages/container/install</target>
                    <filter>true</filter>
                    <isAllVersionsFilter>true</isAllVersionsFilter>
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

If using the `filevault-package-maven-plugin`, within its configuration add a `subPackage` just like above: 

{% highlight xml %}
<plugin>
    <groupId>org.apache.jackrabbit</groupId>
    <artifactId>filevault-package-maven-plugin</artifactId>
    <extensions>true</extensions>
    <configuration>
        <subPackages>
            <subPackage>
                <groupId>com.adobe.acs</groupId>
                <artifactId>acs-aem-commons-content</artifactId>
                <filter>true</filter>
                <isAllVersionsFilter>true</isAllVersionsFilter>
            </subPackage>
        </subPackages>
        ...
    </configuration>
</plugin>    
{% endhighlight %}

As the `filevault-package-maven-plugin` prior to version 1.1.0 suffered from bug [JCRVLT-343](https://issues.apache.org/jira/browse/JCRVLT-343) use a newer version (in general using the most recent version outlined at [Plugin Documentation](https://jackrabbit.apache.org/filevault-package-maven-plugin/plugin-info.html#usage) is recommended).

## Step 3: Add ACS AEM Commons Bundle as a Dependency (Optional)

In the `<dependencies>` section of the _pom.xml_ of any Maven modules that use ACS AEM Commons APIs (Java utils, TagLibs, etc.), add the dependency for the `acs-aem-commons-bundle` project. The `acs-aem-commons-bundle` will deployed as part of the `acs-aem-commons-content` package (above), however the dependency is required to compile your project when it uses ACS AEM Commons Java APIs.

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


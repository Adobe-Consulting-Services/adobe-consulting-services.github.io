---
layout: acs-aem-commons_default
title: Add ACS AEM Commons to your AEM Maven project
---

# {{ page.title }}

ACS AEM Commons should be included as a Maven dependency on in your AEM project. The instructions for adding ACS AEM Commons to your project varies by the version fo ACS AEM Commons you are using. 

Please refer to [Compatibility](/acs-aem-commons/pages/compatibility.html) to check which version of ACS AEM Commons is compatible with your version of AEM.

> Note that all `<dependency>` entries listed below can be defined at the reactor pom.xml's `<dependencyManagement>` with the version, type and classifier, and the version-less dependencies can be used in the sub-project poms. The instructions below define the dependencies directly in each sub-project pom for clarity and succinctness. 


## ACS AEM Commons 6.0.0+

In ACS AEM Commons 6.0.0, the main dependency artifact ID was renamed from `acs-aem-commons-content` to `acs-aem-commons-all`. 

### Your all/pom.xml

In the `filevault-package-maven-plugin` plugin configuration of your _all project's pom.xml_ file, add this:

{% highlight xml %}
<plugins>
    <plugin>
        <groupId>org.apache.jackrabbit</groupId>
        <artifactId>filevault-package-maven-plugin</artifactId>
        ...
        <configuration>
            <embeddeds>
                ...
                <embedded>
                    <groupId>com.adobe.acs</groupId>
                    <artifactId>acs-aem-commons-all</artifactId>
                    <type>zip</type>
                    <target>/apps/my-app-vendor-packages/container/install</target>
                    <filter>true</filter>
                    <isAllVersionsFilter>true</isAllVersionsFilter>
                </embedded>
                ...
{% endhighlight %}

In the `<dependencies>` section of your _all (container-package) project's pom.xml_ file, add this:

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-all</artifactId>
    <version>{{ site.data.acs-aem-commons.version }}</version>
    <type>zip</type>
</dependency>
{% endhighlight %}

### Your core/pom.xml (Optional)

To use [Java APIs](https://javadoc.io/doc/com.adobe.acs/acs-aem-commons-bundle/latest/index.html) provided by ACS AEM Commons in your code, add a dependency on on the `acs-aem-commons-bundle` in your OSGi bundle Maven project. 

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-bundle</artifactId>
    <version>{{ site.data.acs-aem-commons.version }}</version>
    <scope>provided</scope>
</dependency>
{% endhighlight %}

## ACS AEM Commons < 6.0.0

Prior to ACS AEM Commons 6.0.0, the main dependency artifact ID was named from `acs-aem-commons-content`.

### Your all/pom.xml

In the `filevault-package-maven-plugin` plugin configuration of your _all project's pom.xml_ file, add this:

{% highlight xml %}
<plugins>
    <plugin>
        <groupId>org.apache.jackrabbit</groupId>
        <artifactId>filevault-package-maven-plugin</artifactId>
        ...
        <configuration>
            <embeddeds>
                ...
                <embedded>
                    <groupId>com.adobe.acs</groupId>
                    <artifactId>acs-aem-commons-all</artifactId>
                    <type>zip</type>
                    <target>/apps/my-app-vendor-packages/container/install</target>
                    <filter>true</filter>
                    <isAllVersionsFilter>true</isAllVersionsFilter>
                </embedded>
                ...
{% endhighlight %}

In the `<dependencies>` section of your _all (container-package) project's pom.xml_ file, add this:

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-content</artifactId>
    <version>5.7.0</version>
    <classifier>min</classifier>
    <type>zip</type>
</dependency>
{% endhighlight %}

### Your core/pom.xml (Optional)

To use [Java APIs](https://javadoc.io/doc/com.adobe.acs/acs-aem-commons-bundle/5.7.0/index.html) provided by ACS AEM Commons in your code, add a dependency on on the `acs-aem-commons-bundle` in your OSGi bundle Maven project. 

{% highlight xml %}
<dependency>
    <groupId>com.adobe.acs</groupId>
    <artifactId>acs-aem-commons-bundle</artifactId>
    <version>5.7.0</version>
    <scope>provided</scope>
</dependency>
{% endhighlight %}

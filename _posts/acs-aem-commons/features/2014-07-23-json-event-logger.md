---
layout: acs-aem-commons_feature
title: JSON Event Logger
description: Log OSGi events as JSON
date: 2014-07-23
thumbnail: /images/json-event-logger/thumbnail.png
feature-tags: administration
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 1.7.0
---

## Purpose

This EventLogger service provides a configurable bridge between the OSGi Event mechanism and the SLF4j/Logback facility. Events for an arbitrary set of topics matching an arbitrary event filter can be logged to an arbitrary category at an arbitrary log level, in a JSON format. Used in conjunction with the [SyslogAppender](/acs-aem-commons/features/syslog-appender.html), the EventLogger allows sysadmins to send a structured OSGi event data stream to an external log aggregator for further post-processing.


## How to Use

Create a config at `/apps/system/config/com.adobe.acs.commons.logging.impl.JsonEventLogger-RESOURCE.xml` with the following to start sending Resource events as JSON messages to the `osgi.events.resource`logging category at the INFO level:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
	event.topics="[org/apache/sling/api/resource/Resource/*]"
	event.logger.category="osgi.events.resource"
	event.logger.level="INFO"
    />
{% endhighlight %}     


Then use an Apache Sling Logging Logger configuration to enable logging for that category:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
	org.apache.sling.commons.log.pattern="{Long}5"
	org.apache.sling.commons.log.names="[osgi.events.resource]"
	org.apache.sling.commons.log.file="logs/osgi.events.resource.log"
	org.apache.sling.commons.log.level="info"
    />
{% endhighlight %}    

The log file output will look something like this:

{% highlight json %}
{"path":"/var/eventing/jobs/assigned/376e48ac-b010-4905-8a35-f5413cf6a930/com.day.cq.replication.job.publish/2014/6/4/16/59/com.day.cq.replication.job.publish_376e48ac-b010-4905-8a35-f5413cf6a930_0","userid":"admin","resourceAddedAttributes":["event.job.started.time"],"resourceType":"slingevent:Job","event.topics":"org/apache/sling/api/resource/Resource/CHANGED"}
{"userid":"admin","path":"/var/eventing/jobs/assigned/376e48ac-b010-4905-8a35-f5413cf6a930/com.day.cq.replication.job.publish/2014/6/4/16/59/com.day.cq.replication.job.publish_376e48ac-b010-4905-8a35-f5413cf6a930_0","resourceChangedAttributes":["event.job.retrycount"],"resourceRemovedAttributes":["event.job.started.time"],"resourceType":"slingevent:Job","event.topics":"org/apache/sling/api/resource/Resource/CHANGED"}
{% endhighlight %}    

Finally, use a [SyslogAppender](/acs-aem-commons/features/syslog-appender.html) to stream those messages to a remote aggregation server:

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
	suffix.pattern="%logger{36}:\ %msg%n"
	port=I"514"
	loggers="[osgi.events.resource]"
	host="127.0.0.1"
    />
{% endhighlight %}   


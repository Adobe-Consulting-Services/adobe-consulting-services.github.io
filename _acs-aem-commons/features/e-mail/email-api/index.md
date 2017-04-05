---
layout: acs-aem-commons_feature
title: Email API
description: Generic Email Service to send template based emails
date: 2014-04-01
feature-tags: backend-dev
initial-release: 1.6.0
---

## Purpose

The `EmailService` provides APIs for sending emails through a centrally configured service.
You can create author-able templates so that the developers do not need to be involved in creating and updating email templates.

## Email API definition

### Interface `com.adobe.acs.commons.email.EmailService`

	 List<InternetAddress> sendEmail(String templatePath, Map<String, String> emailParams, InternetAddress... recipients);

	 List<String> boolean sendEmail(String templatePath, Map<String, String> emailParams, String... recipients);

**Description**  

Sends an email to one or more recipients based on the template text specified by the path and replacing variables in the template text using the email parameters. See [Creating an Email Template](#creating-an-email-template) section below for an example template.

**Parameters**       

* `templatePath` - An absolute path of the email template in the repository. eg: `/etc/notification/email/emailTemplate.txt`  
* `emailParams`  - Map containing template variables that are injected in the email. Sender's information can be set inside the emailParams for keys: `senderEmailAddress` and `senderName`:

		emailParams.put("senderEmailAddress","abcd@example.com");  
		emailParams.put("senderName","David Smith");

* `recipients` - A variable array of recipients email addresses.


**Returns**  
`failureList` - Returns list of those recipients addresses for which the email sent was not successful. A wholly successful `sendEmail` results in an empty list.

## How to Use

### Configuring the Mail Service

The first step to sending emails through this service is to configure the Day CQ Mail Service component whose pid is `com.day.cq.mailer.DefaultMailService`.

The following `sling:OsgiConfig` can be used to configure the mail service, for example:

	/apps/myapp/config/com.day.cq.mailer.DefaultMailService.xml

{% highlight xml %}   
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    debug.email="{Boolean}true"
    from.address="youremail@gmail.com"
    smtp.host="smtp.gmail.com"
    smtp.password="password"
    smtp.port="465"
    smtp.ssl="{Boolean}true"
    smtp.user="youremail@gmail.com"/>   
{% endhighlight %}

> The above configuration is only a sample. Hence, replace the property values accordingly.

Alternatively, to test an individual instance it can be configured directly from the Felix console. To do this, log into the OSGi Console at `{server}:{port}/system/console/configMgr ` and look for a service called **Day CQ Mail Service**.

Enter all of the relevant information for your current SMTP provider.  If you don't have or can't easily get SMTP set up within your organization, [a Gmail account](https://support.google.com/a/answer/176600?hl=en) works for testing.

Once you have the Day CQ Mail Service configured you should be able to send emails.  If, later on you run into problems with getting a null Message Gateway, you probably entered something incorrectly here.

### Creating an Email Template

Templates are `nt:file` nodes in the repository containing a text file.
The text file contains the complete email. Email headers are defined as the first lines of the file in the format `Header-Name: Header-Value`, one header per line. Headers supporting multiple values can thus have several header lines. The supported headers are the standard email headers. After the last header line put an empty line and start the email body afterwards.

Below is a sample email template file. All of the text in the format `${variable}` will be replaced with the variable matching the name inside the brackets.  These variables are injected dynamically by this API.  


	From: admin@adobe.com
	Subject: Greetings
	CC: ${ccrecipient}
	BCC: ${bccrecipient}

	<div style="color: blue;">

	Hello ${recipientName}

	Find your message here: ${message}

	From,
	Adobe Team

	-------------------------------------------------------
	This is an automatic generated message. Please do not reply.

	</div>


This template or any updates to it should be activated/replicated to the publish environment to be able to send emails from the publish instance.


### Using the Email API to send mails

The EmailService is an OSGi service and can be injected using `@Reference` in the calling class.

{% highlight java %}
	@Reference
	EmailService emailService;

	emailService.sendEmail(templatePath, emailParams, recipients);
{% endhighlight %}

## JSP Example
Example of a code snippet that uses the EmailService API to sent email is show below:


{% highlight jsp %}
	<%@include file="/libs/foundation/global.jsp"%>
	<%@page import="com.adobe.acs.commons.email.EmailService,
	        java.util.*"%><%

	// Get the OSGi Email Service
	EmailService emailService = sling.getService(EmailService.class);

	// Specify the template file to use (this is an absolute path in the JCR)
	String templatePath = "/etc/notification/email/default/emailTemplate.txt";

	//Set the dynamic variables of your email template
	Map<String, String> emailParams = new HashMap<String,String>();
	emailParams.put("body","hello there");

	//  Customize the sender email address - if required
	emailParams.put("senderEmailAddress","abcd@example.com");
	emailParams.put("senderName","David Smith");

	// Array of email recipients
	String[] recipients = { "recipient1@example.com", "recipient2@example.com" };

	// emailService.sendEmail(..) returns a list of all the recipients that could not be sent the email
	// An empty list indicates 100% success
	List<String> failureList = emailService.sendEmail(templatePath, emailParams, recipients);

	if (failureList.isEmpty()) {
		out.println("Email sent successfully to the recipients");
	} else {
		out.println("Email sent failed");
	}

	%>
{% endhighlight %}

## Using the Email API to send attachments (since v2.6.0/3.2.0)

The `sendMail(..)` method now supports the following signature:

{% highlight java %}
public List<String> sendEmail(String templatePath, Map<String, String> emailParams, Map<String, DataSource> attachments, String... recipients)

public List<InternetAddress> sendEmail(String templatePath, Map<String, String> emailParams, Map<String, DataSource> attachments, InternetAddress... recipients)
{% endhighlight %}

E-mail attachments can be passed in via the attachments parameter.

Example

{% highlight jsp %}
...
Map<String, DataSource> attachments = new HashMap<>();

String attachmentContentsAsString = "This text should be in the attache txt file."
attachments.put("attachment1.txt", new ByteArrayDataSource(attachmentContentsAsString, "text/plain"));
...
List<String> participantList = emailService.sendEmail(htmlEmailTemplatePath, emailParams, attachments, recipients);
{% endhighlight %}

## Service User

On AEM 6.2 or above, this service uses a Service User for repository access. This user is configured with
the expected permissions required, but additional permissions may be required if your repository design
deviates from the expected structure.

User name: `acs-commons-email-service`

ACLs:

* `jcr:read` on `/etc/notification/email`
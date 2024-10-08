---
layout: acs-aem-commons_feature
title: Forms
description: Simple yet flexible framework for building complex forms
date: 2013-07-10
redirect_from: /acs-aem-commons/features/forms.html
tags: deprecated
initial-release: 1.0.0
---

## Why is this deprecated?

This API is built for use with JSP which has long since been superseded by HTL as the preferred script language in AEM, therefore the  use of this API is discourages as to encourage the use of HTL.

## Purpose

Provide an abstraction for managing the submission of statically defined HTML Forms.

## How to Use (v1.2.2+)

To create a enable the Forms, create a new `sling:OsgiConfig` a OSGi component configuration:

    /apps/myapp/config/com.adobe.acs.commons.forms.impl.FormsRouterImpl

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
    xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="sling:OsgiConfig"
    suffix="/submit/form"
/>
{% endhighlight %} 

The property `suffix` will be used to identify and properly route Forms submissions.

## The Form API

The Form abstraction is simple development abstraction for transporting data between the browser and AEM. The abstraction is broken into two part:

1. The Form (Form.java) which represents the mutable Form state
2. The FormHelpers (POST-Redirect-GET or Forward-as-GET) which contain the logic for transporting the Form data and re-constituing the Form on the other side of the HTTP Request. 

## Limitations

Current limitations of the Forms implmentation include:

* Only supports transport of text/String-based data (No file uploads)
* Multiple form parameters by the same name is not supported. A random value will be selected.
* Multiple forms can exist on a page, however any data in the unsubmitted forms will be lost (unless you're using XHR POSTs)

### The [Form]({{ site.data.acs-aem-commons.baseurl }}/apidocs/com/adobe/acs/commons/forms/Form.html)

Form is a class that represents HTTP Form submission data, and contains the following data:

* name: the form's conceptual name; acts as a UID when multiple forms are on a page (ex. login, registration)
* data: which holds submitted form data
* errors: which holds error messaging associated with form field

### Form Helpers

#### [Generic Form Helper]({{ site.data.acs-aem-commons.baseurl }}/apidocs/com/adobe/acs/commons/forms/helpers/FormHelper.html)

FormHelpers interact with Form objects, transporting and re-constuting them on either side of the HTTP Request.

Most of the time the "generic" FormHelper is the better choice. This allows for very easy switching betwen the POST-Redirect-Get and Forward-as-Get implementations.


{% highlight jsp %}
FormHelper formHelper = sling.getService(PostRedirectGetFormHelper.class);
{% endhighlight %}

OR

{% highlight jsp %}
FormHelper formHelper = sling.getService(ForwardAsGetFormHelper.class);
{% endhighlight %}


#### [Forward-as-GET Form Helper]({{ site.data.acs-aem-commons.baseurl }}/apidocs/com/adobe/acs/commons/forms/helpers/ForwardAsGetFormHelper.html)
The Forward Form Helper is used when Forms need to redirect (Forward-as-GET) internally to render end state of forms.

Forward Form Helper requests the target resource as an internal Synthetic GET Request, and passes the Form object as a SlingHttpServletRequest attribute.

*Key features/use-cases*

* Form-payload is too large to be transferred via GET Query Params (to render error page)
* You aren't uncomfortable exposing for- data as clear text in query params (even though they fall under SSL envelope)
* You don't mind resubmitting forms when a user clicked "refresh"
* Keeps a "clean" address bar in the browser


#### [POST-Redirect-GET Form Helper]({{ site.data.acs-aem-commons.baseurl }}/apidocs/com/adobe/acs/commons/forms/helpers/PostRedirectGetFormHelper.html)

The POST-Redirect-GET (PRG) Form Helper is used when Forms need/can redirect externally (302) to re-render a form or success page.

PRG Form Helper requests the target resource as a 302 Redirect, serialized the Form data as JSON and transports the JSON data as GET Query Parameters. This works well when Form data is under ~2000 characters in total.

*Key features/use-cases*

* Form-payload is too small-ish (< 2000 chars encoded)
* You like a clean separation between your GET and POST requests
* Don't mind a messy address bar in the browser (errors are returned to form via GET QPs)

*Remember: GET Query Parameters are passed WITHIN the HTTPS envelope, so they are not visible on the wire*

## Sample Implementation

This example used the PRGFormHelper, however this can easily be swapped out for the ForwardFormHelper;

The normalized FormHelper API that wraps common usecases in `.renderForm(..)` and `.renderOtherForm(...)` methods.

Generally these methods can be used, and `PostRedirectGetFormHelper.sendRedrect(..)` and `ForwardAsGetFormHelper.forwardAsGet(..)` can be reserved for unusual use-cases where even more control is required.




### demo.jsp

Initialize the Form object with the slingRequest.

This will intelligently look for the Form data from POST Parameters, GET Query Parameters, or HttpServletRequest Attributes depending on the context and FormHelper used.

If the request is a "fresh" request to the page, the form and its errors will be empty.

Changing between Form strategies (PRG vs Fwd-as-GET) is as easy as swapping out the FormHelper as shown below.

Also, don't forget to make them the same in post.POST.jsp;

IMPORTANT: FormHelper Services should be sync'd between the form rendering JSP and the POST handler JSP.


{% highlight jsp %}
<%
/* FormHelper formHelper = sling.getService(PostRedirectGetFormHelper.class); */
FormHelper formHelper = sling.getService(ForwardAsGetFormHelper.class);
Form form = formHelper.getForm("demo", slingRequest);
%>
<%-- Check if the form has any errors, and display a list of all the error messages --%>

<% if(form.hasErrors()) { %>
    <h2 class="alert">Your form has errors!</h2>
<% } %>
{% endhighlight %}


Set the form to POST back to the component; use formHelper.getAction(..) to add the suffix that is registered with the POST handler. Defaults to /acs/form -- can change via OSGi Configuration on:

com.adobe.acs.commons.forms.helpers.impl.PostFormHelperImpl#prop.form-suffix

Optionally pass a second parameter to `getAction()` to set the selector used to resolve the script for this POST request. If not provided, defaults to "post" (to resolve to post.POST.jsp).

Useful for multi-page form wizards.

Example: `<%= formHelper.getAction(currentPage, "step1") %>` will be handled by `/apps/acme/components/demo/step1.POST.jsp` 

{% highlight jsp %}
<form method="post" action="<%= formHelper.getAction(currentPage) %>">
    <%= formHelper.getFormInputsHTML(form) %>

    <fieldset>
        <legend>Form Demo</legend>

        <div><%= form.getError("myField") %></div>
        <label <%= form.hasError("myField") ? "class=\"error\"" : "" %>>My Field:</label>
        <input type="text" name="myField" value="<%= form.get("myField") %>"/>

        <input type="submit" value="Submit"/>
    </fieldset>
</form>

{% endhighlight %}

### post.POST.jsp

Changing between Form strategies (PostRedirectGet vs ForwardAsGet) is as easy as swapping out the FormHelper as show below. Or for the common case, use generic FormHelper with `.renderForm(..)`

Choose the return-to-form method based on the Form strategy.
You can use PostRedirectGetFormHelper.sendRedirect(..) or ForwardAsGetFormHelper.forwardAsGet(..) variations
if the FormHelper.renderForm(..) variations are sufficient (renderForm covers the 80% usecase)

You'll want to match currentPage/resource/path up to `form.getAction(..)` in `demo.jsp`

{% highlight jsp %}
<%
// PostRedirectGetFormHelper formHelper = sling.getService(ForwardAsGetFormHelper.class);
// ForwardAsGetFormHelper formHelper = sling.getService(ForwardAsGetFormHelper.class);
// FormHelper formHelper = sling.getService(PostRedirectGetFormHelper.class);

FormHelper formHelper = sling.getService(ForwardAsGetFormHelper.class);

//  Get the Form
Form form = formHelper.getForm("demo", slingRequest);

// Validation should be moved to a supporting OSGi Service - placement only for illustration
if(form.get("myField") == null || form.get("myField").length() < 10) {
    form.setError("myField", "What kind of answer is: " + form.get("myField"));
}

if(form.hasErrors()) {
     formHelper.renderForm(form, currentPage, slingRequest, slingResponse);
} else {
    // Save the data; or whatever you want
    slingResponse.sendRedirect("/content/success.html");
}
%>
{% endhighlight %}

## Service User

On AEM 6.2 or above, this service uses a Service User for repository access. This user is configured with
the expected permissions required, but additional permissions may be required if your repository design
deviates from the expected structure.

User name: `acs-commons-form-helper-service`

ACLs:

* n/a (this user is only necessary for mapping resources)


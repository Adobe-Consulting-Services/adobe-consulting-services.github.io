---
layout: acs-aem-commons_feature
title: On-Deploy Scripts
description: Create one-time scripts that execute upon deployment to AEM
date: 2018-04-05
redirect_from: /acs-aem-commons/features/on-deploy-scripts.html 
feature-tags: administration backend-dev content-migration
initial-release: 3.15.0
tags: aemcs-incompatible
---

## Purpose

On-Deploy Scripts allows developers to create one-time scripts that execute upon deployment to an AEM server.

### Use Cases

#### Content updates that correlate with code updates/refactors
- Updating all instances of a component to a new `sling:resourceType` name or path.  This often happens when developers
reorganize the code structure such as `/apps/mysite/facebook` and `/apps/mysite/twitter` ->
`/apps/mysite/social/facebook` and `/apps/mysite/social/twitter`
- Copying a node property to a new property name.  This often happens as components over time refer to a single type
of data but with a different name, and there is a desire to consolidate to a common name so that code can easily work
with all nodes - e.g. `postal | zip | zipcode` -> `postalcode`

#### Admin updates that would need to be done on all servers in all environments
- Creating a user group
- Adding users/groups as members of a group
- Creating a site blueprint
- Configuring cloud configs (e.g. translation configuration) for a node tree

#### Mass content updates required by business that would be onerous for authors
- Updating a phone number everywhere from "555-555-5555" to "999-999-9999"
- Updating all pages of a particular type to set a property such as "Hide in Navigation"
- Deleting all instances of a particular component
- Removing obsolete content

#### One-time content creations that you prefer not to have in your content package
- Loading data into AEM from a remote data source 
- Creation of the initial site structure
- Creation of content meant for local developer environments only

### Patch System by Jetpack Add-on

[Patch System by Jetpack](https://jetpack.ida-mediafoundry.io/tools/patch-system.html) is a cool add-on that builds on top of On-Deploy scripts! It's not part of ACS AEM Commons, but if you use On-Deploy Scripts definitely check it out!

![Patch System by Jetpack](https://jetpack.ida-mediafoundry.io/images/patch-system.png)

### Why use On-Deploy Scripts?

There are other tools out there that allow you to run ad-hoc scripts against your AEM instance manually, but this
method is fully automated. An automated approach provides many key benefits.

- Continuous integration gives you automatic testing in your pre-prod environments.  You can be confident that things
will work correctly in production because the scripts have run on deployment to your pre-prod environments as well.
- Scripts are run at the same time as the code deployment.  As such, there is effectively no period of time where the
server is in a "broken" state for cases such as the example where a `sling:resourceType` path is changed and content
needs to reference the new `sling:resourceType` path.
- Automation eliminates the chance of user error and/or omission when releasing to production (e.g. dev-ops forgetting
to run a script on the server post-deployment, developers forgetting to tell dev-ops to run the script in the first
place, etc.)
- Automation reduces work and required coordination.
    - No longer does anyone need to make sure they update all of the pre-prod environments with updates related to a
    code deployment.
    - No longer do pre-prod environments contain obsolete content because having an author update all environments
    would be too much work for the value.
    - No longer are developers sending out messages of "When you pull down my latest code, make sure you run "X" script
    else "Y" will blow up."
- Scripts ease setup for new developers and QA personnel on your projects.  We've all played the game of "Your
AEM server isn't working properly? Did you run this script? Did you configure this property?" This issue simply goes
away as every person's AEM server checks the on-deploy scripts and runs whichever ones have not yet
been run automatically.
- Scripts can be run on both the author and publish servers.  As such, content updates do not need to be
activated/published. This can be a big deal for mass content updates.
- Script run status is preserved within AEM, giving an easy way to determine if a script has already been run on a
given server.

## How to Use On-Deply Scripts

1. Enable the On-Deploy Scripts Feature
1. Implement a Script Provider Service
1. Create Scripts and Add to Script Provider

### Enable the On-Deploy Scripts Feature

Enable the On-Deploy Scripts feature by deploying a blank OSGi configuration file from your project deployment.

`/apps/mysite/config/com.adobe.acs.commons.ondeploy.impl.OnDeployExecutorImpl.xml`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
  jcr:primaryType="sling:OsgiConfig"/>
{% endhighlight %}

### Implement a Script Provider Service

Create a service implementation of `com.adobe.acs.commons.ondeploy.OnDeployScriptProvider`.  This service
implements a single function that returns a list of one-time script classes for the On-Deploy Scripts Executor
(enabled above) to run.

This can very well be a copy and paste of the code below.  Note the commented line - this is where you will be
referencing your real script classes, in the order you wish for them to run.

{% highlight java %}
@Component(immediate = true)
@Service
@Properties({
        @Property(name = "service.description", value = "Developer service that identifies code scripts to execute upon deployment")
})
public class OnDeployScriptProviderImpl implements OnDeployScriptProvider {
    @Override
    public List<OnDeployScript> getScripts() {
        return Arrays.asList(
                // List of script instances - e.g. new MyScript1(), new MyScript2(), new MyScript3()
        );
    }
}
{% endhighlight %}

### Create Scripts and Add to Script Provider

Create any number of one-time script classes that implement the
`com.adobe.acs.commons.ondeploy.scripts.OnDeployScript` interface.  It is generally recommended to do so by extending
`com.adobe.acs.commons.ondeploy.scripts.OnDeployScriptBase`, which provides OOTB helper functions, a logger, and
useful instance variables.

Once you have created these script classes, add them as instances to the list returned by your Script Provider class
created in the previous step.

On-Deploy Scripts are designed to run a single time per AEM server.  To that end, AEM will track which scripts have
been run, and deploying a Script Provider multiple times with the same list of scripts will not cause
those scripts to run multiple times (provided they are successful and the status tracking nodes are not removed -
see Monitoring section). Indeed it is often beneficial to keep the entire list of scripts intact indefinitely, so that
a new AEM server can run all scripts from first to last to be completely up to date without any manual intervention.

## Monitoring

On-Deploy Scripts are executed immediately on deployment to AEM, and are run in the order specified within the Script
Provider service.  Each script generates a status node under `/var/acs-commons/on-deploy-scripts-status`. This status
node indicates whether the script was successful or not, and when it executed. A script that completes successfully will
never run again on this server (unless the status node is removed).

If a script fails, AEM will mark its status node with a value of "fail".  A failing script will prevent any later
scripts in the list from running, in case later scripts depend on the success of earlier scripts.  A failed script
will attempt to execute again during the next code deployment (or restart).

## Troubleshooting

If your On-Deploy Scripts are not running on deployment to AEM (as evidenced by not finding any status nodes under
`/var/acs-commons/on-deploy-scripts-status`), ensure you have enabled the On-Deploy Scripts feature
by deploying an empty OSGi config for `com.adobe.acs.commons.ondeploy.impl.OnDeployExecutorImpl`.

If your On-Deploy Scripts are running but failing, your best bet is to check log files.  If you're using the `logger`
provided by extending `OnDeployScriptBase` for your scripts, the logging should match your exact script class names.
You may also wish to filter your log file by `com.adobe.acs.commons.ondeploy` and up the logging level to `DEBUG`.

One common source of errors can be attempting to execute operations without appropriate permissions.  On-Deploy Scripts
are run by the `acs-commons-on-deploy-scripts-service` service user.  By default, this user has the following
permissions:
- / (entire repository) - read
- /content - read/write/replicate
- /etc - read/write
- /var/acs-commons/on-deploy-script-status – read/write

Depending on what your script is attempting to do, you may need to add further permissions for the
`acs-commons-on-deploy-scripts-service` user to your AEM repository.

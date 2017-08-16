---
layout: acs-aem-commons_feature
title: MCP - Error handling
---

[<< back to MCP Table of Contents](index.html)

## Initialization errors

If there is any error during initalization of the process, it is likely that the process will not be commited to the JCR and might remain in the MCP service list, but only in-memory.  The errors should be logged to the system error log, though.  The MCP servlet can be invoked to purge in-memory processes manually but this is normally triggered anyway when another process completes normally.

## Error handling in FAM

Error handling during each step in a process is provided by the Fast Action Manager.  Anything running deferred within an action manager does not need to catch errors or log them in any special way.  The Action Manager will record these errors and handle them as appropriate:

- If the step is defined as critical then the Error and Finish handlers for that action manage will trigger, but MCP will terminate the process and not proceed to the next step.
- If the step is defined as a regular step then MCP will advance to the next step.  The Error handler of action manager will fire at the end of the step prior to starting the next MCP step.

More information about FAM and error handling is provided via [the Fast Action Manager documentation](../fast-action-manager/index.html).

## Error persistence

As long as the server is still running at the end of a step, any recorded errors will be recorded in the JCR under the process instance node under _jcr:content/failures/step**N**_ where **N** is the step where the error was observed.

## Error report view

Currently the error view is not finalized or hooked up to the user interface, but it is provided in the process instance component.  Change the selector to _errors_ and the extension to _html_.  For example if the process has a JCR path `/var/acs-commons/mcp/instances/272449469317BA71` then browse to `/var/acs-commons/mcp/instances/272449469317BA71.errors.html`.


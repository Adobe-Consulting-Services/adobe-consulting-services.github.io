---
layout: acs-aem-commons_feature
title: MCP - Maintenance Operations
---

[<< back to MCP Table of Contents](index.html)

## Persisted data
All data for MCP is tracked under `/var/acs-commons/mcp`.  It is written by the mcp system user `acs-commons-manage-controlled-processes-service`.  There are no cases where other user accounts need to write to this location but they should be allowed to read from here in order to obtain information about process reports or [errors](error-handling.html).

## Process cleanup
Over time the process instances will pile up and cause a lot of clutter in the user interface.  To resolve this, back up any content of value from the repository location `/var/acs-commons/mcp` and use the process manager (main UI) to start "Process Cleanup."  It will ask you the age in days you want to use.  0 means anything from yesterday or earlier.  -1 means everything.  Otherwise values like 7 mean one week old, and so on.

## Controller servlet
If you need additional control, the MCP servlet can be accesssed using REST calls.  It is tied to the main page resource with the "json" extension like so: `/etc/acs-commons/manage-controlled-processes/jcr:content.COMMAND.json`

Command may be one of the following:
* start: Start a process.  The class of the definition should be indicated by the "definition" parameter.  Other parameters required correspond to the class variables that are declared as form fields.  It is recommended to use a POST method for this command.
* list: Lists all processes, both completed and active.
* status: Returns information about a process indicated by either its GUID (id parameter) or by its JCR Path (path parameter)
* halt: Halts a process.  Uses the same parameters as status.
* haltAll / halt.all / halt-all: Stops all running processes.  This is to be used with extreme caution.
* purge: This removes any processes from the list that are not completed.  This is useful if there are a lot of zombie processes that are left behind because of initalization errors, such as validation errors caused by bad paths in the user input or by missing required fields.  This does not affect running processes or remove data that was already saved in the JCR -- it just cleans objects out of the in-memory java object that tracks running processes and only removes processes that are not running.
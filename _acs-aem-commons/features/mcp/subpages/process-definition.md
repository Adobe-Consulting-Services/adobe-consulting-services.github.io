---
layout: acs-aem-commons_subpage
title: MCP - Process Definition
---

[<< back to MCP Table of Contents](../index.html)

## ProcessDefinition class
To create a new process definition for use with MCP, create a class which extends the ProcessDefinition abstract class with the following methods:
* **buildProcess** defines the steps that this process entails and schedules the necessary work accordingly.
* **storeReport** determines how and where to store a report, if applicable.  This method can be blank if no report is being generated.  See the section on Generic Report for more information.
Additionally, the definition should declare any variables required for user input.  They can be private but they should **never** be static.  For more information on handling user input see [the form fields documentation](form-fields.html).
## ProcessDefinitionFactory class
You also need to create a factory which can instantiate your definition every time a new process is started.  The factory has three purposes:
1. Register itself as a service so that it can be discovered by MCP
2. Identify the friendly name of the process definition via getName.
3. Instantiate a process definition, passing any requied services through the constructor.  Because the factory is a service, any dependency declared with @Reference will be injected automatically.
For example:

```
@Component
@Service(ProcessDefinitionFactory.class)
public class MyProcessDefinitionFactory extends ProcessDefinitionFactory<MyProcessDefinition>{
    public String getName() {
        return "My Process";
    }

    process MyProcessDefinition createProcessDefinitionInstance() {
        return new MyProcessDefintion();
    }
}
```

## Controlling access to users
The ProcessDefinitionFactory has a method you can optionally override called `isAllowed` which takes the user object and returns true if they are allowed to see/start this definition.  The default is true, which means all users will see it.  If you override this method in your factory you can change this behavior.  Alternatively, instead of extending ProcessDefinitionFactory you can use AdminOnlyProcessDefinitionFactory which only lets the "admin" user see the process, or you can use AdministratorsOnlyProcessDefinitionFactory which lets anyone in the administrators group see the process.
## Lifecycle of a process instance
When a process begins the following occur:
* The MCP Servlet creates a ProcessDefinition class using the `definition` parameter to deterime what class to instantiate.
* The MCP Manager service identifies the appropriate factory and uses that to instantiate the process definition object.
* The MCP Servlet takes this new process definition object and asks the service for a new process instance, passing the definition back.
* The MCP Manager creates a new process instance in memory and passes the definition to the constructor
* The Process Instance sets up its internal variables and randomly generates an ID for itself
* The MCP Manager adds the process instance to its in-memory list for tracking active processes
* The MCP Servlet converts the request parameters into a Map object (described in the [Form Fields section](form-fields.html)) and initalizes the process instance.
    * The instance init method asks the process definition to parse its inputs.
      This can be overridden but it is recommended that unless you really need to, don't override the init method that ProcessDefinition inherits from FormProcessor
    * After setting all Process Definition variables from the form, the init() method is called.
    This is where you would define any one-time setup functions that do not require a resource resolver to operate.
* The MCP Servlet asks the process instance to execute the process via the `run` method.
    * After setting some basic information, the instance calls the process definitions's `buildProcess` method.
    * Any additional setup operations that require a resource resolver should come first in the Process Definition's `buildProcess` method.
    * Process Definition `buildProcess` then uses `defineAction` and `defineCriticalAction` methods of the process instance to specify each step that the process will take.  Each of these require a method reference that takes an ActionManager as a parameter.  Look at existing definitions for examples of this
    * Each step should take advantage of the deferred methods provided by Fast Action Manager.  For more information see [the Fast Action Manager documentation](../fast-action-manager/index.html).
* In the order they were defined, the process instance executes each step defined in `buildProcess`.  If a Critical step has any error, then the process will halt at the end of that step.
* At the end of each step, any new errors are recorded to the JCR.
* When the process is over, the process instance triggers the `storeReport` method as well as persisting any final information about the process.
* Upon completion or termination, the process instance is removed from memory and any future retrieval of the process will occur via the ArchivedProcessInstance class instead.

### Defining work with Fast Action Manager
The general pattern that is recommended is that the step function defers defining work immediately.  For example:

```
private void step1(ActionManager manager) {
    TreeFilteringResourceVisitor visitor = new TreeFilteringResourceVisitor();
    
    //... Set up visitor via setResourceVisitor, setLeafVisitor, etc...
    visitor.setResourceVisitor((resource, level) -> {
        manager.deferredWithResolver(rr -> {
            Resource theResource = rr.getResource(resource.getPath());
            // Note: yes you have to retrieve the resource again.  This is in a different thread!
            ... do something with theResource -- if you change it FAM will auto-commit ...
        })
    });

    manager.deferredWithResolver(rr -> {
        Resource res = rr.getResource(startingFolder);
        if (res != null) {
            visitor.accept(res);
        }
    });
}
```

Always keep in mind that resources don't like being shared across threads.  Always retrieve a fresh copy of the resource with the provided resource resolver in a deferred action.  More information about these visitors and how to use FAM are described in [the Fast Action Manager documentation](../../fast-action-manager/index.html).

### Critical actions and failure recovery
The methods `defineAction` and `defineCriticalAction` return the ActionManager used for those steps.  With these, you can register callbacks with `onSuccess`, `onFailure`, and `onFinish`.  One such example is if you create temporary structures in the first part of a process, but no undoable actions have occurred yet, you can register those actions as critial.  Then register an onFailure handler that removes the temporary structures if there is a problem.  That way should anything go wrong the system won't be cluttered with left-over garbage.

## How to add reporting
The `storeReport` method is triggered at the end of a process run.  You can do anything here but if your reporting needs are simple, it is recommended to use the [generic report](generic-report.html) if it makes sense.  See that section for more information.

## Debugging / Errors
Errors are recorded to the JCR at the end of each step.  This is covered more in the section on [error handling](error-handling.html).  Additionally, you can recover from errors by taking advantage of the retry actions and/or grouping changes using ActionBatch.  This is described further in [the Fast Action Manager documentation](../../fast-action-manager/index.html).

At the moment if the process fails during init() or buildProcess() it might not report that failure back to the user very effectively.  When in doubt, check the error.log file.

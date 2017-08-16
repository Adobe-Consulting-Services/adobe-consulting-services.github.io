---
layout: acs-aem-commons_subpage
title: MCP - How the start form is built
---

[<< back to MCP Table of Contents](../index.html)

## FormField annotations
In order for the user to instruct the process what to do, one or more variables should be declared in the Process Definition class which can be used to determine what the user wants.  These variables are local to the process definition, and so they should be declared as private and **not static.**  You indicate the field requires user input using the annotation `@FormField` like so:

```
@FormField(name="Field Name shown on form", 
    description="Shows up when user clicks (i) info icon -- optional",
    hint="value hint shown in some components -- this is optional",
    component=SomeComponent.class, // This is optional and defaults to a plain text field
    options={"base=/content/dam","multiple"}) // Some components take optional parameters!
private String myField = "defaultValue"; // The value entered by the user goes here
```

Only the name property is required.  Other annotation property values have the following defaults/behaviors:

- **Hint:** No hint shown in the UI.
- **Description:** No (i) info or popover help is provided.
- **Required:** Assumed it is required unless otherwise specified
- **Component:** Selects TextfieldComponent.class
- **Options:** Assumes default component behaviors

_**NOTE ON DEFAULT VALUES:** If you provide a default via the options array, that default value only shows in the form field, but does **not** affect the varible later on if the form field is left empty by the user.  If you want the variable to have a default in case the field is left blank, assign the value to the code when declaring the variable, e.g. in the example above it is `defaultValue`._

## Choices using Radio Buttons

In some cases you'll want the user to select between two or more options.  For example, is the process moving a node or renaming it?  Having a checkbox doesn't make sense because the user might not understand one implies the other doesn't happen, etc.  So to make this more clear first create an enumeration with all the appropriate choices like so:

```
    public static enum Mode {
        RENAME, MOVE
    };
```

For the form field use the EnumerationSelector class.  For example:

```    
@FormField(name="Mode", 
    description="Move relocates one or more folders.  Rename relocates and takes the last part of the path as the new name for one folder.",
    required=false,
    component=RadioComponent.EnumerationSelector.class,
    options={"horizontal","default=MOVE"})
    
private Mode mode;
```

This creates the options horizontally next to each other and sets the default to "MOVE" which is pre-selected when the form is generated.  Enumeration constants are made human-friendly by replacing _ and - with space and lower-casing all but the first letter.
        
## FieldComponent

In order to keep the annotation simple it was necessary to create some simple abstraction of a form field component which is able to map back to an appropriate sling component.  These are ultimately wrappers that generate synthetic resources (in-memory nodes) just long enough to ask Sling to run these through the desired components and output HTML.  So in effect you can use this synthetic node approach to generate other forms, but you'll have to familiarize yourself with the other moving parts.

The following components have been defined already:

- CheckboxComponent: true/false checkbox meant for boolean variables
- PathSelectComponent (abstract path selector, can't use directly); all store in a string variable
    * AssetSelectComponent: Allows user to browse folders and pick an asset
    * FolderSelectComponent: Allows user to browse and select a folder
    * PageSelectComponent: Allows user to browse and select a page/site
- RadioComponent: (abstract, can't use directly)
    * EnumerationSelector: Builds radio selections from enumeration indicated by variable type
- TextfieldComponent: Simple text box

It is possible to extend and add additional components by extending the FieldComponent class and implementing the init() method which evaluates options and sets up synthetic resources appropriately.  setResourceType method allows the component to indicate what sling component will render the html for the field.

## AvailableProcessDefinitions bean

This bean was built primarily for the start form dialog, but could in theory be reused to assist in generating an arbitrary form as well.  In this bean it will create a list of FieldComponent items and make them available to the HTL template if a class name is provided via the "processDefinition" field.  The code for getting this list of fields is relatively simple:

```
    Class clazz = Class.forName("com.mypackage.MyClass");
    fieldComponents = AnnotatedFieldDeserializer.getFormFields(clazz, getSlingScriptHelper());
```

## start-process-form view 

The start process form is also pretty straight-forward in how it takes the list of fields and generates the form:

```
    <sly data-sly-list.field="${processes.fieldComponents}">
        ${processes.fieldComponents[field].html}
    </sly>
```

The FieldComponent class has a method called `getHtml` which essentially is nothing more than a sling include of the resource in question.

## MCP Servlet and deserialization

The final part is a combination of the runner.js logic taking the form and using jQuery to post the data back to the MCP servlet.  If you are building your own form for some other reason, then a majority of this logic isn't needed and you can post to your own servlet.  In order to get the request parameters and populate an object with them, look at how the MCP servlet does it when starting the process:

```
    instance.init(request.getResourceResolver(), convertRequestMap(request.getParameterMap()));
```

So first the request parameters are converted from Map<String, String[]> to a Map<String, Object> format.  This was designed to be agnostic about single vs. list types so it converts the Object[] types to single Object if there is only one value for a given parameter:
```
    return parameterMap.entrySet().stream()
        .filter(entry -> !ignoredInputs.contains(entry.getKey()))
        .collect(Collectors.toMap(
            entry -> entry.getKey(),
            entry -> (Object) (entry.getValue().length == 1 ? entry.getValue()[0] : entry.getValue())
        ));
```

Eventually later on in the call stack, the FormProcessor is called to deserialize the values like so:

```
    AnnotatedFieldDeserializer.deserializeFormFields(this, input);
```
where "this" is the object that gets the values from the form and input is a ValueMap generated using a ValueMapDecorator that wraps the Map<String, Object> list created earlier.  Instead of converting parameters into a value map, you could also have retrieved them from a JCR resource and do this operation for other use cases.  This might seem like a roundabout way to manage this operation, but the goal was to support restarting a process, so capturing the process inputs in JCR is required for that.  Using ValueMap for this logic seemed more apporpriate at the time it was written.
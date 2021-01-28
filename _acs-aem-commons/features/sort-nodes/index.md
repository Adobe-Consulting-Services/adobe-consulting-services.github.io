---
layout: acs-aem-commons_feature
title: Sort JCR Nodes
description: Need to alphabetize child pages or tags?
feature-tags: authoring administration
---

## Purpose

Sort Nodes is a tool to sort child nodes by node name or jcr:title, for example, to alphabetize pages or tags in Sites Admin .

## How to Use

### AEM GUI
In AEM, navigate to the Tools > ACS AEM Commons > Sort JCR Nodes

In the path field, enter the the target path to sort. You can choose whether to sort by node name (default) or by jcr:title and whether sort should be case-sensitive.

![Sort Nodes - Web UI](images/sort-nodes.png)

### HTTP POST

The code in ACS Commons extends the [Sling POST Servlet](https://sling.apache.org/documentation/bundles/manipulating-content-the-slingpostservlet-servlets-post.html) with the `acs-commons:sortNodes` operation which makes the sorting operation script-friendly. 

####  sort children of /content/someFolder by node name, case-insensitive (defaults)
```
curl -F":operation=acs-commons:sortNodes" http://localhost:4502/content/someFolder
```
####  sort children of /content/someFolder by jcr:title, case-sensitive 
```
curl -F":operation=acs-commons:sortNodes" \
-F":byTitle=true" \
-F":caseSensitive=true" \
http://localhost:4502/content/someFolder
```


### Request Parameters
#### `:byTitle`

whether to sort nodes by jcr:title (default: `false`). The code will use the value of the jcr:title property of the underlying node or of it's jcr:content child node if it exists or default to node name of jcr:title was not found.

#### `:caseSensitive`

whether sort should be case sensitive (default: `false`), e.g.
```  
+  /content/someFolder
     -  a           
     -  A           
     -  b           
     -  B           
```
You can turn it off by setting the `-F":caseSensitive=true"` request parameter and the order will change to
```  
+  /content/someFolder
     -  A           
     -  B           
     -  a           
     -  b           
```

#### `:nonHierarchyFirst`

whether the sort should move non-hierarchy nodes to the top (default: `true`)

The default value is `true` which means jcr:content, rep:policy and such will be sorted first followed by other, hierarchy nodes like cq:Page, e.g. 
```  
+  /content/someFolder
     -  jcr:content // non-hierarchy
     -  rep:policy  // non-hierarchy
     -  a           // cq:Page
     -  b           // cq:Page
     -  c           // cq:Page
     -  p           // cq:Page
```

You can turn it off by setting the `-F":nonHierarchyFirst=false"` parameter
which will switch the mode to sort nodes regardless if they are `nt:hierarchyNode` or not
```  
+  /content/someFolder
     -  a           // cq:Page
     -  b           // cq:Page
     -  c           // cq:Page
     -  jcr:content // non-hierarchy
     -  p           // cq:Page
     -  rep:policy  // non-hierarchy
```


 


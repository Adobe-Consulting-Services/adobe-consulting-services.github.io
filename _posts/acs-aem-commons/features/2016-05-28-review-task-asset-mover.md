---
layout: acs-aem-commons_feature
title: Review Task Asset Mover
description: Automatically move reviewed assets!
date: 2016-05-28
thumbnail: /images/review-task-asset-mover/thumbnail.png
feature-tags: authoring
tags: acs-aem-commons-features new
categories: acs-aem-commons features
initial-release: 2.5.0/3.1.0
---

## Purpose

Automatically move approved and rejected assets from the Review Task view to configurable Asset folders.

## How to use

Use a Sling Merge to add the following inputs to the Review Task creation wizard. The key elements are collection the paths in properties name `onApproveMoveTo` and `onRejectMoveTo`. Valid values are absolute paths to folders under `/content/dam`.

Examples for AEM 6.0/6.1 and AEM 6.2 are provided below.

### AEM 6.0/6.1 Example

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="cq:Page">
    <jcr:content
        jcr:primaryType="nt:unstructured">
        <content jcr:primaryType="nt:unstructured">
            <items jcr:primaryType="nt:unstructured">
                <createwizard jcr:primaryType="nt:unstructured">
                    <items jcr:primaryType="nt:unstructured">
                        <step1 jcr:primaryType="nt:unstructured">
                            <items jcr:primaryType="nt:unstructured">
                                <properties jcr:primaryType="nt:unstructured">
                                    <items jcr:primaryType="nt:unstructured">
                                        <on-approve
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
                                            fieldLabel="On Approve Move To"
                                            name="onApproveMoveTo"
                                            predicate="folder"
                                            rootPath="/content/dam"/>
                                        <on-reject
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
                                            fieldLabel="On Reject Move To"
                                            name="onRejectMoveTo"
                                            predicate="folder"
                                            rootPath="/content/dam"/>
                                    </items>
                                </properties>
                            </items>
                        </step1>
                    </items>
                </createwizard>
            </items>
        </content>
    </jcr:content>
</jcr:root>

{% endhighlight %}


### AEM 6.2 Example

`/apps/dam/gui/content/projects/addtask`

{% highlight xml %}
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="cq:Page">
    <jcr:content jcr:primaryType="nt:unstructured">
        <body jcr:primaryType="nt:unstructured">
            <items jcr:primaryType="nt:unstructured">
                <form jcr:primaryType="nt:unstructured">
                    <items jcr:primaryType="nt:unstructured">
                        <wizard jcr:primaryType="nt:unstructured">
                            <items jcr:primaryType="nt:unstructured">
                                <tabs jcr:primaryType="nt:unstructured">
                                    <items jcr:primaryType="nt:unstructured">
                                        <basic jcr:primaryType="nt:unstructured">
                                            <items jcr:primaryType="nt:unstructured">
                                                <singlecontainer jcr:primaryType="nt:unstructured">
                                                    <items jcr:primaryType="nt:unstructured">
                                                        <on-approve
                                                            jcr:primaryType="nt:unstructured"
                                                            fieldLabel="On Approve Move To"
                                                            sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
                                                            name="onApproveMoveTo"
                                                            predicate="folder"
                                                            rootPath="/content/dam"/>
                                                        <on-reject
                                                            jcr:primaryType="nt:unstructured"
                                                            fieldLabel="On Reject Move To"
                                                            sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
                                                            name="onRejectMoveTo"
                                                            predicate="folder"
                                                            rootPath="/content/dam"/>
                                                    </items>
                                                </singlecontainer>
                                            </items>
                                        </basic>
                                    </items>
                                </tabs>
                            </items>
                        </wizard>
                    </items>
                </form>
            </items>
        </body>
    </jcr:content>
</jcr:root>

{% endhighlight %}

![Review Task Creation Wizard](/acs-aem-commons/images/review-task-asset-mover/image-1.png)

![Review Task UI](/acs-aem-commons/images/review-task-asset-mover/image-2.png)

![Assets with Move Assets](/acs-aem-commons/images/review-task-asset-mover/image-3.png)

![Approved Assets](/acs-aem-commons/images/review-task-asset-mover/image-4.png)

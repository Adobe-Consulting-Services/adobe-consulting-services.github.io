---
layout: acs-aem-commons_feature
title: Watson Speech to Text Integration
description: Transcribe your asset
date: 2016-09-06
thumbnail: /images/speech-to-text/thumbnail.png
feature-tags: authoring
tags: acs-aem-commons-features
categories: acs-aem-commons features
initial-release: 3.3.0
---

> This feature is AEM 6.2 ONLY!

## Purpose

Use [IBM's Watson](https://www.ibm.com/watson/developercloud/speech-to-text.html) Speech to Text transcription service to extract transcriptions from Assets.

## How to Use

The way this works is that when a video or audio file is run through the `TranscriptionProcess` workflow process,
it first generates a FLAC file of just the audio, then passes that file to the Watson web service, getting a Job ID back.
The workflow process then polls to see if the job is complete, finally saving the rest of the process into a rendition of
the asset named **transcription.txt**.

To use this, first create a configuration for `com.adobe.acs.commons.http.impl.HttpClientFactoryImpl` (with some unique name)
with `factory.name` property set to `watson-speech-to-text`, the credentials and hostname for Watson.

For example, on the hosted BlueMix platform, this might look like:

{% highlight json %}
{
  "jcr:primaryType":"sling:OsgiConfig",
  "factory.name":"watson-speech-to-text",
  "hostname":"stream.watsonplatform.net",
  "username":"1aa30b41-a015-4a6c-a335-aad71b6ec8fd",
  "use.ssl":true,
  "port":443,
  "password":"XXXX"
}
{% endhighlight %}

Then, add the `Transcription Process` to a workflow (either the `DAM Update Asset Workflow` or a separate workflow).

Watson automatically chunks the audio based on pauses and attaches a timecode to each chunk. These time-codes are used in the transcription.txt rendition like this:


    [0.66s]: hello hello hello
    [3.27s]: hello hello hello hello


## FFMPEG Configuration

In order for this process to work, FFmpeg must be installed and must be on your path. See [the AEM documentation](https://docs.adobe.com/docs/en/aem/6-2/administer/operations/page-authoring/config-video.html)
for general instructions for installing FFmpeg.

FFmpeg must also be capable of creating FLAC file. To confirm, this you can run `ffmpeg -formats` and confirm that flac is listed like this:

     DE flac            raw FLAC

You can also go to the `flacmono` Video Profile page in AEM (i.e. http://localhost:4502/etc/dam/video/flacmono.html) and upload a 
test file.
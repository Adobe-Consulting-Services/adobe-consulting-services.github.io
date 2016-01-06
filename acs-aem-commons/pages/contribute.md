---
layout: acs-aem-commons_default
title: Contribute
---

Contributions to ACS AEM Commons are welcome from all parties, including Adobe, our partners, and customers. Contributions can include new features, improvements to existing features, bug fixes, and documentation. New code contributions should be primarily made using GitHub pull requests, following the Fork and Pull workflow.

## Video Tutorial

<style type="text/css">
    #s7interactivevideo_div.s7interactivevideoviewer {
         width: 57%;
        margin-left: auto;
        margin-right: auto;
    }
</style>
<script type="text/javascript" src="http://justinedelson.assetsadobe.com/etc/dam/viewers/s7viewers/html5/js/InteractiveVideoViewer.js"></script>
<div id="s7interactivevideo_div"></div>
<script type="text/javascript">
    (function() {
        var onUserEvent = function(event) {
                if (event.s7event.trackEvent === s7sdk.event.UserEvent.INTERACTIVE_SWATCH) {
                    digitalData.event.push({
                        href : event.s7event.data[0],
                        location : 'sidebar'
                        });
                    if (_satellite) {
                        _satellite.track("video-click");
                    }
                } else if (event.s7event.trackEvent === s7sdk.event.UserEvent.INTERACTIVE_THUMBNAIL_GRID_VIEW_SWATCH) {
                    digitalData.event.push({
                        href : event.s7event.data[0],
                        location : 'endslate'
                        });
                    if (_satellite) {
                        _satellite.track("video-click");
                    }
                }
            },
            onInteractiveData = function(event) {
                var interactiveDataProperties = event.s7event.data.properties,
                    title = (interactiveDataProperties) ? interactiveDataProperties.title : null;
                digitalData.videoInfo.title = title;
            },
            videoViewer = new s7viewers.InteractiveVideoViewer({
                "containerId" : "s7interactivevideo_div",
                "params" : { 
                    "serverurl" : "http://justinedelson.assetsadobe.com/is/image",
                    "contenturl" : "http://justinedelson.assetsadobe.com/", 
                    "config" : "/etc/dam/presets/viewer/Shoppable_Video_light",
                    "config2" : "/etc/dam/tenants/justinedelson/presets/analytics",
                    "videoserverurl": "https://gateway-na.assetsadobe.com/DMGateway/public/justinedelson",
                    "interactivedata": "is/content/content/dam/mac/justinedelson/_VTT/aemcasts/Contributing.mp4.svideo.vtt",
                    "asset" : "/content/dam/mac/justinedelson/aemcasts/Contributing.mp4"
                },
                "handlers":{
                    "trackEvent": function(objID, compClass, instName, timeStamp, eventInfo) {
                        var eventData = eventInfo.split(","),
                            eventType = eventData[0];

                        if (eventType === s7sdk.event.UserEvent.PLAY) {
                            if (_satellite) {
                                _satellite.track("video-play");
                            }
                        }
                    },
                    "initComplete" : function() {
                        var videoPlayer = videoViewer.getComponent("videoPlayer"),
                            interactiveSwatches = videoViewer.getComponent("interactiveSwatches"),
                            callToAction = videoViewer.getComponent("interactiveThumbnailGridView"); 

                        digitalData.videoInfo.id = videoViewer.params.asset;
                        videoPlayer.addEventListener(s7sdk.event.InteractiveDataEvent.NOTF_INTERACTIVE_DATA, onInteractiveData, false);
                        interactiveSwatches.addEventListener(s7sdk.event.UserEvent.NOTF_USER_EVENT, onUserEvent, false);
                        callToAction.addEventListener(s7sdk.event.UserEvent.NOTF_USER_EVENT, onUserEvent, false);
                    }
                }
            });

        digitalData.videoInfo = {
            streamType: "vod",
            playerName: "Interactive"
        };
        videoViewer.init();
        window.videoViewer = videoViewer;
    })();
</script>

## More Information

More detailed information can be found <a href="https://github.com/Adobe-Consulting-Services/acs-aem-commons/blob/master/CONTRIBUTING.md">here</a>.

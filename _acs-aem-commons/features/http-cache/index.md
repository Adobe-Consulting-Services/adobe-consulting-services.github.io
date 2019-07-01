---
layout: acs-aem-commons_feature
title: HTTP Cache
description: Cache the uncacheable!
date: 2015-12-05
redirect_from: /acs-aem-commons/features/http-cache.html
feature-tags: backend-dev
initial-release: 2.2.0
last-updated-release: 4.0.0

---

> Since AEM 6.0, AEM provides an OOTB in-memory HTTP cache for anonymous requests with a 60sec TTL. Please evaluate if this simple cache is sufficient before using this HTTP cache. This HTTP Cache was designed explicitly for more complex use-cases the OOTB AEM HTTP Cache does not cover. Also ensure that AEM Dispatcher caching is insufficient for your use case.

## Purpose
HttpCache provides an effective way to improve performance of an application by caching the full output of a http request and then bypassing the request processing entirely on each subsequent requests. It's ideal for meeting performance requirements for cacheable http requests which costs high compute time. HttpCache works irrespective of run-modes.

### Features
* Caches anonymous and authenticated requests.
* Supports caching personalized requests.
	* Authentication Group based caching provided OOTB.
	* Request parameter, header, cookie based caching provided OOTB.
	* HTTP Request Query Param, HTTP Request Attribute, HTTP Cookie, and Sling Resource property based caching provided OOTB.
	* Mechanism exposed to plugin additional custom logic for handling personalized requests.
* Super flexible cache configs tied to URIs supported.
	* Allows extending cache configs.
	* Allows multiple cache configs.
* Developer hook exposed to plugin custom rules on key cache handling events such as
	* On request receive.
	* On response cache
	* On response deliver
	* On cache invalidate
* Provides mechanism to plugin custom cache keys.
* Pluggable cache persistence model.
	* In-memory, Caffeine & JCR implementation provided OOTB
	* Allows multiple cache stores to co-exist.
* Invalidation mechanism based on JCR paths and Sling jobs.
	* Sample JCR change event handler based invalidation supplied.
	In-memory cache store supports TTL.
* Provides powerful instrumentation based on JMX MBean.
* Since v2.6.0/3.2.0 HTTP Cache now supports caching that the Sling Include level (as well as the original Sling Request level)
* Since 4.0.0 HTTP Cache supports per config based TTL (overrides global) for JCR store and Caffeine store (requires [Caffeine bundle](https://mvnrepository.com/artifact/com.github.ben-manes.caffeine/caffeine)).
* Since 4.0.0 Provides OOTB cache config extensions: RequestCookieHttpCacheConfigExtension, RequestHeaderHttpCacheConfigExtension,RequestParameterHttpCacheConfigExtension, ResourcePropertiesHttpCacheConfigExtension
    
## Table of Contents

### Overview
This section covers usage and is written for end-users, system administrators, and developers.

[Architectural Design Overview](subpages/architectural-design.html): Overview of the module architecture

### Getting started

* [Base config](subpages/base-config.html): Creating a basic configuration to get started caching
* [Config extensions](subpages/config-extensions.html): Extending the basic configuration with OOTB extensions using `sling:OsgiConfig`
* [Cache invalidation](subpages/invalidation.html): Invalidation mechanisms to prevent stale content

### Advanced

* [Custom config extension](subpages/creating-config-extension.html): Create your own config extension for specific business logic
* [Custom key factory](subpages/creating-key-factory.html): Create your own key factory for specific business logic
* [Custom cache store](subpages/creating-cache-store.html): Create your own cache store
* [Handling rules](subpages/handling-rules.html): Toggle handling rules (such as don't cache response code 500) and / or create your own rules
* [Response Cookie / Response Header exclusion](subpages/cookie-header-exclusions.html) : Specify headers / cookies that should not be included in the cache (Since 4.3.0)

### Instrumentation

* [JMX consoles](subpages/jmx.html): Available JMX instrumentation consoles
* [Activating Caffeine Store](subpages/activating-caffeine-cache.html): Activating the Caffeine in-memory cache store

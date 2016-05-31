adobe-consulting-services.github.io
===================================

[http://adobe-consulting-services.github.io/](http://adobe-consulting-services.github.io/)

ACS AEM Projects github pages repo; These gh-pages site is broken up by Project:

1. ACS AEM Projects - http://adobe-consulting-services.github.io/
2. ACS AEM Commons - http://adobe-consulting-services.github.io/acs-aem-commons
3. ACS AEM Tools - http://adobe-consulting-services.github.io/acs-aem-tools

----

## Structure

The file structure is broken out by projects (acs-aem-commons, acs-aem-tools, shared). Files under the "shared" folders can be used acrossed projects (ex. feature-cards).


* `/_data/<project>.yml`
  * _data files contain "global" data points for each project. Ex: `{{ site.data.<project>.version }}`


* `/_includes/<project>`
  * _includes are "partials" that can be reused through the sites. `/_includes/shared` can be used across projects.
  * 
  
* `/_layouts/<project>_<layout>.html` 
  * _layouts live in a flat structure prefixed by the project name. _layouts typically do not have re-use across sites; but can include `_include/shared` files.

* `/_posts/<project>/features|news/*.html`
  * _posts contain the Features and News "posts" for each project. The "feature" and "news" folders (unfortunately) do not influence the permalinks, which requires the categories to be set on each post accordingly. (See below).
  

* `/acs-aem-commons|acs-aem-tools`
  * These project folders contain the `index.html` for each project along w any `/<project>/pages/*.html` such as maven integration instructions, or 3rd party deps.

* `/acs-aem-commons|acs-aem-tools/images`
  * Contains images used by the Features or News posts.

* `/assets/<project>`
  * assets contain front-end assets such as JS, CSS (compiled from the LESS under /lib) and static images.

* `/lib`
  * LESS files compiled via `/libs/build_less.sh` which copies the compiled CSS to the proper `/assets/<project>/css/styles.css` file.

* `/pages`
  * ACS AEM Projects site specific pages

* `/index.html`
  *  The ACS AEM Projects home page
  
## Feature Docs/News Front-matter

The following front matter is required

```
---
layout: <project>_<layout>
title: Post title
description: Post description
date: 2014-01-01 # Time not required
thumbnail: /images/default/thumbnail.png #relative to `/<project>`
feature-tags: standard || component-dev || backend-dev || authoring || administration
tags: <project>-features || <project>-news && new || updated
categories: <project> features || news 
initial-release: 1.0.0
---
```

Example:

```
---
layout: acs-aem-commons_feature
title: Component Helper
description: Simplify your components
date: 2013-06-10
thumbnail: /images/default/thumbnail.png
feature-tags: standard authoring
tags: acs-aem-commons-features
categories: acs-aem-commons features
initial-release: 1.0.0
---
```

Note: `feature-tags` will only effect Feature Filtering on ACS AEM Commons; it will be ignored on other sites.

Thumbnail images for features should ba named `thumbnail.png` and be a native `400 width x 200 height pixels`.

## LESS/CSS

LESS/CSS is maintained under /lib as LESS, and compiled via `./build_less` which compiles each project specific set of LESS files, and copies them to `/assets/<project-name>/css/styles.css`. **This mean no changes to LESS/CSS should be made directly under `/assets`.**

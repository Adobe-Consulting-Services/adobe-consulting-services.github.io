adobe-consulting-services.github.io
===================================

[http://adobe-consulting-services.github.io/](http://adobe-consulting-services.github.io/)

ACS AEM Projects github pages repo; These gh-pages site is broken up by Project:

1. ACS AEM Projects - http://adobe-consulting-services.github.io/
2. ACS AEM Commons - http://adobe-consulting-services.github.io/acs-aem-commons
3. ACS AEM Tools - http://adobe-consulting-services.github.io/acs-aem-tools
4. ACS AEM Samples - http://adobe-consulting-services.github.io/acs-aem-samples

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

* `/(_acs-aem-commons|_acs-aem-tools)/features/<feature-name>.md`
  * _acs-aem-comons|_acs-aem-tools contain the Features docs for each feature of the project.
  * Each feature has a named folder, with this folder is: 
    * `index.md` which is the feature doc page
    * `thumbnail.png` which is the feature thumbnail (displays on the cards)
    * `images` folder that contains any images used in the `index.md`
    * Optionally sub-features will have their own folders that themselves follow this pattern

* `/_announcements/(acs-aem-commons|acs-aem-tools)/<X-X-X>.txt`
  * _announcements contain the Features and News "posts" for each project. 
  * announcement docs must have a front-matter metadata `project` with values `acs-aem-commons` or `acs-aem-tools` in order to display on the correct project site.

* `/acs-aem-commons|acs-aem-tools|acs-aem-samples`
  * These project folders contain the `index.html` for each project along w any `/<project>/pages/*.html` such as maven integration instructions, or 3rd party deps.

* `/assets/<project>`
  * assets contain front-end assets such as JS, CSS (compiled from the LESS under /lib) and static images.

* `_sass`
  * The shared SCSS files; these are included on each project site via the appropriate `/assets/<project>/css/styles.scss`

* `/lib`
  * Sources files used for for this sites development (currently PSD and image files) 
  
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
feature-tags: standard || component-dev || backend-dev || authoring || administration
tags:  new || updated || deprecated
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
feature-tags: standard authoring
tags: deprecated
initial-release: 1.0.0
---
```

Note: `feature-tags` will only effect Feature Filtering on ACS AEM Commons; it will be ignored on other sites.

Thumbnail images for features should ba named `thumbnail.png` and be a native `400 width x 200 height pixels`.

## Sub-feature pages

Feature pages can aggregate a card-view of subfeatures. For example, Workflow Process has sub-features, each sub-feature representing a discrete Workflow Process provided by the AEM ACS Commons project.

To create a sub-feature card list that automatically reads the feature-docs that reside beneath it in feature doc collection: (_acs-aem-commons/features/<feature>/<sub-feature>) add the following include to the feature's `index.md`
 
 ```
 {% include acs-aem-commons/sub-features.html %}
```

Note this sub-feature list is only available for ACS AEM Commons.

## Building

This site is built using Jekyll.  To build this sitel locally you must have already installed Ruby, Bundle, and Jekyll.  With these installed you can do the follow:
```
bundle exec jekyll build
```

Or alternatively to build and serve locally for review:
```
bundle exec jekyll serve
```

More information can be found here: [https://jekyllrb.com/](https://jekyllrb.com/)
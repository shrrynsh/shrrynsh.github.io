# Tessera

Tessera is a Jekyll theme designed with content creators in mind, but like any other Jekyll theme, it can be used by anyone.

Tessera features three main components: two side panels and a central content area. The theme is highly modular, allowing you to easily customize any component by overriding the `_includes`.

## Installation

Add this line to your Jekyll site's `Gemfile`:

```ruby
gem "tessera-jekyll-theme"
```

Then add this line to your Jekyll site's `_config.yml`:

```yaml
theme: tessera-jekyll-theme
```

And then execute:

```
$ bundle
```

Or install it manually with:

```
$ gem install tessera-jekyll-theme
```
### GitHub Pages
Instead of doing the above steps, define this in your `_config.yml`, removing also `theme`:

```
# theme: something # remove this
remote_theme: itszariep/Tessera # add this
```


## Dependencies
Tessera needs the following Jekyll plugins to function properly:

  - jekyll-paginate (Pagination in main page)
  - jekyll-archives (See posts matching category)
  
  
## Post-install setup

### Search
Search needs /`search.json`:

```
---
layout: null
---
[
  {% for post in site.posts %}
    {
      "title": "{{ post.title | escape }}",
      "url": "{{ site.baseurl }}{{ post.url }}",
      "date": "{{ post.date | date: "%B %-d, %Y" }}",
      "content": "{{ post.content | strip_html | strip_newlines | escape }}"
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]

```

### Social Media Preview on non-post pages
set this on your `_config.yml`:
```
defaults:
  -
    scope:
      path: ""
      type: "pages"
    values:
      image: /preview.jpg
```

> Image need to be always /preview.jpg


### Pagination
Pagination needs setup on two files:

on `_config.yml`:

```
paginate: 9
paginate_path: "/page:num/"
```

on `index.html`

```
---
layout: home
title: [Your index title]
paginate: 9
---
```

> 9 is the number of post per section, you can change it to have more o less post on grid per section


### Archives (Categories)
Archives needs setup on `_config.yml`:

```
jekyll-archives:
  enabled:
    - categories
  layout: archive
  permalinks:
    category: '/categories/:name/'
```

> [!NOTE]  
> Github Pages does not support Jekyll Archives, if you want this feature please use Github Actions instead

### Date format
Date format is configurable on `_config.yml`:

```
date_format: "%d/%m/%Y" # dd/mm/yy
```

### Social links
Like any other Jekyll theme, you need to setup your social links on `_config.yml`:

```
social_links:
  - name: Twitter
    url: https://twitter.com/yourprofile
    icon: twitter
  - name: GitHub
    url: https://github.com/yourprofile
    icon: github
  - name: LinkedIn
    url: https://linkedin.com/in/yourprofile
    icon: linkedin
```


## Customizing

### Layouts
To start customizing Tessera, copy any of the `_includes` components you'd like to modify:

* `toppane.html`: Header
* `leftpane.html`: Left side of the page
* `postgrid.html`: Post grid of the main page
* `pagination-controls.html`: Pagination controls for the main page
* `postcontent.html`: Content of a post
* `userbox.html`: User box displayed below the post content
* `comments.html`: Optional (currently unimplemented) comments section; by default, an example using Utterances is commented out. You can integrate any custom comment system via JavaScript.
* `rightpane.html`: Right side of the page
* `searchbar.html`: Search bar (requires JavaScript)
* `bottompane.html`: Footer for all pages

### Styles
Create `assets/css/custom.css`, this file will serve as override without having to modify entire CSS, so you can edit specific elements you want

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/itszariep/tessera](https://github.com/itszariep/tessera). This project aims to be a safe and welcoming space for collaboration. All contributors are expected to adhere to the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.

## License

This theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
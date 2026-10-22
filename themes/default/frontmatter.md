---
url: /themes/default/frontmatter.md
---
# Frontmatter

## All Pages

Frontmatter in this section will take effect in all types of pages.

::: fields
@`externalLinkIcon` type=boolean

Show external link icon on external links or not.

See also: [externalLinkIcon](./config.md#externallinkicon)

@`navbar` type=boolean

Show navbar on this page or not.

If you disable navbar in theme config, this frontmatter will not take effect.

See also: [navbar](./config.md#navbar)

@`pageClass` type=string

Add extra class name to this page.

```md
---
pageClass: custom-page-class
---
```

Then you can customize styles of this page in `.vuepress/styles/index.scss` file:

```scss
[vp-container].custom-page-class {
  /* page styles */
}
```

See also: [Style File](./styles.md#style-file)

:::

## Home Page

Frontmatter in this section will only take effect in home pages.

::: fields
@`home` type=boolean

Specify whether the page is homepage or a normal page.

If you don't set this frontmatter or set it to `false`, the page would be a [normal page](#normal-page).

```md
---
home: true
---
```

@`heroImage` type=string

Specify the url of the hero image.

```md
---
# public file path
heroImage: /images/hero.png
# url
heroImage: https://vuepress.vuejs.org/images/hero.png
---
```

See also: [Guide > Assets > Public Files](https://v2.vuepress.vuejs.org/guide/assets.html#public-files)

@`heroImageDark` type=string

Specify the url of hero image to be used in dark mode.

You can make use of this option if you want to use different heroImage config in dark mode.

See also: [heroImage](#heroimage) and [colorMode](./config.md#colormode)

@`heroAlt` type=string

Specify the `alt` attribute of the hero image.

This will fallback to the [heroText](#herotext).

@`heroHeight` type=number default=`280`

Specify the `height` attribute of the hero `<img>` tag.

You may need to reduce this value if the height of your hero image is less than the default value.

Notice that the height is also constrained by CSS. This attribute is to reduce [Cumulative Layout Shift (CLS)](https://web.dev/cls/) that caused by the loading of the hero image.

@`heroText` type=`string | null`

Specify the the hero text.

This will fallback to the site [title](https://v2.vuepress.vuejs.org/reference/config.html#title).

Set to `null` to disable hero text.

@`tagline` type=`string | null`

Specify the the tagline.

This will fallback to the site [description](https://v2.vuepress.vuejs.org/reference/config.html#description).

Set to `null` to disable tagline.

@`actions` type=`Array<{ text: string; link: string; type?: 'primary' | 'secondary' }>`

Configuration of the action buttons.

```md
---
actions:
  - text: Get Started
    link: /guide/getting-started.html
    type: primary
  - text: Introduction
    link: /guide/introduction.html
    type: secondary
---
```

@`features` type=`Array<{ title: string; details: string }>`

Configuration of the features list.

```md
---
features:
  - title: Simplicity First
    details: Minimal setup with markdown-centered project structure helps you focus on writing.
  - title: Vue-Powered
    details: Enjoy the dev experience of Vue, use Vue components in markdown, and develop custom themes with Vue.
  - title: Performant
    details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
---
```

@`footer` type=string

Specify the content of the footer.

@`footerHtml` type=boolean

Allow HTML in footer or not.

If you set it to `true`, the [footer](#footer) will be treated as HTML code.

:::

## Normal Page

Frontmatter in this section will only take effect in normal pages.

::: fields
@`editLink` type=boolean

Enable the *edit this page* link in this page or not.

See also: [editLink](./config.md#editlink)

@`editLinkPattern` type=string

Specify the pattern of the *edit this page* link of this page.

See also: [editLinkPattern](./config.md#editlinkpattern)

@`lastUpdated` type=boolean

Enable the *last updated timestamp* in this page or not.

See also: [lastUpdated](./config.md#lastupdated)

@`contributors` type=boolean

Enable the *contributors list* in this page or not.

See also: [contributors](./config.md#contributors)

@`sidebar` type=`false | SidebarOptions`

Configure the sidebar of this page.

See also: [sidebar](./config.md#sidebar)

@`sidebarDepth` type=number

Configure the sidebar depth of this page.

See also: [sidebarDepth](./config.md#sidebardepth)

@`prev` type=`AutoLinkConfig | string | false`

Specify the link of the previous page.

If you don't set this frontmatter, the link will be inferred from the sidebar config.

To configure the prev link manually, you can set this frontmatter to a `AutoLinkConfig` object or a string:

* A `AutoLinkConfig` object should have a `text` field and a `link` field.
* A string should be the path to the target page file. It will be converted to a `AutoLinkConfig` object, whose `text` is the page title, and `link` is the page route path.
* Set to `false` to disable the prev link.

```md
---
# AutoLinkConfig
prev:
  text: Get Started
  link: /guide/getting-started.html

# AutoLinkConfig - external url
prev:
  text: GitHub
  link: https://github.com

# string - page file path
prev: /guide/getting-started.md

# string - page file relative path
prev: ../../guide/getting-started.md
---
```

@`next` type=`AutoLinkConfig | string | false`

Specify the link of the next page.

If you don't set this frontmatter, the link will be inferred from the sidebar config.

The type is the same as [prev](#prev) frontmatter.

:::

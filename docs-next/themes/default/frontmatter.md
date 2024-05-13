# Frontmatter

<NpmBadge package="@vuepress/theme-default" />

## All Pages

Frontmatter in this section will take effect in all types of pages.

### pageClass

- Type: `string`

- Details:

  Add extra class name to this page.

- Example:

```md
---
pageClass: custom-page-class
---
```

Then you can customize styles of this page in `.vuepress/styles/index.scss` file:

```scss
.theme-container.custom-page-class {
  /* page styles */
}
```

- Also see:
  - [Default Theme > Styles > Style File](./styles.md#style-file)

### pageLayout

- Type: `doc | home | page`
- Default: `doc`

Determines the layout of the page.

- `doc` - It applies default documentation styles to the markdown content.
- `home` - Special layout for "Home Page". You may add extra options such as `hero` and `features` to rapidly create beautiful landing page.
- `page` - Behave similar to `doc` but it applies no styles to the content. Useful when you want to create a fully custom page.

```yaml
---
pageLayout: doc
---
```

### navbar

- Type: `boolean`

- Default: `true`

- Details:

  Whether to display [navbar](./config.md#navbar).

```md
---
navbar: false
---
```

### externalLinkIcon

- Type: `boolean`

- Details:

  Show external link icon in Markdown links.

```md
---
externalLinkIcon: false
---
```

### footer

- Type: `boolean`

- Details:

  Whether to display [footer](./config.md#footer).

## Home Page

Frontmatter in this section will only take effect in home pages.

### home

- Type: `boolean`

- Details:

  Specify whether the page is homepage or a normal page.

  If you don't set this frontmatter or set it to `false`, the page would be a [normal page](#normal-page).

- Example:

```md
---
home: true
---
```

### hero

Defines contents of home hero section when `pageLayout` is set to `home`.

```md
---
home: true
hero:
  image: /images/hero.png
  name: VuePress Ecosystem
  text: VuePress official themes and plugins
  tagline: A Vue-powered Static Site Generator
---
```

#### hero.image

- Type: `DefaultThemeImage`

- Details:

  Specify the url of the hero image.

- Also see:
  - [Guide > Assets > Public Files](https://v2.vuepress.vuejs.org/guide/assets.html#public-files)

#### hero.name

- Type: `string`

- Details:

  Specify the the hero name.

#### hero.text

- Type: `string`

- Details:

  Specify the the hero text.

#### hero.tagline

- Type: `string | null`

- Details:

  Specify the the tagline.

  This will fallback to the site [description](https://v2.vuepress.vuejs.org/reference/config.html#description).

  Set to `null` to disable tagline.

### actions

- Type: `HeroAction[]`

```ts
interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
  target?: string
  rel?: string
}
```

- Details:

  Configuration of the action buttons.

- Example:

```md
---
actions:
  - text: Get Started
    link: /guide/getting-started.html
    theme: brand
  - text: Introduction
    link: /guide/introduction.html
    theme: alt
---
```

### features

- Type: `Feature[]`

```ts
interface Feature {
  icon?: FeatureIcon
  title: string
  details: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}

export type FeatureIcon =
  | string
  | {
      src: string
      alt?: string
      width?: string
      height?: string
      wrap?: boolean
    }
  | {
      light: string
      dark: string
      alt?: string
      width?: string
      height?: string
      wrap?: boolean
    }
```

- Details:

  Configuration of the features list.

- Example:

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

## Normal Page

Frontmatter in this section will only take effect in normal pages.

### editLink

- Type: `boolean`

- Details:

  Enable the _edit this page_ link in this page or not.

- Also see:
  - [Default Theme > Config > editLink](./config.md#editlink)

### editLinkPattern

- Type: `string`

- Details:

  Specify the pattern of the _edit this page_ link of this page.

- Also see:
  - [Default Theme > Config > editLinkPattern](./config.md#editlinkpattern)

### lastUpdated

- Type: `boolean`

- Details:

  Enable the _last updated timestamp_ in this page or not.

- Also see:
  - [Default Theme > Config > lastUpdated](./config.md#lastupdated)

### contributors

- Type: `boolean`

- Details:

  Enable the _contributors list_ in this page or not.

- Also see:
  - [Default Theme > Config > contributors](./config.md#contributors)

### sidebar

- Type: `boolean`

- Details:

  Whether to display the sidebar of this page.

- Also see:
  - [Default Theme > Config > sidebar](./config.md#sidebar)

### aside

- Type: `boolean | 'left'`

- Default: `true`

- Details:

  Defines the location of the aside component in the `doc` layout.

  - Setting this value to `false` prevents rendering of aside container.\
  - Setting this value to `true` renders the aside to the right.\
  - Setting this value to `'left'` renders the aside to the left.

```yaml
---
aside: false
---
```

### outline

- Type: `number | [number, number] | 'deep' | false`

- Default: `2`

- Details:

  The levels of header in the outline to display for the page.
  It's same as [outline](./config.md#outline), and it overrides the value set in site-level config.

### prev

- Type: `string | false | { text?: string; link?: string }`

- Details:

  Specifies the text/link to show on the link to the previous page. If you don't set this in frontmatter, the text/link will be inferred from the sidebar config.

- Example:

```md
---
# NavLink
prev:
  text: Get Started
  link: /guide/getting-started.html

# NavLink - external url
prev:
  text: GitHub
  link: https://github.com

# string - page file path
prev: /guide/getting-started.md

# string - page file relative path
prev: ../../guide/getting-started.md
---
```

### next

- Type: `string | false | { text?: string; link?: string }`

- Details:

  Specify the link of the next page.

  If you don't set this frontmatter, the link will be inferred from the sidebar config.

  The type is the same as [prev](#prev) frontmatter.

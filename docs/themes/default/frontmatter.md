---
icon: file-text
---

# Frontmatter

Frontmatter configures a single page, while the [theme options](./config.md) configure the whole site. The fields documented on this page are the ones the theme reads; fields of the VuePress core and of the plugins (`title`, `lang`, `description`, `head`, `icon`, `date`, …) work as usual and are not repeated here.

```md
---
type: doc
outline: [2, 3]
editLink: false
---

# Page Title
```

## Page Type

:::: fields
@`type` type=`'home' | 'doc' | 'page' | 'content'` default=`'doc'`

The layout the page renders. The theme registers a single layout and switches the shell from this field:

- `home`: the home page shell — hero, features, then the page content.
- `doc`: the document page shell — the article with the outline aside and the document footer. This is the default.
- `page`: the page shell — the markdown content only, without the outline aside and the document footer.
- `content`: no layout shell at all. The page renders the bare markdown content, without navbar, sidebar or footer.

@`layout` type=string

The name of a custom layout registered in a [client config](./extending.md#custom-layouts). When it is set, `type` is not used and the layout renders the page itself.
::::

A page with `type: content` is useful for standalone pages such as a full-screen demo. A page with a custom `layout` is explained in [Extending](./extending.md#custom-layouts).

## Home Page

The home page is a page with `type: home`. The theme renders its `hero` and `features` frontmatter first, then the markdown content of the page, then the site footer.

```md
---
type: home
hero:
  name: Theme Default
  text: The default theme of VuePress
  tagline: A thin layout layer ported from VitePress
  image:
    src: /logo.svg
    alt: Theme Default
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/vuepress
features:
  - title: VitePress-like layout
    details: Navbar, sidebar, outline, home page and footer, with the same CSS variables.
  - title: Plugin-driven
    details: Every non-layout feature is delegated to an ecosystem plugin.
footer: false
---
```

### Hero

::: fields
@`hero.name` type=string

The name of the project, rendered as the largest line of the hero.

@`hero.text` type=string

The main title of the hero, rendered below the name.

@`hero.tagline` type=string

The tagline of the hero, rendered below the text.

@`hero.image` type=`DefaultTheme.ThemeableImage`

The hero image. It accepts the same shapes as the [logo](./config.md#basic-config): a URL string, `{ src, alt }`, or `{ light, dark, alt }` for a color-mode-aware image. The image is rendered in a decorative box and is hidden on small screens.

@`hero.actions` type=`ThemeHeroAction[]`

The buttons of the hero. Each action has the fields below.

@@`hero.actions[*].text` type=string required

The text of the button.

@@`hero.actions[*].link` type=string required

The link of the button.

@@`hero.actions[*].theme` type=`'brand' | 'alt'` default=`'brand'`

The style of the button: `brand` for the filled primary button, `alt` for the secondary button.

@@`hero.actions[*].target` type=string

The `target` attribute of the link.

@@`hero.actions[*].rel` type=string

The `rel` attribute of the link.
:::

### Features

::: fields
@`features` type=`ThemeFeature[]`

The feature cards shown below the hero.

@`features[*].icon` type=`DefaultTheme.FeatureIcon`

The icon of the card. It accepts:

- an [Iconify](https://iconify.design) name, such as `'mdi:github'` — the name must contain a colon, and it is rendered by `@vuepress/plugin-icon`.
- a string of emoji or inline SVG markup, which is rendered as HTML.
- an image: `{ src, alt? }` or `{ light, dark, alt? }` — the same themed image shapes as the logo, with optional `width` and `height` in pixels (both default to `48`).
- an image wrapped in a decorative box: add `wrap: true` to an image object.

@`features[*].title` type=string required

The title of the card. HTML is allowed.

@`features[*].details` type=string required

The description of the card. HTML is allowed.

@`features[*].link` type=string

The link of the whole card.

@`features[*].linkText` type=string

When `link` is set, the text shown at the bottom of the card next to an arrow. The card is clickable even without it.

@`features[*].target` type=string

The `target` attribute of the card link.

@`features[*].rel` type=string

The `rel` attribute of the card link.
:::

### Home Content

The markdown content of the home page is rendered below the features, inside the themed document styles. Write it exactly like the content of a document page, but note that the outline and the document footer are not rendered on a home page.

Set `markdownStyles: false` in the frontmatter to render the content without the document styles, for example when the whole section is a custom component:

```md
---
type: home
markdownStyles: false
---

<MyLandingPage />
```

### Team and Sponsors

Team and sponsor sections have no frontmatter fields: they are composed with the exported components inside the home content. Wrap them in `VPHomeContent` when they should stretch to the full viewport width:

```md
---
type: home
---

<VPHomeContent>

## Our Team

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>The people behind the project.</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>Core Team</template>
    <template #members>
      <VPTeamMembers :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

</VPHomeContent>

<script setup>
import { VPHomeContent, VPTeamPage, VPTeamPageSection, VPTeamPageTitle, VPTeamMembers } from '@vuepress/theme-default/client'

const members = [
  {
    avatar: 'https://github.com/vuepress.png',
    name: 'VuePress',
    title: 'Maintainer',
    links: [{ icon: 'github', link: 'https://github.com/vuepress' }],
  },
]
</script>
```

The complete prop list of the components is in [Built-in Components](./components.md).

### Home Footer

::: fields
@`footer` type=boolean default=`true`

Whether to render the site footer on this page. The content of the footer comes from the [`footer`](./config.md#basic-config) theme option.
:::

## Document Page

A document page is a page without a `type` field, or with `type: doc`. It renders the document shell: the article, the outline aside, and the document footer with the edit link, the last updated time, the contributors and the previous/next links.

The following fields override the theme options for one page:

::: fields
@`outline` type=`DefaultTheme.Outline | DefaultTheme.Outline['level'] | false`

The heading levels of the outline. See [outline](./config.md#page).

@`aside` type=`boolean | 'left'`

Whether to render the aside, or to render it on the left. See [aside](./config.md#page).

@`editLink` type=boolean

Whether to render the edit link on this page. It does not change the link target.

@`lastUpdated` type=`boolean | number`

Whether to show the last updated time on this page. A number is used as the timestamp in milliseconds, which is useful when the git history is not available:

```md
---
lastUpdated: 1700000000000
---
```

@`contributors` type=boolean

Whether to show the contributors on this page.

@`prev` type=`string | { text?: string; link?: string; rel?: string; target?: string } | false`

The previous page link of this page. A string is used as the link text. Set it to `false` to hide the link.

@`next` type=`string | { text?: string; link?: string; rel?: string; target?: string } | false`

The next page link of this page, with the same shapes as `prev`.

@`sidebar` type=`DefaultTheme.Sidebar | 'heading' | false`

The sidebar configuration of this page. See [sidebar](./config.md#sidebar).

@`sidebarDepth` type=number

The maximum heading depth of the `'heading'` sidebar of this page.
:::

By default the previous/next links are the neighbours of the page in the sidebar. The link text falls back to the `docFooterText` of the sidebar item, then to the item text.

## 404 Page

The theme registers a `NotFound` layout. VuePress generates the `404.html` page with that layout, so the page shows the theme's not-found screen: an error code, a title, a quote and a link home.

The texts are configured with the [`notFound`](./config.md#basic-config) theme option, which is usually translated per language in [`locales`](./locale.md). A page also counts as not found when its frontmatter sets `layout: NotFound`.

## All Pages

::: fields
@`navbar` type=boolean

Whether to show the navbar on this page. Set it to `false` for a page that should render without the navbar.

@`pageClass` type=string

An extra class added to the theme container of this page, which is useful to scope custom styles:

```css
.vp-theme-container.my-page {
  /* page styles */
}
```

See [Styles](./styles.md) for the style file.

@`markdownStyles` type=boolean

Whether to wrap the home page content in the document styles. It only applies to a home page.
:::

## Frontmatter Reference

| Field            | Type                                                          | Page type | See also                                   |
| ---------------- | ------------------------------------------------------------- | --------- | ------------------------------------------ |
| `type`           | `'home' \| 'doc' \| 'page' \| 'content'`                      | all       | [Page Type](#page-type)                    |
| `layout`         | `string`                                                      | all       | [Extending](./extending.md#custom-layouts) |
| `navbar`         | `boolean`                                                     | all       | [All Pages](#all-pages)                    |
| `pageClass`      | `string`                                                      | all       | [All Pages](#all-pages)                    |
| `markdownStyles` | `boolean`                                                     | home      | [All Pages](#all-pages)                    |
| `hero`           | `ThemeHero`                                                   | home      | [Hero](#hero)                              |
| `features`       | `ThemeFeature[]`                                              | home      | [Features](#features)                      |
| `footer`         | `boolean`                                                     | all       | [Home Footer](#home-footer)                |
| `outline`        | `DefaultTheme.Outline \| number \| [number, number] \| false` | doc       | [Document Page](#document-page)            |
| `aside`          | `boolean \| 'left'`                                           | doc       | [Document Page](#document-page)            |
| `editLink`       | `boolean`                                                     | doc       | [Document Page](#document-page)            |
| `lastUpdated`    | `boolean \| number`                                           | doc       | [Document Page](#document-page)            |
| `contributors`   | `boolean`                                                     | doc       | [Document Page](#document-page)            |
| `prev`           | `string \| ThemePageLink \| false`                            | doc       | [Document Page](#document-page)            |
| `next`           | `string \| ThemePageLink \| false`                            | doc       | [Document Page](#document-page)            |
| `sidebar`        | `DefaultTheme.Sidebar \| 'heading' \| false`                  | doc       | [Document Page](#document-page)            |
| `sidebarDepth`   | `number`                                                      | doc       | [Document Page](#document-page)            |

# Config

## Basic Config

### hostname

- Type: `string`

- Details:

  Hostname to be deployed, e.g.: `https://example.com`

### locales

- Type: `{ [path: string]: Partial<DefaultThemeLocaleData> }`

- Default: `{}`

- Details:

  Specify locales for i18n support.

  All the options inside the [Locale Config](#locale-config) section can be used in locales.

  This option will only take effect in default theme, so don't confuse with `locales` in [Site Config](#locales).

- Also see:
  - [Guide > I18n](https://v2.vuepress.vuejs.org/guide/i18n.html)

## Locale Config

Config of this section can be used as normal config, and can also be used in the [locales](#locales) option.

### siteTitle

- Type: `false | string`

- Details

  You can customize this item to replace the default site title ( `title` in app config) in nav.
  When set to `false`, title in nav will be disabled.
  Useful when you have `logo` that already contains the site title text.

### logo

- Type: `DefaultThemeImage`

- Details:

  Logo file to display in nav bar, right before the site title.
  Accepts a path string, or an object to set a different logo for light/dark mode.

```ts
export default {
  theme: defaultTheme({
    // public file path
    logo: '/hero.png',
    // url
    logo: 'https://vuejs.org/images/logo.png',
  }),
}
```

```ts
type DefaultThemeImage =
  | string
  | { src: string; alt?: string; [prop: string]: any }
  | { light: string; dark: string; alt?: string; [prop: string]: any }
```

- Also see:
  - [Guide > Assets > Public Files](https://v2.vuepress.vuejs.org/guide/assets.html#public-files)

### logoLink

- Type: `string | { link?: string; rel?: string; target?: string }`

- Details:

  Overrides the link of the site logo.

- Also see:
  - [Default Theme > Config > logo](#logo)

### appearance

- Type: `boolean | 'dark' | 'force-dark' | import('@vueuse/core').UseDarkOptions`

- Default: `true`

- Details:

  Whether to enable dark mode (by adding the `.dark` class to the `<html>` element).

  - If the option is set to `true`, the default theme will be determined by the user's preferred color scheme.
  - If the option is set to `'dark'`, the theme will be dark by default, unless the user manually toggles it.
  - If the option is set to `false`, users will not be able to toggle the theme.

  This option injects an inline script that restores users settings from local storage using the `vuepress-color-scheme` key. This ensures the `.dark` class is applied before the page is rendered to avoid flickering.

  `appearance.initialValue` can only be `'dark' | undefined`.

### navbar

- Type: `NavItem[]`

- Default: `[]`

- Details:

  Configuration of navbar.

  To configure the navbar items, you can set it to a _navbar array_, each item of which could be a `NavItem[]` array.

```ts
export default {
  theme: defaultTheme({
    navbar: [
      // NavItem
      { text: 'Foo', link: '/foo/' },
      { text: 'Bar', link: '/bar/' },
      //...
    ],
  }),
}
```

The `text` is the actual text displayed in navbar, and the `link` is the link that will be navigated to when the text is clicked. For the link, set path always start with `/`.

Nav links can also be dropdown menus. To do this, set `items` key on link option.

```ts
export default {
  theme: defaultTheme({
    navbar: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' },
        ],
      },
    ],
  }),
}
```

Note that dropdown menu title ( `Dropdown Menu` in the above example) can not have `link` property since it becomes a button to open dropdown dialog.

You may further add "sections" to the dropdown menu items as well by passing in more nested items.

```ts
export default {
  theme: defaultTheme({
    navbar: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          {
            // Title for the section.
            text: 'Section A Title',
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' },
            ],
          },
        ],
      },
      {
        text: 'Dropdown Menu',
        items: [
          {
            // You may also omit the title.
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' },
            ],
          },
        ],
      },
    ],
  }),
}
```

### sidebar

- Type: `Sidebar`

- Details:

  The configuration for the sidebar menu item. More details in [Default Theme: Sidebar](./sidebar.md).

```ts
export default {
  theme: defaultTheme({
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          ...
        ]
      }
    ]
  }),
}
```

```ts
export type Sidebar = SidebarItem[] | SidebarMulti

export interface SidebarMulti {
  [path: string]: SidebarItem[] | { items: SidebarItem[]; base: string }
}

export type SidebarItem = {
  /**
   * The text label of the item.
   */
  text?: string

  /**
   * The link of the item.
   */
  link?: string

  /**
   * The children of the item.
   */
  items?: SidebarItem[]

  /**
   * If not specified, group is not collapsible.
   *
   * If `true`, group is collapsible and collapsed by default
   *
   * If `false`, group is collapsible but expanded by default
   */
  collapsed?: boolean

  /**
   * Base path for the children items.
   */
  base?: string

  /**
   * Customize text that appears on the footer of previous/next page.
   */
  docFooterText?: string

  rel?: string
  target?: string
}
```

### aside

- Type: `boolean | 'left'`

- Default: `true`

  - Setting this value to `false` prevents rendering of aside container.
  - Setting this value to `true` renders the aside to the right.
  - Setting this value to `'left'` renders the aside to the left.

  If you want to disable it for all viewports, you should use `outline: false` instead.

  You can override this global option via [aside](./frontmatter.md#aside) frontmatter in your pages.

### outline

- Type: `false | number | [number, number] | 'deep'`

- Default: `2`

- Details:

  Custom header levels of outline in the aside component.

  You can override this global option via [outline](./frontmatter.md#outline) frontmatter in your pages.

### socialLinks

- Type: `SocialLink[]`

- Details:

  You may define this option to show your social account links with icons in nav.

```ts
export default {
  theme: defaultTheme({
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: '...' },
      // You can also add custom icons by passing SVG as string:
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
        },
        link: '...',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'cool link',
      },
    ],
  }),
}
```

```ts
interface SocialLink {
  icon: SocialLinkIcon
  link: string
  ariaLabel?: string
}

type SocialLinkIcon =
  | 'discord'
  | 'facebook'
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'mastodon'
  | 'npm'
  | 'slack'
  | 'twitter'
  | 'x'
  | 'youtube'
  | { svg: string }
```

### footer

- Type: `Footer`

- Details:

  Footer configuration. You can add a message or copyright text on the footer, however, it will only be displayed when the page doesn't contain a sidebar. This is due to design concerns.

```ts
export interface Footer {
  message?: string
  copyright?: string
}
```

### editLink

- Type: `boolean`

- Default: `true`

- Details:

  Enable the _edit this page_ link or not.

  You can override this global option via [editLink](./frontmatter.md#editlink) frontmatter in your pages.

### editLinkPattern

- Type: `string`

- Details:

  Specify the pattern of the _edit this page_ link.

  This will be used for generating the _edit this page_ link.

  If you don't set this option, the pattern will be inferred from the [docsRepo](#docsrepo) option. But if your documentation repository is not hosted on a common platform, for example, GitHub, GitLab, Bitbucket, Gitee, etc., you have to set this option explicitly to make the _edit this page_ link work.

- Usage:

  | Pattern   | Description                                                                                         |
  | --------- | --------------------------------------------------------------------------------------------------- |
  | `:repo`   | The docs repo url, i.e. [docsRepo](#docsrepo)                                                       |
  | `:branch` | The docs repo branch, i.e. [docsBranch](#docsbranch)                                                |
  | `:path`   | The path of the page source file, i.e. [docsDir](#docsdir) joins the relative path of the page file |

- Example:

```ts
export default {
  theme: defaultTheme({
    docsRepo: 'https://gitlab.com/owner/name',
    docsBranch: 'master',
    docsDir: 'docs',
    editLinkPattern: ':repo/-/edit/:branch/:path',
  }),
}
```

The generated link will look like `'https://gitlab.com/owner/name/-/edit/master/docs/path/to/file.md'`.

### docsRepo

- Type: `string`

- Details:

  Specify the repository url of your documentation source files.

  This will be used for generating the _edit this page_ link.

### docsBranch

- Type: `string`

- Default: `'main'`

- Details:

  Specify the repository branch of your documentation source files.

  This will be used for generating the _edit this page_ link.

### docsDir

- Type: `string`

- Default: `''`

- Details:

  Specify the directory of your documentation source files in the repository.

  This will be used for generating the _edit this page_ link.

### lastUpdated

- Type: `boolean`

- Default: `true`

- Details:

  Enable the _last updated timestamp_ or not.

  You can override this global option via [lastUpdated](./frontmatter.md#lastupdated) frontmatter in your pages. Notice that if you have already set this option to `false`, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.

### lastUpdatedFormatOptions

- Type: `Intl.DateTimeFormatOptions & { forceLocale?: boolean }`

- Default: `{ dateStyle: 'short', timeStyle: 'short' }`

- Details:

  Set options for last updated time formatting.

  see [Intl.DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)

### contributors

- Type: `boolean`

- Default: `true`

- Details:

  Enable the _contributors list_ or not.

  You can override this global option via [contributors](./frontmatter.md#contributors) frontmatter in your pages. Notice that if you have already set this option to `false`, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.

### docFooter

- Type: `DocFooter`

- Details:

  Can be used to customize text appearing above previous and next links. Helpful if not writing docs in English. Also can be used to disable prev/next links globally.

```ts
export default {
  theme: defaultTheme({
    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },
  }),
}
```

```ts
export interface DocFooter {
  prev?: string | false
  next?: string | false
}
```

### returnToTop

- Type: `boolean`

- Default: `true`

- Details:

  Enable the _return to top_ button or not.

### externalLinkIcon

- Type: `boolean`

- Default: `false`

- Details:

  Whether to show an external link icon next to external links in markdown.

### carbonAds

- Type: `CarbonAdsOptions`

- Details:

  An option to display [Carbon Ads](https://www.carbonads.net/).

```ts
export default {
  theme: defaultTheme({
    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement',
    },
  }),
}
```

```ts
export interface CarbonAdsOptions {
  code: string
  placement: string
}
```

These values are used to call carbon CDN script as shown below.

```js
;`//cdn.carbonads.com/carbon.js?serve=${code}&placement=${placement}`
```

To learn more about Carbon Ads configuration, please visit [Carbon Ads website](https://www.carbonads.net/).

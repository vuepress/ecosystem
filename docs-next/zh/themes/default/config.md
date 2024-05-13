# 配置

## 基础配置

### hostname

- 类型： `string`

- 详情：

  部署的域名，例如: `https://example.com`

### locales

- 类型： `{ [path: string]: Partial<DefaultThemeLocaleData> }`

- 默认值： `{}`

- 详情：

  多语言支持的各个语言 locales 。

  所有在 [Locale 配置](#locale-配置) 章节内的配置项都可以在 locales 中使用。

  该配置项仅能在默认主题内生效，注意不要和 [站点配置](https://v2.vuepress.vuejs.org/zh/reference/config.html#locales) 中的 `locales` 混淆。

- 参考:
  - [Guide > I18n](https://v2.vuepress.vuejs.org/guide/i18n.html)

## Locale 配置

该章节内的配置项可以作为一般配置使用，也可以使用在 [locales](#locales) 内。

### siteTitle

- 类型： `false | string`

- 详情：

  可以自定义此项以替换导航中的默认站点标题 (应用配置中的 `title`)。
  当设置为 `false` 时，导航中的标题将被禁用。
  这在当 `logo` 已经包含站点标题文本时很有用。

### logo

- 类型： `DefaultThemeImage`

- 详情：

  导航栏上显示的 Logo，位于站点标题前。
  可以接受一个路径字符串，或者一个对象来设置在浅色/深色模式下不同的 Logo。

```ts
export default {
  theme: defaultTheme({
    // Public 文件路径
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

- 参考:
  - [Guide > Assets > Public Files](https://v2.vuepress.vuejs.org/guide/assets.html#public-files)

### logoLink

- 类型： `string | { link?: string; rel?: string; target?: string }`

- 详情：

  覆盖网站 logo 的链接。

- 参考:
  - [Default Theme > Config > logo](#logo)

### appearance

- 类型： `boolean | 'dark' | 'force-dark' | import('@vueuse/core').UseDarkOptions`

- 默认值： `true`

- 详情：

  是否启用深色模式 (通过将 `.dark` 类添加到 `<html>` 元素)。

  - 如果该选项设置为 `true`，则默认主题将由用户的首选配色方案决定。
  - 如果该选项设置为 `dark`，则默认情况下主题将是深色的，除非用户手动切换它。
  - 如果该选项设置为 `false`，用户将无法切换主题。

  此选项注入一个内联脚本，使用 `vuepress-color-scheme` key 从本地存储恢复用户设置。
  这确保在呈现页面之前应用 `.dark` 类以避免闪烁。

  `appearance.initialValue` 只能是 `'dark' | undefined` 。

### navbar

- 类型： `NavItem[]`

- 默认值： `[]`

- 详情：

  导航栏配置。

  为了配置导航栏元素，你可以将其设置为 _导航栏数组_ ，其中的每个元素是 `NavItem[]` 对象。

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

`text` 是 nav 中显示的实际文本，而 `link` 是单击文本时将导航到的链接。
对于链接，将路径设置为不带 `.md` 后缀的实际文件，并且始终以 `/` 开头。

导航链接也可以是下拉菜单。为此，请替换 `link` 选项，设置 `items` 数组。

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

请注意，下拉菜单标题 (上例中的 `Dropdown Menu`) 不能具有 `link` 属性，因为它是打开下拉对话框的按钮。

还可以通过传入更多嵌套项来进一步向下拉菜单项添加“sections”。

```ts
export default {
  theme: defaultTheme({
    navbar: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          {
            // 该部分的标题
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
            // 也可以省略标题
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

**自定义链接的路由匹配状态**

当前页面位于匹配路径下时，导航菜单项将突出显示。
如果想自定义要匹配的路径，请将 `activeMatch` 属性和正则表达式定义为字符串值。

```ts
export default {
  theme: defaultTheme({
    navbar: [
      // 当用户位于 `/config/` 路径时，该链接处于激活状态
      {
        text: 'Guide',
        link: '/guide',
        activeMatch: '/config/',
      },
    ],
  }),
}
```

:::warning
`activeMatch` 应为正则表达式字符串，但必须将其定义为字符串。
我们不能在这里使用实际的 RegExp 对象，因为它在构建期间不可序列化。
:::

**自定义链接的“target”和“rel”属性**

默认情况下，根据链接是否为外部链接自动判断 `target` 和 `rel` 属性。但如果愿意，也可以自定义它们。

```ts
export default {
  theme: defaultTheme({
    navbar: [
      {
        text: 'Merchandise',
        link: 'https://www.thegithubshop.com/',
        target: '_self',
        rel: 'sponsored',
      },
    ],
  }),
}
```

### sidebar

- 类型： `Sidebar`

- 详情：

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

- 类型： `boolean | 'left'`

- 默认值： `true`

  - Setting this value to `false` prevents rendering of aside container.
  - Setting this value to `true` renders the aside to the right.
  - Setting this value to `'left'` renders the aside to the left.

  If you want to disable it for all viewports, you should use `outline: false` instead.

  You can override this global option via [aside](./frontmatter.md#aside) frontmatter in your pages.

### outline

- 类型： `false | number | [number, number] | 'deep'`

- 默认值： `2`

- 详情：

  Custom header levels of outline in the aside component.

  You can override this global option via [outline](./frontmatter.md#outline) frontmatter in your pages.

### socialLinks

- 类型： `SocialLink[]`

- 详情：

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

- 类型： `Footer`

- 详情：

  Footer configuration. You can add a message or copyright text on the footer, however, it will only be displayed when the page doesn't contain a sidebar. This is due to design concerns.

```ts
export interface Footer {
  message?: string
  copyright?: string
}
```

### editLink

- 类型： `boolean`

- 默认值： `true`

- 详情：

  Enable the _edit this page_ link or not.

  You can override this global option via [editLink](./frontmatter.md#editlink) frontmatter in your pages.

### editLinkPattern

- 类型： `string`

- 详情：

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

- 类型： `string`

- 详情：

  Specify the repository url of your documentation source files.

  This will be used for generating the _edit this page_ link.

### docsBranch

- 类型： `string`

- 默认值： `'main'`

- 详情：

  Specify the repository branch of your documentation source files.

  This will be used for generating the _edit this page_ link.

### docsDir

- 类型： `string`

- 默认值： `''`

- 详情：

  Specify the directory of your documentation source files in the repository.

  This will be used for generating the _edit this page_ link.

### lastUpdated

- 类型： `boolean`

- 默认值： `true`

- 详情：

  Enable the _last updated timestamp_ or not.

  You can override this global option via [lastUpdated](./frontmatter.md#lastupdated) frontmatter in your pages. Notice that if you have already set this option to `false`, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.

### lastUpdatedFormatOptions

- 类型： `Intl.DateTimeFormatOptions & { forceLocale?: boolean }`

- 默认值： `{ dateStyle: 'short', timeStyle: 'short' }`

- 详情：

  Set options for last updated time formatting.

  see [Intl.DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)

### contributors

- 类型： `boolean`

- 默认值： `true`

- 详情：

  Enable the _contributors list_ or not.

  You can override this global option via [contributors](./frontmatter.md#contributors) frontmatter in your pages. Notice that if you have already set this option to `false`, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.

### docFooter

- 类型： `DocFooter`

- 详情：

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

- 类型： `boolean`

- 默认值： `true`

- 详情：

  Enable the _return to top_ button or not.

### externalLinkIcon

- 类型： `boolean`

- 默认值： `false`

- 详情：

  Whether to show an external link icon next to external links in markdown.

### carbonAds

- 类型： `CarbonAdsOptions`

- 详情：

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

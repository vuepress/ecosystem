# 主题配置

主题配置使你能够自定义主题，通过在给 主题 `defaultTheme()` 函数传入配置来实现：

```ts
import { defaultTheme } from '@vuepress/theme-default'

export default {
  theme: defaultTheme({
    // 在这里添加主题配置
  }),
}
```

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
  // 使用 `light` 和 `dark` 指定 浅色/深色 模式下的 图片 访问路径
  | { light: string; dark: string; alt?: string; [prop: string]: unknown }
  | { src: string; alt?: string; [prop: string]: unknown }
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

  是否启用深色模式 (通过将 `data-theme="dark` 属性添加到 `<html>` 元素)。

  - 如果该选项设置为 `true`，则默认主题将由用户的首选配色方案决定。
  - 如果该选项设置为 `dark`，则默认情况下主题将是深色的，除非用户手动切换它。
  - 如果该选项设置为 `false`，用户将无法切换主题。

  此选项注入一个内联脚本，使用 `vuepress-color-scheme` key 从本地存储恢复用户设置。
  这确保在呈现页面之前应用 `data-theme="dark` 属性，以避免闪烁。

  `appearance.initialValue` 只能是 `'dark' | undefined` 。

### navbar

- 类型： `NavItem[]`

- 默认值： `[]`

- 详情：

  导航栏配置。

  为了配置导航栏元素，你可以将其设置为 _导航栏数组_ ，其中的每个元素是 `NavItem` 对象。

```ts
export default {
  theme: defaultTheme({
    navbar: [
      // NavItem
      { text: 'Foo', link: '/foo' },
      { text: 'Bar', link: '/bar' },
      // ...
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

还可以通过传入更多嵌套项来进一步向下拉菜单项添加 “sections”。

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

  侧边栏菜单项的配置。可以在 [Default Theme: Sidebar](./sidebar.md) 了解更多详情。

```ts
export default {
  theme: defaultTheme({
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          // ...
        ],
      },
    ],
  }),
}
```

```ts
export type Sidebar = (SidebarItem | string)[] | SidebarMulti | 'structure'

export type SidebarMulti = Record<
  string,
  | (SidebarItem | string)[]
  | 'structure'
  | { items: (SidebarItem | string)[] | 'structure'; prefix?: string }
>

export interface SidebarItem {
  /**
   * 侧边栏项目文本
   */
  text?: string

  /**
   * 侧边栏项目链接
   */
  link?: string

  /**
   * 侧边栏子项目列表
   */
  items?: SidebarItem[]

  /**
   * 当前子项目列表是否可折叠
   *
   * - 如果未指定，分组不可折叠
   * - 如果为 `true`，分组可折叠且默认折叠
   * - 如果为 `false`，分组可折叠且默认展开
   */
  collapsed?: boolean

  /**
   * 子项目的路径前缀
   */
  prefix?: string

  /**
   * 自定义上一页/下一页页脚显示的文本。
   */
  docFooterText?: string

  rel?: string
  target?: string
}
```

### aside

- 类型： `boolean | 'left'`

- 默认值： `true`

- 详情：

  是否在 `doc` 布局中启用页内侧边栏

  - 将此值设置为 `false` 可禁用 aside 容器。
  - 将此值设置为 `true` 将在页面右侧渲染。
  - 将此值设置为 `left` 将在页面左侧渲染。

您可以通过页面的 [aside](./frontmatter.md#aside) frontmatter 覆盖这个全局选项。

### outline

- 类型： `false | number | [number, number] | 'deep'`

- 默认值： `[2, 3]`

- 详情：

  在侧边栏中自定义大纲的标题级别。

  - `false` 会禁用大纲。
  - `number` 单个数字表示只显示该级别的标题。
  - `[number, number]` 表示如果传递的是一个元组，第一个数字是最小级别，第二个数字是最大级别。
  - `'deep'` 等同于 `[2, 6]`，表示显示从 `<h2>` 到 `<h6>` 的所有标题。

  您可以通过页面中的 [outline](./frontmatter.md#outline) frontmatter 覆盖此全局选项。

### socialLinks

- 类型： `SocialLink[]`

- 详情：

  您可以定义此选项，以在导航中显示带图标的社交账号链接。

```ts
export default {
  theme: defaultTheme({
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: '...' },
      // 可以通过将 SVG 作为字符串传递来添加自定义图标：
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>',
        },
        link: '...',
        // 也可以为无障碍添加一个自定义标签 (可选但推荐):
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

  页脚配置。可以添加 message 和 copyright。由于设计原因，仅当页面不包含侧边栏时才会显示页脚。

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

  是否启用 _编辑此页面_ 链接。

  可以通过页面的frontmatter中的[editLink](./frontmatter.md#editlink)来覆盖这个全局选项。

### editLinkPattern

- 类型： `string`

- 详情：

  _编辑此页_ 链接的 Pattern 。

  它将会用于生成 _编辑此页_ 的链接。

  如果你不设置该选项，则会根据 [docsRepo](#docsrepo) 配置项来推断 Pattern 。但是如果你的文档仓库没有托管在常用的平台上，比如 GitHub 、 GitLab 、 Bitbucket 、 Gitee 等，那么你必须设置该选项才能使 _编辑此页_ 链接正常工作。

- 用法：

  | Pattern   | 描述                                                              |
  | --------- | ----------------------------------------------------------------- |
  | `:repo`   | 文档仓库 URL ，即 [docsRepo](#docsrepo)                           |
  | `:branch` | 文档仓库分支 ，即 [docsBranch](#docsbranch)                       |
  | `:path`   | 页面源文件的路径，即 [docsDir](#docsdir) 拼接上页面文件的相对路径 |

- 示例：

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

则会生成类似于 `'https://gitlab.com/owner/name/-/edit/master/docs/path/to/file.md'` 的链接。

### docsRepo

- 类型： `string`

- 详情：

  文档源文件的仓库 URL 。

  它将会用于生成 _编辑此页_ 的链接。

### docsBranch

- 类型： `string`

- 默认值： `'main'`

- 详情：

  文档源文件的仓库分支。

  它将会用于生成 _编辑此页_ 的链接。

### docsDir

- 类型： `string`

- 默认值： `''`

- 详情：

  文档源文件存放在仓库中的目录名。

  它将会用于生成 _编辑此页_ 的链接。

### lastUpdated

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 _最近更新时间戳_ 。

  你可以通过页面的 [lastUpdated](./frontmatter.md#lastupdated) frontmatter 来覆盖这个全局配置。要注意的是，如果你已经将该选项设为了 `false` ，那么这个功能会被完全禁用，并且无法在 locales 或页面 frontmatter 中启用。

### lastUpdatedFormatOptions

- 类型： `Intl.DateTimeFormatOptions & { forceLocale?: boolean }`

- 默认值： `{ dateStyle: 'short', timeStyle: 'short' }`

- 详情：

  设置最后更新时间格式的选项。

  查看 [Intl.DateTimeFormatOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options) 了解更多。

### contributors

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否启用 _贡献者列表_ 。

  你可以通过页面的 [contributors](./frontmatter.md#contributors) frontmatter 来覆盖这个全局配置。要注意的是，如果你已经将该选项设为了 `false` ，那么这个功能会被完全禁用，并且无法在 locales 或页面 frontmatter 中启用。

### externalLinkIcon

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否在 markdown 中的外部链接旁显示外部链接图标。

### carbonAds

- 类型： `CarbonAdsOptions`

- 详情：

  配置展示 [Carbon Ads](https://www.carbonads.net/).

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

这些值用于调用 carbon CDN 脚本，如下所示。

```js
;`//cdn.carbonads.com/carbon.js?serve=${code}&placement=${placement}`
```

要了解有关 Carbon Ads 配置的更多信息，请访问 [Carbon Ads website](https://www.carbonads.net/).

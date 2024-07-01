# Frontmatter

<NpmBadge package="@vuepress/theme-default" />

## 所有页面

本章节中的 Frontmatter 会在所有类型的页面中生效。

### pageClass

- 类型： `string`

- 详情：

  将额外的类名称添加到特定页面。

- 示例：

```md
---
pageClass: custom-page-class
---
```

然后可以在 `.vuepress/styles/custom.css` 文件中自定义该特定页面的样式：

```scss
.custom-page-class {
  /* page styles */
}
```

- 参考：
  - [Default Theme > Styles > Style File](./styles.md#style-file)

### pageLayout

- 类型： `doc | home | page`

- 默认值： `doc`

- 详情：

  指定页面的布局。

  - `doc` —— 它将默认文档样式应用于 markdown 内容。
  - `home` —— “主页”的特殊布局。可以添加额外的选项，例如 `hero` 和 `features` ，以快速创建漂亮的落地页。
  - `page` —— 表现类似于 `doc`，但它不对内容应用任何样式。当想创建一个完全自定义的页面时很有用。

```yaml
---
pageLayout: doc
---
```

### navbar

- 类型： `boolean`

- 默认值： `true`

- 详情：

  是否显示 [navbar](./config.md#navbar).

```md
---
navbar: false
---
```

### externalLinkIcon

- 类型： `boolean`

- 详情：

  是否在外部链接上显示外部链接图标。

```md
---
externalLinkIcon: false
---
```

### footer

- 类型： `boolean`

- 详情：

  是否显示 [footer](./config.md#footer).

## 首页

本章节中的 Frontmatter 只会在首页中生效。

### home

- 类型： `boolean`

- 详情：

  设定该页面是首页还是普通页面。

  如果你不设置该 Frontmatter 或将其设为 `false` ，则该页面会是一个 [普通页面](#普通页面).

  > home 为 `true` 等价于将 `pageLayout` 设为 `home`。

- 示例：

```md
---
home: true
---
```

### hero

主页布局设置为“home”时，定义 主页 `hero` 部分的内容。

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

- 类型： `DefaultThemeImage`

- 详情：

  首页 Hero 部分图片的 URL 。

- 参考：
  - [Guide > Assets > Public Files](https://v2.vuepress.vuejs.org/zh/guide/assets.html#public-files)

#### hero.name

- 类型： `string`

- 详情：

  `text` 上方的字符，带有品牌颜色, 尽量简短，例如产品名称

#### hero.text

- 类型： `string`

- 详情：

  hero 部分的主要文字，被定义为 `h1` 标签

#### hero.tagline

- 类型： `string`

- 详情：

  `text` 下方的标语

### actions

- 类型： `HeroAction[]`

```ts
interface HeroAction {
  theme?: 'brand' | 'alt'
  text: string
  link: string
  target?: string
  rel?: string
}
```

- 详情：

  配置首页按钮。

- 示例：

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

- 类型： `Feature[]`

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

- 详情：

  配置首页特性列表。

- 示例：

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

### markdownStyles

- 类型：`boolean`

- 默认值：`true`

- 详情：

  是否为首页 其它的内容 使用 markdown 样式。

## 普通页面

本章节中的 Frontmatter 只会在普通页面中生效。

### editLink

- 类型： `boolean`

- 详情：

  是否在本页面中启用 _编辑此页_ 链接。

- 参考：
  - [Default Theme > Config > editLink](./config.md#editlink)

### editLinkPattern

- 类型： `string`

- 详情：

  本页面中 _编辑此页_ 链接的 Pattern 。

- 参考：
  - [Default Theme > Config > editLinkPattern](./config.md#editlinkpattern)

### lastUpdated

- 类型： `boolean`

- 详情：

  是否在本页面中启用 _最近更新时间戳_ 。

- 参考：
  - [Default Theme > Config > lastUpdated](./config.md#lastupdated)

### contributors

- 类型： `boolean`

- 详情：

  是否在本页面中启用 _贡献者列表_ 。

- 参考：
  - [Default Theme > Config > contributors](./config.md#contributors)

### sidebar

- 类型： `boolean`

- 详情：

  是否显示 侧边栏

- 参考：
  - [Default Theme > Config > sidebar](./config.md#sidebar)

### aside

- 类型： `boolean | 'left'`

- 默认值： `true`

- 详情：

  定义侧边栏组件在 `doc` 布局中的位置。

  - 将此值设置为 `false` 可禁用侧边栏容器。
  - 将此值设置为 `true` 会将侧边栏渲染到右侧。
  - 将此值设置为 `left` 会将侧边栏渲染到左侧。

```yaml
---
aside: false
---
```

### outline

- 类型： `number | [number, number] | 'deep' | false`

- 默认值： `[2,3]`

- 详情：

大纲中显示的标题级别。它与 [outline](./config.md#outline) 相同，它会覆盖站点级的配置。

### prev

- 类型： `string | false | { text?: string; link?: string }`

- 详情：

  上一个页面的链接。

  如果你不设置该 Frontmatter ，该链接会自动根据侧边栏配置进行推断。

- 示例：

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

- 类型： `string | false | { text?: string; link?: string }`

- 详情：

  下一个页面的链接。

  如果你不设置该 Frontmatter ，该链接会自动根据侧边栏配置进行推断。

  类型和 prev Frontmatter 相同。

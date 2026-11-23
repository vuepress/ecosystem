---
icon: file-text
---

# Frontmatter

Frontmatter 配置单个页面，而[主题配置](./config.md)配置整个站点。本页记录的字段是主题会读取的字段；VuePress 核心和插件提供的字段（`title`、`lang`、`description`、`head`、`icon`、`date` 等）与平时一样生效，这里不再重复。

```md
---
type: doc
outline: [2, 3]
editLink: false
---

# Page Title
```

## 页面类型 {#page-type}

:::: fields
@`type` type=`'home' | 'doc' | 'page' | 'content'` default=`'doc'`

页面渲染的布局。主题只注册一个布局，并根据该字段切换外壳：

- `home`：首页外壳 —— Hero、特性，然后是页面内容。
- `doc`：文档页面外壳 —— 带大纲侧边栏和文档页脚的正文。这是默认值。
- `page`：页面外壳 —— 只有 Markdown 内容，没有大纲侧边栏和文档页脚。
- `content`：完全没有布局外壳。页面渲染裸 Markdown 内容，没有导航栏、侧边栏或页脚。

@`layout` type=string

在[客户端配置](./extending.md#custom-layouts)中注册的自定义布局的名称。设置它之后，`type` 不再使用，由该布局自行渲染页面。
::::

`type: content` 的页面适用于独立页面，例如全屏演示。使用自定义 `layout` 的页面在[继承](./extending.md#custom-layouts)中说明。

## 首页 {#home-page}

首页是 `type: home` 的页面。主题会先渲染它的 `hero` 和 `features` frontmatter，然后渲染页面的 Markdown 内容，最后渲染站点页脚。

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

经典主题的首页 frontmatter 仍然受支持。`home: true` 已弃用：请改用 `type: home`，设置该字段时主题会输出警告。下面的扁平字段保持原来的名称，未设置 `hero` 时生效：

::: fields
@`home` type=boolean deprecated

页面是否为首页。已弃用：请改用 `type: home`。使用该字段时主题会输出警告。

@`heroText` type=`string | null`

项目的名称。默认使用站点标题；设为 `null` 可隐藏名称。

@`tagline` type=`string | null`

Hero 的文本。默认使用站点描述；设为 `null` 可隐藏文本。

@`heroImage` type=string

Hero 图片。它会被用作 `hero.image` 的来源。

@`heroImageDark` type=string

Hero 图片的暗色版本。

@`heroAlt` type=string

Hero 图片的替代文本。

@`actions` type=`ThemeHeroAction[]`

Hero 的按钮。支持经典主题的 `type: 'primary' | 'secondary'`，也接受 `theme: 'brand' | 'alt'`。
:::

### Hero {#hero}

::: fields
@`hero.name` type=string

项目的名称，渲染为 Hero 中最大的一行。

@`hero.text` type=string

Hero 的主标题，渲染在名称下方。

@`hero.tagline` type=string

Hero 的标语，渲染在标题下方。

@`hero.image` type=`DefaultTheme.ThemeableImage`

Hero 图片。它接受与 [Logo](./config.md#basic-config) 相同的形态：URL 字符串、`{ src, alt }`，或用于随颜色模式切换的 `{ light, dark, alt }`。图片会渲染在一个装饰框中，并在小屏幕上隐藏。

@`hero.actions` type=`ThemeHeroAction[]`

Hero 的按钮。每个操作包含以下字段。

@@`hero.actions[*].text` type=string required

按钮的文本。

@@`hero.actions[*].link` type=string required

按钮的链接。

@@`hero.actions[*].theme` type=`'brand' | 'alt'` default=`'brand'`

按钮的样式：`brand` 为填充的主按钮，`alt` 为次要按钮。

@@`hero.actions[*].target` type=string

链接的 `target` 属性。

@@`hero.actions[*].rel` type=string

链接的 `rel` 属性。
:::

### 特性 {#features}

::: fields
@`features` type=`ThemeFeature[]`

显示在 Hero 下方的特性卡片。

@`features[*].icon` type=`DefaultTheme.FeatureIcon`

卡片的图标。它接受：

- 一个 [Iconify](https://iconify.design) 名称，例如 `'mdi:github'` —— 名称必须包含冒号，并由 `@vuepress/plugin-icon` 渲染。
- 一段 emoji 或内联 SVG 标记的字符串，会作为 HTML 渲染。
- 一张图片：`{ src, alt? }` 或 `{ light, dark, alt? }` —— 与 Logo 相同的随主题切换图片形态，可选的 `width` 和 `height` 以像素为单位（都默认为 `48`）。
- 一张包裹在装饰框中的图片：给图片对象加上 `wrap: true`。

@`features[*].title` type=string required

卡片的标题。允许使用 HTML。

@`features[*].details` type=string required

卡片的描述。允许使用 HTML。

@`features[*].link` type=string

整张卡片的链接。

@`features[*].linkText` type=string

设置 `link` 后，显示在卡片底部、紧挨箭头之前的文本。即使不设置它，卡片也可以点击。

@`features[*].target` type=string

卡片链接的 `target` 属性。

@`features[*].rel` type=string

卡片链接的 `rel` 属性。
:::

### 首页内容 {#home-content}

首页的 Markdown 内容渲染在特性下方，位于主题的文档样式之内。书写方式与文档页面的内容完全相同，但请注意首页不会渲染大纲和文档页脚。

在 frontmatter 中设置 `markdownStyles: false` 可以在不使用文档样式的情况下渲染内容，例如当整个章节都是自定义组件时：

```md
---
type: home
markdownStyles: false
---

<MyLandingPage />
```

### 团队与赞助 {#team-and-sponsors}

团队和赞助章节没有 frontmatter 字段：它们由导出的组件在首页内容中组合而成。当它们需要铺满整个视口宽度时，请用 `VPHomeContent` 包裹它们：

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

组件的完整属性列表见[内置组件](./components.md)。

### 首页页脚 {#home-footer}

::: fields
@`footer` type=`boolean | string` default=`true`

是否在本页渲染站点页脚，或页面的页脚文本。字符串会作为页面的页脚渲染，替代站点页脚。

@`footerHtml` type=boolean default=`false`

是否将字符串 `footer` 作为 HTML 渲染。
:::

## 文档页面 {#document-page}

文档页面是没有 `type` 字段、或 `type: doc` 的页面。它会渲染文档外壳：正文、大纲侧边栏，以及包含编辑链接、最后更新时间、贡献者和上一篇/下一篇链接的文档页脚。

以下字段可以针对单个页面覆盖主题配置项：

::: fields
@`outline` type=`DefaultTheme.Outline | DefaultTheme.Outline['level'] | false`

大纲的标题级别。见 [outline](./config.md#page)。

@`aside` type=`boolean | 'left'`

是否渲染侧边栏，或把它渲染在左侧。见 [aside](./config.md#page)。

@`editLink` type=boolean

是否在本页渲染编辑链接。它不会改变链接目标。

@`lastUpdated` type=`boolean | number`

是否在本页显示最后更新时间。数字会被用作以毫秒为单位的时间戳，这在 git 历史不可用时很有用：

```md
---
lastUpdated: 1700000000000
---
```

@`contributors` type=boolean

是否在本页显示贡献者。

@`prev` type=`string | { text?: string; link?: string; rel?: string; target?: string } | false`

本页的上一篇页面链接。字符串会被用作链接文本。将其设为 `false` 可隐藏该链接。

@`next` type=`string | { text?: string; link?: string; rel?: string; target?: string } | false`

本页的下一篇页面链接，形态与 `prev` 相同。

@`sidebar` type=`DefaultTheme.Sidebar | 'heading' | false`

本页的侧边栏配置。见 [sidebar](./config.md#sidebar)。

@`sidebarDepth` type=number

本页 `'heading'` 侧边栏的最大标题深度。
:::

默认情况下，上一篇/下一篇链接是页面在侧边栏中的相邻项。链接文本会先回退到侧边栏项目的 `docFooterText`，再回退到项目文本。

## 404 页面 {#404-page}

主题注册了一个 `NotFound` 布局。VuePress 会用该布局生成 `404.html` 页面，因此页面会显示主题的未找到界面：错误码、标题、引文和返回主页的链接。

这些文案通过 [`notFound`](./config.md#basic-config) 主题配置项配置，通常会在 [`locales`](./locale.md) 中按语言翻译。frontmatter 设置 `layout: NotFound` 的页面也会被视为未找到页面。

## 所有页面 {#all-pages}

::: fields
@`navbar` type=boolean

是否在本页显示导航栏。对于不应渲染导航栏的页面，将其设为 `false`。

@`pageClass` type=string

添加到本页主题容器上的额外类，便于限定自定义样式的范围：

```css
.vp-theme-container.my-page {
  /* page styles */
}
```

样式文件见[样式](./styles.md)。

@`markdownStyles` type=boolean

是否把首页内容包裹在文档样式中。它只对首页生效。
:::

## Frontmatter 参考 {#frontmatter-reference}

| 字段             | 类型                                                          | 页面类型 | 参考                                  |
| ---------------- | ------------------------------------------------------------- | -------- | ------------------------------------- |
| `type`           | `'home' \| 'doc' \| 'page' \| 'content'`                      | 全部     | [页面类型](#page-type)                |
| `layout`         | `string`                                                      | 全部     | [继承](./extending.md#custom-layouts) |
| `navbar`         | `boolean`                                                     | 全部     | [所有页面](#all-pages)                |
| `pageClass`      | `string`                                                      | 全部     | [所有页面](#all-pages)                |
| `markdownStyles` | `boolean`                                                     | 首页     | [所有页面](#all-pages)                |
| `hero`           | `ThemeHero`                                                   | 首页     | [Hero](#hero)                         |
| `home`           | `boolean`                                                     | 首页     | [首页](#home-page)                    |
| `heroText`       | `string \| null`                                              | 首页     | [首页](#home-page)                    |
| `tagline`        | `string \| null`                                              | 首页     | [首页](#home-page)                    |
| `heroImage`      | `string`                                                      | 首页     | [首页](#home-page)                    |
| `heroImageDark`  | `string`                                                      | 首页     | [首页](#home-page)                    |
| `heroAlt`        | `string`                                                      | 首页     | [首页](#home-page)                    |
| `actions`        | `ThemeHeroAction[]`                                           | 首页     | [首页](#home-page)                    |
| `features`       | `ThemeFeature[]`                                              | 首页     | [特性](#features)                     |
| `footer`         | `boolean \| string`                                           | 全部     | [首页页脚](#home-footer)              |
| `footerHtml`     | `boolean`                                                     | 全部     | [首页页脚](#home-footer)              |
| `outline`        | `DefaultTheme.Outline \| number \| [number, number] \| false` | 文档     | [文档页面](#document-page)            |
| `aside`          | `boolean \| 'left'`                                           | 文档     | [文档页面](#document-page)            |
| `editLink`       | `boolean`                                                     | 文档     | [文档页面](#document-page)            |
| `lastUpdated`    | `boolean \| number`                                           | 文档     | [文档页面](#document-page)            |
| `contributors`   | `boolean`                                                     | 文档     | [文档页面](#document-page)            |
| `prev`           | `string \| ThemePageLink \| false`                            | 文档     | [文档页面](#document-page)            |
| `next`           | `string \| ThemePageLink \| false`                            | 文档     | [文档页面](#document-page)            |
| `sidebar`        | `DefaultTheme.Sidebar \| 'heading' \| false`                  | 文档     | [文档页面](#document-page)            |
| `sidebarDepth`   | `number`                                                      | 文档     | [文档页面](#document-page)            |

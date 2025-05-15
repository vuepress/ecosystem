---
icon: tabler:file-ai
---

# plugin-llms

<NpmBadge package="@vuepress/plugin-llms" />

为你的站点添加 [llms.txt](https://llmstxt.org/)，以提供对 LLM 友好的内容。

## 使用方法{#usage}

```bash
npm i -D @vuepress/plugin-llms@next
```

```ts title=".vuepress/config.ts"
import { llmsPlugin } from '@vuepress/plugin-llms'

export default {
  plugins: [
    llmsPlugin({
      // 配置项
    }),
  ],
}
```

## 为什么需要 llms.txt？

大型语言模型越来越依赖网站信息，但面临一个关键限制：上下文窗口太小，无法完整处理大多数网站。将包含导航、广告和 JavaScript 的复杂 HTML 页面转换为适合 LLM 的纯文本既困难又不精确。

虽然网站同时为人类读者和 LLM 服务，但后者受益于在一个可访问的位置收集的更简洁、专家级的信息。这对于开发环境等使用案例尤其重要，因为 LLM 需要快速访问编程文档和 API。

向网站添加 `/llms.txt` Markdown 文件，以提供对 LLM 友好的内容。此文件提供了简短的背景信息、指南和指向详细 Markdown 文件的链接。

### 插件功能

插件通过检索你的文档源目录中的所有 Markdown 文件，并将其转换为 LLM 友好的纯文本文件。

```txt
📂 .vuepress/dist
├── ...
├── llms.txt
├── llms-full.txt
├── markdown-examples.html
└── markdown-examples.md
```

点击以下链接查看本文档站点的 `llms.txt` 文件：

- <a :href="$withBase('/llms.txt')" target="_blank">llms.txt</a>
- <a :href="$withBase('/llms-full.txt')" target="_blank">llms-full.txt</a>

::: tip

插件仅在生产构建时，即执行 `vuepress build` 命令时，生成 `llms.txt` 文件，以及其它 LLM 友好的文档文件，并将它们输出到 `.vuepress/dist` 目录中。

:::

### `llms.txt`

`llms.txt` 文件包含了站点的 **标题**、**描述**、**详情(可选)** 和 **目录（TOC）**。
默认格式如下：

```md title="llms.txt"
# Title

> Description 描述

Details 详情 （可选）

## Table Of Content

- [title](url): description
- [title](url): description
- …
```

- **站点标题**: 根据以下顺序取值：

  1. `llmTemplateGetter.title`
  1. 首页 (语言 `README.md`) Frontmatter 中的 `heroText`
  1. VuePress 配置文件中当前语言的 [title](https://v2.vuepress.vuejs.org/zh/reference/config.html#locales)
  1. VuePress 配置文件中的 [title](https://v2.vuepress.vuejs.org/zh/reference/config.html#title)
  1. 首页 (`README.md`) 的第一个 **h1** 标题（单个 `#` 的标题）
  1. 首页 (`README.md`) 的页面标题

- **站点描述**: 根据以下顺序取值：

  1. `llmTemplateGetter.description`
  1. 首页 (语言 `README.md`) Frontmatter 中的 `tagline`
  1. VuePress 配置文件中当前语言的 [description](https://v2.vuepress.vuejs.org/zh/reference/config.html#locales)
  1. VuePress 配置文件中的 [description](https://v2.vuepress.vuejs.org/zh/reference/config.html#description)
  1. 首页 (`README.md`) 的 `frontmatter.description`

- **站点详情（可选）**: 根据以下顺序取值：

  1. `llmTemplateGetter.details`
  2. 首页 (`README.md`) 的 `frontmatter.details`

- **目录（TOC）**：格式为 `- [title](url): description`，其中 `description` 从 `frontmatter.description` 中取值，如果不存在则仅显示 `- [title](url)`。

  By default the plugin only generates first-level TOC, and the default getter function is as follows:

  默认情况下，插件仅生成一级目录，默认的获取函数如下：

  ```ts
  import { generateTOCLink } from '@vuepress/plugin-llms'

  const defaultTOCGetter = (pages, state) =>
    pages.map((page) => generateTOCLink(page, state)).join('\n')
  ```

  你可以通过设置 [`llmsTxtTemplateGetter`](#llmstxttemplategetter) 选项来自定义它以生成多级目录。

### `llms-full.txt`

`llms-full.txt` 包含了每一个页面的 **链接**、**描述**，**Markdown 格式的内容**。
其格式如下：

```txt title="llms-full.txt"
---
url: url
description: 描述
---

页面的 Markdown 格式内容

---

---
url: url
description: 描述
---

页面的 Markdown 格式内容

…
```

插件直接将文档源目录的 Markdown 文件内容合并到 `llms-full.txt` 中，以便 LLM 读取和分析。

### 页面内容

插件为每个页面生成它的 Markdown 格式的可访问的文件，访问地址为 `${url}.md`。比如 `/guide/quick-start.html` 会生成一个 `/guide/quick-start.md` 文件。

## 配置项{#options}

### llmsTxt

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否生成包含章节及其链接列表的 `llms.txt` 文件。

### llmsFullTxt

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否生成包含所有文档的单一文件 `llms-full.txt`。

### llmsPageTxt

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否为网站上的每个页面生成一个对LLM（大语言模型）友好的文档版本。

### stripHTML

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否需要从 Markdown 文件中剥离 HTML 标签

### filter

- 类型： `(page: Page) => boolean`

- 默认值： `() => true`

- 详情：

  页面过滤器，当返回 `true` 时，页面将被包含在 `llms.txt` 中，否则将被排除在外。

### domain

- 类型： `string`

- 默认值： `''`

- 详情：

  附加到 `llms.txt` 中 URL 开头以及其他文件上下文中的域名

  是否附加域名尚未达成一致（因为这取决于 AI 是否能解析当前存在的相对路径），但如果你愿意，可以添加它。

  ```md title="llms.txt"
  - [title](/foo/bar.md) <!-- [!code --] -->
  - [title](https://example.com/foo/bar.md) <!-- [!code ++] -->
  ```

### locale

- 类型：`string | 'all'`

- 默认值：`'/'`

- 详情：

  生成的站点的语言环境。如果未设置，插件将使用 VuePress 站点的默认语言环境。如果将其设置为 `all`，插件将为所有语言环境生成 `llms.txt`。

  此选项在你有多个语言环境并希望为特定语言环境（应具有最佳文档质量）生成 `llms.txt` 时非常有用。

  此外，如果你有许多 LLMs 无法理解或正确翻译自定义概念，你应考虑为每个语言环境生成 `llms.txt`，以避免与 LLMs 的翻译和原始文档之间的不同表示造成混淆。

### llmsTxtTemplate

- 类型： `string`

- 默认值：

  ```ts
  const DEFAULT_LLMSTXT_TEMPLATE = `\
  # {title}
  
  {description}
  
  {details}
  
  ## Table of Contents
  
  {toc}`
  ```

- 详情：

  `llms.txt` 文件的自定义模板，允许个性化元素的顺序。

  默认情况下，`{title}`、`{description}`、`{details}` 和 `{toc}` 可用。

### llmsTxtTemplateGetter

- 类型： `TemplateGetterOptions`

  ```ts
  /**
   * 表示生成链接的链接扩展选项
   */
  export type LinksExtension = '.html' | '.md'

  /**
   * 表示一个已准备好的页面，包括其标题和路径。
   */
  export interface LLMPage extends Page {
    /**
     * 页面的 Markdown 内容
     *
     * @example '# Guide\n\nA guide'
     */
    markdown: string

    /**
     * 页面的摘要
     *
     * @example 'Introduction to the guide'
     */
    excerpt: string
  }

  export interface LLMState {
    /**
     * VuePress 应用实例
     */
    app: App

    /**
     * 基本 URL
     */
    base: string

    /**
     * 可选的域名，用于在 URL 前缀
     */
    domain?: string

    /**
     * 生成链接的链接扩展
     */
    linkExtension?: LinkExtension

    /**
     * 当前语言环境的路径
     */
    currentLocale: string

    /**
     * 当前站点语言环境数据
     */
    siteLocale: SiteLocaleData

    /**
     * 是否为所有语言环境生成 llms.txt 文件
     */
    allLocales: boolean
  }

  export type TemplateGetter = (pages: LLMPage[], state: LLMState) => string

  export interface TemplateGetterOptions {
    /** Any custom variable */
    [key: string]: TemplateGetter | string | undefined
  }
  ```

- 默认值： `{}`

- 详情：

  自定义 [`llmsTxtTemplate`](#llmstxttemplate) 的变量。

  使用此选项，你可以添加和覆盖模板变量。

  例如，为 `llms.txt` 设置自定义标题：

  ```ts
  llmsPlugin({
    llmsTxtTemplateGetter: {
      title: 'Very custom title',
    },
  })
  ```

  还可以将其与自定义模板结合使用：

  ```ts
  llmsPlugin({
    llmsTxtTemplate: '# {title}\n\n{foo}',
    llmsTxtTemplateGetter: {
      foo: 'Very custom title',
    },
  })
  ```

## Frontmatter

以下 `frontmatter` 将在插件中使用。

### title {#frontmatter-title}

- 类型： `string`

- 详情：

  在首页（`README.md`）中时，作为 `llms.txt` 的标题的备选项。

  在其它页面中时，作为页面标题。

### description {#frontmatter-description}

- 类型： `string`

- 详情：

  在 首页（`README.md`）中时，作为 `llms.txt` 的描述的备选项。

  在其它页面中时，作为页面描述。

  推荐为页面添加简明扼要的描述，提供给 LLM 读取页面关键信息。

### heroText {#frontmatter-herotext}

- 类型：`string`

- 详情：

  只在首页（`README.md`）中时，作为 `llms.txt` 的标题。

### tagline {#frontmatter-tagline}

- 类型：`string`

- 详情：

  只在首页（`README.md`）中时，作为 `llms.txt` 的描述。

### details {#frontmatter-details}

- 类型： `string`

- 详情：

  仅在首页（`README.md`）中时，作为 `llms.txt` 的详情。

### llmstxt

- 类型： `boolean`

- 默认值： `true`

- 详情： 在 `llms.txt` 文件中是否包含当前页面。

## 其它

建议配置重定向，以便AI可以使用.md和.txt扩展名的地址。

比如在 `Netlify` 中，在 `public/_redirects` 中配置如下：

```txt
/llms.md         /llms.txt 200!
/llms-full.md    /llms-full.txt 200!
```

配置语法说明：<https://docs.netlify.com/routing/redirects>

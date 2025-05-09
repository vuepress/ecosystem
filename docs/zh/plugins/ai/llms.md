---
icon: tabler:file-ai
---

# plugin-llms

<NpmBadge package="@vuepress/plugin-llms" />

为你的站点添加 [llms.txt](https://llmstxt.org/)，以提供对 LLM 友好的内容。

大型语言模型越来越依赖网站信息，但面临一个关键限制：上下文窗口太小，无法完整处理大多数网站。将包含导航、广告和 JavaScript 的复杂 HTML 页面转换为适合 LLM 的纯文本既困难又不精确。

虽然网站同时为人类读者和 LLM 服务，但后者受益于在一个可访问的位置收集的更简洁、专家级的信息。这对于开发环境等使用案例尤其重要，因为 LLM 需要快速访问编程文档和 API。

向网站添加 `/llms.txt` Markdown 文件，以提供对 LLM 友好的内容。此文件提供了简短的背景信息、指南和指向详细 markdown 文件的链接。

## 概述{#introduction}

插件通过检索您的文档源目录中的所有 Markdown 文件，并将其转换为 LLM 友好的纯文本文件。

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

### 生成 `llms.txt` {#generate-llms-txt}

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

  1. [配置项 > title](#title)
  2. VuePress 配置 [locales > title](https://v2.vuepress.vuejs.org/zh/reference/config.html#locales)
  3. VuePress 配置 [title](https://v2.vuepress.vuejs.org/zh/reference/config.html#title)
  4. 首页 (`README.md`) 的第一个 **h1** 标题（单个 `#` 的标题）
  5. 首页 (`README.md`) 的 `frontmatter.title`

- **站点描述**: 根据以下顺序取值：

  1. [配置项 > description](#description)
  2. VuePress 配置 [locales > description](https://v2.vuepress.vuejs.org/zh/reference/config.html#locales)
  3. VuePress 配置 [description](https://v2.vuepress.vuejs.org/zh/reference/config.html#description)
  4. 首页 (`README.md`) 的 `frontmatter.description`

- **站点详情（可选）**: 根据以下顺序取值：

  1. [配置项 > details](#details)
  2. 首页 (`README.md`) 的 `frontmatter.details`

- **目录（TOC）**：格式为 `- [title](url): description`，其中 `description` 从 `frontmatter.description` 中取值，如果不存在则仅显示 `- [title](url)`。

### 生成 `llms-full.txt` {#generate-llms-full-txt}

`llms-full.txt` 包含了每一个页面的 **链接**、**描述**，**markdown 格式的内容**。
其格式如下：

```txt title="llms-full.txt"
---
url: url
description: 描述
---

页面的 markdown 格式内容

---

---
url: url
description: 描述
---

页面的 markdown 格式内容

…
```

插件直接将 文档源目录的 markdown 文件内容，合并到 `llms-full.txt` 中，以便 LLM 读取和分析。

### 生成每个页面的 markdown 文件 {#generate-markdown-files-for-each-page}

插件为 每个页面生成它的 markdown 格式的可访问的文件，访问地址为 `${url}.md`。比如 `/guide/quick-start.html` 会生成一个 `/guide/quick-start.md` 文件。

## 使用方法{#usage}

```bash
npm i -D @vuepress/plugin-llms@next
```

```ts title=".vuepress/config.ts"
import { llmstxtPlugin } from '@vuepress/plugin-llms'

export default {
  plugins: [
    llmstxtPlugin({
      // 配置项
    }),
  ],
}
```

## 配置项{#options}

### generateLLMsTxt

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否生成包含章节及其链接列表的 `llms.txt` 文件。

### generateLLMsFullTxt

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否生成包含所有文档的单一文件`llms-full.txt`。

### generateLLMFriendlyDocsForEachPage

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否为网站上的每个页面生成一个对LLM（大语言模型）友好的文档版本。

### stripHTML

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否需要从 Markdown 文件中剥离 HTML 标签

### workDir

- 类型: `string`

- 默认值: `''` (相对于文档源目录)

- 详情:

  将要处理的文件所在的目录。
  这有助于配置插件以生成特定语言的LLM文档。

  ```typescript
  llmstxtPlugin({
    // 从英语文档生成LLMs的文档
    workDir: 'en',
  })
  ```

### filter

- 类型： `(page: Page) => boolean`

- 默认值： `() => true`

- 详情：

  页面过滤器，当返回 `true` 时，页面将被包含在 `llms.txt` 中，否则将被排除在外。

### domain

- 类型： `string`

- 默认值： `''`

- 详情：

  附加到`llms.txt`中URL开头以及其他文件上下文中的域名

  是否附加域名尚未达成一致（因为这取决于AI是否能解析当前存在的相对路径），但如果你愿意，可以添加它。

  ```md title="llms.txt"
  - [title](/foo/bar.md) <!-- [!code --] -->
  - [title](https://example.com/foo/bar.md) <!-- [!code ++] -->
  ```

### title

- 类型： `string`

- 默认值： `''`

- 详情： `llms.txt` 中的标题。

### description

- 类型： `string`

- 默认值： `''`

- 详情： `llms.txt` 中的描述。

### details

- 类型： `string`

- 默认值： `''`

- 详情： `llms.txt` 中的详情。

### toc

- 类型： `string`

- 默认值： `'`

- 详情：

  `llms.txt` 中的目录，未设置时，还通过 [options > customGenerateTOC](#customgeneratetoc) 自定义生成，否则由插件内部自动生成。

### customLLMsTxtTemplate

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

  `llms.txt` 文件的自定义模板，允许对元素进行个性化排序。

  可用的模板变量包括：

  - `{title}`：[options > title](#title)，或者从 frontmatter 部分或主文档（`README.md`）中第一个 h1 提取的标题。
  - `{description}`：[options > description](#description)，或者从 frontmatter 部分或主文档（`README.md`）中提取的描述。
  - `{details}`：[options > details](#details)，或者从 frontmatter 部分或主文档（`README.md`）中提取的详情。
  - `{toc}`：[options > toc](#toc)，或者 [options > customGenerateTOC](#customgeneratetoc), 或者插件内部自动生成的**目录**。
  - [options > customTemplateVariables](#customtemplatevariables) 添加的自定义模板变量。

### customTemplateVariables

- 类型： `Record<string, string>`

- 默认值： `{}`

- 详情：

  在 [options > customLLMsTxtTemplate](#customllmstxttemplate) 的自定义变量。
  通过此选项，您可以编辑或向模板添加变量。
  您无需更改模板即可修改 `llms.txt` 中的标题：

  ```typescript
  llmstxtPlugin({
    customTemplateVariables: {
      title: 'Very custom title',
    },
  })
  ```

  还可以将其与自定义模板结合使用：

  ```typescript
  llmstxtPlugin({
    customLLMsTxtTemplate: '# {title}\n\n{foo}',
    customTemplateVariables: {
      foo: 'Very custom title',
    },
  })
  ```

### customGenerateTOC

- 类型： `(pages: PreparedPage[], options: GenerateTOCOptions) => string`

- 默认值： `undefined`

- 详情：

  自定义为提供的预备页面生成目录（TOC）。

  插件默认仅生成一级目录，你可以通过 `customGenerateTOC` 自定义生成多级目录。

  你可以参考本文档站点的 [customGenerateTOC](https://github.com/vuepress/ecosystem/blob/main/docs/.vuepress/configs/llmstxtTOC.ts) ，编写自定义生成目录的函数。

  插件提供了 `generateTOCLink(page: PreparedPage, options: GenerateTOCOptions)` 函数，用于生成 TOC 条目链接。

  ```ts
  import { generateTOCLink, llmstxtPlugin } from '@vuepress/plugin-llms'

  llmstxtPlugin({
    customGenerateTOC: (pages, options) => {
      return pages.map((page) => generateTOCLink(page, options)).join('')
    },
  })
  ```

## Frontmatter

以下 `frontmatter` 将在插件中使用。

### title {#frontmatter-title}

- 类型： `string`

- 默认值： `''`

- 详情：

  在首页（`README.md`）中时，作为 `llms.txt` 的标题的备选项。

  在其它页面中时，作为 页面标题。

### description {#frontmatter-description}

- 类型： `string`

- 默认值： `''`

- 详情：

  在 首页（`README.md`）中时，作为 `llms.txt` 的描述的备选项。

  在其它页面中时，作为 页面描述。推荐为页面添加简明扼要的描述，提供给 LLM 读取页面关键信息。

### details {#frontmatter-details}

- 类型： `string`

- 默认值： `''`

- 详情：

  仅在首页（`README.md`）中时，作为 `llms.txt` 的详情的备选项。

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

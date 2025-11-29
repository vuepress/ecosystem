---
icon: tabler:file-ai
---

# plugin-llms

<NpmBadge package="@vuepress/plugin-llms" />

为你的站点添加 [llms.txt](https://llmstxt.org/)，提供对 LLM（大语言模型）友好的内容。

## 使用方法 (Usage)

```bash
npm i -D @vuepress/plugin-llms@next
```

```ts title=".vuepress/config.ts"
import { llmsPlugin } from '@vuepress/plugin-llms'

export default {
  plugins: [
    llmsPlugin({
      // 选项
    }),
  ],
}
```

## 为什么需要 llms.txt？

大型语言模型（LLM）越来越依赖网络文档来回答用户提问和编写代码。然而，普通网站存在明显的局限性：上下文窗口（Context Window）有限，且充斥着导航栏、脚本和样式的原始 HTML 既浪费 Token 又难以解析。

**llms.txt** 填补了这一空白。它为 AI Agent 创建了一个标准化的入口点，提供项目的简要摘要以及通往干净、专家级文档的直接链接。这对于开发工具文档尤为重要，能够确保 LLM 准确、无干扰地获取您的 API 和指南。

### 插件概览

该插件会自动将您的 VuePress 文档转换为针对机器阅读优化的结构化数据集。

在构建过程中，它会在输出目录中生成以下资源：

```txt
📂 .vuepress/dist
├── ...
├── llms.txt                # 文档入口点 / 索引映射
├── llms-full.txt           # 包含完整文档的单个合并文件
├── markdown-examples.html  # 您的标准网页
└── markdown-examples.md    # 该页面的纯净 Markdown 版本
```

::: tip
这些文件**仅在生产构建期间**（即运行 `vuepress build` 时）生成。它们将与您的 HTML 文件一起出现在 `.vuepress/dist` 目录中。
:::

## 输出文件

### 1. `llms.txt`

`llms.txt` 文件充当 AI Agent 的主索引。它包含站点的 **标题 (Title)**、**描述 (Description)**、**详情 (Details - 可选)** 以及 **目录 (Table of Contents)**。

您可以点击链接查看本文档站点的生成文件：<a :href="$withBase('/llms.txt')" target="_blank">llms.txt</a>。

**默认格式：**

```md title="llms.txt"
# Title

> Description

Details (Optional)

## Table of Contents

- [Title](url): Description
- [Title](url): Description
- ...
```

**内容解析逻辑：**

插件根据以下优先级顺序（从高到低）确定字段内容：

- **站点标题 (Site Title):**
  1. `llmsTxtTemplateGetter.title`
  2. 首页 Frontmatter 中的 `heroText`
  3. VuePress 配置中当前语言环境 (locale) 的 [title](https://v2.vuepress.vuejs.org/reference/config.html#locales)
  4. VuePress 配置中的主 [title](https://v2.vuepress.vuejs.org/reference/config.html#title)
  5. 语言环境首页 (`README.md`) 的页面标题

- **站点描述 (Site Description):**
  1. `llmsTxtTemplateGetter.description`
  2. 语言环境首页 Frontmatter 中的 `tagline`
  3. VuePress 配置中当前语言环境 (locale) 的 [description](https://v2.vuepress.vuejs.org/reference/config.html#locales)
  4. VuePress 配置中的主 [description](https://v2.vuepress.vuejs.org/reference/config.html#description)
  5. 语言环境首页 (`README.md`) 的 `frontmatter.description`

- **站点详情 (Site Details - 可选):**
  1. `llmsTxtTemplateGetter.details`
  2. 语言环境首页 (`README.md`) 的 `frontmatter.details`

- **目录 (Table of Contents):**
  格式为 `- [title](url): description`。其中 `description` 取自页面的 `frontmatter.description`。

  默认情况下，插件仅生成一级扁平目录。您可以通过在 [`llmsTxtTemplateGetter`](#llmstxttemplategetter) 选项中定义自定义函数来修改此行为（例如支持多级嵌套）。

### 2. `llms-full.txt`

`llms-full.txt` 是文档的拼接版本。它将所有 Markdown 文件的内容合并到一个文本流中，允许 LLM 通过一次请求读取您的整个知识库。

您可以点击链接查看本文档站点的完整文件：<a :href="$withBase('/llms-full.txt')" target="_blank">llms-full.txt</a>。

**格式：**

```txt title="llms-full.txt"
---
url: /path/to/page
description: A brief summary of the page
---

# Page Title

Full Markdown content of the page...

---

---
url: /path/to/next-page
description: ...
---

...
```

### 3. 单页内容

除了摘要文件外，插件还会为站点中的每个 HTML 页面生成纯净的 Markdown 文件。

例如，如果您的站点有一个页面位于 `/guide/quick-start.html`，插件会生成对应的 `/guide/quick-start.md` 文件。这让 LLM 可以获取零 HTML 干扰的特定页面内容。

## 选项 (Options)

### llmsTxt

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否生成 `llms.txt` 文件（包含各部分链接的索引文件）。

### llmsFullTxt

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否生成 `llms-full.txt` 文件（包含所有文档内容的单一合并文件）。

### llmsPageTxt

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否为网站的每个页面生成对 LLM 友好的 Markdown 版本。

### stripHTML

- 类型: `boolean`

- 默认值: `true`

- 详情: 是否从生成的 Markdown 文件中剥离 HTML 标签，以确保 LLM 输入更干净。

### filter

- 类型: `(page: Page) => boolean`

- 默认值: `() => true`

- 详情:

  页面过滤函数。如果函数返回 `true`，则该页面将包含在 `llms.txt` 中。

  注意：通过 `frontmatter.llmstxt` 显式禁用的页面或非 Markdown 源生成的页面，无论此设置如何，都将被排除。

### domain

- 类型: `string`

- 默认值: `''`

- 详情:

  一个可选的域名，将附加到 `llms.txt` 和其他生成文件中的 URL 前面。

  虽然标准的相对路径通常足够，但某些 AI Agent 对绝对路径的支持更好。如果您需要强制使用完整 URL（例如 `https://example.com/foo/bar.md`），请使用此选项。

  ```md title="llms.txt"
  - [title](/foo/bar.md) <!-- [!code --] -->
  - [title](https://example.com/foo/bar.md) <!-- [!code ++] -->
  ```

### locale

- 类型: `string | 'all'`

- 默认值: `'/'`

- 详情:

  控制为哪个语言环境生成内容。
  - 如果未设置，默认为站点的根语言环境。
  - 如果设置为特定的语言环境键（例如 `'/zh/'`），则仅生成该语言的文件。
  - 如果设置为 `'all'`，插件将为所有配置的语言环境生成 `llms.txt` 资源。

  **为什么使用 `'all'`？**
  如果您的文档包含 LLM 难以准确翻译的专业术语或概念，为每种语言生成专用的 `llms.txt` 文件可以确保国际用户（及其 AI 助手）获得最准确的信息。

### llmsTxtTemplate

- 类型: `string`

- 默认值:

  ```ts
  const DEFAULT_LLMSTXT_TEMPLATE = `\
  # {title}
  
  {description}
  
  {details}
  
  ## Table of Contents
  
  {toc}`
  ```

- 详情:

  定义 `llms.txt` 文件的结构。您可以调整默认占位符——`{title}`、`{description}`、`{details}` 和 `{toc}`——的顺序，或使用 `llmsTxtTemplateGetter` 引入新的占位符。

### llmsTxtTemplateGetter

- 类型: `TemplateGetterOptions`

  ```ts
  /**
   * 生成链接的后缀扩展名选项
   */
  export type LinkExtension = '.html' | '.md'

  /**
   * 包含额外 LLM 友好内容的页面对象
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

  /**
   * LLM 文本生成的状态对象
   */
  export interface LLMState {
    /**
     * VuePress 应用实例
     */
    app: App

    /**
     * 站点基础 URL (Base URL)
     */
    base: string

    /**
     * 添加到 URL 前面的可选域名
     */
    domain?: string

    /**
     * 生成链接的后缀扩展名
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
    /** 任意自定义变量 */
    [key: string]: TemplateGetter | string | undefined
  }
  ```

- 默认值: `{}`

- 详情:

  为 [`llmsTxtTemplate`](#llmstxttemplate) 提供自定义变量或 Getter 函数。

  您可以使用它来注入静态字符串或动态生成的内容。

  **示例：覆盖标题**

  ```ts
  llmsPlugin({
    llmsTxtTemplateGetter: {
      title: '我的自定义文档标题',
    },
  })
  ```

  **示例：添加自定义变量**

  ```ts
  llmsPlugin({
    llmsTxtTemplate: '# {title}\n\n{customNote}',
    llmsTxtTemplateGetter: {
      customNote: '注意：此内容已针对 AI Agent 优化。',
    },
  })
  ```

  **示例：生成自定义页面列表**

  ```ts
  llmsPlugin({
    llmsTxtTemplate: '# {title}\n\n## 页面列表\n\n{pageList}',
    llmsTxtTemplateGetter: {
      pageList: (pages, state) =>
        pages.map((page) => `- ${page.title}`).join('\n'),
    },
  })
  ```

## Frontmatter 配置

插件会读取 Markdown 文件中的以下 `frontmatter` 属性。

### title {#frontmatter-title}

- 类型: `string`
- 详情:
  - 在 **首页** (`README.md`) 上，此属性覆盖 `llms.txt` 中的站点标题。
  - 在 **普通页面** 上，此属性作为目录中的页面标题。

### description {#frontmatter-description}

- 类型: `string`
- 详情:
  - 在 **首页** (`README.md`) 上，此属性覆盖 `llms.txt` 中的站点描述。
  - 在 **普通页面** 上，此属性提供目录中的页面摘要。

  _建议：为每个页面编写清晰、简洁的描述，帮助 LLM 理解链接的上下文和相关性。_

### heroText {#frontmatter-herotext}

- 类型: `string`
- 详情:
  - 仅用于首页（语言环境 `README.md`）。它是 `llms.txt` 标题的首选来源。

### tagline {#frontmatter-tagline}

- 类型: `string`
- 详情:
  - 仅用于首页（语言环境 `README.md`）。它是 `llms.txt` 描述的首选来源。

### details {#frontmatter-details}

- 类型: `string`
- 详情:
  - 仅用于首页（语言环境 `README.md`）。它提供 `llms.txt` 中 `{details}` 部分的内容。

### llmstxt

- 类型: `boolean`
- 默认值: `true`
- 详情:
  - 控制是否将当前页面包含在生成的 LLM 文件中。设置为 `false` 可对 AI Agent 隐藏特定页面。

## 其他 (Others)

建议配置服务器重定向，以便 AI Agent 即使猜测 URL 结构也能通过 `.md` 或 `.txt` 扩展名可靠地访问文件。

例如，在 **Netlify** 上，将以下内容添加到 `public/_redirects`：

```txt
/llms.md         /llms.txt 200!
/llms-full.md    /llms-full.txt 200!
```

关于重定向语法的更多详细信息，请参阅 [Netlify 文档](https://docs.netlify.com/routing/redirects)。

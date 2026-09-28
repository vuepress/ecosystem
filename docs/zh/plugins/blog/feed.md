---
icon: rss
---

# feed

<NpmBadge package="@vuepress/plugin-feed" />

为你的 VuePress 站点生成 Feed。

## 使用 {#usage}

```bash
npm i -D @vuepress/plugin-feed@next
```

```ts title=".vuepress/config.ts"
import { feedPlugin } from '@vuepress/plugin-feed'

export default {
  plugins: [
    feedPlugin({
      hostname: 'https://example.com',
      atom: true,
    }),
  ],
}
```

插件可以生成以下格式的 Feed，启用你需要的格式即可：

- Atom 1.0：`atom`
- JSON 1.1：`json`
- RSS 2.0：`rss`

`hostname` 选项是必须的，Feed 链接由它生成。

### 可视化预览 {#readable-preview}

Atom 和 RSS Feed 内置了 XSL 模板，因此在浏览器中打开时会渲染为易于阅读的 HTML 页面。你可以查看本站的 [Atom](/zh/atom.xml) 和 [RSS](/zh/rss.xml) Feed 作为示例。

如果你希望在开发服务器中预览 Feed，请设置 `devServer: true`；如果你的本地地址不是默认的 `http://localhost:{port}`，还需要配置 `devHostname`。

### 频道信息 {#channel-metadata}

`channel` 选项用于配置所有 Feed 共用的频道信息。推荐设置 `channel.pubDate`、`channel.ttl`、`channel.copyright` 和 `channel.author`。

参考：[频道选项](#channel-options)。

### 条目生成 {#item-generation}

默认情况下，除首页外所有由 Markdown 文件生成的页面都会被添加到 Feed 中。你可以：

- 通过 [feed Frontmatter](#frontmatter) 移除单个页面，或覆盖该页面 Feed 条目的字段；
- 通过 [getter 选项](#getter-options) 完全控制条目的生成逻辑。

条目默认按照 Git 中的页面创建时间排序，并在缺少创建时间时回退到 `date` Frontmatter。你需要启用 [@vuepress/plugin-git](../development/git.md) 才能获取创建时间，否则条目会遵循 VuePress 默认的页面顺序。

### 多语言支持 {#i18n}

插件会为每种语言生成独立的 Feed，你可以通过 `locales` 选项为不同语言提供特定配置。

## 选项 {#options}

::: fields
@`hostname` type=string required

站点部署的域名，例如 `https://example.com`。

@`atom` type=boolean

是否生成 Atom 1.0 Feed。

@`json` type=boolean

是否生成 JSON 1.1 Feed。

@`rss` type=boolean

是否生成 RSS 2.0 Feed。

@`count` type=number default=`100`

每个 Feed 中最多包含的条目数量。

@`image` type=string

Feed 的图片，用作横幅。

@`icon` type=string

Feed 的图标，用作网站图标。

@`preservedElements` type=`(RegExp | string)[] | (tagName: string) => boolean`

需要在 Feed 内容中保留的元素。除此之外的未知标签都会被移除。

@`filter` type=`(page: Page) => boolean` default=`({ frontmatter, filePathRelative }) => Boolean(frontmatter.feed ?? (filePathRelative && !frontmatter.home))`

用于判断页面是否包含在 Feed 中的函数。

@`sorter` type=`(pageA: Page, pageB: Page) => number`

用于对 Feed 条目排序的函数。

参考：[条目生成](#item-generation)。

@`channel` type=`Partial<FeedChannelOptions>`

生成 Feed 的频道信息。

参考：[频道选项](#channel-options)。

@`getter` type=FeedGetter

Feed 条目生成逻辑的控制器，默认使用内置的 getter。

参考：[获取器选项](#getter-options)。

@`devServer` type=boolean

是否在开发服务器中生成 Feed。

@`devHostname` type=string default=`'http://localhost:${port}'`

开发服务器中使用的域名。

@`atomOutputFilename` type=string default=`'atom.xml'`

Atom Feed 的输出文件名，相对于输出目录。

@`atomXslTemplate` type=string

Atom Feed 的 XSL 模板内容，默认为内置的 `atom.xsl`。

@`atomXslFilename` type=string default=`'atom.xsl'`

Atom XSL 文件的输出文件名，相对于输出目录。

@`jsonOutputFilename` type=string default=`'feed.json'`

JSON Feed 的输出文件名，相对于输出目录。

@`rssOutputFilename` type=string default=`'rss.xml'`

RSS Feed 的输出文件名，相对于输出目录。

@`rssXslTemplate` type=string

RSS Feed 的 XSL 模板内容，默认为内置的 `rss.xsl`。

@`rssXslFilename` type=string default=`'rss.xsl'`

RSS XSL 文件的输出文件名，相对于输出目录。

@`locales` type=`Record<string, BaseFeedPluginOptions>`

针对特定语言的配置。除 `hostname` 外，上述所有选项均受支持。

:::

## 频道选项 {#channel-options}

:::: details

::: fields
@`title` type=string default="该语言的标题"

频道的标题。

@`link` type=string default="该语言的部署链接"

频道对应的站点地址。

@`description` type=string default="该语言的描述"

频道的描述。

@`language` type=string default="该语言的 `lang`"

频道的语言。

@`copyright` type=string default="Copyright by 作者名称" recommended="Yes"

频道的版权信息。

@`pubDate` type=Date default="插件被调用的时间" recommended="Yes"

频道的发布时间。

@`lastUpdated` type=Date default="插件被调用的时间"

频道内容的最后更新时间。

@`ttl` type=number recommended="Yes"

Feed 阅读器在刷新前可以缓存内容的分钟数。

@`image` type=string recommended="Yes"

频道的图片，建议使用尺寸不小于 512×512 的方形图片。

@`icon` type=string recommended="Yes"

频道的图标，建议使用尺寸不小于 128×128 且背景透明的方形图片。

@`author` type=`FeedAuthor | FeedAuthor[]` recommended="Yes"

频道的主要作者。

```ts
interface FeedAuthor {
  name?: string
  email?: string
  /** 仅限 json 格式 */
  url?: string
  /** 仅限 json 格式 */
  avatar?: string
}
```

@`hub` type=string

WebSub 的链接，请参阅 [WebSub](https://w3c.github.io/websub/#subscription-migration)。

:::

::::

## 获取器选项 {#getter-options}

:::: details

::: fields
@`title` type=`(page: Page, app: App) => string`

获取 Feed 条目的标题。

@`link` type=`(page: Page, app: App) => string`

获取 Feed 条目的链接。

@`description` type=`(page: Page, app: App) => string | null`

获取 Feed 条目的描述。

Atom 支持在描述中使用 HTML，返回以 `html:` 开头的字符串即可。

@`excerpt` type=`(page: Page, app: App) => string | null`

获取 Feed 条目的摘要。

@`content` type=`(page: Page, app: App) => string`

获取 Feed 条目的正文内容。

@`author` type=`(page: Page, app: App) => FeedAuthor[]`

获取 Feed 条目的作者。缺少作者信息时应返回空数组。

```ts
interface FeedAuthor {
  name?: string
  email?: string
  /** 仅限 json 格式 */
  url?: string
  /** 仅限 json 格式 */
  avatar?: string
}
```

@`category` type=`(page: Page, app: App) => FeedCategory[] | null`

获取 Feed 条目的分类。

```ts
interface FeedCategory {
  name: string
  /** 仅限 rss 格式 */
  domain?: string
  /** 仅限 atom 格式 */
  scheme?: string
}
```

@`enclosure` type=`(page: Page, app: App) => FeedEnclosure | null`

获取 Feed 条目的媒体附件。

```ts
interface FeedEnclosure {
  url: string
  /** 应为标准 MIME 类型，仅限 rss 格式 */
  type: string
  /** 仅限 rss 格式 */
  length?: number
}
```

@`publishDate` type=`(page: Page, app: App) => Date | null`

获取 Feed 条目的发布日期。

@`lastUpdateDate` type=`(page: Page, app: App) => Date`

获取 Feed 条目的最后修改日期。

@`image` type=`(page: Page, app: App) => string`

获取 Feed 条目的图片，需要返回完整的绝对 URL。

@`contributor` type=`(page: Page, app: App) => FeedContributor[]`

获取 Feed 条目的贡献者。缺少贡献者信息时应返回空数组。

```ts
interface FeedContributor {
  name?: string
  email?: string
  /** 仅限 json 格式 */
  url?: string
  /** 仅限 json 格式 */
  avatar?: string
}
```

@`copyright` type=`(page: Page, app: App) => string | null`

获取 Feed 条目的版权信息。

:::

::::

## Frontmatter

### 添加与移除 {#inclusion-control}

默认情况下，除首页外所有由 Markdown 文件生成的页面都会被添加到 Feed 中。在 Frontmatter 中设置 `feed: false` 可以移除某个页面。

### 基础信息 {#standard-information}

以下标准的 Frontmatter 属性会被自动读取。

::: fields
@`title` type=string

页面标题，默认回退到第一个 `h1` 标题。

@`description` type=string

页面的描述。

@`date` type=Date

页面的发布日期，会被默认的 Feed 条目排序器使用。

@`author` type=`AuthorInfo | AuthorInfo[] | string | string[]`

页面的作者。对象形式的作者需要含有 `name` 字段，可以含有可选的 `url` 和 `email` 字段。

@`copyright` type=string

页面的版权信息。

@`cover` type=string

页面的封面图片，必须是完整的 URL 链接或绝对路径。

@`banner` type=string

页面的横幅图片，优先级高于 [cover](#cover)，会被用作 Feed 条目的图片。两者都未设置时，会使用页面内容中的第一张图片。

:::

### Feed 选项 {#feed-options}

`feed` Frontmatter 用于覆盖上述标准属性，或提供 Feed 条目专用的字段。

::: fields
@`feed` type=`FeedFrontmatterOption | false`

是否将页面包含在 Feed 中，或该页面的 Feed 条目配置。

@`feed.title` type=string

该 Feed 条目的标题。

@`feed.description` type=string

该 Feed 条目的描述，应为纯文本。

@`feed.summary` type=string

该 Feed 条目的摘要，应为 HTML 内容。

@`feed.content` type=string

该 Feed 条目的内容，默认为页面内容。

@`feed.author` type=`FeedAuthor | FeedAuthor[]`

该 Feed 条目的作者。

```ts
interface FeedAuthor {
  name?: string
  email?: string
  /** 仅限 json 格式 */
  url?: string
  /** 仅限 json 格式 */
  avatar?: string
}
```

@`feed.contributor` type=`FeedContributor | FeedContributor[]`

该 Feed 条目的贡献者。

```ts
interface FeedContributor {
  name?: string
  email?: string
  /** 仅限 json 格式 */
  url?: string
  /** 仅限 json 格式 */
  avatar?: string
}
```

@`feed.category` type=`FeedCategory | FeedCategory[]`

该 Feed 条目的分类。

```ts
interface FeedCategory {
  name: string
  /** 仅限 rss 格式 */
  domain?: string
  /** 仅限 atom 格式 */
  scheme?: string
}
```

@`feed.guid` type=string

该 Feed 条目的全局唯一标识符，默认为条目的链接。

:::

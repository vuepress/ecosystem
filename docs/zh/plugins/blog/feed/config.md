---
icon: settings-2
---

# 插件配置

## hostname

- 类型: `string`
- 必填: 是

部署站点的域名。

## atom

- 类型: `boolean`
- 默认值: `false`

是否生成 Atom 格式的 Feed。

## json

- 类型: `boolean`
- 默认值: `false`

是否生成 JSON 格式的 Feed。

## rss

- 类型: `boolean`
- 默认值: `false`

是否生成 RSS 格式的 Feed。

## image

- 类型: `string`

Feed 的大图或图标，通常用作 Banner。

## icon

- 类型: `string`

Feed 的小图标，通常用作 Favicon。

## count

- 类型: `number`
- 默认值: `100`

设置 Feed 中包含的最大项目数。在所有页面排序后，只有前 `count` 项会被保留。

如果你的站点包含大量文章，可以考虑调整此选项以减小 Feed 文件的大小。

## preservedElements

- 类型: `(RegExp | string)[] | (tagName: string) => boolean`

自定义需要在 Feed 内容中保留的元素或组件。

::: tip
默认情况下，所有未知的标签都会被移除。
:::

## filter

- 类型: `(page: Page)=> boolean`
- 默认值:

  ```js
  ;({ frontmatter, filePathRelative }) =>
    Boolean(frontmatter.feed ?? (filePathRelative && !frontmatter.home))
  ```

用于筛选 Feed 项目的自定义过滤器函数。

## sorter

- 类型: `(pageA: Page, pageB: Page)=> number`

- 默认值:

  ```ts
  // dateSorter 来自 @vuepress/helper
  ;(pageA: Page, pageB: Page): number =>
    dateSorter(
      pageA.data.git?.createdTime
        ? new Date(pageA.data.git?.createdTime)
        : pageA.frontmatter.date,
      pageB.data.git?.createdTime
        ? new Date(pageB.data.git?.createdTime)
        : pageB.frontmatter.date,
    )
  ```

用于 Feed 项目的自定义排序函数。

默认的排序行为是根据 git 获取的文件添加时间进行排序（需要 `@vuepress/plugin-git`）。

::: tip
你应该启用 `@vuepress/plugin-git` 以获取最新创建的页面作为 Feed 项目。否则，Feed 项目将按照 VuePress 中页面的默认顺序进行排序。
:::

## channel

`channel` 选项用于配置 _Feed 频道_。

查看可用选项，请参阅 [配置 → 频道](channel.md)。

## devServer

- 类型: `boolean`
- 默认值: `false`

是否在开发服务器（devServer）中启用。

::: tip
出于性能原因，我们不提供热重载支持。你需要重启开发服务器以同步更改。
:::

## devHostname

- 类型: `string`
- 默认值: `"http://localhost:${port}"`

在开发服务器中使用的域名。

## atomOutputFilename

- 类型: `string`
- 默认值: `"atom.xml"`

Atom 输出文件名，相对于输出目录。

## atomXslTemplate

- 类型: `string`
- 默认值: `@vuepress/plugin-feed/templates/atom.xsl` 的内容

Atom XSL 模板文件的内容。

## atomXslFilename

- 类型: `string`
- 默认值: `"atom.xsl"`

Atom XSL 文件名，相对于输出目录。

## jsonOutputFilename

- 类型: `string`
- 默认值: `"feed.json"`

JSON Feed 输出文件名，相对于输出目录。

## rssOutputFilename

- 类型: `string`
- 默认值: `"rss.xml"`

RSS 输出文件名，相对于输出目录。

## rssXslTemplate

- 类型: `string`
- 默认值: `@vuepress/plugin-feed/templates/rss.xsl` 的内容

RSS XSL 模板文件的内容。

## rssXslFilename

- 类型: `string`
- 默认值: `"rss.xsl"`

RSS XSL 文件名，相对于输出目录。

## getter

Feed 生成控制器，详见 [Feed Getter](./getter.md)。

::: tip
插件已内置了一个 Getter，仅在你想要完全控制 Feed 生成过程时设置此项。
:::

## locales

- 类型: `Record<string, BaseFeedOptions>`

你可以使用它为每个语言环境（locale）指定特定配置。

支持除 `hostname` 以外的上述所有选项。

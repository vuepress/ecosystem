# 插件配置

## hostname

- 类型：`string`
- 必填：是

部署网站的域名。

## atom

- 类型：`boolean`
- 默认值：`false`

是否启用 Atom 格式输出。

## json

- 类型：`boolean`
- 默认值：`false`

是否启用 JSON 格式输出。

## rss

- 类型：`boolean`
- 默认值：`false`

是否启用 RSS 格式输出。

## image

- 类型：`string`

一个大的图片，用作 feed 展示。

## icon

- 类型：`string`

一个小的图标，显示在订阅列表中。

## count

- 类型：`number`
- 默认值：`100`

设置 feed 的最大项目数量。在所有页面排序好后，插件会截取前 count 个项目。

如果你的站点文章很多，你应该考虑设置这个选项以减少 feed 文件大小。

## preservedElements

- 类型：`(RegExp | string)[] | (tagName：string) => boolean`

应在 Feed 中保留的自定义元素或组件。

::: tip 默认情况下，所有未知标签均会被移除。

:::

## filter

- 类型：`(page: Page)=> boolean`
- 默认值：

  ```js
  ;({ frontmatter, filePathRelative }) =>
    Boolean(frontmatter.feed ?? (filePathRelative && !frontmatter.home))
  ```

自定义的过滤函数，用于过滤哪些项目在 feed 中显示。

## sorter

- 类型： `(pageA: Page, pageB: Page)=> number`

- 默认值：

  ```ts
  // dateSorter 来源于 @vuepress/helper
  ;(pageA, pageB): number =>
    dateSorter(
      pageA.data.git?.createdTime
        ? new Date(pageA.data.git?.createdTime)
        : pageA.frontmatter.date,
      pageB.data.git?.createdTime
        ? new Date(pageB.data.git?.createdTime)
        : pageB.frontmatter.date,
    )
  ```

Feed 项目的排序器。

默认的排序行为是通过 Git 的文件添加日期 (需要 `@vuepress/plugin-git`)。

::: tip

你应该启用 `@vuepress/plugin-git` 来获取最新创建的页面作为 feed 项目。否则，feed 项目将按照 VuePress 中页面的默认顺序排序。

:::

## channel

`channel` 选项用于配置 Feed 频道。

可用选项详见 [配置 → 频道设置](channel.md)

## devServer

- 类型：`boolean`
- 默认值：`false`

是否在开发服务器中启用

::: tip

由于性能原因，我们不提供热更新。重启开发服务器以同步你的变更。

:::

## devHostname

- 类型：`string`
- 默认值：`"http://localhost:${port}"`

开发服务器使用的主机名

## atomOutputFilename

- 类型：`string`
- 默认值：`"atom.xml"`

Atom 格式输出路径，相对于输出路径。

## atomXslTemplate

- 类型：`string`
- 默认值：`@vuepress/plugin-feed/templates/atom.xsl` 的内容

Atom xsl 模板文件没人陪美国

## atomXslFilename

- 类型：`string`
- 默认值：`"atom.xsl"`

Atom xsl 输出路径，相对于输出路径。

## jsonOutputFilename

- 类型：`string`
- 默认值：`"feed.json"`

JSON 格式输出路径，相对于输出路径。

## rssOutputFilename

- 类型：`string`
- 默认值：`"rss.xml"`

RSS 格式输出路径，相对于输出路径。

## rssXslTemplate

- 类型：`string`
- 默认值：`@vuepress/plugin-feed/templates/rss.xsl` 的内容

RSS xsl 模板文件内容。

## rssXslFilename

- 类型：`string`
- 默认值：`"rss.xsl"`

RSS xsl 输出路径，相对于输出路径。

## getter

Feed 生成控制器，详见 [Feed 生成器](./getter.md)。

::: tip 此插件内置了生成器，只有当你想完全控制 feed 生成时才需要设置此选项。

:::

## locales

- 类型：`Record<string, BaseFeedOptions>`

你可以将它用于每个语言环境的特定选项。

除 `hostname` 外，上述任何选项均受支持。

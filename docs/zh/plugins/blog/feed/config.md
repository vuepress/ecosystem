---
icon: settings-2
---

# 插件配置

## 选项

:::: fields
@hostname@ type=string required

部署站点的域名。

@atom@ type=boolean

是否生成 Atom 格式的 Feed。

@json@ type=boolean

是否生成 JSON 格式的 Feed。

@rss@ type=boolean

是否生成 RSS 格式的 Feed。

@image@ type=string

Feed 的大图或图标，通常用作 Banner。

@icon@ type=string

Feed 的小图标，通常用作 Favicon。

@count@ type=number default=`100`

设置 Feed 中包含的最大项目数。在所有页面排序后，只有前 `count` 项会被保留。

如果你的站点包含大量文章，可以考虑调整此选项以减小 Feed 文件的大小。

@preservedElements@ type=`(RegExp | string)[] | (tagName: string) => boolean`

自定义需要在 Feed 内容中保留的元素或组件。

::: tip

默认情况下，所有未知的标签都会被移除。

:::

@filter@ type=`(page: Page) => boolean`

用于筛选 Feed 项目的自定义过滤器函数。

它的默认值为：

```js
;({ frontmatter, filePathRelative }) =>
  Boolean(frontmatter.feed ?? (filePathRelative && !frontmatter.home))
```

@sorter@ type=`(pageA: Page, pageB: Page) => number`

用于 Feed 项目的自定义排序函数。

默认的排序行为是根据 git 获取的文件添加时间进行排序（需要 `@vuepress/plugin-git`）。

它的默认值为：

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

::: tip

你应该启用 `@vuepress/plugin-git` 以获取最新创建的页面作为 Feed 项目。否则，Feed 项目将按照 VuePress 中页面的默认顺序进行排序。

:::

@channel@ type=`Partial<FeedChannelOptions>`

Feed 频道的元数据。

参考：[频道配置](./channel.md)。

@@channel.title@ type=string default="站点配置的标题"

频道的标题。

@@channel.link@ type=string default="由站点配置决定"

频道地址。

@@channel.description@ type=string default="站点配置的描述"

频道描述信息。

@@channel.language@ type=string default="站点根语言包的 `lang`，无法获取时回退到 `en-US`"

频道使用的语言。

@@channel.copyright@ type=string default="Copyright by 作者名" recommended="Yes"

频道版权信息。

@@channel.pubDate@ type=Date default="插件被调用时的时间" recommended="Yes"

频道内容的发布时间。

@@channel.lastUpdated@ type=Date default="插件被调用时的时间"

频道内容的上次更新时间。

@@channel.ttl@ type=number recommended="Yes"

缓存的存活时间，单位为分钟。

@@channel.image@ type=string recommended="Yes"

频道图片，建议使用不小于 512×512 像素的方形图片。

@@channel.icon@ type=string recommended="Yes"

频道图标，建议使用不小于 128×128 像素、背景透明的方形图片。

@@channel.author@ type=`FeedAuthor | FeedAuthor[]` recommended="Yes"

频道的主要作者。

@@channel.hub@ type=string

WebSub 的链接地址。

@devServer@ type=boolean

是否在开发服务器（devServer）中启用。

::: tip

出于性能原因，我们不提供热重载支持。你需要重启开发服务器以同步更改。

:::

@devHostname@ type=string default=`'http://localhost:${port}'`

在开发服务器中使用的域名。

@atomOutputFilename@ type=string default=`'atom.xml'`

Atom 输出文件名，相对于输出目录。

@atomXslTemplate@ type=string

Atom XSL 模板文件的内容。

它的默认值为 `@vuepress/plugin-feed/templates/atom.xsl` 的内容。

@atomXslFilename@ type=string default=`'atom.xsl'`

Atom XSL 文件名，相对于输出目录。

@jsonOutputFilename@ type=string default=`'feed.json'`

JSON Feed 输出文件名，相对于输出目录。

@rssOutputFilename@ type=string default=`'rss.xml'`

RSS 输出文件名，相对于输出目录。

@rssXslTemplate@ type=string

RSS XSL 模板文件的内容。

它的默认值为 `@vuepress/plugin-feed/templates/rss.xsl` 的内容。

@rssXslFilename@ type=string default=`'rss.xsl'`

RSS XSL 文件名，相对于输出目录。

@getter@ type=FeedGetter

Feed 生成控制器。

::: tip

插件已内置了一个 Getter，仅在你想要完全控制 Feed 生成过程时设置此项。

:::

参考：[Feed Getter](./getter.md)。

@locales@ type=`Record<string, BaseFeedPluginOptions>`

你可以使用它为每个语言环境（locale）指定特定配置。

支持除 `hostname` 以外的上述所有选项。

::::

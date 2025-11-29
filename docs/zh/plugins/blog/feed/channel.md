---
icon: tv
---

# 频道配置

`channel` 插件选项用于配置 Feed 频道。

## channel.title

- 类型：`string`
- 默认值：`SiteConfig.title`
- 详情：频道标题。

## channel.link

- 类型：`string`
- 默认值：部署链接（由 `options.hostname` 和 `context.base` 生成）
- 详情：频道地址。

## channel.description

- 类型：`string`
- 默认值：`SiteConfig.description`
- 详情：频道描述。

## channel.language

- 类型：`string`

- 默认值：
  - `siteConfig.locales['/'].lang`
  - 如果上述未提供，则回退到 `"en-US"`
- 详情：频道的语言。

## channel.copyright

- 类型：`string`
- 默认值：
  - 尝试读取频道选项中的 `author.name`，否则回退到 `Copyright by $author`
- 推荐手动设置：**是**
- 详情：频道版权信息。

## channel.pubDate

- 类型：`string`（必须是有效的 Date ISOString）
- 默认值：插件每次被调用的时间
- 推荐手动设置：**是**
- 详情：频道的发布时间。

## channel.lastUpdated

- 类型：`string`（必须是有效的 Date ISOString）
- 默认值：插件每次被调用的时间
- 详情：频道内容的最后更新时间。

## channel.ttl

- 类型：`number`
- 推荐手动设置：**是**
- 详情：内容的有效时间（Time To Live）。即在请求后保留缓存而不发起新请求的时间。

## channel.image

- 类型：`string`
- 推荐手动设置：**是**
- 详情：代表频道的图片。建议使用尺寸不小于 512×512 的方形图片。

## channel.icon

- 类型：`string`
- 推荐手动设置：**是**
- 详情：代表频道的图标，方形图片，尺寸不小于 128×128。建议使用透明背景色。

## channel.author

- 类型：`FeedAuthor`
- 推荐手动设置：**是**
- 详情：频道的作者。

::: details FeedAuthor 格式

```ts
interface FeedAuthor {
  /** 作者姓名 */
  name: string
  /** 作者邮箱 */
  email?: string
  /** 作者网站 */
  url?: string
  /**
   * 作者头像地址
   *
   * 方形，最好不小于 128×128 且背景透明
   */
  avatar?: string
}
```

:::

## channel.hub

- 类型：`string`
- 详情：Websub 链接。Websub 需要服务器后端，这与 VuePress 的机制不一致，因此如果没有特殊需求，请忽略它。详情请参阅 [Websub](https://w3c.github.io/websub/#subscription-migration)。

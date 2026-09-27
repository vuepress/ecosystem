---
icon: captions
---

# Frontmatter 配置

你可以通过配置页面 Frontmatter 来控制每个 Feed 条目的生成方式。

## 添加与移除

默认情况下，所有文章都会被添加到 Feed 流中。若要在 Feed 中移除某个页面，请在 Frontmatter 中设置 `feed: false`。

## 基础信息

插件会自动读取以下标准的 Frontmatter 属性来填充 Feed 条目。

:::: fields
@`title` type=string

页面标题。如果未指定，默认自动读取页面的第一个 `h1` 标题内容。

@`description` type=string

页面的描述或摘要。

@`date` type=`Date`

页面的发布日期。

@`article` type=boolean

该页面是否为一篇文章。

::: tip

如果设置为 `false`，该页面将被视为非文章页面，并且不会包含在最终的 Feed 中。

:::

@`copyright` type=string

页面的版权信息。

@`cover` type=string

页面的封面图片，必须是完整的 URL 链接或绝对路径。

@`banner` type=string

页面的横幅图片，它会被用作 Feed 条目的图片，优先级高于 [cover](#cover)。它必须是完整的 URL 链接或绝对路径。

两者都未设置时，会使用页面内容中的第一张图片。

::::

## Feed 选项

你可以使用 `feed` 对象来覆盖默认属性，或为 RSS/Atom/JSON 条目提供特定的配置。

:::: fields
@`feed` type=`FeedFrontmatterOption | false`

是否将页面包含在 Feed 中，或页面的 Feed 条目配置。

设置为 `false` 可将页面从 Feed 中移除。

@@`feed.title` type=string

该条目在 Feed 中显示的标题。

@@`feed.description` type=string

该条目在 Feed 中显示的描述。

@@`feed.content` type=string

该条目在 Feed 中的内容。

@@`feed.author` type=`FeedAuthor[] | FeedAuthor`

该 Feed 条目的作者。

::: details FeedAuthor 格式

```ts
interface FeedAuthor {
  /**
   * 作者姓名
   */
  name?: string

  /**
   * 作者邮箱
   */
  email?: string

  /**
   * 作者网站
   *
   * 仅限 json 格式
   */
  url?: string

  /**
   * 作者头像
   *
   * 仅限 json 格式
   */
  avatar?: string
}
```

:::

@@`feed.contributor` type=`FeedContributor[] | FeedContributor`

该 Feed 条目的贡献者。

::: details FeedContributor 格式

```ts
interface FeedContributor {
  /**
   * 作者姓名
   */
  name?: string

  /**
   * 作者邮箱
   */
  email?: string

  /**
   * 作者网站
   *
   * 仅限 json 格式
   */
  url?: string

  /**
   * 作者头像
   *
   * 仅限 json 格式
   */
  avatar?: string
}
```

:::

@@`feed.guid` type=string

Feed 条目的唯一标识符，用于识别该条目。

::: tip

你应该确保每个 Feed 条目都有一个唯一的 GUID。

:::

::::

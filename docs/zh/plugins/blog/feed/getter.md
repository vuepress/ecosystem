---
icon: arrow-up-from-line
---

# Feed 获取器

你可以通过在插件选项中配置 `getter` 对象，来完全控制 Feed 项目的生成逻辑。

## getter.title

- 类型: `(page: Page, app: App) => string`
- 详情：自定义 Feed 项目的标题。

## getter.link

- 类型: `(page: Page, app: App) => string`
- 详情：自定义 Feed 项目的链接 (URL)。

## getter.description

- 类型: `(page: Page, app: App) => string | undefined`
- 详情：自定义 Feed 项目的描述或摘要。

::: tip

由于 Atom 支持在摘要中使用 HTML，你可以在此处返回 HTML 内容。但是，为了确保正确渲染，返回的字符串必须以 `html:` 前缀开头。

:::

## getter.content

- 类型: `(page: Page, app: App) => string`
- 详情：自定义 Feed 项目的正文内容。

## getter.author

- 类型: `(page: Page, app: App) => FeedAuthor[]`
- 详情：获取 Feed 项目的作者列表。

::: tip

如果缺少作者信息，该 getter 应当返回一个空数组 `[]`。

:::

::: details FeedAuthor 格式

```ts
interface FeedAuthor {
  /**
   * 作者姓名
   */
  name?: string

  /**
   * 作者电子邮箱
   */
  email?: string

  /**
   * 作者网站
   *
   * @description 仅限 JSON 格式
   */
  url?: string

  /**
   * 作者头像
   *
   * @description 仅限 JSON 格式
   */
  avatar?: string
}
```

:::

## getter.category

- 类型: `(page: Page, app: App) => FeedCategory[] | undefined`
- 详情：获取与 Feed 项目关联的分类。

::: details FeedCategory 格式

```ts
interface FeedCategory {
  /**
   * 分类名称
   */
  name: string

  /**
   * 标识分类法的字符串 (Domain)
   *
   * @description 仅限 RSS 格式
   */
  domain?: string

  /**
   * 通过 URI 标识的分类方案 (Scheme)
   *
   * @description 仅限 Atom 格式
   */
  scheme?: string
}
```

:::

## getter.enclosure

- 类型: `(page: Page, app: App) => FeedEnclosure | undefined`
- 详情：指定 Feed 项目的媒体附件（例如音频、视频或文件）。

::: details FeedEnclosure 格式

```ts
interface FeedEnclosure {
  /**
   * 附件链接
   */
  url: string

  /**
   * 附件的 MIME 类型
   *
   * @description 应为标准 MIME 类型，仅限 RSS 格式
   */
  type: string

  /**
   * 大小（字节）
   *
   * @description 仅限 RSS 格式
   */
  length?: number
}
```

:::

## getter.publishDate

- 类型: `(page: Page, app: App) => Date | undefined`
- 详情：确定 Feed 项目的发布日期。

## getter.lastUpdateDate

- 类型: `(page: Page, app: App) => Date`
- 详情：确定 Feed 项目的最后修改日期。

## getter.image

- 类型: `(page: Page, app: App) => string`
- 详情：设置 Feed 项目的图片。

::: tip

请确保返回的是完整的绝对 URL。

:::

## getter.contributor

- 类型: `(page: Page, app: App) => FeedContributor[]`
- 详情：获取 Feed 项目的贡献者列表。

::: tip

如果缺少贡献者信息，该 getter 应当返回一个空数组 `[]`。

:::

::: details FeedContributor 格式

```ts
interface FeedContributor {
  /**
   * 贡献者姓名
   */
  name?: string

  /**
   * 贡献者电子邮箱
   */
  email?: string

  /**
   * 贡献者网站
   *
   * @description 仅限 JSON 格式
   */
  url?: string

  /**
   * 贡献者头像
   *
   * @description 仅限 JSON 格式
   */
  avatar?: string
}
```

:::

## getter.copyright

- 类型: `(page: Page, app: App) => string | undefined`
- 详情：指定 Feed 项目的版权信息。

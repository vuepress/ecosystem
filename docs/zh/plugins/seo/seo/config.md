---
icon: settings-2
---

# 选项

## 选项

::: fields
@hostname@ type=string required

部署域名。

@author@ type=SeoAuthor

默认作者。

其类型为：

```ts
type AuthorName = string

interface AuthorInfo {
  /** 作者姓名 */
  name: string
  /** 作者网站 */
  url?: string
  /** 作者 Email */
  email?: string
}

type SeoAuthor = AuthorInfo | AuthorInfo[] | AuthorName | AuthorName[]
```

@autoDescription@ type=boolean default=`true`

是否自动生成描述。

@canonical@ type=`string | ((page: Page) => string | null)`

首选链接。

参考：[规范链接](./guide.md#规范链接)。

@fallBackImage@ type=string

当找不到图片时的回退图片链接。

@restrictions@ type=string

内容分级。内容的年龄分级，格式为 `[int]+`，如 `"13+"`。

@twitterID@ type=string

你的 twitter 用户名。

@isArticle@ type=`(page: Page) => boolean`

你可以使用此选项判断一个页面是否是文章。

参考：[页面类型](./guide.md#页面类型)。

@ogp@ type=`(ogp: SeoContent, page: Page, app: App) => SeoContent`

自定义 OGP 生成器。

你可以使用此选项来注入新的或覆盖掉默认生成的 OGP 标签。

参考：[OGP](./guide.md#ogp)。

@jsonLd@ type=`(jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema, page: Page, app: App) => ArticleSchema | BlogPostingSchema | WebPageSchema`

自定义 JSON-LD 生成器。

你可以使用此选项来注入新的或覆盖掉默认生成的 JSON-LD 标签。

参考：[JSON-LD](./guide.md#json-ld)。

@customHead@ type=`(head: HeadConfig[], page: Page, app: App) => void`

你可以使用此选项来直接注入任意格式的标签到 `<head>`。

参考：[自定义 head 标签](./guide.md#自定义-head-标签)。

:::

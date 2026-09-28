---
icon: scan-search
---

# seo

<NpmBadge package="@vuepress/plugin-seo" />

通过向 `<head>` 注入标签，让你的站点支持[开放内容协议 OGP](https://ogp.me/)与 [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)。

## 使用

```bash
npm i -D @vuepress/plugin-seo@next
```

```ts title=".vuepress/config.ts"
import { seoPlugin } from '@vuepress/plugin-seo'

export default {
  plugins: [
    seoPlugin({
      hostname: 'https://example.com',
    }),
  ],
}
```

插件开箱即用，会读取站点配置与页面 Frontmatter，尽可能生成所需的标签。默认情况下，除首页外所有由 Markdown 文件生成的页面都被视为文章。

### 默认的 OGP 生成逻辑

以下 `<meta>` 标签会被注入 `<head>`：

|         属性名称         |                                                  值                                                  |
| :----------------------: | :--------------------------------------------------------------------------------------------------: |
|         `og:url`         |                                  `hostname` + `base` + `page.path`                                   |
|      `og:site_name`      |                                     该语言的标题，回退到站点标题                                     |
|        `og:title`        |                                             `page.title`                                             |
|     `og:description`     |            `page.frontmatter.description`，未设置时由 `autoDescription` 根据页面内容生成             |
|        `og:type`         |                        `"article"` 或 `"website"`，参考[页面类型](#页面类型)                         |
|        `og:image`        | `page.frontmatter.banner` \|\| `page.frontmatter.cover` \|\| 页面中的第一张图片 \|\| `fallBackImage` |
|    `og:updated_time`     |                                     来自 `@vuepress/plugin-git`                                      |
|       `og:locale`        |                                             `page.lang`                                              |
|  `og:locale:alternate`   |                                     页面的其他语言，来自站点配置                                     |
|  `og:restrictions:age`   |                                            `restrictions`                                            |
|      `twitter:card`      |                               仅当找到封面时为 `"summary_large_image"`                               |
|   `twitter:image:src`    |                                            页面的封面图片                                            |
|   `twitter:image:alt`    |                                             `page.title`                                             |
|    `twitter:creator`     |                                             `twitterID`                                              |
|     `article:author`     |                     `page.frontmatter.author` \|\| `author`，参考[作者](#author)                     |
|      `article:tag`       |                         `page.frontmatter.tags` \|\| `page.frontmatter.tag`                          |
| `article:published_time` |                             `page.frontmatter.date`，回退到 Git 创建时间                             |
| `article:modified_time`  |                                     来自 `@vuepress/plugin-git`                                      |

只有取值存在的标签才会被注入，因此 `og:updated_time`、`article:tag` 以及来自 `restrictions` 和 `twitterID` 的标签在不可用时会被省略。

### 默认的 JSON-LD 生成逻辑

|     属性名      |                                   值                                   |
| :-------------: | :--------------------------------------------------------------------: |
|   `@context`    |                         `"https://schema.org"`                         |
|     `@type`     | 文章为 `"Article"` 并含有 `headline`，其余为 `"WebPage"` 并含有 `name` |
|     `image`     |                页面中的所有图片，回退到 `fallBackImage`                |
| `datePublished` |              `page.frontmatter.date`，回退到 Git 创建时间              |
| `dateModified`  |                      来自 `@vuepress/plugin-git`                       |
|    `author`     |        `page.frontmatter.author` \|\| `author`，标记为 `Person`        |

### 页面类型

`og:type` 标签与 JSON-LD 的 `@type` 均取决于页面是否为文章，你可以使用 [isArticle](#isarticle) 选项提供自己的判断逻辑。

如果某个页面属于其他类型，例如图书、音乐，你可以通过修改 [ogp](#ogp) 与 [jsonLd](#jsonld) 对象来处理。

### 自定义生成过程

[ogp](#ogp) 与 [jsonLd](#jsonld) 选项会收到默认对象，并返回修改后的对象。

比如你使用的第三方主题要求为每篇文章在 Frontmatter 中设置 `banner`，你可以这样写：

```ts
seoPlugin({
  ogp: (ogp, page) => ({
    ...ogp,
    'og:image': page.frontmatter.banner || ogp['og:image'],
  }),
})
```

### 规范链接

如果相同内容可以在不同 URL 下访问，你可能需要 [canonical](#canonical) 选项来声明首选地址。它接受一个会被添加到页面链接之前的字符串，或一个返回链接的函数。

例如你的站点部署在 `example.com` 的 `docs` 目录下，并可通过 `http://example.com/docs/xxx`、`https://example.com/docs/xxx`、`http://www.example.com/docs/xxx` 与首选的 `https://www.example.com/docs/xxx` 访问，将 `canonical` 设置为 `https://www.example.com/docs/`，搜索引擎便知道应当收录哪个地址。

### head 标签

你可以通过页面的 `head` Frontmatter 直接添加标签：

```md
---
head:
  - - meta
    - name: keywords
      content: SEO plugin
---
```

其他协议可以通过 [customHead](#customhead) 选项支持，它会修改页面的 head 标签配置。

## 选项

::: fields
@`hostname` type=string required

站点部署的域名。

@`author` type=SeoAuthor

默认作者。

```ts
type AuthorName = string

interface AuthorInfo {
  name: string
  url?: string
  email?: string
}

type SeoAuthor = AuthorInfo | AuthorInfo[] | AuthorName | AuthorName[]
```

@`autoDescription` type=boolean default=`true`

当 Frontmatter 中未设置页面描述时，是否根据页面内容生成描述。

@`canonical` type=`string | ((page: Page) => string | null)`

页面的首选链接。

参考：[规范链接](#规范链接)。

@`fallBackImage` type=string

当找不到图片时的回退图片链接，应为完整或绝对链接。

@`restrictions` type=string

内容的年龄分级，格式为 `[int]+`，如 `"13+"`。

@`twitterID` type=string

作者的 Twitter 用户名。

@`isArticle` type=`(page: Page) => boolean`

用于判断页面是否为文章的函数。

参考：[页面类型](#页面类型)。

@`ogp` type=`(ogp: SeoContent, page: Page, app: App) => SeoContent`

自定义 OGP 生成器。

参考：[自定义生成过程](#自定义生成过程)。

@`jsonLd` type=`(jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema, page: Page, app: App) => ArticleSchema | BlogPostingSchema | WebPageSchema`

自定义 JSON-LD 生成器。

参考：[自定义生成过程](#自定义生成过程)。

@`customHead` type=`(head: HeadConfig[], page: Page, app: App) => void`

自定义 head 标签生成器。

参考：[head 标签](#head-标签)。

:::

## Frontmatter

::: fields
@`seo` type=boolean default=`true`

是否为该页面注入 SEO 标签。

:::

## 相关

- [开放内容协议 OGP](https://ogp.me/)，生成的 `<meta>` 标签符合该协议。
- [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/)，用于结构化数据。
- [Schema.Org](https://schema.org/)，结构化数据的 Schema 定义。
- [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/)，主要标记 HTML 结构，插件无法支持。
- [Google 富媒体结构测试工具](https://search.google.com/test/rich-results)，用于测试站点的结构化数据。

---
icon: settings-2
---

# Config

## Options

::: fields
@`hostname` type=string required

Deploy hostname.

@`author` type=SeoAuthor

Default author.

Its type is:

```ts
type AuthorName = string

interface AuthorInfo {
  /** Author name */
  name: string
  /** Author website */
  url?: string
  /** Author email */
  email?: string
}

type SeoAuthor = AuthorInfo | AuthorInfo[] | AuthorName | AuthorName[]
```

@`autoDescription` type=boolean default=`true`

Whether generate description automatically.

@`canonical` type=`string | ((page: Page) => string | null)`

Canonical link.

See also: [Canonical Link](./guide.md#canonical-link).

@`fallBackImage` type=string

Fallback Image link when no image are found.

@`restrictions` type=string

Content restrictions. The age rating of the content, the format is `[int]+`, such as `"13+"`.

@`twitterID` type=string

Fill in your twitter username.

@`isArticle` type=`(page: Page) => boolean`

Use this option to judge whether the page is an article.

See also: [Page Type](./guide.md#page-type).

@`ogp` type=`(ogp: SeoContent, page: Page, app: App) => SeoContent`

Custom OGP Generator.

You can use this option to edit OGP tags.

See also: [OGP](./guide.md#ogp).

@`jsonLd` type=`(jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema, page: Page, app: App) => ArticleSchema | BlogPostingSchema | WebPageSchema`

Custom JSON-LD Generator.

You can use this option to edit JSON-LD properties.

See also: [JSON-LD](./guide.md#json-ld).

@`customHead` type=`(head: HeadConfig[], page: Page, app: App) => void`

You can use this option to edit tags injected to `<head>`.

See also: [Customize head Tags](./guide.md#customize-head-tags).

:::

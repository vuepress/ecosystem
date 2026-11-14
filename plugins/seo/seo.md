---
url: /ecosystem/plugins/seo/seo.md
---
# seo

Make your site support [Open Content Protocol OGP](https://ogp.me/) and [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/) by injecting tags into `<head>`.

## Usage

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

The plugin works out of the box, it reads the site config and the page frontmatter to generate the tags as much as possible. By default, every page generated from a Markdown file is treated as an article, except the homepage.

### Default OGP Generation

The following `<meta>` tags are injected into `<head>`:

|        Meta Name         |                                                 Value                                                 |
| :----------------------: | :---------------------------------------------------------------------------------------------------: |
|         `og:url`         |                                   `hostname` + `base` + `page.path`                                   |
|      `og:site_name`      |                        The title of the locale, falling back to the site title                        |
|        `og:title`        |                                             `page.title`                                              |
|     `og:description`     |        `page.frontmatter.description`, generated from the page content when `autoDescription`         |
|        `og:type`         |                     `"article"` or `"website"`, see [Article Type](#article-type)                     |
|        `og:image`        | `page.frontmatter.banner` || `page.frontmatter.cover` || first image in page || `fallBackImage` |
|    `og:updated_time`     |                                      from `@vuepress/plugin-git`                                      |
|       `og:locale`        |                                              `page.lang`                                              |
|  `og:locale:alternate`   |                           Other languages of the page, from the site config                           |
|  `og:restrictions:age`   |                                            `restrictions`                                             |
|      `twitter:card`      |                          `"summary_large_image"`, only when a cover is found                          |
|   `twitter:image:src`    |                                         The cover of the page                                         |
|   `twitter:image:alt`    |                                             `page.title`                                              |
|    `twitter:creator`     |                                              `twitterID`                                              |
|     `article:author`     |                    `page.frontmatter.author` || `author`, see [Author](#author)                     |
|      `article:tag`       |                          `page.frontmatter.tags` || `page.frontmatter.tag`                          |
| `article:published_time` |                    `page.frontmatter.date`, falling back to the git creation time                     |
| `article:modified_time`  |                                      from `@vuepress/plugin-git`                                      |

Only the tags with a value are injected, so `og:updated_time`, `article:tag` and the tags from `restrictions` and `twitterID` are omitted when they are not available.

### Default JSON-LD Generation

|  Property Name  |                                    Value                                    |
| :-------------: | :-------------------------------------------------------------------------: |
|   `@context`    |                           `"https://schema.org"`                            |
|     `@type`     | `"Article"` with `headline` for articles, `"WebPage"` with `name` otherwise |
|     `image`     |           All images in the page, falling back to `fallBackImage`           |
| `datePublished` |       `page.frontmatter.date`, falling back to the git creation time        |
| `dateModified`  |                         from `@vuepress/plugin-git`                         |
|    `author`     |         `page.frontmatter.author` || `author`, marked as `Person`         |

### Article Type

The `og:type` tag and the JSON-LD `@type` both depend on whether the page is an article. Use the [isArticle](#isarticle) option to provide your own logic.

If a page fits another type, for example books or music, you can handle it by modifying the [ogp](#ogp) and [jsonLd](#jsonld) object.

### Customizing Generation

The [ogp](#ogp) and [jsonLd](#jsonld) options receive the default object and return a modified one.

For example, if a third-party theme requires you to set `banner` in the frontmatter of each article, you can use:

```ts
seoPlugin({
  ogp: (ogp, page) => ({
    ...ogp,
    'og:image': page.frontmatter.banner || ogp['og:image'],
  }),
})
```

### Canonical Link

If the same content is available under different URLs, you may need the [canonical](#canonical) option to declare the preferred one. It accepts a prefix that is prepended to the page link, or a function to return the link.

For example, if your site is deployed under the `docs` directory of `example.com` and available at `http://example.com/docs/xxx`, `https://example.com/docs/xxx`, `http://www.example.com/docs/xxx` and `https://www.example.com/docs/xxx` which is preferred, set `canonical` to `https://www.example.com/docs/` so that search engines know which URL to index.

### Head Tags

You can add tags directly with the `head` frontmatter of a page:

```md
---
head:
  - - meta
    - name: keywords
      content: SEO plugin
---
```

Other protocols can be supported with the [customHead](#customhead) option, which modifies the head tag config of the page.

## Options

::: fields
@`hostname` type=string required

The hostname where the site is deployed.

@`author` type=SeoAuthor

The default author.

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

Whether to generate the page description from the page content when it is not set in the frontmatter.

@`canonical` type=`string | ((page: Page) => string | null)`

The canonical link of the page.

See also: [Canonical Link](#canonical-link).

@`fallBackImage` type=string

The fallback image used when no image is found, which should be a complete or absolute link.

@`restrictions` type=string

The age rating of the content, in the format of `[int]+`, e.g. `"13+"`.

@`twitterID` type=string

The Twitter username of the author.

@`isArticle` type=`(page: Page) => boolean`

The function to determine whether a page is an article.

See also: [Article Type](#article-type).

@`ogp` type=`(ogp: SeoContent, page: Page, app: App) => SeoContent`

The custom OGP generator.

See also: [Customizing Generation](#customizing-generation).

@`jsonLd` type=`(jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema, page: Page, app: App) => ArticleSchema | BlogPostingSchema | WebPageSchema`

The custom JSON-LD generator.

See also: [Customizing Generation](#customizing-generation).

@`customHead` type=`(head: HeadConfig[], page: Page, app: App) => void`

The custom head tags generator.

See also: [Head Tags](#head-tags).

:::

## Frontmatter

::: fields
@`seo` type=boolean default=`true`

Whether to inject the SEO tags for the page.

:::

## Related

* [Open Content Protocol OGP](https://ogp.me/), which the generated `<meta>` tags conform to.
* [JSON-LD 1.1](https://www.w3.org/TR/json-ld-api/), used for the structured data.
* [Schema.Org](https://schema.org/), the schema definition of the structured data.
* [RDFa 1.1](https://www.w3.org/TR/rdfa-primer/), which marks the HTML structure and is not supported by the plugin.
* [Google Rich Results Test](https://search.google.com/test/rich-results), which tests the structured data of a site.

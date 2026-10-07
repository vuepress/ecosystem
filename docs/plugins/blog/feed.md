---
icon: rss
---

# feed

<NpmBadge package="@vuepress/plugin-feed" />

Generate feeds for your VuePress site.

## Usage

```bash
npm i -D @vuepress/plugin-feed@next
```

```ts title=".vuepress/config.ts"
import { feedPlugin } from '@vuepress/plugin-feed'

export default {
  plugins: [
    feedPlugin({
      hostname: 'https://example.com',
      atom: true,
    }),
  ],
}
```

The plugin can generate the following formats. Enable the ones you need:

- Atom 1.0: `atom`
- JSON 1.1: `json`
- RSS 2.0: `rss`

The `hostname` option is required, as the feed links are generated from it.

### Readable Preview

Atom and RSS feeds include XSL templates, so they are rendered as human-readable HTML when opened in a browser. See the [Atom](/atom.xml) and [RSS](/rss.xml) feeds of this site for a live example.

To preview feeds in the development server, set `devServer: true`, and configure `devHostname` if your local address differs from the default `http://localhost:{port}`.

### Channel Metadata

The `channel` option configures the metadata shared by all the generated feeds. It is recommended to set `channel.pubDate`, `channel.ttl`, `channel.copyright` and `channel.author`.

See also: [Channel Options](#channel-options).

### Item Generation

By default, every page generated from a Markdown file is included in the feed, except the homepage. You can:

- exclude a single page, or override the fields of its feed item, with the [feed frontmatter](#frontmatter);
- take full control of the item generation with the [getter option](#getter-options).

Items are sorted by the page creation time from git, falling back to the `date` frontmatter. [@vuepress/plugin-git](../development/git.md) must be enabled to have the creation time, otherwise the items follow the default page order.

### I18n

The plugin generates a separate feed for each locale, which can be configured with the `locales` option.

## Options

::: fields
@`hostname` type=string required

The hostname where the site is deployed, e.g. `https://example.com`.

@`atom` type=boolean

Whether to generate an Atom 1.0 feed.

@`json` type=boolean

Whether to generate a JSON 1.1 feed.

@`rss` type=boolean

Whether to generate an RSS 2.0 feed.

@`count` type=number default=`100`

The maximum number of items in each feed.

@`image` type=string

The image of the feeds, used as a banner.

@`icon` type=string

The icon of the feeds, used as a favicon.

@`preservedElements` type=`(RegExp | string)[] | (tagName: string) => boolean`

The elements to preserve in the feed content. All other unknown tags are removed.

@`filter` type=`(page: Page) => boolean` default=`({ frontmatter, filePathRelative }) => Boolean(frontmatter.feed ?? (filePathRelative && !frontmatter.home))`

A function to determine whether a page is included in the feed.

@`sorter` type=`(pageA: Page, pageB: Page) => number`

A function to sort the feed items.

See also: [Item Generation](#item-generation).

@`channel` type=`Partial<FeedChannelOptions>`

The metadata of the generated feeds.

See also: [Channel Options](#channel-options).

@`getter` type=FeedGetter

The controller of the feed item generation, a built-in getter is used by default.

See also: [Getter Options](#getter-options).

@`devServer` type=boolean

Whether to generate feeds in the development server.

@`devHostname` type=string default=`'http://localhost:${port}'`

The hostname used in the development server.

@`atomOutputFilename` type=string default=`'atom.xml'`

The output filename of the Atom feed, relative to the output directory.

@`atomXslTemplate` type=string

The content of the XSL template of the Atom feed, which defaults to the built-in `atom.xsl`.

@`atomXslFilename` type=string default=`'atom.xsl'`

The output filename of the Atom XSL file, relative to the output directory.

@`jsonOutputFilename` type=string default=`'feed.json'`

The output filename of the JSON feed, relative to the output directory.

@`rssOutputFilename` type=string default=`'rss.xml'`

The output filename of the RSS feed, relative to the output directory.

@`rssXslTemplate` type=string

The content of the XSL template of the RSS feed, which defaults to the built-in `rss.xsl`.

@`rssXslFilename` type=string default=`'rss.xsl'`

The output filename of the RSS XSL file, relative to the output directory.

@`locales` type=`Record<string, BaseFeedPluginOptions>`

The configuration for specific locales. Every option above except `hostname` is supported.

:::

## Channel Options

:::: details

::: fields
@`title` type=string default="The title of the locale"

The title of the channel.

@`link` type=string default="The deployment link of the locale"

The address of the site the channel stands for.

@`description` type=string default="The description of the locale"

The description of the channel.

@`language` type=string default="The `lang` of the locale"

The language of the channel.

@`copyright` type=string default="Copyright by the author name" recommended="Yes"

The copyright notice of the channel.

@`pubDate` type=Date default="The time when the plugin is invoked" recommended="Yes"

The publication date of the channel.

@`lastUpdated` type=Date default="The time when the plugin is invoked"

The last updated time of the channel content.

@`ttl` type=number recommended="Yes"

The number of minutes a feed reader may cache the content before refreshing it.

@`image` type=string recommended="Yes"

The image of the channel, a square image of at least 512×512 pixels is recommended.

@`icon` type=string recommended="Yes"

The icon of the channel, a square image of at least 128×128 pixels with a transparent background is recommended.

@`author` type=`FeedAuthor | FeedAuthor[]` recommended="Yes"

The primary author of the channel.

```ts
interface FeedAuthor {
  name?: string
  email?: string
  /** Json feed only */
  url?: string
  /** Json feed only */
  avatar?: string
}
```

@`hub` type=string

The URL of the WebSub hub, see [WebSub](https://w3c.github.io/websub/#subscription-migration).

:::

::::

## Getter Options

:::: details

::: fields
@`title` type=`(page: Page, app: App) => string`

Get the title of the feed item.

@`link` type=`(page: Page, app: App) => string`

Get the link of the feed item.

@`description` type=`(page: Page, app: App) => string | null`

Get the description of the feed item.

Atom supports HTML in the description, return a string prefixed with `html:` to have it rendered.

@`excerpt` type=`(page: Page, app: App) => string | null`

Get the excerpt of the feed item.

@`content` type=`(page: Page, app: App) => string`

Get the content of the feed item.

@`author` type=`(page: Page, app: App) => FeedAuthor[]`

Get the authors of the feed item. Return an empty array when there is no author.

```ts
interface FeedAuthor {
  name?: string
  email?: string
  /** Json feed only */
  url?: string
  /** Json feed only */
  avatar?: string
}
```

@`category` type=`(page: Page, app: App) => FeedCategory[] | null`

Get the categories of the feed item.

```ts
interface FeedCategory {
  name: string
  /** Rss format only */
  domain?: string
  /** Atom format only */
  scheme?: string
}
```

@`enclosure` type=`(page: Page, app: App) => FeedEnclosure | null`

Get the enclosure of the feed item.

```ts
interface FeedEnclosure {
  url: string
  /** Should be a standard MIME type, rss format only */
  type: string
  /** Rss format only */
  length?: number
}
```

@`publishDate` type=`(page: Page, app: App) => Date | null`

Get the publish date of the feed item.

@`lastUpdateDate` type=`(page: Page, app: App) => Date`

Get the last update date of the feed item.

@`image` type=`(page: Page, app: App) => string`

Get the image of the feed item. Return a complete absolute URL.

@`contributor` type=`(page: Page, app: App) => FeedContributor[]`

Get the contributors of the feed item. Return an empty array when there is no contributor.

```ts
interface FeedContributor {
  name?: string
  email?: string
  /** Json feed only */
  url?: string
  /** Json feed only */
  avatar?: string
}
```

@`copyright` type=`(page: Page, app: App) => string | null`

Get the copyright of the feed item.

:::

::::

## Frontmatter

### Inclusion Control

By default, every page generated from a Markdown file is included in the feed, except the homepage. Set `feed: false` in the frontmatter to exclude a page.

### Standard Information

The following standard frontmatter properties are read automatically.

::: fields
@`title` type=string

The title of the page, which falls back to the first `h1` header.

@`description` type=string

The description of the page.

@`date` type=Date

The publish date of the page, used by the default feed item sorter.

@`author` type=`AuthorInfo | AuthorInfo[] | string | string[]`

The author of the page. An object author should have a `name` field, and can have optional `url` and `email` fields.

@`copyright` type=string

The copyright of the page.

@`cover` type=string

The cover image of the page, which must be a complete URL or an absolute path.

@`banner` type=string

The banner image of the page, which takes priority over [cover](#cover) and is used as the feed item image. When neither is set, the first image of the page content is used.

:::

### Feed Options

The `feed` frontmatter overrides the standard properties or provides fields specific to the feed item.

::: fields
@`feed` type=`FeedFrontmatterOption | false`

Whether to include the page in the feed, or the feed item config of the page.

@`feed.title` type=string

The title used for the feed item.

@`feed.description` type=string

The description used for the feed item, which should be plain text.

@`feed.summary` type=string

The summary used for the feed item, which should be HTML content.

@`feed.content` type=string

The content used for the feed item, which defaults to the page content.

@`feed.author` type=`FeedAuthor | FeedAuthor[]`

The authors of the feed item.

```ts
interface FeedAuthor {
  name?: string
  email?: string
  /** Json feed only */
  url?: string
  /** Json feed only */
  avatar?: string
}
```

@`feed.contributor` type=`FeedContributor | FeedContributor[]`

The contributors of the feed item.

```ts
interface FeedContributor {
  name?: string
  email?: string
  /** Json feed only */
  url?: string
  /** Json feed only */
  avatar?: string
}
```

@`feed.category` type=`FeedCategory | FeedCategory[]`

The categories of the feed item.

```ts
interface FeedCategory {
  name: string
  /** Rss format only */
  domain?: string
  /** Atom format only */
  scheme?: string
}
```

@`feed.guid` type=string

The globally unique identifier of the feed item, which defaults to its link.

:::

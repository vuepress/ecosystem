---
icon: settings-2
---

# Plugin Config

## Options

:::: fields
@`hostname` type=string required

The domain name where the site is deployed.

@`atom` type=boolean

Whether to generate an Atom feed.

@`json` type=boolean

Whether to generate a JSON feed.

@`rss` type=boolean

Whether to generate an RSS feed.

@`image` type=string

A large image or icon for the feed, typically used as a banner.

@`icon` type=string

A small icon for the feed, typically used as a favicon.

@`count` type=number default=`100`

The maximum number of items to include in the feed. After sorting all valid pages, only the first `count` items will be preserved.

If your site contains a large number of articles, consider adjusting this option to reduce the feed file size.

@`preservedElements` type=`(RegExp | string)[] | (tagName: string) => boolean`

Custom elements or components that should be preserved in the feed content.

::: tip

By default, all unknown tags will be removed.

:::

@`filter` type=`(page: Page) => boolean`

A custom filter function to determine which pages are included in the feed.

Its default value is:

```js
;({ frontmatter, filePathRelative }) =>
  Boolean(frontmatter.feed ?? (filePathRelative && !frontmatter.home))
```

@`sorter` type=`(pageA: Page, pageB: Page) => number`

A custom sorter function for feed items.

The default behavior sorts items by the file creation time retrieved from git (requires `@vuepress/plugin-git`).

Its default value is:

```ts
// dateSorter is from @vuepress/helper
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

You should enable `@vuepress/plugin-git` to accurately use the creation time of pages for sorting. Otherwise, feed items will follow the default page order in VuePress.

:::

@`channel` type=`Partial<FeedChannelOptions>`

Metadata of the feed channel.

See also: [Channel Config](./channel.md).

@@`channel.title` type=string default="Site config title"

The title of the channel.

@@`channel.link` type=string default="Determined by the site config"

The address of the channel.

@@`channel.description` type=string default="Site config description"

The description of the channel.

@@`channel.language` type=string default="Site root locale `lang`, falling back to `en-US`"

The language of the channel.

@@`channel.copyright` type=string default="Copyright by the author name" recommended="Yes"

The copyright information for the channel.

@@`channel.pubDate` type=Date default="The time when the plugin is invoked" recommended="Yes"

The publication date of the channel.

@@`channel.lastUpdated` type=Date default="The time when the plugin is invoked"

The last update time of the channel content.

@@`channel.ttl` type=number recommended="Yes"

Time to live in minutes, indicating how long a feed reader should cache the content.

@@`channel.image` type=string recommended="Yes"

The channel image, recommended to be a square image of at least 512×512 pixels.

@@`channel.icon` type=string recommended="Yes"

The channel icon, recommended to be a square image of at least 128×128 pixels with a transparent background.

@@`channel.author` type=`FeedAuthor | FeedAuthor[]` recommended="Yes"

The primary author of the channel.

@@`channel.hub` type=string

The URL for the WebSub hub.

@`devServer` type=boolean

Whether to enable feed generation in the development server.

::: tip

For performance reasons, hot reload is not available. You must restart the devServer to sync changes.

:::

@`devHostname` type=string default=`'http://localhost:${port}'`

The hostname to use when running in the development server.

@`atomOutputFilename` type=string default=`'atom.xml'`

The output filename for the Atom feed, relative to the output directory.

@`atomXslTemplate` type=string

The content of the XSL template file for Atom.

Its default value is the content of `@vuepress/plugin-feed/templates/atom.xsl`.

@`atomXslFilename` type=string default=`'atom.xsl'`

The output filename for the Atom XSL file, relative to the output directory.

@`jsonOutputFilename` type=string default=`'feed.json'`

The output filename for the JSON feed, relative to the output directory.

@`rssOutputFilename` type=string default=`'rss.xml'`

The output filename for the RSS feed, relative to the output directory.

@`rssXslTemplate` type=string

The content of the XSL template file for RSS.

Its default value is the content of `@vuepress/plugin-feed/templates/rss.xsl`.

@`rssXslFilename` type=string default=`'rss.xsl'`

The output filename for the RSS XSL file, relative to the output directory.

@`getter` type=FeedGetter

The controller for feed generation.

::: tip

The plugin includes a built-in getter. Set this option only if you require full control over the feed generation process.

:::

See also: [Feed Getter](./getter.md).

@`locales` type=`Record<string, BaseFeedPluginOptions>`

Configuration for specific locales.

All options listed above are supported within locales, except for `hostname`.

::::

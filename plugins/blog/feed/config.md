---
url: /ecosystem/plugins/blog/feed/config.md
---
# Plugin Config

## hostname

* Type: `string`
* Required: Yes

The domain name where the site is deployed.

## atom

* Type: `boolean`
* Default: `false`

Whether to generate an Atom feed.

## json

* Type: `boolean`
* Default: `false`

Whether to generate a JSON feed.

## rss

* Type: `boolean`
* Default: `false`

Whether to generate an RSS feed.

## image

* Type: `string`

A large image or icon for the feed, typically used as a banner.

## icon

* Type: `string`

A small icon for the feed, typically used as a favicon.

## count

* Type: `number`
* Default: `100`

The maximum number of items to include in the feed. After sorting all valid pages, only the first `count` items will be preserved.

If your site contains a large number of articles, consider adjusting this option to reduce the feed file size.

## preservedElements

* Type: `(RegExp | string)[] | (tagName: string) => boolean`

Custom elements or components that should be preserved in the feed content.

::: tip
By default, all unknown tags will be removed.
:::

## filter

* Type: `(page: Page)=> boolean`
* Default:

  ```js
  ;({ frontmatter, filePathRelative }) =>
    Boolean(frontmatter.feed ?? (filePathRelative && !frontmatter.home))
  ```

A custom filter function to determine which pages are included in the feed.

## sorter

* Type: `(pageA: Page, pageB: Page)=> number`

* Default:

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

A custom sorter function for feed items.

The default behavior sorts items by the file creation time retrieved from git (requires `@vuepress/plugin-git`).

::: tip
You should enable `@vuepress/plugin-git` to accurately use the creation time of pages for sorting. Otherwise, feed items will follow the default page order in VuePress.
:::

## channel

The `channel` option configures *Feed Channels*.

For available options, please see [Config → Channel](channel.md).

## devServer

* Type: `boolean`
* Default: `false`

Whether to enable feed generation in the development server.

::: tip
For performance reasons, hot reload is not available. You must restart the devServer to sync changes.
:::

## devHostname

* Type: `string`
* Default: `"http://localhost:${port}"`

The hostname to use when running in the development server.

## atomOutputFilename

* Type: `string`
* Default: `"atom.xml"`

The output filename for the Atom feed, relative to the output directory.

## atomXslTemplate

* Type: `string`
* Default: Content of `@vuepress/plugin-feed/templates/atom.xsl`

The content of the XSL template file for Atom.

## atomXslFilename

* Type: `string`
* Default: `"atom.xsl"`

The output filename for the Atom XSL file, relative to the output directory.

## jsonOutputFilename

* Type: `string`
* Default: `"feed.json"`

The output filename for the JSON feed, relative to the output directory.

## rssOutputFilename

* Type: `string`
* Default: `"rss.xml"`

The output filename for the RSS feed, relative to the output directory.

## rssXslTemplate

* Type: `string`
* Default: Content of `@vuepress/plugin-feed/templates/rss.xsl`

The content of the XSL template file for RSS.

## rssXslFilename

* Type: `string`
* Default: `"rss.xsl"`

The output filename for the RSS XSL file, relative to the output directory.

## getter

The controller for feed generation. See [Feed Getter](./getter.md).

::: tip
The plugin includes a built-in getter. Set this option only if you require full control over the feed generation process.
:::

## locales

* Type: `Record<string, BaseFeedOptions>`

Configuration for specific locales.

All options listed above are supported within locales, except for `hostname`.

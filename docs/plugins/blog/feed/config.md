# Plugin Config

## hostname

- Type: `string`
- Required: Yes

The domain name of the deployment site.

## atom

- Type: `boolean`
- Default: `false`

Whether to output Atom syntax files.

## json

- Type: `boolean`
- Default: `false`

Whether output JSON syntax files.

## rss

- Type: `boolean`
- Default: `false`

Whether to output RSS syntax files.

## image

- Type: `string`

A large image/icon of the feed, probably used as banner.

## icon

- Type: `string`

A small icon of the feed, probably used as favicon.

## count

- Type: `number`
- Default: `100`

Set the maximum number of items in the feed. After all pages are sorted, the first `count` items will be intercepted.

If your site has a lot of articles, you may consider this option to reduce feed file size.

## preservedElements

- Type: `(RegExp | string)[] | (tagName: string) => boolean`

Custom element or component which should be preserved in feed.

::: tip By default, all unknown tags will be removed.

:::

## filter

- Type: `(page: Page)=> boolean`
- Default:

  ```js
  ;({ frontmatter, filePathRelative }) =>
    Boolean(frontmatter.feed ?? (filePathRelative && !frontmatter.home))
  ```

A custom filter function, used to filter feed items.

## sorter

- Type: `(pageA: Page, pageB: Page)=> number`

- Default:

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

Custom sorter function for feed items.

The default sorting behavior is by file adding time coming from git (needs `@vuepress/plugin-git`).

::: tip

You should enable `@vuepress/plugin-git` to get the newest created pages as feed items. Otherwise, the feed items will be sorted by the default order of pages in VuePress.

:::

## channel

`channel` option is used to config _Feed Channels_.

For available options, please see [Config → Channel](channel.md)

## devServer

- Type: `boolean`
- Default: `false`

Whether enabled in devServer.

::: tip

For performance reasons, we do not provide hot reload. Reboot your devServer to sync your changes.

:::

## devHostname

- Type: `string`
- Default: `"http://localhost:${port}"`

Hostname to use in devServer

## atomOutputFilename

- Type: `string`
- Default: `"atom.xml"`

Atom syntax output filename, relative to dest folder.

## atomXslTemplate

- Type: `string`
- Default: Content of `@vuepress/plugin-feed/templates/atom.xsl`

Atom xsl template file content.

## atomXslFilename

- Type: `string`
- Default: `"atom.xsl"`

Atom xsl filename, relative to dest folder.

## jsonOutputFilename

- Type: `string`
- Default: `"feed.json"`

JSON syntax output filename, relative to dest folder.

## rssOutputFilename

- Type: `string`
- Default: `"rss.xml"`

RSS syntax output filename, relative to dest folder.

## rssXslTemplate

- Type: `string`
- Default: Content of `@vuepress/plugin-feed/templates/rss.xsl`

RSS xsl template file content.

## rssXslFilename

- Type: `string`
- Default: `"rss.xsl"`

RSS syntax xsl filename, relative to dest folder.

## getter

Feed generation controller, see [Feed Getter](./getter.md).

::: tip The plugin has a built-in getter, only set this if you want full control of feed generation.

:::

## locales

- Type: `Record<string, BaseFeedOptions>`

You can use it to specific options for each locale.

Any options above are supported except `hostname`.

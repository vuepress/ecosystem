---
icon: captions
---

# Frontmatter Config

You can customize how individual pages appear in the feed by configuring the page frontmatter.

## Inclusion Control

By default, all valid articles are included in the feed generation. To exclude a specific page from the feed, set `feed: false` in its frontmatter.

## Standard Information

The plugin automatically extracts the following standard frontmatter properties to populate feed items.

:::: fields
@`title` type=string

The title of the page. It is automatically inferred from the first `h1` header if not specified.

@`description` type=string

A summary or description of the page.

@`date` type=`Date`

The publication date of the page.

@`article` type=boolean

Specifies whether the page is an article.

::: tip

If set to `false`, the page will be treated as a non-article page and excluded from the feed.

:::

@`copyright` type=string

Copyright information specific to this page.

@`cover` type=string

The cover image of the page, which must be a complete URL or an absolute path.

@`banner` type=string

The banner image of the page, which is used as the feed item image and takes priority over [cover](#cover). It must be a complete URL or an absolute path.

When neither is set, the first image of the page content is used.

::::

## Feed Options

You can use the `feed` object to override standard properties or provide specific configurations for the RSS/Atom/JSON feed item.

:::: fields
@`feed` type=`FeedFrontmatterOption | false`

Whether to include the page in the feed, or the feed item config of the page.

Set it to `false` to exclude the page from the feed.

@@`feed.title` type=string

Overrides the title used for this item in the feed.

@@`feed.description` type=string

Overrides the description used for this item in the feed.

@@`feed.content` type=string

Custom content for the feed item. If not provided, the page content is used.

@@`feed.author` type=`FeedAuthor[] | FeedAuthor`

The author(s) specific to this feed item.

::: details FeedAuthor format

```ts
interface FeedAuthor {
  /**
   * Author name
   */
  name?: string

  /**
   * Author email
   */
  email?: string

  /**
   * Author site
   *
   * json format only
   */
  url?: string

  /**
   * Author avatar
   *
   * json format only
   */
  avatar?: string
}
```

:::

@@`feed.contributor` type=`FeedContributor[] | FeedContributor`

The contributor(s) specific to this feed item.

::: details FeedContributor format

```ts
interface FeedContributor {
  /**
   * Author name
   */
  name?: string

  /**
   * Author email
   */
  email?: string

  /**
   * Author site
   *
   * json format only
   */
  url?: string

  /**
   * Author avatar
   *
   * json format only
   */
  avatar?: string
}
```

:::

@@`feed.guid` type=string

A unique identifier for the feed item.

::: tip

Ensure that every feed item has a globally unique GUID to prevent feed readers from marking updated items as new or duplicating them.

:::

::::

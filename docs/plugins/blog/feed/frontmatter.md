---
icon: captions
---

# Frontmatter Config

You can customize how individual pages appear in the feed by configuring the page frontmatter.

## Inclusion Control

By default, all valid articles are included in the feed generation. To exclude a specific page from the feed, set `feed: false` in its frontmatter.

## Standard Information

The plugin automatically extracts the following standard frontmatter properties to populate feed items.

### title

- Type: `string`

The title of the page. It is automatically inferred from the first `h1` header if not specified.

### description

- Type: `string`

A summary or description of the page.

### date

- Type: `Date`

The publication date of the page.

### article

- Type: `boolean`

Specifies whether the page is an article.

> If set to `false`, the page will be treated as a non-article page and excluded from the feed.

### copyright

- Type: `string`

Copyright information specific to this page.

### cover / image / banner

- Type: `string`

The cover image for the page. This must be a complete URL or an absolute path.

## Feed Options

You can use the `feed` object to override standard properties or provide specific configurations for the RSS/Atom/JSON feed item.

### feed.title

- Type: `string`

Overrides the title used for this item in the feed.

### feed.description

- Type: `string`

Overrides the description used for this item in the feed.

### feed.content

- Type: `string`

Custom content for the feed item. If not provided, the page content is used.

### feed.author

- Type: `FeedAuthor[] | FeedAuthor`

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
   * @description json format only
   */
  url?: string

  /**
   * Author avatar
   *
   * @description json format only
   */
  avatar?: string
}
```

:::

### feed.contributor

- Type: `FeedContributor[] | FeedContributor`

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
   * @description json format only
   */
  url?: string

  /**
   * Author avatar
   *
   * @description json format only
   */
  avatar?: string
}
```

:::

### feed.guid

- Type: `string`

A unique identifier for the feed item.

::: tip
Ensure that every feed item has a globally unique GUID to prevent feed readers from marking updated items as new or duplicating them.
:::

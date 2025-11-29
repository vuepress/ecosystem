---
icon: tv
---

# Channel Config

The `channel` option allows you to configure metadata for the generated feed channel.

## channel.title

- Type: `string`
- Default: `SiteConfig.title`
- Details: The title of the channel.

## channel.link

- Type: `string`
- Default: Deployment link (generated from `options.hostname` and `context.base`)
- Details: The address of the channel

## channel.description

- Type: `string`
- Default: `SiteConfig.description`
- Details: The description of the channel.

## channel.language

- Type: `string`
- Default:
  - `siteConfig.locales['/'].lang`
  - Falls back to `"en-US"` if the above is not available.
- Details: The language of the channel.

## channel.copyright

- Type: `string`
- Default:
  - Tries to use `author.name` from the channel options.
  - Falls back to `Copyright by $author`.
- Recommended to set manually: **Yes**
- Details: The copyright information for the channel.

## channel.pubDate

- Type: `string` (must be a valid Date ISOString)
- Default: The current time when the plugin is invoked
- Recommended to set manually: **Yes**
- Details: The publication date of the channel.

## channel.lastUpdated

- Type: `string` (must be a valid Date ISOString)
- Default: The current time when the plugin is invoked
- Details: The last update time of the channel content.

## channel.ttl

- Type: `number`
- Recommended to set manually: **Yes**
- Details: Time to Live (TTL) in minutes. This indicates how long a feed reader should cache the content before making a new request.

## channel.image

- Type: `string`
- Recommended to set manually: **Yes**
- Details: The channel image. It is recommended to use a square image with a size of at least 512×512 pixels.

## channel.icon

- Type: `string`
- Recommended to set manually: **Yes**
- Details: The channel icon. It should be a square image of at least 128×128 pixels. A transparent background is recommended.

## channel.author

- Type: `FeedAuthor`
- Recommended to set manually: **Yes**
- Details: The primary author of the channel.

::: details FeedAuthor format

```ts
interface FeedAuthor {
  /** Author name */
  name: string
  /** Author's email */
  email?: string
  /** Author's site */
  url?: string
  /**
   * Author's avatar address
   *
   * Square, preferably not less than 128×128 with transparent background
   */
  avatar?: string
}
```

:::

## channel.hub

- Type: `string`
- Details: The URL for the WebSub hub. Since WebSub requires a server backend (which differs from the static nature of VuePress), you generally do not need to configure this unless you have a specific requirement. For details, see [WebSub](https://w3c.github.io/websub/#subscription-migration).

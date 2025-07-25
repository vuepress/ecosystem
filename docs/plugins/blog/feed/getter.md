---
icon: arrow-up-from-line
---

# Feed Getter

You can take full control of feed items generation by setting `getter` in the plugin options.

## getter.title

- Type: `(page: Page, app: App) => string`

Item title getter

## getter.link

- Type: `(page: Page, app: App) => string`

Item link getter

## getter.description

- Type: `(page: Page, app: App) => string | undefined`

Item description getter

::: tip

Due to Atom supporting HTML in summary, you can return HTML content here if possible, but the content must start with the mark `html:`.

:::

## getter.content

- Type: `(page: Page, app: App) => string`

Item content getter

## getter.author

- Type: `(page: Page, app: App) => FeedAuthor[]`

Item author getter.

::: tip The getter should return an empty array when author information is missing.

:::

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

## getter.category

- Type: `(page: Page, app: App) => FeedCategory[] | undefined`

Item category getter.

::: details FeedCategory format

```ts
interface FeedCategory {
  /**
   * Category Name
   */
  name: string

  /**
   * A string that identifies a categorization taxonomy
   *
   * @description rss format only
   */
  domain?: string

  /**
   * the categorization scheme via a URI
   *
   * @description atom format only
   */
  scheme?: string
}
```

:::

## getter.enclosure

- Type: `(page: Page, app: App) => FeedEnclosure | undefined`

Item enclosure getter.

::: details FeedEnclosure format

```ts
interface FeedEnclosure {
  /**
   * Enclosure link
   */
  url: string

  /**
   * what its type is
   *
   * @description should be a standard MIME Type, rss format only
   */
  type: string

  /**
   * Size in bytes
   *
   * @description rss format only
   */
  length?: number
}
```

:::

## getter.publishDate

- Type: `(page: Page, app: App) => Date | undefined`

Item release date getter

## getter.lastUpdateDate

- Type: `(page: Page, app: App) => Date`

Item last update date getter

## getter.image

- Type: `(page: Page, app: App) => string`

Item image getter

::: tip Ensure it's returning a full URL

:::

## getter.contributor

- Type: `(page: Page, app: App) => FeedContributor[]`

Item contributor getter

::: tip The getter should return an empty array when contributor information is missing.

:::

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

## getter.copyright

- Type: `(page: Page, app: App) => string | undefined`

Item copyright getter

---
icon: lucide:replace
---

# replace-assets

<NpmBadge package="@vuepress/plugin-replace-assets" />

Replace local assets links within the site, such as links to images, videos, audio, PDF, and other assets, by rewriting the local assets addresses to new ones.

## Why is this feature needed? {#why-need-this}

Many users choose to store their site's assets on CDN services to accelerate site access speed and improve site availability.

In this process, it is usually necessary to first upload the assets to the CDN service, then obtain the asset links from the CDN service, and finally use them in the site content.

This may seem fine at first glance, but in actual usage, it often requires repeatedly performing the following steps:

```txt
Upload assets -> Obtain asset links -> Use full asset links in content
```

During this process, content creation is frequently interrupted.

This plugin aims to solve this problem. During content creation, you only need to directly use local asset addresses, and the plugin will handle the replacement of asset addresses at the appropriate stage.

::: important The plugin only finds local static assets links that start with `/`, such as `/images/foo.jpg`.
:::

::: important The plugin does not modify the source files; it only performs replacements in the compiled content.
:::

## Usage

```sh
npm i -D @vuepress/plugin-replace-assets@next
```

```ts title=".vuepress/config.ts"
import { replaceAssetsPlugin } from '@vuepress/plugin-replace-assets'

export default {
  plugins: [
    replaceAssetsPlugin('https://cnd.example.com'), // ReplaceAssetsPluginOptions
  ],
}
```

## Options

```ts
/**
 * Assets Replacement Target Path
 * - `string`: Directly concatenated before the original path
 * - `(url) => string`: Custom replacement method, returns the new path
 */
export type Replacement = string | ((url: string) => string)

/**
 * Assets Replacement Rule
 */
export interface ReplacementRule {
  /**
   * Assets Matching
   *
   * - `RegExp`: Match using regular expression
   * - `string`: Match using string
   *   - Strings starting with `^` or ending with `$` are automatically converted to regular expressions
   *   - For ordinary strings, checks if they appear at the start or end
   */
  find: RegExp | string

  /**
   * Assets Replacement Target Path
   */
  replacement: Replacement
}

export interface ReplaceAssetsOptions {
  /**
   * Custom Assets Replacement Rules
   */
  rules?: ReplacementRule | ReplacementRule[]
  /**
   * Built-in assets matching rules, designed to locate and match common assets paths such as images, videos, audio, etc.
   */
  all?: Replacement
  /**
   * Built-in image matching rules, designed to locate and match common image paths.
   */
  image?: Replacement
  /**
   * Built-in media matching rules, designed to locate and match common media paths such as videos, audio, etc.
   */
  media?: Replacement
}

/**
 * Assets Replacement Plugin Options
 */
export type ReplaceAssetsPluginOptions =
  | ReplaceAssetsOptions
  | Replacement
  | ReplacementRule
  | ReplacementRule[]
```

### Built-in Asset Matching Rules

For ease of use, the plugin provides built-in assets matching rules that you can directly utilize.

- `image`: Locates image assets, including local image asset links in formats such as `['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif']`.

- `media`: Locates media assets, including local media asset links in formats such as `['mp4', 'webm', 'ogg', 'mp3', 'wav', 'flac', 'aac', 'm3u8', 'm3u', 'flv', 'pdf']`.

- `all`: Locates both image and media assets, combining the rules of `image` and `media`.

When directly passing a **asset link prefix** or a **asset link replacement function**, the plugin uses the `all` rule to replace asset links.

```ts title=".vuepress/config.ts"
import { replaceAssetsPlugin } from '@vuepress/plugin-replace-assets'

export default {
  plugins: [
    // replaceAssetsPlugin('https://cnd.example.com') // [!code hl]
    replaceAssetsPlugin((url) => `https://cnd.example.com${url}`), // [!code ++]
  ],
}
```

It is also possible to apply different asset link prefixes or asset link replacement functions for different built-in rules:

```ts title=".vuepress/config.ts"
import { replaceAssetsPlugin } from '@vuepress/plugin-replace-assets'

export default {
  plugins: [
    // replaceAssetsPlugin({  // [!code hl:4]
    //   image: 'https://image.cdn.com/',
    //   media: 'https://media.cdn.com/'
    // }),
    replaceAssetsPlugin({
      // [!code ++:4]
      image: (url) => `https://image.cdn.com${url}`,
      media: (url) => `https://media.cdn.com${url}`,
    }),
  ],
}
```

### Custom Asset Matching Rules

You can also customize asset matching rules:

```ts title=".vuepress/config.ts"
import { replaceAssetsPlugin } from '@vuepress/plugin-replace-assets'

export default {
  plugins: [
    replaceAssetsPlugin({
      // [!code ++:4]
      find: /^\/images\/.*\.(jpg|jpeg|png|gif|svg|webp|avif)$/,
      replacement: (url) => `https://image.cdn.com${url}`,
    }),
  ],
}
```

You can also customize multiple matching rules:

```ts title=".vuepress/config.ts"
import { replaceAssetsPlugin } from '@vuepress/plugin-replace-assets'

export default {
  plugins: [
    replaceAssetsPlugin([
      // [!code ++:12]
      // 查找图片资源
      {
        find: /^\/images\/.*\.(jpg|jpeg|png|gif|svg|webp|avif)$/,
        replacement: 'https://image.cdn.com',
      },
      // 查找媒体资源
      {
        find: /^\/medias\/.*\.(mp4|webm|ogg|mp3|wav|flac|aac|m3u8|m3u|flv|pdf)$/,
        replacement: (url) => `https://media.cdn.com${url}`,
      },
    ]),
  ],
}
```

**`find` Field Description**

The `find` field is used to match asset links and can be either a **regular expression** or a **string**.

When the input is a `string`:

- If it starts with `^` or ends with `$`, it will automatically be converted into a **regular expression**.
- Otherwise, it will check whether the asset link starts with `find` or ends with `find`.

```txt
'^/images/foo.jpg' -> /^\/images\/foo.jpg/
'/images/foo.jpg$' -> /^\/images\/foo.jpg$/
```

::: important All matching asset paths start with `/`.
:::

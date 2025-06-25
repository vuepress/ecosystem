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

::: important The plugin does not modify the source files; it only performs replacements in the compiled content.
:::

## Usage

### Install

```sh
npm i -D @vuepress/plugin-replace-assets@next
```

### Configuration

```ts title=".vuepress/config.ts"
import { replaceAssetsPlugin } from '@vuepress/plugin-replace-assets'

export default {
  plugins: [
    replaceAssetsPlugin('https://cnd.example.com'), // ReplaceAssetsPluginOptions
  ],
}
```

### Assets Management

**You should store the assets in the [.vuepress/public](https://v2.vuepress.vuejs.org/guide/assets.html#public-files) directory**:

```sh
./docs
├── .vuepress
│ └── public  # [!code hl:6]
│     ├── images
│     │   ├── foo.jpg
│     │   └── bar.jpg
│     └── medias
│         └── foo.mp4
└── README.md
```

::: tip Why is it necessary to store files in this directory?

Before the site is compiled and ready for deployment, we can easily upload the files from this directory directly to a CDN.

:::

In markdown, use local resource paths directly:

```md
![foo](/images/foo.jpg)

<img src="/images/foo.jpg">
```

In `javascript`:

```js
const foo = '/images/foo.jpg'

const img = document.createElement('img')
img.src = '/images/foo.jpg'
```

In `css`:

```css
.foo {
  background: url('/images/foo.jpg');
}
```

The plugin will correctly identify these resources and replace them in the compiled content.

:::warning The plugin does not support recognizing concatenated paths like `'/images/' + 'foo.jpg'`.

:::

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
   * Built-in image matching rules, designed to match and find common image paths starting with `^/images/`
   */
  image?: Replacement
  /**
   * Built-in media matching rules, designed to match and locate common media paths such as videos and audio that start with `^/medias/`.
   */
  media?: Replacement
  /**
   * Equivalent to setting both `image` and `media` simultaneously.
   */
  all?: Replacement
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

- `image`: Find image assets in the `.vuepress/public/images` directory, including local image asset links in formats such as `['apng','bmp','png','jpg','jpeg','jfif','pjpeg','pjp','gif','svg','ico','webp','avif','cur','jxl']`:

  ```md
  ![](/images/foo.jpg)
  <img src="/images/bar/baz.png">
  ```

- `media`: Find media assets in the `.vuepress/public/medias` directory, including local media asset links in formats such as `['mp4','webm','ogg','mp3','wav','flac','aac','opus','mov','m4a','vtt','pdf']`:

  ```md
  <video src="/medias/foo.mp4">
  <audio src="/medias/bar.mp3">
  ```

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
    //   image: 'https://image.cdn.com',
    //   media: 'https://media.cdn.com'
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

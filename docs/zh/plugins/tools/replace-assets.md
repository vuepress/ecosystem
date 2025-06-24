---
icon: lucide:replace
---

# replace-assets

<NpmBadge package="@vuepress/plugin-replace-assets" />

替换站点内的本地资源链接，比如 图片、视频、音频、PDF 等资源的链接地址，将本地资源地址改写到新的地址。

## 为什么需要这个功能？{#why-need-this}

不少用户会选择将站点的资源存放到 CDN 服务上，从而加速站点的访问速度，提升站点的可用性。

在这个过程中，通常需要先将资源上传到 CDN 服务，然后再获取 CDN 服务的资源链接，最后才在站点内容中使用。

这看起来并没有什么问题，然而在实际使用过程中，可能需要频繁的进行

```txt
上传资源 -> 获取资源链接 -> 在内容中使用全量资源链接
```

在此过程中，内容创作被频繁的打断。

插件旨在解决这个问题。在内容创作过程中，只需要直接使用本地资源地址，由插件在合适的阶段，完成资源地址的替换。

::: important 插件仅查找 `/` 开头的本地静态资源链接，比如 `/images/foo.jpg`
:::

::: important 插件不会修改源文件，仅在编译后的内容中进行替换
:::

## 使用方法

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

## 配置说明

```ts
/**
 * 资源替换目标路径
 * - `string`: 直接拼接在原始路径前面
 * - `(url) => string`: 自定义替换方法，返回新路径
 */
export type Replacement = string | ((url: string) => string)

/**
 * 资源替换规则
 */
export interface ReplacementRule {
  /**
   * 资源匹配
   *
   * - `RegExp`: 匹配正则
   * - `string`: 匹配字符串
   *   - 以 `^` 开头或以 `$` 结尾的字符串，会自动转换为正则
   *   - 普通字符串检查是否以其作为开头或结尾
   */
  find: RegExp | string

  /**
   * 资源替换目标路径
   */
  replacement: Replacement
}

export interface ReplaceAssetsOptions {
  /**
   * 自定义资源替换规则
   */
  rules?: ReplacementRule | ReplacementRule[]
  /**
   * 内置的资源匹配规则，匹配查找常见的图片、视频、音频等资源路径
   */
  all?: Replacement
  /**
   * 内置的图片匹配规则，匹配查找常见的图片路径
   */
  image?: Replacement
  /**
   * 内置的媒体匹配规则，匹配查找常见的视频、音频等媒体路径
   */
  media?: Replacement
}

/**
 * 资源替换插件配置项
 */
export type ReplaceAssetsPluginOptions =
  | ReplaceAssetsOptions
  | Replacement
  | ReplacementRule
  | ReplacementRule[]
```

### 内置资源匹配规则

为便于使用，插件提供了内置的资源匹配规则，你可以直接使用它们。

- `image`: 查找图片资源，包括 `['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif']` 格式的本地图片资源链接
- `media`: 查找媒体资源，包括 `['mp4', 'webm', 'ogg', 'mp3', 'wav', 'flac', 'aac', 'm3u8', 'm3u', 'flv', 'pdf']` 格式的本地媒体资源链接
- `all`: 查找 图片 和 媒体资源，即 `image` 和 `media` 的合集

直接传入 **资源链接前缀** 或 **资源链接替换函数** 时，插件使用 `all` 规则替换资源链接。

```ts title=".vuepress/config.ts"
import { replaceAssetsPlugin } from '@vuepress/plugin-replace-assets'

export default {
  plugins: [
    // replaceAssetsPlugin('https://cnd.example.com') // [!code hl]
    replaceAssetsPlugin((url) => `https://cnd.example.com${url}`), // [!code ++]
  ],
}
```

也可以针对不同的内置规则，应用不同的资源链接前缀或资源链接替换函数:

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

### 自定义资源匹配规则

你也可以自定义资源匹配规则：

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

还可以自定义多个匹配规则：

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

**`find` 字段说明**

`find` 字段用于匹配资源链接，可以是一个 **正则表达式** 或 **字符串**。

当传入的是一个 `字符串` 时，如果是以 `^` 开头或者以 `$` 结尾的字符串，则会自动转换为一个 **正则表达式**。
否则则会检查资源链接是否 以 `find` 结尾 或者 以 `find` 开头。

```txt
'^/images/foo.jpg' -> /^\/images\/foo.jpg/
'/images/foo.jpg$' -> /^\/images\/foo.jpg$/
```

::: important 所有匹配的资源地址都是以 `/` 开头。
:::

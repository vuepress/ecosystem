# Waline Config

## Options

::: fields
@`serverURL` type=string required

Waline server address URL.

@`emoji` type=`(string | WalineEmojiInfo)[] | false` default=`['//unpkg.com/@waline/emojis@1.1.0/weibo']`

Emoji settings.

Its type is:

```ts
type WalineEmojiPresets = `http://${string}` | `https://${string}`

interface WalineEmojiInfo {
  /**
   * Emoji name show on tab
   */
  name: string
  /**
   * Current folder link
   */
  folder?: string
  /**
   * Common prefix of Emoji icons
   */
  prefix?: string
  /**
   * Type of Emoji icons, will be regarded as file extension
   */
  type?: string
  /**
   * Emoji icon show on tab
   */
  icon: string
  /**
   * Emoji image list
   */
  items: string[]
}
```

See also: [Emoji](https://waline.js.org/en/guide/features/emoji.html).

@`dark` type=`string | boolean` default=`false`

Dark mode support. Setting a boolean will set the dark mode according to its value. Set it to `'auto'` will display darkmode due to device settings. Filling in a CSS selector will enable darkmode only when the selector match waline ancestor nodes.

See also: [Custom Style](https://waline.js.org/en/guide/features/style.html).

@`commentSorting` type=WalineCommentSorting default=`'latest'`

Comment list sorting method. Should be one of `'latest'`, `'oldest'`, or `'hottest'`.

@`meta` type=`string[]` default=`['nick', 'mail', 'link']`

Reviewer attributes. Should be one of `'nick'`, `'mail'`, `'link'`.

@`requiredMeta` type=`string[]` default=`[]`

Set required fields. Available values:

- `[]`
- `['nick']`
- `['nick', 'mail']`

@`login` type=string default=`'enable'`

Login mode status. Available values:

- `'enable'`: Enable login (default)
- `'disable'`: Login is disabled, users should fill in information to comment
- `'force'`: Forced login, users must login to comment

@`wordLimit` type=`number | [number, number]` default=`0`

Comment word limit. When a single number is filled in, it's the maximum number of comment words. No limit when set to `0`.

@`pageSize` type=number default=`10`

Number of comments per page.

@`imageUploader` type=`((image: File) => Promise<string>) | false` client-only="Yes"

Custom image upload method. The default behavior is to embed images Base 64 encoded, you can set this to `false` to disable image uploading.

The function should receive an image object and return a Promise that provides the image address.

See also: [Upload Image](https://waline.js.org/en/cookbook/customize/upload-image.html).

@`highlighter` type=`((code: string, lang: string) => string) | false` client-only="Yes"

Code highlighting uses `hanabi` by default. The function passes in original content of code block and language of the code block. You should return a string directly.

You can pass in a code highlighter of your own, or set to `false` to disable code highlighting.

See also: [Customize Highlighter](https://waline.js.org/en/cookbook/customize/highlighter.html).

@`texRenderer` type=`((blockMode: boolean, tex: string) => string) | false` client-only="Yes"

Customize TeX rendering. The default behavior is to prompt that the preview mode does not support TeX. The function provides two parameters: the first parameter indicates whether it should be rendered in block level, and the second parameter is the string of the TeX content. Return an HTML string as render result.

You can import TeX renderer to provide preview feature. We recommend you use KaTeX or MathJax, or set to `false` to disable parsing TeX.

See also: [Customize TeX Renderer](https://waline.js.org/en/cookbook/customize/tex-renderer.html).

@`search` type=`WalineSearchOptions | false` client-only="Yes"

Customize search features. You can disable search function by setting it to `false`.

Its type is:

```ts
interface WalineSearchImageData extends Record<string, unknown> {
  /**
   * Image link
   */
  src: string

  /**
   * Image title
   *
   * Used for alt attribute of image
   */
  title?: string

  /**
   * Image preview link
   *
   * For better loading performance, we will use this thumbnail first in the list
   *
   * @default src
   */
  preview?: string
}

type WalineSearchResult = WalineSearchImageData[]

interface WalineSearchOptions {
  /**
   * Search action
   */
  search: (word: string) => Promise<WalineSearchResult>

  /**
   * Default result when opening list
   *
   * @default () => search('')
   */
  default?: () => Promise<WalineSearchResult>

  /**
   * Fetch more action
   *
   * It will be triggered when the list scrolls to the bottom. If your search service supports paging, you should set this to achieve infinite scrolling
   *
   * @default (word) => search(word)
   */
  more?: (word: string, currentCount: number) => Promise<WalineSearchResult>
}
```

@`recaptchaV3Key` type=string

reCAPTCHA V3 is a captcha service provided by Google. You can add reCAPTCHA V3 site key with `recaptchaV3Key` to enable it.

You should also set environment variable `RECAPTCHA_V3_SECRET` for server.

@`reaction` type=`boolean | string[]` default=`false`

Add emoji interaction function to the article. Set it to `true` to provide the default emoji, you can also customize the emoji image by setting the emoji URL array, and supports a maximum of 8 emojis.

@`metaIcon` type=boolean default=`true` plugin-only="Yes"

Whether to import meta icon.

@`locales` type=WalineLocales plugin-only="Yes"

Waline locales.

Its type is:

```ts
interface WalineLocales {
  [localePath: string]: Partial<WalineLocale>
}
```

See also: [Waline Locales](https://waline.js.org/en/cookbook/customize/locale.html).

:::

## Plugin Config

You can directly configure serializable options in the plugin options:

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Waline',
      // other options
      // ...
    }),
  ],
}
```

## Client Config

You can use the `defineWalineConfig` function to customize Waline:

```ts title=".vuepress/client.ts"
import { defineWalineConfig } from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineWalineConfig({
  // Waline config
})
```

---
url: /ecosystem/plugins/features/copy-code.md
---
# copy-code

This plugin will automatically add a copy button to the top right corner of each code block on PC devices.

This plugin has been integrated into the default theme.

## Usage

```bash
npm i -D @vuepress/plugin-copy-code@next
```

```ts title=".vuepress/config.ts"
import { copyCodePlugin } from '@vuepress/plugin-copy-code'

export default {
  plugins: [
    copyCodePlugin({
      // options
    }),
  ],
}
```

## Options

### selector

* Type: `string | string[]`
* Default: `'[vp-content] div[class*="language-"] pre'`
* Details:

  Code block selector

### showInMobile

* Type: `boolean`
* Default: `false`
* Details:

  Whether to display copy button on the mobile device

### duration

* Type: `number`
* Default: `2000`
* Details:

  Hint display time, setting it to `0` will disable the hint.

### ignoreSelector

* Type: `string[] | string`
* Details:

  Elements selector in code blocks, used to ignore related elements when copying.

  For example, `['.token.comment']` will ignore nodes with the class name `.token.comment` in code blocks (which in `prismjs` refers to ignoring comments).

### inlineSelector

* Type: `string[] | string | boolean`
* Default: `false`

  Whether to copy inline code content when double click.

  * `boolean`: Whether to copy inline code content when double click.
  * `string | string[]`: The selector of inline code.

### transform&#x20;

* Type: `(preElement: HTMLPreElement) => void`

* Default: `undefined`

* Details:

  A transformer to modify the content of the code block in the `<pre>` element before copying. This option is only valid when using `useCopyCode()`.

* Example:

  ```ts title=".vuepress/client.ts"
  import { useCopyCode } from '@vuepress/plugin-copy-code/client'

  export default {
    setup(): void {
      useCopyCode({
        transform: (preElement) => {
          // Remove all `.ignore` elements
          pre.querySelectorAll('.ignore').remove()
          // insert copyright
          pre.innerHTML += `\n Copied by VuePress`
        },
        // ...other options
      })
    },
  }
  ```

### locales

* Type: `CopyCodePluginLocaleConfig`

  ```ts
  interface CopyCodePluginLocaleData {
    /**
     * Copy text
     */
    copy: string

    /**
     * Copied text
     */
    copied: string
  }

  interface CopyCodePluginLocaleConfig {
    [localePath: string]: Partial<CopyCodePluginLocaleData>
  }
  ```

* Required: No

* Details:

  Locales config for copy code plugin.

* Example:

  ```ts title=".vuepress/config.ts"
  import { copyCodePlugin } from '@vuepress/plugin-copy-code'

  export default {
    locales: {
      '/': {
        // this is a supported language
        lang: 'en-US',
      },
      '/xx/': {
        // the plugin does not support this language
        lang: 'mm-NN',
      },
    },

    plugins: [
      copyCodePlugin({
        locales: {
          '/': {
            // Override copy button label text
            copy: 'Copy Codes from code block',
          },

          '/xx/': {
            // Complete locale config for `mm-NN` language here
          },
        },
      }),
    ],
  }
  ```

::: details Built-in Supported Languages

* **Simplified Chinese** (zh-CN)
* **Traditional Chinese** (zh-TW)
* **English (United States)** (en-US)
* **German** (de-DE)
* **German (Australia)** (de-AT)
* **Russian** (ru-RU)
* **Ukrainian** (uk-UA)
* **Vietnamese** (vi-VN)
* **Portuguese (Brazil)** (pt-BR)
* **Polish** (pl-PL)
* **French** (fr-FR)
* **Spanish** (es-ES)
* **Slovak** (sk-SK)
* **Japanese** (ja-JP)
* **Turkish** (tr-TR)
* **Korean** (ko-KR)
* **Finnish** (fi-FI)
* **Indonesian** (id-ID)
* **Dutch** (nl-NL)

:::

## Styles

You can customize the icon of the *copy button* via CSS variables:

@[code{1-6} css](@vuepress/plugin-copy-code/src/client/styles/vars.css)

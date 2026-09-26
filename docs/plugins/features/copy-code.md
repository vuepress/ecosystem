---
icon: clipboard-copy
---

# copy-code

<NpmBadge package="@vuepress/plugin-copy-code" />

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

:::: fields
@`selector` type=`string[] | string` default=`'[vp-content] div[class*="language-"] pre'`

Code block selector.

@`showInMobile` type=boolean

Whether to display the copy button on the mobile device.

@`duration` type=number default=`2000`

Hint display time, setting it to `0` will disable the hint.

@`ignoreSelector` type=`string[] | string`

Elements selector in code blocks, used to ignore related elements when copying.

For example, `['.token.comment']` will ignore nodes with the class name `.token.comment` in code blocks (which in `prismjs` refers to ignoring comments).

@`inline` type=`string[] | boolean | string`

Whether to copy inline code content when double click.

- `true`: enable it with the default selector `'[vp-content] :not(pre) > code'`.
- `false`: disable it.
- `string | string[]`: the selector of the inline code.

@`transform` type=`(preElement: HTMLPreElement) => void` client="Composables API only"

A transformer to modify the content of the code block in the `<pre>` element before copying. This option is only valid when using `useCopyCode()`.

```ts title=".vuepress/client.ts"
import { useCopyCode } from '@vuepress/plugin-copy-code/client'

export default {
  setup(): void {
    useCopyCode({
      transform: (preElement) => {
        // Remove all `.ignore` elements
        preElement.querySelectorAll('.ignore').forEach((el) => el.remove())
        // insert copyright
        preElement.innerHTML += `\n Copied by VuePress`
      },
      // ...other options
    })
  },
}
```

@`locales` type=`CopyCodePluginLocaleConfig`

Locale config of the plugin.

::: details Built-in Supported Languages

- **Simplified Chinese** (zh-CN)
- **Traditional Chinese** (zh-TW)
- **English (United States)** (en-US)
- **German** (de-DE)
- **German (Australia)** (de-AT)
- **Russian** (ru-RU)
- **Ukrainian** (uk-UA)
- **Vietnamese** (vi-VN)
- **Portuguese** (pt)
- **Polish** (pl-PL)
- **French** (fr-FR)
- **Spanish** (es-ES)
- **Slovak** (sk-SK)
- **Japanese** (ja-JP)
- **Turkish** (tr-TR)
- **Korean** (ko-KR)
- **Finnish** (fi-FI)
- **Indonesian** (id-ID)
- **Dutch** (nl-NL)

:::

@@`locales.<localePath>.copy` type=string

Text of the copy button.

@@`locales.<localePath>.copied` type=string

Text shown after the code is copied.

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

::::

## Styles

You can customize the icon of the _copy button_ via CSS variables:

@[code{1-6} css](@vuepress/plugin-copy-code/src/client/styles/vars.scss)

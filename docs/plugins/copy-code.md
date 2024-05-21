# copy-code

<NpmBadge package="@vuepress/plugin-copy-code" />

This plugin provides full functionality and style support for the copy code button added by code block highlight plugins such as [@vuepress/plugin-prismjs](./prismjs.md#copycodebutton) and [@vuepress/plugin-shiki](./shiki.md#copycodebutton).

## Usage

```bash
npm i -D @vuepress/plugin-copy-code@next
```

```ts
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

- Type: `string`
- Default: `'div[class*="language-"] > button.copy'`
- Details:

  Code block copy code button selector

### duration

- Type: `number`
- Default: `2000`
- Details:

  Hint display time, setting it to `0` will disable the hint.

### defaultStyle

- Type: `boolean`
- Default: `true`
- Details:

  Enable the default copy code button style or no.

## Styles

When using the default style, you can customize the appearance of the _copy button_ using CSS variables.

@[code css](@vuepress/plugin-copy-code/src/client/styles/vars.css)

When not using the default style, you should customize the style of the _copy button_ in your own style file.

::: details 复制按钮样式示例
@[code css](@vuepress/plugin-copy-code/src/client/styles/copy-code.css)
:::

## Composables API

### useCopyCode(options)

Developers can use this API to provide full functionality for the copy code button.

```ts
type UseCopyCode = (options?: CopyCodeOption) => void

interface CopyCodeOption {
  /**
   * Code block copy code button selector
   */
  selector?: string

  /**
   * Hint display time, setting it to `0` will disable the hint.
   */
  duration?: number
}
```

**Usage：**

```ts data-title="client.ts"
import { useCopyCode } from '@vuepress/plugin-copy-code/client'
export default {
  setup() {
    useCopyCode({
      selector: 'div[class*="language-"] > button.copy',
      duration: 2000,
    })
  },
}
```

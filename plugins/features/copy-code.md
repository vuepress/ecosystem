---
url: /plugins/features/copy-code.md
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

* `true`: enable it with the default selector `'[vp-content] :not(pre) > code'`.
* `false`: disable it.
* `string | string[]`: the selector of the inline code.

@`locales` type=`CopyCodePluginLocaleConfig`

Locale config of the plugin.

See also: [Locales](../supported-locales.md).

@@`locales.<localePath>.copy` type=string

Text of the copy button.

@@`locales.<localePath>.copied` type=string

Text shown after the code is copied.

::::

## Client Config

### defineCopyCodeConfig(config)

* Type: `(config: MaybeRefOrGetter<CopyCodeClientOptions>) => void`

Additional copy code options in the client side. All options of the plugin are accepted (see [Options](#options)), and the ones defined here override the ones defined in Node.

In most cases, options should be defined in the Node.js configuration, but there are special situations where client-side configuration is needed. For example, you may need to pass a `transform` callback, which cannot be declared in Node, or determine the options according to the client context.

```ts title=".vuepress/client.ts"
import { defineCopyCodeConfig } from '@vuepress/plugin-copy-code/client'

defineCopyCodeConfig({
  selector: '.custom-code',
  duration: 3000,
})
```

### transform

* Type: `(preElement: HTMLPreElement) => void`

* Default: `undefined`

* Details:

  A transformer to modify the content of the code block in the `<pre>` element before copying.

  This option is **client-side only**, since a callback cannot be declared in the Node.js configuration.

* Example:

  ```ts title=".vuepress/client.ts"
  import { defineCopyCodeConfig } from '@vuepress/plugin-copy-code/client'

  defineCopyCodeConfig({
    transform: (preElement) => {
      // Remove all `.ignore` elements
      preElement.querySelectorAll('.ignore').forEach((el) => el.remove())
      // insert copyright
      preElement.innerHTML += `\n Copied by VuePress`
    },
  })
  ```

## Styles

You can customize the icon of the *copy button* via CSS variables:

@[code{1-6} css](@vuepress/plugin-copy-code/src/client/styles/vars.scss)

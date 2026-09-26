---
icon: pilcrow-left
---

# RTL

<NpmBadge package="@vuepress/plugin-rtl" />

This plugin sets text direction to RTL on configured locales.

## Usage

```bash
npm i -D @vuepress/plugin-rtl@next
```

```ts title=".vuepress/config.ts"
import { rtlPlugin } from '@vuepress/plugin-rtl'

export default {
  plugins: [
    rtlPlugin({
      // options
      locales: ['/ar/'],
    }),
  ],
}
```

## Demo

<ToggleRTLButton />

## Options

::: fields
@locales@ type=`string[]` default=`['/']`

RTL locale paths to enable RTL layout.

@selector@ type=SelectorOptions default=`{ 'html': { dir: 'rtl' } }`

Selector configuration to enable RTL layout. The default settings mean that the `dir` attribute of the `html` element will be set to `rtl` in RTL locales.

Its type is:

```ts
interface SelectorOptions {
  [cssSelector: string]: {
    [attr: string]: string
  }
}
```

:::

<script setup>
import ToggleRTLButton from '@source/.vuepress/components/ToggleRTLButton.vue'
</script>

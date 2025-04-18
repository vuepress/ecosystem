---
icon: chrome
---

# Client Related

These functions are only available in `@vuepress/helper/client`.

## Composables APIs

### hasGlobalComponent

Check whether a component is registered globally.

::: tip

1. Local import of the component does not affect the result.
1. When calling outside `setup` scope, you need to pass the `app` instance as the second parameter.

:::

```ts
export const hasGlobalComponent: (name: string, app?: App) => boolean
```

::: details Example

```ts
// if you globally register `<my-component>`
hasGlobalComponent('MyComponent') // true
hasGlobalComponent('my-component') // true

hasGlobalComponent('MyComponent2') // false
```

:::

### useLocaleConfig

Get current locale config from locales settings.

```ts
export const useLocaleConfig: <T extends LocaleData>(
  localesConfig: RequiredLocaleConfig<T>,
) => ComputedRef<T>
```

::: details Example

```ts
const localesCOnfig = {
  '/': 'Title',
  '/zh/': '标题',
}

const locale = useLocaleConfig(localesConfig)

// under `/page`
locale.value // 'Title'

// under `/zh/page`
locale.value // '标题'
```

:::

## Utils

### getHeaders

Get headers from current page.

```ts
export const getHeaders: (options: GetHeadersOptions) => HeaderItem[]
```

**Params:**

```ts
export interface GetHeadersOptions {
  /**
   * The selector of the headers.
   *
   * It will be passed as an argument to `document.querySelectorAll(selector)`,
   * so you should pass a `CSS Selector` string.
   *
   * @default '[vp-content] h1, [vp-content] h2, [vp-content] h3, [vp-content] h4, [vp-content] h5, [vp-content] h6'
   */
  selector?: string
  /**
   * Ignore specific elements within the header.
   *
   * The Array of `CSS Selector`
   *
   * @default []
   */
  ignore?: string[]
  /**
   * The levels of the headers
   *
   * - `false`: No headers.
   * - `number`: only headings of that level will be displayed.
   * - `[number, number]: headings level tuple, where the first number should be less than the second number, for example, `[2, 4]` which means all headings from `<h2>` to `<h4>` will be displayed.
   * - `deep`: same as `[2, 6]`, which means all headings from `<h2>` to `<h6>` will be displayed.
   *
   * @default 2
   */
  levels?: HeaderLevels
}
```

**Result:**

```ts
interface PageHeader {
  /**
   * The level of the header
   *
   * `1` to `6` for `<h1>` to `<h6>`
   */
  level: number
  /**
   * The title of the header
   */
  title: string
  /**
   * The slug of the header
   *
   * Typically the `id` attr of the header anchor
   */
  slug: string
  /**
   * Link of the header
   *
   * Typically using `#${slug}` as the anchor hash
   */
  link: string
  /**
   * The children of the header
   */
  children: MarkdownItHeader[]
}

export type HeaderLevels = number | 'deep' | false | [number, number]

export type HeaderItem = Omit<PageHeader, 'children'> & {
  element: HTMLHeadingElement
  children?: HeaderItem[]
}
```

::: details Examples

```ts
onMounted(() => {
  const headers = getHeaders({
    selector: '[vp-content] :where(h1,h2,h3,h4,h5,h6)',
    levels: [2, 3], // only h2 and h3
    ignore: ['.badge'], // ignore the <Badge /> within the header
  })
  console.log(headers)
})
```

:::

## Component

### FadeInExpandTransition

Provides fade-in transition effects when block-level elements expand, supporting both `height` or `width` properties.

**Props:**

```ts
interface FadeInExpandTransitionProps {
  /**
   * Whether to group transitions
   */
  group?: boolean
  /**
   * Transition mode
   */
  mode?: 'default' | 'in-out' | 'out-in'

  /**
   * Whether to switch to the transition of `width`
   *
   * @default false
   */
  width?: boolean

  appear?: boolean
  onLeave?: () => void
  onAfterEnter?: () => void
  onAfterLeave?: () => void
}
```

**Import Styles:**

Transition animations require importing the following CSS files as needed:

- `@vuepress/helper/transition/fade-in-height-expand.css` - `height` transition animation

- `@vuepress/helper/transition/fade-in-width-expand.css` - `width` transition animation

::: tip Only one CSS file needs to be imported

:::

**Usage:**

```vue
<script setup lang="ts">
import { FadeInExpandTransition } from '@vuepress/helper/client'
import { ref } from 'vue'

import '@vuepress/helper/transition/fade-in-height-expand.css'
// import '@vuepress/helper/transition/fade-in-width-expand.css'

const expand = ref(false)
</script>

<template>
  <button type="button" @click="expand = !expand">
    {{ expand ? 'Collapse' : 'Expand' }}
  </button>

  <FadeInExpandTransition>
    <div v-show="expand">
      <p>Content</p>
    </div>
  </FadeInExpandTransition>
</template>
```

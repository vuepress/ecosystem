---
url: /ecosystem/tools/helper/client.md
---
# Client Related

These functions are only available in `@vuepress/helper/client`.

## Composables APIs

### hasGlobalComponent

Check if a global component with the given name exists.

```ts
export const hasGlobalComponent: (name: string, app?: App) => boolean
```

::: tip

1. Local import of the component does not affect the result.
2. When calling outside `setup` scope, you need to pass the `app` instance as the second parameter.

:::

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
const localesConfig = {
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

### env

Accept user agent and check if the current environment satisfies the given condition:

```ts
export const isMobile: (ua: string) => boolean
export const isChromeWebView: (ua: string) => boolean
export const isSafariMobile: (ua: string) => boolean
export const isSafari: (ua: string) => boolean
export const isiPhone: (ua: string) => boolean
export const isiPad: (ua: string) => boolean
export const isWindows: (ua: string) => boolean
export const isIOS: (ua: string) => boolean
export const isMacOS: (ua: string) => boolean
```

**Params:**

* `ua`: User agent string to check against

**Returns:**

* `boolean`: Whether the condition is satisfied

::: details Example

```ts
import { isIOS, isMobile, isSafari } from '@vuepress/helper/client'

// Get user agent string
const userAgent = navigator.userAgent

// Check environment
if (isMobile(userAgent)) {
  console.log('User is on a mobile device')
}

if (isSafari(userAgent)) {
  console.log('User is using Safari browser')
}

if (isIOS(userAgent)) {
  console.log('User is on an iOS device')
}
```

:::

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

### isKeyMatched

Check if a keyboard event matches the specified hotkeys.

```ts
export const isKeyMatched: (
  event: KeyboardEvent,
  hotKeys: (KeyOptions | string)[],
) => boolean
```

**Params:**

* `event`: The keyboard event to check
* `hotKeys`: An array of hotkey definitions, which can be either a string (just the key) or a `KeyOptions` object

**KeyOptions Interface:**

```ts
interface KeyOptions {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
}
```

**Returns:**

* `boolean`: Whether any of the hotkeys match the event

::: details Example

```ts
import { isKeyMatched } from '@vuepress/helper/client'

document.addEventListener('keydown', (event) => {
  // Check if Escape key is pressed
  if (isKeyMatched(event, ['Escape'])) {
    console.log('Escape key pressed')
  }

  // Check if Ctrl+S is pressed
  if (isKeyMatched(event, [{ key: 's', ctrl: true }])) {
    console.log('Ctrl+S pressed')
    event.preventDefault()
  }

  // Check for multiple possible hotkeys
  if (isKeyMatched(event, ['Enter', { key: ' ', shift: true }])) {
    console.log('Either Enter or Shift+Space was pressed')
  }
})
```

:::

### isSlotContentEmpty

Check whether a slot's content is currently empty.

```ts
export const isSlotContentEmpty: (normalizedSlotContent: SlotContent) => boolean
```

**Params:**

* `normalizedSlotContent`: The normalized slot content, which should be the result of the slot function

**Returns:**

* `boolean`: `true` if the slot content is empty, `false` otherwise

::: details Example

```ts
import { isSlotContentEmpty } from '@vuepress/helper/client'
import { useSlots } from 'vue'

const slots = useSlots()

// Check if default slot is empty
const isDefaultSlotEmpty = isSlotContentEmpty(slots.default?.())

// Conditionally render based on slot content
const renderContent = () => {
  if (!isSlotContentEmpty(slots.header?.())) {
    // Render header content
  }

  // Rest of the component
}
```

:::

### wait

Wait for a given time.

```ts
export const wait: (ms: number) => Promise<void>
```

**Params:**

* `ms`: Wait time in milliseconds

**Returns:**

* `Promise<void>`: A promise that resolves after the given time

::: details Example

```ts
import { wait } from '@vuepress/helper/client'

const handleOperation = async () => {
  // Do something
  console.log('Operation started')

  // Wait for 1 second
  await wait(1000)

  // Continue after waiting
  console.log('Operation continued after 1 second')
}

// Using in an animation sequence
const animateSequence = async () => {
  element1.classList.add('animate')
  await wait(500)

  element2.classList.add('animate')
  await wait(300)

  element3.classList.add('animate')
}
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

* `@vuepress/helper/transition/fade-in-height-expand.css` - `height` transition animation

* `@vuepress/helper/transition/fade-in-width-expand.css` - `width` transition animation

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

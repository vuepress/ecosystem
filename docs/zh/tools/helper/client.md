---
icon: chrome
---

# 客户端相关

这些函数仅在 `@vuepress/helper/client` 中可用。

## 可组合 API

### hasGlobalComponent

检查组件是否已全局注册。

::: tip

1. 组件的局部导入不影响结果。
1. 当在 `setup` 之外调用时，你需要将 `app` 实例作为第二个参数传递。

:::

```ts
export const hasGlobalComponent: (name: string, app?: App) => boolean
```

::: details 示例

```ts
// 如果你全局注册了 `<my-component>`
hasGlobalComponent('MyComponent') // true
hasGlobalComponent('my-component') // true

hasGlobalComponent('MyComponent2') // false
```

:::

### useLocaleConfig

从语言环境设置中获取当前语言环境配置。

```ts
export const useLocaleConfig: <T extends LocaleData>(
  localesConfig: RequiredLocaleConfig<T>,
) => ComputedRef<T>
```

::: details 示例

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

## 工具

### getHeaders

获取当前页面指定的 标题列表。

```ts
export const getHeaders: (options: GetHeadersOptions) => HeaderItem[]
```

**参数:**

```ts
export interface GetHeadersOptions {
  /**
   * 页面标题选择器
   *
   * @default '[vp-content] h1, [vp-content] h2, [vp-content] h3, [vp-content] h4, [vp-content] h5, [vp-content] h6'
   */
  selector?: string
  /**
   * 忽略标题内的特定元素选择器
   *
   * 它将作为 `document.querySelectorAll` 的参数。
   * 因此，你应该传入一个 `CSS 选择器` 字符串
   *
   * @default []
   */
  ignore?: string[]
  /**
   * 指定获取的标题层级
   *
   * `1` 至 `6` 表示 `<h1>` 至 `<h6>`
   *
   * - `false`: 不返回标题列表
   * - `number`: 只获取指定的单个层级的标题。
   * - `[number, number]: 标题层级元组，第一个数字应小于第二个数字。例如，`[2, 4]` 表示显示从 `<h2>` 到 `<h4>` 的所有标题。
   * - `deep`: 等同于 `[2, 6]`, 表示获取从 `<h2>` 到 `<h6>` 的所有标题。
   *
   * @default 2
   */
  levels?: HeaderLevels
}
```

**返回结果:**

```ts
interface PageHeader {
  /**
   * 当前标题的层级
   *
   * `1` 至 `6` 表示 `<h1>` 至 `<h6>`
   */
  level: number
  /**
   * 当前标题的内容
   */
  title: string
  /**
   * 标题的 标识
   *
   * 这通常是标题元素的 `id` 属性值
   */
  slug: string
  /**
   * 标题的链接
   *
   * 通常使用`#${slug}`作为锚点哈希
   */
  link: string
  /**
   * 标题的子标题列表
   */
  children: Header[]
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
    levels: [2, 3], // 只有 h2 和 h3
    ignore: ['.badge'], // 忽略标题内的 <Badge />
  })
  console.log(headers)
})
```

:::

## 组件{#component}

### FadeInExpandTransition

为块级元素的展开提供淡入淡出过渡效果，支持 `height` 或 `width` 属性。

**Props:**

```ts
interface FadeInExpandTransitionProps {
  /**
   * 是否分组过渡
   */
  group?: boolean
  /**
   * 过渡模式
   */
  mode?: 'default' | 'in-out' | 'out-in'

  /**
   * 是否切换为 `width` 的过渡
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

**导入样式：**

过渡动画需要按需引入以下 CSS 文件：

- `@vuepress/helper/transition/fade-in-height-expand.css` - `height` 过渡动画
- `@vuepress/helper/transition/fade-in-width-expand.css` - `width` 过渡动画

::: tip 只需要引入其中一个 CSS 文件
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

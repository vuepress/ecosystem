---
icon: pilcrow-left
---

# RTL

<NpmBadge package="@vuepress/plugin-rtl" />

此插件在配置的语言上设置文本方向为 RTL。

## 使用方法

```bash
npm i -D @vuepress/plugin-rtl@next
```

```ts title=".vuepress/config.ts"
import { rtlPlugin } from '@vuepress/plugin-rtl'

export default {
  plugins: [
    rtlPlugin({
      // 配置项
      locales: ['/ar/'],
    }),
  ],
}
```

## 示例

<ToggleRTLButton />

## 选项

### locales

- 类型：`string[]`
- 默认值：`['/']`
- 详情：启用 RTL 布局的语言路径。

### selector

- 类型：`SelectorOptions`

  ```ts
  interface SelectorOptions {
    [cssSelector: string]: {
      [attr: string]: string
    }
  }
  ```

- 默认值：`{ 'html': { dir: 'rtl' } }`
- 详情：启用 RTL 布局的选择器配置。默认设置意味着在 RTL 语言中，`html` 元素的 `dir` 属性将被设置为 `rtl`。

<script setup>
import ToggleRTLButton from '@source/.vuepress/components/ToggleRTLButton.vue'
</script>

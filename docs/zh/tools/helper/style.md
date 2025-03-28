---
icon: paintbrush-vertical
---

# 样式

提供了如下样式文件。

## 规范化

`@vuepress/helper/normalize.css` 是一个 CSS 文件，用于规范化浏览器的默认样式。推荐在社区主题中引入它。

## 过渡{#transitions}

`@vuepress/helper/transition/*.css` 是一组提供元素过渡效果的CSS文件集合，推荐在社区主题中按需导入使用。

- `fade-in.css`
- `fade-in-up.css`
- `fade-in-down.css`
- `fade-in-left.css`
- `fade-in-right.css`
- `fade-in-scale-up.css`
- `slide-in-up.css`
- `slide-in-down.css`
- `slide-in-left.css`
- `slide-in-right.css`

**使用：**

```vue
<script setup>
import '@vuepress/helper/transition/fade-in.css'
</script>

<template>
  <Transition name="fade-in">
    <div>...</div>
  </Transition>
</template>
```

**CSS 变量：**

```css
:root {
  /* general transitions variables */

  --transition-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --transition-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --transition-duration: 0.3s;
  --transition-enter-duration: var(--transition-duration);
  --transition-leave-duration: 0.2s;
  --transition-delay: 0.1s;

  /* specific transitions variables */

  --transition-fade-in-up-offset: 10px;
  --transition-fade-in-down-offset: -10px;
  --transition-fade-in-left-offset: 10px;
  --transition-fade-in-right-offset: -10px;

  --transition-fade-in-scale-up-scale: 0.9;
  --transition-fade-in-scale-up-duration: 0.2s;
  --transition-fade-in-scale-up-origin: inherit;

  --transition-slide-in-up-offset: 100%;
  --transition-slide-in-down-offset: -100%;
  --transition-slide-in-left-offset: 100%;
  --transition-slide-in-right-offset: -100%;
}
```

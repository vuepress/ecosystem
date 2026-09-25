---
url: /tools/helper/style.md
---
# Styles

The following styles are provided.

## Normalize

`@vuepress/helper/normalize.css` is a CSS file that normalizes the default styles of the browser. It is recommended to import it in community themes.

## Transitions

`@vuepress/helper/transition/*.css` is a collection of CSS files that provide transitions for elements. It is recommended to import for use as needed in community themes.

* `fade-in.css`
* `fade-in-up.css`
* `fade-in-down.css`
* `fade-in-left.css`
* `fade-in-right.css`
* `fade-in-scale-up.css`
* `slide-in-up.css`
* `slide-in-down.css`
* `slide-in-left.css`
* `slide-in-right.css`

**Usage:**

```vue
<script setup>
import { ref } from 'vue'
import '@vuepress/helper/transition/fade-in.css'

const show = ref(true)
</script>

<template>
  <Transition name="fade-in">
    <div v-show="show">...</div>
  </Transition>
</template>
```

**CSS Variables:**

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

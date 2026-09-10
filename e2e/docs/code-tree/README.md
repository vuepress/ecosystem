# Code Tree

::: code-tree title="Vue App" height="400px" entry="src/main.ts"

```vue title="src/components/HelloWorld.vue"
<template>
  <div class="hello">Hello World</div>
</template>
```

```vue title="src/App.vue"
<template>
  <div id="app"></div>
</template>
```

```ts title="src/main.ts"
import { createApp } from 'vue'

createApp({}).mount('#app')
```

```json title="package.json"
{
  "name": "vue-app"
}
```

:::

::: code-tree entry="index.ts"

```ts title="index.ts"
export * from './utils.js'
```

```ts title="utils.ts"
export const foo = 'foo'
```

:::

::: code-tree

```ts title="untitled.ts"
export const bar = 'bar'
```

```ts
export const baz = 'baz'
```

:::

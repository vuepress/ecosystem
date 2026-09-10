---
icon: file-code
---

# markdown-code-tree

<NpmBadge package="@vuepress/plugin-markdown-code-tree" />

In Markdown, use the `::: code-tree` container to display the code blocks of several files together with a file tree, so that the structure of a small template is clear at a glance.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-code-tree@next
```

```ts title=".vuepress/config.ts"
import { markdownCodeTreePlugin } from '@vuepress/plugin-markdown-code-tree'

export default {
  plugins: [markdownCodeTreePlugin()],
}
```

## Syntax

Wrap several code blocks in a `::: code-tree` container, and add a `title="filepath"` attribute to a code block to declare the file it belongs to.

````md
::: code-tree title="Project Name" height="400px" entry="src/index.ts"

```ts title="src/index.ts"
console.log('main')
```

```json title="package.json"
{}
```

:::
````

- Add a title after the `::: code-tree` container to declare the title of the code tree.
- Add a `height` attribute after the `::: code-tree` container to declare the height of the code tree. A bare number is treated as pixels.
- Add an `entry` attribute after the `::: code-tree` container to declare the file opened by default.
- Add `:active` after a code block to declare the file opened by default, which has a higher priority than `entry`.
- When neither `entry` nor `:active` is declared, the first code block is opened by default.

Code blocks without a `title` attribute are not included in the file tree, and they are not displayed.

Files and folders are displayed with their icons. The icons come from <https://icon-sets.iconify.design/> and are rendered by `<VPIcon />` provided by `@vuepress/plugin-icon`. When that plugin is not enabled, a generic file or folder icon is used instead.

## Related

Only the container syntax is supported. The `@[code-tree](dir_path)` syntax of other themes is not supported.

::: warning

The code tree relies on the code block title feature of the highlighter, which is enabled by default in `@vuepress/plugin-shiki` and `@vuepress/plugin-prismjs`.

Do not disable `codeBlockTitle`, or replace it with a custom render function, otherwise the file tree is rendered without any code block.

:::

## Example

**Input:**

````md
::: code-tree title="Vue App" height="400px" entry="src/main.ts"

```vue title="src/components/HelloWorld.vue"
<template>
  <div class="hello">
    <h1>Hello World</h1>
  </div>
</template>
```

```vue title="src/App.vue"
<template>
  <div id="app">
    <h3>Vue App</h3>
    <HelloWorld />
  </div>
</template>
```

```ts title="src/main.ts"
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

```json title="package.json"
{
  "name": "Vue App",
  "scripts": {
    "dev": "vite"
  }
}
```

:::
````

**Output:**

::: code-tree title="Vue App" height="400px" entry="src/main.ts"

```vue title="src/components/HelloWorld.vue"
<template>
  <div class="hello">
    <h1>Hello World</h1>
  </div>
</template>
```

```vue title="src/App.vue"
<template>
  <div id="app">
    <h3>Vue App</h3>
    <HelloWorld />
  </div>
</template>
```

```ts title="src/main.ts"
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

```json title="package.json"
{
  "name": "Vue App",
  "scripts": {
    "dev": "vite"
  }
}
```

:::

## Options

### height

- Type: `number | string`
- Default: `'320px'`
- Details: The default height of the code tree. A number will be treated as pixels.

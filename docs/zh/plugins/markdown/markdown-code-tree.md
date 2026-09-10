---
icon: file-code
---

# markdown-code-tree

<NpmBadge package="@vuepress/plugin-markdown-code-tree" />

在 Markdown 中，使用 `::: code-tree` 容器，将多个文件的代码块和文件树一起展示，让小型模板的结构一目了然。

## 使用

```bash
npm i -D @vuepress/plugin-markdown-code-tree@next
```

```ts title=".vuepress/config.ts"
import { markdownCodeTreePlugin } from '@vuepress/plugin-markdown-code-tree'

export default {
  plugins: [markdownCodeTreePlugin()],
}
```

## 语法

使用 `::: code-tree` 容器包裹多个代码块，并在代码块上使用 `title="文件路径"` 属性声明其所属的文件。

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

- 在 `::: code-tree` 容器后添加标题来声明代码树的标题。
- 在 `::: code-tree` 容器后添加 `height` 属性来声明代码树的高度。纯数字会被视为像素值。
- 在 `::: code-tree` 容器后添加 `entry` 属性来声明默认打开的文件。
- 在代码块后添加 `:active` 来声明默认打开的文件，其优先级高于 `entry`。
- 当 `entry` 和 `:active` 均未声明时，默认打开第一个代码块。

未使用 `title` 属性声明文件路径的代码块不会出现在文件树中，也不会被显示。

文件和文件夹会展示各自的图标。图标来自 <https://icon-sets.iconify.design/>，由 `@vuepress/plugin-icon` 提供的 `<VPIcon />` 渲染。未启用该插件时，将使用通用的文件或文件夹图标。

## 嵌入目录

使用 `@[code-tree](dir_path)` 将目录嵌入为代码树，目录下的所有代码文件都会被读取并渲染为代码块。

```md
<!-- 以 `/` 开头的路径从源目录开始查找 -->

@[code-tree title="Vue App" height="400px" entry="src/main.ts"](/src)
```

- 以 `/` 开头的路径从源目录开始查找，其他路径从当前页面所在目录开始查找。
- 无法作为代码展示的文件（图片、媒体、字体、文档和压缩包）会被跳过，二进制文件（通过 NUL 字节或控制字符判断）与超过 128 KB 的文件同样会被跳过。
- `node_modules`、`.git`、`.cache` 和 `.temp` 会被忽略，`.DS_Store` 和 `.gitkeep` 同样会被忽略。
- 不存在、不是目录、为空、或位于源目录之外（包括通过符号链接）的目录会被跳过并给出警告。

**输出：**

本页嵌入了 `docs/code-tree-demo`：

@[code-tree title="Vue App" height="400px" entry="src/main.ts"](/code-tree-demo)

::: warning

代码树依赖高亮器的代码块标题功能，该功能在 `@vuepress/plugin-shiki` 和 `@vuepress/plugin-prismjs` 中默认启用。

请勿关闭 `codeBlockTitle`，或将其替换为自定义渲染函数，否则文件树将不会渲染出任何代码块。

:::

## 示例

**输入：**

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

**输出：**

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

## 选项

### height

- 类型：`number | string`
- 默认值：`'320px'`
- 详情：代码树的默认高度。数字将被视为像素值。

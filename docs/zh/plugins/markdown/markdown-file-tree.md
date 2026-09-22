---
icon: folder-tree
---

# markdown-file-tree

<NpmBadge package="@vuepress/plugin-markdown-file-tree" />

该插件用于在 Markdown 中渲染目录结构，既可以来自 Markdown 无序列表（文件树），也可以来自多个文件的代码块（代码树）。

## 使用

```bash
npm i -D @vuepress/plugin-markdown-file-tree@next
```

```ts title=".vuepress/config.ts"
import { markdownFileTreePlugin } from '@vuepress/plugin-markdown-file-tree'

export default {
  plugins: [
    markdownFileTreePlugin({
      fileTree: true,
      codeTree: true,
    }),
  ],
}
```

## 文件树

在 Markdown 中，使用 `::: file-tree` 容器展示带有文件图标和可折叠子目录的目录结构。

### 语法

在 `::: file-tree` 容器中，使用内置的 **Markdown 无序列表语法** 来指定文件和目录结构。
使用嵌套列表项创建子目录；如果你不希望目录显示其内容，请在该列表项后添加一个斜杠 `/`。

可以使用以下语法自定义文件树的外观：

- 通过将文件名或目录名加粗，可以将其高亮，例如 `**README.md**`
- 通过在文件名或目录名后添加以 `#` 开头的额外文本，可以为文件或目录添加注释，例如 `README.md # 一个 README 文件`
- 通过在文件名或目录名前添加 `++` 或 `--`，可以将文件或目录标记为 **新增** 或 **删除**，例如 `++ new-file.md` 或 `-- old-file.md`
- 使用 `...` 或 `…` 作为名称来添加占位文件和目录。
- 在 `:::file-tree` 容器后添加任意文本可以为文件树添加标题。

### 示例

**输入：**

```md
::: file-tree

- docs
  - .vuepress
    - ++ config.ts
  - -- page1.md
  - README.md
- theme # 一个 **主题** 目录
  - client
    - components
      - **Navbar.vue**
    - composables
      - useNavbar.ts
    - styles
      - navbar.css
    - config.ts
  - node/
- package.json
- pnpm-lock.yaml
- .gitignore
- README.md
- …

:::
```

**输出：**

::: file-tree

- docs
  - .vuepress
    - ++ config.ts
  - -- page1.md
  - README.md
- theme # 一个 **主题** 目录
  - client
    - components
      - **Navbar.vue**
    - composables
      - useNavbar.ts
    - styles
      - navbar.css
    - config.ts
  - node/
- package.json
- pnpm-lock.yaml
- .gitignore
- README.md
- …

:::

## 代码树

在 Markdown 中，使用 `::: code-tree` 容器将多个文件的代码块与文件树一起展示，让小型模板的结构一目了然。

### 语法

将多个代码块包裹在 `::: code-tree` 容器中，并为代码块添加 `title="filepath"` 属性来声明它所属的文件。

````md
::: code-tree title="项目名称" height="400px" entry="src/index.ts"

```ts title="src/index.ts"
console.log('main')
```

```json title="package.json"
{}
```

:::
````

- 在 `::: code-tree` 容器后添加标题，以声明代码树的标题。
- 在 `::: code-tree` 容器后添加 `height` 属性，以声明代码树的高度。纯数字会被视为像素值。
- 在 `::: code-tree` 容器后添加 `entry` 属性，以声明默认打开的文件。
- 在代码块后添加 `:active`，以声明默认打开的文件，其优先级高于 `entry`。
- 当 `entry` 和 `:active` 都未声明时，默认打开第一个代码块。

没有 `title` 属性的代码块不会被加入文件树，也不会被展示。

文件和文件夹会显示各自的图标。图标来自 <https://icon-sets.iconify.design/>，由 `@vuepress/plugin-icon` 提供的 `<VPIcon />` 渲染。当该插件未启用时，会改用内置的通用文件或文件夹图标。

图标表由 `@yutengjing/vscode-icons` **生成**，而不是手工维护，图标集未覆盖的部分由少量补丁填补。在升级图标集后，可以使用以下命令更新：

```bash
pnpm --filter @vuepress/plugin-markdown-file-tree generate:icons
```

### 嵌入目录

使用 `@[code-tree](dir_path)` 将目录嵌入为代码树。目录中的所有代码文件都会被读取并渲染为代码块。

```md
<!-- 以 `/` 开头的路径从源目录开始解析 -->

@[code-tree title="Vue App" height="400px" entry="src/main.ts"](/src)
```

- 以 `/` 开头的路径从源目录开始解析，其他路径从当前页面所在目录开始解析。
- 无法作为代码展示的文件（图片、媒体、字体、文档和压缩包）会被跳过，二进制文件（通过 NUL 字节或控制字符检测）以及大于 128 KB 的文件也是如此。
- `node_modules`、`.git`、`.cache` 和 `.temp` 会被忽略，`.DS_Store` 和 `.gitkeep` 同样如此。
- 不存在、不是目录、为空，或者位于源目录之外（包括通过符号链接）的目录会被跳过并给出警告。
- 文件名会原样保留，包括中日韩字符和空格。只有会破坏渲染后的代码块标题的字符 —— 引号、反引号、`<`、`>`、`\`、HTML 实体，以及首尾空白 —— 会被百分号编码，指向这类文件的 `entry` 必须使用编码后的值。

**输出：**

该页面嵌入了 `docs/code-tree-demo`：

@[code-tree title="Vue App" height="400px" entry="src/main.ts"](/code-tree-demo)

::: warning

代码树依赖高亮器的代码块标题功能，它在 `@vuepress/plugin-shiki` 和 `@vuepress/plugin-prismjs` 中默认启用。

不要禁用 `codeBlockTitle`，也不要替换为自定义渲染函数，否则文件树不会有任何代码块。

:::

### 示例

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

### fileTree

- 类型：`boolean`
- 详情：是否启用文件树，即从 `::: file-tree` 容器内的 Markdown 无序列表渲染目录结构。禁用后 `::: file-tree` 容器不可用。

### codeTree

- 类型：`boolean | MarkdownCodeTreePluginOptions`
- 详情：是否启用代码树，即将多个文件的代码块与文件树一起展示。禁用后 `::: code-tree` 容器和 `@[code-tree](dir_path)` 语法不可用。传入对象表示启用代码树并附加选项。

#### codeTree.height

- 类型：`number | string`
- 默认值：`'320px'`
- 详情：代码树的默认高度。数字会被视为像素值。

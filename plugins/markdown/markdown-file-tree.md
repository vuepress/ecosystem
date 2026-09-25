---
url: /plugins/markdown/markdown-file-tree.md
---
# markdown-file-tree

This plugin renders a directory structure in Markdown, either from a Markdown unordered list (file tree), or from the code blocks of several files (code tree).

## Usage

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

## File Tree

In Markdown, use the `::: file-tree` container to display a directory structure with file icons and collapsible subdirectories.

### Syntax

In the `::: file-tree` container, use the built-in **Markdown unordered list syntax** to specify the file and directory structure.
Use nested list items to create subdirectories; if you want a directory to not display its contents, add a trailing slash `/` to the list item.

The following syntax can be used to customize the appearance of the file tree:

* By bolding the filename or directory name, you can highlight it, e.g. `**README.md**`
* By appending additional text starting with `#` to the filename or directory name, you can add a comment to the file or directory, e.g. `README.md # a README file`
* By prefixing the filename or directory name with `++` or `--`, you can mark the file or directory as **added** or **deleted**, e.g. `++ new-file.md` or `-- old-file.md`
* Use `...` or `…` as the name to add placeholder files and directories.
* Add any text after `:::file-tree` container to add a title to the file tree.

### Example

**Input：**

```md
::: file-tree

- docs
  - .vuepress
    - ++ config.ts
  - -- page1.md
  - README.md
- theme # a **theme** directory
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

**Output：**

::: file-tree

* docs
  * .vuepress
    * ++ config.ts
  * \-- page1.md
  * README.md
* theme # a **theme** directory
  * client
    * components
      * **Navbar.vue**
    * composables
      * useNavbar.ts
    * styles
      * navbar.css
    * config.ts
  * node/
* package.json
* pnpm-lock.yaml
* .gitignore
* README.md
* …

:::

## Code Tree

In Markdown, use the `::: code-tree` container to display the code blocks of several files together with a file tree, so that the structure of a small template is clear at a glance.

### Syntax

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

* Add a title after the `::: code-tree` container to declare the title of the code tree.
* Add a `height` attribute after the `::: code-tree` container to declare the height of the code tree. A bare number is treated as pixels.
* Add an `entry` attribute after the `::: code-tree` container to declare the file opened by default.
* Add `:active` after a code block to declare the file opened by default, which has a higher priority than `entry`.
* When neither `entry` nor `:active` is declared, the first code block is opened by default.

Code blocks without a `title` attribute are not included in the file tree, and they are not displayed.

Files and folders are displayed with their icons. The icons come from <https://icon-sets.iconify.design/> and are rendered by `<VPIcon />` provided by `@vuepress/plugin-icon`. When that plugin is not enabled, a generic file or folder icon is used instead.

The icon table is **generated** from `@yutengjing/vscode-icons` instead of being maintained by hand, and the gaps that the icon set does not cover are filled by a small overlay. To update it after bumping the icon set:

```bash
pnpm --filter @vuepress/plugin-markdown-file-tree generate:icons
```

### Embedding a directory

Use `@[code-tree](dir_path)` to embed a directory as a code tree. All code files in the directory are read and rendered as code blocks.

```md
<!-- A path starting with `/` is resolved from the source directory -->

@[code-tree title="Vue App" height="400px" entry="src/main.ts"](/src)
```

* A path starting with `/` is resolved from the source directory. Any other path is resolved from the directory of the current page.
* Files that can not be displayed as code (images, media, fonts, documents and archives) are skipped, so do binary files (detected by NUL bytes or control characters) and files larger than 128 KB.
* `node_modules`, `.git`, `.cache` and `.temp` are ignored, so do `.DS_Store` and `.gitkeep`.
* A directory that does not exist, is not a directory, is empty, or is outside of the source directory (including through a symbolic link), is skipped with a warning.
* A file name is kept as it is, including CJK characters and spaces. Only the characters that would break the rendered code block title — a quote, a backtick, `<`, `>`, `\`, an HTML entity, and leading or trailing whitespace — are percent encoded, and an `entry` pointing to such a file must use the encoded value.

**Output:**

This page embeds `docs/code-tree-demo`:

@[code-tree title="Vue App" height="400px" entry="src/main.ts"](/code-tree-demo)

::: warning

The code tree relies on the code block title feature of the highlighter, which is enabled by default in `@vuepress/plugin-shiki` and `@vuepress/plugin-prismjs`.

Do not disable `codeBlockTitle`, or replace it with a custom render function, otherwise the file tree is rendered without any code block.

:::

### Example

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

### fileTree

* Type: `boolean`
* Details: Whether to enable the file tree, which renders a directory structure from Markdown unordered lists inside a `::: file-tree` container. The `::: file-tree` container is not available when it is disabled.

### codeTree

* Type: `boolean | MarkdownCodeTreePluginOptions`
* Details: Whether to enable the code tree, which puts the code blocks of several files together with a file tree. The `::: code-tree` container and the `@[code-tree](dir_path)` syntax are not available when it is disabled. Passing an object enables the code tree with the given options.

#### codeTree.height

* Type: `number | string`
* Default: `'320px'`
* Details: The default height of the code tree. A number will be treated as pixels.

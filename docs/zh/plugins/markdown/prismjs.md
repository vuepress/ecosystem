---
icon: pyramid
---

# prismjs

<NpmBadge package="@vuepress/plugin-prismjs" />

该插件使用 [Prism.js](https://prismjs.com/) 来为 Markdown 代码块启用代码高亮。

该插件已经集成到默认主题中。

## 使用方法

```bash
npm i -D @vuepress/plugin-prismjs@next
```

```ts title=".vuepress/config.ts"
import { prismjsPlugin } from '@vuepress/plugin-prismjs'

export default {
  plugins: [
    prismjsPlugin({
      // 配置项
    }),
  ],
}
```

## 配置项

### theme

- 类型：`PrismjsTheme`

- 默认值：`'nord'`

- 详情：Prismjs 的主题，会应用到代码块上。

### themes

- 类型：`{ light: PrismjsTheme; dark: PrismjsTheme }`

- 详情：

  使用亮暗双主题。

  注意：想使用此功能，你的主题必须在夜间模式下在 `<html>` 标签上设置 `data-theme="dark"` 属性。

::: tip 可用的 Prism.js 浅色主题

- ateliersulphurpool-light
- coldark-cold
- coy
- duotone-light
- ghcolors
- gruvbox-light
- material-light
- one-light
- vs

:::

::: tip 可用的 Prism.js 深色主题

- atom-dark
- cb
- coldark-dark
- dark
- dracula
- duotone-dark
- duotone-earth
- duotone-forest
- duotone-sea
- duotone-space
- gruvbox-dark
- holi
- hopscotch
- lucario
- material-dark
- material-oceanic
- night-owl
- nord
- one-dark
- pojoaque
- shades-of-purple
- solarized-dark-atom
- tomorrow
- vsc-dark-plus
- xonokai
- z-touch

:::

### lineNumbers

- 类型：`boolean | number | 'disable'`

- 默认值：`true`

- 详情：
  - `number`：显示行号所需的最少行数。
    例如，如果你将它设置为 4，那么只有在你的代码块包含至少 4 行代码时才会启用行号。
  - `true`：全局启用代码行号。
  - `false`：全局禁用代码行号。
  - `'disable'`：完全禁用行号，`:line-numbers` 标记不会生效。

  你可以在代码块添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖配置项中的设置，还可以在 `:line-numbers` 之后添加 `=` 来自定义起始行号，例如 `:line-numbers=2` 表示代码块中的行号从 `2` 开始。

::: preview

```ts :line-numbers
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :no-line-numbers
// 禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :line-numbers=2
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

:::

### highlightLines

- 类型：`boolean`

- 默认值：`true`

- 详情：

  是否启用行高亮。启用后，可在代码块的信息描述中添加行数标记来高亮指定的行：
  - 行数范围：`{5-8}`
  - 多个单行：`{4,7,9}`
  - 组合：`{4,7-13,16,23-27,40}`

::: preview

```ts {1,7-9}
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: '你好， VuePress',

  theme: defaultTheme({
    logo: 'https://vuepress.vuejs.org/images/hero.png',
  }),
})
```

:::

### collapsedLines

- 类型：`boolean | number | 'disable'`

- 默认值：`'disable'`

- 详情：代码块折叠的默认行为。
  - `number`：从第 `number` 行开始折叠代码块，例如 `12` 表示从第 12 行开始折叠代码块。
  - `true`：等同于 `15`，从第 15 行开始折叠代码块。
  - `false`：添加代码块折叠支持，但全局禁用此功能。
  - `'disable'`：完全禁用代码块折叠，`:collapsed-lines` 标记不会生效。

  你可以在代码块添加 `:collapsed-lines` / `:no-collapsed-lines` 标记来覆盖配置项中的设置。还可以在 `:collapsed-lines` 之后添加 `=` 来自定义起始折叠行号，例如 `:collapsed-lines=12` 表示代码块从第 12 行开始折叠。

::: preview

<!-- 默认从第 15 行开始折叠 -->

```css :collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
  float: left;
  width: 25%;
  height: 100%;
  object-fit: cover;
}

.main {
  display: none;
}
```

<!-- 禁用折叠 -->

```css :no-collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
  float: left;
  width: 25%;
  height: 100%;
  object-fit: cover;
}

.main {
  display: none;
}
```

<!-- 从第 10 行开始折叠 -->

```css :collapsed-lines=10
html {
  margin: 0;
  background: black;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
  float: left;
  width: 25%;
  height: 100%;
  object-fit: cover;
}

.main {
  display: none;
}
```

:::

### codeBlockTitle

- 类型：`boolean | CodeBlockTitleRender`

  ```ts
  type CodeBlockTitleRender = (title: string, code: string) => string
  ```

- 默认值：`true`

- 详情：是否启用代码块标题渲染。在代码块 <code>\`\`\`</code> 后面添加 `title="标题"` 来设置标题。

  传入 `CodeBlockTitleRender` 以自定义标题渲染。

- 示例：

  ::: preview

  ```ts title="foo/baz.js"
  console.log('hello')
  ```

  :::

::: tip

在新的版本中，实现了类似于 [shiki](https://shiki.style/packages/transformers) 的部分功能，
你可以使用与其相同的语法来为代码块添加样式。

:::

### notationDiff

- 类型：`boolean`

- 默认值：`false`

- 详情：是否启用差异标记。

- 示例：

  <VPPreview>
  <template #code>

  ````md
  ```ts
  console.log('拟好') // [\!code --]
  console.log('你好') // [\!code ++]
  console.log('再见')
  ```
  ````

  </template>
  <template #content>

  ```ts
  console.log('拟好') // [!code --]
  console.log('你好') // [!code ++]
  console.log('再见')
  ```

  </template>
  </VPPreview>

- 参考：
  - [Shiki > 差异标记](https://shiki.tmrs.site/packages/transformers#transformernotationdiff)

### notationFocus

- 类型：`boolean`

- 默认值：`false`

- 详情：是否启用聚焦标记。

- 示例：

  <VPPreview>
  <template #code>

  ````md
  ```ts
  console.log('未聚焦')
  console.log('聚焦') // [\!code focus]
  console.log('未聚焦')
  ```
  ````

  </template>
  <template #content>

  ```ts
  console.log('未聚焦')
  console.log('聚焦') // [!code focus]
  console.log('未聚焦')
  ```

  </template>
  </VPPreview>

- 参考：
  - [Shiki > 聚焦标记](https://shiki.tmrs.site/packages/transformers#transformernotationfocus)

### notationHighlight

- 类型：`boolean`

- 默认值：`false`

- 详情：是否启用高亮标记。

- 示例：

  <VPPreview>
  <template #code>

  ````md
  ```ts
  console.log('未高亮')
  console.log('高亮') // [\!code highlight]
  console.log('未高亮')
  ```
  ````

  </template>
  <template #content>

  ```ts
  console.log('未高亮')
  console.log('高亮') // [!code highlight]
  console.log('未高亮')
  ```

  </template>
  </VPPreview>

- 参考：
  - [Shiki > 高亮标记](https://shiki.tmrs.site/packages/transformers#transformernotationhighlight)

### notationErrorLevel

- 类型：`boolean`

- 默认值：`false`

- 详情：是否启用错误级别标记。

- 示例：

  <VPPreview>
  <template #code>

  ````md
  ```ts
  console.log('无警告或错误')
  console.warn('警告') // [\!code warning]
  console.error('错误') // [\!code error]
  ```
  ````

  </template>
  <template #content>

  ```ts
  console.log('无警告或错误')
  console.warn('警告') // [!code warning]
  console.error('错误') // [!code error]
  ```

  </template>
  </VPPreview>

- 参考：
  - [Shiki > 错误级别标记](https://shiki.tmrs.site/packages/transformers#transformernotationerrorlevel)

### notationWordHighlight

- 类型：`boolean`

- 默认值：`false`

- 详情：是否启用词高亮标记。

  词高亮标记必须单独写在一行。

- 示例：

  根据注释中提供的字符串，高亮显示词。

  <VPPreview>
  <template #code>

  ````md
  ```ts
  // [\!code word:你好]
  const message = '你好世界'
  console.log(message) // prints 你好世界
  ```
  ````

  </template>
  <template #content>

  ```ts
  // [!code word:你好]
  const message = '你好世界'
  console.log(message) // prints 你好世界
  ```

  </template>
  </VPPreview>

  根据代码片段中提供的元字符串，高亮显示词

  ::: preview

  ```js /你好/
  const msg = '你好世界'
  console.log(msg) // 打印 你好世界
  ```

  :::

- 参考：
  - [Shiki > 词高亮标记](https://shiki.tmrs.site/packages/transformers#transformernotationwordhighlight)

### whitespace

- 类型：`boolean | 'all' | 'boundary' | 'trailing'`

- 默认值：`false`

- 详情：是否启用空白符（空格和 Tab）渲染。
  - `true`：启用空白符渲染，但默认不渲染任何空白符
  - `false`：完全禁用空白符渲染，`:whitespace` 标记不会生效。
  - `'all'`：渲染所有空白符
  - `'boundary'`：仅渲染行首行尾的空白符
  - `'trailing'`：仅渲染行尾的空白符

  你可以在代码块中添加 `:whitespace` / `:no-whitespace` 标记来覆盖配置项中的设置。还可以在 `:whitespace` 之后添加 `=` 来定义渲染空白符的方式。比如 `:whitespace=boundary` 将渲染行首行尾的空白符。

- 示例：

  ::: preview

  ```md :whitespace
  <!-- 渲染所有空白符 -->

  具有尾随空格  
  的文字

      缩进文字
  ```

  ```md :whitespace=boundary
  <!-- 渲染行首行尾的空白符 -->

  具有尾随空格  
  的文字

      缩进文字
  ```

  ```md :whitespace=trailing
  <!-- 渲染行尾的空白符 -->

  具有尾随空格  
  的文字

      缩进文字
  ```

  ```md :no-whitespace
  <!-- 禁用空白符渲染 -->

  具有尾随空格  
  的文字

      缩进文字
  ```

  :::

- 参考：
  - [Shiki > 空白符渲染](https://shiki.tmrs.site/packages/transformers#transformerrenderwhitespace)

### preloadLanguages

- 类型：`string[]`

- 默认值：`['markdown', 'jsdoc', 'yaml']`

- 详情：

  需要预加载的语言。

  默认情况下，语言会在解析 Markdown 文件时按需加载。

  然而，Prism.js 在动态加载语言时可能会遇到[一些潜在的问题](https://github.com/PrismJS/prism/issues/2716)。为了避免这些问题，你可以使用该配置项来预加载一些语言。

### preWrapper

- 类型：`boolean`

- 默认值：`true`

- 详情：

  是否在 `<pre>` 标签外添加包裹容器。

  `lineNumbers` 和 `collapsedLines` 依赖于这个额外的包裹层。换句话说，如果你禁用了 `preWrapper`，那么行号和折叠代码块也会被同时禁用。

  ::: tip

  如果你想要在客户端来实现这些功能，可以禁用该配置项。比如使用 [Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) 或 [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/)。

  :::

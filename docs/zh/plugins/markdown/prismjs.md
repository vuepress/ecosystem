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

## 指南

### Prism.js 主题

Prism.js 主题会应用到整个站点。使用 `theme` 设置单一主题，或使用 `themes` 为亮色和暗色模式分别设置主题。

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

::: warning

使用 `themes` 时，你的主题必须在夜间模式下在 `<html>` 标签上设置 `data-theme="dark"` 属性。

:::

### 行号

行号默认启用。你可以使用标记为单个代码块覆盖行号设置：

- `:line-numbers`：启用行号。
- `:no-line-numbers`：禁用行号。
- `:line-numbers=2`：启用行号并从 `2` 开始计数。

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

你也可以将 `lineNumbers` 设置为数字，让只有行数足够的代码块才显示行号；或设置为 `'disable'` 完全关闭该标记。

### 行高亮

行高亮默认启用。在代码块的信息描述中添加行数标记即可高亮这些行：

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

### 折叠代码块

折叠代码块默认禁用。设置 `collapsedLines` 后即可启用，并使用标记控制单个代码块：

- `:collapsed-lines`：折叠代码块，默认从第 15 行开始。
- `:no-collapsed-lines`：不折叠代码块。
- `:collapsed-lines=10`：从第 `10` 行开始折叠代码块。

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

### 代码块标题

代码块标题默认启用。在代码块信息描述中添加 `title="标题"` 即可在代码块上方显示标题栏。

::: preview

```ts title="foo/baz.js"
console.log('hello')
```

:::

你可以向 `codeBlockTitle` 传入一个 `CodeBlockTitleRender` 函数来自定义标题的渲染方式。

### 标记

该插件支持与 [Shiki](https://shiki.style/packages/transformers) 相同的标记转换器。它们默认全部关闭，需要通过对应的配置项启用。

#### 差异标记

启用 `notationDiff`，即可使用 `[!code ++]` 和 `[!code --]` 高亮新增和删除的行。

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

#### 聚焦标记

启用 `notationFocus`，即可淡化除聚焦行以外的所有行，聚焦行使用 `[!code focus]` 标记。

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

#### 高亮标记

启用 `notationHighlight`，即可高亮使用 `[!code highlight]` 标记的行。

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

#### 错误级别标记

启用 `notationErrorLevel`，即可按级别为行着色，使用 `[!code warning]` 和 `[!code error]` 标记。

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

#### 词高亮标记

启用 `notationWordHighlight`，即可高亮指定的词。该标记必须单独写在一行。

根据注释中提供的字符串高亮显示词：

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

根据代码片段中提供的元字符串高亮显示词：

::: preview

```js /你好/
const msg = '你好世界'
console.log(msg) // 打印 你好世界
```

:::

### 渲染空白符

空白符渲染默认禁用。设置 `whitespace` 后即可启用，并使用标记控制单个代码块：

- `:whitespace`：按配置项中设置的方式渲染空白符。
- `:no-whitespace`：不渲染空白符。
- `:whitespace=boundary`：渲染每行行首和行尾的空白符。

渲染方式可接受 `'all'`、`'boundary'`、`'leading'` 和 `'trailing'`。

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

```md :whitespace=leading
<!-- 渲染行首的空白符 -->

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

## 选项

::: fields
@`theme` type=PrismjsTheme default=`'nord'`

应用到代码块的 Prism.js 主题。可用值请参阅[Prism.js 主题](#prism-js-主题)。

@`themes` type=`{ light: PrismjsTheme; dark: PrismjsTheme }`

为亮色和暗色模式分别设置 Prism.js 主题。可用值请参阅[Prism.js 主题](#prism-js-主题)。

要求你的主题在夜间模式下在 `<html>` 标签上设置 `data-theme="dark"` 属性。

@`lineNumbers` type=`boolean | number | 'disable'` default=`true`

是否启用行号。数字表示代码块显示行号所需的最少行数，`'disable'` 表示完全关闭 `:line-numbers` 标记。

参考：[行号](#行号)。

@`highlightLines` type=boolean default=`true`

是否启用行数标记的行高亮。

参考：[行高亮](#行高亮)。

@`collapsedLines` type=`boolean | number | 'disable'` default=`'disable'`

是否启用折叠代码块。数字表示开始折叠的行号，`true` 等同于 `15`。设置为 `false` 时支持 `:collapsed-lines` 标记，但默认不折叠任何代码块。

参考：[折叠代码块](#折叠代码块)。

@`codeBlockTitle` type=`boolean | CodeBlockTitleRender` default=`true`

是否为信息描述中带有 `title="标题"` 的代码块渲染标题栏。

传入 `CodeBlockTitleRender` 函数以自定义标题渲染方式。

```ts
type CodeBlockTitleRender = (title: string, code: string) => string
```

参考：[代码块标题](#代码块标题)。

@`notationDiff` type=boolean default=`false`

是否启用差异标记转换器。

@`notationFocus` type=boolean default=`false`

是否启用聚焦标记转换器。

@`notationHighlight` type=boolean default=`false`

是否启用高亮标记转换器。

@`notationErrorLevel` type=boolean default=`false`

是否启用错误级别标记转换器。

@`notationWordHighlight` type=boolean default=`false`

是否启用词高亮标记转换器。

参考：[标记](#标记)。

@`whitespace` type=`boolean | 'all' | 'boundary' | 'leading' | 'trailing'` default=`false`

是否渲染空白符。`true` 表示启用该语法但默认不渲染任何空白符，`false` 表示完全关闭 `:whitespace` 标记。

参考：[渲染空白符](#渲染空白符)。

@`preloadLanguages` type=`string[]` default=`['markdown', 'jsdoc', 'yaml']`

需要预加载的语言。

默认情况下，语言会在解析 Markdown 文件时按需加载，但 Prism.js 在动态加载语言时可能会遇到[一些潜在的问题](https://github.com/PrismJS/prism/issues/2716)。预加载语言可以避免这些问题。

@`preWrapper` type=boolean default=`true`

是否在 `<pre>` 标签外添加包裹容器。

`lineNumbers` 和 `collapsedLines` 依赖于这个额外的包裹层，也就是说禁用它会同时禁用行号和折叠代码块。如果你想要在客户端实现这些功能，可以禁用它，例如使用 [Prismjs Line Highlight](https://prismjs.com/plugins/line-highlight/) 或 [Prismjs Line Numbers](https://prismjs.com/plugins/line-numbers/)。

:::

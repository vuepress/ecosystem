---
icon: highlighter
---

# shiki

<NpmBadge package="@vuepress/plugin-shiki" />

该插件使用 [Shiki](https://shiki.tmrs.site/) 为 Markdown 代码块启用语法高亮。

::: tip

[Shiki](https://shiki.tmrs.site/) 是 VSCode 使用的语法高亮器。它提供更高保真度的高亮效果，但在处理大量代码块时可能比 [Prism.js](https://prismjs.com/) 慢一些。

:::

## 使用方法

```bash
npm i -D @vuepress/plugin-shiki@next
```

```ts title=".vuepress/config.ts"
import { shikiPlugin } from '@vuepress/plugin-shiki'

export default {
  plugins: [
    shikiPlugin({
      // 配置项
      langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff'],
    }),
  ],
}
```

## 指南

### Shiki 主题

使用 `theme` 设置单一主题，或使用 `themes` 为亮色和暗色模式分别设置主题。

使用 `themes` 时，两个主题的样式会分别通过 `--shiki-light` 和 `--shiki-dark` CSS 变量注入到代码块，因此切换颜色模式时无需重新高亮代码：

```html
<span style="--shiki-light:lightColor;--shiki-dark:darkColor;">code</span>
```

参考：[Shiki > 双主题](https://shiki.tmrs.site/guide/dual-themes)。

### 语言

插件会自动加载你的 Markdown 文件中使用的语言，因此 `langs` 只用于预加载额外语言，`langAlias` 用于添加自定义语言别名。

参考：[Shiki > 语言](https://shiki.tmrs.site/languages)。

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

### 移除注释

启用 `removeComments` 可以从代码中移除注释。它通过检查语法标记的元数据来判断该标记是否为注释。

参考：[Shiki > 移除注释](https://shiki.tmrs.site/packages/transformers#transformerremovecomments)。

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

启用 `notationErrorLevel`，即可按级别为行着色，使用 `[!code warning]`、`[!code error]` 和 `[!code info]` 标记。

<VPPreview>
<template #code>

````md
```ts
console.log('无警告或错误')
console.warn('警告') // [\!code warning]
console.error('错误') // [\!code error]
console.log('信息') // [\!code info]
```
````

</template>
<template #content>

```ts
console.log('无警告或错误')
console.warn('警告') // [!code warning]
console.error('错误') // [!code error]
console.log('信息') // [!code info]
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
<!-- 禁用空白符 -->

A text
with line break

    code block
```

:::

### Twoslash 支持

启用 `twoslash` 即可使用 [twoslash](https://github.com/twoslashes/twoslash) 为代码块提供类型信息。它会为代码添加类型提示、错误信息和补全，并在悬停时以弹窗形式展示。

```ts twoslash
const a = 1
const b = 23
console.log(a + b)
```

对于启用了 `twoslash` 的代码块：

- 不要添加 `:v-pre` 标记，这会导致 `twoslash` 无法正常运行。
- 为避免布局冲突，代码块不再显示行号。

::: tip

出于体积考虑，该插件默认不包含 `@vuepress/shiki-twoslash` 包。如需使用，需手动安装。

:::

参考：[Shiki > Twoslash](https://shiki.style/packages/twoslash)。

## 选项

::: fields
@`langs` type=`ShikiLang[]`

被 Shiki 解析的额外语言。

参考：[语言](#语言)。

@`langAlias` type=`{ [lang: string]: string }`

自定义 Shiki 语言别名。

参考：[语言](#语言)。

@`theme` type=ShikiTheme default=`'nord'`

应用到代码块的 Shiki 主题。

@`themes` type=`{ light: ShikiTheme; dark: ShikiTheme }`

为亮色和暗色模式分别设置 Shiki 主题。两个主题的样式会分别通过 `--shiki-light` 和 `--shiki-dark` CSS 变量注入。

参考：[Shiki 主题](#shiki-主题)。

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

@`removeComments` type=boolean default=`false`

是否从代码中移除注释。

参考：[移除注释](#移除注释)。

@`whitespace` type=`boolean | 'all' | 'boundary' | 'leading' | 'trailing'` default=`false`

是否渲染空白符。`true` 表示启用该语法但默认不渲染任何空白符，`false` 表示完全关闭 `:whitespace` 标记。

参考：[渲染空白符](#渲染空白符)。

@`twoslash` type=`boolean | ShikiTwoslashOptions` default=`false`

是否启用 [twoslash](https://github.com/twoslashes/twoslash)。

```ts
interface ShikiTwoslashOptions extends TransformerTwoslashOptions {
  /**
   * 是否需要显式地将 `twoslash` 添加到代码块中以运行 twoslash
   * @default true
   */
  explicitTrigger?: RegExp | boolean

  /**
   * twoslash 配置
   */
  twoslashOptions?: TransformerTwoslashOptions['twoslashOptions'] &
    VueSpecificOptions

  /**
   * 缓存解析后类型
   * @default true
   */
  typesCache?: TwoslashTypesCache | boolean
}
```

参考：[Twoslash 支持](#twoslash-支持)。

:::

## 高级选项

::: fields
@`defaultLang` type=string default=`'plain'`

指定语言不可用时所使用的备选语言。

@`logLevel` type=`'warn' | 'debug' | 'silent'` default=`'warn'`

Shiki 语言检测的日志级别。

- `warn`：每次检测到未知语言时发出警告（默认）
- `debug`：每次检测到未知代码块时记录其文件路径（设置 `--debug` 标记时默认）
- `silent`：不发出警告

@`preWrapper` type=boolean default=`true`

是否在 `<pre>` 标签外添加包裹容器。

`lineNumbers` 和 `collapsedLines` 依赖于这个额外的包裹层，也就是说禁用它会同时禁用行号和折叠代码块。

@`shikiSetup` type=`(shiki: Highlighter) => void | Promise<void>`

用于自定义 Shiki 高亮器的钩子函数。

@`transformers` type=`ShikiTransformer[]`

添加 Shiki 转换器，会被传递到 Shiki 的 `codeToHtml()` 方法。

参考：[Shiki > 转换器](https://shiki.tmrs.site/guide/transformers)。

:::

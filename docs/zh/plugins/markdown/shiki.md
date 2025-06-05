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

## 配置项

### langs

- 类型：`ShikiLang[]`

- 详情：

  被 Shiki 解析的额外语言。

  ::: tip

  插件会自动加载你的 Markdown 文件中使用的语言，无需手动指定。

  :::

- 参考：
  - [Shiki > 语言](https://shiki.tmrs.site/languages)

### langAlias

- 类型：`{ [lang: string]: string }`
- 详情：自定义 Shiki 语言别名。

- 参考：
  - [Shiki > 自定义语言别名](https://shiki.tmrs.site/guide/load-lang#custom-language-aliases)

### theme

- 类型：`ShikiTheme`

- 默认值：`'nord'`

- 详情：Shiki 主题，应用于代码块。

- 参考：
  - [Shiki > 主题](https://shiki.tmrs.site/themes)

### themes

- 类型：`{ light: ShikiTheme; dark: ShikiTheme }`

- 详情：

  Shiki 的暗黑和明亮模式双主题。

  两个主题的样式会分别通过 `--shiki-light` 和 `--shiki-dark` CSS 变量注入到代码块：

  ```html
  <span style="--shiki-light:lightColor;--shiki-dark:darkColor;">code</span>
  ```

- 参考：
  - [Shiki > 双主题](https://shiki.tmrs.site/guide/dual-themes)

### lineNumbers

- 类型：`boolean | number | 'disable'`
- 默认值：`true`
- 详情：控制行号的显示。

  - `number`：显示行号所需的最少行数。
    例如，设置为 4 时，只有代码块包含至少 4 行代码才会启用行号。
  - `true`：全局启用行号
  - `false`：全局禁用行号
  - `'disable'`：完全禁用行号，`:line-numbers` 标记不生效。

  你可以在代码块添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖配置项设置，还可以在 `:line-numbers` 之后添加 `=` 来自定义起始行号，例如 `:line-numbers=2` 表示代码块行号从 `2` 开始。

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
- 详情：是否启用行高亮。启用后，可在代码块信息描述中添加行数标记来高亮指定行：

  - 行数范围：`{5-8}`
  - 多个单行：`{4,7,9}`
  - 组合：`{4,7-13,16,23-27,40}`

**输入：**

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

  - `number`：从第 `number` 行开始折叠代码块，例如 `12` 表示从第 12 行开始折叠。
  - `true`：等同于 `15`，从第 15 行开始折叠。
  - `false`：添加代码块折叠支持，但全局禁用此功能
  - `'disable'`：完全禁用代码块折叠，`:collapsed-lines` 标记不生效。

  你可以在代码块添加 `:collapsed-lines` / `:no-collapsed-lines` 标记来覆盖配置项设置。还可以在 `:collapsed-lines` 之后添加 `=` 来自定义起始折叠行号，例如 `:collapsed-lines=12` 表示代码块从第 12 行开始折叠。

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

  根据注释中提供的字符串高亮显示词。

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

  根据代码片段中提供的元字符串高亮显示词

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
  - `false`：完全禁用空白符渲染，`:whitespace` 标记不生效
  - `'all'`：渲染所有空白符
  - `'boundary'`：仅渲染行首行尾的空白符
  - `'trailing'`：仅渲染行尾的空白符

  你可以在代码块中添加 `:whitespace / :no-whitespace` 标记来覆盖配置项设置。还可以在 `:whitespace` 之后添加 `=` 来定义渲染空白符的方式，例如 `:whitespace=boundary` 将渲染行首行尾的空白符。

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
  <!-- 禁用空白符 -->

  A text
  with line break

      code block
  ```

  :::

- 参考：
  - [Shiki > 空白符渲染](https://shiki.tmrs.site/packages/transformers#transformerrenderwhitespace)

### twoslash

- 类型： `boolean | ShikiTwoslashOptions`

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

- 默认值： `false`
- 详情：是否启用 [twoslash](https://github.com/twoslashes/twoslash)。

  ::: tip

  出于体积考虑，该插件默认不包含 `@vuepress/shiki-twoslash` 包。如需使用，需手动安装。

  :::

- 参考：

  - [Shiki > Twoslash](https://shiki.style/packages/twoslash)
  - [Twoslash > TransformerTwoslashOptions](https://github.com/shikijs/shiki/blob/main/packages/twoslash/src/types.ts#L30)
  - [Twoslash > VueSpecificOptions](https://github.com/twoslashes/twoslash/blob/main/packages/twoslash-vue/src/index.ts#L36)
  - [TwoslashTypesCache](https://github.com/vuepress/ecosystem/blob/main/tools/shiki-twoslash/src/node/options.ts#L47)

- 示例：

  ::: preview

  ```ts twoslash
  const a = 1
  const b = 23
  console.log(a + b)
  ```

  :::

  ::: warning

  对于启用了 `twoslash` 的代码块：

  - 不要在代码块中添加 `:v-pre` 标记，这会导致 `twoslash` 无法正常运行
  - 为避免布局冲突，代码块不再显示**行号**

  :::

## 高级选项

### defaultLang

- 类型：`string`
- 默认值：`'plain'`
- 详情：指定语言不可用时所使用的备选语言。

### logLevel

- 类型：`'warn' | 'debug' | 'silent'`
- 默认值：`'warn'`
- 详情：Shiki 语言检测的日志级别。

  - `warn`：每次检测到未知语言时发出警告（默认）
  - `debug`：每次检测到未知代码块时记录其文件路径（设置 `--debug` 标记时默认）
  - `silent`：不发出警告

### preWrapper

- 类型：`boolean`
- 默认值：`true`
- 详情：是否在 `<pre>` 标签外添加包裹容器。

  `lineNumbers` 和 `collapsedLines` 依赖于这个额外的包裹层。换句话说，如果你禁用了 `preWrapper`，那么行号和折叠代码块也会被同时禁用。

### shikiSetup

- 类型：`(shiki: Highlighter) => void | Promise<void>`
- 详情：用于自定义 Shiki 高亮器的钩子函数。

### transformers

- 类型：`ShikiTransformer[]`
- 详情：添加 Shiki 转换器。

  该配置项会被传递到 Shiki 的 `codeToHtml()` 方法。

- 参考：
  - [Shiki > 转换器](https://shiki.tmrs.site/guide/transformers)

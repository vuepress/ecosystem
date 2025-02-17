---
icon: presentation
---

# revealjs

<NpmBadge package="@vuepress/plugin-revealjs" />

在你的 VuePress 站点中添加幻灯片。

<!-- more -->

## 使用

```bash
npm i -D @vuepress/plugin-revealjs@next
```

```js {7} title=".vuepress/config.js"
import { revealJsPlugin } from '@vuepress/plugin-revealjs'

export default {
  plugins: [
    revealJsPlugin({
      // 插件选项
    }),
  ],
}
```

## 幻灯片语法

- 使用 `---` 分割幻灯片
- 使用 `--` 对幻灯片进行二次分割(垂直显示)

```md
@slidestart

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

::: details 示例

@slidestart

## 幻灯片标题

一个拥有文字和 [链接](https://mister-hope.com) 的段落

---

## 代码高亮

```js [2-4|1-5]
const add = (a, b) => {
  if (typeof b === 'undefined') return a + 1

  return a + b
}
```

@slideend

````md
@slidestart

## 幻灯片标题

一个拥有文字和 [链接](https://mister-hope.com) 的段落

---

## 代码高亮

```js [2-4|1-5]
const add = (a, b) => {
  if (typeof b === 'undefined') return a + 1

  return a + b
}
```

@slideend
````

:::

默认情况下，我们使用 `auto` 主题来渲染幻灯片，你也可以通过 `@slidestart 主题名称` 使用其他主题。

你可以通过插件选项中的 `themes` 启用以下主题:

- `auto` (默认)
- `black`
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`

各主题的外观，详见 [幻灯片主题](themes.md)

::: important 资源路径

由于 `@slidestart` 和 `@slideend` 之间的 Markdown 内容由 Reveal.js 在浏览器中处理，因此你只能在幻灯片中使用绝对路径的资源，这些资源必须可以直接在浏览器中访问，不支持相对路径或别名。

:::

## 幻灯片布局

默认情况下，插件会注册一个 `SlidePage` 布局来供你渲染“幻灯片页”。

在使用此布局的页面中，你应该只包含单个幻灯片语法，不包含其他内容，以避免渲染问题:

```md
---
layout: SlidePage
---

@slidestart

<!-- 此处是幻灯片内容 -->

@slideend
```

你可以通过插件选项中的 `layout` 来自定义此行为，比如使用 `false` 来禁用它或填入其他布局名称。

## 演示

请见 [幻灯片演示](demo.md)。

## 自定义 Reveal.js

### 内置插件

你可以通过插件选项中的 `plugins` 启用 reveal.js 中的内置插件。它接受以下插件名称的数组:

- `highlight`
- `math`
- `search`
- `notes`
- `zoom`

::: note

为了支持 Markdown 语法，我们总会启用 `markdown` 插件。

:::

### 高级配置

你也可以在[客户端配置文件][client-config]中导入并调用 `defineRevealJsConfig` 来自定义 reveal.js:

`defineRevealJsConfig` 函数接受一个 ref、getter 或普通对象作为 reveal.js 选项:

```ts title=".vuepress/client.ts"
import { defineRevealJsConfig } from '@vuepress/plugin-revealjs/client'

// 普通对象
const options1 = {
  // 选项
}

// 或 getter
const options2 = () => ({
  // 选项
})

// 或 ref
const options3 = ref({
  // 选项
})

defineRevealJsConfig(options1or2or3)
```

::: note

Reveal.js 还提供了[更多的插件](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware)，你可以通过 `plugin` 选项在 `defineRevealJsConfig` 中添加它们，这种自定义行为不会影响你声明的内置插件。

:::

### 页面级配置

你也可以在 Frontmatter 设置 `revealJs` 以设置特定页面的 reveal.js 选项。

Reveal.js 选项，请参见[reveal.js config](https://revealjs.com/config/)，Reveal.js 用法，请参阅 [reveal.js 文档](https://revealjs.com/)。

## 选项

### plugins

- 类型： `RevealJsPlugin[]`
- 详情：需要启用 Reveal.js 内置的插件

  可用值：`highlight`、`math`、`search`、`notes`、`zoom`

### themes

- 类型： `RevealJsTheme[]`
- 默认值：`['auto']`
- 详情：需要启用的 Reveal.js 主题

  可用值：`auto`、`black`、`white`、`league`、`beige`、`sky`、`night`、`serif`、`simple`、`solarized`、`blood`、`moon`

### layout

- 类型： `string | false`
- 默认值：`'SlidePage'`
- 详情：用于渲染幻灯片的布局组件名称

### delay

- 类型： `number`
- 默认值：`800`
- 详情：渲染幻灯片的延迟时间

## 样式

你可以通过 CSS 变量自定义样式：

@[code css](@vuepress/plugin-revealjs/src/client/styles/vars.css)

[client-config]: https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6

```

```

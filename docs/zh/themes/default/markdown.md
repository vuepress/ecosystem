---
icon: octicon:markdown-16
---

# Markdown {#markdown}

主题已经接入了它需要的 Markdown 插件，因此下面的语法开箱即用。每一节都会链接到负责该语法的插件及其完整配置项。

<NpmBadge package="@vuepress/theme-default" />

## 提示容器 {#hint-containers}

主题启用了 [`@vuepress/plugin-markdown-hint`](../../plugins/markdown/markdown-hint.md)，同时开启提示容器和 GFM 警告。

```md
::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a danger message, rendered with the caution style.
:::

::: details
A collapsible block.
:::
```

可用容器有 `tip`、`warning`、`danger`、`important`、`note`、`info`、`caution` 和 `details`。它们的默认标题来自[主题配置项](./locale.md#hint-containers) `tip`、`warning`、`danger`、`important` 和 `note`，其余则来自插件的语言配置。

容器名之后的文本会替换标题，`{no-title}` 会移除标题但保留图标：

```md
::: tip Custom Title
The title of this block is "Custom Title".
:::

::: warning {no-title}
This block has no title.
:::
```

`::: details` 始终需要一个摘要，因此其中的 `{no-title}` 会被忽略。

GFM 警告同样已启用，因此首行为 `> [!note]` 的引用块会渲染为提示容器：

```md
> [!TIP]
> A tip written as a GFM alert.
```

配置项（例如禁用警告）见 [Markdown Hint](../../plugins/markdown/markdown-hint.md)。

## 代码选项卡 {#code-tabs}

代码选项卡由 [`@vuepress/plugin-markdown-tab`](../../plugins/markdown/markdown-tab.md) 提供：

````md
::: code-tabs

@tab pnpm

```sh
pnpm add -D @vuepress/theme-default@next
```

@tab npm

```sh
npm i -D @vuepress/theme-default@next
```

:::
````

`@tab:active` 标记默认选中的选项卡，`@tab title#value` 会覆盖选项卡的值。`::: code-tabs` 之后的 `#id` 会把拥有相同 id 的分组关联起来，使它们一起切换并记住选择：

```md
::: code-tabs#package-manager
```

通用选项卡分组需要手动开启，因为主题默认只启用 `codeTabs`：

```ts
export default defineUserConfig({
  theme: defaultTheme({
    markdownPlugins: { tab: { tabs: true } },
  }),
})
```

```md
::: tabs

@tab Fruit

Apple

@tab Vegetable

Carrot

:::
```

选项卡的内容是 Vue 组件，因此可以使用任意客户端语法。

## v-pre {#v-pre}

主题启用了 [`@vuepress/plugin-markdown-ext`](../../plugins/markdown/markdown-ext.md) 的 `v-pre` 容器，它会直接渲染内容而不进行编译：

```md
::: v-pre
{{ This is not compiled as a Vue expression }}
:::
```

该插件的其他扩展 —— GFM 支持、脚注、任务列表和 `component` 围栏 —— 需要通过 `markdownPlugins.ext` 手动开启。例如：

```ts
defaultTheme({
  themePlugins: {
    ext: { gfm: true, footnote: true, tasklist: true },
  },
})
```

## raw {#raw}

主题启用了 [`@vuepress/plugin-markdown-raw`](../../plugins/markdown/markdown-raw.md) 的 `raw` 容器。它按原样渲染内容，而不会套用 markdown 的段落规则：

```md
::: raw
<div class="my-widget">...</div>
:::
```

内容会被包进一个 `div.vp-raw`，同时主题开启了插件的样式隔离，因此主题的样式不会泄漏进去。raw 容器内的链接会触发整页跳转而不是客户端路由，因为路由无法跟踪它们。

当某个区块必须由浏览器按原样渲染时（例如 iframe、script 或第三方组件），可以使用它。

## 标题锚点 {#heading-anchors}

每个标题都会获得一个 id 和一个锚点链接。VuePress 会把标题文本渲染在 `<a class="header-anchor">` 元素内部，因此主题让文本保持原位，锚点就是文本本身 —— 悬停标题时旁边没有 `#` 图标。滚动时 URL 哈希仍会更新，因为主题把 [`@vuepress/plugin-active-header-links`](../../plugins/development/active-header-links.md) 接到了大纲上。

要链接到某个小节，把它的 slug 作为哈希使用：`[Install](#install)`。该 slug 由 VuePress 生成，并且对相同的标题文本保持不变。

## 外链图标 {#external-link-icon}

把 [`externalLinkIcon`](./config.md#basic-config) 设为 `true`，即可在文档内容的外链之后显示图标：

```ts
defaultTheme({ externalLinkIcon: true })
```

该图标只会加在内容中的链接上 —— 不会加在导航栏、侧边栏或页脚的链接上。给链接加上 `no-icon` class 即可让它不显示图标：

```md
[Internal-like external link](https://example.com){.no-icon}
```

包含图片或内联 SVG 的链接会被跳过，因为图标会破坏它们的布局。

## 代码块 {#code-blocks}

主题启用了 [`@vuepress/plugin-shiki`](../../plugins/markdown/shiki.md)，并同时使用亮色和暗色主题，因此代码块会跟随站点的颜色模式。主题 CSS 会使用插件输出的 `--shiki-light` 和 `--shiki-dark` 变量。

默认启用的功能有：

- 行号，应用于每个代码块。用 `:no-line-numbers` 可以对单个代码块关闭，或用 `:line-numbers=10` 设置起始行号。
- 行高亮，在语言之后的信息字符串中写范围：`{5-8}`。
- 折叠行，使用 `:collapsed-lines` 或 `:collapsed-lines=10`。
- 标题栏，在信息字符串中写 `title="..."`：

````md
```ts title=".vuepress/config.ts"
import { defineUserConfig } from 'vuepress'
```
````

其他功能的写法（例如 diff 标记和 focus 标记）以及替换这两个主题的方法，见 [Shiki](../../plugins/markdown/shiki.md)。

## 复制代码 {#copy-code}

主题启用了 [`@vuepress/plugin-copy-code`](../../plugins/features/copy-code.md)，它会为内容中的每个代码块添加复制按钮。按钮及其提示文案会通过插件语言配置跟随站点语言。

## 参考 {#see-also}

- [提示容器](../../plugins/markdown/markdown-hint.md)
- [代码选项卡](../../plugins/markdown/markdown-tab.md)
- [Markdown Ext](../../plugins/markdown/markdown-ext.md)
- [Markdown Raw](../../plugins/markdown/markdown-raw.md)
- [Shiki](../../plugins/markdown/shiki.md)
- [复制代码](../../plugins/features/copy-code.md)

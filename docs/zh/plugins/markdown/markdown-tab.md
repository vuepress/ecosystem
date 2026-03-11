---
icon: columns-2
---

# markdown-tab

<NpmBadge package="@vuepress/plugin-markdown-tab" />

在 VuePress 站点中添加选项卡和代码选项卡。

该插件已经集成到默认主题中。

## 使用

```bash
npm i -D @vuepress/plugin-markdown-tab@next
```

```ts title=".vuepress/config.ts"
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'

export default {
  plugins: [
    markdownTabPlugin({
      // 启用代码选项卡
      codeTabs: true,
      // 启用选项卡
      tabs: true,
    }),
  ],
}
```

## 选项卡指南

你需要将选项卡包装在 `tabs` 容器中。

你可以在 `tabs` 容器中添加一个 id 后缀，该后缀将用作选项卡 id。所有具有相同 id 的选项卡将共享相同的切换事件。

```md
<!-- 👇 这里，fruit 将用作 id，它是可选的 -->

::: tabs#fruit

<!-- 选项卡内容 -->

:::
```

在这个容器内，你应该使用 `@tab` 标记来标记和分隔选项卡内容。

在 `@tab` 标记后，你可以添加文本 `:active` 默认激活选项卡，之后的文本将被解析为选项卡标题。

```md
::: tabs

@tab 标题 1

<!-- tab 1 内容 -->

@tab 标题 2

<!-- tab 2 内容 -->

<!-- 👇 tab 3 将会被默认激活 -->

@tab:active 标题 3

<!-- tab 3 内容 -->

:::
```

默认情况下，标题将用作选项卡的值，但你可以使用 id 后缀覆盖它。

```md
::: tabs

<!-- 👇 此处，选项卡 1 的标题“标题 1”将用作值。 -->

@tab 标题 1

<!-- tab 1 内容 -->

<!-- 👇 这里，tab 2 的标题将是 “标题 2”，并且它会使用 “值 2” 作为选项卡的值-->

@tab 标题 2#值 2

<!-- tab 2 内容 -->

:::
```

你可以在每个选项卡中使用 Vue 语法和组件，并且你可以访问 `value` 和 `isActive`，表示选项卡的绑定值和选项卡是否处于激活状态。

### 同步切换并保持选择

如果你想让一些选项卡组一起切换，你可以使用相同的选项卡 ID 来绑定它们。针对每个选项卡 ID 的选择会被存储并进行持久化。

:::: preview

选择包管理器:

::: tabs#shell

@tab npm

npm 应该与 Node.js 被一同安装。

@tab pnpm

```bash
corepack enable
corepack use pnpm@latest
```

:::

安装 `vuepress`:

::: tabs#shell

@tab 使用 npm#npm

```bash
npm i -D vuepress
```

@tab 使用 pnpm#pnpm

```bash
pnpm add -D vuepress
```

:::

::::

## 代码选项卡指南

此功能和 [选项卡](#选项卡指南) 相同，但它是专门为代码块构建的。

代码选项卡只会渲染 `@tab` 标记后的第一个代码块，其他 Markdown 内容将被忽略。

## 案例

:::: preview 选项卡

一个水果选项卡：

::: tabs#fruit

@tab apple#apple

Apple

@tab banana#banana

Banana

:::

另一个水果选项卡：

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

一个没有绑定 id 的水果选项卡列表:

::: tabs

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

::::

:::: preview 代码选项卡

安装 VuePress:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress
```

@tab yarn

```bash
yarn add -D vuepress
```

@tab:active npm

```bash
npm i -D vuepress
```

:::

安装 VuePress 选项卡插件:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @vuepress/plugin-markdown-tab
```

@tab yarn

```bash
yarn add -D @vuepress/plugin-markdown-tab
```

@tab:active npm

```bash
npm i -D @vuepress/plugin-markdown-tab
```

:::

::::

## 选项

### tabs

- 类型：`boolean`
- 详情：是否启用选项卡。

### codeTabs

- 类型：`boolean`
- 详情：是否启用代码选项卡。

## 样式

你可以通过 CSS 变量自定义样式:

@[code css](@vuepress/plugin-markdown-tab/src/client/styles/code-tabs-vars.scss)
@[code css](@vuepress/plugin-markdown-tab/src/client/styles/tabs-vars.scss)

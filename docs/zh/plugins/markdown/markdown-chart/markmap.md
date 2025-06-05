---
icon: fab fa-markdown
---

# Markmap

为你的 VuePress 站点中的 Markdown 文件添加 Markmap 支持。

<!-- more -->

## 安装

在你的项目中安装 `markmap-lib`、`markmap-toolbar` 和 `markmap-view`：

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D markmap-lib markmap-toolbar markmap-view
```

@tab yarn

```bash
yarn add -D markmap-lib markmap-toolbar markmap-view
```

@tab npm

```bash
npm i -D markmap-lib markmap-toolbar markmap-view
```

:::

然后通过以下方式启用：

```ts {7} title=".vuepress/config.ts"
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default {
  plugins: [
    markdownChartPlugin({
      // 启用 Markmap
      markmap: true,
    }),
  ],
}
```

<!-- #region after -->

## 语法

````md
```markmap
<!-- 在这里放置内容 -->
```
````

支持通过 Frontmatter 语法进行配置。

## 案例

::: preview

````markmap
---
title: markmap
markmap:
  colorFreezeLevel: 2
---

## 链接

- [官网](https://markmap.js.org/)
- [GitHub](https://github.com/gera2ld/markmap)

## 相关项目

- [coc-markmap](https://github.com/gera2ld/coc-markmap) for Neovim
- [markmap-vscode](https://marketplace.visualstudio.com/items?itemName=gera2ld.markmap-vscode) for VSCode
- [eaf-markmap](https://github.com/emacs-eaf/eaf-markmap) for Emacs

## 功能

注意：如果块元素和列表出现在同一级别，列表将被忽略。

### 列表

- **加粗** ~~删除线~~ _斜体_ ==高亮==
- `行内代码`
- [x] 复选框
- Katex: $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$ <!-- markmap: fold -->
  - [更多 Katex 示例](#?d=gist:af76a4c245b302206b16aec503dbe07b:katex.md)
- 现在我们可以通过 `maxWidth` 选项自动换行非常非常非常非常长的文本
- 有序列表
  1. 项目 1
  2. 项目 2

### 块元素

```js
console.log('你好，JavaScript')
```

| 产品 | 价格 |
| ---- | ---- |
| 苹果 | 4    |
| 香蕉 | 2    |

![](https://markmap.js.org/favicon.png)
````

:::

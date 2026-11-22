---
icon: paintbrush-vertical
---

# 样式 {#styles}

主题使用纯 CSS 编写样式 —— 不涉及 SASS 或 SCSS，定制时也不需要任何样式预处理器。颜色、尺寸和过渡都是 CSS 自定义属性，因此站点只需在一个文件里覆盖变量并添加规则，就能重新定制主题的外观。

<NpmBadge package="@vuepress/theme-default" />

客户端入口按以下顺序导入主题的样式：

1. Inter Web 字体和 `--vp-font-family-*` 变量。
2. `@vuepress/helper` 的共享颜色变量。
3. `vars.css` —— 主题的变量。
4. `base.css` —— 重置样式和共享规则。
5. 各组件的样式，例如文档内容使用的 `vp-doc.css`。

## 自定义样式 {#custom-styles}

主题把 `.vuepress/styles/index.css` 声明为自己的 [`userStyle`](https://vuepress.vuejs.org/reference/config.html#userstyle)。当该文件存在时，VuePress 会在主题样式之后导入它，因此自定义 CSS 就写在这里：

```css
/* .vuepress/styles/index.css */
:root {
  --vp-c-brand: #0f766e;
  --vp-c-brand-hover: #0d9488;
  --vp-c-brand-bg: #14b8a6;
  --vp-c-brand-soft: rgb(20 184 166 / 14%);
}

[data-theme='dark'] {
  --vp-c-brand: #5eead4;
  --vp-c-brand-hover: #2dd4bf;
  --vp-c-brand-bg: #14b8a6;
}

.vp-doc h2 {
  border-block-start-color: var(--vp-c-divider);
}
```

暗色模式由 `<html>` 上的 `data-theme` 属性选择，其值为 `'dark'` 或 `'light'`。这里没有 `dark` class，也没有可供定位的 `prefers-color-scheme` 媒体查询，因此暗色取值的选择器就是 `[data-theme='dark']`。

::: tip
主题不包含 SASS 调色板插件。每种颜色都是 CSS 变量，因此在 `.vuepress/styles/index.css` 中覆盖变量，就替代了经典主题 `palette` 配置项的作用。
:::

使用 [`pageClass`](./frontmatter.md) frontmatter 可以把规则限定到单个页面，因为该 class 会被加到页面的容器上：

```css
.my-page .vp-doc h1 {
  font-size: 3rem;
}
```

## CSS 变量 {#css-variables}

下面的变量定义在 `vars.css` 中。它们的名称是稳定的，主题在各处都使用它们，因此覆盖一个变量会改变它被用到的每一处。

### 品牌色 {#brand-colors}

主题使用靛蓝色板作为品牌色。`--vp-c-brand` 是主色，`--vp-c-brand-hover` 是悬停状态，`--vp-c-brand-bg` 是实心背景状态（例如填充按钮的背景），`--vp-c-brand-soft` 是用于背景的半透明版本。

::: fields
@`--vp-c-brand` type=color default=`#3451b2`

主要的品牌色，用于链接、当前大纲条目和代码链接。暗色取值：`#a8b1ff`。

@`--vp-c-brand-hover` type=color default=`#3a5ccc`

品牌色的悬停状态。暗色取值：`#5c73e7`。

@`--vp-c-brand-bg` type=color default=`#5672cd`

品牌色最深的背景状态，用于品牌按钮。暗色取值：`#3e63dd`。

@`--vp-c-brand-soft` type=color default=`rgb(100 108 255 / 14%)`

半透明的品牌色，用于高亮的代码行和柔和的背景。暗色取值：`rgb(100 108 255 / 16%)`。

:::

### 功能色 {#functional-colors}

提示容器、徽标和 diff 标记按功能而非按色板着色，因此可以在一处统一重新定制：

| 变量                 | 默认值   | 用于                     |
| -------------------- | -------- | ------------------------ |
| `--vp-c-default-*`   | 灰色板   | 中性表面                 |
| `--vp-c-tip-*`       | 品牌色板 | 提示和笔记               |
| `--vp-c-note-*`      | 品牌色板 | 笔记                     |
| `--vp-c-success-*`   | 绿色板   | diff 的新增内容          |
| `--vp-c-important-*` | 紫色板   | 重要容器                 |
| `--vp-c-warning-*`   | 黄色板   | 警告                     |
| `--vp-c-danger-*`    | 红色板   | 危险和 diff 的删除内容   |
| `--vp-c-caution-*`   | 红色板   | 注意，以及 `danger` 容器 |

每组都有 `<group>`、`<group>-hover`、`<group>-bg` 和 `<group>-soft` 变体，与品牌色完全一致：第一个是文字颜色，`-hover` 是悬停状态，`-bg` 是实心背景状态，`-soft` 是半透明背景。每一组都定义为某个色板的别名，因此覆盖该色板也会改变对应的组。

启用 [`gradedContainers`](./config.md#basic-config) 后，主题会把警告色重新映射到橙色板、把注意色重新映射到黄色板，从而形成绿 → 橙 → 黄 → 红的色阶。

### 色板 {#palette}

色板变量是功能色的来源。`-1` 是最深的变体，`-3` 最浅：

| 变量                | 亮色      | 暗色      |
| ------------------- | --------- | --------- |
| `--vp-c-gray`       | `#dddde3` | `#515c67` |
| `--vp-c-gray-light` | `#e4e4e9` | `#414853` |
| `--vp-c-gray-dark`  | `#ebebef` | `#32363f` |
| `--vp-c-indigo-1`   | `#3451b2` | `#a8b1ff` |
| `--vp-c-indigo-2`   | `#3a5ccc` | `#5c73e7` |
| `--vp-c-indigo-3`   | `#5672cd` | `#3e63dd` |
| `--vp-c-purple-1`   | `#6f42c1` | `#c8abfa` |
| `--vp-c-purple-2`   | `#7e4cc9` | `#a879e6` |
| `--vp-c-purple-3`   | `#8e5cd9` | `#8e5cd9` |
| `--vp-c-green-1`    | `#18794e` | `#3dd68c` |
| `--vp-c-green-2`    | `#299764` | `#30a46c` |
| `--vp-c-green-3`    | `#30a46c` | `#298459` |
| `--vp-c-yellow-1`   | `#915930` | `#f9b44e` |
| `--vp-c-yellow-2`   | `#946300` | `#da8b17` |
| `--vp-c-yellow-3`   | `#9f6a00` | `#a46a0a` |
| `--vp-c-orange-1`   | `#9a4224` | `#fb8c00` |
| `--vp-c-orange-2`   | `#b95a00` | `#e46a02` |
| `--vp-c-orange-3`   | `#c16200` | `#b45309` |
| `--vp-c-red-1`      | `#b8272c` | `#f66f81` |
| `--vp-c-red-2`      | `#d5393e` | `#f14158` |
| `--vp-c-red-3`      | `#e0575b` | `#b62a3c` |
| `--vp-c-sponsor`    | `#db2777` | `#db2777` |

每个色板还有一个半透明的 `-soft` 变体，用于背景。

纯色有 `--vp-c-white`（`#fff`）、`--vp-c-black`（`#000`）、`--vp-c-neutral`（亮色模式下为黑色，暗色模式下为白色）以及与之相反的 `--vp-c-neutral-inverse`。

### 文本 {#text}

| 变量                 | 亮色      | 暗色      | 说明             |
| -------------------- | --------- | --------- | ---------------- |
| `--vp-c-text`        | `#3c3c43` | `#dfdfd6` | 正文和标题       |
| `--vp-c-text-mute`   | `#67676c` | `#98989f` | 次要文本和代码块 |
| `--vp-c-text-subtle` | `#929295` | `#6a6a71` | 弱化文本和占位符 |

### 背景 {#background}

| 变量             | 亮色      | 暗色      | 说明                 |
| ---------------- | --------- | --------- | -------------------- |
| `--vp-c-bg`      | `#fff`    | `#1b1b1f` | 页面背景             |
| `--vp-c-bg-alt`  | `#f6f6f7` | `#161618` | 侧边栏和代码块的背景 |
| `--vp-c-bg-elv`  | `#fff`    | `#202127` | 浮层表面             |
| `--vp-c-bg-soft` | `#f6f6f7` | `#202127` | 柔和表面             |

### 边框 {#borders}

| 变量             | 亮色      | 暗色      | 说明             |
| ---------------- | --------- | --------- | ---------------- |
| `--vp-c-border`  | `#c2c2c4` | `#3c3f44` | 强对比度的边框   |
| `--vp-c-divider` | `#e2e2e3` | `#2e2e32` | 区块之间的分隔线 |
| `--vp-c-gutter`  | `#e2e2e3` | `#000`    | 沟槽线           |

### 字体 {#typography}

::: fields
@`--vp-font-family-base` type=string default=`'Inter', -apple-system, blinkmacsystemfont, sans-serif, …, 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji'`

文本的字体族。客户端入口会从 Google Fonts 加载 Inter 网络字体，并声明该字体的自托管子集。

@`--vp-font-family-mono` type=string default=`'ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', monospace`

代码的字体族。
:::

基础字号就是浏览器的基础字号，默认 `1rem = 16px`。除下面这些变量之外，主题不会用 `rem` 变量缩放页面。

### 布局 {#layout}

| 变量                        | 默认值   | 说明                 |
| --------------------------- | -------- | -------------------- |
| `--vp-layout-max-width`     | `90rem`  | 布局的最大宽度       |
| `--vp-nav-height`           | `4rem`   | 导航栏的高度         |
| `--vp-nav-logo-height`      | `1.5rem` | 导航栏中 logo 的高度 |
| `--vp-sidebar-width`        | `17rem`  | 侧边栏的宽度         |
| `--vp-header-anchor-symbol` | `'#'`    | 标题锚点的符号       |

布局各层的 z-index 通过 `--vp-z-index-footer`（`10`）、`--vp-z-index-local-nav`（`20`）、`--vp-z-index-nav`（`30`）、`--vp-z-index-layout-top`（`40`）、`--vp-z-index-backdrop`（`50`）和 `--vp-z-index-sidebar`（`60`，宽屏下为 `25`）暴露出来。

### 导航栏、侧边栏和遮罩 {#navbar-sidebar-and-backdrop}

| 变量                           | 默认值               | 说明               |
| ------------------------------ | -------------------- | ------------------ |
| `--vp-nav-bg-color`            | `var(--vp-c-bg)`     | 导航栏的背景       |
| `--vp-nav-home-bg-color`       | `transparent`        | 首页上导航栏的背景 |
| `--vp-nav-divider-color`       | `var(--vp-c-gutter)` | 导航栏下方的线     |
| `--vp-nav-screen-bg-color`     | `var(--vp-c-bg)`     | 移动端菜单的背景   |
| `--vp-nav-backdrop-filter`     | `none`               | 导航栏的遮罩滤镜   |
| `--vp-local-nav-bg-color`      | 导航栏的背景         | 本地导航的背景     |
| `--vp-local-nav-divider-color` | 导航栏的分隔色       | 本地导航下方的线   |
| `--vp-sidebar-bg-color`        | `var(--vp-c-bg-alt)` | 侧边栏的背景       |
| `--vp-backdrop-bg-color`       | `rgb(0 0 0 / 60%)`   | 移动端菜单的遮罩   |

`<html>` 上的 `.hide-nav` class 会把 `--vp-nav-height` 设为 `0`。当当前页面的 `navbar` frontmatter 为 `false` 时主题会应用它，它还会缩小侧边栏为导航栏预留的偏移。

### 按钮和徽标 {#buttons-and-badges}

三种按钮主题各自拥有变量，命名为 `--vp-button-{brand,alt,sponsor}-{border,text,bg,hover-border,hover-text,hover-bg,active-border,active-text,active-bg}`。徽标类型则有 `--vp-badge-{type}-{border,text,bg}`，用于 `info`、`note`、`tip`、`important`、`caution`、`warning` 和 `danger`。

### 代码块 {#code-blocks}

代码块变量由主题 CSS 和 `@vuepress/plugin-shiki` 共同使用：

| 变量                               | 默认值                     | 说明                     |
| ---------------------------------- | -------------------------- | ------------------------ |
| `--vp-code-line-height`            | `1.7`                      | 代码的行高               |
| `--vp-code-font-size`              | `0.875em`                  | 代码的字号               |
| `--vp-code-color`                  | `var(--vp-c-brand)`        | 行内代码的颜色           |
| `--vp-code-bg`                     | `var(--vp-c-default-soft)` | 行内代码的背景           |
| `--vp-code-block-color`            | `var(--vp-c-text-mute)`    | 代码块的文字颜色         |
| `--vp-code-block-bg`               | `var(--vp-c-bg-alt)`       | 代码块的背景             |
| `--vp-code-block-divider-color`    | `var(--vp-c-gutter)`       | 代码块的分隔线           |
| `--vp-code-lang-color`             | `var(--vp-c-text-mute)`    | 语言标签的颜色           |
| `--vp-code-line-highlight-color`   | `var(--vp-c-default-soft)` | 高亮行的背景             |
| `--vp-code-line-number-color`      | `var(--vp-c-text-mute)`    | 行号的颜色               |
| `--vp-code-line-diff-add-color`    | `var(--vp-c-success-soft)` | diff 新增内容的背景      |
| `--vp-code-line-diff-remove-color` | `var(--vp-c-danger-soft)`  | diff 删除内容的背景      |
| `--vp-code-line-warning-color`     | `var(--vp-c-warning-soft)` | 警告行的背景             |
| `--vp-code-line-error-color`       | `var(--vp-c-danger-soft)`  | 错误行的背景             |
| `--vp-code-copy-code-bg`           | `var(--vp-c-bg-soft)`      | 复制按钮的背景           |
| `--vp-code-copy-code-hover-bg`     | `var(--vp-c-bg)`           | 复制按钮悬停时的背景     |
| `--vp-code-copy-code-active-text`  | `var(--vp-c-text-mute)`    | 复制按钮的文字颜色       |
| `--vp-code-tab-text-color`         | `var(--vp-c-text-mute)`    | 代码选项卡的文字颜色     |
| `--vp-code-tab-active-text-color`  | `var(--vp-c-text)`         | 当前代码选项卡的文字颜色 |
| `--vp-code-tab-active-bar-color`   | `var(--vp-c-brand)`        | 当前代码选项卡的指示条   |

Shiki 的亮色和暗色主题会作为每个 token 的 `--shiki-light` 和 `--shiki-dark` 内联变量输出，因此覆盖代码块变量不会替换语法高亮的颜色。要更换这两个主题，见 [Shiki](../../plugins/markdown/shiki.md)。

### 提示容器 {#hint-containers}

提示容器的样式由 `@vuepress/plugin-markdown-hint` 提供，它把自己的 `--{type}-c-*` 变量映射到主题颜色：

| 变量                   | 默认值                  | 说明               |
| ---------------------- | ----------------------- | ------------------ |
| `--tip-c-accent`       | `var(--vp-c-green-bg)`  | 提示的强调色       |
| `--note-c-accent`      | `var(--vp-c-grey-bg)`   | 笔记的强调色       |
| `--info-c-accent`      | `var(--vp-c-blue-bg)`   | 信息的强调色       |
| `--important-c-accent` | `var(--vp-c-purple-bg)` | 重要区块的强调色   |
| `--warning-c-accent`   | `var(--vp-c-yellow-bg)` | 警告的强调色       |
| `--caution-c-accent`   | `var(--vp-c-red-bg)`    | 注意的强调色       |
| `--detail-c-bg`        | `var(--vp-c-control)`   | details 区块的背景 |
| `--hint-font-size`     | `0.875rem`              | 容器文本的字号     |

每种容器类型还都有 `-c-text` 和 `-c-soft` 变体。

### 首页 hero {#home-hero}

| 变量                                    | 默认值                                              | 说明            |
| --------------------------------------- | --------------------------------------------------- | --------------- |
| `--vp-home-hero-name-color`             | `transparent`                                       | hero 名称的颜色 |
| `--vp-home-hero-name-background`        | `linear-gradient(120deg, #3eaf7c 30%, #1b1b1f)`     | hero 名称的背景 |
| `--vp-home-hero-image-background-image` | `linear-gradient(-45deg, #3eaf7c 50%, #232327 50%)` | hero 图片的背景 |
| `--vp-home-hero-image-filter`           | `blur(44px)`                                        | hero 图片的滤镜 |

名称使用了裁剪到文字上的渐变，因此它的颜色是透明的。可以用另一个渐变覆盖 `--vp-home-hero-name-background`，或者把名称颜色设为纯色并清除背景。

### 过渡与插件兼容 {#transitions-and-plugin-compatibility}

::: fields
@`--vp-t-color` type=string default=`0.3s ease`

颜色和背景的过渡，由主题的各表面应用。经典主题使用过相同的名称。

@`--vp-t-transform` type=string default=`0.3s ease`

变换的过渡，例如移动端菜单。

@`--vp-c-accent` type=color default=`var(--vp-c-brand)`

旧的通用强调色。它与 `--vp-c-accent-hover`、`--vp-c-accent-bg`、`--vp-c-accent-text` 和 `--vp-c-accent-soft` 一起保留，供生态中按经典主题编写样式的插件使用。文字颜色本身就是正式名称（`--vp-c-text`、`--vp-c-text-mute`、`--vp-c-text-subtle`），不需要别名。

@`--vp-c-control` type=color default=`var(--vp-c-bg-soft)`

表单控件的背景，与 `--vp-c-control-hover` 和 `--vp-c-control-disabled` 一起为插件样式保留。
:::

色板还暴露了旧名称 `--vp-c-grey-{text,soft}`、`--vp-c-green-text`、`--vp-c-indigo-text`、`--vp-c-purple-text`、`--vp-c-red-text`、`--vp-c-yellow-text`、`--vp-c-blue-{text,bg,soft}` 和 `--vp-c-shadow`。它们是上面这些变量的别名，因此按经典主题编写样式的插件仍能正常工作，而覆盖其中某个旧名称的站点应当改为覆盖它所别名到的变量。

## RTL {#rtl}

布局把方向保存在变量里：`--vp-direction-multiplier` 在 LTR 下为 `1`，在 RTL 下为 `-1`；`--vp-direction-mark` 则是 LTR 或 RTL 标记。主题通过 `[dir='rtl']` 切换它们，同一个选择器也驱动布局的逻辑属性。要让站点以 RTL 渲染，请使用 `@vuepress/plugin-rtl`。

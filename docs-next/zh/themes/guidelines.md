---
icon: signpost
---

# 主题指南

为了避免主题开发者和用户设置不必要的选项，我们制定了一套主题创建时应遵循的指南。

## DOM 结构

一个主题必须实现以下 DOM 结构：

- 容器：一个包含整个主题的元素。此元素应该有一个 `vp-container` 属性。
- 内容：一个包含 markdown 渲染结果的元素。此元素应该有一个 `vp-content` 属性。

一个主题可以有以下可选元素：

- 导航栏：站点的导航栏。此元素应该有一个 `vp-navbar` 属性。
- 侧边栏：站点的侧边栏。此元素应该有一个 `vp-sidebar` 属性。
- 大纲：主要内容的标题或大纲。此元素应该有一个 `vp-outline` 属性。
- 评论：评论服务（评论框和评论列表）。此元素应该有一个 `vp-comment` 属性。
- 页脚：站点的页脚。此元素应该有一个 `vp-footer` 属性。

一个主题必须：

- 在暗色模式下，将 html 元素的 `data-theme` 设置为 `dark`。
- 在亮色模式下，将 html 元素的 `data-theme` 设置为 `light`。

如果主题只有一种颜色方案，主题仍然需要将 `data-theme` 设置为 `light` 或 `dark`，以指示默认颜色方案。

## 组件

为了支持搜索插件，主题应检查 `<SearchBox />` 是否已全局注册，并在其自己的导航栏或侧边栏中呈现（如果可用）。

## 颜色变量

一个主题必须实现以下颜色变量：

### 文字

- `--vp-c-text`：默认文本颜色。
- `--vp-c-text-mute`：用于静音文本的颜色，例如“非活动菜单”或“信息文本”。
- `--vp-c-text-subtle`：用于细微文本的颜色，例如“占位符”或“插入符号”。

### 背景

- `--vp-c-bg`：用于主屏幕的背景颜色。
- `--vp-c-bg-alt`：用于“侧边栏”或“代码块”等地方的备用背景颜色。
- `--vp-c-bg-elv`：用于“浮动”部分的提升背景颜色，例如“对话框”。

### 阴影

- `--vp-c-shadow`：阴影颜色

### 强调

用于交互组件的强调颜色和品牌颜色。

- `--vp-c-accent`：主要用于彩色文本的最实色。它必须满足与放在 `--vp-c-accent-soft` 顶部时的对比度。
- `--vp-c-accent-hover`：用于悬停状态的颜色。
- `--vp-c-accent-bg`：用于实色背景的颜色。它必须满足与放在其顶部的 `--vp-c-accent-text` 的对比度。
- `--vp-c-accent-text`：用于 `--vp-c-accent-bg` 背景的文本颜色。它必须满足与 `--vp-c-accent-bg` 的对比度。
- `--vp-c-accent-soft`：用于自定义容器或徽章等细微背景的颜色。当将 `--vp-c-accent` 颜色放在其顶部时，它必须满足对比度。

  软色必须是半透明的 alpha 通道。这是至关重要的，因为它允许将多个“软”颜色叠加在一起以创建强调，例如在自定义容器内部有内联代码块时。

### 边框

- `--vp-c-border`：交互组件的边框颜色。例如，这应该用于按钮轮廓。
- `--vp-c-border-hard`：较暗的边框颜色，用于紧贴文本的“硬”边框，例如表格和 kbd。
- `--vp-c-divider`：分隔符的颜色，用于在同一组件内分隔部分，例如在“h2”标题上放置分隔符。

### 控件

- `--vp-c-control`：用于交互控件（例如按钮或复选框）的背景颜色。
- `--vp-c-control-hover`：用于交互控件悬停状态的背景颜色。
- `--vp-c-control-disabled`：用于交互控件禁用状态的颜色。

## 过渡时间

- `--vp-t-color`：颜色过渡时间。
- `--vp-t-transform`：变换过渡时间。

## 案例

<PaletteDisplay />

<script setup>
import PaletteDisplay from '@source/.vuepress/components/PaletteDisplay.vue'
</script>

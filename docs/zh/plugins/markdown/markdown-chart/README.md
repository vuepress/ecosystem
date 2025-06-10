---
icon: chart-no-axes-combined
---

# markdown-chart

<NpmBadge package="@vuepress/plugin-markdown-chart" />

为你的 VuePress 站点添加强大的图表功能。

此插件提供了 6 种不同的图表库，帮助你在 Markdown 文件中插入图表：

- **Chart.js**：一个轻量级、易于使用、高度可定制的图表库。

  与 ECharts 相比，Chart.js 更轻量。

- **ECharts**：一个强大的、交互式的浏览器图表和可视化库。

  与 Chart.js 相比，ECharts 更强大。

- **Flowchart**：一个简单的 Markdown 扩展，用于生成流程图和序列图。

  轻量级，只专注于流程图。

- **Markmap**：从 Markdown 创建思维导图。

  运行时较重，不建议在生产环境中使用。

- **Mermaid**：以类似 Markdown 的方式从文本生成图表和流程图。

  常用图表的强大集合。

- **PlantUML**：由 Java 驱动的 UML 图表。

  无客户端运行时，极其轻量。

<!-- more -->

## 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @vuepress/plugin-markdown-chart@next
```

@tab yarn

```bash
yarn add -D @vuepress/plugin-markdown-chart@next
```

@tab npm

```bash
npm i -D @vuepress/plugin-markdown-chart@next
```

:::

## 使用

```ts
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default {
  plugins: [
    markdownChartPlugin({
      // 启用 Chart.js
      chartjs: true,
      // 启用 ECharts
      echarts: true,
      // 启用 Flowchart.js
      flowchart: true,
      // 启用 Markmap
      markmap: true,
      // 启用 Mermaid
      mermaid: true,
      // 启用 PlantUML
      plantuml: true,
    }),
  ],
}
```

## 可用图表

- [Chart.js](./chartjs.md)
- [ECharts](./echarts.md)
- [Flowchart](./flowchart.md)
- [Markmap](./markmap.md)
- [Mermaid](./mermaid.md)
- [PlantUML](./plantuml.md)

## 选项

### chartjs

- 类型：`boolean`
- 详情：是否启用 Chart.js 支持。

### echarts

- 类型：`boolean`
- 详情：是否启用 ECharts 支持。

### flowchart

- 类型：`boolean`
- 详情：是否启用 Flowchart 支持。

### markmap

- 类型：`boolean`
- 详情：是否启用 Markmap 支持。

### mermaid

- 类型：`boolean`
- 详情：是否启用 Mermaid 支持。

### plantuml

- 类型：`boolean | MarkdownItPlantumlOptions[]`
- 详情：是否启用 PlantUML 支持。可以接受配置选项以供高级使用。

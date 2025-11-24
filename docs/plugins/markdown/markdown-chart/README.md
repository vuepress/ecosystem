---
icon: chart-no-axes-combined
---

# markdown-chart

<NpmBadge package="@vuepress/plugin-markdown-chart" />

Add powerful charts to your VuePress site.

This plugin provides 6 different chart libraries to help you insert charts into your Markdown files:

- **Chart.js**: A lightweight, easy-to-use, highly customizable chart library.

  Chart.js is lighter compared to ECharts.

- **ECharts**: A powerful, interactive charting and visualization library for browsers.

  ECharts is more powerful compared to Chart.js.

- **Flowchart**: A simple Markdown extension to generate flowcharts and sequence diagrams.

  Lightweight, focusing only on flowcharts.

- **Markmap**: Create mind maps from Markdown.

  The runtime is heavy, not recommended for production.

- **Mermaid**: Generate diagrams and flowcharts from text in a similar manner as Markdown.

  Powerful collection of common charts.

- **PlantUML**: UML diagrams powered by Java.

  No client-side runtime, extremely lightweight.

<!-- more -->

## Installation

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

## Usage

```ts
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default {
  plugins: [
    markdownChartPlugin({
      // Enable Chart.js
      chartjs: true,
      // Enable ECharts
      echarts: true,
      // Enable Flowchart.js
      flowchart: true,
      // Enable Markmap
      markmap: true,
      // Enable Mermaid
      mermaid: true,
      // Enable PlantUML
      plantuml: true,
    }),
  ],
}
```

## Available Charts

- [Chart.js](./chartjs.md)
- [ECharts](./echarts.md)
- [Flowchart](./flowchart.md)
- [Markmap](./markmap.md)
- [Mermaid](./mermaid.md)
- [PlantUML](./plantuml.md)

## Options

### chartjs

- Type: `boolean`
- Details: Whether to enable Chart.js support.

### echarts

- Type: `boolean`
- Details: Whether to enable ECharts support.

### flowchart

- Type: `boolean`
- Details: Whether to enable Flowchart support.

### markmap

- Type: `boolean`
- Details: Whether to enable Markmap support.

### mermaid

- Type: `boolean`
- Details: Whether to enable Mermaid support.

### plantuml

- Type: `boolean | MarkdownItPlantumlOptions[]`
- Details: Whether to enable PlantUML support. Can accept configuration options for advanced usage.

### DANGEROUS_ALLOW_SCRIPT_EXECUTION

- Type: `boolean`
- Details: Whether to allow script execution in charts.

### DANGEROUS_SCRIPT_EXECUTION_ALLOWLIST

- Type: `string[] | '*'`
- Default: `[]`
- Details: Only effective when `DANGEROUS_ALLOW_SCRIPT_EXECUTION` is enabled. A list of file paths allowed to execute chart scripts. Use `'*'` to allow all files.

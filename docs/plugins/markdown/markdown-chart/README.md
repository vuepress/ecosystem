# markdown-chart

<NpmBadge package="@vuepress/plugin-markdown-chart" />

Add powerful charts to your VuePress site.

This plugin provides 6 ways to let you insert charts into your markdown file.

- chart.js: A lightweight, easy-to-use, highly customizable chart library.

  chart.js is lighter comparing to echarts.

- echarts: A powerful, interactive charting and visualization library for browser.

  echarts is more powerful comparing to chart.js.

- Flowchart: A simple markdown extension to generate flowcharts and sequence diagrams.

  Lightweight, only focusing on flowcharts.

- Markmap: Create mindmap with markdown

  The runtime is very heavy, not recommended.

- Mermaid: Generation of diagram and flowchart from text in a similar manner as markdown.

  Powerful collection of common charts.

- Plantuml: UML diagram driven by Java.

  No runtime, diagram render is processed on plantuml server.

## Usage

```bash
npm i -D @vuepress/plugin-markdown-chart@next
```

```ts
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'

export default {
  plugins: [
    markdownChartPlugin({
      // Enable chart.js
      chartjs: true,
      // Enable echarts
      echarts: true,
      // Enable flowchart.ts
      flowchart: true,
      // Enable markmap
      markmap: true,
      // Enable mermaid
      mermaid: true,
    }),
  ],
}
```

import type { App } from 'vuepress/core'

import { CLIENT_FOLDER } from './utils.js'

export const prepareConfigFile = async (
  app: App,
  status: Record<string, boolean>,
): Promise<string> => {
  const imports = new Set<string>()
  const enhances = new Set<string>()

  if (status.chartjs) {
    imports.add(`import ChartJS from "${CLIENT_FOLDER}components/ChartJS.js";`)
    enhances.add(`app.component("ChartJS", ChartJS)`)
  }

  if (status.echarts) {
    imports.add(`import ECharts from "${CLIENT_FOLDER}components/ECharts.js";`)
    enhances.add(`app.component("ECharts", ECharts);`)
  }

  if (status.flowchart) {
    imports.add(
      `import FlowChart from "${CLIENT_FOLDER}components/FlowChart.js";`,
    )

    enhances.add(`app.component("FlowChart", FlowChart);`)
  }

  if (status.markmap) {
    imports.add(`import MarkMap from "${CLIENT_FOLDER}components/MarkMap.js";`)
    enhances.add(`app.component("MarkMap", MarkMap);`)
  }

  if (status.mermaid) {
    imports.add(`import Mermaid from "${CLIENT_FOLDER}components/Mermaid.js";`)
    enhances.add(`app.component("Mermaid", Mermaid);`)
  }

  return app.writeTemp(
    `markdown-chart/config.js`,
    `\
import { defineClientConfig } from "vuepress/client";
${[...imports.values()].join('\n')}

export default defineClientConfig({
  enhance: ({ app }) => {
${Array.from(enhances.values(), (item) =>
  item.split('\n').map((line) => `    ${line}`),
)
  .flat()
  .join('\n')}
  },
});
`,
  )
}

import { getModulePath } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import { CLIENT_FOLDER } from './utils.js'

export const prepareConfigFile = async (
  app: App,
  status: Record<string, boolean>,
  markmapMathInstalled = false,
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
    if (markmapMathInstalled) {
      // The math packages stay optional, so the plugins are only imported and
      // provided when they are installed.
      //
      // 数学公式包是可选的，因此只有在它们已安装时才会导入并注入插件。
      imports.add(
        `import MarkMap, { markmapMathKey } from "${CLIENT_FOLDER}components/MarkMap.js";`,
      )
      imports.add(
        `import { mathContent, remarkMath } from ${JSON.stringify(getModulePath('@markmap/plugin-math', import.meta))};`,
      )
      imports.add(
        `import { defaultContentPlugins } from ${JSON.stringify(getModulePath('@markmap/render', import.meta))};`,
      )
      enhances.add(
        `app.provide(markmapMathKey, {
  contentPlugins: [...defaultContentPlugins, mathContent],
  parsePlugins: [remarkMath],
});`,
      )
    } else {
      imports.add(
        `import MarkMap from "${CLIENT_FOLDER}components/MarkMap.js";`,
      )
    }

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

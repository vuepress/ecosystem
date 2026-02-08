import { LoadingIcon, decodeData, useDarkMode } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type { Chart, ChartConfiguration } from 'chart.js'
import type { PropType, VNode } from 'vue'
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  useId,
} from 'vue'

import '../styles/chartjs.css'

const parseChartConfig = (
  config: string,
  type: 'js' | 'json',
): ChartConfiguration => {
  if (type === 'json') return JSON.parse(config) as ChartConfiguration

  // oxlint-disable-next-line no-new-func, typescript/no-implied-eval
  const runner = new Function(
    `\
let config,__chart_js_config__;
{
${config}
__chart_js_config__=config;
}
return __chart_js_config__;\
`,
  ) as () => ChartConfiguration

  return runner()
}

export default defineComponent({
  name: 'ChartJS',

  props: {
    /**
     * Chart config
     *
     * 图表配置
     */
    config: {
      type: String,
      required: true,
    },

    /**
     * Chart title
     *
     * 图表标题
     */
    title: String,

    /**
     * Chart config type
     *
     * 图表配置类型
     */
    type: {
      type: String as PropType<'js' | 'json'>,
      default: 'json',
    },
  },

  setup(props) {
    const isDarkMode = useDarkMode()
    const chartElement = shallowRef<HTMLElement>()
    const id = useId()
    const loaded = ref(false)

    let chartjs: Chart | null

    const destroyChart = (): void => {
      chartjs?.destroy()
      chartjs = null
    }

    const renderChart = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return

      const { default: ChartJs } = await import(
        /* webpackChunkName: "chart" */ 'chart.js/auto'
      )

      ChartJs.defaults.borderColor = isDarkMode.value ? '#ccc' : '#36A2EB'
      ChartJs.defaults.color = isDarkMode.value ? '#fff' : '#000'
      ChartJs.defaults.maintainAspectRatio = false

      const chartConfig = decodeData(props.config)
      const data = parseChartConfig(chartConfig, props.type)

      chartjs = new ChartJs(id, data)
    }

    onMounted(() => {
      watchImmediate(
        __VUEPRESS_DEV__
          ? // config must be changed if type is changed, so no need to watch type
            [(): string => props.config, isDarkMode]
          : isDarkMode,
        async () => {
          destroyChart()
          await nextTick()
          await renderChart()
          loaded.value = true
        },
        { flush: 'post' },
      )
    })

    onUnmounted(destroyChart)

    return (): (VNode | null)[] => [
      props.title
        ? h('div', { class: 'chartjs-title' }, decodeURIComponent(props.title))
        : null,
      loaded.value
        ? null
        : h(LoadingIcon, { class: 'chartjs-loading', height: 192 }),
      h(
        'div',
        {
          ref: chartElement,
          class: 'chartjs-wrapper',
          style: {
            display: loaded.value ? 'block' : 'none',
          },
        },
        h('canvas', {
          id,
          height: 400,
        }),
      ),
    ]
  },
})

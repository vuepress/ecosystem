import { LoadingIcon, decodeData } from '@vuepress/helper/client'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import type { EChartsOption, EChartsType } from 'echarts'
import type * as ECharts from 'echarts'
import type { PropType, VNode } from 'vue'
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { onContentUpdated } from 'vuepress/client'

import { useEChartsConfig } from '../helpers/index.js'
import '../styles/echarts.css'

interface EChartsConfig {
  width?: number
  height?: number
  option: EChartsOption
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const AsyncFunction = (async (): Promise<void> => {}).constructor

const parseEChartsConfig = (
  config: string,
  type: 'js' | 'json',
  echarts: typeof ECharts,
  instance: EChartsType,
): Promise<EChartsConfig> => {
  if (type === 'js') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const runner = AsyncFunction(
      'echarts',
      'myChart',
      `\
let width,height,option,__echarts_config__;
{
${config}
__echarts_config__={width,height,option};
}
return __echarts_config__;
`,
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return runner(echarts, instance) as Promise<EChartsConfig>
  }

  return Promise.resolve({ option: JSON.parse(config) as EChartsOption })
}

export default defineComponent({
  name: 'ECharts',

  props: {
    /**
     * ECharts config
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
    const echartsConfig = useEChartsConfig()
    const echartsContainer = shallowRef<HTMLElement>()

    const loaded = ref(false)

    let instance: EChartsType | null = null

    useEventListener(
      'resize',
      useDebounceFn(() => {
        instance?.resize()
      }, 100),
    )

    const destroyECharts = (): void => {
      instance?.dispose()
      instance = null
    }

    const renderECharts = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return

      const echarts = await import(/* webpackChunkName: "echarts" */ 'echarts')

      await echartsConfig.setup?.()

      instance = echarts.init(echartsContainer.value)

      const { option, ...size } = await parseEChartsConfig(
        decodeData(props.config),
        props.type,
        echarts,
        instance,
      )

      instance.resize(size)
      instance.setOption({ ...echartsConfig.option, ...option })
    }

    onContentUpdated(async (reason) => {
      if (reason === 'mounted') {
        await renderECharts()
        loaded.value = true
      }
    })

    onMounted(() => {
      if (!__VUEPRESS_DEV__) return

      // config must be changed if type is changed, so no need to watch it
      watch(
        () => props.config,
        async () => {
          destroyECharts()
          await nextTick()
          await renderECharts()
        },
        { flush: 'post' },
      )
    })

    onUnmounted(destroyECharts)

    return (): (VNode | null)[] => [
      props.title
        ? h('div', { class: 'echarts-title' }, decodeURIComponent(props.title))
        : null,
      h('div', { class: 'echarts-wrapper' }, [
        h('div', {
          ref: echartsContainer,
          class: 'echarts-container',
        }),
        loaded.value
          ? null
          : h(LoadingIcon, { class: 'echarts-loading', height: 360 }),
      ]),
    ]
  },
})

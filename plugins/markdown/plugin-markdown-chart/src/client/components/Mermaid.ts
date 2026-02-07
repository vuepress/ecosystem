import {
  LoadingIcon,
  decodeData,
  encodeSVG,
  isFunction,
  useDarkMode,
} from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type { VNode } from 'vue'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  ref,
  shallowRef,
  useId,
} from 'vue'

import { useMermaidOptions } from '../helpers/index.js'
import { DOWNLOAD_ICON, PREVIEW_ICON } from '../utils/index.js'

import '../styles/mermaid.css'

const DEFAULT_CHART_OPTIONS = { useMaxWidth: false }

export default defineComponent({
  name: 'Mermaid',

  props: {
    /**
     * Mermaid config
     *
     * Mermaid 配置
     */
    code: {
      type: String,
      required: true,
    },

    /**
     * Mermaid title
     *
     * Mermaid 标题
     */
    title: String,
  },

  setup(props) {
    const id = useId()
    const isDarkMode = useDarkMode()
    const { themeVariables, ...mermaidOptions } = useMermaidOptions()
    const mermaidElement = shallowRef<HTMLElement>()

    const code = computed(() => decodeData(props.code))

    const svgCode = ref('')

    const renderMermaid = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return

      const { default: mermaid } = await import(
        /* webpackChunkName: "mermaid" */ 'mermaid/dist/mermaid.esm.min.mjs'
      )

      mermaid.initialize({
        theme: isDarkMode.value ? 'dark' : 'default',
        themeVariables: {
          dark: isDarkMode.value,
          ...(isFunction(themeVariables)
            ? themeVariables(isDarkMode.value)
            : themeVariables),
        },
        flowchart: DEFAULT_CHART_OPTIONS,
        sequence: DEFAULT_CHART_OPTIONS,
        journey: DEFAULT_CHART_OPTIONS,
        gantt: DEFAULT_CHART_OPTIONS,
        er: DEFAULT_CHART_OPTIONS,
        pie: DEFAULT_CHART_OPTIONS,
        ...mermaidOptions,
        startOnLoad: false,
      })

      svgCode.value = (await mermaid.render(id, code.value)).svg
    }

    const preview = (): void => {
      const { body } = document
      const div = document.createElement('div')

      div.classList.add('mermaid-preview')

      div.innerHTML = svgCode.value
      body.append(div)

      div.addEventListener('click', () => {
        div.remove()
      })
    }

    const download = (): void => {
      const dataURI = encodeSVG(svgCode.value)

      const a = document.createElement('a')

      a.setAttribute('href', dataURI)
      a.setAttribute(
        'download',
        `${props.title ? decodeData(props.title) : id}.svg`,
      )
      a.click()
    }

    onMounted(() => {
      watchImmediate(isDarkMode, renderMermaid, {
        flush: 'post',
      })
    })

    return (): VNode[] => [
      h('div', { class: 'mermaid-actions' }, [
        h('button', {
          class: 'preview-button',
          title: 'preview',
          innerHTML: PREVIEW_ICON,
          onClick: preview,
        }),
        h('button', {
          class: 'download-button',
          title: 'download',
          innerHTML: DOWNLOAD_ICON,
          onClick: download,
        }),
      ]),
      h(
        'div',
        {
          ref: mermaidElement,
          class: 'mermaid-wrapper',
        },
        svgCode.value
          ? // Mermaid
            h('div', { class: 'mermaid-content', innerHTML: svgCode.value })
          : // Loading
            h(LoadingIcon, { class: 'mermaid-loading', height: 96 }),
      ),
    ]
  },
})

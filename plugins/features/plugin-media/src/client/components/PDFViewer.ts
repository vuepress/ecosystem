import type { PDFViewerConfig, PluginRegistry } from '@embedpdf/vue-pdf-viewer'
import { LoadingIcon } from '@vuepress/helper/client'
import type { Component, PropType, VNode } from 'vue'
import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from 'vue'
import { usePageLang } from 'vuepress/client'

import type { PDFLocaleData, PDFOptions } from '../../shared/index.js'
import { getPDFLocale } from '../../shared/index.js'
import { useSize } from '../composables/index.js'
import { getLink } from '../utils/getLink.js'

import '../styles/pdf-viewer.scss'

declare const PDF_OPTIONS: PDFOptions
declare const PDF_LOCALES: PDFLocaleData[]

/**
 * Drop fields with `undefined` value
 *
 * 移除值为 `undefined` 的字段
 *
 * EmbedPDF does not validate its config, but fields with `undefined` value may
 * override the built-in defaults with `undefined` and break the viewer.
 *
 * EmbedPDF 不会校验配置，值为 `undefined` 的字段可能把内置默认值覆盖为 `undefined` 并破坏查看器。
 *
 * @param value - Object to prune / 待处理的配置
 * @returns Object without `undefined` fields / 不包含 `undefined` 字段的配置
 */
const pruneUndefined = <T extends object>(value: T): T =>
  Object.fromEntries(
    Object.entries(value).filter(([, item]) => item !== undefined),
  ) as T

/**
 * EmbedPDF viewer
 *
 * EmbedPDF PDF 查看器
 */
export const PDFViewer = defineComponent({
  name: 'PDFViewer',

  inheritAttrs: false,

  props: {
    /**
     * PDF Source URL
     *
     * PDF 源文件地址
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Component width
     *
     * 组件宽度
     */
    width: {
      type: [String, Number],
      default: '100%',
    },

    /**
     * Component height
     *
     * 组件高度
     */
    height: [String, Number],

    /**
     * Component width / height ratio
     *
     * 组件长宽比
     */
    ratio: {
      type: [String, Number],
      default: 16 / 9,
    },

    /**
     * EmbedPDF config
     *
     * EmbedPDF 配置
     */
    config: Object as PropType<Omit<PDFOptions, 'src'>>,

    /**
     * Customize the EmbedPDF viewer when it is ready
     *
     * EmbedPDF 查看器就绪后进行自定义
     */
    customViewer: Function as PropType<(registry: PluginRegistry) => void>,
  },

  setup(props, { attrs }) {
    const lang = usePageLang()
    const { el, width, height, resize } = useSize<HTMLDivElement>(props, 0)

    const loaded = ref(false)
    const viewerComponent = shallowRef<Component | null>(null)
    const viewerConfig = shallowRef<PDFViewerConfig | null>(null)

    let destroyed = false

    const getConfig = (): PDFViewerConfig => {
      const { i18n: optionsI18n, ...options } = PDF_OPTIONS
      const { i18n: configI18n, ...config } = props.config ?? {}

      return {
        ...pruneUndefined(options),
        ...pruneUndefined(config),
        i18n: pruneUndefined({
          ...optionsI18n,
          defaultLocale: getPDFLocale(lang.value),
          // EmbedPDF replaces its built-in locales with the given ones
          ...(PDF_LOCALES.length > 0 ? { locales: PDF_LOCALES } : {}),
          ...configI18n,
        }),
        src: getLink(props.src),
      }
    }

    onMounted(async () => {
      // EmbedPDF relies on Canvas, WASM and web worker, which are client only
      const { PDFViewer: EmbedPDFViewer } = await import(
        /* webpackChunkName: "embedpdf" */ '@embedpdf/vue-pdf-viewer'
      )

      if (destroyed) return

      viewerConfig.value = getConfig()
      viewerComponent.value = EmbedPDFViewer
      loaded.value = true
      resize()
    })

    onUnmounted(() => {
      destroyed = true
    })

    return (): (VNode | null)[] => {
      const viewer = viewerComponent.value

      return [
        h(
          'div',
          { ...attrs, ref: el, class: ['vp-pdf-viewer', attrs.class] },
          viewer
            ? [
                h(viewer, {
                  config: viewerConfig.value ?? {},
                  style: {
                    width: width.value,
                    height: height.value,
                  },
                  onReady: (registry: PluginRegistry) =>
                    props.customViewer?.(registry),
                }),
              ]
            : [],
        ),
        loaded.value ? null : h(LoadingIcon),
      ]
    }
  },
})

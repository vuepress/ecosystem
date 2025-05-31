import type { RequiredSlot } from '@vuepress/helper/client'
import { useLocale } from '@vuepress/helper/client'
import {
  useEventListener,
  useMounted,
  useResizeObserver,
  useToggle,
} from '@vueuse/core'
import type { PropType, SlotsType, VNode } from 'vue'
import { defineComponent, h, ref, shallowRef } from 'vue'
import type { MarkdownPreviewPluginLocaleConfig } from '../../shared/index.js'

import '../styles/vp-preview.css'

let previewIdCounter = 0

export interface VPPreviewProps {
  /**
   * Markdown preview title
   *
   * Markdown preview 标题
   */
  title?: string

  /**
   * Markdown preview locales
   *
   * Markdown preview 本地化配置
   */
  locales?: MarkdownPreviewPluginLocaleConfig
}

export default defineComponent({
  name: 'VPPreview',

  props: {
    /**
     * Markdown preview title
     *
     * Markdown preview 标题
     */
    title: String,

    /**
     * Markdown preview locales
     *
     * Markdown preview 本地化配置
     */
    locales: {
      type: Object as PropType<MarkdownPreviewPluginLocaleConfig>,
      default: () => ({}),
    },
  },

  slots: Object as SlotsType<{
    content: RequiredSlot
    code: RequiredSlot
  }>,

  setup(props, { slots }) {
    const locale = useLocale(props.locales)
    const isMounted = useMounted()
    const [isExpanded, toggleIsExpand] = useToggle(false)
    const codeContainer = shallowRef<HTMLDivElement>()
    const height = ref('0')

    // Generate unique ID for accessibility
    const uniqueId = `vp-preview-${++previewIdCounter}`

    let previousState: boolean | null = null

    useEventListener('beforeprint', () => {
      toggleIsExpand(true)
    })

    useEventListener('afterprint', () => {
      if (previousState !== null) {
        toggleIsExpand(previousState)
      }

      previousState = null
    })

    useResizeObserver(codeContainer, () => {
      if (isExpanded.value) {
        height.value = `${codeContainer.value!.clientHeight + 14}px`
      }
    })

    return (): VNode =>
      h('div', { class: 'vp-preview' }, [
        props.title
          ? h(
              'div',
              { class: 'vp-preview-header' },
              decodeURIComponent(props.title),
            )
          : null,

        h('div', { class: 'vp-preview-display' }, slots.content()),

        h(
          'div',
          {
            'id': isMounted.value ? uniqueId : null,
            'class': 'vp-preview-code-wrapper',
            'style': { height: height.value },
            'data-allow-mismatch': 'attribute',
          },
          h(
            'div',
            {
              ref: codeContainer,
              class: 'vp-preview-code',
            },
            slots.code(),
          ),
        ),

        h(
          'div',
          {
            'title': 'toggle',
            'class': 'vp-preview-toggle-button',
            'aria-expanded': isExpanded.value,
            'aria-controls': isMounted.value ? uniqueId : null,
            'onClick': () => {
              height.value = isExpanded.value
                ? '0'
                : `${codeContainer.value!.clientHeight + 14}px`
              toggleIsExpand()
            },
          },
          locale.value[isExpanded.value ? 'hide' : 'show'],
        ),
      ])
  },
})

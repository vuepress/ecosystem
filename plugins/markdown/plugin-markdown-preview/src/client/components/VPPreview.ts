import type { RequiredSlot } from '@vuepress/helper/client'
import { useLocale } from '@vuepress/helper/client'
import { useEventListener, useResizeObserver, useToggle } from '@vueuse/core'
import type { PropType, SlotsType, VNode } from 'vue'
import { defineComponent, h, ref, shallowRef, useId } from 'vue'
import type { MarkdownPreviewPluginLocaleConfig } from '../../shared/index.js'

import '../styles/vp-preview.css'

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
    // Generate unique ID for accessibility
    const codeID = `vp-preview-${useId()}`

    const locale = useLocale(props.locales)
    const [isExpanded, toggleExpanded] = useToggle(false)
    const codeContainer = shallowRef<HTMLDivElement>()
    const height = ref('0')

    const toggleCode = (): void => {
      toggleExpanded()
      height.value = isExpanded.value
        ? `${codeContainer.value!.clientHeight}px`
        : '0'
    }

    let isBeforePrintOpen: boolean = false

    useEventListener('beforeprint', () => {
      isBeforePrintOpen = isExpanded.value

      toggleExpanded(true)
    })

    useEventListener('afterprint', () => {
      if (isBeforePrintOpen) return

      toggleExpanded()
    })

    useResizeObserver(codeContainer, () => {
      if (isExpanded.value) {
        height.value = `${codeContainer.value!.clientHeight}px`
      }
    })

    return (): VNode =>
      h(
        'div',
        { class: { 'vp-preview': true, 'is-expanded': isExpanded.value } },
        [
          h('div', { class: 'vp-preview-showcase' }, slots.content()),

          h('div', { class: 'vp-preview-control' }, [
            props.title
              ? h(
                  'div',
                  { class: 'vp-preview-title' },
                  decodeURIComponent(props.title),
                )
              : null,
            h(
              'button',
              {
                'type': 'button',
                'class': 'vp-preview-toggle-button',
                'title': locale.value.toggle,
                'aria-label': locale.value.toggle,
                'aria-controls': codeID,
                'aria-expanded': isExpanded.value,
                'onClick': () => {
                  toggleCode()
                },
              },
              h('div', { class: 'vp-preview-toggle-icon' }),
            ),
          ]),
          h(
            'div',
            {
              'id': codeID,
              'class': 'vp-preview-code-wrapper',
              'style': { height: height.value },
              'data-allow-mismatch': 'attribute',
            },
            h(
              'div',
              { class: 'vp-preview-code', ref: codeContainer },
              slots.code(),
            ),
          ),
        ],
      )
  },
})

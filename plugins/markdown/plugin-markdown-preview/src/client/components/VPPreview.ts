import type { RequiredSlot } from '@vuepress/helper/client'
import { useLocale } from '@vuepress/helper/client'
import {
  useEventListener,
  useMounted,
  useResizeObserver,
  useToggle,
} from '@vueuse/core'
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
    const locale = useLocale(props.locales)
    const isMounted = useMounted()
    const [isExpanded, toggleIsExpand] = useToggle(false)
    const codeContainer = shallowRef<HTMLDivElement>()
    const height = ref('0')

    // Generate unique ID for accessibility
    const uniqueId = `vp-preview-${useId()}`

    let previousState: boolean | null = null

    const toggle = (current?: boolean): void => {
      isExpanded.value = current ?? !isExpanded.value

      if (isExpanded.value) {
        height.value = `${codeContainer.value!.clientHeight}px`
      } else {
        height.value = '0'
      }
    }

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
            h('span', {
              'class': 'vp-preview-toggle-button',
              'title': locale.value[isExpanded.value ? 'hide' : 'show'],
              'aria-expanded': isExpanded.value,
              'aria-controls': isMounted.value ? uniqueId : null,
              'onClick': () => {
                toggle()
              },
            }),
          ]),
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
              { class: 'vp-preview-code', ref: codeContainer },
              slots.code(),
            ),
          ),
        ],
      )
  },
})

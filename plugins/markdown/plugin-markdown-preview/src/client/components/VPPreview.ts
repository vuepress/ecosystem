import type { RequiredSlot } from '@vuepress/helper/client'
import { useEventListener, useResizeObserver, useToggle } from '@vueuse/core'
import type { SlotsType, VNode } from 'vue'
import { defineComponent, h, ref, shallowRef } from 'vue'

import '../styles/vp-preview.css'

let previewIdCounter = 0

export default defineComponent({
  name: 'VPPreview',

  props: {
    /**
     * Markdown preview title
     *
     * Markdown preview 标题
     */
    title: String,
  },

  slots: Object as SlotsType<{
    content: RequiredSlot
    code: RequiredSlot
  }>,

  setup(props, { slots }) {
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
            'title': 'toggle',
            'class': 'vp-preview-toggle-button',
            'aria-expanded': isExpanded.value,
            'aria-controls': uniqueId,
            'data-allow-mismatch': 'attribute',
            'onClick': () => {
              height.value = isExpanded.value
                ? '0'
                : `${codeContainer.value!.clientHeight + 14}px`
              toggleIsExpand()
            },
          },
          '☰',
        ),

        h(
          'div',
          {
            'id': uniqueId,
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
      ])
  },
})

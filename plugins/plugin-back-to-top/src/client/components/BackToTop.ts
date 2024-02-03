import { useLocaleConfig } from '@vuepress/helper/client'
import { useElementSize, useWindowScroll, useWindowSize } from '@vueuse/core'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  shallowRef,
  Transition,
} from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
import type { BackToTopPluginLocaleConfig } from '../../shared/index.js'

import '../styles/back-to-top.css'

declare const __BACK_TO_TOP_LOCALES__: BackToTopPluginLocaleConfig
declare const __BACK_TO_TOP_PROGRESS__: boolean
declare const __BACK_TO_TOP_THRESHOLD__: number

export const BackToTop = defineComponent({
  name: 'BackToTop',

  setup(props) {
    const pageFrontmatter = usePageFrontmatter<{ backToTop?: boolean }>()
    const locale = useLocaleConfig(__BACK_TO_TOP_LOCALES__)
    const body = shallowRef<HTMLElement>()
    const { height: bodyHeight } = useElementSize(body)
    const { height: windowHeight } = useWindowSize()

    /** Scroll distance */
    const { y } = useWindowScroll()

    /** Whether to display button */
    const show = computed(
      () =>
        pageFrontmatter.value.backToTop !== false &&
        y.value > __BACK_TO_TOP_THRESHOLD__,
    )

    const progress = computed(
      () => (y.value / (bodyHeight.value - windowHeight.value)) * 100,
    )

    onMounted(() => {
      body.value = document.body
    })

    return () =>
      h(Transition, { name: 'back-to-top' }, () =>
        show.value
          ? h(
              'button',
              {
                'type': 'button',
                'class': 'vp-back-to-top-button',
                'aria-label': locale.value.backToTop,
                'onClick': () => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                },
              },
              [
                __BACK_TO_TOP_PROGRESS__
                  ? h(
                      'span',
                      {
                        'class': 'vp-scroll-progress',
                        'role': 'progressbar',
                        'aria-labelledby': 'loadinglabel',
                        'aria-valuenow': progress.value,
                      },
                      h(
                        'svg',
                        h('circle', {
                          cx: '50%',
                          cy: '50%',
                          style: {
                            'stroke-dasharray': `calc(${
                              Math.PI * progress.value
                            }% - ${4 * Math.PI}px) calc(${Math.PI * 100}% - ${
                              4 * Math.PI
                            }px)`,
                          },
                        }),
                      ),
                    )
                  : null,
                h('div', { class: 'back-to-top-icon' }),
              ],
            )
          : null,
      )
  },
})

import type { VNode } from 'vue'
import { TransitionGroup, defineComponent, h, ref, watch } from 'vue'
import { useRedirect, propsOptions } from '../composables/index.js'

import '@vuepress/helper/transition/fade-in-scale-up.css'
import '../styles/redirect-popup.scss'

const AUTO_CLOSE_DELAY = 5000
const RADIUS = 12
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default defineComponent({
  name: 'RedirectPopup',

  props: propsOptions,

  setup(props) {
    const {
      shouldRemember,
      showComponent,
      locale,
      persistUserAction,
      redirect,
    } = useRedirect(props)

    const autoCloseProgress = ref(0)

    // oxlint-disable-next-line unicorn/no-useless-undefined
    let autoCloseTimer: ReturnType<typeof setTimeout> | undefined = undefined
    // oxlint-disable-next-line unicorn/no-useless-undefined
    let progressInterval: ReturnType<typeof setInterval> | undefined = undefined

    const clearTimers = (): void => {
      clearTimeout(autoCloseTimer)
      clearInterval(progressInterval)
    }

    const startAutoClose = (): void => {
      autoCloseProgress.value = 0
      const startTime = Date.now()

      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        autoCloseProgress.value = Math.min(elapsed / AUTO_CLOSE_DELAY, 1)
      }, 50)

      autoCloseTimer = setTimeout(() => {
        clearTimers()
        autoCloseProgress.value = 1
        showComponent.value = false
      }, AUTO_CLOSE_DELAY)
    }

    watch(showComponent, (value) => {
      if (value) startAutoClose()
      else clearTimers()
    })

    return (): VNode | null =>
      h(TransitionGroup, { name: 'fade-in-scale-up' }, () =>
        showComponent.value
          ? h('div', { key: 'popup', class: 'redirect-popup' }, [
              h(
                'button',
                {
                  'type': 'button',
                  'class': 'redirect-close-button',
                  'aria-label': locale.value?.cancel,
                  'title': locale.value?.cancel,
                  'onClick': () => {
                    clearTimers()
                    persistUserAction()
                  },
                },
                h(
                  'svg',
                  {
                    class: 'redirect-close-icon',
                    viewBox: '0 0 24 24',
                    xmlns: 'http://www.w3.org/2000/svg',
                  },
                  [
                    h('circle', {
                      'class': 'redirect-progress-ring',
                      'cx': '12',
                      'cy': '12',
                      'r': RADIUS.toString(),
                      'fill': 'none',
                      'stroke-dasharray': CIRCUMFERENCE.toString(),
                      'stroke-dashoffset': (
                        CIRCUMFERENCE * autoCloseProgress.value
                      ).toString(),
                    }),
                    h('path', {
                      'd': 'M8 8l8 8M16 8l-8 8',
                      'stroke': 'currentColor',
                      'fill': 'none',
                      'stroke-linecap': 'round',
                      'stroke-linejoin': 'round',
                      'stroke-width': '1.5',
                    }),
                  ],
                ),
              ),
              h(
                'button',
                {
                  type: 'button',
                  class: 'redirect-popup-redirect-button',
                  onClick: () => {
                    redirect()
                  },
                },
                locale.value?.switch,
              ),
              h('div', { class: 'redirect-popup-hint' }, [
                h('input', {
                  id: 'remember-redirect',
                  type: 'checkbox',
                  checked: shouldRemember.value,
                  onChange: () => {
                    shouldRemember.value = !shouldRemember.value
                  },
                }),
                h(
                  'label',
                  { for: 'remember-redirect' },
                  locale.value?.remember,
                ),
              ]),
            ])
          : null,
      )
  },
})

import type { VNode } from 'vue'
import { TransitionGroup, computed, defineComponent, h } from 'vue'
import { useRedirect, propsOptions } from '../composables/index.js'

import '@vuepress/helper/transition/fade-in-scale-up.css'
import '../styles/redirect-popup.scss'

// Close button circle: radius fits within a 24x24 viewBox with stroke-width 2
const RADIUS = 10
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default defineComponent({
  name: 'RedirectPopup',

  props: propsOptions,

  setup(props) {
    const {
      shouldRemember,
      showComponent,
      locale,
      autoCloseProgress,
      persistUserAction,
      redirect,
    } = useRedirect(props)

    const closeButtonSvg = computed(() => {
      const offset = CIRCUMFERENCE * autoCloseProgress.value
      return (
        `<svg class="redirect-close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">` +
        `<circle class="redirect-progress-track" cx="12" cy="12" r="${RADIUS}" fill="none"/>` +
        `<circle class="redirect-progress-ring" cx="12" cy="12" r="${RADIUS}" fill="none"` +
        ` stroke-dasharray="${CIRCUMFERENCE}" stroke-dashoffset="${offset}"/>` +
        `<path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" fill="none"` +
        ` stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>` +
        `</svg>`
      )
    })

    return (): VNode | null =>
      h(TransitionGroup, { name: 'fade-in-scale-up' }, () =>
        showComponent.value
          ? h('div', { key: 'popup', class: 'redirect-popup' }, [
              h('button', {
                type: 'button',
                class: 'redirect-close-button',
                onClick: () => {
                  persistUserAction()
                },
                innerHTML: closeButtonSvg.value,
              }),
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
                  value: shouldRemember.value,
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

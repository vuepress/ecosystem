import type { VNode } from 'vue'
import { TransitionGroup, defineComponent, h } from 'vue'
import { useRedirect, propsOptions } from '../composables/index.js'

import '@vuepress/helper/transition/fade-in-scale-up.css'
import '../styles/redirect-popup.scss'

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
                innerHTML:
                  '<svg width="10" height="10" viewBox="0 0 20 20"><path d="M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
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

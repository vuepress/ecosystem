import { useScrollLock, watchImmediate } from '@vueuse/core'
import type { VNode } from 'vue'
import { TransitionGroup, defineComponent, h, onMounted, ref } from 'vue'

import { useRedirect, propsOptions } from '../composables/index.js'

import '@vuepress/helper/transition/fade-in-scale-up.css'
import '../styles/redirect-modal.scss'

export default defineComponent({
  name: 'RedirectModal',

  props: propsOptions,

  setup(props) {
    const {
      shouldRemember,
      showComponent,
      locale,
      persistUserAction,
      redirect,
    } = useRedirect(props)

    const body = ref<HTMLElement>()
    // lock body scroll when modal is displayed
    const bodyLock = useScrollLock(body)

    onMounted(() => {
      body.value = document.body

      // lock scroll while the modal is displayed
      watchImmediate(showComponent, (value) => {
        bodyLock.value = value
      })
    })

    return (): VNode | null =>
      h(TransitionGroup, { name: 'fade-in-scale-up' }, () =>
        showComponent.value
          ? h(
              'div',
              { key: 'mask', class: 'redirect-modal-mask' },
              h(
                'div',
                {
                  key: 'popup',
                  class: 'redirect-modal-wrapper',
                },
                [
                  h(
                    'div',
                    { class: 'redirect-modal-content' },
                    locale.value?.hint.map((text) => h('p', text)),
                  ),
                  h('div', { class: 'redirect-modal-hint' }, [
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
                  h('div', { class: 'redirect-modal-actions' }, [
                    h(
                      'button',
                      {
                        type: 'button',
                        class: 'redirect-modal-action primary',
                        onClick: () => {
                          redirect()
                        },
                      },
                      locale.value?.switch,
                    ),
                    h(
                      'button',
                      {
                        type: 'button',
                        class: 'redirect-modal-action',
                        onClick: () => {
                          persistUserAction()
                        },
                      },
                      locale.value?.cancel,
                    ),
                  ]),
                ],
              ),
            )
          : null,
      )
  },
})

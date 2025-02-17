import { useScrollLock } from '@vueuse/core'
import type { PropType, VNode } from 'vue'
import {
  TransitionGroup,
  computed,
  defineComponent,
  h,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import { useRouteLocale, useRoutePath, useRouter } from 'vuepress/client'
import type { RedirectBehaviorConfig } from '../../shared/index.js'
import { useRedirectInfo } from '../composables/index.js'
import type { RedirectPluginLocaleConfig } from '../types.js'
import { statusLocalStorage, statusSessionStorage } from '../utils/index.js'

import '../styles/redirect-modal.css'

export default defineComponent({
  name: 'RedirectModal',

  props: {
    config: {
      type: Object as PropType<RedirectBehaviorConfig>,
      required: true,
    },

    locales: {
      type: Object as PropType<RedirectPluginLocaleConfig>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter()
    const routePath = useRoutePath()
    const routeLocale = useRouteLocale()
    const redirectInfo = useRedirectInfo(props.config)

    const body = ref<HTMLElement>()
    // lock body scroll when modal is displayed
    const showModal = useScrollLock(body)
    const shouldRemember = ref(false)

    const locale = computed(() => {
      if (!redirectInfo.value) return null

      const { lang, localePath } = redirectInfo.value
      const locales = [
        props.locales[localePath],
        props.locales[routeLocale.value],
      ]

      return {
        hint: locales.map(({ hint }) => hint.replace('$1', lang)),
        switch: locales
          .map(({ switch: switchText }) => switchText.replace('$1', lang))
          .join(' / '),
        cancel: locales.map(({ cancel }) => cancel).join(' / '),
        remember: locales.map(({ remember }) => remember).join(' / '),
      }
    })

    const updateState = (): void => {
      statusSessionStorage.value[routeLocale.value] = true
      if (shouldRemember.value) {
        statusLocalStorage.value[routeLocale.value] = true
      }
      showModal.value = false
    }

    watch(routePath, () => {
      showModal.value = false
    })

    onMounted(async () => {
      body.value = document.body

      await nextTick()

      if (
        redirectInfo.value &&
        !statusSessionStorage.value[routeLocale.value] &&
        !statusLocalStorage.value[routeLocale.value]
      ) {
        showModal.value = true
      }
    })

    onBeforeUnmount(() => {
      showModal.value = false
    })

    return (): VNode | null =>
      h(TransitionGroup, { name: 'redirect-modal-fade' }, () =>
        showModal.value
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
                  h(
                    'button',
                    {
                      type: 'button',
                      class: 'redirect-modal-action primary',
                      onClick: () => {
                        updateState()
                        router.replace(
                          routePath.value.replace(
                            routeLocale.value,
                            redirectInfo.value!.localePath,
                          ),
                        )
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
                        updateState()
                      },
                    },
                    locale.value?.cancel,
                  ),
                ],
              ),
            )
          : null,
      )
  },
})

import { useLocaleConfig } from '@vuepress/helper/client'
import type { PropType, SlotsType, VNode } from 'vue'
import { defineComponent, h, onMounted, ref, Transition } from 'vue'
import type { PWAPluginLocaleConfig } from '../../shared/index.js'
import { usePWAEvent } from '../composables/index.js'
import { UpdateIcon } from './icons.js'

import '../styles/popup.scss'

export const SWHintPopup = defineComponent({
  name: 'SWHintPopup',

  props: {
    /** locale data */
    locales: {
      type: Object as PropType<PWAPluginLocaleConfig>,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default?: (props: {
      enabled: boolean
      uninstall: () => void
    }) => VNode[] | VNode | null
  }>,

  setup(props, { slots }) {
    const locale = useLocaleConfig(props.locales)
    const enabled = ref(false)

    const uninstall = (): void => {
      if (enabled.value) {
        // force refresh
        // @ts-expect-error: A non-standard API
        window.location.reload(true)
        enabled.value = false
      }
    }

    onMounted(() => {
      const event = usePWAEvent()

      event.on('updatefound', () => {
        navigator.serviceWorker.getRegistration().then((registration) => {
          // Check whether a valid service worker is active
          if (registration && registration.active) enabled.value = true
        })
      })

      event.on('updated', () => {
        enabled.value = false
      })
    })

    return (): VNode =>
      h(
        Transition,
        { name: 'popup' },
        () =>
          slots.default?.({
            enabled: enabled.value,
            uninstall,
          }) ||
          (enabled.value
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'sw-hint-popup',
                  tabindex: 0,
                  onClick: () => uninstall(),
                },
                [
                  locale.value.hint,
                  h('span', { class: 'icon-wrapper' }, h(UpdateIcon)),
                ],
              )
            : null),
      )
  },
})

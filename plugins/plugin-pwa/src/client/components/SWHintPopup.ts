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
      found: boolean
      refresh: () => void
    }) => VNode[] | VNode | null
  }>,

  setup(props, { slots }) {
    const locale = useLocaleConfig(props.locales)
    const found = ref(false)

    const refresh = (): void => {
      if (found.value) {
        // force refresh
        // @ts-expect-error: A non-standard API
        window.location.reload(true)
        found.value = false
      }
    }

    onMounted(() => {
      const event = usePWAEvent()

      event.on('updatefound', () => {
        navigator.serviceWorker.getRegistration().then((registration) => {
          // Check whether a valid service worker is active
          if (registration && registration.active) found.value = true
        })
      })

      event.on('updated', () => {
        found.value = false
      })
    })

    return (): VNode =>
      h(
        Transition,
        { name: 'popup' },
        () =>
          slots.default?.({
            found: found.value,
            refresh,
          }) ||
          (found.value
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'sw-hint-popup',
                  tabindex: 0,
                  onClick: () => refresh(),
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

import { useLocaleConfig } from '@vuepress/helper/client'
import type { PropType, SlotsType, VNode } from 'vue'
import { Transition, defineComponent, h, onMounted, ref } from 'vue'
import { usePwaEvent } from '../composables/index.js'
import type { PwaPluginLocaleConfig } from '../types.js'
import { UpdateIcon } from './icons.js'

import '../styles/popup.css'

export const PwaFoundPopup = defineComponent({
  name: 'PwaFoundPopup',

  props: {
    /** locale data */
    locales: {
      type: Object as PropType<PwaPluginLocaleConfig>,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default?: (props: {
      found: boolean
      refresh: () => void
    }) => VNode | VNode[] | null
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
      const event = usePwaEvent()

      event.on('updatefound', () => {
        void navigator.serviceWorker.getRegistration().then((registration) => {
          // Check whether a valid service worker is active
          if (registration?.active) found.value = true
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
          }) ??
          (found.value
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'sw-hint-popup',
                  tabindex: 0,
                  onClick: () => {
                    refresh()
                  },
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

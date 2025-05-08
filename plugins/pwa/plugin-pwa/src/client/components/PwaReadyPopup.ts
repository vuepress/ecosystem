import type { Slot } from '@vuepress/helper/client'
import { useLocale } from '@vuepress/helper/client'
import type { PropType, SlotsType, VNode } from 'vue'
import {
  Transition,
  computed,
  defineComponent,
  h,
  onMounted,
  shallowRef,
} from 'vue'
import { usePwaEvent } from '../composables/index.js'
import type { PwaPluginLocaleConfig } from '../types.js'
import { skipWaiting } from '../utils/index.js'
import { UpdateIcon } from './icons.js'

import '@vuepress/helper/transition/fade-in-scale-up.css'
import '../styles/popup.css'

export const PwaReadyPopup = defineComponent({
  name: 'PwaReadyPopup',

  props: {
    /** locale data */
    locales: {
      type: Object as PropType<PwaPluginLocaleConfig>,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default?: Slot<{ isReady: boolean; reload: () => void }>
  }>,

  setup(props, { slots }) {
    const locale = useLocale(props.locales)
    const registration = shallowRef<ServiceWorkerRegistration>()

    const isReady = computed(() => Boolean(registration.value))

    const reload = (): void => {
      if (registration.value) {
        skipWaiting(registration.value)
        registration.value = undefined
      }
    }

    onMounted(() => {
      const event = usePwaEvent()

      event.on('updated', (reg) => {
        registration.value = reg
      })
    })

    return (): VNode =>
      h(
        Transition,
        { name: 'fade-in-scale-up' },
        () =>
          slots.default?.({
            isReady: isReady.value,
            reload,
          }) ??
          (isReady.value
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'sw-update-popup',
                  tabindex: 0,
                  onClick: () => {
                    reload()
                  },
                },
                [
                  locale.value.update,
                  h('span', { class: 'icon-wrapper' }, h(UpdateIcon)),
                ],
              )
            : null),
      )
  },
})

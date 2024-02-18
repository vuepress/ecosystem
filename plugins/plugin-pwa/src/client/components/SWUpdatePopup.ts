import { useLocaleConfig } from '@vuepress/helper/client'
import type { PropType, SlotsType, VNode } from 'vue'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  shallowRef,
  Transition,
} from 'vue'
import type { PWAPluginLocaleConfig } from '../../shared/index.js'
import { usePWAEvent } from '../composables/index.js'
import { skipWaiting } from '../utils/index.js'
import { UpdateIcon } from './icons.js'

import '../styles/popup.scss'

export const SWUpdatePopup = defineComponent({
  name: 'SWUpdatePopup',

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
      reload: () => void
    }) => VNode[] | VNode | null
  }>,

  setup(props, { slots }) {
    const locale = useLocaleConfig(props.locales)
    const registration = shallowRef<ServiceWorkerRegistration>()

    const enabled = computed(() => Boolean(registration.value))

    const reload = (): void => {
      if (registration.value) {
        skipWaiting(registration.value)
        registration.value = undefined
      }
    }

    onMounted(() => {
      const event = usePWAEvent()

      event.on('updated', (reg) => {
        if (reg) registration.value = reg
      })
    })

    return (): VNode =>
      h(
        Transition,
        { name: 'popup' },
        () =>
          slots.default?.({
            enabled: enabled.value,
            reload,
          }) ||
          (enabled.value
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'sw-update-popup',
                  tabindex: 0,
                  onClick: () => reload(),
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

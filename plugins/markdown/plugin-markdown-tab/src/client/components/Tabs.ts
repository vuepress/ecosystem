import type { RequiredSlot } from '@vuepress/helper/client'
import { useStorage } from '@vueuse/core'
import type { PropType, SlotsType, VNode } from 'vue'
import {
  defineComponent,
  h,
  onMounted,
  ref,
  shallowRef,
  useId,
  watch,
} from 'vue'

import '../styles/tabs.css'

export interface TabProps extends Record<string, unknown> {
  id: string
}

const TAB_STORE_NAME = 'VUEPRESS_TAB_STORE'

const tabStore = useStorage<Record<string, string>>(TAB_STORE_NAME, {})

export const Tabs = defineComponent({
  name: 'Tabs',

  props: {
    /**
     * Active tab index
     *
     * 激活的标签页序号
     */
    active: {
      type: Number,
      default: 0,
    },

    /**
     * Tab data
     *
     * 标签页数据
     */
    data: {
      type: Array as PropType<TabProps[]>,
      required: true,
    },

    /**
     * Tab id
     *
     * 标签页 id
     */
    tabId: String,
  },

  slots: Object as SlotsType<{
    [slot: `title${number}`]: RequiredSlot<{
      value: string
      isActive: boolean
    }>
    [slot: `tab${number}`]: RequiredSlot<{
      value: string
      isActive: boolean
    }>
  }>,

  setup(props, { slots }) {
    let ids = props.data.map(() => useId())
    // Index of current active item
    const activeIndex = ref(props.active)

    // Refs of the tab buttons
    const tabRefs = shallowRef<HTMLUListElement[]>([])

    // Update store
    const updateStore = (): void => {
      if (props.tabId)
        tabStore.value[props.tabId] = props.data[activeIndex.value].id
    }

    // Activate next tab
    const activateNext = (index = activeIndex.value): void => {
      activeIndex.value = index < tabRefs.value.length - 1 ? index + 1 : 0
      tabRefs.value[activeIndex.value].focus()
    }

    // Activate previous tab
    const activatePrev = (index = activeIndex.value): void => {
      activeIndex.value = index > 0 ? index - 1 : tabRefs.value.length - 1
      tabRefs.value[activeIndex.value].focus()
    }

    // Handle keyboard event
    const keyboardHandler = (event: KeyboardEvent, index: number): void => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        activeIndex.value = index
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        activateNext()
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        activatePrev()
      }

      updateStore()
    }

    const getInitialIndex = (): number => {
      if (props.tabId) {
        const valueIndex = props.data.findIndex(
          ({ id }) => tabStore.value[props.tabId!] === id,
        )

        if (valueIndex !== -1) return valueIndex
      }

      return props.active
    }

    // only update ids in dev mode
    if (__VUEPRESS_DEV__) {
      watch(
        () => props.data.length,
        () => {
          ids = props.data.map(() => useId())
        },
      )
    }

    onMounted(() => {
      activeIndex.value = getInitialIndex()

      watch(
        () => props.tabId && tabStore.value[props.tabId],
        (newValue, oldValue) => {
          if (props.tabId && newValue !== oldValue) {
            const index = props.data.findIndex(({ id }) => id === newValue)

            if (index !== -1) activeIndex.value = index
          }
        },
      )
    })

    return (): VNode | null =>
      props.data.length
        ? h('div', { class: 'vp-tabs' }, [
            h(
              'div',
              { class: 'vp-tabs-nav', role: 'tablist' },
              props.data.map(({ id }, index) => {
                const isActive = index === activeIndex.value

                return h(
                  'button',
                  {
                    'type': 'button',
                    'ref': (element) => {
                      if (element)
                        tabRefs.value[index] = element as HTMLUListElement
                    },
                    'class': ['vp-tab-nav', { active: isActive }],
                    'role': 'tab',
                    'aria-controls': ids[index],
                    'aria-selected': isActive,
                    'onClick': () => {
                      activeIndex.value = index
                      updateStore()
                    },
                    'onKeydown': (event: KeyboardEvent) => {
                      keyboardHandler(event, index)
                    },
                  },
                  slots[`title${index}`]({ value: id, isActive }),
                )
              }),
            ),
            props.data.map(({ id }, index) => {
              const isActive = index === activeIndex.value

              return h(
                'div',
                {
                  'class': ['vp-tab', { active: isActive }],
                  'id': ids[index],
                  'role': 'tabpanel',
                  'aria-expanded': isActive,
                },
                [
                  h(
                    'div',
                    { class: 'vp-tab-title' },
                    slots[`title${index}`]({ value: id, isActive }),
                  ),
                  slots[`tab${index}`]({ value: id, isActive }),
                ],
              )
            }),
          ])
        : null
  },
})

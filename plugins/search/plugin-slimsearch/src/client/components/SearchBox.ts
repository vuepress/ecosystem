import { isIOS, isMacOS, useKeys, useLocale } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, defineComponent, h, onMounted, ref } from 'vue'

import { useActiveState } from '../composables/index.js'
import { locales, options } from '../define.js'
import { SearchIcon } from './icons.js'

import '../styles/search-box.css'

const [primaryHotKey] = options.hotKeys

export default defineComponent({
  name: 'SearchBox',

  setup() {
    const locale = useLocale(locales)
    const [isActive, toggleActive] = useActiveState()
    const isAppleDevice = ref(false)

    useKeys(options.hotKeys, () => {
      if (!isActive.value) toggleActive()
    })

    const controlKeys = computed(() =>
      primaryHotKey
        ? [
            ...(isAppleDevice.value
              ? ['⌃', '⇧', '⌥', '⌘']
              : ['Ctrl', 'Shift', 'Alt', 'Win']
            ).filter(
              (_, index) =>
                primaryHotKey[
                  (['ctrl', 'shift', 'alt', 'meta'] as const)[index]
                ],
            ),
            primaryHotKey.key.toUpperCase(),
          ]
        : null,
    )

    onMounted(() => {
      isAppleDevice.value = isMacOS() || isIOS()
    })

    return (): (VNode | null)[] => [
      h(
        'button',
        {
          'type': 'button',
          'class': 'slimsearch-button',
          'aria-label': locale.value.search,
          'onClick': () => {
            toggleActive(true)
          },
        },
        [
          h(SearchIcon),
          h('div', { class: 'slimsearch-placeholder' }, locale.value.search),
          controlKeys.value
            ? h(
                'div',
                { class: 'slimsearch-key-hints' },
                controlKeys.value.map((key) =>
                  h('kbd', { class: 'slimsearch-key' }, key),
                ),
              )
            : null,
        ],
      ),
    ]
  },
})

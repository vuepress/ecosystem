import { isIOS, isMacOS, useKeys, useLocale } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, defineComponent, h, onMounted, ref } from 'vue'

import { useActiveState } from '../composables/index.js'
import { getSearchClientConfig } from '../define.js'
import { SearchIcon } from './icons.js'

import '../styles/search-box.scss'

export default defineComponent({
  name: 'SearchBox',

  setup() {
    const { locales, options } = getSearchClientConfig()
    const locale = useLocale(locales)
    const [primaryHotKey] = options.hotKeys
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
          'class': 'vp-search-button',
          'aria-label': locale.value.search,
          'onClick': () => {
            toggleActive(true)
          },
        },
        [
          h(SearchIcon),
          h('div', { class: 'vp-search-placeholder' }, locale.value.search),
          controlKeys.value
            ? h(
                'div',
                { class: 'vp-search-key-hints' },
                controlKeys.value.map((key) =>
                  h('kbd', { class: 'vp-search-key' }, key),
                ),
              )
            : null,
        ],
      ),
    ]
  },
})

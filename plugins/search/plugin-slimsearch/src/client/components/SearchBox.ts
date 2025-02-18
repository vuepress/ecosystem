import {
  checkIsIOS,
  checkIsMacOS,
  checkIsiPad,
  useKeys,
  useLocaleConfig,
} from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { computed, defineComponent, h, inject, onMounted, ref } from 'vue'

import { searchModalSymbol } from '../composables/index.js'
import { locales, options } from '../define.js'
import { SearchIcon } from './icons.js'

import '../styles/search-box.css'

const primaryHotKey = options.hotKeys[0]

export default defineComponent({
  name: 'SearchBox',

  setup() {
    const locale = useLocaleConfig(locales)
    const isActive = inject(searchModalSymbol)!
    const isMacOS = ref(false)

    useKeys(options.hotKeys, () => {
      if (!isActive.value) isActive.value = true
    })

    const controlKeys = computed(() =>
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      primaryHotKey
        ? [
            ...(isMacOS.value
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
      const { userAgent } = navigator

      isMacOS.value =
        checkIsMacOS(userAgent) ||
        checkIsIOS(userAgent) ||
        checkIsiPad(userAgent)
    })

    return (): (VNode | null)[] => [
      h(
        'button',
        {
          'type': 'button',
          'class': 'slimsearch-button',
          'aria-label': locale.value.search,
          'onClick': () => {
            isActive.value = true
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

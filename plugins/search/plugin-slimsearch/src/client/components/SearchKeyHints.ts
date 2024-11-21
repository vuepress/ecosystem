import { useLocaleConfig } from '@vuepress/helper/client'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import { useMobile } from '../composables/index.js'
import { locales } from '../define.js'
import {
  DOWN_KEY_ICON,
  ENTER_KEY_ICON,
  ESC_KEY_ICON,
  UP_KEY_ICON,
} from '../icons/index.js'

export default defineComponent({
  name: 'SearchKeyHints',

  setup() {
    const locale = useLocaleConfig(locales)
    const isMobile = useMobile()

    return (): VNode | null =>
      // Key hints should only appears in PC
      isMobile.value
        ? null
        : h('div', { class: 'slimsearch-hints' }, [
            h('span', { class: 'slimsearch-hint' }, [
              h('kbd', { innerHTML: ENTER_KEY_ICON }),
              locale.value.select,
            ]),
            h('span', { class: 'slimsearch-hint' }, [
              h('kbd', { innerHTML: UP_KEY_ICON }),
              h('kbd', { innerHTML: DOWN_KEY_ICON }),
              locale.value.navigate,
            ]),
            h('span', { class: 'slimsearch-hint' }, [
              h('kbd', { innerHTML: ESC_KEY_ICON }),
              locale.value.exit,
            ]),
          ])
  },
})

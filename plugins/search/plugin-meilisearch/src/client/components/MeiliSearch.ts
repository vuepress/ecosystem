import { useLocaleConfig } from '@vuepress/helper/client'
import type { PropType } from 'vue'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { useRouteLocale } from 'vuepress/client'
import type { LocaleConfig } from 'vuepress/shared'

import type {
  MeiliSearchLocaleData,
  MeiliSearchOptions,
} from '../../shared/index.js'

import { getSearchButtonTemplate } from '../utils/getSearchButtonTemplate.js'

export const MeiliSearch = defineComponent({
  name: 'MeiliSearch',

  props: {
    options: {
      type: Object as PropType<MeiliSearchOptions>,
      required: true,
    },

    locales: {
      type: Object as PropType<LocaleConfig<MeiliSearchLocaleData>>,
      default: () => ({}),
    },
  },

  setup(props) {
    const locale = useLocaleConfig(props.locales)
    const routeLocale = useRouteLocale()

    const meilisearchOptions = computed(() => {
      const { locales = {}, ...rest } = props.options

      return {
        translations: locale.value,
        ...locales[routeLocale.value],
        ...rest,
      }
    })

    const hasInitialized = ref(false)
    let currentInitialization: Promise<void>
    let destroy: () => void

    const initialize = async (): Promise<void> => {
      const { docsearch } = await import('meilisearch-docsearch')

      destroy = docsearch({
        ...meilisearchOptions.value,
        container: '#docsearch',
      })

      hasInitialized.value = true
    }

    onMounted(() => {
      currentInitialization = initialize()

      // reinitialize when locale changes
      watch(routeLocale, async () => {
        await currentInitialization

        destroy()
        hasInitialized.value = false
        currentInitialization = initialize()
      })
    })

    onUnmounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      destroy?.()
    })

    return () => [
      h('div', {
        id: 'docsearch',
        style: { display: hasInitialized.value ? 'block' : 'none' },
      }),
      hasInitialized.value
        ? null
        : h('div', {
            innerHTML: getSearchButtonTemplate(locale.value.button),
          }),
    ]
  },
})

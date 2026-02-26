import { useLocale } from '@vuepress/helper/client'
import type { PropType, VNode } from 'vue'
import {
  computed,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import { useData } from 'vuepress/client'
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
    const { lang, routeLocale } = useData()
    const locale = useLocale(props.locales)

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
      if (__VUEPRESS_SSR__) return

      const { docsearch } = await import('meilisearch-docsearch')
      const { searchParams } = meilisearchOptions.value
      let rawFilter: (string[] | string)[] = []

      if (searchParams?.filter) {
        if (typeof searchParams.filter === 'string')
          rawFilter.push(searchParams.filter)
        else if (Array.isArray(searchParams.filter))
          rawFilter = searchParams.filter
      }
      const filter = [`lang=${lang.value}`, ...rawFilter]

      destroy = docsearch({
        ...meilisearchOptions.value,
        searchParams: {
          ...meilisearchOptions.value.searchParams,
          filter,
        },
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
      destroy?.()
    })

    return (): (VNode | null)[] => [
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

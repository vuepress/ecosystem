import type { ExactLocaleConfig } from '@vuepress/helper/client'
import { LoadingIcon, useLocaleConfig, wait } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import { pageviewCount } from '@waline/client/pageview'
import type { VNode } from 'vue'
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  nextTick,
  onMounted,
} from 'vue'
import { ClientOnly, usePageFrontmatter, usePageLang } from 'vuepress/client'
import type {
  CommentPluginFrontmatter,
  WalineLocaleData,
} from '../../shared/index.js'
import { useWalineOptions } from '../helpers/index.js'

import '@waline/client/waline.css'
import '../styles/waline.css'

declare const WALINE_META: boolean
declare const WALINE_LOCALES: ExactLocaleConfig<WalineLocaleData>

const walineLocales = WALINE_LOCALES

if (WALINE_META)
  void import(/* webpackChunkName: "waline" */ '@waline/client/waline-meta.css')

export default defineComponent({
  name: 'WalineComment',

  props: {
    /**
     * The path of the comment
     */
    identifier: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const walineOptions = useWalineOptions()
    const frontmatter = usePageFrontmatter<CommentPluginFrontmatter>()
    const lang = usePageLang()
    const walineLocale = useLocaleConfig(walineLocales)

    let abort: (() => void) | null = null
    const enableWaline = computed(() => Boolean(walineOptions.value.serverURL))

    const enablePageViews = computed(() => {
      if (!enableWaline.value) return false
      const pluginConfig = walineOptions.value.pageview !== false
      const pageConfig = frontmatter.value.pageview

      return (
        // Enable in page
        Boolean(pageConfig) ||
        // Not disabled in anywhere
        (pluginConfig && pageConfig !== false)
      )
    })

    const walineProps = computed(() => ({
      lang: lang.value === 'zh-CN' ? 'zh-CN' : 'en',
      locale: walineLocale.value,
      dark: "[data-theme='dark']",
      ...walineOptions.value,
      path: props.identifier,
    }))

    onMounted(() => {
      watchImmediate(
        () => [
          props.identifier,
          walineOptions.value.serverURL,
          walineOptions.value.delay,
          enablePageViews.value,
        ],
        async () => {
          abort?.()
          abort = null

          if (enablePageViews.value) {
            await nextTick()
            await wait(walineOptions.value.delay ?? 800)

            abort = pageviewCount({
              serverURL: walineOptions.value.serverURL,
              path: props.identifier,
            })
          }
        },
      )
    })

    return (): VNode | null =>
      enableWaline.value
        ? h(
            'div',
            { id: 'comment', class: 'waline-wrapper' },
            h(
              defineAsyncComponent({
                loader: async () => {
                  const { Waline } = await import(
                    /* webpackChunkName: "waline" */ '@waline/client/component'
                  )

                  return () => h(ClientOnly, () => h(Waline, walineProps.value))
                },
                loadingComponent: LoadingIcon,
              }),
            ),
          )
        : null
  },
})

import { useLocaleConfig, wait } from '@vuepress/helper/client'
import { pageviewCount } from '@waline/client/pageview'
import type { VNode } from 'vue'
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  h,
  nextTick,
  onMounted,
  watch,
} from 'vue'
import { usePageFrontmatter, usePageLang } from 'vuepress/client'
import type {
  CommentPluginFrontmatter,
  WalineLocaleConfig,
} from '../../shared/index.js'
import { useWalineOptions } from '../helpers/index.js'
import { LoadingIcon } from './LoadingIcon.js'

import '@waline/client/waline.css'

declare const WALINE_META: boolean
declare const WALINE_LOCALES: WalineLocaleConfig

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
      watch(
        () => [
          props.identifier,
          walineOptions.value.serverURL,
          walineOptions.value.delay,
          enablePageViews.value,
        ],
        () => {
          abort?.()

          if (enablePageViews.value)
            void nextTick()
              .then(() => wait(walineOptions.value.delay ?? 800))
              .then(() => {
                setTimeout(() => {
                  abort = pageviewCount({
                    serverURL: walineOptions.value.serverURL,
                    path: props.identifier,
                  })
                })
              })
        },
        { immediate: true },
      )
    })

    return (): VNode | null =>
      enableWaline.value
        ? h(
            'div',
            { id: 'comment', class: 'waline-wrapper' },
            h(
              defineAsyncComponent({
                loader: async () =>
                  (
                    await import(
                      /* webpackChunkName: "waline" */ '@waline/client/component'
                    )
                  ).Waline,
                loadingComponent: LoadingIcon,
              }),
              walineProps.value,
            ),
          )
        : null
  },
})

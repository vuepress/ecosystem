import { LoadingIcon, isString, wait } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import type Artalk from 'artalk'
import type { VNode } from 'vue'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { usePageData, useSiteData } from 'vuepress/client'
import { useArtalkOptions } from '../helpers/index.js'

import 'artalk/dist/Artalk.css'

export default defineComponent({
  name: 'ArtalkComment',

  props: {
    /**
     * The identifier of the comment
     *
     * 评论标识符
     */
    identifier: {
      type: String,
      required: true,
    },

    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: Boolean,
  },

  setup(props) {
    const artalkOptions = useArtalkOptions()
    const page = usePageData()
    const site = useSiteData()

    const loaded = ref(false)
    const artalkContainer = shallowRef<HTMLDivElement>()

    let artalk: Artalk | null = null

    const enableArtalk = computed(() => isString(artalkOptions.value.server))

    const initArtalk = async (): Promise<void> => {
      const [{ default: Artalk }] = await Promise.all([
        import(/* webpackChunkName: "artalk" */ 'artalk/dist/Artalk.mjs'),
        wait(artalkOptions.value.delay ?? 800),
      ])

      loaded.value = true
      await nextTick()

      artalk = Artalk.init({
        useBackendConf: false,
        site: site.value.title,
        pageTitle: page.value.title,
        ...artalkOptions.value,
        el: artalkContainer.value!,
        pageKey: props.identifier,
        darkMode: props.darkmode,
      })

      if (artalkOptions.value.useBackendConf)
        artalk.on('mounted', () => {
          artalk!.setDarkMode(props.darkmode)
        })
    }

    onMounted(() => {
      watchImmediate(
        () => artalkOptions.value,
        () => {
          artalk?.destroy()
          void initArtalk()
        },
        { flush: 'post' },
      )

      watch(
        () => props.identifier,
        () => {
          artalk?.update({
            site: site.value.title,
            pageTitle: page.value.title,
            pageKey: props.identifier,
          })
          artalk?.reload()
        },
        { flush: 'post' },
      )

      watch(
        () => props.darkmode,
        (value) => {
          artalk?.setDarkMode(value)
        },
        { flush: 'post' },
      )
    })

    onUnmounted(() => {
      artalk?.destroy()
    })

    return (): VNode | null =>
      enableArtalk.value
        ? h('div', { class: 'artalk-wrapper' }, [
            loaded.value ? null : h(LoadingIcon),
            h('div', { ref: artalkContainer }),
          ])
        : null
  },
})

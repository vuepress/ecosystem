import { LoadingIcon, decodeData } from '@vuepress/helper/client'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import type { Markmap } from 'markmap-view'
import type { VNode } from 'vue'
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
  toRefs,
  watch,
} from 'vue'
import { onContentUpdated } from 'vuepress/client'

import '../styles/markmap.css'

export default defineComponent({
  name: 'MarkMap',

  props: {
    /**
     * Markmap content
     *
     * Markmap
     */
    content: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { content } = toRefs(props)
    const markmapWrapper = shallowRef<HTMLElement>()
    const markmapSVG = shallowRef<SVGElement>()

    const loaded = ref(false)

    let markmap: Markmap | null = null

    useEventListener(
      'resize',
      useDebounceFn(() => {
        void markmap?.fit()
      }, 100),
    )

    const destroyMarkmap = (): void => {
      markmap?.destroy()
      markmap = null
    }

    const renderMarkmap = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return

      const [{ Transformer }, markmapView, { Toolbar }] = await Promise.all([
        import(/* webpackChunkName: "markmap" */ 'markmap-lib'),
        import(/* webpackChunkName: "markmap" */ 'markmap-view'),
        import(/* webpackChunkName: "markmap" */ 'markmap-toolbar'),
      ])

      const { Markmap, deriveOptions, loadJS, loadCSS } = markmapView

      const transformer = new Transformer()
      const { frontmatter, features, root } = transformer.transform(
        decodeData(props.content),
      )
      const { styles, scripts } = transformer.getUsedAssets(features)

      await Promise.all([
        // Load scripts
        scripts
          ? loadJS(scripts, {
              // For plugins to access the `markmap-view` module
              getMarkmap: () => markmapView,
            })
          : Promise.resolve(),
        // Load styles
        styles ? loadCSS(styles) : Promise.resolve(),
      ])

      markmap = Markmap.create(
        markmapSVG.value!,
        deriveOptions({
          maxWidth: 240,
          ...frontmatter?.markmap,
        }),
      )

      const { el } = Toolbar.create(markmap)

      await markmap.setData(root)
      await markmap.fit()

      el.style.position = 'absolute'
      el.style.bottom = '0.5rem'
      el.style.right = '0.5rem'

      markmapWrapper.value!.append(el)
    }

    onContentUpdated(async (reason) => {
      if (reason === 'mounted') {
        await renderMarkmap()
        loaded.value = true
      }
    })

    onMounted(() => {
      if (!__VUEPRESS_DEV__) return

      watch(
        content,
        async () => {
          destroyMarkmap()
          await nextTick()
          await renderMarkmap()
        },
        { flush: 'post' },
      )
    })

    onUnmounted(destroyMarkmap)

    return (): VNode =>
      h('div', { class: 'markmap-wrapper', ref: markmapWrapper }, [
        h('svg', {
          ref: markmapSVG,
          class: 'markmap-svg',
        }),
        loaded.value
          ? null
          : h(LoadingIcon, { class: 'markmap-loading', height: 360 }),
      ])
  },
})

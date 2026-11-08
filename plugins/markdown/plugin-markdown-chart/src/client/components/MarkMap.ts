import type { ParseOptions } from '@markmap/parse'
import type { Markmap, ViewOptions } from '@markmap/view'
import { LoadingIcon, decodeData, useDarkMode } from '@vuepress/helper/client'
import { useDebounceFn, useEventListener, watchImmediate } from '@vueuse/core'
import type { InjectionKey, VNode } from 'vue'
import {
  defineComponent,
  h,
  inject,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  shallowRef,
} from 'vue'

import '../styles/markmap.scss'

/**
 * Plugins that add TeX math support to markmap labels
 *
 * 为 markmap 标签添加 TeX 数学公式支持的插件
 */
export interface MarkmapMathPlugins {
  /**
   * Content plugins passed to `@markmap/view`
   *
   * 传给 `@markmap/view` 的内容插件
   */
  contentPlugins: NonNullable<ViewOptions['plugins']>

  /**
   * Remark plugins passed to `@markmap/parse`
   *
   * 传给 `@markmap/parse` 的 remark 插件
   */
  parsePlugins: NonNullable<ParseOptions['plugins']>
}

/**
 * Injection key of the markmap math plugins
 *
 * The generated client config provides the plugins only when the math packages
 * are installed, so this component does not import them directly.
 *
 * Markmap 数学公式插件的注入键
 *
 * 生成的客户端配置仅会在数学公式包已安装时提供这些插件，因此本组件不会直接导入它们。
 */
export const markmapMathKey: InjectionKey<MarkmapMathPlugins> =
  Symbol('markmap-math')

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
    const isDarkMode = useDarkMode()
    const math = inject(markmapMathKey, null)

    const markmapWrapper = shallowRef<HTMLElement>()
    const markmapSVG = shallowRef<SVGSVGElement>()

    const loaded = ref(false)

    let markmap: Markmap | null = null
    let toolbar: { element: HTMLElement; destroy: () => void } | null = null

    useEventListener(
      'resize',
      useDebounceFn(() => {
        markmap?.fit()
      }, 100),
    )

    const destroyMarkmap = (): void => {
      toolbar?.destroy()
      toolbar = null
      markmap?.destroy()
      markmap = null
    }

    const renderMarkmap = async (): Promise<void> => {
      if (__VUEPRESS_SSR__) return

      const [{ parse }, markmapView, { createToolbar }] = await Promise.all([
        import(/* webpackChunkName: "markmap" */ '@markmap/parse'),
        import(/* webpackChunkName: "markmap" */ '@markmap/view'),
        import(/* webpackChunkName: "markmap" */ '@markmap/toolbar'),
      ])

      const { Markmap, resolveViewOptions } = markmapView

      const { frontmatter, root } = parse(
        decodeData(props.content),
        math ? { plugins: math.parsePlugins } : undefined,
      )
      const { options, warnings } = resolveViewOptions(
        {
          colorScheme: isDarkMode.value ? 'dark' : 'light',
          wrapWidth: 240,
          ...(math ? { plugins: math.contentPlugins } : {}),
        },
        frontmatter?.markmap,
      )

      if (__VUEPRESS_DEV__ && warnings.length > 0) {
        // oxlint-disable-next-line no-console
        console.warn(`[markmap]: ${warnings.join('\n')}`)
      }

      markmap = Markmap.create(markmapSVG.value!, root, options)

      const mapToolbar = createToolbar(markmap)

      // Let the toolbar use the theme tokens of the map
      mapToolbar.element.classList.add(markmap.themeClass)

      toolbar = mapToolbar
      markmapWrapper.value!.append(mapToolbar.element)
    }

    onMounted(() => {
      watchImmediate(
        __VUEPRESS_DEV__
          ? [(): string => props.content, isDarkMode]
          : isDarkMode,
        async () => {
          destroyMarkmap()
          await nextTick()
          await renderMarkmap()
          loaded.value = true
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

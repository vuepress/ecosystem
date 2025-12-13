import { isMobile } from '@vuepress/helper/client'

import FloatingVue, { recomputeAllPoppers } from 'floating-vue'
import type { App } from 'vue'
import 'floating-vue/dist/style.css'

/**
 * Enhance Vue app with twoslash support using FloatingVue
 *
 * 使用 FloatingVue 为 Vue 应用增强 twoslash 支持
 *
 * @param app - Vue app instance / Vue 应用实例
 *
 * @example
 * ```ts
 * import { enhanceTwoslash } from '@vuepress/shiki-twoslash/client'
 *
 * export default {
 *   enhance({ app }) {
 *     enhanceTwoslash(app)
 *   }
 * }
 * ```
 */
export const enhanceTwoslash = (app: App): void => {
  const isMobileDevice = !__VUEPRESS_SSR__ && isMobile()

  if (!__VUEPRESS_SSR__) {
    // Recompute poppers when clicking on a tab
    window.addEventListener(
      'click',
      (event) => {
        const path = event.composedPath()
        if (
          path.some((el) =>
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            (el as HTMLElement)?.classList?.contains('vp-code-tab'),
          )
        )
          recomputeAllPoppers()
      },
      { passive: true },
    )
  }

  app.use(FloatingVue, {
    themes: {
      'twoslash': {
        $extend: 'dropdown',
        triggers: isMobileDevice ? ['touch'] : ['hover', 'touch'],
        popperTriggers: isMobileDevice ? ['touch'] : ['hover', 'touch'],
        placement: 'bottom-start',
        overflowPadding: 10,
        delay: 0,
        handleResize: false,
        autoHide: true,
        instantMove: true,
        flip: false,
        arrowPadding: 8,
        autoBoundaryMaxSize: true,
      },
      'twoslash-query': {
        $extend: 'twoslash',
        triggers: ['click'],
        popperTriggers: ['click'],
        autoHide: false,
      },
      'twoslash-completion': {
        $extend: 'twoslash-query',
        triggers: ['click'],
        popperTriggers: ['click'],
        autoHide: false,
        distance: 0,
        arrowOverflow: true,
      },
    },
  })
}

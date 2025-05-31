import { isMobile } from '@vuepress/helper/client'
// eslint-disable-next-line import/no-rename-default
import FloatingVue, { recomputeAllPoppers } from 'floating-vue'
import type { App } from 'vue'
import 'floating-vue/dist/style.css'

export const enhanceTwoslash = (app: App): void => {
  const isMobileDevice =
    typeof navigator !== 'undefined' ? isMobile(navigator.userAgent) : false

  if (typeof window !== 'undefined') {
    // Recompute poppers when clicking on a tab
    window.addEventListener(
      'click',
      (e) => {
        const path = e.composedPath()
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

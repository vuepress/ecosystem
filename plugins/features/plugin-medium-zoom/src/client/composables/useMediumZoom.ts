import type { Zoom } from 'medium-zoom'
import type { InjectionKey } from 'vue'
import { inject } from 'vue'

declare module 'medium-zoom' {
  interface Zoom {
    refresh: (selector?: string) => void
  }
}

/**
 * Injection key for medium zoom instance
 *
 * medium zoom 实例的注入键
 */
export const mediumZoomSymbol: InjectionKey<Zoom> = Symbol('mediumZoom')

/**
 * Inject medium zoom instance
 *
 * 注入 medium zoom 实例
 *
 * @example
 * ```ts
 * import { useMediumZoom } from '@vuepress/plugin-medium-zoom/client'
 *
 * const zoom = useMediumZoom()
 * zoom?.refresh()
 * ```
 */
export const useMediumZoom = (): Zoom | null => {
  if (__VUEPRESS_SSR__) return null

  const zoom = inject(mediumZoomSymbol)
  if (!zoom) {
    throw new Error('useMediumZoom() is called without provider.')
  }
  return zoom
}

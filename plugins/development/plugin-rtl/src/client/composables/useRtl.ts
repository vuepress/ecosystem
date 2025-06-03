import { entries } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import { onMounted } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import { getElement } from '../utils/index.js'

/**
 * Composable to use RTL functionality
 *
 * 使用 RTL 功能的组合式函数
 *
 * @param rtlLocalePaths - RTL locale paths
 * @param selectorOptions - RTL selector options
 *
 * @default selectorOptions { html: { dir: 'rtl' } }
 *
 * @example
 * ```ts
 * import { useRtl } from '@vuepress/plugin-rtl'
 *
 * // Use in client side
 * useRtl(['/ar/', '/he/'], {
 *   html: { dir: 'rtl' },
 *   body: { class: 'rtl-layout' }
 * })
 * ```
 */
export const useRtl = (
  rtlLocalePaths: string[],
  selectorOptions: Record<string, Record<string, string>> = {
    html: { dir: 'rtl' },
  },
): void => {
  const routeLocale = useRouteLocale()

  const toggleRTL = (localePath: string): void => {
    if (rtlLocalePaths.includes(localePath)) {
      entries(selectorOptions).forEach(([selector, attrs = {}]) => {
        const element = getElement(selector)

        if (element)
          entries(attrs).forEach(([attr, value]) => {
            if (attr === 'class') element.classList.add(value)
            else element.setAttribute(attr, value)
          })
      })
      document.documentElement.style.setProperty('direction', 'rtl')
    } else {
      entries(selectorOptions).forEach(([selector, attrs = {}]) => {
        const element = getElement(selector)

        if (element)
          entries(attrs).forEach(([attr, value]) => {
            if (attr === 'class') element.classList.remove(value)
            else element.removeAttribute(attr)
          })
      })

      document.documentElement.style.removeProperty('direction')
    }
  }

  onMounted(() => {
    watchImmediate(routeLocale, toggleRTL)
  })
}

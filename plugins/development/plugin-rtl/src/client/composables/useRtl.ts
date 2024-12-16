import { entries } from '@vuepress/helper/client'
import { watchImmediate } from '@vueuse/core'
import { onMounted } from 'vue'
import { useRouteLocale } from 'vuepress/client'
import { getElement } from '../utils/index.js'

/**
 *
 * @param rtlLocalePaths rtl locale paths
 * @param selectorOptions rtl selector options
 */
export const useRtl = (
  rtlLocalePaths: string[],
  selectorOptions?: Record<string, Record<string, string>>,
): void => {
  const routeLocale = useRouteLocale()

  const toggleRTL = (localePath: string): void => {
    if (rtlLocalePaths.includes(localePath)) {
      entries(
        selectorOptions ?? {
          html: { dir: 'rtl' },
        },
      ).forEach(([selector, attrs = {}]) => {
        const element = getElement(selector)

        if (element)
          entries(attrs).forEach(([attr, value]) => {
            if (attr === 'class') element.classList.add(value)
            else element.setAttribute(attr, value)
          })
      })
      document.documentElement.style.setProperty('direction', 'rtl')
    } else {
      entries(rtlLocalePaths).forEach(([selector, attrs = {}]) => {
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

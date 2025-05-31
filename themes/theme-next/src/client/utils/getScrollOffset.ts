import type { DefaultThemeLocaleData } from '../../shared/index.js'

const tryOffsetSelector = (selector: string, padding: number): number => {
  const el = document.querySelector(selector)
  if (!el) return 0
  const bot = el.getBoundingClientRect().bottom
  if (bot < 0) return 0
  return bot + padding
}

export const getScrollOffset = (
  scrollOffset?: DefaultThemeLocaleData['scrollOffset'],
): number => {
  let offset = 0
  let padding = 24
  if (typeof scrollOffset === 'object' && 'padding' in scrollOffset) {
    padding = scrollOffset.padding
    // eslint-disable-next-line no-param-reassign
    scrollOffset = scrollOffset.selector
  }
  if (typeof scrollOffset === 'number') {
    offset = scrollOffset
  } else if (typeof scrollOffset === 'string') {
    offset = tryOffsetSelector(scrollOffset, padding)
  } else if (Array.isArray(scrollOffset)) {
    for (const selector of scrollOffset) {
      const res = tryOffsetSelector(selector, padding)
      if (res) {
        offset = res
        break
      }
    }
  }

  return offset
}

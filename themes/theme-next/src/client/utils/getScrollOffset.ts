import type { DefaultThemeLocaleData } from '../../shared'

export function getScrollOffset(
  scrollOffset?: DefaultThemeLocaleData['scrollOffset'],
): number {
  let offset = 0
  let padding = 24
  if (typeof scrollOffset === 'object' && 'padding' in scrollOffset) {
    padding = scrollOffset.padding
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

function tryOffsetSelector(selector: string, padding: number): number {
  const el = document.querySelector(selector)
  if (!el) return 0
  const bot = el.getBoundingClientRect().bottom
  if (bot < 0) return 0
  return bot + padding
}

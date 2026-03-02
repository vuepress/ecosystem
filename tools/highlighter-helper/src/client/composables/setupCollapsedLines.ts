import { useEventListener } from '@vueuse/core'

/**
 * Setup collapsed lines functionality for code blocks
 *
 * 为代码块设置折叠行功能
 *
 * @param options - Setup options / 设置选项
 * @param options.selector - CSS selector for collapsed lines elements / 折叠行元素的 CSS 选择器
 *
 * @example
 * ```ts
 * import { setupCollapsedLines } from '@vuepress/highlighter-helper/client'
 *
 * // Use default selector
 * setupCollapsedLines()
 *
 * // Use custom selector
 * setupCollapsedLines({
 *   selector: '.my-collapsed-lines'
 * })
 * ```
 */
export const setupCollapsedLines = ({
  selector = 'div[class*="language-"].has-collapsed-lines > .collapsed-lines',
}: { selector?: string } = {}): void => {
  useEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLElement
      if (target.matches(selector)) {
        const parent = target.parentElement
        if (parent?.classList.toggle('collapsed'))
          parent.scrollIntoView({ block: 'center', behavior: 'instant' })
      }
    },
    { passive: true },
  )
}

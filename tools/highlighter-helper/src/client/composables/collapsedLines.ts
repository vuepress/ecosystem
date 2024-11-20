import { useEventListener } from '@vueuse/core'

export const setupCollapsedLines = ({
  selector = 'div[class*="language-"].has-collapsed-lines > .collapsed-lines',
}: { selector?: string } = {}): void => {
  useEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.matches(selector)) {
      const parent = target.parentElement
      if (parent?.classList.toggle('collapsed')) {
        parent.scrollIntoView({ block: 'center', behavior: 'instant' })
      }
    }
  })
}

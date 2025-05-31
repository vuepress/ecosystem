import type { FunctionalComponent } from 'vue'
import { h } from 'vue'

export interface VPHeaderProps {
  /** header text */
  text: string
  /** header anchor */
  anchor: string
  /**
   * header level
   *
   * @default 2
   */
  level?: number
}

export const VPHeader: FunctionalComponent<VPHeaderProps> = ({
  level = 2,
  text,
  anchor,
}) =>
  h(
    `h${level || 2}`,
    { id: anchor, tabindex: '-1' },
    h('a', { href: `#${anchor}`, class: 'header-anchor' }, h('span', text)),
  )

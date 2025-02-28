import type { FunctionalComponent } from 'vue'
import { h } from 'vue'

interface VPHeaderProps {
  level?: number
  title: string
  anchor: string
}

export const VPHeader: FunctionalComponent<VPHeaderProps> = ({
  level = 2,
  title,
  anchor,
}) =>
  h(
    `h${level || 2}`,
    { id: anchor, tabindex: '-1' },
    h('a', { href: `#${anchor}`, class: 'header-anchor' }, h('span', title)),
  )

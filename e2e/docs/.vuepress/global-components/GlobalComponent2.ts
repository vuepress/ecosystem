import type { VNode } from 'vue'
import { h } from 'vue'

const GlobalComponent2 = (): VNode =>
  h('div', { id: 'global-component-2' }, 'Global Component 2')

export default GlobalComponent2

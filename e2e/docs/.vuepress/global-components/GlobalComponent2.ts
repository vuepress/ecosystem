import type { VNode } from 'vue'
import { h } from 'vue'

export default (): VNode =>
  h('div', { id: 'global-component-2' }, 'Global Component 2')

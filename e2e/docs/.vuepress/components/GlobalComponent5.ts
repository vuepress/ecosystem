import type { VNode } from 'vue'
import { h } from 'vue'

export default (): VNode =>
  h('div', { id: 'global-component-5' }, 'Global Component 5')

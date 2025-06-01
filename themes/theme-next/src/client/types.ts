import type { VNode } from 'vue'

export type Slot<P = never> = never extends P
  ? () => VNode | VNode[] | string | null
  : (props: P) => VNode | VNode[] | string | null

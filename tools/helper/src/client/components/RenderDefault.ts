import type { FunctionalComponent, VNode } from 'vue'

/**
 * Render default slot content
 *
 * 渲染默认插槽内容
 */
export const RenderDefault: FunctionalComponent<
  Record<never, never>,
  Record<never, never>,
  { default: () => VNode | VNode[] | null }
> = (_props, { slots }) => slots.default()

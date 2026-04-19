import type { FunctionalComponent, VNode } from 'vue'

/**
 * Render default slot content
 *
 * 渲染默认插槽内容
 *
 * @param _props Unused component props
 * @returns Default slot content
 */
export const RenderDefault: FunctionalComponent<
  Record<never, never>,
  Record<never, never>,
  { default: () => VNode | VNode[] | null }
> = (_props, { slots }) => slots.default()

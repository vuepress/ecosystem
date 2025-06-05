import type { VNode } from 'vue'
import { Comment, Fragment } from 'vue'

import { isArray } from '../../shared/index.js'
import type { SlotContent } from '../typings/index.js'

const isVNodeChildrenEmpty = (children: VNode[]): boolean =>
  children.every((item) => {
    if (item.type === Comment) return true

    if (item.type === Fragment) {
      return (
        item.children == null ||
        (isArray(item.children) &&
          isVNodeChildrenEmpty(item.children as VNode[]))
      )
    }

    return false
  })

/**
 * Check whether a slot is currently empty.
 *
 * 检查插槽当前是否为空
 *
 * @param normalizedSlotContent - The normalized slot content, which should be the results of the slot function / 标准化的插槽内容，应该是插槽函数的结果
 *
 * @returns True if the slot content is empty, false otherwise / 如果插槽内容为空则返回 true，否则返回 false
 */
export const isSlotContentEmpty = (
  normalizedSlotContent: SlotContent,
): boolean => {
  if (normalizedSlotContent == null) return true

  if (isArray(normalizedSlotContent))
    return isVNodeChildrenEmpty(normalizedSlotContent)

  return false
}

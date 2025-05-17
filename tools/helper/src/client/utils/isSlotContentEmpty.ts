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
 * @param normalizedSlotContent The normalized slot content, which should be the results of the slot function.
 * @returns true if the slot content is empty, false otherwise.
 */
export const isSlotContentEmpty = (
  normalizedSlotContent: SlotContent,
): boolean => {
  if (normalizedSlotContent == null) return true

  if (isArray(normalizedSlotContent))
    return isVNodeChildrenEmpty(normalizedSlotContent)

  return false
}

import { Comment } from 'vue'

import { isArray } from '../../shared/index.js'
import type { SlotContent } from '../typings/index.js'

export const isSlotResultEmpty = (
  normalizedSlotContent: SlotContent,
): boolean =>
  normalizedSlotContent == null ||
  (isArray(normalizedSlotContent) &&
    normalizedSlotContent.every((item) => item.type === Comment))

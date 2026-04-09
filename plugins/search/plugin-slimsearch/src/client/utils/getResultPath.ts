import { store } from '@temp/slimsearch/store.js'

import type { MatchedItem } from '../../shared/index.js'

export const getResultPath = (item: MatchedItem): string =>
  store[item.id] + ('anchor' in item ? `#${item.anchor}` : '')

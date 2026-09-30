import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'

import { useSuggestionsFocus } from '../../src/client/composables/useSuggestionsFocus.js'

describe('suggestion focus', () => {
  it('should start at the first suggestion', () => {
    const { focusIndex } = useSuggestionsFocus(ref([1, 2, 3]))

    expect(focusIndex.value).toBe(0)
  })

  it('should move to the next suggestion and wrap around', () => {
    const { focusIndex, focusNext } = useSuggestionsFocus(ref([1, 2, 3]))

    focusNext()
    expect(focusIndex.value).toBe(1)

    focusNext()
    focusNext()
    expect(focusIndex.value).toBe(0)
  })

  it('should move to the previous suggestion and wrap around', () => {
    const { focusIndex, focusPrev } = useSuggestionsFocus(ref([1, 2, 3]))

    focusPrev()
    expect(focusIndex.value).toBe(2)

    focusPrev()
    expect(focusIndex.value).toBe(1)
  })

  it('should reset the focus when the suggestion list changes', async () => {
    const suggestions = ref([1, 2, 3])
    const { focusIndex, focusNext } = useSuggestionsFocus(suggestions)

    focusNext()
    expect(focusIndex.value).toBe(1)

    // the focused suggestion no longer exists, so the focus must go back to the
    // first one instead of pointing out of range
    suggestions.value = [1]
    await nextTick()

    expect(focusIndex.value).toBe(0)
  })
})

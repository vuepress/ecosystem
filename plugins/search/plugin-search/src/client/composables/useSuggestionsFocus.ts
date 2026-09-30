import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export const useSuggestionsFocus = (
  suggestions: Ref<unknown[]>,
): {
  focusIndex: Ref<number>
  focusNext: () => void
  focusPrev: () => void
} => {
  const focusIndex = ref(0)
  const focusNext = (): void => {
    if (focusIndex.value < suggestions.value.length - 1) focusIndex.value += 1
    else focusIndex.value = 0
  }
  const focusPrev = (): void => {
    if (focusIndex.value > 0) focusIndex.value -= 1
    else focusIndex.value = suggestions.value.length - 1
  }

  // reset the focus when the suggestion list changes, otherwise the index may
  // point to a suggestion that no longer exists
  watch(suggestions, () => {
    focusIndex.value = 0
  })

  return {
    focusIndex,
    focusNext,
    focusPrev,
  }
}

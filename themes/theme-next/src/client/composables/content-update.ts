import { onUnmounted } from 'vue'

export interface ContentUpdated {
  mounted?: boolean
  updated?: boolean
  beforeUnmount?: boolean
}

let contentUpdatedCallbacks: ((lifeCircleType: ContentUpdated) => unknown)[] =
  []

/**
 * Register callback that is called every time the markdown content is updated
 * in the DOM.
 */
export const onContentUpdated = (fn: () => unknown): void => {
  contentUpdatedCallbacks.push(fn)
  onUnmounted(() => {
    contentUpdatedCallbacks = contentUpdatedCallbacks.filter((f) => f !== fn)
  })
}

export const runCallbacks = (lifeCircleType: ContentUpdated): void => {
  contentUpdatedCallbacks.forEach((fn) => fn(lifeCircleType))
}

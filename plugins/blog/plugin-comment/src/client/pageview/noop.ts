import type { UpdatePageview } from './typings.js'

export const isSupported: boolean = false

export const usePageview = (): UpdatePageview => () => {
  // do nothing
}

import type { WalineAbort } from '@waline/client'
import { useWalineOptions } from '../helpers/index.js'

export type AbortPageview = (reason?: any) => void
export type UpdatePageview = () => Promise<AbortPageview | void>

export const usePageView = (): UpdatePageview => {
  const commentOptions = useWalineOptions()

  return async (): Promise<WalineAbort | void> => {
    try {
      const { pageviewCount } = await import(
        /* webpackMode: "week" */ /* webpackChunkName: "pageview" */ '@waline/client/pageview'
      )
      return pageviewCount({ serverURL: commentOptions.serverURL })
    } catch (err) {
      console.error('@waline/client is not installed!')
    }
  }
}

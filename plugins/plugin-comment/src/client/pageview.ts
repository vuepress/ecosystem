import type { WalineAbort } from '@waline/client'
import type { WalineOptions } from '../shared/index.js'

declare const __COMMENT_OPTIONS__: WalineOptions

export const updatePageview = async (): Promise<WalineAbort | void> => {
  try {
    const { pageviewCount } = await import(
      /* webpackChunkName: "pageview" */ '@waline/client/pageview'
    )

    return pageviewCount({ serverURL: __COMMENT_OPTIONS__.serverURL })
  } catch (err) {
    console.error('@waline/client is not installed!')
  }
}

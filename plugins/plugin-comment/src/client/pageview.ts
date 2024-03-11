import type { WalineAbort } from '@waline/client'
import { useWalineOptions } from './helpers/index.js'

export const updatePageview = async (): Promise<WalineAbort | void> => {
  try {
    const { pageviewCount } = await import(
      /* webpackChunkName: "pageview" */ '@waline/client/pageview'
    )
    const commentOptions = useWalineOptions()

    return pageviewCount({ serverURL: commentOptions.serverURL })
  } catch (err) {
    console.error('@waline/client is not installed!')
  }
}

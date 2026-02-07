import Artalk from 'artalk/dist/Artalk.mjs'
import { useArtalkOptions } from '../helpers/index.js'
import type { UpdatePageview } from './typings.js'

export const isSupported = true

export const usePageview = (): UpdatePageview => {
  const options = useArtalkOptions()

  return ({ selector }) => {
    // oxlint-disable-next-line no-new
    new Artalk({
      server: options.value.server,
      site: options.value.site,
      ...(selector ? { countEl: selector } : {}),
    })
  }
}

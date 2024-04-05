import Artalk from 'artalk'
import { useArtalkOptions } from '../helpers/index.js'
import type { UpdatePageview } from './typings.js'

export const isSupported = true

export const usePageview = (): UpdatePageview => {
  const { server, site } = useArtalkOptions()

  return ({ selector }) =>
    Artalk.loadCountWidget({
      server,
      site,
      ...(selector ? { countEl: selector } : {}),
    })
}

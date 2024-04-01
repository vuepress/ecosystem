import { resolveRoute as _resolveRoute } from 'vuepress/client'
import type { Route, RouteMeta } from 'vuepress/client'
import { isLinkAbsolute } from '../../shared/index.js'

const FAKE_HOST = 'http://.'

// FIXME: ResolvedRoute is currently not exported
interface ResolvedRoute<T extends RouteMeta = RouteMeta> extends Route<T> {
  path: string
  notFound: boolean
}

export const resolveRoute = <T extends RouteMeta>(
  path: string,
  current?: string,
): ResolvedRoute<T> => {
  if (isLinkAbsolute(path) || typeof current !== 'string')
    return _resolveRoute<T>(path)

  // Inner relative path
  const loc = current.slice(0, current.lastIndexOf('/'))

  return _resolveRoute<T>(
    new URL(`${loc}/${encodeURI(path)}`, FAKE_HOST).pathname,
  )
}

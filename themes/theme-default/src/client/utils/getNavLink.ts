import type { Router } from 'vue-router'
import type { NavLink } from '../../shared/index.js'
import { getResolveRouteWithRedirect } from './getResolveRouteWithRedirect.js'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

/**
 * Resolve NavLink props from string
 *
 * @example
 * - Input: '/README.md'
 * - Output: { text: 'Home', link: '/' }
 */
export const getNavLink = (router: Router, item: string): NavLink => {
  // the route path of vue-router is url-encoded, and we expect users are using
  // non-url-encoded string in theme config, so we need to url-encode it first to
  // resolve the route correctly
  const resolved = getResolveRouteWithRedirect(router, encodeURI(item))
  return {
    text: resolved.meta.title || item,
    link: resolved.name === '404' ? item : resolved.fullPath,
  }
}

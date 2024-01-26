import type { Router } from 'vue-router'
import { isFunction, isString } from 'vuepress/shared'

/**
 * Resolve a route with redirection
 */
export const getResolveRouteWithRedirect = (
  router: Router,
  ...args: Parameters<Router['resolve']>
): ReturnType<Router['resolve']> => {
  const route = router.resolve(...args)
  const lastMatched = route.matched[route.matched.length - 1]
  if (!lastMatched?.redirect) {
    return route
  }
  const { redirect } = lastMatched
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect
  const resolvedRedirectObj = isString(resolvedRedirect)
    ? { path: resolvedRedirect }
    : resolvedRedirect
  return getResolveRouteWithRedirect(router, {
    hash: route.hash,
    query: route.query,
    params: route.params,
    ...resolvedRedirectObj,
  })
}

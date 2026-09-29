import { START_LOCATION, createMemoryHistory, createRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { resolveRoute } from 'vuepress/client'

import type { TestRouteOptions } from '../shared/types.js'
import { setTestRoutes } from './state.js'

/**
 * Options to create a test router
 *
 * 创建测试路由的选项
 */
export interface TestRouterOptions {
  /**
   * Base of the site
   *
   * 站点的 base
   *
   * @default '/'
   */
  base?: string

  /**
   * Initial route path
   *
   * 初始路由路径
   *
   * @default '/'
   */
  initialPath?: string

  /**
   * Redirects of the site
   *
   * 站点的重定向
   */
  redirects?: Record<string, string>

  /**
   * Routes of the site
   *
   * 站点的路由
   */
  routes?: Record<string, TestRouteOptions>
}

/**
 * Create a memory-history vue-router for testing
 *
 * It registers the given routes to `vuepress/client` and resolves the initial
 * route, so that `useRoute()`, `useRouter()`, `RouteLink` and `AutoLink` work
 * as they do in a real VuePress app.
 *
 * 创建用于测试的内存路由
 *
 * 它会把给定路由注册到 `vuepress/client` 并解析初始路由，使 `useRoute()`、`useRouter()`、`RouteLink`
 * 与 `AutoLink` 的行为与真实 VuePress app 一致。
 *
 * @example
 *   const router = await createTestRouter({
 *     initialPath: '/guide/',
 *     routes: { '/guide/': { component: Guide } },
 *   })
 *
 * @param options - Router options / 路由选项
 * @returns The ready router / 已就绪的路由
 */
export const createTestRouter = async (
  options: TestRouterOptions = {},
): Promise<Router> => {
  const { base = '/', initialPath = '/', redirects = {}, routes = {} } = options

  setTestRoutes(routes, redirects)

  const router = createRouter({
    history: createMemoryHistory(base),
    routes: [
      {
        components: {},
        name: 'vuepress-route',
        path: '/:catchAll(.*)',
      },
    ],
    scrollBehavior: (to, _from, savedPosition) => {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }

      return { top: 0 }
    },
  })

  router.beforeResolve(async (to, from) => {
    let redirect: string | undefined

    if (to.path === from.path && from !== START_LOCATION) {
      to.meta = from.meta
    } else {
      const route = resolveRoute(to.fullPath)

      if (route.path === to.fullPath)
        to.meta = { ...route.meta, _pageChunk: await route.loader() }
      else redirect = route.path
    }

    return redirect
  })

  await router.push(initialPath)
  await router.isReady()

  return router
}

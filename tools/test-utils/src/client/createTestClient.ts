import type { VueWrapper } from '@vue/test-utils'
import type { App, Component, Ref } from 'vue'
import { computed, createSSRApp, defineComponent, h, shallowRef } from 'vue'
import type { Router } from 'vue-router'
import type {
  ClientConfig,
  ClientData,
  Layouts,
  PageChunk,
  PageData,
  PageHead,
  SiteData,
} from 'vuepress/client'
import {
  ClientOnly,
  Content,
  RouteLink,
  clientDataSymbol,
  resolvers,
  updateHeadSymbol,
  usePageLayout,
} from 'vuepress/client'

import type { TestClientOptions, TestPageOptions } from '../shared/types.js'
import { createTestRouter } from './createTestRouter.js'
import {
  getRoutesState,
  getSiteData,
  setClientConfigs,
  setSiteData,
  setThemeData,
} from './state.js'

/**
 * Options to mount a test client
 *
 * 挂载测试客户端的选项
 */
export interface TestMountOptions {
  /**
   * Element to attach the app to
   *
   * App 挂载的元素
   */
  attachTo?: Element
}

/**
 * A VuePress test client
 *
 * 一个 VuePress 测试客户端
 */
export interface TestClient {
  /**
   * Client configs that are applied
   *
   * 已应用的客户端配置
   */
  clientConfigs: ClientConfig[]

  /**
   * Client data that is provided to the app
   *
   * 提供给 app 的客户端数据
   */
  clientData: ClientData

  /**
   * Head configs that have been committed with `useUpdateHead()`
   *
   * 通过 `useUpdateHead()` 提交的 head 配置
   */
  headUpdates: PageHead[]

  /**
   * Mount the app to the DOM with `@vue/test-utils`
   *
   * It requires `@vue/test-utils` and a DOM environment (e.g. `happy-dom`).
   *
   * 使用 `@vue/test-utils` 将 app 挂载到 DOM
   *
   * 它需要 `@vue/test-utils` 与 DOM 环境（如 `happy-dom`）。
   *
   * @param options - Mount options / 挂载选项
   * @returns The mounted wrapper / 挂载后的 wrapper
   */
  mount: (options?: TestMountOptions) => Promise<VueWrapper>

  /**
   * Render the app to an HTML string
   *
   * It works in the `node` environment, and does not need `@vue/test-utils`.
   *
   * 将 app 渲染为 HTML 字符串
   *
   * 它可在 `node` 环境下工作，且不需要 `@vue/test-utils`。
   *
   * @returns The rendered HTML / 渲染后的 HTML
   */
  renderToString: () => Promise<string>

  /**
   * The test router
   *
   * 测试路由
   */
  router: Router

  /**
   * The injected `updateHead` util
   *
   * 注入的 `updateHead` 工具
   */
  updateHead: () => void
}

interface TestClientContext {
  clientConfigs: ClientConfig[]
  clientData: ClientData
  enhanceResults: Promise<void>[]
  router: Router
  siteData: Ref<SiteData>
  updateHead: () => void
}

const globals = globalThis as Record<string, unknown>

/**
 * Toggle the runtime `__VUEPRESS_SSR__` global
 *
 * It is a runtime global instead of a compile-time define, because a unit test
 * may render both as a string (`true`) and in the DOM (`false`).
 *
 * 切换运行时的 `__VUEPRESS_SSR__` 全局变量
 *
 * 它是运行时全局变量而非编译期 define，因为单元测试可能既以字符串形式（`true`）渲染，也在 DOM 中（`false`）渲染。
 *
 * @param ssr - Whether to simulate the SSR mode / 是否模拟 SSR 模式
 */
export const setSsr = (ssr: boolean): void => {
  globals.__VUEPRESS_SSR__ = ssr
}

const createPageData = (
  {
    data = {},
    frontmatter = {},
    lang = '',
    path = '/',
    title = '',
  }: TestPageOptions,
  fallbackPath = '/',
): PageData => ({
  ...data,
  frontmatter,
  lang,
  path: path || fallbackPath,
  title,
})

const createContentComponent = (content: Component | string): Component =>
  typeof content === 'string'
    ? defineComponent({
        name: 'VuepressTestContent',
        setup: () => () => h('div', { innerHTML: content }),
      })
    : content

const createAppRoot = (
  clientConfigs: ClientConfig[],
  rootComponent?: Component,
): Component =>
  defineComponent({
    name: 'VuepressTestRoot',
    setup() {
      for (const clientConfig of clientConfigs) clientConfig.setup?.()

      if (rootComponent) return () => h(rootComponent)

      const pageLayout = usePageLayout()
      const components = clientConfigs.flatMap(({ rootComponents = [] }) =>
        rootComponents.map((component) => h(component)),
      )

      return () => [h(pageLayout.value), components]
    },
  })

const createClientData = (
  router: Router,
  clientConfigs: ClientConfig[],
  optionLayouts: Record<string, Component>,
  initialPageData: PageData,
): {
  clientData: ClientData
  headUpdates: PageHead[]
  siteData: Ref<SiteData>
  updateHead: () => void
} => {
  const routesState = getRoutesState()
  const siteData = shallowRef(getSiteData())
  const routes = shallowRef(routesState.routes)
  const redirects = shallowRef(routesState.redirects)

  const routePath = computed(() => router.currentRoute.value.path)
  const routeLocale = computed(() =>
    resolvers.resolveRouteLocale(siteData.value.locales, routePath.value),
  )
  const siteLocaleData = computed(() =>
    resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value),
  )

  const pageChunk = computed<PageChunk>(
    () =>
      (router.currentRoute.value.meta._pageChunk as PageChunk | undefined) ?? {
        _pageData: initialPageData,
        default: (): null => null,
      },
  )
  const pageData = computed(() => pageChunk.value._pageData)
  const pageFrontmatter = computed(() => pageData.value.frontmatter)
  const pageComponent = computed(() => pageChunk.value.default)

  const pageHeadTitle = computed(() =>
    resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value),
  )
  const pageHead = computed(() =>
    resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value,
    ),
  )
  const pageLang = computed(() =>
    resolvers.resolvePageLang(pageData.value, siteLocaleData.value),
  )

  const layouts = computed<Layouts>(() => {
    const overrides = {
      ...resolvers.resolveLayouts(clientConfigs),
      ...optionLayouts,
    } as Record<string, Component>

    return {
      Layout: overrides.Layout ?? Content,
      NotFound: overrides.NotFound ?? Content,
      ...overrides,
    }
  })
  const pageLayout = computed(() =>
    resolvers.resolvePageLayout(pageData.value, layouts.value),
  )

  const headUpdates: PageHead[] = []
  const updateHead = (): void => {
    headUpdates.push(pageHead.value)
  }

  return {
    clientData: {
      frontmatter: pageFrontmatter,
      head: pageHead,
      headTitle: pageHeadTitle,
      lang: pageLang,
      layouts,
      page: pageData,
      pageComponent,
      pageData,
      pageFrontmatter,
      pageHead,
      pageHeadTitle,
      pageLang,
      pageLayout,
      redirects,
      routeLocale,
      routePath,
      routes,
      site: siteData,
      siteData,
      siteLocale: siteLocaleData,
      siteLocaleData,
    },
    headUpdates,
    siteData,
    updateHead,
  }
}

const setupClientConfigs = (context: TestClientContext, app: App): void => {
  const { clientConfigs, enhanceResults, router, siteData } = context

  for (const clientConfig of clientConfigs) {
    const result = clientConfig.enhance?.({ app, router, siteData })

    if (result) enhanceResults.push(Promise.resolve(result))
  }
}

const installApp = (context: TestClientContext, app: App): App => {
  const { clientData, updateHead } = context

  app.provide(clientDataSymbol, clientData)
  app.provide(updateHeadSymbol, updateHead)
  app.component('ClientOnly', ClientOnly)
  app.component('Content', Content)
  app.component('RouteLink', RouteLink)

  return app
}

/**
 * Create a VuePress test client
 *
 * It provides the client data, the router and the generated modules that
 * `vuepress/client` needs, so that the client code of a plugin or a theme can
 * be rendered and interacted with in a unit test.
 *
 * 创建 VuePress 测试客户端
 *
 * 它提供 `vuepress/client` 所需的客户端数据、路由与生成模块，使插件或主题的客户端代码可以在单元测试中被渲染与交互。
 *
 * @example
 *   const client = await createTestClient({
 *     page: { path: '/', title: 'Home' },
 *     content: MyContent,
 *   })
 *
 *   expect(await client.renderToString()).toContain('Home')
 *
 * @param options - Options to create the test client / 创建测试客户端的选项
 * @returns The test client / 测试客户端
 */
export const createTestClient = async (
  options: TestClientOptions = {},
): Promise<TestClient> => {
  const {
    base = '/',
    clientConfigs = [],
    content = (): null => null,
    layouts: optionLayouts = {},
    page = {},
    redirects = {},
    rootComponent,
    route,
    routes: optionRoutes = {},
    site = {},
    ssr,
    themeData = {},
  } = options

  const routePath = route ?? page.path ?? '/'
  const initialPageData = createPageData({ ...page, path: routePath })

  setSiteData({ base, ...site })
  setThemeData(themeData)
  setClientConfigs(clientConfigs)

  const router = await createTestRouter({
    base,
    initialPath: routePath,
    redirects,
    routes: {
      ...optionRoutes,
      [routePath]: {
        component: createContentComponent(content),
        pageData: initialPageData,
      },
    },
  })

  const { clientData, headUpdates, siteData, updateHead } = createClientData(
    router,
    clientConfigs,
    optionLayouts,
    initialPageData,
  )

  const context: TestClientContext = {
    clientConfigs,
    clientData,
    enhanceResults: [],
    router,
    siteData,
    updateHead,
  }

  const root = createAppRoot(clientConfigs, rootComponent)

  return {
    clientConfigs,
    clientData,
    headUpdates,

    mount: async (mountOptions: TestMountOptions = {}): Promise<VueWrapper> => {
      setSsr(ssr ?? false)

      const { mount } = await import('@vue/test-utils')
      const wrapper = mount(root, {
        ...(mountOptions.attachTo ? { attachTo: mountOptions.attachTo } : {}),
        global: {
          components: { ClientOnly, Content, RouteLink },
          plugins: [
            (app: App): void => {
              setupClientConfigs(context, app)
            },
            router,
          ],
          provide: {
            [clientDataSymbol as symbol]: clientData,
            [updateHeadSymbol as symbol]: updateHead,
          },
        },
      })

      await Promise.all(context.enhanceResults)

      return wrapper
    },

    renderToString: async (): Promise<string> => {
      setSsr(ssr ?? true)

      const { renderToString: render } = await import('vue/server-renderer')
      const app = installApp(context, createSSRApp(root))

      setupClientConfigs(context, app)
      app.use(router)

      await Promise.all(context.enhanceResults)

      return render(app)
    },

    router,
    updateHead,
  }
}

// @vitest-environment happy-dom

import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { describe, expect, it, vi } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h, onMounted } from 'vue'

import type {
  PageviewOptions,
  UpdatePageview,
} from '../../src/client/pageview/typings.js'
import type { CommentPluginOptions } from '../../src/node/index.js'
import { commentPlugin } from '../../src/node/index.js'

const mocks = vi.hoisted(() => ({
  loadCountWidget: vi.fn<(options: Record<string, unknown>) => void>(),
  pageviewCount: vi.fn<(options: Record<string, unknown>) => void>(),
}))

// oxlint-disable-next-line vitest/prefer-import-in-mock
vi.mock('@waline/client/pageview', () => ({
  pageviewCount: mocks.pageviewCount,
}))

// oxlint-disable-next-line vitest/prefer-import-in-mock
vi.mock('artalk/dist/Artalk.mjs', () => ({
  default: { loadCountWidget: mocks.loadCountWidget },
}))

type PageviewModule = 'artalk' | 'noop' | 'waline'

interface PageviewChunk {
  isSupported: boolean
  usePageview: () => UpdatePageview
}

const pageviewLoaders: Record<PageviewModule, () => Promise<PageviewChunk>> = {
  artalk: () => import('../../src/client/pageview/artalk.js'),
  noop: () => import('../../src/client/pageview/noop.js'),
  waline: () => import('../../src/client/pageview/waline.js'),
}

/**
 * Load a pageview chunk the way the plugin aliases it for a provider, run its
 * update function inside a component and report whether the chunk is supported
 *
 * The pageview implementations read the comment options through `inject`, so
 * they are exercised through a mounted component rather than called directly.
 *
 * @param module - The pageview chunk to load / 要加载的 pageview 块
 * @param options - The comment plugin options / 评论插件配置
 * @param pageviewOptions - The options passed to the update function /
 *   传给更新函数的选项
 * @returns Whether the chunk reports pageview support / 该块是否报告支持访问量
 */
const runPageview = async (
  module: PageviewModule,
  options: CommentPluginOptions,
  pageviewOptions: PageviewOptions = {},
): Promise<boolean> => {
  const app = await createTestApp({ plugins: [commentPlugin(options)] })

  try {
    const restore = stubClientDefines(await collectClientDefines(app))

    try {
      vi.resetModules()

      const [
        { mountVuePress },
        { injectCommentConfig },
        { defineClientConfig },
        pageview,
      ] = await Promise.all([
        import('@vuepress/test-utils/client'),
        import('../../src/client/helpers/index.js'),
        import('vuepress/client'),
        pageviewLoaders[module](),
      ])

      const clientConfig = defineClientConfig({
        enhance: ({ app: vueApp }) => {
          injectCommentConfig(vueApp)
        },
      })

      const Probe: Component = defineComponent({
        name: 'PageviewProbe',
        setup() {
          const updatePageview = pageview.usePageview()

          onMounted(() => {
            updatePageview(pageviewOptions)
          })

          return (): ReturnType<typeof h> => h('div')
        },
      })

      await mountVuePress({
        clientConfigs: [clientConfig],
        page: { path: '/', title: 'Home' },
        rootComponent: Probe,
        site: { lang: 'en-US', title: 'Site' },
      })

      return pageview.isSupported
    } finally {
      restore()
    }
  } finally {
    app.cleanup()
  }
}

describe('pageview chunks', () => {
  it('should count the pageviews with the waline server url and the options', async () => {
    mocks.pageviewCount.mockClear()

    const isSupported = await runPageview(
      'waline',
      { provider: 'Waline', serverURL: 'https://waline.example.com' },
      { selector: '.vp-pageview' },
    )

    expect(isSupported).toBe(true)
    expect(mocks.pageviewCount).toHaveBeenCalledWith({
      selector: '.vp-pageview',
      serverURL: 'https://waline.example.com',
    })
  })

  it('should load the artalk count widget with the server and the site', async () => {
    mocks.loadCountWidget.mockClear()

    const isSupported = await runPageview(
      'artalk',
      {
        provider: 'Artalk',
        server: 'https://artalk.example.com',
        site: 'my-site',
      },
      { selector: '.vp-pageview' },
    )

    expect(isSupported).toBe(true)
    expect(mocks.loadCountWidget).toHaveBeenCalledWith({
      countEl: '.vp-pageview',
      server: 'https://artalk.example.com',
      site: 'my-site',
    })
  })

  it('should report the noop chunk of an unsupported provider', async () => {
    const isSupported = await runPageview('noop', {
      provider: 'Giscus',
      repo: 'vuepress/ecosystem',
    })

    expect(isSupported).toBe(false)
    expect(mocks.pageviewCount).not.toHaveBeenCalled()
    expect(mocks.loadCountWidget).not.toHaveBeenCalled()
  })
})

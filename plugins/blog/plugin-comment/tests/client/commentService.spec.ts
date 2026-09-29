// @vitest-environment happy-dom

import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { describe, expect, it, vi } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'

import { stubModule } from '../../../../../tools/test-utils/src/node/stubModule.js'
import type { CommentPluginOptions } from '../../src/node/index.js'
import { commentPlugin } from '../../src/node/index.js'

/**
 * Stub of the aliased `@vuepress/plugin-comment/service` module
 *
 * It renders the props and attributes the service receives, so that the gating
 * done by `CommentService` can be observed without loading a real provider.
 */
const CommentProviderStub: Component = defineComponent({
  name: 'CommentProviderStub',
  inheritAttrs: false,
  props: { identifier: { default: '', type: String } },
  setup(props, { attrs }) {
    return (): ReturnType<typeof h> =>
      h('div', {
        ...attrs,
        'class': 'provider-stub',
        'data-identifier': props.identifier,
      })
  },
})

/**
 * Render the comment service component with the defines of a real plugin
 *
 * The component reads the comment options through `inject`, and the provider is
 * the alias resolved by the plugin, so both are set up here.
 *
 * @param options - The comment plugin options / 评论插件配置
 * @param page - The page data of the rendered page / 渲染页面的页面数据
 * @returns The rendered HTML / 渲染出的 HTML
 */
const renderService = async (
  options: CommentPluginOptions,
  page: { frontmatter?: Record<string, unknown>; path: string },
): Promise<string> => {
  const app = await createTestApp({ plugins: [commentPlugin(options)] })

  try {
    const restore = stubClientDefines(await collectClientDefines(app))

    try {
      stubModule('@vuepress/plugin-comment/service', {
        default: CommentProviderStub,
      })

      vi.resetModules()

      const [
        { renderVuePress },
        { injectCommentConfig },
        { defineClientConfig },
        { default: CommentService },
      ] = await Promise.all([
        import('@vuepress/test-utils/client'),
        import('../../src/client/helpers/index.js'),
        import('vuepress/client'),
        import('../../src/client/components/CommentService.js'),
      ])

      return await renderVuePress({
        clientConfigs: [
          defineClientConfig({
            enhance: ({ app: vueApp }) => {
              injectCommentConfig(vueApp)
            },
          }),
        ],
        page,
        rootComponent: CommentService,
        site: { lang: 'en-US', title: 'Site' },
      })
    } finally {
      restore()
    }
  } finally {
    app.cleanup()
  }
}

describe('comment service gating', () => {
  it('should use the page path as the identifier by default', async () => {
    const html = await renderService({ provider: 'Giscus' }, { path: '/page/' })

    expect(html).toContain('data-identifier="/page/"')
    expect(html).not.toContain('display:none')
  })

  it('should use the commentID frontmatter as the identifier', async () => {
    const html = await renderService(
      { provider: 'Giscus' },
      { frontmatter: { commentID: 'custom-id' }, path: '/page/' },
    )

    expect(html).toContain('data-identifier="custom-id"')
  })

  it('should hide the comments when the frontmatter disables them', async () => {
    const html = await renderService(
      { provider: 'Giscus' },
      { frontmatter: { comment: false }, path: '/page/' },
    )

    expect(html).toContain('provider-stub')
    expect(html).toContain('display:none')
  })

  it('should hide the comments when the plugin option disables them', async () => {
    const html = await renderService(
      { comment: false, provider: 'Giscus' },
      { path: '/page/' },
    )

    expect(html).toContain('display:none')
  })

  it('should let the frontmatter enable the comments disabled by the option', async () => {
    const html = await renderService(
      { comment: false, provider: 'Giscus' },
      { frontmatter: { comment: true }, path: '/page/' },
    )

    expect(html).not.toContain('display:none')
  })
})

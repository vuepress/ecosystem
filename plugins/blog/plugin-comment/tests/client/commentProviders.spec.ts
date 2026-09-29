import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { describe, expect, it, vi } from 'vitest'
import type { Component, VNode } from 'vue'
import { defineComponent, h } from 'vue'

import type { CommentPluginOptions } from '../../src/node/index.js'
import { commentPlugin } from '../../src/node/index.js'

type Provider = 'Artalk' | 'Giscus' | 'Twikoo' | 'Waline'

const componentLoaders: Record<
  Provider,
  () => Promise<{ default: Component }>
> = {
  Artalk: () => import('../../src/client/components/ArtalkComment.js'),
  Giscus: () => import('../../src/client/components/GiscusComment.js'),
  Twikoo: () => import('../../src/client/components/TwikooComment.js'),
  Waline: () => import('../../src/client/components/WalineComment.js'),
}

/**
 * Render a comment provider component with the options a real plugin passes to
 * the client
 *
 * The plugin options are collected from the real plugin (`define` hook) and are
 * stubbed before the component is imported, because the comment helpers read
 * `__COMMENT_OPTIONS__` at module scope.
 *
 * @param provider - The comment provider / 评论服务
 * @param options - The comment plugin options / 评论插件配置
 * @param props - The props of the comment component / 评论组件属性
 * @returns The rendered HTML / 渲染出的 HTML
 */
const renderComment = async (
  provider: Provider,
  options: CommentPluginOptions,
  props: Record<string, unknown> = {},
): Promise<string> => {
  const app = await createTestApp({ plugins: [commentPlugin(options)] })

  try {
    const restore = stubClientDefines(await collectClientDefines(app))

    try {
      vi.resetModules()

      const [
        { renderVuePress },
        { injectCommentConfig },
        { defineClientConfig },
        { default: commentComponent },
      ] = await Promise.all([
        import('@vuepress/test-utils/client'),
        import('../../src/client/helpers/index.js'),
        import('vuepress/client'),
        componentLoaders[provider](),
      ])

      const clientConfig = defineClientConfig({
        enhance: ({ app: vueApp }) => {
          injectCommentConfig(vueApp)
        },
      })

      const wrapper = defineComponent({
        name: 'CommentWrapper',
        setup: (): (() => VNode) => () =>
          h(commentComponent, {
            identifier: '/page/',
            ...props,
          }),
      })

      return await renderVuePress({
        clientConfigs: [clientConfig],
        page: { path: '/page/', title: 'Page' },
        rootComponent: wrapper,
        site: { lang: 'en-US', title: 'Site' },
      })
    } finally {
      restore()
    }
  } finally {
    app.cleanup()
  }
}

describe('comment provider components', () => {
  it('should render the giscus widget container when it is configured', async () => {
    const html = await renderComment('Giscus', {
      provider: 'Giscus',
      repo: 'vuepress/ecosystem',
      repoId: 'R_123',
      category: 'Comments',
      categoryId: 'DIC_123',
    })

    expect(html).toContain('class="giscus-wrapper input-top"')
    expect(html).toContain('id="comment"')
  })

  it('should render nothing when giscus is not fully configured', async () => {
    const html = await renderComment('Giscus', {
      provider: 'Giscus',
      repo: 'vuepress/ecosystem',
    })

    expect(html).not.toContain('giscus-wrapper')
  })

  it('should move the giscus input below the comments when inputPosition is bottom', async () => {
    const html = await renderComment('Giscus', {
      provider: 'Giscus',
      category: 'Comments',
      categoryId: 'DIC_123',
      inputPosition: 'bottom',
      repo: 'vuepress/ecosystem',
      repoId: 'R_123',
    })

    expect(html).toContain('class="giscus-wrapper"')
    expect(html).not.toContain('input-top')
  })

  it('should render the artalk container when the server is configured', async () => {
    const html = await renderComment('Artalk', {
      provider: 'Artalk',
      server: 'https://artalk.example.com',
    })

    expect(html).toContain('class="artalk-wrapper"')
  })

  it('should render nothing when the artalk server is missing', async () => {
    const html = await renderComment('Artalk', { provider: 'Artalk' })

    expect(html).not.toContain('artalk-wrapper')
  })

  it('should render the twikoo container when envId is configured', async () => {
    const html = await renderComment('Twikoo', {
      provider: 'Twikoo',
      envId: 'https://twikoo.example.com',
    })

    expect(html).toContain('class="twikoo-wrapper"')
    expect(html).toContain('id="twikoo-comment"')
  })

  it('should render nothing when the twikoo envId is missing', async () => {
    const html = await renderComment('Twikoo', { provider: 'Twikoo' })

    expect(html).not.toContain('twikoo-wrapper')
  })

  it('should render the waline container when serverURL is configured', async () => {
    const html = await renderComment('Waline', {
      provider: 'Waline',
      serverURL: 'https://waline.example.com',
    })

    expect(html).toContain('class="waline-wrapper"')
  })

  it('should render nothing when the waline serverURL is missing', async () => {
    const html = await renderComment('Waline', { provider: 'Waline' })

    expect(html).not.toContain('waline-wrapper')
  })
})

// @vitest-environment happy-dom

import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component, VNode } from 'vue'
import { defineComponent, h, resolveComponent } from 'vue'

import VPPreview from '../../src/client/components/VPPreview.js'
import previewClientConfig from '../../src/client/config.js'
import { markdownPreviewPlugin } from '../../src/node/index.js'

const previewSlots = {
  content: (): VNode => h('div', { class: 'demo' }, 'demo content'),
  code: (): VNode => h('pre', { class: 'source' }, 'source code'),
}

const locales = { '/': { toggle: 'Toggle code' } }

const createPreviewHost = (title?: string): Component =>
  defineComponent({
    name: 'PreviewHost',
    setup: (): (() => VNode) => () =>
      h(VPPreview, { locales, title }, previewSlots),
  })

describe('preview', () => {
  it('should render the demo and the collapsed source code by default', async () => {
    const html = await renderVuePress({
      rootComponent: createPreviewHost(),
    })

    expect(html).toContain('class="vp-preview"')
    expect(html).not.toContain('is-expanded')
    expect(html).toContain('demo content')
    expect(html).toContain('source code')
    expect(html).toContain('aria-expanded="false"')
    expect(html).toContain('style="height:0;"')
  })

  it('should render the toggle button with the localized label', async () => {
    const html = await renderVuePress({
      rootComponent: createPreviewHost(),
    })

    expect(html).toContain('class="vp-preview-toggle-button"')
    expect(html).toContain('title="Toggle code"')
    expect(html).toContain('aria-label="Toggle code"')
  })

  it('should render the decoded title', async () => {
    const html = await renderVuePress({
      rootComponent: createPreviewHost('My%20Preview'),
    })

    expect(html).toContain('class="vp-preview-title"')
    expect(html).toContain('My Preview')
  })

  it('should expand and collapse the source code on toggle', async () => {
    const wrapper = await mountVuePress({
      rootComponent: createPreviewHost(),
    })
    const root = wrapper.find('.vp-preview')

    expect(root.classes()).not.toContain('is-expanded')

    await wrapper.find('.vp-preview-toggle-button').trigger('click')

    expect(root.classes()).toContain('is-expanded')
    expect(
      wrapper.find('.vp-preview-toggle-button').attributes('aria-expanded'),
    ).toBe('true')

    await wrapper.find('.vp-preview-toggle-button').trigger('click')

    expect(root.classes()).not.toContain('is-expanded')
    expect(
      wrapper.find('.vp-preview-toggle-button').attributes('aria-expanded'),
    ).toBe('false')
  })

  it('should expand the source code before printing and collapse it after', async () => {
    const wrapper = await mountVuePress({
      rootComponent: createPreviewHost(),
    })
    const root = wrapper.find('.vp-preview')

    window.dispatchEvent(new Event('beforeprint'))
    await flushPromises()

    expect(root.classes()).toContain('is-expanded')

    window.dispatchEvent(new Event('afterprint'))
    await flushPromises()

    expect(root.classes()).not.toContain('is-expanded')
  })

  it('should use the locale defined in Node', async () => {
    const app = await createTestApp({
      plugins: [
        markdownPreviewPlugin({ locales: { '/': { toggle: '查看源码' } } }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__PREVIEW_LOCALES__).toMatchObject({
        '/': { toggle: '查看源码' },
      })

      const restore = stubClientDefines(defines)

      try {
        const Host = defineComponent({
          name: 'RegisteredPreviewHost',
          setup() {
            const component = resolveComponent('VPPreview')

            return (): VNode => h(component, { title: 'Demo' }, previewSlots)
          },
        })

        const wrapper = await mountVuePress({
          clientConfigs: [previewClientConfig],
          rootComponent: Host,
        })

        await flushPromises()

        expect(
          wrapper.find('.vp-preview-toggle-button').attributes('title'),
        ).toBe('查看源码')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })
})

import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'

import { VPIcon } from '../../src/client/components/VPIcon.js'

/**
 * Render VPIcon with props
 *
 * `renderVuePress()` renders the root component without props, so VPIcon is
 * wrapped in a component that passes them.
 *
 * @param props - Props to pass / 要传入的 props
 * @returns The rendered HTML / 渲染结果
 */
const render = (props: Record<string, unknown>): Promise<string> =>
  renderVuePress({
    rootComponent: defineComponent({
      name: 'IconFixture',
      setup: () => (): ReturnType<typeof h> => h(VPIcon as Component, props),
    }),
  })

describe('icon rendering', () => {
  it('should render an iconify icon as iconify-icon', async () => {
    const html = await render({ icon: 'lucide:home', type: 'iconify' })

    expect(html).toContain('<iconify-icon')
    expect(html).toContain('class="vp-icon"')
    expect(html).toContain('icon="lucide:home"')
  })

  it('should add the iconify prefix to an icon without a set', async () => {
    const html = await render({
      icon: 'home',
      prefix: 'lucide-',
      type: 'iconify',
    })

    expect(html).toContain('icon="lucide-home"')
  })

  it('should render a fontawesome icon with the resolved classes', async () => {
    const html = await render({ icon: 'fas:home', type: 'fontawesome' })

    expect(html).toContain('<i')
    expect(html).toContain('class="vp-icon fas fa-home"')
  })

  it('should render an iconfont icon with the prefix and the icon class', async () => {
    const html = await render({
      icon: 'home',
      prefix: 'icon-',
      type: 'iconfont',
    })

    expect(html).toContain('class="vp-icon icon-home"')
  })

  it('should render an unknown icon type as a plain class', async () => {
    const html = await render({ icon: 'home', prefix: 'my-' })

    expect(html).toContain('class="vp-icon my-home"')
  })

  it('should render nothing without an icon', async () => {
    const html = await render({})

    expect(html).not.toContain('vp-icon')
  })
})

describe('image icons', () => {
  it('should render an absolute path as an image', async () => {
    const html = await render({ icon: '/images/logo.png' })

    expect(html).toContain('<img')
    expect(html).toContain('src="/images/logo.png"')
    // decorative icons are hidden from assistive technology
    expect(html).toContain('aria-hidden')
  })

  it('should render an http link as an image', async () => {
    const html = await render({ icon: 'https://example.com/logo.png' })

    expect(html).toContain('src="https://example.com/logo.png"')
  })

  it('should not treat a relative path as an image', async () => {
    const html = await render({ icon: 'logo.png' })

    expect(html).not.toContain('<img')
    expect(html).toContain('<i')
  })
})

describe('icon attributes', () => {
  it('should forward the size and the color to the root element', async () => {
    const html = await render({ color: 'red', icon: 'home', size: 24 })

    expect(html).toMatch(/--icon-size:\s*24px/u)
    expect(html).toMatch(/color:\s*red/u)
  })

  it('should keep a css size unit', async () => {
    const html = await render({ icon: 'home', size: '2em' })

    expect(html).toMatch(/--icon-size:\s*2em/u)
  })

  it('should forward the vertical align and the class', async () => {
    const html = await render({
      class: 'my-icon',
      icon: 'home',
      verticalAlign: '-2px',
    })

    expect(html).toMatch(/--icon-vertical-align:\s*-2px/u)
    expect(html).toContain('my-icon')
  })
})

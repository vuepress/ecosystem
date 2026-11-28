import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'

import VPSocialLink from '../../src/client/theme-default/components/VPSocialLink.vue'

/**
 * Render a social link with props
 *
 * `renderVuePress()` renders the root component without props, so the link is
 * wrapped in a component that passes them.
 *
 * @param props - Props to pass / 要传入的 props
 * @returns The rendered HTML / 渲染结果
 */
const render = (props: Record<string, unknown>): Promise<string> =>
  renderVuePress({
    rootComponent: defineComponent({
      name: 'SocialLinkFixture',
      setup: () => (): ReturnType<typeof h> =>
        h(VPSocialLink as Component, {
          link: 'https://github.com/vuepress/ecosystem',
          me: false,
          ...props,
        }),
    }),
  })

describe('social link', () => {
  it('should render an svg icon without the icon plugin', async () => {
    const html = await render({
      icon: { svg: '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>' },
    })

    expect(html).toContain('class="vp-icon vp-icon-svg"')
    expect(html).toContain('<svg viewBox="0 0 24 24">')
  })

  it('should fall back to the letter of the label without the icon plugin', async () => {
    const html = await render({ ariaLabel: 'GitHub', icon: 'github' })

    expect(html).toContain('class="vp-icon vp-icon-fallback"')
    expect(html).toContain('G')
    expect(html).not.toContain('iconify-icon')
  })

  it('should render the link with its label and target', async () => {
    const html = await render({
      ariaLabel: 'GitHub repository',
      icon: 'github',
      link: 'https://github.com/vuepress/ecosystem',
    })

    expect(html).toContain('href="https://github.com/vuepress/ecosystem"')
    expect(html).toContain('aria-label="GitHub repository"')
    expect(html).toContain('target="_blank"')
  })
})

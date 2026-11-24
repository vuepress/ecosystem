// @vitest-environment happy-dom
import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'
import type { AutoLinkConfig } from 'vuepress/client'

import VPAutoLink from '../../src/client/components/VPAutoLink.vue'

/**
 * The links to render on the current page
 *
 * The current page is `/guide/foo.html`, so the links that resolve to it should
 * be marked, while the others should not.
 */
const links: AutoLinkConfig[] = [
  { link: '/guide/foo.html', text: 'Absolute' },
  { link: 'foo.html', text: 'Relative' },
  { link: '/guide/foo.html#section', text: 'Anchor' },
  { link: '/guide/bar.html', text: 'Other' },
  { link: 'bar.html', text: 'Other relative' },
  { link: 'https://example.com', text: 'External' },
  { link: '/guide/foo.html', target: '_blank', text: 'New tab' },
]

const AutoLinks = defineComponent({
  name: 'TestAutoLinks',
  setup(): () => VNode {
    return () =>
      h(
        'div',
        links.map((config) => h(VPAutoLink, { config })),
      )
  },
})

describe('auto link', () => {
  it('should render the icon of the link', async () => {
    const IconLink = defineComponent({
      name: 'TestIconLink',
      setup(): () => VNode {
        return () =>
          h(VPAutoLink, {
            config: {
              icon: 'vpi-github',
              link: '/guide/foo.html',
              text: 'GitHub',
            },
          })
      },
    })

    const wrapper = await mountVuePress({
      rootComponent: IconLink,
      page: { path: '/guide/foo.html', title: 'Foo' },
      site: { title: 'My Site' },
    })

    expect(wrapper.find('.vp-theme-icon.vpi-github').exists()).toBe(true)
  })

  it('should mark only the links to the current page', async () => {
    const wrapper = await mountVuePress({
      rootComponent: AutoLinks,
      page: { path: '/guide/foo.html', title: 'Foo' },
      site: { title: 'My Site' },
    })

    const getAriaCurrent = (text: string): string | undefined =>
      wrapper.get(`a[aria-label="${text}"]`).attributes('aria-current')

    expect(getAriaCurrent('Absolute')).toBe('page')
    expect(getAriaCurrent('Relative')).toBe('page')
    expect(getAriaCurrent('Anchor')).toBe('page')

    expect(getAriaCurrent('Other')).toBeUndefined()
    expect(getAriaCurrent('Other relative')).toBeUndefined()
    expect(getAriaCurrent('External')).toBeUndefined()
    expect(getAriaCurrent('New tab')).toBeUndefined()
  })
})

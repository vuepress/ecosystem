// @vitest-environment happy-dom
import { mountVuePress, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'

import { SlidePage } from '../../src/client/layouts/SlidePage.js'

describe('slide page layout', () => {
  it('should render the menu with the navigation buttons during SSR', async () => {
    const html = await renderVuePress({ rootComponent: SlidePage })

    expect(html).toContain('class="vp-reveal-page"')
    expect(html).toContain('class="menu-button"')
    expect(html).toContain('class="back-button"')
    expect(html).toContain('class="home-button"')
  })

  it('should open the menu on the toggle button', async () => {
    const wrapper = await mountVuePress({ rootComponent: SlidePage })

    expect(wrapper.find('.vp-reveal-menu').classes()).not.toContain('active')

    await wrapper.find('.menu-button').trigger('click')

    expect(wrapper.find('.vp-reveal-menu').classes()).toContain('active')
  })
})

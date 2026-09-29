import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
// @vitest-environment happy-dom
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import { setupViewPoint } from '../../src/client/composables/setupViewPoint.js'

const VIEWPORT_CONTENT =
  'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'

const ViewPointProbe = defineComponent({
  name: 'ViewPointProbe',
  setup() {
    setupViewPoint()

    return (): VNode => h('div', { class: 'probe' })
  },
})

const stubDisplayMode = (standalone: boolean): void => {
  vi.stubGlobal(
    'matchMedia',
    (query: string): MediaQueryList =>
      ({
        matches: standalone && query.includes('standalone'),
        media: query,
      }) as MediaQueryList,
  )
}

const removeViewportMeta = (): void => {
  for (const meta of document.head.querySelectorAll('meta[name="viewport"]'))
    meta.remove()
}

describe('standalone viewport setup', () => {
  it('creates the standalone viewport meta in standalone mode', async () => {
    removeViewportMeta()
    stubDisplayMode(true)

    await mountVuePress({ content: ViewPointProbe })

    expect(
      document.head
        .querySelector('meta[name="viewport"]')
        ?.getAttribute('content'),
    ).toBe(VIEWPORT_CONTENT)
  })

  it('does not touch the viewport when the browser is not standalone', async () => {
    removeViewportMeta()
    stubDisplayMode(false)

    await mountVuePress({ content: ViewPointProbe })

    expect(document.head.querySelector('meta[name="viewport"]')).toBeNull()
  })

  it('updates an existing viewport meta in standalone mode', async () => {
    removeViewportMeta()
    stubDisplayMode(true)

    const existing = document.createElement('meta')

    existing.name = 'viewport'
    existing.content = 'width=device-width'
    document.head.append(existing)

    await mountVuePress({ content: ViewPointProbe })

    expect(
      document.head.querySelectorAll('meta[name="viewport"]'),
    ).toHaveLength(1)
    expect(existing.getAttribute('content')).toBe(VIEWPORT_CONTENT)
  })
})

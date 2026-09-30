// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { createTestClient } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import { useActiveHeaderLinks } from '../../src/client/index.js'
import { activeHeaderLinksPlugin } from '../../src/node/index.js'

interface ScrollMetrics {
  scrollTop: number
  scrollHeight: number
  innerHeight: number
}

/**
 * Override the scroll metrics that the composable reads
 *
 * `happy-dom` returns `0` for all of them, so they have to be faked to make the
 * scroll position meaningful.
 *
 * The properties must stay writable: `vue-router` applies the hash of a route
 * change with `window.scrollTo()`, which assigns `scrollTop` again.
 */
const setScrollMetrics = ({
  scrollTop,
  scrollHeight,
  innerHeight,
}: ScrollMetrics): void => {
  for (const [target, key, value] of [
    [window, 'scrollY', scrollTop],
    [window, 'innerHeight', innerHeight],
    [document.documentElement, 'scrollTop', scrollTop],
    [document.documentElement, 'scrollHeight', scrollHeight],
    [document.body, 'scrollTop', 0],
    [document.body, 'scrollHeight', scrollHeight],
  ] as const) {
    Object.defineProperty(target, key, {
      configurable: true,
      value,
      writable: true,
    })
  }
}

/** Wait for the debounced scroll handler and the resulting route update */
const triggerScroll = async (): Promise<void> => {
  window.dispatchEvent(new Event('scroll'))
  await new Promise((resolve) => {
    setTimeout(resolve, 20)
  })
  await flushPromises()
}

const createProbe = (
  options: Parameters<typeof useActiveHeaderLinks>[0],
): ReturnType<typeof defineComponent> =>
  defineComponent({
    name: 'ActiveHeaderLinksProbe',
    setup() {
      useActiveHeaderLinks(options)

      return (): VNode =>
        h('div', { class: 'probe' }, [
          h('a', { class: 'header-link', href: '#a' }),
          h('a', { class: 'header-link', href: '#b' }),
          h(
            'div',
            { id: 'section-a' },
            h('a', { class: 'header-anchor', href: '#a' }),
          ),
          h(
            'div',
            { id: 'section-b' },
            h('a', { class: 'header-anchor', href: '#b' }),
          ),
        ])
    },
  })

const probeOptions = {
  headerAnchorSelector: '.header-anchor',
  headerLinkSelector: 'a.header-link',
  delay: 0,
  offset: 5,
}

/**
 * Give the fake offset of the sections that hold the anchors
 *
 * @param offsetA - The offset of the first section
 * @param offsetB - The offset of the second section
 */
const setSectionOffsets = (offsetA = 100, offsetB = 200): void => {
  const sections = document.querySelectorAll<HTMLElement>('.probe > div')

  Object.defineProperty(sections[0], 'offsetTop', {
    configurable: true,
    value: offsetA,
  })
  Object.defineProperty(sections[1], 'offsetTop', {
    configurable: true,
    value: offsetB,
  })
}

describe('active header links composable', () => {
  it('should set the route hash of the anchor at the scroll position', async () => {
    document.body.innerHTML = ''

    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: createProbe(probeOptions),
      route: '/guide/',
    })
    const wrapper = await client.mount({ attachTo: document.body })

    try {
      setSectionOffsets()

      setScrollMetrics({ innerHeight: 600, scrollHeight: 3000, scrollTop: 150 })
      await triggerScroll()
      expect(client.router.currentRoute.value.hash).toBe('#a')

      setScrollMetrics({ innerHeight: 600, scrollHeight: 3000, scrollTop: 250 })
      await triggerScroll()
      expect(client.router.currentRoute.value.hash).toBe('#b')
    } finally {
      wrapper.unmount()
    }
  })

  it('should clear the route hash at the page top', async () => {
    document.body.innerHTML = ''

    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: createProbe(probeOptions),
      route: '/guide/',
    })
    const wrapper = await client.mount({ attachTo: document.body })

    try {
      setSectionOffsets()

      setScrollMetrics({ innerHeight: 600, scrollHeight: 3000, scrollTop: 150 })
      await triggerScroll()
      expect(client.router.currentRoute.value.hash).toBe('#a')

      // within `offset` pixels of the top
      setScrollMetrics({ innerHeight: 600, scrollHeight: 3000, scrollTop: 2 })
      await triggerScroll()
      expect(client.router.currentRoute.value.hash).toBe('')
    } finally {
      wrapper.unmount()
    }
  })

  it('should ignore anchors without a matching header link', async () => {
    document.body.innerHTML = ''

    const OrphanProbe = defineComponent({
      name: 'OrphanProbe',
      setup() {
        useActiveHeaderLinks(probeOptions)

        return (): VNode =>
          h('div', { class: 'probe' }, [
            h('a', { class: 'header-link', href: '#a' }),
            h('a', { class: 'header-link', href: '#b' }),
            h(
              'div',
              { id: 'section-a' },
              h('a', { class: 'header-anchor', href: '#a' }),
            ),
            // there is no `a.header-link` pointing at `#orphan`
            h(
              'div',
              { id: 'section-orphan' },
              h('a', { class: 'header-anchor', href: '#orphan' }),
            ),
            h(
              'div',
              { id: 'section-b' },
              h('a', { class: 'header-anchor', href: '#b' }),
            ),
          ])
      },
    })

    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: OrphanProbe,
      route: '/guide/',
    })
    const wrapper = await client.mount({ attachTo: document.body })

    try {
      const sections = document.querySelectorAll<HTMLElement>('.probe > div')

      for (const [index, offsetTop] of [100, 200, 300].entries()) {
        Object.defineProperty(sections[index], 'offsetTop', {
          configurable: true,
          value: offsetTop,
        })
      }

      // the scroll position is above the orphan anchor
      setScrollMetrics({ innerHeight: 600, scrollHeight: 3000, scrollTop: 250 })
      await triggerScroll()

      expect(client.router.currentRoute.value.hash).toBe('#a')
    } finally {
      wrapper.unmount()
    }
  })

  it('should stop listening to scroll after unmount', async () => {
    document.body.innerHTML = ''

    const removeListenerSpy = vi.spyOn(window, 'removeEventListener')
    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: createProbe(probeOptions),
      route: '/guide/',
    })
    const wrapper = await client.mount({ attachTo: document.body })

    setSectionOffsets()

    setScrollMetrics({ innerHeight: 600, scrollHeight: 3000, scrollTop: 150 })
    await triggerScroll()
    expect(client.router.currentRoute.value.hash).toBe('#a')

    removeListenerSpy.mockClear()
    wrapper.unmount()

    expect(
      removeListenerSpy.mock.calls.some(([type]) => type === 'scroll'),
    ).toBe(true)

    removeListenerSpy.mockRestore()
  })
})

describe('active header links client config', () => {
  it('should apply the options defined in Node', async () => {
    document.body.innerHTML = ''

    const app = await createTestApp({
      plugins: [
        activeHeaderLinksPlugin({
          delay: 0,
          headerAnchorSelector: '.header-anchor',
          headerLinkSelector: 'a.custom-link',
          offset: 5,
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines).toMatchObject({
        __AHL_DELAY__: 0,
        __AHL_HEADER_ANCHOR_SELECTOR__: '.header-anchor',
        __AHL_HEADER_LINK_SELECTOR__: 'a.custom-link',
        __AHL_OFFSET__: 5,
      })

      const restore = stubClientDefines(defines)

      try {
        const { default: activeHeaderLinksClientConfig } =
          await import('../../src/client/config.js')

        const client = await createTestClient({
          clientConfigs: [activeHeaderLinksClientConfig],
          content: `
            <a class="custom-link" href="#a"></a>
            <div id="section-a"><a class="header-anchor" href="#a"></a></div>
          `,
          page: { path: '/guide/', title: 'Guide' },
          route: '/guide/',
        })
        const wrapper = await client.mount({ attachTo: document.body })

        try {
          const section = document.querySelector<HTMLElement>('#section-a')!

          Object.defineProperty(section, 'offsetTop', {
            configurable: true,
            value: 100,
          })

          setScrollMetrics({
            innerHeight: 600,
            scrollHeight: 3000,
            scrollTop: 150,
          })
          await triggerScroll()

          expect(client.router.currentRoute.value.hash).toBe('#a')
        } finally {
          wrapper.unmount()
        }
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })
})

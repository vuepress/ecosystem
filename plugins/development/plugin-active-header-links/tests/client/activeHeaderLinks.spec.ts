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
import { defineComponent, h, watch } from 'vue'
import { useRouter } from 'vuepress/client'

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
  onSetup?: () => void,
): ReturnType<typeof defineComponent> =>
  defineComponent({
    name: 'ActiveHeaderLinksProbe',
    setup() {
      useActiveHeaderLinks(options)

      onSetup?.()

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

interface ScrollToMock {
  scrollTo: { mockRestore: () => void }
  getPendingScrollTop: () => number | null
  resetPendingScrollTop: () => void
}

/**
 * Mock `window.scrollTo` to simulate how the browser handles smooth scrolling
 *
 * A smooth scroll does not move the page until the animation advances, so its
 * target is recorded as pending until an instant scroll aborts it.
 *
 * @returns The mocked `window.scrollTo` and the pending scroll target
 */
const mockScrollTo = (): ScrollToMock => {
  let pendingScrollTop: number | null = null

  const scrollTo = vi
    .spyOn(window, 'scrollTo')
    .mockImplementation((options: ScrollToOptions | number, y = 0) => {
      if (typeof options === 'number') {
        window.scrollY = y
      } else if (options.behavior === 'instant') {
        pendingScrollTop = null
        window.scrollY = options.top ?? 0
      } else {
        pendingScrollTop = options.top ?? 0
      }
    })

  return {
    scrollTo,
    getPendingScrollTop: () => pendingScrollTop,
    resetPendingScrollTop: () => {
      pendingScrollTop = null
    },
  }
}

const getRestoredScrollTop = (hash: string): number => (hash ? 200 : 0)

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

  it('should keep the scroll position when the route hash changes', async () => {
    document.body.innerHTML = ''

    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: createProbe(probeOptions),
      route: '/guide/',
    })
    const wrapper = await client.mount({ attachTo: document.body })
    const { replace } = client.router
    // the client restores the scroll position of the new route after the
    // navigation, which would move the page away from where the user scrolled
    vi.spyOn(client.router, 'replace').mockImplementation(async (to) => {
      const result = await replace(to)

      window.scrollY = 0

      return result
    })
    const { scrollTo } = mockScrollTo()

    try {
      setSectionOffsets()

      setScrollMetrics({ innerHeight: 600, scrollHeight: 3000, scrollTop: 250 })
      await triggerScroll()

      expect(client.router.currentRoute.value.hash).toBe('#b')
      expect(scrollTo).toHaveBeenLastCalledWith({
        behavior: 'instant',
        left: window.scrollX,
        top: 250,
      })
      expect(window.scrollY).toBe(250)
    } finally {
      scrollTo.mockRestore()
      wrapper.unmount()
    }
  })

  it('should abort the smooth scroll of the client scroll restoration', async () => {
    document.body.innerHTML = ''

    const { scrollTo, getPendingScrollTop, resetPendingScrollTop } =
      mockScrollTo()

    const client = await createTestClient({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: createProbe(probeOptions, () => {
        const router = useRouter()

        // mimic the client, which restores the scroll position of the route
        // after each route change, respecting `scroll-behavior: smooth`
        watch(
          () => router.currentRoute.value.fullPath,
          () => {
            window.scrollTo({
              top: getRestoredScrollTop(router.currentRoute.value.hash),
            })
          },
          { flush: 'post' },
        )
      }),
      route: '/guide/',
    })
    const wrapper = await client.mount({ attachTo: document.body })

    try {
      setSectionOffsets()

      // the router may have restored the scroll position of the initial route
      resetPendingScrollTop()

      setScrollMetrics({ innerHeight: 600, scrollHeight: 3000, scrollTop: 250 })
      await triggerScroll()

      expect(client.router.currentRoute.value.hash).toBe('#b')
      // the composable aborts the pending smooth scroll and restores the
      // position at once
      expect(scrollTo).toHaveBeenLastCalledWith({
        behavior: 'instant',
        left: window.scrollX,
        top: 250,
      })
      expect(getPendingScrollTop()).toBeNull()
      expect(window.scrollY).toBe(250)
    } finally {
      scrollTo.mockRestore()
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

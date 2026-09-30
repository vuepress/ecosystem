// @vitest-environment happy-dom

import { flushPromises } from '@vue/test-utils'
import { useRtl } from '@vuepress/plugin-rtl/client'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import {
  createTestClient,
  mountVuePress,
  renderVuePress,
} from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component, VNode } from 'vue'
import { defineComponent, h } from 'vue'

import rtlClientConfig from '../../src/client/config.js'
import { getElement } from '../../src/client/utils/index.js'
import { rtlPlugin } from '../../src/node/index.js'

const site = {
  locales: {
    '/': { lang: 'en-US' },
    '/ar/': { lang: 'ar' },
    '/en/': { lang: 'en-US' },
  },
}

const createRtlProbe = (
  locales: string[],
  selector?: Record<string, Record<string, string>>,
): Component =>
  defineComponent({
    name: 'RtlProbe',
    setup() {
      useRtl(locales, selector)

      return (): VNode => h('div', { class: 'probe' }, 'probe')
    },
  })

const resetDocument = (): void => {
  document.documentElement.removeAttribute('dir')
  document.documentElement.style.removeProperty('direction')
  document.body.className = ''
}

describe(useRtl, () => {
  it('should apply the rtl direction to the html element for an rtl locale', async () => {
    resetDocument()

    await mountVuePress({
      content: createRtlProbe(['/ar/']),
      page: { path: '/ar/' },
      site,
    })

    expect(document.documentElement.getAttribute('dir')).toBe('rtl')
    expect(document.documentElement.style.getPropertyValue('direction')).toBe(
      'rtl',
    )
  })

  it('should not apply the rtl direction for a non-rtl locale', async () => {
    resetDocument()

    await mountVuePress({
      content: createRtlProbe(['/ar/']),
      page: { path: '/en/' },
      site,
    })

    expect(document.documentElement.hasAttribute('dir')).toBe(false)
    expect(document.documentElement.style.getPropertyValue('direction')).toBe(
      '',
    )
  })

  it('should toggle a class on the configured selector', async () => {
    resetDocument()

    await mountVuePress({
      content: createRtlProbe(['/ar/'], { body: { class: 'rtl-layout' } }),
      page: { path: '/ar/' },
      site,
    })

    expect(document.body.classList.contains('rtl-layout')).toBe(true)
  })

  it('should remove the class when the locale is not rtl', async () => {
    resetDocument()

    await mountVuePress({
      content: createRtlProbe(['/ar/'], { body: { class: 'rtl-layout' } }),
      page: { path: '/en/' },
      site,
    })

    expect(document.body.classList.contains('rtl-layout')).toBe(false)
  })

  it('should flip the direction when navigating to another locale', async () => {
    resetDocument()

    const client = await createTestClient({
      content: createRtlProbe(['/ar/']),
      page: { path: '/ar/' },
      routes: {
        '/en/': {
          component: createRtlProbe(['/ar/']),
          pageData: { path: '/en/' },
        },
      },
      site,
    })

    const wrapper = await client.mount()

    expect(document.documentElement.getAttribute('dir')).toBe('rtl')

    await client.router.push('/en/')
    await flushPromises()

    expect(document.documentElement.hasAttribute('dir')).toBe(false)

    wrapper.unmount()
  })

  it('should not touch the document in SSR', async () => {
    resetDocument()

    await expect(
      renderVuePress({
        content: createRtlProbe(['/ar/']),
        page: { path: '/ar/' },
        site,
      }),
    ).resolves.toContain('probe')
  })
})

describe('rtl client config', () => {
  it('should apply the options defined in Node', async () => {
    resetDocument()

    const app = await createTestApp({
      plugins: [
        rtlPlugin({
          locales: ['/ar/'],
          selector: { html: { dir: 'rtl' } },
        }),
      ],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__RTL_LOCALES__).toStrictEqual(['/ar/'])
      expect(defines.__RTL_SELECTOR__).toStrictEqual({ html: { dir: 'rtl' } })

      const restore = stubClientDefines(defines)

      try {
        await mountVuePress({
          clientConfigs: [rtlClientConfig],
          content: 'content',
          page: { path: '/ar/' },
          site,
        })

        expect(document.documentElement.getAttribute('dir')).toBe('rtl')
      } finally {
        restore()
      }
    } finally {
      app.cleanup()
    }
  })

  it('should fall back to the default options', async () => {
    const app = await createTestApp({ plugins: [rtlPlugin()] })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__RTL_LOCALES__).toStrictEqual(['/'])
      expect(defines.__RTL_SELECTOR__).toStrictEqual({ html: { dir: 'rtl' } })
    } finally {
      app.cleanup()
    }
  })
})

describe(getElement, () => {
  it('should resolve the html and body elements', () => {
    expect(getElement('html')).toBe(document.documentElement)
    expect(getElement('body')).toBe(document.body)
  })

  it('should resolve a custom selector and return null when missing', () => {
    const element = document.createElement('div')

    element.className = 'target'
    document.body.append(element)

    expect(getElement('.target')).toBe(element)
    expect(getElement('.missing')).toBeNull()

    element.remove()
  })
})

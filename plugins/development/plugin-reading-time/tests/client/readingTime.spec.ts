import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { createTestClient, renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { VNode } from 'vue'
import { defineComponent, h } from 'vue'

import { readingTimePlugin } from '../../src/node/index.js'

/**
 * The reading time locale define is read at module scope, so it has to exist
 * before `src/client/index.js` is imported. It is filled with the real define
 * of the plugin in `setup()`, so the test cannot drift from the plugin.
 */
const readingTimeLocales = vi.hoisted(() => {
  const locales: Record<string, unknown> = {}

  ;(globalThis as Record<string, unknown>).__READING_TIME_LOCALES__ = locales

  return locales
})

const { useReadingTimeData, useReadingTimeLocale } =
  await import('../../src/client/index.js')

const Probe = defineComponent({
  name: 'ReadingTimeProbe',
  setup() {
    const data = useReadingTimeData()
    const locale = useReadingTimeLocale()

    return (): VNode =>
      h('div', [
        h(
          'span',
          { class: 'data' },
          data.value
            ? `${data.value.minutes}/${data.value.words}`
            : 'no reading time',
        ),
        h('span', { class: 'time' }, locale.value.time),
        h('span', { class: 'words' }, locale.value.words),
      ])
  },
})

const site = {
  locales: {
    '/': { lang: 'en-US', title: 'My Site' },
    '/zh/': { lang: 'zh-CN', title: '我的站点' },
  },
  title: 'My Site',
}

let setupPromise: Promise<void> | undefined

/** Create the test app once and fill the hoisted reading time locales */
const setup = async (): Promise<void> => {
  setupPromise ??= (async (): Promise<void> => {
    const app = await createTestApp({
      locales: { '/': { lang: 'en-US' }, '/zh/': { lang: 'zh-CN' } },
      plugins: [
        readingTimePlugin({
          // override the word template of the root locale, keep the time one
          locales: { '/': { word: 'Read $word words' } },
        }),
      ],
    })

    const defines = await collectClientDefines(app)

    Object.assign(
      readingTimeLocales,
      defines.__READING_TIME_LOCALES__ as Record<string, unknown>,
    )

    app.cleanup()
  })()

  await setupPromise
}

describe('reading time composables', () => {
  it('should render the reading time of the current page', async () => {
    await setup()

    const html = await renderVuePress({
      page: {
        data: { readingTime: { minutes: 2.5, words: 500 } },
        path: '/guide/',
        title: 'Guide',
      },
      rootComponent: Probe,
      site,
    })

    // `minutes` is rounded, and the word template comes from the Node option
    expect(html).toContain('<span class="time">About 3 min</span>')
    expect(html).toContain('<span class="words">Read 500 words</span>')
    expect(html).toContain('<span class="data">2.5/500</span>')
  })

  it('should use the sub-minute text when the reading time is below a minute', async () => {
    await setup()

    const html = await renderVuePress({
      page: {
        data: { readingTime: { minutes: 0.5, words: 150 } },
        path: '/guide/',
        title: 'Guide',
      },
      rootComponent: Probe,
      site,
    })

    expect(html).toContain('<span class="time">Less than 1 minute</span>')
  })

  it('should render the reading time in the locale of the current route', async () => {
    await setup()

    const html = await renderVuePress({
      page: {
        data: { readingTime: { minutes: 2.5, words: 500 } },
        path: '/zh/guide/',
        title: '指南',
      },
      rootComponent: Probe,
      site,
    })

    expect(html).toContain('<span class="time">大约 3 分钟</span>')
    expect(html).toContain('<span class="words">约 500 字</span>')
  })

  it('should render empty texts when the page has no reading time', async () => {
    await setup()

    const html = await renderVuePress({
      page: { path: '/guide/', title: 'Guide' },
      rootComponent: Probe,
      site,
    })

    expect(html).toContain('<span class="data">no reading time</span>')
    expect(html).toContain('<span class="time"></span>')
    expect(html).toContain('<span class="words"></span>')
  })

  it('should update when navigating to another page', async () => {
    await setup()

    const client = await createTestClient({
      page: {
        data: { readingTime: { minutes: 2.5, words: 500 } },
        path: '/guide/',
        title: 'Guide',
      },
      rootComponent: Probe,
      routes: {
        '/other/': {
          pageData: {
            frontmatter: {},
            lang: '',
            path: '/other/',
            readingTime: { minutes: 0.5, words: 150 },
            title: 'Other',
          },
        },
      },
      site,
    })

    await expect(client.renderToString()).resolves.toContain(
      '<span class="time">About 3 min</span>',
    )

    await client.router.push('/other/')

    const html = await client.renderToString()

    expect(html).toContain('<span class="time">Less than 1 minute</span>')
    expect(html).toContain('<span class="data">0.5/150</span>')
  })

  describe('getReadingTimeLocale', () => {
    it('should replace the placeholders of the given locale', async () => {
      const { getReadingTimeLocale } =
        await import('../../src/client/utils/index.js')

      expect(
        getReadingTimeLocale(
          { minutes: 2.5, words: 500 },
          {
            subMinute: 'Less than 1 min',
            time: '$time min',
            word: '$word words',
          },
        ),
      ).toStrictEqual({ time: '3 min', words: '500 words' })
    })
  })
})

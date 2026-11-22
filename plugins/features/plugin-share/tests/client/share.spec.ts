// @vitest-environment happy-dom
import { flushPromises } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { mountVuePress as mountVuePressType } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { Component, VNode, h as hType } from 'vue'

import { resolveShareLink } from '../../src/client/utils/resolveShareLink.js'
import { sharePlugin } from '../../src/node/index.js'

// oxlint-disable-next-line vitest/prefer-import-in-mock
vi.mock('qrcode', () => ({
  toDataURL: vi
    .fn<(text: string) => Promise<string>>()
    .mockResolvedValue('data:image/png;base64,qrcode'),
}))

describe('resolve share link', () => {
  it('should replace variables with data', () => {
    expect(
      resolveShareLink(
        'https://example.com/share?url=[url]&title=[title]&tags=[tags]',
        {
          url: 'https://example.com/post/',
          title: 'Hello world',
          tags: ['vue', 'vuepress'],
        },
      ),
    ).toBe(
      'https://example.com/share?url=https%3A%2F%2Fexample.com%2Fpost%2F&title=Hello%20world&tags=vue,vuepress',
    )
  })

  it('should encode characters that would break a query string', () => {
    expect(
      resolveShareLink('https://example.com/share?title=[title]', {
        title: 'Q&A #1',
      }),
    ).toBe('https://example.com/share?title=Q%26A%20%231')
  })

  it('should keep values raw when encoding is disabled', () => {
    expect(
      resolveShareLink(
        'https://example.com/[url]',
        { url: 'https://example.com/post/?a=1&b=2' },
        { encode: false },
      ),
    ).toBe('https://example.com/https://example.com/post/?a=1&b=2')
  })

  it('should use the first available alternative', () => {
    expect(
      resolveShareLink('[description|summary]', {
        summary: 'Summary',
      }),
    ).toBe('Summary')
  })

  it('should replace a missing variable with an empty string', () => {
    expect(resolveShareLink('[title]-[unknown]', {})).toBe('-')
  })

  it('should keep brackets without a variable untouched', () => {
    expect(resolveShareLink('[title', { title: 'Hello' })).toBe('[title')
    expect(resolveShareLink('[]', {})).toBe('[]')
  })
})

let Share: Component
let mountVuePress: typeof mountVuePressType
let h: typeof hType
let setupPromise: Promise<void> | undefined
// oxlint-disable-next-line vitest/require-hook
let mounted: VueWrapper[] = []

const setup = async (): Promise<void> => {
  setupPromise ??= (async (): Promise<void> => {
    const app = await createTestApp({ plugins: [sharePlugin()] })

    stubClientDefines(await collectClientDefines(app))

    vi.resetModules()

    const [shareModule, testUtils, vue] = await Promise.all([
      import('../../src/client/components/Share.js'),
      import('@vuepress/test-utils/client'),
      import('vue'),
    ])
    const { default: shareComponent } = shareModule
    const { mountVuePress: mount } = testUtils
    const { h: createElement } = vue

    Share = shareComponent
    mountVuePress = mount
    h = createElement

    app.cleanup()
  })()

  await setupPromise
}

const mountShare = async (
  props: Record<string, unknown> = {},
  frontmatter: Record<string, unknown> = {},
): Promise<VueWrapper> => {
  await setup()

  for (const wrapper of mounted) wrapper.unmount()

  mounted = []
  document.body.innerHTML = ''

  const wrapper = await mountVuePress({
    rootComponent: {
      name: 'ShareTestRoot',
      render: (): VNode => h(Share, props),
    },
    page: { title: 'Hello', path: '/', frontmatter },
  })

  mounted.push(wrapper)

  await flushPromises()

  return wrapper
}

describe('share component', () => {
  it('should render the default services', async () => {
    const wrapper = await mountShare()
    const buttons = wrapper.findAll('.vp-share-button')

    expect(buttons).toHaveLength(6)
    expect(
      buttons.map((button) => button.attributes('aria-label')),
    ).toStrictEqual([
      'X',
      'facebook',
      'reddit',
      'telegram',
      'whatsapp',
      'email',
    ])
  })

  it('should render services selected by a comma separated string', async () => {
    const wrapper = await mountShare({ services: 'qq, weibo' })
    const buttons = wrapper.findAll('.vp-share-button')

    expect(buttons).toHaveLength(2)
    expect(
      buttons.map((button) => button.attributes('aria-label')),
    ).toStrictEqual(['qq', 'weibo'])
  })

  it('should render a service that is not in the defaults', async () => {
    const wrapper = await mountShare({ services: 'qrcode' })

    expect(wrapper.findAll('.vp-share-button')).toHaveLength(1)
    expect(wrapper.find('.vp-share-button').attributes('aria-label')).toBe(
      'qrcode',
    )
  })

  it('should render a custom service', async () => {
    const wrapper = await mountShare({
      services: [
        {
          name: 'custom',
          label: 'Mastodon',
          link: 'https://example.com/share?url=[url]',
          shape: '<svg></svg>',
        },
      ],
    })

    expect(wrapper.findAll('.vp-share-button')).toHaveLength(1)
    expect(wrapper.find('.vp-share-button').attributes('aria-label')).toBe(
      'Mastodon',
    )
  })

  it('should ignore unknown services', async () => {
    const wrapper = await mountShare({ services: 'unknown' })

    expect(wrapper.findAll('.vp-share-button')).toHaveLength(0)
  })

  it('should add the inline class', async () => {
    const wrapper = await mountShare({ inline: true })

    expect(wrapper.find('.vp-share-buttons').classes()).toContain(
      'vp-share-buttons-inline',
    )
    expect(wrapper.find('.vp-share-buttons').element.tagName).toBe('SPAN')
  })

  it('should render colorful icons', async () => {
    const wrapper = await mountShare({ colorful: true })

    expect(wrapper.find('.vp-share-buttons').exists()).toBe(true)
    expect(wrapper.find('.vp-share-icon.colorful').exists()).toBe(true)
  })

  it('should open the share link of the clicked service', async () => {
    const open = vi
      .spyOn(window, 'open')
      .mockReturnValue({ focus: vi.fn<() => void>() } as unknown as Window)
    const wrapper = await mountShare({}, { tag: ['vue', 'vuepress'] })

    await wrapper.find('.vp-share-button').trigger('click')

    expect(open).toHaveBeenCalledTimes(1)
    expect(open.mock.calls[0][0]).toMatch(/^https:\/\/x\.com\/intent\/tweet\?/u)
    expect(open.mock.calls[0][0]).toContain('text=Hello')
    expect(open.mock.calls[0][0]).toContain('hashtags=vue,vuepress')

    open.mockRestore()
  })

  it('should use the getters for the share link', async () => {
    const open = vi
      .spyOn(window, 'open')
      .mockReturnValue({ focus: vi.fn<() => void>() } as unknown as Window)
    const wrapper = await mountShare({
      titleGetter: () => 'Custom title',
      tagGetter: () => 'custom-tag',
    })

    await wrapper.find('.vp-share-button').trigger('click')

    expect(open.mock.calls[0][0]).toContain('text=Custom%20title')
    expect(open.mock.calls[0][0]).toContain('hashtags=custom-tag')

    open.mockRestore()
  })

  it('should show a QR code for the qrcode service', async () => {
    const wrapper = await mountShare({ services: 'qrcode' })

    await wrapper.find('.vp-share-button').trigger('click')
    await flushPromises()
    await flushPromises()

    const image = document.querySelector<HTMLImageElement>(
      '.vp-share-popup-content img.vp-share-qrcode',
    )

    expect(image).not.toBeNull()
    expect(image?.src).toBe('data:image/png;base64,qrcode')

    const { toDataURL } = await import('qrcode')

    expect(toDataURL).toHaveBeenCalledWith(
      expect.stringMatching(/^https?:\/\//u),
      expect.objectContaining({ errorCorrectionLevel: 'H' }),
    )

    const content = document.querySelector('.vp-share-popup-content')

    expect(content).not.toBeNull()
    expect(content?.getAttribute('role')).toBe('dialog')
    expect(content?.getAttribute('aria-modal')).toBe('true')

    // Clicking the content should not close the popup
    content?.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(document.querySelector('.vp-share-popup-content')).not.toBeNull()

    // Escape closes the popup
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

    expect(
      document
        .querySelector('.vp-share-popup-wrapper')
        ?.classList.contains('vp-share-popup-leave'),
    ).toBe(true)
  })
})

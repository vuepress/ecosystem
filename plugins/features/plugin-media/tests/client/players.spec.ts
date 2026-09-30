import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'

import { AudioPlayer } from '../../src/client/components/AudioPlayer.js'
import { PDFViewer } from '../../src/client/components/PDFViewer.js'
import { VimeoPlayer } from '../../src/client/components/VimeoPlayer.js'

/**
 * Render a component with props
 *
 * `renderVuePress()` renders the root component without props, so the component
 * under test is wrapped in a component that passes them.
 *
 * @param component - Component to render / 要渲染的组件
 * @param props - Props to pass / 要传入的 props
 * @returns The rendered HTML / 渲染结果
 */
const render = (
  component: Component,
  props: Record<string, unknown> = {},
): Promise<string> =>
  renderVuePress({
    rootComponent: defineComponent({
      name: 'ComponentFixture',
      setup: () => (): ReturnType<typeof h> => h(component, props),
    }),
  })

describe('audio player', () => {
  it('should only render the wrapper and a placeholder during SSR', async () => {
    const html = await render(AudioPlayer, { src: '/media/a.mp3' })

    expect(html).toContain('class="vp-audio-player"')
    // Video.js requires a DOM, so the media element is rendered after mounting
    expect(html).not.toContain('<audio-player')
    expect(html).toContain('--loading-icon')
  })
})

describe('pdf viewer', () => {
  it('should only render the wrapper and a placeholder during SSR', async () => {
    const html = await render(PDFViewer, { src: '/files/a.pdf' })

    expect(html).toContain('class="vp-pdf-viewer"')
    // EmbedPDF relies on Canvas and WASM, so it is loaded after mounting
    expect(html).not.toContain('src="/files/a.pdf"')
    expect(html).toContain('--loading-icon')
  })
})

describe('vimeo player', () => {
  it('should only render the wrapper and a placeholder during SSR', async () => {
    const html = await render(VimeoPlayer, { src: '76979871' })

    expect(html).toContain('class="vp-vimeo-player"')
    // Video.js requires a DOM, so the media element is rendered after mounting
    expect(html).not.toContain('<video-player')
    expect(html).toContain('--loading-icon')
  })
})

import { renderVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'

import { SpotifyEmbed } from '../../src/client/components/SpotifyEmbed.js'
import { YouTubeEmbed } from '../../src/client/components/YouTubeEmbed.js'
import { videoIframeAllow } from '../../src/client/utils/iframeAllow.js'

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

describe('youtube embed', () => {
  it('should render an iframe pointing at the resolved embed URL', async () => {
    const html = await render(YouTubeEmbed, { src: 'dQw4w9WgXcQ' })

    expect(html).toContain('https://www.youtube.com/embed/dQw4w9WgXcQ')
    expect(html).toContain('class="vp-youtube-iframe"')
    expect(html).toContain(`allow="${videoIframeAllow}"`)
  })

  it('should use the video title for the iframe and the fallback link', async () => {
    const html = await render(YouTubeEmbed, {
      src: 'dQw4w9WgXcQ',
      title: 'A video',
    })

    expect(html).toContain('title="A video"')
    expect(html).toContain('class="sr-only"')
  })

  it('should render no iframe when the source is not recognized', async () => {
    const html = await render(YouTubeEmbed, { src: 'https://example.com' })

    expect(html).toContain('class="vp-youtube"')
    expect(html).not.toContain('<iframe')
  })

  it('should apply the given width to the wrapper', async () => {
    const html = await render(YouTubeEmbed, {
      src: 'dQw4w9WgXcQ',
      width: 640,
    })

    expect(html).toContain('width:640px')
  })
})

describe('spotify embed', () => {
  it('should render an iframe pointing at the resolved embed URL', async () => {
    const html = await render(SpotifyEmbed, {
      src: 'spotify:track:4uLU6hMCjMI75M1A2tKUQC',
    })

    expect(html).toContain(
      'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC',
    )
    expect(html).toContain('class="vp-spotify-iframe"')
    expect(html).toContain('title="A Spotify player"')
  })

  it('should render no iframe when the source is not recognized', async () => {
    const html = await render(SpotifyEmbed, { src: 'https://example.com' })

    expect(html).toContain('class="vp-spotify"')
    expect(html).not.toContain('<iframe')
  })
})

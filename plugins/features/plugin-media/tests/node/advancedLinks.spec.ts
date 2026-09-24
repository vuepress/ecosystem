import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { registerAdvancedLinks } from '../../src/node/advancedLinks.js'

const COMPONENTS = ['ArtPlayer', 'VideoPlayer', 'BiliBiliEmbed', 'YouTubeEmbed']

const createMarkdownIt = (): MarkdownIt => {
  const markdownIt = new MarkdownIt()

  registerAdvancedLinks(markdownIt, COMPONENTS)

  return markdownIt
}

const render = (markdown: string): string => createMarkdownIt().render(markdown)

describe(registerAdvancedLinks, () => {
  it('should render the link as the source of the component', () => {
    expect(render('@[youtube](https://youtu.be/dQw4w9WgXcQ)')).toBe(
      '<YouTubeEmbed src="https://youtu.be/dQw4w9WgXcQ" />',
    )
  })

  it('should pass props as attributes', () => {
    expect(render('@[video autoplay title="A video"](a.mp4)')).toBe(
      '<VideoPlayer src="a.mp4" autoplay title="A video" />',
    )
  })

  it('should escape the value of a prop', () => {
    expect(render(String.raw`@[video title="a\"b"](a.mp4)`)).toBe(
      '<VideoPlayer src="a.mp4" title="a&quot;b" />',
    )
  })

  it('should not let a prop override the link', () => {
    expect(render('@[video src=other](a.mp4)')).toBe(
      '<VideoPlayer src="a.mp4" />',
    )
  })

  it('should ignore a prop with an invalid name', () => {
    expect(render('@[video 1a=b](a.mp4)')).toBe('<VideoPlayer src="a.mp4" />')
  })

  it('should read the video id of BiliBili', () => {
    expect(render('@[bilibili](BV1xx411c7mD)')).toBe(
      '<BiliBiliEmbed bvid="BV1xx411c7mD" />',
    )
  })

  it('should read a BiliBili URL', () => {
    expect(
      render(
        '@[bilibili](https://www.bilibili.com/video/BV1xx411c7mD/?p=2&t=30)',
      ),
    ).toBe('<BiliBiliEmbed bvid="BV1xx411c7mD" page="2" time="30" />')
  })

  it('should let a prop override the BiliBili URL', () => {
    expect(
      render(
        '@[bilibili page=3](https://www.bilibili.com/video/BV1xx411c7mD/?p=2)',
      ),
    ).toBe('<BiliBiliEmbed bvid="BV1xx411c7mD" page="3" />')
  })

  it('should leave an unregistered name to the other rules', () => {
    expect(render('@[audio](a.mp3)')).toBe(
      '<p>@<a href="a.mp3">audio</a></p>\n',
    )
  })

  it('should only match the syntax on its own line', () => {
    expect(render('See @[youtube](dQw4w9WgXcQ) for more.')).not.toContain(
      '<YouTubeEmbed',
    )
  })
})

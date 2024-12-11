import { describe, expect, it } from 'vitest'
import { createBaseApp } from 'vuepress/core'
import type { PwaPluginOptions } from '../../src/node/index.js'
import { injectLinksToHead } from '../../src/node/injectLinksToHead.js'

const options: PwaPluginOptions = {
  favicon: '/favicon.ico',

  manifest: {
    icons: [
      {
        src: '/assets/icon/chrome-192.png',
        sizes: '192x192',
      },
      {
        src: '/assets/icon/chrome-512.png',
        sizes: '512x512',
      },
      {
        src: '/assets/icon/chrome-mask-192.png',
        sizes: '192x192',
        purpose: 'maskable',
        type: 'image/png',
      },
      {
        src: '/assets/icon/chrome-mask-512.png',
        sizes: '512x512',
        purpose: 'maskable',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Guide',
        url: '/guide/',
      },
      {
        name: 'Config',
        url: '/config/',
      },
      {
        name: 'Basic',
        url: '/basic/',
      },
    ],
  },

  themeColor: '#46bd87',
  apple: {
    icon: '/img/icon/appleIcon152.png',
    maskIcon: '/icons/safari-pinned-tab.svg',
  },
}

describe('Test head function', () => {
  it('should generate PWA tags because they do not exist', () => {
    // @ts-expect-error: Fake app
    const app = createBaseApp({
      base: '/',
      title: 'VuePress',
      source: '',
    })

    expect(injectLinksToHead(app, options)).toMatchSnapshot()
  })

  it('should read manifest', () => {
    // @ts-expect-error: Fake app
    const app = createBaseApp({
      base: '/',
      title: 'VuePress',
      source: '',
    })

    const optionsWithManifest: PwaPluginOptions = {
      manifest: {
        icons: [
          {
            src: '/assets/icon/chrome-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }

    expect(injectLinksToHead(app, optionsWithManifest)).toMatchSnapshot()
  })

  it('should not generate tags if they exist', () => {
    // @ts-expect-error: Fake app
    const app = createBaseApp({
      base: '/',
      title: 'VuePress',
      head: [
        ['link', { rel: 'icon', href: '/icon.ico' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
      ],
      source: '',
    })

    expect(injectLinksToHead(app, options)).toMatchSnapshot()
  })
})

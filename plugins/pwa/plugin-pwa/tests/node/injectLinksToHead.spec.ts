import { describe, expect, it } from 'vitest'
import { createBuildApp } from 'vuepress/core'
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
    const app = createBuildApp({
      base: '/',
      title: 'VuePress',
      source: '',
      theme: {
        name: '@vuepress/theme-fake',
      },
    })

    injectLinksToHead(app, options)

    expect(app.siteData.head).toEqual([
      [
        'meta',
        {
          content: 'VuePress',
          name: 'application-name',
        },
      ],
      [
        'meta',
        {
          content: 'yes',
          name: 'mobile-web-app-capable',
        },
      ],
      [
        'meta',
        {
          content: '#46bd87',
          name: 'theme-color',
        },
      ],
      [
        'link',
        {
          href: '/favicon.ico',
          rel: 'icon',
        },
      ],
      [
        'link',
        {
          crossorigin: 'use-credentials',
          href: '/manifest.webmanifest',
          rel: 'manifest',
        },
      ],
      [
        'link',
        {
          href: '/assets/icon/chrome-192.png',
          rel: 'icon',
          sizes: '192x192',
        },
      ],
      [
        'link',
        {
          href: '/assets/icon/chrome-512.png',
          rel: 'icon',
          sizes: '512x512',
        },
      ],
      [
        'link',
        {
          href: '/assets/icon/chrome-mask-192.png',
          rel: 'icon',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      [
        'link',
        {
          href: '/assets/icon/chrome-mask-512.png',
          rel: 'icon',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      [
        'link',
        {
          href: '/img/icon/appleIcon152.png',
          rel: 'apple-touch-icon',
        },
      ],
      [
        'link',
        {
          color: '#46bd87',
          href: '/icons/safari-pinned-tab.svg',
          rel: 'mask-icon',
        },
      ],
    ])
  })

  it('should read manifest', () => {
    // @ts-expect-error: Fake app
    const app = createBuildApp({
      base: '/',
      title: 'VuePress',
      source: '',
      theme: {
        name: '@vuepress/theme-fake',
      },
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

    injectLinksToHead(app, optionsWithManifest)

    expect(app.siteData.head).toEqual([
      [
        'meta',
        {
          content: 'VuePress',
          name: 'application-name',
        },
      ],
      [
        'meta',
        {
          content: 'yes',
          name: 'mobile-web-app-capable',
        },
      ],
      [
        'meta',
        {
          content: '#46bd87',
          name: 'theme-color',
        },
      ],
      [
        'link',
        {
          crossorigin: 'use-credentials',
          href: '/manifest.webmanifest',
          rel: 'manifest',
        },
      ],
      [
        'link',
        {
          href: '/assets/icon/chrome-192.png',
          rel: 'icon',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      [
        'link',
        {
          href: '/assets/icon/chrome-192.png',
          rel: 'apple-touch-icon',
        },
      ],
    ])
  })

  it('should not generate tags if they exist', () => {
    // @ts-expect-error: Fake app
    const app = createBuildApp({
      base: '/',
      title: 'VuePress',
      head: [
        ['link', { rel: 'icon', href: '/icon.ico' }],
        ['meta', { name: 'theme-color', content: '#ffffff' }],
      ],
      source: '',
      theme: {
        name: '@vuepress/theme-fake',
      },
    })

    injectLinksToHead(app, options)
    expect(app.siteData.head).toEqual([
      [
        'link',
        {
          href: '/icon.ico',
          rel: 'icon',
        },
      ],
      [
        'meta',
        {
          content: '#ffffff',
          name: 'theme-color',
        },
      ],
      [
        'meta',
        {
          content: 'VuePress',
          name: 'application-name',
        },
      ],
      [
        'meta',
        {
          content: 'yes',
          name: 'mobile-web-app-capable',
        },
      ],
      [
        'link',
        {
          crossorigin: 'use-credentials',
          href: '/manifest.webmanifest',
          rel: 'manifest',
        },
      ],
      [
        'link',
        {
          href: '/img/icon/appleIcon152.png',
          rel: 'apple-touch-icon',
        },
      ],
      [
        'link',
        {
          color: '#46bd87',
          href: '/icons/safari-pinned-tab.svg',
          rel: 'mask-icon',
        },
      ],
    ])
  })
})

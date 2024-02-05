import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { copyrightPlugin } from '@vuepress/plugin-copyright'
import { feedPlugin } from '@vuepress/plugin-feed'
import { redirectPlugin } from '@vuepress/plugin-redirect'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import type { UserConfig } from 'vuepress/cli'
import { path } from 'vuepress/utils'

const E2E_BASE = (process.env.E2E_BASE ?? '/') as '/' | `/${string}/`
const E2E_BUNDLER = process.env.E2E_BUNDLER ?? 'vite'

export default defineUserConfig({
  base: E2E_BASE,

  dest: path.join(__dirname, 'dist', E2E_BASE),

  port: 9080,

  head: [
    ['meta', { name: 'foo', content: 'foo' }],
    ['meta', { name: 'bar', content: 'bar' }],
    ['meta', { name: 'baz', content: 'baz' }],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress Ecosystem E2E',
      description: 'VuePress Ecosystem E2E Test Site',
    },
  },

  markdown: {
    assets: {
      // FIXME
      absolutePathPrependBase: E2E_BUNDLER === 'webpack',
    },
  },

  bundler: E2E_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  theme: defaultTheme({
    hostname: 'https://ecosystem-e2e-test.com',
    logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Dropdown',
        children: [
          {
            text: 'sidebar',
            link: '/sidebar/',
          },
        ],
      },
    ],

    sidebar: {
      '/sidebar/heading/': 'heading',
      '/sidebar/config/': [
        {
          text: 'Sidebar',
          link: '/sidebar/config/',
          children: [
            { text: 'sidebar 1', link: '/sidebar/config/1.html' },
            { text: 'sidebar 2', link: '/sidebar/config/2.html' },
          ],
        },
      ],
      '/': [],
    },

    themePlugins: {
      sitemap: {
        devServer: true,
        devHostname: 'https://ecosystem-e2e-test.com',
        excludePaths: ['/sitemap/config-exclude.html', '/404.html'],
      },
    },
  }),

  plugins: [
    catalogPlugin(),
    copyrightPlugin({}),
    feedPlugin({
      hostname: 'https://ecosystem-e2e-test.com',
      devServer: true,
      devHostname: 'https://example.com',
      atom: true,
      json: true,
      rss: true,
    }),
    redirectPlugin({
      config: {
        '/redirect/config.html': '/redirect/final.html',
        '/redirect/': '/redirect/final.html',
      },
    }),
  ],
}) as UserConfig

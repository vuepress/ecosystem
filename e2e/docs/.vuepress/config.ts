import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
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
      '/': ['/sidebar/'],
      '/sidebar/': [
        {
          text: 'Sidebar',
          link: '/sidebar/',
          children: [
            { text: 'sidebar 1', link: '/sidebar/1.html' },
            { text: 'sidebar 2', link: '/sidebar/2.html' },
          ],
        },
      ],
      '/heading-sidebar/': 'heading',
    },
  }),
}) as UserConfig

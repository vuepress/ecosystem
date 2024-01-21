import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from '@vuepress/cli'
import { defaultTheme } from '@vuepress/theme-default'
import { path } from '@vuepress/utils'

const E2E_BASE = (process.env.E2E_BASE ?? '/') as '/' | `/${string}/`

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

  bundler: viteBundler(),

  theme: defaultTheme({
    logo: '/logo.png',
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Auto Sidebar',
        link: '/auto-sidebar/',
      },
      {
        text: 'Custom Sidebar',
        link: '/custom-sidebar/',
      },
    ],
    sidebar: {
      '/': 'auto',
      '/auto-sidebar/': 'auto',
      '/custom-sidebar/': [
        {
          text: 'custom-sidebar',
          link: '/custom-sidebar/',
          children: [
            { text: 'custom-child-1', link: '/custom-sidebar/custom-one' },
            { text: 'custom-child-2', link: '/custom-sidebar/custom-two' },
          ],
        },
      ],
    },
  }),
})

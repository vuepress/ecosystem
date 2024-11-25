import { defaultTheme } from '@vuepress/theme-default'
import { navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs/index.js'

const IS_PROD = process.env.NODE_ENV === 'production'

export default defaultTheme({
  logo: '/images/logo.png',
  hostname: 'https://ecosystem.vuejs.press',

  // theme-level locales config
  locales: {
    '/': {
      navbar: navbarEn,
      sidebar: sidebarEn,
    },
    '/zh/': {
      navbar: navbarZh,
      sidebar: sidebarZh,
    },
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/vuepress/ecosystem' },
  ],

  docsRepo: 'https://github.com/vuepress/ecosystem',
  docsBranch: 'main',
  docsDir: 'docs-next',

  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2022-PRESENT VuePress',
  },
  themePlugins: {
    git: IS_PROD,
    shiki:
      process.env.HIGHLIGHTER !== 'prismjs'
        ? {
            langs: [
              'bash',
              'diff',
              'json',
              'md',
              'scss',
              'ts',
              'vue',
              'less',
              'java',
              'py',
              'vb',
              'bat',
              'cs',
              'cpp',
            ],
            themes: {
              light: 'one-light',
              dark: 'one-dark-pro',
            },
            lineNumbers: 10,
            notationDiff: true,
            notationErrorLevel: true,
            notationFocus: true,
            notationHighlight: true,
            notationWordHighlight: true,
            whitespace: true,
            collapsedLines: false,
          }
        : false,
  },
})

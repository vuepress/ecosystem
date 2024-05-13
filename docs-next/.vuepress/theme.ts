import { defaultTheme } from '@vuepress/theme-default'
import { navbarEn, navbarZh, sidebarEn, sidebarZh } from './configs/index.js'

export default defaultTheme({
  logo: '/images/logo.png',

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
  docsDir: 'docs-new',

  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2022-PRESENT VuePress',
  },
})

import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
  {
    text: 'Themes',
    children: [
      {
        text: 'Default Theme',
        link: '/themes/default/',
      },
    ],
  },
  {
    text: 'Plugins',
    children: [
      {
        text: 'Common Features',
        children: [
          '/plugins/back-to-top',
          '/plugins/container',
          '/plugins/copy-code',
          '/plugins/copyright',
          '/plugins/external-link-icon',
          '/plugins/google-analytics',
          '/plugins/medium-zoom',
          '/plugins/nprogress',
          '/plugins/register-components',
        ],
      },
      {
        text: 'Search',
        children: ['/plugins/docsearch', '/plugins/search'],
      },
      {
        text: 'Blogging',
        children: ['/plugins/feed/'],
      },
      {
        text: 'PWA',
        children: ['/plugins/pwa', '/plugins/pwa-popup', '/plugins/remove-pwa'],
      },
      {
        text: 'SEO',
        children: ['/plugins/seo/', '/plugins/sitemap/'],
      },
      {
        text: 'Syntax Highlighting',
        children: ['/plugins/prismjs', '/plugins/shiki'],
      },
      {
        text: 'Theme Development',
        children: [
          '/plugins/active-header-links',
          '/plugins/git',
          '/plugins/palette',
          '/plugins/reading-time',
          '/plugins/rtl',
          '/plugins/theme-data',
          '/plugins/toc',
        ],
      },
    ],
  },
]

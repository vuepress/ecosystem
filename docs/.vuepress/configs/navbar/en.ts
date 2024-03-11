import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
  {
    text: 'Themes',
    children: [
      {
        text: 'Default Theme',
        link: '/themes/default/',
      },
      {
        text: 'Hope Theme',
        link: 'https://theme-hope.vuejs.press',
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
          '/plugins/catalog',
          '/plugins/copy-code',
          '/plugins/copyright',
          '/plugins/external-link-icon',
          '/plugins/medium-zoom',
          '/plugins/nprogress',
          '/plugins/photo-swipe',
          '/plugins/redirect',
          '/plugins/register-components',
        ],
      },
      {
        text: 'Markdown',
        children: ['/plugins/container', '/plugins/links-check'],
      },
      {
        text: 'Search',
        children: ['/plugins/docsearch', '/plugins/search'],
      },
      {
        text: 'Blogging',
        children: ['/plugins/blog/', '/plugins/comment/', '/plugins/feed/'],
      },
      {
        text: 'PWA',
        children: ['/plugins/pwa/', '/plugins/remove-pwa'],
      },
      {
        text: 'SEO',
        children: [
          '/plugins/baidu-analytics',
          '/plugins/google-analytics',
          '/plugins/seo/',
          '/plugins/sitemap/',
        ],
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
  {
    text: 'Tools',
    children: [
      {
        text: 'helper',
        link: '/tools/helper/',
      },
    ],
  },
]

import type { NavItem } from '@vuepress/theme-default'

export const navbarEn: NavItem[] = [
  {
    text: 'Themes',
    items: [
      {
        text: 'Default Theme',
        link: '/themes/default/',
      },
      {
        text: 'Hope Theme',
        link: 'https://theme-hope.vuejs.press',
      },
      {
        text: 'Plume Theme',
        link: 'https://theme-plume.vuejs.press',
      },
    ],
  },
  {
    text: 'Plugins',
    activeMatch: '^/plugins/',
    items: [
      {
        text: 'Common Features',
        items: [
          '/plugins/append-date',
          '/plugins/back-to-top',
          '/plugins/catalog',
          '/plugins/copy-code',
          '/plugins/copyright',
          '/plugins/medium-zoom',
          '/plugins/notice',
          '/plugins/nprogress',
          '/plugins/photo-swipe',
          '/plugins/redirect',
          '/plugins/register-components',
          '/plugins/watermark',
        ],
      },
      {
        text: 'Markdown',
        items: ['/plugins/container', '/plugins/links-check'],
      },
      {
        text: 'Search',
        items: ['/plugins/docsearch', '/plugins/search'],
      },
      {
        text: 'Blogging',
        items: ['/plugins/blog/', '/plugins/comment/', '/plugins/feed/'],
      },
      {
        text: 'PWA',
        items: ['/plugins/pwa/', '/plugins/remove-pwa'],
      },
      {
        text: 'SEO',
        items: [
          '/plugins/baidu-analytics',
          '/plugins/google-analytics',
          '/plugins/google-tag-manager',
          '/plugins/seo/',
          '/plugins/sitemap/',
          '/plugins/umami-analytics',
        ],
      },
      {
        text: 'Syntax Highlighting',
        items: ['/plugins/prismjs', '/plugins/shiki'],
      },
      {
        text: 'Theme Development',
        items: [
          '/plugins/active-header-links',
          '/plugins/git',
          '/plugins/palette',
          '/plugins/reading-time',
          '/plugins/rtl',
          '/plugins/sass-palette/',
          '/plugins/theme-data',
          '/plugins/toc',
        ],
      },
    ],
  },
  {
    text: 'Tools',
    activeMatch: '^/tools/',
    items: [
      {
        text: 'helper',
        link: '/tools/helper/',
      },
    ],
  },
]

import type { NavItem } from '@vuepress/theme-default'

export const navbarZh: NavItem[] = [
  {
    text: '主题',
    items: [
      {
        text: '默认主题',
        link: '/zh/themes/default/',
      },
      {
        text: 'Hope 主题',
        link: 'https://theme-hope.vuejs.press',
      },
      {
        text: 'Plume 主题',
        link: 'https://theme-plume.vuejs.press',
      },
    ],
  },
  {
    text: '插件',
    activeMatch: '^/zh/plugins/',
    items: [
      {
        text: '常用功能',
        items: [
          '/zh/plugins/append-date',
          '/zh/plugins/back-to-top',
          '/zh/plugins/catalog',
          '/zh/plugins/copy-code',
          '/zh/plugins/copyright',
          '/zh/plugins/medium-zoom',
          '/zh/plugins/nprogress',
          '/zh/plugins/photo-swipe',
          '/zh/plugins/redirect',
          '/zh/plugins/register-components',
          '/zh/plugins/watermark',
        ],
      },
      {
        text: 'Markdown',
        items: ['/zh/plugins/container', '/zh/plugins/links-check'],
      },
      {
        text: '搜索',
        items: ['/zh/plugins/docsearch', '/zh/plugins/search'],
      },
      {
        text: '博客',
        items: [
          '/zh/plugins/blog/',
          '/zh/plugins/comment/',
          '/zh/plugins/feed/',
        ],
      },
      {
        text: 'PWA',
        items: ['/zh/plugins/pwa/', '/zh/plugins/remove-pwa'],
      },
      {
        text: '搜索引擎增强',
        items: [
          '/zh/plugins/baidu-analytics',
          '/zh/plugins/google-analytics',
          '/zh/plugins/google-tag-manager',
          '/zh/plugins/seo/',
          '/zh/plugins/sitemap/',
          '/zh/plugins/umami-analytics',
        ],
      },
      {
        text: '语法高亮',
        items: ['/zh/plugins/prismjs', '/zh/plugins/shiki'],
      },
      {
        text: '主题开发',
        items: [
          '/zh/plugins/active-header-links',
          '/zh/plugins/git',
          '/zh/plugins/palette',
          '/zh/plugins/reading-time',
          '/zh/plugins/rtl',
          '/zh/plugins/sass-palette/',
          '/zh/plugins/theme-data',
          '/zh/plugins/toc',
        ],
      },
    ],
  },
  {
    text: '工具',
    activeMatch: '^/zh/tools/',
    items: [
      {
        text: 'helper',
        link: '/zh/tools/helper/',
      },
    ],
  },
]

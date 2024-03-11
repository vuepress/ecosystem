import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  {
    text: '主题',
    children: [
      {
        text: '默认主题',
        link: '/zh/themes/default/',
      },
      {
        text: 'Hope 主题',
        link: 'https://theme-hope.vuejs.press/zh/',
      },
    ],
  },
  {
    text: '插件',
    children: [
      {
        text: '常用功能',
        children: [
          '/zh/plugins/append-date',
          '/zh/plugins/back-to-top',
          '/zh/plugins/catalog',
          '/zh/plugins/copy-code',
          '/zh/plugins/copyright',
          '/zh/plugins/external-link-icon',
          '/zh/plugins/medium-zoom',
          '/zh/plugins/nprogress',
          '/zh/plugins/photo-swipe',
          '/zh/plugins/redirect',
          '/zh/plugins/register-components',
        ],
      },
      {
        text: 'Markdown',
        children: ['/zh/plugins/container', '/zh/plugins/links-check'],
      },
      {
        text: '搜索',
        children: ['/zh/plugins/docsearch', '/zh/plugins/search'],
      },
      {
        text: '博客',
        children: [
          '/zh/plugins/blog/',
          '/zh/plugins/comment/',
          '/zh/plugins/feed/',
        ],
      },
      {
        text: 'PWA',
        children: ['/zh/plugins/pwa/', '/zh/plugins/remove-pwa'],
      },
      {
        text: '搜索引擎增强',
        children: [
          '/zh/plugins/baidu-analytics',
          '/zh/plugins/google-analytics',
          '/zh/plugins/seo/',
          '/zh/plugins/sitemap/',
        ],
      },
      {
        text: '语法高亮',
        children: ['/zh/plugins/prismjs', '/zh/plugins/shiki'],
      },
      {
        text: '主题开发',
        children: [
          '/zh/plugins/active-header-links',
          '/zh/plugins/git',
          '/zh/plugins/palette',
          '/zh/plugins/reading-time',
          '/zh/plugins/rtl',
          '/zh/plugins/theme-data',
          '/zh/plugins/toc',
        ],
      },
    ],
  },
  {
    text: '工具',
    children: [
      {
        text: 'helper',
        link: '/zh/tools/helper/',
      },
    ],
  },
]

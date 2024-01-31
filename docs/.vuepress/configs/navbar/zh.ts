import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  {
    text: '主题',
    children: [
      {
        text: '默认主题',
        link: '/zh/themes/default/',
      },
    ],
  },
  {
    text: '插件',
    children: [
      {
        text: '常用功能',
        children: [
          '/zh/plugins/back-to-top',
          '/zh/plugins/container',
          '/zh/plugins/external-link-icon',
          '/zh/plugins/google-analytics',
          '/zh/plugins/medium-zoom',
          '/zh/plugins/nprogress',
          '/zh/plugins/register-components',
        ],
      },
      {
        text: '搜索',
        children: ['/zh/plugins/docsearch', '/zh/plugins/search'],
      },
      {
        text: '博客',
        children: ['/plugins/feed/'],
      },
      {
        text: 'PWA',
        children: ['/zh/plugins/pwa', '/zh/plugins/pwa-popup'],
      },
      {
        text: '搜索引擎增强',
        children: ['/zh/plugins/sitemap'],
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
          '/zh/plugins/theme-data',
          '/zh/plugins/toc',
        ],
      },
    ],
  },
]

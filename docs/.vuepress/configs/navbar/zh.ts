import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarZh: NavbarConfig = [
  {
    text: '主题',
    children: [
      {
        text: '默认主题',
        children: [
          '/zh/themes/default/config',
          '/zh/themes/default/frontmatter',
          '/zh/themes/default/components',
          '/zh/themes/default/markdown',
          '/zh/themes/default/styles',
          '/zh/themes/default/extending',
        ],
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
        text: '内容搜索',
        children: ['/zh/plugins/docsearch', '/zh/plugins/search'],
      },
      {
        text: 'PWA',
        children: ['/zh/plugins/pwa', '/zh/plugins/pwa-popup'],
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
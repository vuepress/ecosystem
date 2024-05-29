import type { NavbarConfig } from '@vuepress/theme-classic'

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
        link: '/zh/plugins/features/',
      },
      {
        text: 'Markdown',
        link: '/zh/plugins/markdown/',
      },
      {
        text: '搜索',
        link: '/zh/plugins/search/',
      },
      {
        text: '博客',
        link: '/zh/plugins/blog/',
      },
      {
        text: 'PWA',
        link: '/zh/plugins/pwa/',
      },
      {
        text: '统计分析',
        link: '/zh/plugins/analytics/',
      },
      {
        text: '搜索引擎增强',
        link: '/zh/plugins/seo/',
      },
      {
        text: '主题开发',
        link: '/zh/plugins/development/',
      },
      {
        text: '工具',
        link: '/zh/plugins/tools/',
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

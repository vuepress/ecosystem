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
    activeMatch: '^/zh/tools/',
    items: [
      {
        text: 'helper',
        link: '/zh/tools/helper/',
      },
    ],
  },
]

import type { NavItem } from '@vuepress/theme-default'

export const navbarZh: NavItem[] = [
  {
    text: '主题',
    prefix: '/zh/themes/',
    items: [
      {
        text: '主题指南',
        link: 'guidelines',
      },
      {
        text: '默认主题',
        link: 'default/',
      },
      {
        text: 'Hope 主题',
        link: 'https://theme-hope.vuejs.press',
      },
      {
        text: 'Plume 主题',
        link: 'https://theme-plume.vuejs.press',
      },
      {
        text: 'Reco 主题',
        link: 'https://theme-reco.vuejs.press',
      },
    ],
  },
  {
    text: '插件',
    prefix: '/zh/plugins/',
    activeMatch: '^/zh/plugins/',
    items: [
      {
        text: '常用功能',
        link: 'features/',
      },
      {
        text: 'Markdown',
        link: 'markdown/',
      },
      {
        text: '搜索',
        link: 'search/',
      },
      {
        text: '博客',
        link: 'blog/',
      },
      {
        text: 'PWA',
        link: 'pwa/',
      },
      {
        text: '统计分析',
        link: 'analytics/',
      },
      {
        text: '搜索引擎增强',
        link: 'seo/',
      },
      {
        text: '主题开发',
        link: 'development/',
      },
      {
        text: '工具',
        link: 'tools/',
      },
    ],
  },
  {
    text: '工具',
    prefix: '/zh/tools/',
    activeMatch: '^/zh/tools/',
    items: [
      {
        text: 'helper',
        link: 'helper/',
      },
    ],
  },
]

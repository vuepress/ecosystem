import type { NavbarOptions } from '@vuepress/theme-default'

export const navbarZh: NavbarOptions = [
  {
    text: '主题',
    prefix: '/zh/themes/',
    icon: 'palette',
    children: [
      'guidelines',
      'default/',
      {
        text: 'Hope 主题',
        icon: 'https://theme-hope-assets.vuejs.press/logo.svg',
        link: 'https://theme-hope.vuejs.press/zh/',
      },
      {
        text: 'Plume 主题',
        icon: 'https://theme-plume.vuejs.press/favicon.ico',
        link: 'https://theme-plume.vuejs.press',
      },
      {
        text: 'Reco 主题',
        icon: 'https://theme-reco.vuejs.press/favicon.ico',
        link: 'https://theme-reco.vuejs.press',
      },
    ],
  },
  {
    text: '插件',
    icon: 'unplug',
    prefix: '/zh/plugins/',
    children: [
      'features/',
      'markdown/',
      'search/',
      'blog/',
      'pwa/',
      'analytics/',
      'seo/',
      'development/',
      'tools/',
    ],
  },
  {
    text: '工具',
    icon: 'hammer',
    prefix: '/zh/tools/',
    children: ['helper/'],
  },
]

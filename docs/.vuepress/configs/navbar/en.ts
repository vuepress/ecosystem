import type { NavbarOptions } from '@vuepress/theme-default'

export const navbarEn: NavbarOptions = [
  {
    text: 'Themes',
    prefix: '/themes/',
    icon: 'palette',
    children: [
      'guidelines',
      'default/',
      {
        text: 'Hope Theme',
        icon: 'https://theme-hope-assets.vuejs.press/logo.svg',
        link: 'https://theme-hope.vuejs.press',
      },
      {
        text: 'Plume Theme',
        icon: 'https://theme-plume.vuejs.press/favicon.ico',
        link: 'https://theme-plume.vuejs.press',
      },
      {
        text: 'Reco Theme',
        icon: 'https://theme-reco.vuejs.press/favicon.ico',
        link: 'https://theme-reco.vuejs.press/en',
      },
    ],
  },
  {
    text: 'Plugins',
    icon: 'unplug',
    prefix: '/plugins/',
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
    text: 'Tools',
    icon: 'hammer',
    prefix: '/tools/',
    children: ['helper/'],
  },
]

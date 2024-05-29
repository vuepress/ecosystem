import type { NavbarConfig } from '@vuepress/theme-classic'

export const navbarEn: NavbarConfig = [
  {
    text: 'Themes',
    prefix: '/themes/',
    children: [
      {
        text: 'Default Theme',
        link: 'default/',
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
    prefix: '/plugins/',
    children: [
      {
        text: 'Common Features',
        link: 'features/',
      },
      {
        text: 'Markdown',
        link: 'markdown/',
      },
      {
        text: 'Search',
        link: 'search/',
      },
      {
        text: 'Blogging',
        link: 'blog/',
      },
      {
        text: 'PWA',
        link: 'pwa/',
      },
      {
        text: 'Analytics',
        link: 'analytics/',
      },
      {
        text: 'SEO',
        link: 'seo/',
      },
      {
        text: 'Theme Development',
        link: 'development/',
      },
      {
        text: 'Tools',
        link: 'tools/',
      },
    ],
  },
  {
    text: 'Tools',
    prefix: '/tools/',
    children: [
      {
        text: 'helper',
        link: 'helper/',
      },
    ],
  },
]

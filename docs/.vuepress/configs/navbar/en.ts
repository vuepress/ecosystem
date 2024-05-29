import type { NavbarConfig } from '@vuepress/theme-classic'

export const navbarEn: NavbarConfig = [
  {
    text: 'Themes',
    children: [
      {
        text: 'Default Theme',
        link: '/themes/default/',
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
    children: [
      {
        text: 'Common Features',
        link: '/plugins/features/',
      },
      {
        text: 'Markdown',
        link: '/plugins/markdown/',
      },
      {
        text: 'Search',
        link: '/plugins/search/',
      },
      {
        text: 'Blogging',
        link: '/plugins/blog/',
      },
      {
        text: 'PWA',
        link: '/plugins/pwa/',
      },
      {
        text: 'Analytics',
        link: '/plugins/analytics/',
      },
      {
        text: 'SEO',
        link: '/plugins/seo/',
      },
      {
        text: 'Theme Development',
        link: '/plugins/development/',
      },
      {
        text: 'Tools',
        link: '/plugins/tools/',
      },
    ],
  },
  {
    text: 'Tools',
    children: [
      {
        text: 'helper',
        link: '/tools/helper/',
      },
    ],
  },
]

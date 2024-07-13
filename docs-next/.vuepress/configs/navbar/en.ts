import type { NavItem } from '@vuepress/theme-default'

export const navbarEn: NavItem[] = [
  {
    text: 'Themes',
    items: [
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
    activeMatch: '^/plugins/',
    items: [
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
    activeMatch: '^/tools/',
    items: [
      {
        text: 'helper',
        link: '/tools/helper/',
      },
    ],
  },
]

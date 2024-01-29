import type { NavbarConfig } from '@vuepress/theme-default'

export const navbarEn: NavbarConfig = [
  {
    text: 'Themes',
    children: [
      {
        text: 'Default Theme',
        children: [
          '/themes/default/config',
          '/themes/default/frontmatter',
          '/themes/default/components',
          '/themes/default/markdown',
          '/themes/default/styles',
          '/themes/default/extending',
        ],
      },
    ],
  },
  {
    text: 'Plugins',
    children: [
      {
        text: 'Common Features',
        children: [
          '/plugins/back-to-top',
          '/plugins/container',
          '/plugins/external-link-icon',
          '/plugins/google-analytics',
          '/plugins/medium-zoom',
          '/plugins/nprogress',
          '/plugins/register-components',
        ],
      },
      {
        text: 'Content Search',
        children: ['/plugins/docsearch', '/plugins/search'],
      },
      {
        text: 'PWA',
        children: ['/plugins/pwa', '/plugins/pwa-popup'],
      },
      {
        text: 'Syntax Highlighting',
        children: ['/plugins/prismjs', '/plugins/shiki'],
      },
      {
        text: 'Theme Development',
        children: [
          '/plugins/active-header-links',
          '/plugins/git',
          '/plugins/palette',
          '/plugins/theme-data',
          '/plugins/toc',
        ],
      },
    ],
  },
]

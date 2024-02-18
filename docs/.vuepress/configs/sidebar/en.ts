import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/plugins/': [
    {
      text: 'Common Features',
      children: [
        '/plugins/back-to-top',
        '/plugins/catalog',
        '/plugins/container',
        '/plugins/copy-code',
        '/plugins/copyright',
        '/plugins/external-link-icon',
        '/plugins/medium-zoom',
        '/plugins/nprogress',
        '/plugins/photo-swipe',
        '/plugins/redirect',
        '/plugins/register-components',
      ],
    },
    {
      text: 'Content Search',
      children: ['/plugins/docsearch', '/plugins/search'],
    },
    {
      text: 'Blogging',
      children: [
        {
          text: 'Blog',
          link: '/plugins/blog/',
          children: ['/plugins/blog/guide', '/plugins/blog/config'],
        },
        {
          text: 'Feed',
          link: '/plugins/feed/',
          children: [
            '/plugins/feed/guide',
            '/plugins/feed/config',
            '/plugins/feed/frontmatter',
            '/plugins/feed/channel',
            '/plugins/feed/getter',
          ],
        },
      ],
    },
    {
      text: 'PWA',
      children: ['/plugins/pwa', '/plugins/remove-pwa'],
    },
    {
      text: 'SEO',
      children: [
        {
          text: 'SEO',
          link: '/plugins/seo/',
          children: [
            '/plugins/baidu-analytics',
            '/plugins/google-analytics',
            '/plugins/seo/guide',
            '/plugins/seo/config',
          ],
        },
        {
          text: 'Sitemap',
          link: '/plugins/sitemap/',
          children: [
            '/plugins/sitemap/guide',
            '/plugins/sitemap/config',
            '/plugins/sitemap/frontmatter',
          ],
        },
      ],
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
        '/plugins/reading-time',
        '/plugins/rtl',
        '/plugins/theme-data',
        '/plugins/toc',
      ],
    },
  ],
  '/themes/': [
    {
      text: 'Default Theme',
      link: '/themes/default/',
      children: [
        '/themes/default/config',
        '/themes/default/plugin',
        '/themes/default/locale',
        '/themes/default/frontmatter',
        '/themes/default/components',
        '/themes/default/markdown',
        '/themes/default/styles',
        '/themes/default/extending',
      ],
    },
  ],
  '/tools/': [
    {
      text: '@vuepress/helper',
      link: '/tools/helper/',
      children: [
        '/tools/helper/node/bundler',
        '/tools/helper/node/page',
        '/tools/helper/client',
        '/tools/helper/shared',
      ],
    },
  ],
}

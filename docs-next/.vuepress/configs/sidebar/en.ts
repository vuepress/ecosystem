import type { Sidebar } from '@vuepress/theme-default'

export const sidebarEn: Sidebar = {
  '/plugins/': [
    {
      text: 'Common Features',
      link: '/plugins/features/',
    },
    {
      text: 'Markdown',
      link: '/plugins/markdown/',
    },
    {
      text: 'Content Search',
      link: '/plugins/search/',
    },
    {
      text: 'Blogging',
      link: '/plugins/blog/',
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
      text: 'PWA',
      link: '/plugins/pwa/',
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

  '/plugins/analytics/': [
    '/plugins/analytics/baidu-analytics',
    '/plugins/analytics/google-analytics',
    '/plugins/analytics/umami-analytics',
  ],

  '/plugins/blog/': [
    {
      text: 'Blog',
      link: '/plugins/blog/blog/',
      items: ['/plugins/blog/blog/guide', '/plugins/blog/blog/config'],
    },
    {
      text: 'Comment',
      link: '/plugins/blog/comment/',
      items: [
        '/plugins/blog/comment/guide',
        '/plugins/blog/comment/giscus/',
        '/plugins/blog/comment/waline/',
        '/plugins/blog/comment/artalk/',
        '/plugins/blog/comment/twikoo/',
      ],
    },
    {
      text: 'Feed',
      link: '/plugins/blog/feed/',
      items: [
        '/plugins/blog/feed/guide',
        '/plugins/blog/feed/config',
        '/plugins/blog/feed/frontmatter',
        '/plugins/blog/feed/channel',
        '/plugins/blog/feed/getter',
      ],
    },
  ],

  '/plugins/development/': [
    '/plugins/development/active-header-links',
    '/plugins/development/git',
    '/plugins/development/palette',
    '/plugins/development/reading-time',
    '/plugins/development/rtl',
    {
      text: 'Sass Palette',
      link: '/plugins/development/sass-palette/',
      items: [
        '/plugins/development/sass-palette/guide',
        '/plugins/development/sass-palette/config',
      ],
    },
    '/plugins/development/theme-data',
    '/plugins/development/toc',
  ],

  '/plugins/features/': [
    '/plugins/features/back-to-top',
    '/plugins/features/catalog',
    '/plugins/features/copy-code',
    '/plugins/features/copyright',
    '/plugins/features/medium-zoom',
    '/plugins/features/notice',
    '/plugins/features/nprogress',
    '/plugins/features/photo-swipe',
    '/plugins/features/watermark',
  ],

  '/plugins/markdown/': [
    '/plugins/markdown/append-date',
    '/plugins/markdown/markdown-container',
    '/plugins/markdown/markdown-image',
    '/plugins/markdown/markdown-math',
    '/plugins/markdown/links-check',
    '/plugins/markdown/prismjs',
    '/plugins/markdown/shiki',
  ],

  '/plugins/pwa/': [
    {
      text: 'PWA',
      link: '/plugins/pwa/pwa/',
      items: ['/plugins/pwa/pwa/guide', '/plugins/pwa/pwa/config'],
    },
    '/plugins/pwa/remove-pwa',
  ],

  '/plugins/tools/': [
    '/plugins/tools/google-tag-manager',
    '/plugins/tools/redirect',
    '/plugins/tools/register-components',
  ],

  '/plugins/search/': ['/plugins/search/docsearch', '/plugins/search/search'],

  '/plugins/seo/': [
    {
      text: 'SEO',
      link: '/plugins/seo/seo/',
      items: ['/plugins/seo/seo/guide', '/plugins/seo/seo/config'],
    },
    {
      text: 'Sitemap',
      link: '/plugins/seo/sitemap/',
      items: [
        '/plugins/seo/sitemap/guide',
        '/plugins/seo/sitemap/config',
        '/plugins/seo/sitemap/frontmatter',
      ],
    },
  ],

  '/themes/': [
    {
      text: 'Default Theme',
      link: '/themes/default/',
      items: [
        '/themes/default/config',
        '/themes/default/plugin',
        '/themes/default/locale',
        '/themes/default/sidebar',
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
      items: [
        '/tools/helper/node/bundler',
        '/tools/helper/node/page',
        '/tools/helper/client',
        '/tools/helper/shared',
        '/tools/helper/style',
      ],
    },
  ],
}

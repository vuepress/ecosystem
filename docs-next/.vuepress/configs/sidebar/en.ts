import type { Sidebar } from '@vuepress/theme-default'

export const sidebarEn: Sidebar = {
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
  '/plugins/': [
    {
      text: 'Common Features',
      items: [
        '/plugins/append-date',
        '/plugins/back-to-top',
        '/plugins/catalog',
        '/plugins/copy-code',
        '/plugins/copyright',
        '/plugins/medium-zoom',
        '/plugins/notice',
        '/plugins/nprogress',
        '/plugins/photo-swipe',
        '/plugins/redirect',
        '/plugins/register-components',
        '/plugins/watermark',
      ],
    },
    {
      text: 'Markdown',
      items: ['/plugins/markdown-container', '/plugins/links-check'],
    },
    {
      text: 'Content Search',
      items: ['/plugins/docsearch', '/plugins/search'],
    },
    {
      text: 'Blogging',
      items: [
        {
          text: 'Blog',
          link: '/plugins/blog/',
          items: ['/plugins/blog/guide', '/plugins/blog/config'],
        },
        {
          text: 'Comment',
          link: '/plugins/comment/',
          items: [
            '/plugins/comment/guide',
            '/plugins/comment/giscus/',
            '/plugins/comment/waline/',
            '/plugins/comment/artalk/',
            '/plugins/comment/twikoo/',
          ],
        },
        {
          text: 'Feed',
          link: '/plugins/feed/',
          items: [
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
      items: [
        {
          text: 'PWA',
          link: '/plugins/pwa/',
          items: ['/plugins/pwa/guide', '/plugins/pwa/config'],
        },
        '/plugins/remove-pwa',
      ],
    },
    {
      text: 'SEO',
      items: [
        {
          text: 'SEO',
          link: '/plugins/seo/',
          items: ['/plugins/seo/guide', '/plugins/seo/config'],
        },
        {
          text: 'Sitemap',
          link: '/plugins/sitemap/',
          items: [
            '/plugins/sitemap/guide',
            '/plugins/sitemap/config',
            '/plugins/sitemap/frontmatter',
          ],
        },
        '/plugins/baidu-analytics',
        '/plugins/google-analytics',
        '/plugins/google-tag-manager',
        '/plugins/umami-analytics',
      ],
    },
    {
      text: 'Syntax Highlighting',
      items: ['/plugins/prismjs', '/plugins/shiki'],
    },
    {
      text: 'Theme Development',
      items: [
        '/plugins/active-header-links',
        '/plugins/git',
        '/plugins/palette',
        '/plugins/reading-time',
        '/plugins/rtl',
        {
          text: 'Sass Palette',
          link: '/plugins/sass-palette/',
          items: [
            '/plugins/sass-palette/guide',
            '/plugins/sass-palette/config',
          ],
        },
        '/plugins/theme-data',
        '/plugins/toc',
      ],
    },
  ],
  '/tools/': [
    {
      text: '@vuepress/helper',
      link: '/tools/helper/',
      items: [
        { link: '/tools/helper/node/bundler', text: 'Bundler Related' },
        { link: '/tools/helper/node/page', text: 'Page Related' },
        { link: '/tools/helper/client', text: 'Client Related' },
        { link: '/tools/helper/shared', text: 'Shared Related' },
      ],
    },
  ],
}

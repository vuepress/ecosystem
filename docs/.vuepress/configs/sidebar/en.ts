import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/plugins/': [
    {
      text: 'Common Features',
      children: [
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
      children: ['/plugins/markdown-container', '/plugins/links-check'],
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
          text: 'Comment',
          link: '/plugins/comment/',
          children: [
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
      children: [
        {
          text: 'PWA',
          link: '/plugins/pwa/',
          children: ['/plugins/pwa/guide', '/plugins/pwa/config'],
        },
        '/plugins/remove-pwa',
      ],
    },
    {
      text: 'SEO',
      children: [
        {
          text: 'SEO',
          link: '/plugins/seo/',
          children: ['/plugins/seo/guide', '/plugins/seo/config'],
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
        '/plugins/baidu-analytics',
        '/plugins/google-analytics',
        '/plugins/google-tag-manager',
        '/plugins/umami-analytics',
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
        {
          text: 'Sass Palette',
          link: '/plugins/sass-palette/',
          children: [
            '/plugins/sass-palette/guide',
            '/plugins/sass-palette/config',
          ],
        },
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

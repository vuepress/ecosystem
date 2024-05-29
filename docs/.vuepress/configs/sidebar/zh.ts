import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/plugins/': [
    {
      text: '常用功能',
      link: '/zh/plugins/features/',
    },
    {
      text: 'Markdown',
      link: '/zh/plugins/markdown/',
    },
    {
      text: '搜索',
      link: '/zh/plugins/search/',
    },
    {
      text: '博客',
      link: '/zh/plugins/blog/',
    },

    {
      text: '分析统计',
      link: '/zh/plugins/analytics/',
    },
    {
      text: '搜索引擎优化',
      link: '/zh/plugins/seo/',
    },
    {
      text: '渐进式应用',
      link: '/zh/plugins/pwa/',
    },
    {
      text: '主题开发',
      link: '/zh/plugins/development/',
    },
    {
      text: '工具',
      link: '/zh/plugins/tools/',
    },
  ],

  '/zh/plugins/analytics/': [
    '/zh/plugins/analytics/baidu-analytics',
    '/zh/plugins/analytics/google-analytics',
    '/zh/plugins/analytics/umami-analytics',
  ],

  '/zh/plugins/blog/': [
    {
      text: '博客',
      link: '/zh/plugins/blog/blog/',
      children: ['/zh/plugins/blog/blog/guide', '/zh/plugins/blog/blog/config'],
    },
    {
      text: '评论',
      link: '/zh/plugins/blog/comment/',
      children: [
        '/zh/plugins/blog/comment/guide',
        '/zh/plugins/blog/comment/giscus/',
        '/zh/plugins/blog/comment/waline/',
        '/zh/plugins/blog/comment/artalk/',
        '/zh/plugins/blog/comment/twikoo/',
      ],
    },
    {
      text: 'Feed',
      link: '/zh/plugins/blog/feed/',
      children: [
        '/zh/plugins/blog/feed/guide',
        '/zh/plugins/blog/feed/config',
        '/zh/plugins/blog/feed/frontmatter',
        '/zh/plugins/blog/feed/channel',
        '/zh/plugins/blog/feed/getter',
      ],
    },
  ],

  '/zh/plugins/development/': [
    '/zh/plugins/development/active-header-links',
    '/zh/plugins/development/git',
    '/zh/plugins/development/palette',
    '/zh/plugins/development/reading-time',
    '/zh/plugins/development/rtl',
    {
      text: 'Sass 调色板',
      link: '/zh/plugins/development/sass-palette/',
      children: [
        '/zh/plugins/development/sass-palette/guide',
        '/zh/plugins/development/sass-palette/config',
      ],
    },
    '/zh/plugins/development/theme-data',
    '/zh/plugins/development/toc',
  ],

  '/zh/plugins/features/': [
    '/zh/plugins/features/back-to-top',
    '/zh/plugins/features/catalog',
    '/zh/plugins/features/copy-code',
    '/zh/plugins/features/copyright',
    '/zh/plugins/features/medium-zoom',
    '/zh/plugins/features/notice',
    '/zh/plugins/features/nprogress',
    '/zh/plugins/features/photo-swipe',
    '/zh/plugins/features/watermark',
  ],

  '/zh/plugins/markdown/': [
    '/zh/plugins/markdown/append-date',
    '/zh/plugins/markdown/markdown-container',
    '/zh/plugins/markdown/markdown-image',
    '/zh/plugins/markdown/markdown-math',
    '/zh/plugins/markdown/links-check',
    '/zh/plugins/markdown/prismjs',
    '/zh/plugins/markdown/shiki',
  ],

  '/zh/plugins/pwa/': [
    {
      text: '渐进式应用',
      link: '/zh/plugins/pwa/pwa/',
      children: ['/zh/plugins/pwa/pwa/guide', '/zh/plugins/pwa/pwa/config'],
    },
    '/zh/plugins/pwa/remove-pwa',
  ],

  '/zh/plugins/tools/': [
    '/zh/plugins/tools/google-tag-manager',
    '/zh/plugins/tools/redirect',
    '/zh/plugins/tools/register-components',
  ],

  '/zh/plugins/search/': [
    '/zh/plugins/search/docsearch',
    '/zh/plugins/search/search',
  ],

  '/zh/plugins/seo/': [
    {
      text: '搜索引擎增强',
      link: '/zh/plugins/seo/seo/',
      children: ['/zh/plugins/seo/seo/guide', '/zh/plugins/seo/seo/config'],
    },
    {
      text: '站点地图',
      link: '/zh/plugins/seo/sitemap/',
      children: [
        '/zh/plugins/seo/sitemap/guide',
        '/zh/plugins/seo/sitemap/config',
        '/zh/plugins/seo/sitemap/frontmatter',
      ],
    },
  ],

  '/zh/themes/': [
    {
      text: '默认主题',
      link: '/zh/themes/default/',
      children: [
        '/zh/themes/default/config',
        '/zh/themes/default/plugin',
        '/zh/themes/default/locale',
        '/zh/themes/default/frontmatter',
        '/zh/themes/default/components',
        '/zh/themes/default/markdown',
        '/zh/themes/default/styles',
        '/zh/themes/default/extending',
      ],
    },
  ],

  '/zh/tools/': [
    {
      text: '@vuepress/helper',
      link: '/zh/tools/helper/',
      children: [
        '/zh/tools/helper/node/bundler',
        '/zh/tools/helper/node/page',
        '/zh/tools/helper/client',
        '/zh/tools/helper/shared',
        '/zh/tools/helper/style',
      ],
    },
  ],
}

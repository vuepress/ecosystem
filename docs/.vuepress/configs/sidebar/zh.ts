import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/plugins/': [
    {
      text: '常用功能',
      children: [
        '/zh/plugins/append-date',
        '/zh/plugins/back-to-top',
        '/zh/plugins/catalog',
        '/zh/plugins/copy-code',
        '/zh/plugins/copyright',
        '/zh/plugins/medium-zoom',
        '/zh/plugins/notice',
        '/zh/plugins/nprogress',
        '/zh/plugins/photo-swipe',
        '/zh/plugins/redirect',
        '/zh/plugins/register-components',
        '/zh/plugins/watermark',
      ],
    },
    {
      text: 'Markdown',
      children: ['/zh/plugins/markdown-container', '/zh/plugins/links-check'],
    },
    {
      text: '搜索',
      children: ['/zh/plugins/docsearch', '/zh/plugins/search'],
    },
    {
      text: '博客',
      children: [
        {
          text: '博客',
          link: '/zh/plugins/blog/',
          children: ['/zh/plugins/blog/guide', '/zh/plugins/blog/config'],
        },
        {
          text: '评论',
          link: '/zh/plugins/comment/',
          children: [
            '/zh/plugins/comment/guide',
            '/zh/plugins/comment/giscus/',
            '/zh/plugins/comment/waline/',
            '/zh/plugins/comment/artalk/',
            '/zh/plugins/comment/twikoo/',
          ],
        },
        {
          text: 'Feed',
          link: '/zh/plugins/feed/',
          children: [
            '/zh/plugins/feed/guide',
            '/zh/plugins/feed/config',
            '/zh/themes/default/plugin',
            '/zh/plugins/feed/frontmatter',
            '/zh/plugins/feed/channel',
            '/zh/plugins/feed/getter',
          ],
        },
      ],
    },
    {
      text: 'PWA',
      children: [
        {
          text: 'PWA',
          link: '/zh/plugins/pwa/',
          children: ['/zh/plugins/pwa/guide', '/zh/plugins/pwa/config'],
        },
        '/zh/plugins/remove-pwa',
      ],
    },
    {
      text: '搜索引擎增强',
      children: [
        {
          text: '搜索引擎增强',
          link: '/zh/plugins/seo/',
          children: ['/zh/plugins/seo/guide', '/zh/plugins/seo/config'],
        },
        {
          text: '站点地图',
          link: '/zh/plugins/sitemap/',
          children: [
            '/zh/plugins/sitemap/guide',
            '/zh/plugins/sitemap/config',
            '/zh/plugins/sitemap/frontmatter',
          ],
        },
        '/zh/plugins/baidu-analytics',
        '/zh/plugins/google-analytics',
        '/zh/plugins/google-tag-manager',
        '/zh/plugins/umami-analytics',
      ],
    },
    {
      text: '语法高亮',
      children: ['/zh/plugins/prismjs', '/zh/plugins/shiki'],
    },
    {
      text: '主题开发',
      children: [
        '/zh/plugins/active-header-links',
        '/zh/plugins/git',
        '/zh/plugins/palette',
        '/zh/plugins/reading-time',
        '/zh/plugins/rtl',
        {
          text: 'SASS 调色板',
          link: '/zh/plugins/sass-palette/',
          children: [
            '/zh/plugins/sass-palette/guide',
            '/zh/plugins/sass-palette/config',
          ],
        },
        '/zh/plugins/theme-data',
        '/zh/plugins/toc',
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
      ],
    },
  ],
}

import type { Sidebar } from '@vuepress/theme-default'

export const sidebarZh: Sidebar = {
  '/zh/themes/': [
    {
      text: '默认主题',
      link: '/zh/themes/default/',
      items: [
        '/zh/themes/default/config',
        '/zh/themes/default/plugin',
        '/zh/themes/default/locale',
        '/zh/themes/default/sidebar',
        '/zh/themes/default/frontmatter',
        '/zh/themes/default/components',
        '/zh/themes/default/markdown',
        '/zh/themes/default/styles',
        '/zh/themes/default/extending',
      ],
    },
  ],
  '/zh/plugins/': [
    {
      text: '常用功能',
      items: [
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
      items: ['/zh/plugins/markdown-container', '/zh/plugins/links-check'],
    },
    {
      text: '搜索',
      items: ['/zh/plugins/docsearch', '/zh/plugins/search'],
    },
    {
      text: '博客',
      items: [
        {
          text: '博客',
          link: '/zh/plugins/blog/',
          items: ['/zh/plugins/blog/guide', '/zh/plugins/blog/config'],
        },
        {
          text: '评论',
          link: '/zh/plugins/comment/',
          items: [
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
          items: [
            '/zh/plugins/feed/guide',
            '/zh/plugins/feed/config',
            '/zh/plugins/feed/frontmatter',
            '/zh/plugins/feed/channel',
            '/zh/plugins/feed/getter',
          ],
        },
      ],
    },
    {
      text: 'PWA',
      items: [
        {
          text: 'PWA',
          link: '/zh/plugins/pwa/',
          items: ['/zh/plugins/pwa/guide', '/zh/plugins/pwa/config'],
        },
        '/zh/plugins/remove-pwa',
      ],
    },
    {
      text: '搜索引擎增强',
      items: [
        {
          text: '搜索引擎增强',
          link: '/zh/plugins/seo/',
          items: ['/zh/plugins/seo/guide', '/zh/plugins/seo/config'],
        },
        {
          text: '站点地图',
          link: '/zh/plugins/sitemap/',
          items: [
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
      items: ['/zh/plugins/prismjs', '/zh/plugins/shiki'],
    },
    {
      text: '主题开发',
      items: [
        '/zh/plugins/active-header-links',
        '/zh/plugins/git',
        '/zh/plugins/palette',
        '/zh/plugins/reading-time',
        '/zh/plugins/rtl',
        {
          text: 'SASS 调色板',
          link: '/zh/plugins/sass-palette/',
          items: [
            '/zh/plugins/sass-palette/guide',
            '/zh/plugins/sass-palette/config',
          ],
        },
        '/zh/plugins/theme-data',
        '/zh/plugins/toc',
      ],
    },
  ],
  '/zh/tools/': [
    {
      text: '@vuepress/helper',
      link: '/zh/tools/helper/',
      items: [
        '/zh/tools/helper/node/bundler',
        '/zh/tools/helper/node/page',
        '/zh/tools/helper/client',
        '/zh/tools/helper/shared',
      ],
    },
  ],
}

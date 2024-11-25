import type { Sidebar } from '@vuepress/theme-default'

export const sidebarZh: Sidebar = {
  '/zh/plugins/': [
    {
      text: '常用功能',
      link: 'features/',
    },
    {
      text: 'Markdown',
      link: 'markdown/',
    },
    {
      text: '搜索',
      link: 'search/',
    },
    {
      text: '博客',
      link: 'blog/',
    },

    {
      text: '分析统计',
      link: 'analytics/',
    },
    {
      text: '搜索引擎优化',
      link: 'seo/',
    },
    {
      text: '渐进式应用',
      link: 'pwa/',
    },
    {
      text: '主题开发',
      link: 'development/',
    },
    {
      text: '工具',
      link: 'tools/',
    },
  ],

  '/zh/plugins/analytics/': [
    'baidu-analytics',
    'google-analytics',
    'umami-analytics',
  ],

  '/zh/plugins/blog/': [
    {
      text: '博客',
      prefix: 'blog/',
      link: 'blog/',
      items: ['guide', 'config'],
    },
    {
      text: '评论',
      prefix: 'comment/',
      link: 'comment/',
      items: ['guide', 'giscus/', 'waline/', 'artalk/', 'twikoo/'],
    },
    {
      text: 'Feed',
      prefix: 'feed/',
      link: 'feed/',
      items: ['guide', 'config', 'frontmatter', 'channel', 'getter'],
    },
  ],

  '/zh/plugins/development/': [
    'active-header-links',
    'git',
    'palette',
    'reading-time',
    'rtl',
    {
      text: 'Sass Palette',
      prefix: 'sass-palette/',
      link: 'sass-palette/',
      items: ['guide', 'config'],
    },
    'theme-data',
    'toc',
  ],

  '/zh/plugins/features/': [
    'back-to-top',
    'catalog',
    'copy-code',
    'copyright',
    'medium-zoom',
    'notice',
    'nprogress',
    'photo-swipe',
    'watermark',
  ],

  '/zh/plugins/markdown/': [
    'append-date',
    'markdown-container',
    'markdown-ext',
    'markdown-image',
    'markdown-include',
    'markdown-hint',
    'markdown-math',
    'markdown-stylize',
    'markdown-tab',
    'links-check',
    'prismjs',
    {
      text: 'revealjs',
      prefix: 'revealjs/',
      link: 'revealjs/',
      items: ['', 'demo', 'themes'],
    },
    'shiki',
  ],

  '/zh/plugins/pwa/': [
    {
      text: 'PWA',
      prefix: 'pwa/',
      link: 'pwa/',
      items: ['guide', 'config'],
    },
    '/plugins/pwa/remove-pwa',
  ],

  '/zh/plugins/tools/': [
    'cache',
    'google-tag-manager',
    'redirect',
    'register-components',
  ],

  '/zh/plugins/search/': ['guidelines', 'docsearch', 'search', 'slimsearch'],

  '/zh/plugins/seo/': [
    {
      text: '搜索引擎增强',
      prefix: 'seo/',
      link: 'seo/',
      items: ['guide', 'config'],
    },
    {
      text: '站点地图',
      prefix: 'sitemap/',
      link: 'sitemap/',
      items: ['guide', 'config', 'frontmatter'],
    },
  ],

  '/zh/themes/': [
    'guidelines',
    {
      text: '默认主题',
      prefix: 'default/',
      link: 'default/',
      items: [
        'config',
        'plugin',
        'locale',
        'frontmatter',
        'components',
        'markdown',
        'styles',
        'extending',
      ],
    },
  ],

  '/zh/tools/': [
    {
      text: '@vuepress/helper',
      prefix: 'helper/',
      link: 'helper/',
      items: ['node/bundler', 'node/page', 'client', 'shared', 'style'],
    },
  ],
}

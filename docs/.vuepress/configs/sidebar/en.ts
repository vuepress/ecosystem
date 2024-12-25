import type { SidebarOptions } from '@vuepress/theme-default'

export const sidebarEn: SidebarOptions = {
  '/plugins/': [
    {
      text: 'Common Features',
      link: 'features/',
    },
    {
      text: 'Markdown',
      link: 'markdown/',
    },
    {
      text: 'Content Search',
      link: 'search/',
    },
    {
      text: 'Blogging',
      link: 'blog/',
    },

    {
      text: 'Analytics',
      link: 'analytics/',
    },
    {
      text: 'SEO',
      link: 'seo/',
    },
    {
      text: 'PWA',
      link: 'pwa/',
    },
    {
      text: 'Theme Development',
      link: 'development/',
    },
    {
      text: 'Tools',
      link: 'tools/',
    },
  ],

  '/plugins/analytics/': [
    'baidu-analytics',
    'google-analytics',
    'umami-analytics',
  ],

  '/plugins/blog/': [
    {
      text: 'Blog',
      prefix: 'blog/',
      link: 'blog/',
      children: ['guide', 'config'],
    },
    {
      text: 'Comment',
      prefix: 'comment/',
      link: 'comment/',
      children: ['guide', 'giscus/', 'waline/', 'artalk/', 'twikoo/'],
    },
    {
      text: 'Feed',
      prefix: 'feed/',
      link: 'feed/',
      children: ['guide', 'config', 'frontmatter', 'channel', 'getter'],
    },
  ],

  '/plugins/development/': [
    'active-header-links',
    'git',
    'palette',
    'reading-time',
    'rtl',
    {
      text: 'Sass Palette',
      prefix: 'sass-palette/',
      link: 'sass-palette/',
      children: ['guide', 'config'],
    },
    'theme-data',
    'toc',
  ],

  '/plugins/features/': [
    'back-to-top',
    'catalog',
    'copy-code',
    'copyright',
    'icon',
    'medium-zoom',
    'notice',
    'nprogress',
    'photo-swipe',
    'watermark',
  ],

  '/plugins/markdown/': [
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
      children: ['', 'demo', 'themes'],
    },
    'shiki',
  ],

  '/plugins/pwa/': [
    {
      text: 'PWA',
      prefix: 'pwa/',
      link: 'pwa/',
      children: ['guide', 'config'],
    },
    '/plugins/pwa/remove-pwa',
  ],

  '/plugins/tools/': [
    'cache',
    'google-tag-manager',
    'redirect',
    'register-components',
  ],

  '/plugins/search/': ['guidelines', 'docsearch', 'search', 'slimsearch'],

  '/plugins/seo/': [
    {
      text: 'SEO',
      prefix: 'seo/',
      link: 'seo/',
      children: ['guide', 'config'],
    },
    {
      text: 'Sitemap',
      prefix: 'sitemap/',
      link: 'sitemap/',
      children: ['guide', 'config', 'frontmatter'],
    },
  ],

  '/themes/': [
    'guidelines',
    {
      text: 'Default Theme',
      prefix: 'default/',
      link: 'default/',
      children: [
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

  '/tools/': [
    {
      text: '@vuepress/helper',
      prefix: 'helper/',
      link: 'helper/',
      children: ['node/bundler', 'node/page', 'client', 'shared', 'style'],
    },
  ],
}

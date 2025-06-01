import type { Sidebar } from '@vuepress/theme-default'

export const sidebarEn: Sidebar = {
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
      icon: 'la:blog',
      prefix: 'blog/',
      link: 'blog/',
      items: ['guide', 'config'],
    },
    {
      text: 'Comment',
      icon: 'message-circle-more',
      prefix: 'comment/',
      link: 'comment/',
      items: ['guide', 'giscus/', 'waline/', 'artalk/', 'twikoo/'],
    },
    {
      text: 'Feed',
      icon: 'rss',
      prefix: 'feed/',
      link: 'feed/',
      items: ['guide', 'config', 'frontmatter', 'channel', 'getter'],
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
      icon: 'palette',
      prefix: 'sass-palette/',
      link: 'sass-palette/',
      items: ['guide', 'config'],
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
      icon: 'presentation',
      prefix: 'revealjs/',
      link: 'revealjs/',
      items: ['', 'demo', 'themes'],
    },
    'shiki',
  ],

  '/plugins/pwa/': [
    {
      text: 'PWA',
      icon: 'layout-grid',
      prefix: 'pwa/',
      link: 'pwa/',
      items: ['guide', 'config'],
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
      icon: 'scan-search',
      prefix: 'seo/',
      link: 'seo/',
      items: ['guide', 'config'],
    },
    {
      text: 'Sitemap',
      icon: 'network',
      prefix: 'sitemap/',
      link: 'sitemap/',
      items: ['guide', 'config', 'frontmatter'],
    },
  ],

  '/themes/': [
    'guidelines',
    {
      text: 'Default Theme',
      icon: 'palette',
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
    {
      text: 'Hope Theme',
      icon: 'https://theme-hope-assets.vuejs.press/logo.svg',
      link: 'https://theme-hope.vuejs.press',
    },
    {
      text: 'Plume Theme',
      icon: 'https://theme-plume.vuejs.press/favicon.ico',
      link: 'https://theme-plume.vuejs.press',
    },
    {
      text: 'Reco Theme',
      icon: 'https://theme-reco.vuejs.press/favicon.ico',
      link: 'https://theme-reco.vuejs.press/en',
    },
  ],

  '/tools/': [
    {
      text: '@vuepress/helper',
      icon: 'hammer',
      prefix: 'helper/',
      link: 'helper/',
      items: [
        {
          text: 'Node',
          icon: 'nonicons:node-16',
          prefix: 'node/',
          items: ['bundler', 'locales', 'page'],
        },
        'client',
        'shared',
        'style',
      ],
    },
  ],
}

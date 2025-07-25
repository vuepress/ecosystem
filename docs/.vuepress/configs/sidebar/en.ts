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
    {
      text: 'AI',
      link: 'ai/',
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
      children: ['guide', 'config'],
    },
    {
      text: 'Comment',
      icon: 'message-circle-more',
      prefix: 'comment/',
      link: 'comment/',
      children: ['guide', 'giscus/', 'waline/', 'artalk/', 'twikoo/'],
    },
    {
      text: 'Feed',
      icon: 'rss',
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
      icon: 'palette',
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
    {
      text: 'markdown-chart',
      icon: 'chart-no-axes-combined',
      prefix: 'markdown-chart/',
      link: 'markdown-chart/',
      children: [
        '',
        'chartjs',
        'echarts',
        'flowchart',
        'markmap',
        'mermaid',
        'plantuml',
      ],
    },
    'markdown-container',
    'markdown-ext',
    'markdown-image',
    'markdown-include',
    'markdown-hint',
    'markdown-math',
    'markdown-preview',
    'markdown-stylize',
    'markdown-tab',
    'links-check',
    'prismjs',
    {
      text: 'revealjs',
      icon: 'presentation',
      prefix: 'revealjs/',
      link: 'revealjs/',
      children: ['', 'demo', 'themes'],
    },
    'shiki',
  ],

  '/plugins/pwa/': [
    {
      text: 'PWA',
      icon: 'layout-grid',
      prefix: 'pwa/',
      link: 'pwa/',
      children: ['guide', 'config'],
    },
    '/plugins/pwa/remove-pwa',
  ],

  '/plugins/tools/': [
    'auto-frontmatter',
    'cache',
    'google-tag-manager',
    'redirect',
    'register-components',
    'replace-assets',
  ],

  '/plugins/search/': [
    'guidelines',
    'docsearch',
    'meilisearch',
    'search',
    'slimsearch',
  ],

  '/plugins/seo/': [
    {
      text: 'SEO',
      icon: 'scan-search',
      prefix: 'seo/',
      link: 'seo/',
      children: ['guide', 'config'],
    },
    {
      text: 'Sitemap',
      icon: 'network',
      prefix: 'sitemap/',
      link: 'sitemap/',
      children: ['guide', 'config', 'frontmatter'],
    },
  ],

  '/plugins/ai/': ['llms'],

  '/themes/': [
    'guidelines',
    {
      text: 'Default Theme',
      icon: 'palette',
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
      children: [
        {
          text: 'Node',
          icon: 'nonicons:node-16',
          prefix: 'node/',
          children: ['bundler', 'locales', 'page'],
        },
        'client',
        'shared',
        'style',
      ],
    },
  ],
}

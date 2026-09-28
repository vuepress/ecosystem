import type { SidebarOptions } from '@vuepress/theme-default'

export const sidebarEn: SidebarOptions = {
  '/plugins/': [
    {
      text: 'Common Features',
      icon: 'sparkles',
      link: 'features/',
    },
    {
      text: 'Markdown',
      icon: 'octicon:markdown-16',
      link: 'markdown/',
    },
    {
      text: 'Content Search',
      icon: 'search',
      link: 'search/',
    },
    {
      text: 'Blogging',
      icon: 'la:blog',
      link: 'blog/',
    },

    {
      text: 'Analytics',
      icon: 'chart-no-axes-combined',
      link: 'analytics/',
    },
    {
      text: 'SEO',
      icon: 'scan-search',
      link: 'seo/',
    },
    {
      text: 'PWA',
      icon: 'layout-grid',
      link: 'pwa/',
    },
    {
      text: 'Theme Development',
      icon: 'server-cog',
      link: 'development/',
    },
    {
      text: 'Tools',
      icon: 'hammer',
      link: 'tools/',
    },
    {
      text: 'AI',
      icon: 'eos-icons:ai',
      link: 'ai/',
    },
  ],

  '/plugins/analytics/': [
    'baidu-analytics',
    'clarity-analytics',
    'google-analytics',
    'umami-analytics',
  ],

  '/plugins/blog/': [
    {
      text: 'Blog',
      icon: 'la:blog',
      link: 'blog',
    },
    {
      text: 'Comment',
      icon: 'message-circle-more',
      prefix: 'comment/',
      link: 'comment/',
      children: [
        'guide',
        {
          text: 'Giscus',
          icon: 'github',
          link: 'giscus',
        },
        {
          text: 'Waline',
          icon: 'https://waline.js.org/favicon.ico',
          prefix: 'waline/',
          link: 'waline/',
          children: ['', 'config'],
        },
        {
          text: 'Artalk',
          icon: 'https://artalk.js.org/favicon.png',
          link: 'artalk',
        },
        {
          text: 'Twikoo',
          icon: 'https://twikoo.js.org/twikoo-logo-mini.png',
          link: 'twikoo',
        },
      ],
    },
    {
      text: 'Feed',
      icon: 'rss',
      link: 'feed',
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
      link: 'sass-palette',
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
    'media',
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
    'markdown-field',
    'markdown-file-tree',
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
      link: 'pwa',
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
    'orama',
  ],

  '/plugins/seo/': [
    {
      text: 'SEO',
      icon: 'scan-search',
      link: 'seo',
    },
    {
      text: 'Sitemap',
      icon: 'network',
      link: 'sitemap',
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

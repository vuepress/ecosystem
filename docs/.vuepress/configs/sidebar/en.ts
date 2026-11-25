import type { SidebarOptions } from '@vuepress/theme-classic'

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
    'clarity-analytics',
    'google-analytics',
    'umami-analytics',
  ],

  '/plugins/blog/': [
    {
      text: 'Blog',
      link: 'blog',
    },
    {
      text: 'Comment',
      prefix: 'comment/',
      link: 'comment/',
      children: [
        'guide',
        'giscus',
        {
          text: 'Waline',
          prefix: 'waline/',
          link: 'waline/',
          children: ['', 'config'],
        },
        'artalk',
        'twikoo',
      ],
    },
    {
      text: 'Feed',
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
    'share',
    'watermark',
  ],

  '/plugins/markdown/': [
    'append-date',
    {
      text: 'markdown-chart',
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
    'markdown-raw',
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
    'flexsearch',
  ],

  '/plugins/seo/': [
    {
      text: 'SEO',
      link: 'seo',
    },
    {
      text: 'Sitemap',
      link: 'sitemap',
    },
  ],

  '/plugins/ai/': ['llms'],

  '/themes/': [
    'guidelines',
    {
      text: 'Default Theme',
      prefix: 'default/',
      link: 'default/',
      children: [
        'config',
        'frontmatter',
        'plugin',
        'locale',
        'components',
        'markdown',
        'styles',
        'extending',
        'migrating-from-classic',
        'differences',
      ],
    },
    {
      text: 'Classic Theme',
      prefix: 'classic/',
      link: 'classic/',
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
    {
      text: '@vuepress/theme-helper',
      icon: 'hammer',
      link: 'theme-helper',
    },
    {
      text: '@vuepress/test-utils',
      link: 'test-utils',
    },
  ],
}

import type { SidebarOptions } from '@vuepress/theme-classic'

export const sidebarZh: SidebarOptions = {
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
    {
      text: 'AI',
      link: 'ai/',
    },
  ],

  '/zh/plugins/analytics/': [
    'baidu-analytics',
    'clarity-analytics',
    'google-analytics',
    'umami-analytics',
  ],

  '/zh/plugins/blog/': [
    {
      text: '博客',
      link: 'blog',
    },
    {
      text: '评论',
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

  '/zh/plugins/development/': [
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

  '/zh/plugins/features/': [
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

  '/zh/plugins/markdown/': [
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

  '/zh/plugins/pwa/': [
    {
      text: 'PWA',
      link: 'pwa',
    },
    '/zh/plugins/pwa/remove-pwa',
  ],

  '/zh/plugins/tools/': [
    'auto-frontmatter',
    'cache',
    'google-tag-manager',
    'redirect',
    'register-components',
    'replace-assets',
  ],

  '/zh/plugins/search/': [
    'guidelines',
    'docsearch',
    'meilisearch',
    'search',
    'slimsearch',
    'orama',
    'flexsearch',
  ],

  '/zh/plugins/seo/': [
    {
      text: '搜索引擎增强',
      link: 'seo',
    },
    {
      text: '站点地图',
      link: 'sitemap',
    },
  ],

  '/zh/plugins/ai/': ['llms'],

  '/zh/themes/': [
    'guidelines',
    {
      text: '默认主题',
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
      text: '经典主题',
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
      text: 'Hope 主题',
      icon: 'https://theme-hope-assets.vuejs.press/logo.svg',
      link: 'https://theme-hope.vuejs.press/zh/',
    },
    {
      text: 'Plume 主题',
      icon: 'https://theme-plume.vuejs.press/favicon.ico',
      link: 'https://theme-plume.vuejs.press',
    },
    {
      text: 'Reco 主题',
      icon: 'https://theme-reco.vuejs.press/favicon.ico',
      link: 'https://theme-reco.vuejs.press',
    },
  ],

  '/zh/tools/': [
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

import type { SidebarOptions } from '@vuepress/theme-default'

export const sidebarZh: SidebarOptions = {
  '/zh/plugins/': [
    {
      text: '常用功能',
      icon: 'sparkles',
      link: 'features/',
    },
    {
      text: 'Markdown',
      icon: 'octicon:markdown-16',
      link: 'markdown/',
    },
    {
      text: '搜索',
      icon: 'search',
      link: 'search/',
    },
    {
      text: '博客',
      icon: 'la:blog',
      link: 'blog/',
    },

    {
      text: '分析统计',
      icon: 'chart-no-axes-combined',
      link: 'analytics/',
    },
    {
      text: '搜索引擎优化',
      icon: 'scan-search',
      link: 'seo/',
    },
    {
      text: '渐进式应用',
      icon: 'layout-grid',
      link: 'pwa/',
    },
    {
      text: '主题开发',
      icon: 'server-cog',
      link: 'development/',
    },
    {
      text: '工具',
      icon: 'hammer',
      link: 'tools/',
    },
    {
      text: 'AI',
      icon: 'eos-icons:ai',
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
      icon: 'la:blog',
      link: 'blog',
    },
    {
      text: '评论',
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

  '/zh/plugins/development/': [
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
    'watermark',
  ],

  '/zh/plugins/markdown/': [
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

  '/zh/plugins/pwa/': [
    {
      text: 'PWA',
      icon: 'layout-grid',
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
      icon: 'scan-search',
      link: 'seo',
    },
    {
      text: '站点地图',
      icon: 'network',
      link: 'sitemap',
    },
  ],

  '/zh/plugins/ai/': ['llms'],

  '/zh/themes/': [
    'guidelines',
    {
      text: '默认主题',
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

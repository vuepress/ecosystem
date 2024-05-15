import type { NavItem } from '@vuepress/theme-default'

export const navbarZh: NavItem[] = [
  {
    text: '主题',
    items: [
      {
        text: '默认主题',
        link: '/zh/themes/default/',
      },
      {
        text: 'Hope 主题',
        link: 'https://theme-hope.vuejs.press',
      },
      {
        text: 'Plume 主题',
        link: 'https://theme-plume.vuejs.press',
      },
    ],
  },
  {
    text: '插件',
    activeMatch: '^/zh/plugins/',
    items: [
      {
        text: '常用功能',
        prefix: '/zh/plugins',
        items: [
          'append-date',
          'back-to-top',
          'catalog',
          'copy-code',
          'copyright',
          'medium-zoom',
          'nprogress',
          'photo-swipe',
          'redirect',
          'register-components',
          'watermark',
        ],
      },
      {
        text: 'Markdown',
        prefix: '/zh/plugins/',
        items: ['markdown-container', 'links-check'],
      },
      {
        text: '搜索',
        prefix: '/zh/plugins/',
        items: ['docsearch', 'search'],
      },
      {
        text: '博客',
        prefix: '/zh/plugins/',
        items: ['blog/', 'comment/', 'feed/'],
      },
      {
        text: 'PWA',
        prefix: '/zh/plugins/',
        items: ['pwa/', 'remove-pwa'],
      },
      {
        text: '搜索引擎增强',
        prefix: '/zh/plugins/',
        items: [
          'baidu-analytics',
          'google-analytics',
          'google-tag-manager',
          'seo/',
          'sitemap/',
          'umami-analytics',
        ],
      },
      {
        text: '语法高亮',
        prefix: '/zh/plugins/',
        items: ['prismjs', 'shiki'],
      },
      {
        text: '主题开发',
        prefix: '/zh/plugins/',
        items: [
          'active-header-links',
          'git',
          'palette',
          'reading-time',
          'rtl',
          'sass-palette/',
          'theme-data',
          'toc',
        ],
      },
    ],
  },
  {
    text: '工具',
    activeMatch: '^/zh/tools/',
    items: [
      {
        text: 'helper',
        link: '/zh/tools/helper/',
      },
    ],
  },
]

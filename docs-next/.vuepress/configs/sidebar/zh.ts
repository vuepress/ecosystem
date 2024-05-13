import type { Sidebar } from '@vuepress/theme-default'

export const sidebarZh: Sidebar = {
  '/zh/themes/': [
    {
      text: 'Default Theme',
      link: '/zh/themes/default/',
      base: '/zh/themes/default/',
      items: [
        { link: 'config', text: '配置' },
        { link: 'plugin', text: '插件配置' },
        { link: 'locale', text: '语法配置' },
        { link: 'sidebar', text: '侧边栏' },
        { link: '/zh/themes/default/frontmatter', text: 'Frontmatter' },
        { link: '/zh/themes/default/components', text: '内置组件' },
        { link: '/zh/themes/default/markdown', text: 'Markdown' },
        { link: '/zh/themes/default/styles', text: '样式' },
        { link: '/zh/themes/default/extending', text: '继承' },
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
        '/zh/plugins/nprogress',
        '/zh/plugins/photo-swipe',
        '/zh/plugins/redirect',
        '/zh/plugins/register-components',
        '/zh/plugins/watermark',
      ],
    },
    {
      text: 'Markdown',
      items: ['/zh/plugins/container', '/zh/plugins/links-check'],
    },
    {
      text: '搜索',
      items: ['/zh/plugins/docsearch', '/zh/plugins/search'],
    },
    {
      text: '博客',
      items: ['/zh/plugins/blog/', '/zh/plugins/comment/', '/zh/plugins/feed/'],
    },
    {
      text: 'PWA',
      items: ['/zh/plugins/pwa/', '/zh/plugins/remove-pwa'],
    },
    {
      text: '搜索引擎增强',
      items: [
        '/zh/plugins/baidu-analytics',
        '/zh/plugins/google-analytics',
        '/zh/plugins/google-tag-manager',
        '/zh/plugins/seo/',
        '/zh/plugins/sitemap/',
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
        '/zh/plugins/sass-palette/',
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
        { link: '/zh/tools/helper/node/bundler', text: '打包器相关' },
        { link: '/zh/tools/helper/node/page', text: '页面相关' },
        { link: '/zh/tools/helper/client', text: '客户端相关' },
        { link: '/zh/tools/helper/shared', text: '共享方法' },
      ],
    },
  ],
}

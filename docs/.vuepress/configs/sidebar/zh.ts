import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarZh: SidebarConfig = {
  '/zh/plugins/': [
    {
      text: '常用功能',
      children: [
        '/zh/plugins/back-to-top',
        '/zh/plugins/container',
        '/zh/plugins/external-link-icon',
        '/zh/plugins/google-analytics',
        '/zh/plugins/medium-zoom',
        '/zh/plugins/nprogress',
        '/zh/plugins/register-components',
      ],
    },
    {
      text: '搜索',
      children: ['/zh/plugins/docsearch', '/zh/plugins/search'],
    },
    {
      text: 'PWA',
      children: ['/zh/plugins/pwa', '/zh/plugins/pwa-popup'],
    },
    {
      text: '搜索引擎增强',
      children: [
        {
          text: '搜索引擎增强',
          link: '/zh/plugins/seo/',
          children: ['/zh/plugins/seo/guide', '/zh/plugins/seo/config'],
        },
        {
          text: '站点地图',
          link: '/zh/plugins/sitemap/',
          children: [
            '/zh/plugins/sitemap/guide',
            '/zh/plugins/sitemap/config',
            '/zh/plugins/sitemap/frontmatter',
          ],
        },
      ],
    },
    {
      text: '语法高亮',
      children: ['/zh/plugins/prismjs', '/zh/plugins/shiki'],
    },
    {
      text: '主题开发',
      children: [
        '/zh/plugins/active-header-links',
        '/zh/plugins/git',
        '/zh/plugins/palette',
        '/zh/plugins/theme-data',
        '/zh/plugins/toc',
      ],
    },
  ],
  '/zh/themes/': [
    {
      text: '默认主题',
      children: [
        '/zh/themes/default/',
        '/zh/themes/default/config',
        '/zh/themes/default/frontmatter',
        '/zh/themes/default/components',
        '/zh/themes/default/markdown',
        '/zh/themes/default/styles',
        '/zh/themes/default/extending',
      ],
    },
  ],
}

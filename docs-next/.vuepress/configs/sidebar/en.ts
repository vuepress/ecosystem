import type { Sidebar } from '@vuepress/theme-default'

export const sidebarEn: Sidebar = {
  '/themes/': [
    {
      text: 'Default Theme',
      link: '/themes/default/',
      items: [
        { link: '/themes/default/config', text: 'Config' },
        { link: '/themes/default/plugin', text: 'Plugin' },
        { link: '/themes/default/locale', text: 'Locale' },
        { link: '/themes/default/sidebar', text: 'Sidebar' },
        { link: '/themes/default/frontmatter', text: 'Frontmatter' },
        { link: '/themes/default/components', text: 'Components' },
        { link: '/themes/default/markdown', text: 'Markdown' },
        { link: '/themes/default/styles', text: 'Styles' },
        { link: '/themes/default/extending', text: 'Extending' },
      ],
    },
  ],
  '/plugins/': [
    {
      text: 'Common Features',
      items: [
        { link: '/plugins/append-date', text: 'append-date' },
        { link: '/plugins/back-to-top', text: 'back-to-top' },
        { link: '/plugins/catalog', text: 'catalog' },
        { link: '/plugins/copy-code', text: 'copy-code' },
        { link: '/plugins/copyright', text: 'copyright' },
        { link: '/plugins/medium-zoom', text: 'medium-zoom' },
        { link: '/plugins/nprogress', text: 'nprogress' },
        { link: '/plugins/photo-swipe', text: 'photo-swipe' },
        { link: '/plugins/redirect', text: 'redirect' },
        {
          link: '/plugins/register-components',
          text: 'register-components',
        },
        { link: '/plugins/watermark', text: 'watermark' },
      ],
    },
    {
      text: 'Markdown',
      items: [
        { link: '/plugins/container', text: 'container' },
        { link: '/plugins/links-check', text: 'links-check' },
      ],
    },
    {
      text: 'Search',
      items: [
        { link: '/plugins/docsearch', text: 'docsearch' },
        { link: '/plugins/search', text: 'search' },
      ],
    },
    {
      text: 'Blogging',
      items: [
        { link: '/plugins/blog/', text: 'blog' },
        { link: '/plugins/comment/', text: 'comment' },
        { link: '/plugins/feed/', text: 'feed' },
      ],
    },
    {
      text: 'PWA',
      items: [
        { link: '/plugins/pwa/', text: 'pwa' },
        { link: '/plugins/remove-pwa', text: 'remove-pwa' },
      ],
    },
    {
      text: 'SEO',
      items: [
        { link: '/plugins/baidu-analytics', text: 'baidu-analytics' },
        { link: '/plugins/google-analytics', text: 'google-analytics' },
        { link: '/plugins/seo/', text: 'seo' },
        { link: '/plugins/sitemap/', text: 'sitemap' },
        { link: '/plugins/umami-analytics', text: 'umami-analytics' },
      ],
    },
    {
      text: 'Syntax Highlighting',
      items: [
        { link: '/plugins/prismjs', text: 'prismjs' },
        { link: '/plugins/shiki', text: 'shiki' },
      ],
    },
    {
      text: 'Theme Development',
      items: [
        {
          link: '/plugins/active-header-links',
          text: 'active-header-links',
        },
        { link: '/plugins/git', text: 'git' },
        { link: '/plugins/palette', text: 'palette' },
        { link: '/plugins/reading-time', text: 'reading-time' },
        { link: '/plugins/rtl', text: 'rtl' },
        { link: '/plugins/sass-palette/', text: 'sass-palette' },
        { link: '/plugins/theme-data', text: 'theme-data' },
        { link: '/plugins/toc', text: 'toc' },
      ],
    },
  ],
  '/tools/': [
    {
      text: '@vuepress/helper',
      link: '/tools/helper/',
      items: [
        { link: '/tools/helper/node/bundler', text: 'Bundler Related' },
        { link: '/tools/helper/node/page', text: 'Page Related' },
        { link: '/tools/helper/client', text: 'Client Related' },
        { link: '/tools/helper/shared', text: 'Shared Related' },
      ],
    },
  ],
}

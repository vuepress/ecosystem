import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/plugins/': [
    {
      text: 'Common Features',
      children: [
        '/plugins/back-to-top.md',
        '/plugins/container.md',
        '/plugins/external-link-icon.md',
        '/plugins/google-analytics.md',
        '/plugins/medium-zoom.md',
        '/plugins/nprogress.md',
        '/plugins/register-components.md',
      ],
    },
    {
      text: 'Content Search',
      children: ['/plugins/docsearch.md', '/plugins/search.md'],
    },
    {
      text: 'PWA',
      children: ['/plugins/pwa.md', '/plugins/pwa-popup.md'],
    },
    {
      text: 'Syntax Highlighting',
      children: ['/plugins/prismjs.md', '/plugins/shiki.md'],
    },
    {
      text: 'Theme Development',
      children: [
        '/plugins/active-header-links.md',
        '/plugins/git.md',
        '/plugins/palette.md',
        '/plugins/theme-data.md',
        '/plugins/toc.md',
      ],
    },
  ],
  '/themes/': [
    {
      text: 'Default Theme',
      children: [
        '/themes/default/config.md',
        '/themes/default/frontmatter.md',
        '/themes/default/components.md',
        '/themes/default/markdown.md',
        '/themes/default/styles.md',
        '/themes/default/extending.md',
      ],
    },
  ],
}

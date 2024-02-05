import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { blogPlugin } from '@vuepress/plugin-blog'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { copyrightPlugin } from '@vuepress/plugin-copyright'
import { feedPlugin } from '@vuepress/plugin-feed'
import { redirectPlugin } from '@vuepress/plugin-redirect'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import type { UserConfig } from 'vuepress/cli'
import { path } from 'vuepress/utils'

const E2E_BASE = (process.env.E2E_BASE ?? '/') as '/' | `/${string}/`
const E2E_BUNDLER = process.env.E2E_BUNDLER ?? 'vite'

export default defineUserConfig({
  base: E2E_BASE,

  dest: path.join(__dirname, 'dist', E2E_BASE),

  port: 9080,

  head: [
    ['meta', { name: 'foo', content: 'foo' }],
    ['meta', { name: 'bar', content: 'bar' }],
    ['meta', { name: 'baz', content: 'baz' }],
  ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress Ecosystem E2E',
      description: 'VuePress Ecosystem E2E Test Site',
    },
  },

  markdown: {
    assets: {
      // FIXME
      absolutePathPrependBase: E2E_BUNDLER === 'webpack',
    },
  },

  bundler: E2E_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  theme: defaultTheme({
    hostname: 'https://ecosystem-e2e-test.com',
    logo: 'https://v2.vuepress.vuejs.org/images/hero.png',
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Dropdown',
        children: [
          {
            text: 'sidebar',
            link: '/sidebar/',
          },
        ],
      },
    ],

    sidebar: {
      '/sidebar/heading/': 'heading',
      '/sidebar/config/': [
        {
          text: 'Sidebar',
          link: '/sidebar/config/',
          children: [
            { text: 'sidebar 1', link: '/sidebar/config/1.html' },
            { text: 'sidebar 2', link: '/sidebar/config/2.html' },
          ],
        },
      ],
      '/': [],
    },

    themePlugins: {
      sitemap: {
        devServer: true,
        devHostname: 'https://ecosystem-e2e-test.com',
        excludePaths: ['/sitemap/config-exclude.html', '/404.html'],
      },
    },
  }),

  plugins: [
    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || '',
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === 'string'
            ? frontmatter.excerpt
            : data?.excerpt || '',
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== 'string',

      category: [
        {
          key: 'category',
          getter: (page): string[] =>
            (page.frontmatter.category as string[]) || [],
          layout: 'Category',
          itemLayout: 'Category',
          frontmatter: (): Record<string, unknown> => ({
            title: 'Categories',
            sidebar: false,
          }),
          itemFrontmatter: (name): Record<string, unknown> => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: 'tag',
          getter: (page): string[] => (page.frontmatter.tag as string[]) || [],
          layout: 'Tag',
          itemLayout: 'Tag',
          frontmatter: (): Record<string, unknown> => ({
            title: 'Tags',
            sidebar: false,
          }),
          itemFrontmatter: (name): Record<string, unknown> => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: 'article',
          // Remove archive articles
          filter: (page): boolean => !page.frontmatter.archive,
          layout: 'Article',
          frontmatter: (): Record<string, unknown> => ({
            title: 'Articles',
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB): number => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return (
                (pageB.frontmatter.sticky as number) -
                (pageA.frontmatter.sticky as number)
              )

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1

            if (!pageB.frontmatter.date) return 1
            if (!pageA.frontmatter.date) return -1

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            )
          },
        },
        {
          key: 'timeline',
          // Only article with date should be added to timeline
          filter: (page): boolean => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB): number =>
            new Date(pageB.frontmatter.date as Date).getTime() -
            new Date(pageA.frontmatter.date as Date).getTime(),
          layout: 'Timeline',
          frontmatter: (): Record<string, unknown> => ({
            title: 'Timeline',
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
    catalogPlugin(),
    copyrightPlugin(),
    feedPlugin({
      hostname: 'https://ecosystem-e2e-test.com',
      devServer: true,
      devHostname: 'https://example.com',
      atom: true,
      json: true,
      rss: true,
    }),
    redirectPlugin({
      config: {
        '/redirect/config.html': '/redirect/final.html',
        '/redirect/': '/redirect/final.html',
      },
    }),
  ],
}) as UserConfig

import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { simpleBlogPlugin } from './blog-plugin.js'

export default defineUserConfig({
  lang: 'en-US',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      '/',
      {
        text: 'Article',
        link: '/article/',
      },
      {
        text: 'Category',
        link: '/category/',
      },
      {
        text: 'Tag',
        link: '/tag/',
      },
      {
        text: 'Timeline',
        link: '/timeline/',
      },
    ],
  }),

  plugins: [
    simpleBlogPlugin({
      // only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith('posts/') : false,

      // getting article info
      getInfo: ({ frontmatter, title }) => ({
        title,
        author: frontmatter.author || '',
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt: frontmatter.excerpt || '',
      }),

      category: ['category', 'tag'],

      type: [
        {
          key: 'article',
          // remove archive articles
          filter: (page) => !page.frontmatter.archive,

          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky

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
          // only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
        },
      ],
    }),
  ],
})

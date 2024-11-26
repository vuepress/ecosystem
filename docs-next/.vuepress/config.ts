import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { getRealPath } from '@vuepress/helper'
import { cachePlugin } from '@vuepress/plugin-cache'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { commentPlugin } from '@vuepress/plugin-comment'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { feedPlugin } from '@vuepress/plugin-feed'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { revealJsPlugin } from '@vuepress/plugin-revealjs'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'
import { head } from './configs/index.js'
import theme from './theme.js'

const __dirname = getDirname(import.meta.url)

// const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value
  base: (process.env.BASE as '/' | `/${string}/` | undefined) || '/',
  lang: 'en-US',

  // extra tags in `<head>`
  head,

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VuePress Ecosystem',
      description: 'VuePress official themes and plugins',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VuePress 生态系统',
      description: 'VuePress 官方主题和插件',
    },
  },

  // specify bundler via environment variable
  bundler:
    process.env.DOCS_BUNDLER === 'webpack' ? webpackBundler() : viteBundler(),

  // configure markdown
  markdown: {
    importCode: {
      handleImportPath: (importPath) => {
        // handle @vuepress packages import path
        if (importPath.startsWith('@vuepress/')) {
          const packageName = importPath.match(/^(@vuepress\/[^/]*)/)![1]
          const realPath = importPath.replace(
            packageName,
            path.dirname(
              getRealPath(`${packageName}/package.json`, import.meta.url),
            ),
          )

          return realPath
        }
        return importPath
      },
    },
  },

  plugins: [
    catalogPlugin(),
    docsearchPlugin(),
    commentPlugin({ provider: 'Giscus' }),
    markdownExtPlugin({
      gfm: true,
      component: true,
      vPre: true,
    }),
    markdownImagePlugin({
      figure: true,
      mark: true,
      size: true,
    }),
    markdownIncludePlugin({
      deep: true,
    }),
    markdownMathPlugin(),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    feedPlugin({
      hostname: 'https://ecosystem.vuejs.press',
      atom: true,
      json: true,
      rss: true,
    }),
    markdownStylizePlugin({
      align: true,
      attrs: true,
      mark: true,
      spoiler: true,
      sub: true,
      sup: true,
      custom: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended',
              }

            return null
          },
        },
      ],
    }),

    revealJsPlugin({
      plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      themes: [
        'auto',
        'beige',
        'black',
        'blood',
        'league',
        'moon',
        'night',
        'serif',
        'simple',
        'sky',
        'solarized',
        'white',
      ],
    }),

    process.env.HIGHLIGHTER === 'prismjs'
      ? prismjsPlugin({
          themes: { light: 'one-light', dark: 'one-dark' },
          lineNumbers: 10,
          notationDiff: true,
          notationErrorLevel: true,
          notationFocus: true,
          notationHighlight: true,
          notationWordHighlight: true,
          whitespace: true,
        })
      : [],

    cachePlugin(),
  ],

  // configure default theme
  theme,
})
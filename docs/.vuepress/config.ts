import process from 'node:process'
import { footnote } from '@mdit/plugin-footnote'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { getRealPath } from '@vuepress/helper'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { commentPlugin } from '@vuepress/plugin-comment'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { feedPlugin } from '@vuepress/plugin-feed'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { redirectPlugin } from '@vuepress/plugin-redirect'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { defineUserConfig } from 'vuepress'
import type { UserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'
import { head } from './configs/index.js'
import theme from './theme.js'

const __dirname = getDirname(import.meta.url)

const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value
  base: (process.env.BASE as `/${string}/` | '/') || '/',

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
    code: false,
    importCode: {
      handleImportPath: (importPath) => {
        // handle @vuepress packages import path
        if (importPath.startsWith('@vuepress/')) {
          const packageName = importPath.match(/^(@vuepress\/[^/]*)/)![1]
          return importPath
            .replace(
              packageName,
              path.dirname(
                getRealPath(`${packageName}/package.json`, import.meta.url),
              ),
            )
            .replace('/src/', '/lib/')
            .replace(/hotKey\.ts$/, 'hotKey.d.ts')
        }
        return importPath
      },
    },
  },

  extendsMarkdown: (md) => {
    md.use(footnote)

    // FIXME: Should be removed with next vuepress version
    const rawFence = md.renderer.rules.fence!
    const rawCodeInline = md.renderer.rules.code_inline!

    md.renderer.rules.fence = (...args) => {
      const result = rawFence(...args)
      return result.replace('<pre', '<pre v-pre ')
    }

    md.renderer.rules.code_inline = (...args) => {
      const result = rawCodeInline(...args)
      return `<code v-pre${result.slice('<code'.length)}`
    }
  },

  // configure default theme
  theme,

  // use plugins
  plugins: [
    catalogPlugin(),
    commentPlugin({ provider: 'Giscus' }),
    docsearchPlugin(),
    feedPlugin({
      hostname: 'https://ecosystem.vuejs.press',
      atom: true,
      json: true,
      rss: true,
    }),
    markdownImagePlugin({
      figure: true,
      mark: true,
      size: true,
    }),
    markdownMathPlugin(),
    redirectPlugin({
      switchLocale: 'modal',
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin(),
    // only enable shiki plugin in production mode
    isProd
      ? shikiPlugin({
          langs: ['bash', 'diff', 'json', 'md', 'ts', 'vue'],
          theme: 'dark-plus',
          lineNumbers: 10,
          notationDiff: true,
          notationErrorLevel: true,
          notationFocus: true,
          notationHighlight: true,
        })
      : [],
  ],
}) as UserConfig

import { createRequire } from 'node:module'
import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { commentPlugin } from '@vuepress/plugin-comment'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { defineUserConfig } from 'vuepress'
import type { UserConfig } from 'vuepress'
import { /* getDirname, */ path } from 'vuepress/utils'
import { head } from './configs/index.js'
import theme from './theme.js'

// const __dirname = getDirname(import.meta.url)
const require = createRequire(import.meta.url)

// const isProd = process.env.NODE_ENV === 'production'

export default defineUserConfig({
  // set site base to default value
  base: (process.env.BASE as `/${string}/` | '/') || '/',
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
    code: {
      lineNumbers: 10,
    },
    importCode: {
      handleImportPath: (importPath) => {
        // handle @vuepress packages import path
        if (importPath.startsWith('@vuepress/')) {
          const packageName = importPath.match(/^(@vuepress\/[^/]*)/)![1]
          return importPath
            .replace(
              packageName,
              path.dirname(require.resolve(`${packageName}/package.json`)),
            )
            .replace('/src/', '/lib/')
            .replace(/hotKey\.ts$/, 'hotKey.d.ts')
        }
        return importPath
      },
    },
  },

  plugins: [
    catalogPlugin(),
    docsearchPlugin(),
    commentPlugin({ provider: 'Giscus' }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],

  // configure default theme
  theme,
}) as UserConfig

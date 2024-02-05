import { createRequire } from 'node:module'
import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { catalogPlugin } from '@vuepress/plugin-catalog'
// import { docsearchPlugin } from '@vuepress/plugin-docsearch'
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
const require = createRequire(import.meta.url)

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
      description: 'VuePress official themes plugins',
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

  // configure default theme
  theme,

  // use plugins
  plugins: [
    catalogPlugin(),
    // docsearchPlugin({
    //   appId: '34YFD9IUQ2',
    //   apiKey: '9a9058b8655746634e01071411c366b8',
    //   indexName: 'vuepress',
    //   searchParameters: {
    //     facetFilters: ['tags:v2'],
    //   },
    //   locales: {
    //     '/zh/': {
    //       placeholder: '搜索文档',
    //       translations: {
    //         button: {
    //           buttonText: '搜索文档',
    //           buttonAriaLabel: '搜索文档',
    //         },
    //         modal: {
    //           searchBox: {
    //             resetButtonTitle: '清除查询条件',
    //             resetButtonAriaLabel: '清除查询条件',
    //             cancelButtonText: '取消',
    //             cancelButtonAriaLabel: '取消',
    //           },
    //           startScreen: {
    //             recentSearchesTitle: '搜索历史',
    //             noRecentSearchesText: '没有搜索历史',
    //             saveRecentSearchButtonTitle: '保存至搜索历史',
    //             removeRecentSearchButtonTitle: '从搜索历史中移除',
    //             favoriteSearchesTitle: '收藏',
    //             removeFavoriteSearchButtonTitle: '从收藏中移除',
    //           },
    //           errorScreen: {
    //             titleText: '无法获取结果',
    //             helpText: '你可能需要检查你的网络连接',
    //           },
    //           footer: {
    //             selectText: '选择',
    //             navigateText: '切换',
    //             closeText: '关闭',
    //             searchByText: '搜索提供者',
    //           },
    //           noResultsScreen: {
    //             noResultsText: '无法找到相关结果',
    //             suggestedQueryText: '你可以尝试查询',
    //             reportMissingResultsText: '你认为该查询应该有结果？',
    //             reportMissingResultsLinkText: '点击反馈',
    //           },
    //         },
    //       },
    //     },
    //   },
    // }),
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
        })
      : [],
  ],
}) as UserConfig

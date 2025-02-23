import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { getModulePath } from '@vuepress/helper'
import { cachePlugin } from '@vuepress/plugin-cache'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { commentPlugin } from '@vuepress/plugin-comment'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { feedPlugin } from '@vuepress/plugin-feed'
import { iconPlugin } from '@vuepress/plugin-icon'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownChartPlugin } from '@vuepress/plugin-markdown-chart'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'
import { redirectPlugin } from '@vuepress/plugin-redirect'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { revealJsPlugin } from '@vuepress/plugin-revealjs'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import type { DefaultThemePageData } from '@vuepress/theme-default/lib/shared/page.js'
import type { Page } from 'vuepress'
import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'
import { head } from './configs/index.js'
import theme from './theme.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export default defineUserConfig({
  // set site base to default value
  base: (process.env.BASE as '/' | `/${string}/` | undefined) || '/',

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
              getModulePath(`${packageName}/package.json`, import.meta),
            ),
          )

          return realPath
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
    commentPlugin({ provider: 'Giscus' }),
    docsearchPlugin(),
    feedPlugin({
      hostname: 'https://ecosystem.vuejs.press',
      atom: true,
      json: true,
      rss: true,
    }),
    iconPlugin({
      prefix: 'lucide:',
    }),
    markdownChartPlugin({
      chartjs: true,
      echarts: true,
      flowchart: true,
      markmap: true,
      mermaid: true,
      plantuml: true,
    }),
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
    markdownMathPlugin({
      type: 'katex',
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
    redirectPlugin({
      switchLocale: 'modal',
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
    registerComponentsPlugin({
      components: {
        NpmBadge: path.resolve(__dirname, './components/NpmBadge.vue'),
      },
    }),
    shikiPlugin({
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
      lineNumbers: 10,
      notationDiff: true,
      notationErrorLevel: true,
      notationFocus: true,
      notationHighlight: true,
      notationWordHighlight: true,
      whitespace: true,
      collapsedLines: false,
      twoslash: true,
    }),
    cachePlugin(),
  ],

  pagePatterns: ['**/*.md', '!**/*.snippet.md', '!.vuepress', '!node_modules'],

  alias: {
    '@theme/VPAutoLink.vue': path.resolve(
      __dirname,
      './components/VPAutoLink.vue',
    ),
    '@theme/VPNavbarDropdown.vue': path.resolve(
      __dirname,
      './components/VPNavbarDropdown.vue',
    ),
    '@theme/VPSidebarItem.vue': path.resolve(
      __dirname,
      './components/VPSidebarItem.vue',
    ),
    '@theme/useNavbarRepo': path.resolve(
      __dirname,
      './composables/useNavbarRepo.ts',
    ),
    '@theme/useNavbarSelectLanguage': path.resolve(
      __dirname,
      './composables/useNavbarSelectLanguage.ts',
    ),
    '@theme/resolveAutoLink': path.resolve(
      __dirname,
      './utils/resolveAutoLink.ts',
    ),
  },

  extendsPage: (page: Page<Partial<DefaultThemePageData>>) => {
    const { icon } = page.frontmatter

    // save icon into route meta
    if (icon) {
      page.routeMeta.icon = icon
    }
  },
})

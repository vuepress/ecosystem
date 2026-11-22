import process from 'node:process'

import { rspackBundler } from '@vuepress/bundler-rspack'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { getModulePath } from '@vuepress/helper'
import type { ThemePageData } from '@vuepress/theme-default'
import type { Page } from 'vuepress'
import { defineUserConfig } from 'vuepress'
import { path } from 'vuepress/utils'

import { head, plugins } from './configs/index.js'
import theme from './theme.js'

const __dirname = import.meta.dirname

export default defineUserConfig({
  // set site base to default value
  base: (process.env.BASE as '/' | `/${string}/` | undefined) ?? '/',

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
    process.env.DOCS_BUNDLER === 'webpack'
      ? webpackBundler()
      : process.env.DOCS_BUNDLER === 'rspack'
        ? rspackBundler()
        : viteBundler(),

  // configure markdown
  markdown: {
    importCode: {
      handleImportPath: (importPath) => {
        // handle @vuepress packages import path
        if (importPath.startsWith('@vuepress/')) {
          const { packageName } = /^(?<packageName>@vuepress\/[^/]*)/u.exec(
            importPath,
          )!.groups!
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
  plugins,

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

  extendsPage: (page: Page<Partial<ThemePageData>>) => {
    const { icon } = page.frontmatter

    // save icon into route meta
    if (icon) page.routeMeta.icon = icon

    // The docs home pages are still written with the classic home frontmatter,
    // map it to the `hero` frontmatter of the default theme
    if (page.frontmatter.home) {
      const { actions = [], heroImage } = page.frontmatter as Record<
        string,
        unknown
      >
      const isZh = page.lang === 'zh-CN'

      // mutate the frontmatter object in place: `page.data.frontmatter` is the
      // same object, and the page data is what the client receives
      const frontmatter = page.frontmatter as Record<string, unknown>

      delete frontmatter.home
      delete frontmatter.title
      delete frontmatter.icon
      delete frontmatter.heroImage
      delete frontmatter.actions
      delete frontmatter.footer

      Object.assign(frontmatter, {
        type: 'home',
        hero: {
          name: isZh ? 'VuePress 生态系统' : 'VuePress Ecosystem',
          tagline: isZh
            ? 'VuePress 官方主题和插件'
            : 'VuePress official themes and plugins',
          image:
            typeof heroImage === 'string'
              ? { src: heroImage, alt: 'VuePress' }
              : undefined,
          actions: (
            actions as { text?: string; link?: string; type?: string }[]
          ).map((action) => ({
            text: action.text,
            // the classic home actions use links relative to the page
            link: action.link?.replace(/^\.\//u, '/'),
            theme: action.type === 'primary' ? 'brand' : 'alt',
          })),
        },
      })
    }
  },
})

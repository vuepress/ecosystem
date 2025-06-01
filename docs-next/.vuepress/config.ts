import process from 'node:process'
import { viteBundler } from '@vuepress/bundler-vite'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { getModulePath } from '@vuepress/helper'
import type { DefaultThemePageData } from '@vuepress/theme-default/lib/shared/page.js'
import type { Page } from 'vuepress'
import { defineUserConfig } from 'vuepress'
import { path } from 'vuepress/utils'
import { head, plugins } from './configs/index.js'
import theme from './theme.js'

const resolveAlias = (
  dir: string,
  filenames: string[],
): Record<string, string> => {
  const alias: Record<string, string> = {}
  filenames.forEach((filename) => {
    alias[`@theme/${path.basename(filename, '.ts')}`] = path.resolve(
      __dirname,
      dir,
      filename,
    )
  })
  return alias
}

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
  plugins,

  pagePatterns: ['**/*.md', '!**/*.snippet.md', '!.vuepress', '!node_modules'],

  alias: {
    ...resolveAlias('./components', [
      'VPFlyout.vue',
      'VPMenu.vue',
      'VPMenuGroup.vue',
      'VPMenuLink.vue',
      'VPNavBarMenuGroup.vue',
      'VPNavBarMenuLink.vue',
      'VPNavScreenMenu.vue',
      'VPNavScreenMenuGroup.vue',
      'VPNavScreenMenuGroupLink.vue',
      'VPNavScreenMenuGroupSection.vue',
      'VPNavScreenMenuLink.vue',
      'VPSidebarItem.vue',
    ]),
    ...resolveAlias('./utils', ['getNavLink.ts']),
  },

  extendsPage: (page: Page<Partial<DefaultThemePageData>>) => {
    const { icon } = page.frontmatter

    // save icon into route meta
    if (icon) {
      page.routeMeta.icon = icon
    }
  },
})

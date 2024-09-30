import { entries, removeLeadingSlash } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { fs, path } from 'vuepress/utils'
import type { RedirectBehaviorConfig } from '../../shared/index.js'
import { logger } from '../logger.js'
import { getLocaleRedirectHTML } from './getLocaleRedirectHTML.js'

export const generateAutoLocaleRedirectFiles = async (
  { dir, options, pages }: App,
  localeOptions: RedirectBehaviorConfig,
): Promise<void> => {
  const rootPaths = pages
    .filter(({ pathLocale }) => pathLocale === '/')
    .map(({ path: pagePath }) => pagePath)
  const localeRedirectMap: Record<string, string[]> = {}

  pages
    .filter(({ pathLocale }) => pathLocale !== '/')
    .forEach(({ path: pagePath, pathLocale }) => {
      const rootPath = pagePath
        .replace(pathLocale, '/')
        .replace(/\/$/, '/index.html')

      if (!rootPaths.includes(rootPath))
        (localeRedirectMap[rootPath] ??= []).push(pathLocale)
    })

  const { succeed } = logger.load('Generating locale redirect files')

  await Promise.all(
    entries(localeRedirectMap).map(async ([rootPath, availableLocales]) => {
      const filePath = dir.dest(removeLeadingSlash(rootPath))

      if (!fs.existsSync(filePath)) {
        await fs.ensureDir(path.dirname(filePath))
        await fs.writeFile(
          filePath,
          getLocaleRedirectHTML(localeOptions, availableLocales, options.base),
        )
      }
    }),
  )

  succeed()
}

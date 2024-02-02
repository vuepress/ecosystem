import { entries, removeLeadingSlash } from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { fs, path, withSpinner } from 'vuepress/utils'
import type { RedirectLocaleConfig } from '../shared/index.js'
import { getLocaleRedirectHTML } from './getLocaleRedirectHTML.js'

export const generateAutoLocaleRedirectFiles = async (
  { dir, options, pages }: App,
  localeOptions: RedirectLocaleConfig,
): Promise<void> => {
  const rootPaths = pages
    .filter(({ pathLocale }) => pathLocale === '/')
    .map(({ path }) => path)
  const localeRedirectMap: Record<string, string[]> = {}

  pages
    .filter(({ pathLocale }) => pathLocale !== '/')
    .forEach(({ path, pathLocale }) => {
      const rootPath = path
        .replace(pathLocale, '/')
        .replace(/\/$/, '/index.html')

      if (!rootPaths.includes(rootPath))
        (localeRedirectMap[rootPath] ??= []).push(pathLocale)
    })

  await withSpinner('Generating locale redirect files')(() =>
    Promise.all(
      entries(localeRedirectMap).map(([rootPath, availableLocales]) => {
        const filePath = dir.dest(removeLeadingSlash(rootPath))

        return fs.existsSync(filePath)
          ? Promise.resolve()
          : fs
              .ensureDir(path.dirname(filePath))
              .then(() =>
                fs.writeFile(
                  filePath,
                  getLocaleRedirectHTML(
                    localeOptions,
                    availableLocales,
                    options.base,
                  ),
                ),
              )
      }),
    ),
  )
}

import { entries, keys } from '@vuepress/helper'
import { addAll, discard, vacuum } from 'slimsearch'
import type { App } from 'vuepress/core'

import type { PageIndexId, SearchIndexStore } from '../../shared/index.js'
import { generatePageIndex } from '../generateIndex.js'
import type { SlimSearchPluginOptions } from '../options.js'
import type { Store } from '../utils.js'
import { getLocaleChunkName } from '../utils.js'

export const prepareSearchIndex = async (
  app: App,
  searchIndexStore: SearchIndexStore,
): Promise<void> => {
  await Promise.all(
    entries(searchIndexStore).map(([locale, documents]) =>
      app.writeTemp(
        `slimsearch/${getLocaleChunkName(locale)}.js`,
        `export default ${JSON.stringify(JSON.stringify(documents))};`,
      ),
    ),
  )

  await app.writeTemp(
    `slimsearch/index.js`,
    `export default {${keys(searchIndexStore)
      .map(
        (locale) =>
          `${JSON.stringify(locale)}: () => import('./${getLocaleChunkName(
            locale,
          )}.js')`,
      )
      .join(',')}}`,
  )
}

export const updateSearchIndex = async (
  app: App,
  options: SlimSearchPluginOptions,
  searchIndexStore: SearchIndexStore,
  store: Store,
  path: string,
): Promise<void> => {
  const filePath = path
    .replace(/^pages\//, '')
    .replace(/\/index\.html\.vue/, '/README.md')
    .replace(/\.html\.vue/, '.md')

  const page = app.pages.find(
    ({ filePathRelative }) =>
      filePathRelative?.toLowerCase() === filePath.toLowerCase(),
  )

  if (page) {
    const pageIndexes = generatePageIndex(
      page,
      store,
      options.customFields,
      options.indexContent,
    )
    const { pathLocale } = page
    const pageId = store.addItem(page.path).toString() as PageIndexId
    const localeSearchIndex = searchIndexStore[pathLocale]

    // Update index
    // Remove previous index
    Array.from(localeSearchIndex._documentIds.values())
      .filter((id) => id.startsWith(pageId))
      .forEach((id) => {
        discard(localeSearchIndex, id)
      })

    addAll(localeSearchIndex, pageIndexes)

    await vacuum(localeSearchIndex)

    // Search index file content
    const content = `\
export default ${JSON.stringify(JSON.stringify(localeSearchIndex))}
`

    await app.writeTemp(
      `slimsearch/${getLocaleChunkName(pathLocale)}.js`,
      content,
    )
  }
}

export const removeSearchIndex = async (
  app: App,
  searchIndexStore: SearchIndexStore,
  store: Store,
  path: string,
): Promise<void> => {
  const filePath = path
    .replace(/^pages\//, '')
    .replace(/\/index\.html\.vue/, '/README.md')
    .replace(/\.html\.vue/, '.md')

  const page = app.pages.find(
    ({ filePathRelative }) =>
      filePathRelative?.toLowerCase() === filePath.toLowerCase(),
  )

  if (page) {
    const { pathLocale } = page
    const pageId = store.addItem(page.path).toString() as PageIndexId
    const localeSearchIndex = searchIndexStore[pathLocale]

    // Remove previous index
    Array.from(localeSearchIndex._documentIds.values())
      .filter((id) => id.startsWith(pageId))
      .forEach((id) => {
        discard(localeSearchIndex, id)
      })

    await vacuum(localeSearchIndex)

    // Search index file content
    const content = `\
export default ${JSON.stringify(JSON.stringify(localeSearchIndex))}
`

    await app.writeTemp(
      `slimsearch/${getLocaleChunkName(pathLocale)}.js`,
      content,
    )
  }
}

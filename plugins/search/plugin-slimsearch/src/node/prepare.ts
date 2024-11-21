import { entries, keys } from '@vuepress/helper'
import { addAll, discard, vacuum } from 'slimsearch'
import type { App } from 'vuepress/core'

import type { PageIndexId, SearchIndexStore } from '../shared/index.js'
import { generatePageIndex } from './generateIndex.js'
import type { SlimSearchPluginOptions } from './options.js'
import type { PathStore } from './pathStore.js'
import { getLocaleChunkName, inferFilePath } from './utils.js'

export const prepareStore = async (
  app: App,
  store: PathStore,
): Promise<void> => {
  await app.writeTemp(
    `slimsearch/store.js`,
    `\
export const store = ${store.toJSON()};
`,
  )
}

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
  store: PathStore,
  path: string,
): Promise<void> => {
  const filePath = inferFilePath(path)

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
    const pageId = store.addPath(page.path).toString() as PageIndexId
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
  store: PathStore,
  path: string,
): Promise<void> => {
  const filePath = inferFilePath(path)

  const page = app.pages.find(
    ({ filePathRelative }) =>
      filePathRelative?.toLowerCase() === filePath.toLowerCase(),
  )

  if (page) {
    const { pathLocale } = page
    const pageId = store.addPath(page.path).toString() as PageIndexId
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

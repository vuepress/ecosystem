import { entries, keys } from '@vuepress/helper'
import { addAll, discard, vacuum } from 'slimsearch'
import type { App, Page } from 'vuepress/core'

import type { PageIndexId, SearchIndexStore } from '../shared/index.js'
import { generatePageIndex } from './generateIndex.js'
import type { SlimSearchPluginOptions } from './options.js'
import type { PathStore } from './pathStore.js'
import { getLocaleChunkName } from './utils.js'

export const prepareStore = async (
  app: App,
  store: PathStore,
): Promise<void> => {
  await app.writeTemp(
    `slimsearch/store.js`,
    `\
export const store = ${store.toJSON()}
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
        `export default ${JSON.stringify(JSON.stringify(documents))}`,
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

export const prepareWorkerOptions = async (
  app: App,
  options: SlimSearchPluginOptions,
): Promise<void> => {
  await app.writeTemp(
    `slimsearch/worker-options.js`,
    `\
export const sortStrategy = "${options.sortStrategy ?? 'max'}"
`,
  )
}

export const updateSearchIndex = async (
  app: App,
  options: SlimSearchPluginOptions,
  searchIndexStore: SearchIndexStore,
  store: PathStore,
  page: Page,
): Promise<void> => {
  const { pathLocale } = page
  const localeSearchIndex = searchIndexStore[pathLocale]

  if (!localeSearchIndex) return

  const pageIndexes = generatePageIndex(
    page as Page<{ excerpt?: string }>,
    store,
    options.customFields,
    options.indexContent,
  )
  const pageId = store.addPath(page.path).toString() as PageIndexId

  // Remove any existing index entries for this page before re-adding
  ;[...localeSearchIndex._documentIds.values()]
    .filter((id) => id.startsWith(pageId))
    .forEach((id) => {
      discard(localeSearchIndex, id)
    })

  addAll(localeSearchIndex, pageIndexes)
  await vacuum(localeSearchIndex)

  await app.writeTemp(
    `slimsearch/${getLocaleChunkName(pathLocale)}.js`,
    `export default ${JSON.stringify(JSON.stringify(localeSearchIndex))}`,
  )
}

export const removeSearchIndex = async (
  app: App,
  searchIndexStore: SearchIndexStore,
  store: PathStore,
  page: Page,
): Promise<void> => {
  const { pathLocale } = page
  const localeSearchIndex = searchIndexStore[pathLocale]

  if (!localeSearchIndex) return

  const pageId = store.addPath(page.path).toString() as PageIndexId

  // Remove all index entries for this page
  ;[...localeSearchIndex._documentIds.values()]
    .filter((id) => id.startsWith(pageId))
    .forEach((id) => {
      discard(localeSearchIndex, id)
    })

  await vacuum(localeSearchIndex)

  await app.writeTemp(
    `slimsearch/${getLocaleChunkName(pathLocale)}.js`,
    `export default ${JSON.stringify(JSON.stringify(localeSearchIndex))}`,
  )
}

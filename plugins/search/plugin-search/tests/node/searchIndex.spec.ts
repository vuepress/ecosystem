import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import nodePath from 'node:path'
import { pathToFileURL } from 'node:url'

import { createTestApp } from '@vuepress/test-utils'
import { describe, expect, it, vi } from 'vitest'
import type { Page } from 'vuepress/core'
import { createPage } from 'vuepress/core'
import { fs } from 'vuepress/utils'

import {
  prepareSearchIndex,
  removeSearchIndex,
  updateSearchIndex,
  writeSearchIndex,
} from '../../src/node/prepareSearchIndex.js'
import { searchPlugin } from '../../src/node/searchPlugin.js'
import type { SearchIndex } from '../../src/shared/index.js'

const locales = {
  '/': { lang: 'en-US', title: 'My Site' },
  '/zh/': { lang: 'zh-CN', title: '我的站点' },
}

const FILES = {
  'guide.md': '---\ntitle: Guide\ntags:\n  - setup\n---\n# Guide\n\n## Install',
  'README.md': '---\ntitle: Home\n---\n# Home',
  'zh/README.md': '---\ntitle: 首页\n---\n# 首页',
}

// VuePress adds a built-in 404 page, which the fixtures do not cover
const isSearchable = (page: Page): boolean => page.path !== '/404.html'

const isNotRoot = (page: Page): boolean =>
  isSearchable(page) && page.path !== '/'

const isNotGuide = (page: Page): boolean =>
  isSearchable(page) && page.path !== '/guide.html'

const getTags = (page: Page): string[] =>
  (page.frontmatter.tags as string[] | undefined) ?? []

type TestApp = Awaited<ReturnType<typeof createTestApp>>

const createApp = async (): Promise<TestApp> =>
  createTestApp({ files: FILES, locales, prepare: true })

/**
 * Index the search index by the route path of its entries
 *
 * @param searchIndex - Search index to index / 要索引的搜索索引
 * @returns The entries keyed by route path / 以路由路径为键的条目
 */
const indexByPath = (searchIndex: SearchIndex): Record<string, unknown> =>
  Object.fromEntries(searchIndex.map((item) => [item.path, item]))

/**
 * List the route paths of a search index in a stable order
 *
 * @param searchIndex - Search index to read / 要读取的搜索索引
 * @returns The sorted route paths / 排序后的路由路径
 */
const indexPaths = (searchIndex: SearchIndex): string[] =>
  searchIndex.map(({ path }) => path).sort()

/**
 * Read the temp file that the client consumes
 *
 * @param app - Test app / 测试应用
 * @returns The content of the temp file / 临时文件的内容
 */
const readIndexFile = (app: TestApp): string =>
  fs.readFileSync(app.dir.temp('internal/searchIndex.js'), 'utf-8')

/**
 * Build the search index of the fixtures
 *
 * @param app - Test app / 测试应用
 * @param searchIndex - Search index to fill / 要填充的搜索索引
 * @returns Path of the temp file / 临时文件路径
 */
const prepare = (app: TestApp, searchIndex: SearchIndex): Promise<string> =>
  prepareSearchIndex({
    app,
    getExtraFields: () => [],
    isSearchable,
    searchIndex,
  })

interface GeneratedModule {
  exports: Record<string, unknown>
  updateSearchIndex: ReturnType<typeof vi.fn>
  accept: (module: Record<string, unknown>) => void
  cleanup: () => void
}

/**
 * Load the generated temp module with a stubbed `import.meta`
 *
 * The module is generated for a bundler, so `import.meta` is rewritten to a
 * global, and the module is imported as a real ES module to keep the HMR
 * callback and the module namespace in the same realm.
 *
 * The globals stay in place until `cleanup` is called, because the HMR callback
 * reads them when it is invoked.
 *
 * @param source - Generated module source / 生成的模块源码
 * @param bundler - Bundler to emulate / 要模拟的打包器
 * @returns The module namespace and the HMR handler / 模块命名空间与 HMR 处理函数
 */
const loadGeneratedModule = async (
  source: string,
  bundler: 'vite' | 'webpack',
): Promise<GeneratedModule> => {
  const onUpdate = vi.fn<(data: unknown) => void>()
  const importMeta: Record<string, unknown> = {}
  let accept: ((module: Record<string, unknown>) => void) | undefined

  if (bundler === 'vite') {
    importMeta.hot = {
      accept: (handler: (module: Record<string, unknown>) => void): void => {
        accept = handler
      },
    }
  } else {
    importMeta.webpackHot = { accept: vi.fn<() => void>() }
  }

  const dir = mkdtempSync(nodePath.join(tmpdir(), 'vuepress-search-hmr-'))
  const file = nodePath.join(dir, 'searchIndex.mjs')

  writeFileSync(
    file,
    source.replaceAll('import.meta', 'globalThis.__importMeta'),
  )

  const globals = globalThis as unknown as Record<string, unknown>

  globals.__importMeta = importMeta
  globals.__VUE_HMR_RUNTIME__ = { updateSearchIndex: onUpdate }

  const exports = (await import(pathToFileURL(file).href)) as Record<
    string,
    unknown
  >

  return {
    accept: accept!,
    cleanup: (): void => {
      delete globals.__importMeta
      delete globals.__VUE_HMR_RUNTIME__
      rmSync(dir, { force: true, recursive: true })
    },
    exports,
    updateSearchIndex: onUpdate,
  }
}

const devIndex = (): SearchIndex => [
  {
    extraFields: [],
    headers: [],
    path: '/',
    pathLocale: '/',
    title: 'Home',
  },
]

describe('search index preparation', () => {
  it('creates an entry for every page with the title and the headers', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepare(app, searchIndex)

      expect(indexPaths(searchIndex)).toStrictEqual([
        '/',
        '/guide.html',
        '/zh/',
      ])
      expect(indexByPath(searchIndex)['/guide.html']).toMatchObject({
        title: 'Guide',
        pathLocale: '/',
        extraFields: [],
        headers: [expect.objectContaining({ title: 'Install', level: 2 })],
      })
      // the temp file is what the client consumes
      expect(readIndexFile(app)).toContain('export const SEARCH_INDEX =')
      expect(readIndexFile(app)).toContain('"/zh/"')
    } finally {
      app.cleanup()
    }
  })

  it('skips the pages rejected by isSearchable', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepareSearchIndex({
        app,
        getExtraFields: () => [],
        isSearchable: isNotRoot,
        searchIndex,
      })

      expect(indexPaths(searchIndex)).toStrictEqual(['/guide.html', '/zh/'])
      expect(readIndexFile(app)).not.toContain('"title": "Home"')
    } finally {
      app.cleanup()
    }
  })

  it('adds the fields returned by getExtraFields', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepareSearchIndex({
        app,
        getExtraFields: getTags,
        isSearchable,
        searchIndex,
      })

      expect(indexByPath(searchIndex)['/guide.html']).toMatchObject({
        extraFields: ['setup'],
      })
      expect(readIndexFile(app)).toContain('"setup"')
    } finally {
      app.cleanup()
    }
  })

  it('rebuilds the index in place instead of appending to it', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepare(app, searchIndex)
      await prepareSearchIndex({
        app,
        getExtraFields: () => [],
        isSearchable: (page) => page.path === '/',
        searchIndex,
      })

      expect(searchIndex).toHaveLength(1)
      expect(searchIndex[0].path).toBe('/')
    } finally {
      app.cleanup()
    }
  })
})

describe('search index update', () => {
  it('replaces the entry of an updated page', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepare(app, searchIndex)

      const oldPage = app.pages.find(({ path }) => path === '/guide.html')!
      const newPage = await createPage(app, {
        content: '# Guide\n\n## Advanced',
        frontmatter: { title: 'Guide' },
        path: '/guide.html',
      })

      await updateSearchIndex({
        app,
        getExtraFields: () => [],
        isSearchable,
        newPage,
        oldPage,
        searchIndex,
      })

      expect(
        searchIndex.filter(({ path }) => path === '/guide.html'),
      ).toHaveLength(1)
      expect(indexByPath(searchIndex)['/guide.html']).toMatchObject({
        headers: [expect.objectContaining({ title: 'Advanced' })],
      })
      expect(readIndexFile(app)).toContain('Advanced')
    } finally {
      app.cleanup()
    }
  })

  it('drops the stale entry when the path of a page changes', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepare(app, searchIndex)

      const oldPage = app.pages.find(({ path }) => path === '/guide.html')!
      const newPage = await createPage(app, {
        content: '# Moved',
        frontmatter: { title: 'Moved' },
        path: '/moved.html',
      })

      await updateSearchIndex({
        app,
        getExtraFields: () => [],
        isSearchable,
        newPage,
        oldPage,
        searchIndex,
      })

      expect(indexPaths(searchIndex)).toStrictEqual([
        '/',
        '/moved.html',
        '/zh/',
      ])
      // the client would otherwise keep searching the old route
      expect(readIndexFile(app)).not.toContain('/guide.html')
      expect(readIndexFile(app)).toContain('/moved.html')
    } finally {
      app.cleanup()
    }
  })

  it('drops the entry of a page that is no longer searchable', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepare(app, searchIndex)

      const oldPage = app.pages.find(({ path }) => path === '/guide.html')!
      const newPage = await createPage(app, {
        content: '# Guide',
        frontmatter: { title: 'Guide' },
        path: '/guide.html',
      })

      await updateSearchIndex({
        app,
        getExtraFields: () => [],
        isSearchable: isNotGuide,
        newPage,
        oldPage,
        searchIndex,
      })

      expect(indexPaths(searchIndex)).toStrictEqual(['/', '/zh/'])
      expect(readIndexFile(app)).not.toContain('/guide.html')
    } finally {
      app.cleanup()
    }
  })

  it('adds a newly created page without touching the other entries', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepare(app, searchIndex)

      const newPage = await createPage(app, {
        content: '# Brand new',
        frontmatter: { title: 'Brand new' },
        path: '/brand-new.html',
      })

      await updateSearchIndex({
        app,
        getExtraFields: () => [],
        isSearchable,
        newPage,
        oldPage: null,
        searchIndex,
      })

      expect(indexPaths(searchIndex)).toStrictEqual([
        '/',
        '/brand-new.html',
        '/guide.html',
        '/zh/',
      ])
      expect(readIndexFile(app)).toContain('/brand-new.html')
    } finally {
      app.cleanup()
    }
  })
})

describe('search index removal', () => {
  it('drops the entry of a removed page', async () => {
    const app = await createApp()

    try {
      const searchIndex: SearchIndex = []

      await prepare(app, searchIndex)

      const page = app.pages.find(({ path }) => path === '/guide.html')!

      await removeSearchIndex({ app, page, searchIndex })

      expect(indexPaths(searchIndex)).toStrictEqual(['/', '/zh/'])
      expect(readIndexFile(app)).not.toContain('/guide.html')
    } finally {
      app.cleanup()
    }
  })
})

describe('client update through HMR', () => {
  it('hands the index to the client for a vite dev server', async () => {
    const app = await createTestApp({ locales })

    try {
      app.env.isDev = true

      const searchIndex = devIndex()

      await writeSearchIndex(app, searchIndex)

      const {
        accept,
        cleanup,
        exports,
        updateSearchIndex: onUpdate,
      } = await loadGeneratedModule(readIndexFile(app), 'vite')

      try {
        // the new revision of the module is what the client has to receive
        accept(exports)

        expect(onUpdate).toHaveBeenCalledTimes(1)
        expect(onUpdate).toHaveBeenCalledWith(exports.SEARCH_INDEX)
        expect(exports.SEARCH_INDEX).toStrictEqual(searchIndex)
      } finally {
        cleanup()
      }
    } finally {
      app.cleanup()
    }
  })

  it('hands the index to the client for a webpack dev server', async () => {
    const app = await createTestApp({ locales })

    try {
      app.env.isDev = true

      const searchIndex = devIndex()

      await writeSearchIndex(app, searchIndex)

      const {
        cleanup,
        exports,
        updateSearchIndex: onUpdate,
      } = await loadGeneratedModule(readIndexFile(app), 'webpack')

      try {
        expect(onUpdate).toHaveBeenCalledTimes(1)
        expect(onUpdate).toHaveBeenCalledWith(exports.SEARCH_INDEX)
        expect(exports.SEARCH_INDEX).toStrictEqual(searchIndex)
      } finally {
        cleanup()
      }
    } finally {
      app.cleanup()
    }
  })

  it('does not inject HMR code into the build output', async () => {
    const app = await createTestApp({ locales })

    try {
      await writeSearchIndex(app, [])

      expect(readIndexFile(app)).not.toContain('updateSearchIndex')
    } finally {
      app.cleanup()
    }
  })
})

describe('search plugin', () => {
  it('updates the index of a changed page when hotReload is enabled', async () => {
    const app = await createApp()

    try {
      const plugin = searchPlugin({ hotReload: true })

      await plugin.onPrepared?.(app)

      const oldPage = app.pages.find(({ path }) => path === '/guide.html')!
      const newPage = await createPage(app, {
        content: '# Renamed',
        frontmatter: { title: 'Renamed' },
        path: '/renamed.html',
      })

      await plugin.onPageUpdated?.(app, 'update', newPage, oldPage)

      expect(readIndexFile(app)).not.toContain('/guide.html')
      expect(readIndexFile(app)).toContain('/renamed.html')

      await plugin.onPageUpdated?.(app, 'delete', null, newPage)

      expect(readIndexFile(app)).not.toContain('/renamed.html')
    } finally {
      app.cleanup()
    }
  })

  it('keeps the index untouched unless hotReload or the debug flag is set', async () => {
    const app = await createApp()

    try {
      const plugin = searchPlugin()

      await plugin.onPrepared?.(app)

      const before = readIndexFile(app)
      const newPage = await createPage(app, {
        content: '# Brand new',
        frontmatter: { title: 'Brand new' },
        path: '/brand-new.html',
      })

      await plugin.onPageUpdated?.(app, 'create', newPage, null)

      expect(readIndexFile(app)).toBe(before)
    } finally {
      app.cleanup()
    }
  })

  it('updates the index when the debug flag is set', async () => {
    const app = await createApp()

    try {
      app.env.isDebug = true

      const plugin = searchPlugin()

      await plugin.onPrepared?.(app)

      const newPage = await createPage(app, {
        content: '# Brand new',
        frontmatter: { title: 'Brand new' },
        path: '/brand-new.html',
      })

      await plugin.onPageUpdated?.(app, 'create', newPage, null)

      expect(readIndexFile(app)).toContain('/brand-new.html')
    } finally {
      app.cleanup()
    }
  })
})

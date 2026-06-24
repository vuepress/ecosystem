/**
 * When various features are added to markdown, the compilation speed of a
 * single markdown file will become slower, especially when there are many pages
 * in the project, causing the startup of the vuepress development service to
 * become very slow and time-consuming. This plugin will cache the `markdown
 * render` result during the initial compilation process. During subsequent
 * compilations, if the content has not been modified, compilation will be
 * skipped directly, thus speeding up the second startup of vuepress.
 */
import type { App } from 'vuepress'
import type { Markdown, MarkdownEnv } from 'vuepress/markdown'
import { fs, hash } from 'vuepress/utils'

import { checkIOSpeed, readJson, readJSONSync, writeJSON } from './utils.js'

export interface CacheData {
  content: string
  env: MarkdownEnv
}

// { [filepath]: CacheDta }
export type Cache = Record<string, CacheData>

// { [filepath]: hash }
export type Metadata = Record<string, string>

const CACHE_DIR = 'markdown/rendered'
const META_FILE = '_metadata.json'
const CACHE_FILE = '_cache.json'

export const renderCacheWithMemory = async (
  md: Markdown,
  app: App,
): Promise<void> => {
  const cacheDir = app.dir.cache(CACHE_DIR)

  if (app.env.isBuild && !(await fs.pathExists(cacheDir))) return

  const metaFilepath = `${cacheDir}/${META_FILE}`
  const cacheFilepath = `${cacheDir}/${CACHE_FILE}`

  await fs.ensureDir(cacheDir)

  const [metadata, cache] = await Promise.all([
    readJson<Metadata>(metaFilepath),
    readJson<Cache>(cacheFilepath),
  ]).then(
    ([metadataStore, cacheStore]) =>
      [metadataStore ?? {}, cacheStore ?? {}] as const,
  )

  let timer: ReturnType<typeof setTimeout> | null = null

  const update = (): void => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      void Promise.all([
        writeJSON(metaFilepath, metadata),
        writeJSON(cacheFilepath, cache),
      ])
    }, 200)
  }

  const rawRender = md.render.bind(md)

  md.render = (input, env: MarkdownEnv = {}): string => {
    const filepath = env.filePathRelative

    if (!filepath) return rawRender(input, env)

    const key = hash(input)

    if (metadata[filepath] === key && filepath in cache) {
      const cached = cache[filepath]
      Object.assign(env, cached.env)
      return cached.content
    }

    const content = rawRender(input, env)
    metadata[filepath] = key
    cache[filepath] = { content, env }

    update()

    return content
  }
}

export const renderCacheWithFilesystem = async (
  md: Markdown,
  app: App,
): Promise<void> => {
  const cacheDir = app.dir.cache(CACHE_DIR)

  if (app.env.isBuild && !(await fs.pathExists(cacheDir))) return

  await fs.ensureDir(cacheDir)

  const speed = checkIOSpeed(cacheDir)

  const metaFilepath = `${cacheDir}/${META_FILE}`

  const metadata = (await readJson<Metadata>(metaFilepath)) ?? {}

  let timer: ReturnType<typeof setTimeout> | null = null

  const update = (filepath: string, data: CacheData): void => {
    void writeJSON(`${cacheDir}/${filepath}`, data)

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      void writeJSON(metaFilepath, metadata)
    }, 200)
  }

  const rawRender = md.render.bind(md)

  md.render = (input, env: MarkdownEnv = {}): string => {
    const filepath = env.filePathRelative

    if (!filepath) return rawRender(input, env)

    const key = hash(input)
    const filename = hash(filepath)

    if (metadata[filepath] === key) {
      const cached = readJSONSync<CacheData>(`${cacheDir}/${filename}`)
      if (cached) {
        Object.assign(env, cached.env)
        return cached.content
      }
      metadata[filepath] = ''
    }
    const start = performance.now()
    const content = rawRender(input, env)

    /**
     * High-frequency I/O is also a time-consuming operation, therefore, for
     * render operations with low overhead, caching is not performed.
     */
    if (performance.now() - start > speed) {
      metadata[filepath] = key
      update(filename, { content, env })
    }
    return content
  }
}

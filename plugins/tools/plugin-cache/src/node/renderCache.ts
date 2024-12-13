/**
 * When various features are added to markdown, the compilation speed of a single markdown file
 * will become slower, especially when there are many pages in the project,
 * causing the startup of the vuepress development service to become very slow and time-consuming.
 * This plugin will cache the `markdown render` result during the initial compilation process.
 * During subsequent compilations, if the content has not been modified,
 * compilation will be skipped directly, thus speeding up the second startup of vuepress.
 */
import type { App } from 'vuepress'
import type { Markdown, MarkdownEnv } from 'vuepress/markdown'
import { fs, hash } from 'vuepress/utils'
import { checkIOSpeed, readFile, readFileSync, writeFile } from './utils.js'

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
  if (app.env.isBuild && !fs.existsSync(app.dir.cache(CACHE_DIR))) {
    return
  }

  const basename = app.dir.cache(CACHE_DIR)
  const metaFilepath = `${basename}/${META_FILE}`
  const cacheFilepath = `${basename}/${CACHE_FILE}`

  await fs.ensureDir(basename)

  const [metadata, cache] = await Promise.all([
    readFile<Metadata>(metaFilepath),
    readFile<Cache>(cacheFilepath),
  ]).then(
    ([metadataStore, cacheStore]) =>
      [metadataStore ?? {}, cacheStore ?? {}] as const,
  )

  let timer: ReturnType<typeof setTimeout> | null = null

  const update = (): void => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      void Promise.all([
        writeFile(metaFilepath, metadata),
        writeFile(cacheFilepath, cache),
      ])
    }, 200)
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const rawRender = md.render
  md.render = (input, env: MarkdownEnv = {}) => {
    const filepath = env.filePathRelative

    if (!filepath) {
      return rawRender(input, env)
    }

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
  if (app.env.isBuild && !fs.existsSync(app.dir.cache(CACHE_DIR))) {
    return
  }
  const basename = app.dir.cache(CACHE_DIR)

  await fs.ensureDir(basename)

  const speed = checkIOSpeed(basename)

  const metaFilepath = `${basename}/${META_FILE}`

  const metadata = (await readFile<Metadata>(metaFilepath)) ?? {}

  let timer: ReturnType<typeof setTimeout> | null = null

  const update = (filepath: string, data: CacheData): void => {
    void writeFile(`${basename}/${filepath}`, data)

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      void writeFile(metaFilepath, metadata)
    }, 200)
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const rawRender = md.render

  md.render = (input, env: MarkdownEnv = {}) => {
    const filepath = env.filePathRelative

    if (!filepath) {
      return rawRender(input, env)
    }

    const key = hash(input)
    const filename = hash(filepath)

    if (metadata[filepath] === key) {
      const cached = readFileSync<CacheData>(`${basename}/${filename}`)
      if (cached) {
        Object.assign(env, cached.env)
        return cached.content
      }
      metadata[filepath] = ''
    }
    const start = performance.now()
    const content = rawRender(input, env)

    /**
     * High-frequency I/O is also a time-consuming operation,
     * therefore, for render operations with low overhead, caching is not performed.
     */
    if (performance.now() - start > speed) {
      metadata[filepath] = key
      update(filename, { content, env })
    }
    return content
  }
}

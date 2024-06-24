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
import { fs } from 'vuepress/utils'
import { hash, readFile, writeFile } from './utils.js'

export interface CacheDta {
  content: string
  env: MarkdownEnv
}

// { [filepath]: CacheDta }
export type Cache = Record<string, CacheDta>

// { [filepath]: hash }
export type Metadata = Record<string, string>

const CACHE_DIR = 'markdown/rendered'
const META_FILE = '_metadata.json'
const CACHE_FILE = '_cache.json'

export const renderCache = async (md: Markdown, app: App): Promise<void> => {
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
  ])

  let timer: ReturnType<typeof setTimeout> | null = null
  const update = async (): Promise<void> => {
    timer && clearTimeout(timer)
    timer = setTimeout(
      async () =>
        await Promise.all([
          writeFile(metaFilepath, metadata),
          writeFile(cacheFilepath, cache),
        ]),
      200,
    )
  }

  const rawRender = md.render
  md.render = (input, env: MarkdownEnv) => {
    const filepath = env.filePathRelative

    if (!filepath) {
      return rawRender(input, env)
    }

    const key = hash(input)
    if (metadata[filepath] === key && cache[filepath]) {
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

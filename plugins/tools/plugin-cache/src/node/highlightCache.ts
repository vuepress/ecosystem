/**
 * Code highlight is a relatively time-consuming operation,
 * especially in `shiki` where enabling numerous transformers can significantly impact performance.
 * This effect is particularly noticeable with tools like `twoslash`,
 * which require type compilation and may lead to individual code blocks taking over 500ms to process.
 *
 * When there are multiple code blocks, focusing only on modifying parts of the code blocks while
 * still compiling all code blocks entirely can lead to unnecessary overhead.
 * Therefore, using the LRU cache algorithm can help by storing unchanged code blocks'
 * highlighted results and only processing the parts that have been modified.
 */
import { LRUCache } from 'lru-cache'
import type { App } from 'vuepress'
import type { Markdown } from 'vuepress/markdown'
import { hash } from 'vuepress/utils'

const cache = new LRUCache<string, string>({ max: 64 })

export const highlightCache = (md: Markdown, app: App): void => {
  /**
   * Cache is only needed in development mode to enhance the development experience.
   */
  if (!app.env.isDev) return

  const { highlight } = md.options

  md.options.highlight = (...args) => {
    const key = hash(args.join(''))
    const cached = cache.get(key)

    if (cached) return cached

    const content = highlight?.(...args) ?? ''
    cache.set(key, content)

    return content
  }
}

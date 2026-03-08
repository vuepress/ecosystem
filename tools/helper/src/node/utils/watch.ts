import type { ChokidarOptions, FSWatcher } from 'chokidar'
import { watch } from 'chokidar'

const watcherRegistry = new Map<string, FSWatcher>()

const getWatcherKey = (paths: string | string[], cwd?: string): string => {
  const normalizedPaths =
    typeof paths === 'string' ? paths : [...paths].sort().join('\0')

  return `${cwd ?? ''}\0${normalizedPaths}`
}

/**
 * Get or create a shared chokidar watcher for the given paths and cwd.
 *
 * 获取或创建指定路径和 cwd 的共享 chokidar 监听器。
 *
 * @description When a watcher for the same paths and cwd already exists,
 * the existing instance is returned. Consumers should filter events in
 * their own handlers, because the `ignored` option from the first caller
 * is used and cannot be overridden.
 *
 * 当同一路径和 cwd 的监听器已存在时，返回已有实例。使用者应在
 * 自己的处理函数中过滤事件，因为首次调用者的 `ignored` 选项会被
 * 使用且无法覆盖。
 *
 * @param paths - Paths to watch / 要监听的路径
 * @param options - Chokidar watch options (only used on first creation) / chokidar 监听选项（仅在首次创建时使用）
 * @returns FSWatcher instance / FSWatcher 实例
 *
 * @example
 * ```ts
 * const watcher = getSharedWatcher('pages', {
 *   cwd: app.dir.temp(),
 *   ignoreInitial: true,
 * })
 *
 * watcher.on('add', (filePath) => {
 *   if (filePath.endsWith('.js')) {
 *     // handle .js files
 *   }
 * })
 * ```
 */
export const getSharedWatcher = (
  paths: string | string[],
  options?: ChokidarOptions,
): FSWatcher => {
  const key = getWatcherKey(paths, options?.cwd)
  const existing = watcherRegistry.get(key)

  if (existing) return existing

  const watcher = watch(paths, options)

  watcherRegistry.set(key, watcher)
  watcher.once('close', () => {
    watcherRegistry.delete(key)
  })

  return watcher
}

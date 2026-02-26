import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { TwoslashTypesCache } from '@shikijs/twoslash'
import type { TwoslashReturn } from 'twoslash'
import { hash as createHash } from 'vuepress/utils'

export interface FileSystemTypeResultCacheOptions {
  /**
   * The directory to store the cache files
   *
   * 存储缓存文件的目录
   */
  dir: string
}

/**
 * Create a file system types cache for twoslash
 *
 * 为 twoslash 创建文件系统类型缓存
 *
 * @param options - Cache options / 缓存选项
 * @param options.dir - The directory to store the cache files / 存储缓存文件的目录
 * @returns Twoslash types cache / Twoslash 类型缓存
 *
 * @example
 * ```ts
 * const cache = createFileSystemTypesCache({
 *   dir: path.join(process.cwd(), '.cache', 'twoslash')
 * })
 * ```
 */
export const createFileSystemTypesCache = ({
  dir,
}: FileSystemTypeResultCacheOptions): TwoslashTypesCache => ({
  init(): void {
    mkdirSync(dir, { recursive: true })
  },

  /**
   * Read cached result for given code
   *
   * 读取给定代码的缓存结果
   *
   * @param code - The code to read cache for / 要读取缓存的代码
   * @returns Cached result or null if not found / 缓存结果或未找到时返回 null
   */
  read(code): TwoslashReturn | null {
    const hash = createHash(code)
    const filePath = join(dir, `${hash}.json`)
    if (!existsSync(filePath)) return null

    return JSON.parse(
      readFileSync(filePath, { encoding: 'utf-8' }),
    ) as TwoslashReturn
  },

  /**
   * Write cache for given code and result
   *
   * 为给定代码和结果写入缓存
   *
   * @param code - The code to write cache for / 要写入缓存的代码
   * @param data - The result to cache / 要缓存的结果
   */
  write(code, data): void {
    const hash = createHash(code)
    const filePath = join(dir, `${hash}.json`)
    const json = JSON.stringify(data)
    writeFileSync(filePath, json, { encoding: 'utf-8' })
  },
})

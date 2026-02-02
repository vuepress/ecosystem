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
  init() {
    mkdirSync(dir, { recursive: true })
  },
  read(code) {
    const hash = createHash(code)
    const filePath = join(dir, `${hash}.json`)
    if (!existsSync(filePath)) {
      return null
    }
    return JSON.parse(
      readFileSync(filePath, { encoding: 'utf8' }),
    ) as TwoslashReturn
  },
  write(code, data) {
    const hash = createHash(code)
    const filePath = join(dir, `${hash}.json`)
    const json = JSON.stringify(data)
    writeFileSync(filePath, json, { encoding: 'utf8' })
  },
})

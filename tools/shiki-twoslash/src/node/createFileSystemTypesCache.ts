import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { TwoslashReturn } from 'twoslash'
import { hash as createHash } from 'vuepress/utils'
import type { TwoslashTypesCache } from './options.js'

export interface FileSystemTypeResultCacheOptions {
  /**
   * The directory to store the cache files.
   */
  dir: string
}

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
      readFileSync(filePath, { encoding: 'utf-8' }),
    ) as TwoslashReturn
  },
  write(code, data) {
    const hash = createHash(code)
    const filePath = join(dir, `${hash}.json`)
    const json = JSON.stringify(data)
    writeFileSync(filePath, json, { encoding: 'utf-8' })
  },
})

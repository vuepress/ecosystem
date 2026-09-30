import { createHash } from 'node:crypto'

import { ensureEndingSlash, ensureLeadingSlash } from '@vuepress/helper'
import { customAlphabet } from 'nanoid'

import type {
  AutoFrontmatterContext,
  AutoFrontmatterData,
  AutoFrontmatterHandle,
} from '../types.js'
import { logger } from '../utils.js'

const NANOID_ALPHABET = 'abcdefghijklmnopqrstuvwxyz1234567890'

const nanoidFactoryCache = new Map<number, (size?: number) => string>()

const getNanoId = (size: number): string => {
  const cached = nanoidFactoryCache.get(size)

  if (cached) return cached()

  const factory = customAlphabet(NANOID_ALPHABET, size)
  nanoidFactoryCache.set(size, factory)

  return factory()
}

/* oxlint-disable no-bitwise -- checksums are computed with bitwise operations */

const createCrc16Table = (): Uint16Array => {
  const table = new Uint16Array(256)

  for (let index = 0; index < 256; index += 1) {
    let crc = index << 8

    for (let bit = 0; bit < 8; bit += 1) {
      crc =
        (crc & 0x8000) === 0
          ? (crc << 1) & 0xffff
          : ((crc << 1) ^ 0x1021) & 0xffff
    }

    table[index] = crc
  }

  return table
}

const CRC16_TABLE = createCrc16Table()

const createCrc32Table = (): Uint32Array => {
  const table = new Uint32Array(256)

  for (let index = 0; index < 256; index += 1) {
    let crc = index

    for (let bit = 0; bit < 8; bit += 1)
      crc = (crc & 1) === 0 ? crc >>> 1 : 0xedb88320 ^ (crc >>> 1)

    table[index] = crc >>> 0
  }

  return table
}

const CRC32_TABLE = createCrc32Table()

// CRC-16/XMODEM (poly 0x1021, init 0x0000)
const crc16 = (input: string): number => {
  let crc = 0

  for (const byte of new TextEncoder().encode(input))
    crc = ((crc << 8) ^ CRC16_TABLE[((crc >> 8) ^ byte) & 0xff]) & 0xffff

  return crc
}

// CRC-32/ISO-HDLC (poly 0xedb88320, init 0xffffffff, also known as zlib)
const crc32 = (input: string): number => {
  let crc = 0xffffffff

  for (const byte of new TextEncoder().encode(input))
    crc = CRC32_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8)

  return (crc ^ 0xffffffff) >>> 0
}

/* oxlint-enable no-bitwise */

const encodeHash = (
  value: number,
  hexWidth: number,
  decWidth: number,
  encoding: PermalinkEncoding,
): string =>
  encoding === 'dec'
    ? value.toString(10).padStart(decWidth, '0')
    : value.toString(16).padStart(hexWidth, '0')

const getAlgorithmValue = (
  algorithm: PermalinkAlgorithm,
  encoding: PermalinkEncoding,
  input: string,
  length: number,
): string => {
  switch (algorithm) {
    case 'crc16': {
      return encodeHash(crc16(input), 4, 5, encoding)
    }
    case 'crc32': {
      return encodeHash(crc32(input), 8, 10, encoding)
    }
    case 'md5':
    case 'sha1':
    case 'sha256': {
      return createHash(algorithm).update(input).digest('hex')
    }
    default: {
      return getNanoId(length)
    }
  }
}

/**
 * Algorithm used to derive the permalink value
 *
 * 用于派生永久链接值的算法
 *
 * - `crc16` / `crc32`: deterministic short checksum of the seed.
 * - `md5` / `sha1` / `sha256`: deterministic hash of the seed, in hex.
 * - `nanoid`: random string, which is **not** deterministic.
 */
export type PermalinkAlgorithm =
  | 'crc16'
  | 'crc32'
  | 'md5'
  | 'sha1'
  | 'sha256'
  | 'nanoid'

/**
 * Encoding of a numeric hash
 *
 * 数值哈希的编码方式
 *
 * Only applies to `crc16` and `crc32`. Values are zero padded to keep a stable
 * length. Other algorithms always use hex.
 *
 * 仅对 `crc16` 与 `crc32` 生效。会补零以保持长度稳定。其他算法始终使用十六进制。
 */
export type PermalinkEncoding = 'hex' | 'dec'

/**
 * Source used as the seed of the permalink
 *
 * 永久链接种子的来源
 *
 * - `path`: the path of the markdown file relative to the source directory. It
 *   stays the same when the content changes.
 * - `content`: the markdown content without frontmatter. It changes whenever the
 *   content changes, so the permalink is only stable as long as the content
 *   is.
 */
export type PermalinkSource = 'path' | 'content'

/**
 * Options of `createPermalink`
 *
 * `createPermalink` 的选项
 */
export interface PermalinkOptions {
  /**
   * Algorithm used to derive the permalink value
   *
   * 用于派生永久链接值的算法
   *
   * @default 'crc32'
   */
  algorithm?: PermalinkAlgorithm

  /**
   * Encoding of a numeric hash, only applies to `crc16` and `crc32`
   *
   * 数值哈希的编码方式，仅对 `crc16` 与 `crc32` 生效
   *
   * @default 'hex'
   */
  encoding?: PermalinkEncoding

  /**
   * Source used as the seed of the permalink
   *
   * 永久链接种子的来源
   *
   * @default 'path'
   */
  source?: PermalinkSource

  /**
   * Amount of characters kept from the generated value
   *
   * 保留的生成值字符数
   *
   * It is the exact length for `nanoid`. For the other algorithms it truncates
   * the encoded value, and `0` keeps the whole value.
   *
   * 对 `nanoid` 而言它是生成字符串的精确长度。对其他算法它是截断长度，`0` 表示不截断。
   *
   * @default 8
   */
  length?: number

  /**
   * Prefix of the permalink
   *
   * 永久链接前缀
   *
   * @default '/'
   */
  prefix?: string

  /**
   * Suffix of the permalink
   *
   * 永久链接后缀
   *
   * @default '.html'
   */
  suffix?: string

  /**
   * Whether to overwrite existing permalinks
   *
   * 是否覆盖已有的永久链接
   *
   * Useful when migrating from one algorithm to another.
   *
   * 迁移算法时很有用。
   *
   * @default false
   */
  force?: boolean

  /**
   * Permalinks that are already used and must not be generated again
   *
   * 已被使用、不可再生成的永久链接
   */
  reserved?: Iterable<string>
}

/**
 * Handler created by `createPermalink`
 *
 * `createPermalink` 创建的处理器
 */
export interface PermalinkHandle extends AutoFrontmatterHandle {
  (
    data: AutoFrontmatterData,
    context: AutoFrontmatterContext,
  ): AutoFrontmatterData

  /**
   * Mark permalinks as already used
   *
   * 将永久链接标记为已被使用
   *
   * The plugin calls it before handling files, so that generated permalinks
   * never conflict with the ones already written in the frontmatter.
   *
   * 插件会在处理文件前调用它，以确保生成的永久链接不会与 frontmatter 中已有的链接冲突。
   *
   * @param values - Permalinks to reserve / 要保留的永久链接
   */
  reserve: (values: Iterable<string>) => void
}

/**
 * Create a handler that adds a permalink to the frontmatter, similar to hexo's
 * `abbrlink`
 *
 * 创建一个向 frontmatter 添加永久链接的处理器，类似 hexo 的 `abbrlink`
 *
 * Unlike `addShortPermalink`, the created handler:
 *
 * - Derives the value from the file path or content, so it is stable and
 *   reproducible instead of random;
 * - Keeps a registry of used permalinks, so two files never end up with the same
 *   permalink. New files are the only ones that get a new permalink, existing
 *   permalinks are used as the reserved values.
 *
 * 与 `addShortPermalink` 不同，创建的处理器：
 *
 * - 从文件路径或内容派生值，因此是稳定且可复现的，而不是随机的；
 * - 维护已用永久链接的登记表，因此两个文件不会得到相同的永久链接。只有新文件会获得新的永久链接，已有的永久链接会作为保留值参与去重。
 *
 * @example
 *   import {
 *     autoFrontmatterPlugin,
 *     createPermalink,
 *   } from '@vuepress/plugin-auto-frontmatter'
 *
 *   export default {
 *     plugins: [
 *       autoFrontmatterPlugin({
 *         filter: 'posts/**\/*.md',
 *         handle: createPermalink({ prefix: '/posts/' }),
 *       }),
 *     ],
 *   }
 *
 * @param options - Permalink options / 永久链接选项
 * @returns A frontmatter handler with a permalink registry / 带有永久链接登记表的
 *   frontmatter 处理器
 */
export const createPermalink = (
  options: PermalinkOptions = {},
): PermalinkHandle => {
  const {
    algorithm = 'crc32',
    encoding = 'hex',
    source = 'path',
    length: rawLength = 8,
    prefix = '/',
    suffix = '.html',
    force = false,
    reserved,
  } = options

  const length =
    Number.isInteger(rawLength) && rawLength >= 0 ? rawLength : undefined

  if (length === undefined) {
    logger.warn(
      `Invalid \`length\` (${rawLength}), fallback to 8. It must be a non-negative integer.`,
    )
  }

  const size = length ?? 8

  if (encoding === 'dec' && algorithm !== 'crc16' && algorithm !== 'crc32') {
    logger.warn(
      `\`encoding: 'dec'\` only applies to 'crc16' and 'crc32', '${algorithm}' always uses hex.`,
    )
  }

  const base = ensureEndingSlash(ensureLeadingSlash(prefix))
  const used = new Set<string>(force ? [] : reserved)

  const generate = (seed: string, salt: number): string => {
    const value = getAlgorithmValue(
      algorithm,
      encoding,
      salt === 0 ? seed : `${seed}\n${salt}`,
      // `nanoid` cannot produce an empty string
      size || 8,
    )

    return `${base}${algorithm === 'nanoid' || size === 0 ? value : value.slice(0, size)}${suffix}`
  }

  return Object.assign(
    (data: AutoFrontmatterData, context: AutoFrontmatterContext) => {
      // `permalink: null` is the way to opt out of a permalink
      if (Object.is(data.permalink, null)) return data

      if (
        !force &&
        typeof data.permalink === 'string' &&
        data.permalink !== ''
      ) {
        used.add(data.permalink)
        return data
      }

      const seed =
        source === 'content'
          ? context.content
          : context.relativePath.replaceAll('\\', '/')

      let salt = 0
      let permalink = generate(seed, salt)

      while (used.has(permalink)) {
        salt += 1
        permalink = generate(seed, salt)
      }

      used.add(permalink)

      if (salt > 0) {
        logger.warn(
          `The permalink of ${context.relativePath} conflicts with an existing one, regenerated as ${permalink}.`,
        )
      }

      data.permalink = permalink

      return data
    },
    {
      reserve: (values: Iterable<string>): void => {
        if (force) return

        for (const value of values) used.add(value)
      },
    },
  )
}

/**
 * Permalinks generated by `addShortPermalink` in the current run
 *
 * `addShortPermalink` 在本次运行中生成的永久链接
 *
 * It keeps the values generated in the current run unique, but it is not seeded
 * with the permalinks already written in the frontmatter, because the helper
 * has no access to the other files.
 *
 * 它保证本次运行生成的值互不相同，但不会用 frontmatter 中已存在的永久链接初始化，因为该辅助函数无法访问其他文件。
 */
const shortPermalinkRegistry = new Set<string>()

/**
 * Clear the registry of `addShortPermalink`
 *
 * 清空 `addShortPermalink` 的登记表
 *
 * @internal
 */
export const resetShortPermalinkRegistry = (): void => {
  shortPermalinkRegistry.clear()
}

/**
 * Options of `addShortPermalink`
 *
 * `addShortPermalink` 的选项
 */
export interface AddShortPermalinkOptions {
  /**
   * Use `nanoid` to generate a random character length
   *
   * 使用 `nanoid` 生成的随机字符长度
   *
   * @default 8
   */
  length?: number
  /**
   * Add prefix
   *
   * 添加前缀
   *
   * @default `/`
   */
  prefix?: string
  /**
   * Add suffix
   *
   * 添加后缀
   *
   * @default `.html`
   */
  suffix?: string
}

/**
 * Add a random permalink to frontmatter
 *
 * 向 frontmatter 添加随机永久链接
 *
 * The value is random, so it cannot be reproduced once the frontmatter is lost,
 * and it does not prevent two files from getting the same permalink. Use
 * `createPermalink` instead when you need a stable or conflict-free permalink.
 *
 * 该值是随机的，一旦 frontmatter 丢失就无法复现，也无法避免两个文件得到相同的永久链接。需要稳定或无冲突的永久链接时，请改用
 * `createPermalink`。
 *
 * @example
 *   ;({
 *     handle(data, context) {
 *       addShortPermalink(data, {
 *         prefix: '/posts/',
 *         length: 8,
 *         suffix: '.html',
 *       })
 *       // => data.permalink = '/posts/ac3e7gh2.html'
 *       return data
 *     },
 *   })
 *
 * @param data - Frontmatter data / frontmatter 数据
 * @param options - Options / 选项
 */
export const addShortPermalink = (
  data: AutoFrontmatterData,
  options: AddShortPermalinkOptions = {},
): void => {
  // `permalink: null` is the way to opt out of a permalink
  if (Object.is(data.permalink, null)) return

  if (typeof data.permalink === 'string' && data.permalink !== '') return

  const { length = 8, prefix = '/', suffix = '.html' } = options
  const size = Number.isInteger(length) && length > 0 ? length : 8

  if (size !== length) {
    logger.warn(
      `Invalid \`length\` (${length}), fallback to 8. It must be a positive integer.`,
    )
  }

  const base = ensureEndingSlash(ensureLeadingSlash(prefix))

  let permalink = `${base}${getNanoId(size)}${suffix}`

  while (shortPermalinkRegistry.has(permalink))
    permalink = `${base}${getNanoId(size)}${suffix}`

  shortPermalinkRegistry.add(permalink)
  data.permalink = permalink
}

/**
 * Whether a handler is created by `createPermalink`
 *
 * 判断处理器是否由 `createPermalink` 创建
 *
 * @param handle - Frontmatter handler / frontmatter 处理器
 * @returns Whether the handler has a permalink registry / 处理器是否带有永久链接登记表
 * @internal
 */
export const isPermalinkHandle = (
  handle: AutoFrontmatterHandle,
): handle is PermalinkHandle =>
  typeof (handle as Partial<PermalinkHandle>).reserve === 'function'

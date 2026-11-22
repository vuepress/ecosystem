import { isArray, isString } from '@vuepress/helper/client'

import type { ShareServiceVariableName } from '../../shared/index.js'

/**
 * Data used to resolve a share link
 *
 * 用于解析分享链接的数据
 */
export type ShareLinkData = Partial<
  Record<ShareServiceVariableName, string | string[]>
>

/**
 * Options of resolving a share link
 *
 * 解析分享链接的配置
 */
export interface ResolveShareLinkOptions {
  /**
   * Whether to percent-encode the substituted values
   *
   * It should be disabled when the link is used as plain text, e.g. the content
   * of a QR code.
   *
   * 是否对替换后的值进行百分号编码
   *
   * 当链接作为纯文本使用时（例如二维码内容）应关闭该选项。
   *
   * @default true
   */
  encode?: boolean
}

/**
 * Resolve the variables in a share link
 *
 * A variable is wrapped in `[` and `]`, and alternatives can be separated by
 * `|`, e.g. `[description|summary]` uses the description when it exists and
 * falls back to the summary.
 *
 * 解析分享链接中的变量
 *
 * 变量使用 `[` 与 `]` 包裹，可以使用 `|` 分隔候选项，例如 `[description|summary]`
 * 会在描述存在时使用描述，否则使用综述。
 *
 * @param link - Share link template / 分享链接模板
 * @param data - Page data / 页面数据
 * @param options - Options / 配置
 * @returns Resolved share link / 解析后的分享链接
 */
export const resolveShareLink = (
  link: string,
  data: ShareLinkData,
  options: ResolveShareLinkOptions = {},
): string => {
  const { encode = true } = options
  const stringify = (value: string | string[]): string =>
    isArray<string>(value)
      ? value
          .filter((item) => isString(item))
          .map((item) => (encode ? encodeURIComponent(item) : item))
          .join(',')
      : encode
        ? encodeURIComponent(value)
        : value

  const parts: string[] = []
  let index = 0

  while (index < link.length) {
    const start = link.indexOf('[', index)

    if (start === -1) {
      parts.push(link.slice(index))
      break
    }

    const end = link.indexOf(']', start + 1)

    if (end === -1) {
      parts.push(link.slice(index))
      break
    }

    parts.push(link.slice(index, start))

    const names = link.slice(start + 1, end)

    if (names) {
      let resolved: string | null = null

      for (const name of names.split('|')) {
        const value = data[name.trim() as ShareServiceVariableName]

        if (value) {
          resolved = stringify(value)
          break
        }
      }

      parts.push(resolved ?? '')
    } else {
      parts.push('[]')
    }

    index = end + 1
  }

  return parts.join('')
}

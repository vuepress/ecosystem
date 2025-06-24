/**
 * Assets Replacement Target Path
 * - `string`: Directly concatenated before the original path
 * - `(url) => string`: Custom replacement method, returns the new path
 *
 * 资源替换目标路径
 * - `string`: 直接拼接在原始路径前面
 * - `(url) => string`: 自定义替换方法，返回新路径
 */
export type Replacement = string | ((url: string) => string)

/**
 * Assets Replacement Rule
 *
 * 资源替换规则
 */
export interface ReplacementRule {
  /**
   * Assets Matching
   *
   * - `RegExp`: Match using regular expression
   * - `string`: Match using string
   *   - Strings starting with `^` or ending with `$` are automatically converted to regular expressions
   *   - For ordinary strings, checks if they appear at the start or end
   *
   * 资源匹配
   *
   * - `RegExp`: 匹配正则
   * - `string`: 匹配字符串
   *   - 以 `^` 开头或以 `$` 结尾的字符串，会自动转换为正则
   *   - 普通字符串检查是否以其作为开头或结尾
   *
   * @example
   * ```
   * '^/foo/'
   * '.jpg$'
   * /\.jpg$/
   * ```
   */
  find: RegExp | string

  /**
   * Assets Replacement Target Path
   * - `string`: Directly concatenated before the original path
   * - `(url) => string`: Custom replacement method, returns the new path
   *
   * 资源替换目标路径
   * - `string`: 直接拼接在原始路径前面
   * - `(url) => string`: 自定义替换方法，返回新路径
   *
   * @example
   * ```
   * 'https://example.com'
   * (url) => `https://example.com${url}`
   * ```
   */
  replacement: Replacement
}

export interface ReplaceAssetsOptions {
  /**
   * Custom Assets Replacement Rules
   *
   * 自定义资源替换规则
   *
   * @example
   * ```ts
   * {
   *   rules: [{
   *     find: /^\/images\/.*\.(jpe?g|png|gif|svg)$/,
   *     replacement: 'https://cdn.example.com/images/',
   *   }]
   * }
   * ```
   */
  rules?: ReplacementRule | ReplacementRule[]
  /**
   * Built-in assets matching rules, designed to locate and match common assets paths such as images, videos, audio, etc.
   *
   * 内置的资源匹配规则，匹配查找常见的图片、视频、音频等资源路径
   *
   * @example
   * ```
   * {
   *   all: 'https://example.com'
   * }
   * ```
   */
  all?: Replacement
  /**
   * Built-in image matching rules, designed to locate and match common image paths.
   *
   * 内置的图片匹配规则，匹配查找常见的图片路径
   *
   * @example
   * ```
   * {
   *   image: 'https://example.com'
   * }
   * ```
   */
  image?: Replacement
  /**
   * Built-in media matching rules, designed to locate and match common media paths such as videos, audio, etc.
   *
   * 内置的媒体匹配规则，匹配查找常见的视频、音频等媒体路径
   *
   * @example
   * ```
   * {
   *   media: 'https://example.com'
   * }
   * ```
   */
  media?: Replacement
}

/**
 * Assets Replacement Plugin Options
 *
 * 资源替换插件配置项
 */
export type ReplaceAssetsPluginOptions =
  | ReplaceAssetsOptions
  | Replacement
  | ReplacementRule
  | ReplacementRule[]

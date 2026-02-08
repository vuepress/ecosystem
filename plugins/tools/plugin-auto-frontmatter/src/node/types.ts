export type AutoFrontmatterData = Record<string, unknown>

/**
 * The context of the markdown file
 *
 * markdown 文件的上下文
 */
export interface AutoFrontmatterContext {
  /**
   * The absolute path to the file
   *
   * 文件绝对路径
   */
  filepath: string
  /**
   * The relative path to the file
   *
   * 文件相对路径
   */
  relativePath: string
  /**
   * The markdown content of the file
   *
   * 文件 markdown 内容
   */
  content: string
}

/**
 * The function to handle the frontmatter data
 *
 * 处理 frontmatter 数据的函数
 *
 * @example
 * ```ts
 * function transform(data, context) {
 *   data.foo ??= 'foo'
 *   return data
 * }
 * ```
 */
export type AutoFrontmatterHandle<
  DataType extends AutoFrontmatterData = AutoFrontmatterData,
> = (
  data: DataType,
  context: AutoFrontmatterContext,
) => DataType | Promise<DataType>

export interface AutoFrontmatterRule {
  /**
   * File filter, matches the relative path of the file
   *
   * Uses [picomatch](https://github.com/micromatch/picomatch) for pattern matching
   *
   * 文件过滤器，匹配文件的相对路径
   *
   * 使用 [picomatch](https://github.com/micromatch/picomatch) 进行模式匹配
   */
  filter: string[] | string | ((relativePath: string) => boolean)
  /**
   * The function to handle the frontmatter data
   *
   * 处理 frontmatter 数据的函数
   *
   * @example
   * ```ts
   * {
   *   handle: (data, context) => {
   *     data.foo ??= 'foo'
   *     return data
   *   }
   * }
   * ```
   */
  handle: AutoFrontmatterHandle
}

export type AutoFrontmatterPluginOptions =
  | AutoFrontmatterHandle
  | AutoFrontmatterRule
  | AutoFrontmatterRule[]

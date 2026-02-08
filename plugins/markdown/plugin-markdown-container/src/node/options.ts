import type Renderer from 'markdown-it/lib/renderer.mjs'
import type Token from 'markdown-it/lib/token.mjs'
import type { MarkdownEnv } from 'vuepress/markdown'
import type { LocaleConfig } from 'vuepress/shared'

/**
 * Options for markdown-it-container
 *
 * markdown-it-container 的配置项
 */
export interface MarkdownItContainerOptions {
  /**
   * The marker of the container syntax
   *
   * 容器语法的标记符
   *
   * @default ':'
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  marker?: string

  /**
   * Renderer function for opening / closing tokens
   *
   * 用于渲染开始/结束标记的函数
   *
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  render?: MarkdownItContainerRenderFunction

  /**
   * Function to validate tail after opening marker, should return `true` on success
   *
   * 用于验证开始标记后内容的函数，成功时应返回 `true`
   */
  validate?: (params: string) => boolean
}

/**
 * Renderer function for markdown-it-container
 *
 * markdown-it-container 的渲染函数
 *
 * @param tokens - Token array / Token 数组
 * @param index - Current token index / 当前 token 索引
 * @param options - Options object / 配置对象
 * @param env - Markdown environment / Markdown 环境
 * @param self - Renderer instance / 渲染器实例
 */
export type MarkdownItContainerRenderFunction = (
  tokens: Token[],
  index: number,
  options: unknown,
  env: MarkdownEnv,
  self: Renderer,
) => string

/**
 * Function to render container parts
 *
 * 渲染容器部分的函数
 *
 * @param info - Container info string / 容器信息字符串
 */
export type RenderPlaceFunction = (info: string) => string

/**
 * Options for `@vuepress/plugin-markdown-container`
 *
 * `@vuepress/plugin-markdown-container` 的配置项
 */
export interface MarkdownContainerPluginOptions extends MarkdownItContainerOptions {
  /**
   * The type of the container
   *
   * It would be used as the `name` of the container
   *
   * 容器的类型
   *
   * 它将被用作容器的 `name` 参数
   *
   * @see https://github.com/markdown-it/markdown-it-container#api
   */
  type: string

  /**
   * Locales config for container
   *
   * 容器的多语言配置
   */
  locales?: LocaleConfig<{
    /**
     * Default info of the container
     *
     * If this option is not specified, the default info will fallback to the
     * uppercase of the `type` option
     *
     * 容器的默认信息
     *
     * 如果未指定此选项，默认信息将回退到 `type` 选项的大写形式
     */
    defaultInfo: string
  }>

  /**
   * A function to render the starting tag of the container.
   *
   * This option will not take effect if you don't specify the `after` option.
   *
   * 用于渲染容器开始标签的函数
   *
   * 如果未指定 `after` 选项，此选项将不会生效
   */
  before?: RenderPlaceFunction

  /**
   * A function to render the ending tag of the container.
   *
   * This option will not take effect if you don't specify the `before` option.
   *
   * 用于渲染容器结束标签的函数
   *
   * 如果未指定 `before` 选项，此选项将不会生效
   */
  after?: RenderPlaceFunction
}

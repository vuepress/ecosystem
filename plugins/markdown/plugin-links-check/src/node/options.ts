import type { AnchorsCheckMode } from './checkMarkdownLink.js'

export interface LinksCheckPluginOptions {
  /**
   * Whether check dead links in markdown in devServer
   *
   * 是否在开发服务器检查 Markdown 中的死链
   *
   * @default true
   */
  dev?: boolean

  /**
   * Whether check dead links in markdown during build
   *
   * 是否在构建时检查 Markdown 中的死链
   *
   * If set to 'error', the build will fail when dead links are found
   *
   * 如果设置为 'error'，则在发现死链时构建将失败
   *
   * @default true
   */
  build?: boolean | 'error'

  /**
   * Links to exclude from checking
   *
   * 检查时需要排除的链接
   *
   * For anchor checking, a link is compared both as it is written (including
   * the anchor) and as its path without the anchor.
   *
   * 检查锚点时，链接会同时以原样（含锚点）和去掉锚点的路径进行比较。
   */
  exclude?: (RegExp | string)[] | ((link: string, isDev: boolean) => boolean)

  /**
   * Whether to check anchors of links
   *
   * 是否检查链接的锚点
   *
   * Set to `'same-page'` to only check anchors pointing to the current page.
   *
   * 设置为 `'same-page'` 时仅检查指向当前页面的锚点。
   *
   * @default true
   */
  anchors?: AnchorsCheckMode
}

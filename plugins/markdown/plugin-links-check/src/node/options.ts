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
   * @description If set to 'error', the build will fail when dead links are found
   *
   * 是否在构建时检查 Markdown 中的死链
   *
   * @description 如果设置为 'error'，则在发现死链时构建将失败
   *
   * @default true
   */
  build?: boolean | 'error'

  /**
   * Links to exclude from checking
   *
   * 检查时需要排除的链接
   */
  exclude?: (RegExp | string)[] | ((link: string, isDev: boolean) => boolean)
}

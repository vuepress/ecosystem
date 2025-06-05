export interface RemovePwaPluginOptions {
  /**
   * Cache patterns to be removed
   *
   * 需要移除的缓存模式
   *
   * @default []
   */
  cachePatterns?: string[]

  /**
   * Original service worker location relative to dest folder
   *
   * 相对于 dest 文件夹的原始 service worker 位置
   *
   * @default "service-worker.js"
   */
  swLocation?: string
}

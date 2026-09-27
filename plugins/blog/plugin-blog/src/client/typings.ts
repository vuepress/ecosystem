export interface Article<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /**
   * Article path
   *
   * 文章路径
   */
  path: string

  /**
   * Article info
   *
   * 文章信息
   */
  info: Info
}

export interface BlogCategoryData<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /**
   * Category path
   *
   * 分类路径
   */
  path: string

  /**
   * Only available when current route matches an item path
   *
   * 仅当当前路径和某个子项目匹配时可用
   */
  currentItems?: Article<Info>[]

  /**
   * Category map
   *
   * 分类映射
   */
  map: Record<
    /**
     * Unique key under current category
     *
     * 当前分类下全局唯一的 key
     */
    string,
    {
      /**
       * Category path of the key
       *
       * 对应键值的分类路径
       */
      path: string

      /**
       * Category items of the key
       *
       * 对应键值的项目
       */
      items: Article<Info>[]
    }
  >
}

export interface BlogTypeData<
  Info extends Record<string, unknown> = Record<string, unknown>,
> {
  /**
   * Type path
   *
   * 类别路径
   */
  path: string

  /**
   * Items under current type
   *
   * 当前类别下的项目
   */
  items: Article<Info>[]
}

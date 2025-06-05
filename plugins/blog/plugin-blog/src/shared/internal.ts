/**
 * Category configuration
 *
 * 分类配置
 */
export interface CategoryConfig {
  /**
   * Category page path
   *
   * 分类页面路径
   */
  path: string
  /**
   * Article indexes in this category
   *
   * 此分类中的文章索引
   */
  indexes: number[]
}

export type CategoryLocaleMap = Record<
  /** Category name */ string,
  CategoryConfig
>

/**
 * Category locale configuration
 *
 * 分类区域配置
 */
export interface CategoryLocaleConfig {
  /**
   * Main page of category
   *
   * 分类主页面
   */
  path: string
  /**
   * Category map for current locale
   *
   * 当前区域的分类映射
   */
  map: CategoryLocaleMap
}

export type CategoryMap = Record<
  /** Locale Path */ string,
  CategoryLocaleConfig
>

export type CategoriesMap = Record</** Category key */ string, CategoryMap>

/**
 * Type locale configuration
 *
 * 类型区域配置
 */
export interface TypeLocaleConfig {
  /**
   * Type page path
   *
   * 类型页面路径
   */
  path: string
  /**
   * Article indexes in this type
   *
   * 此类型中的文章索引
   */
  indexes: number[]
}

export type TypeMap = Record</** Locale Path */ string, TypeLocaleConfig>

export type TypesMap = Record</** Type key */ string, TypeMap>

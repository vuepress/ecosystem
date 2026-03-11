/**
 * Configuration for a single category value (e.g. a specific tag name)
 *
 * 单个分类值的配置（例如特定标签名）
 */
export interface CategoryConfig {
  /**
   * Path of the category item page
   *
   * 分类子项页面路径
   */
  path: string
  /**
   * Indexes into the path store for all articles in this category
   *
   * 此分类中所有文章在路径存储中的索引
   */
  indexes: number[]
}

/**
 * Map from category value name to its configuration
 *
 * 分类值名称到其配置的映射
 */
export type CategoryLocaleMap = Record<string, CategoryConfig>

/**
 * Category data for a single locale
 *
 * 单个区域的分类数据
 */
export interface CategoryLocaleConfig {
  /**
   * Path of the category listing page for this locale
   *
   * 此区域的分类列表页面路径
   */
  path: string
  /**
   * Map of all category values in this locale
   *
   * 此区域中所有分类值的映射
   */
  map: CategoryLocaleMap
}

/**
 * Map from locale path to its category configuration
 *
 * 区域路径到分类配置的映射
 */
export type CategoryMap = Record<string, CategoryLocaleConfig>

/**
 * Map from category key (e.g. `"tag"`) to its per-locale configuration
 *
 * 分类键名（如 `"tag"`）到其各区域配置的映射
 */
export type CategoriesMap = Record<string, CategoryMap>

/**
 * Type data for a single locale
 *
 * 单个区域的类型数据
 */
export interface TypeLocaleConfig {
  /**
   * Path of the type listing page for this locale
   *
   * 此区域的类型列表页面路径
   */
  path: string
  /**
   * Indexes into the path store for all articles of this type
   *
   * 此类型中所有文章在路径存储中的索引
   */
  indexes: number[]
}

/**
 * Map from locale path to its type configuration
 *
 * 区域路径到类型配置的映射
 */
export type TypeMap = Record<string, TypeLocaleConfig>

/**
 * Map from type key (e.g. `"article"`) to its per-locale configuration
 *
 * 类型键名（如 `"article"`）到其各区域配置的映射
 */
export type TypesMap = Record<string, TypeMap>

import { isString } from '@vuepress/helper/client'
import type { App, Component, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface CatalogInfo {
  /**
   * Catalog title
   *
   * 目录标题
   */
  title: string
  /**
   * Catalog order
   *
   * 目录顺序
   */
  order?: number
  /**
   * Catalog content
   *
   * 目录内容
   */
  content?: Component
}

export type CatalogInfoGetter = (
  meta: Record<string, unknown>,
) => CatalogInfo | null

let catalogGetter: CatalogInfoGetter = (meta) =>
  isString(meta.title) ? { title: meta.title } : null

const catalogInfoSymbol: InjectionKey<CatalogInfoGetter> = Symbol(
  __VUEPRESS_DEV__ ? 'catalog-info-getter' : '',
)

/**
 * Define catalog info getter
 *
 * 定义目录信息获取器
 *
 * @param getter catalog info getter function
 */
export const defineCatalogInfoGetter = (getter: CatalogInfoGetter): void => {
  catalogGetter = getter
}

/**
 * Use catalog info getter
 *
 * 使用目录信息获取器
 */
export const useCatalogInfoGetter = (): CatalogInfoGetter =>
  inject(catalogInfoSymbol)!

/**
 * Inject catalog info getter
 *
 * 注入目录信息获取器
 *
 * @param app Vue app instance
 */
export const injectCatalogInfoGetter = (app: App): void => {
  app.provide(catalogInfoSymbol, catalogGetter)
}

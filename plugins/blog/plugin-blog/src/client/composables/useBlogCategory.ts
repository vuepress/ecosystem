import { categoriesMap } from '@temp/blog/category'
import { store } from '@temp/blog/store'
import type { ComputedRef } from 'vue'
import { computed, readonly, shallowRef } from 'vue'
import { resolveRoute, useData } from 'vuepress/client'
import type {
  BlogCategoryFrontmatterOptions,
  CategoriesMap,
} from '../../shared/index.js'
import type { BlogCategoryData } from '../typings.js'

declare const __BLOG_META_SCOPE__: string

const categoryMapRef = shallowRef(categoriesMap)

export const blogCategoryMap = readonly(categoryMapRef)

/**
 * Use blog category data
 *
 * 使用博客分类数据
 *
 * @description Get blog category data for current page or specified key
 *
 * 获取当前页面或指定键的博客分类数据
 *
 * @param key - Category key to get data for
 *
 * key - 要获取数据的分类键
 *
 * @returns Computed blog category data
 *
 * 返回计算的博客分类数据
 */
export const useBlogCategory = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  key?: string,
): ComputedRef<BlogCategoryData<T>> => {
  const { frontmatter, page, routeLocale } = useData<{
    blog?: BlogCategoryFrontmatterOptions
  }>()

  return computed(() => {
    const mapKey = key ?? frontmatter.value.blog?.key ?? ''

    if (!mapKey) {
      // eslint-disable-next-line no-console
      console.warn(`useBlogCategory: key not found`)

      // Fallback data
      return { path: '/', map: {} }
    }

    if (!(mapKey in categoryMapRef.value))
      throw new Error(`useBlogCategory: key ${mapKey} is invalid`)

    const currentMap = categoryMapRef.value[mapKey][routeLocale.value]
    const result: BlogCategoryData<T> = {
      path: currentMap.path,
      map: {},
    }

    for (const category in currentMap.map) {
      const categoryMap = currentMap.map[category]

      result.map[category] = { path: categoryMap.path, items: [] }

      for (const index of categoryMap.indexes) {
        const { path, meta } = resolveRoute(store[index])

        result.map[category].items.push({
          path,
          info:
            __BLOG_META_SCOPE__ === ''
              ? (meta as T)
              : (meta[__BLOG_META_SCOPE__] as T),
        })
      }

      if (page.value.path === categoryMap.path)
        result.currentItems = result.map[category].items
    }

    return result
  })
}

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot))
  __VUE_HMR_RUNTIME__.updateBlogCategory = (value: CategoriesMap): void => {
    categoryMapRef.value = value
  }

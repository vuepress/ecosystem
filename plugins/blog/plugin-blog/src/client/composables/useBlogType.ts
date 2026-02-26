import { store } from '@temp/blog/store'
import { typesMap } from '@temp/blog/type'
import type { ComputedRef } from 'vue'
import { computed, readonly, shallowRef } from 'vue'
import { resolveRoute, useData } from 'vuepress/client'
import type {
  BlogTypeFrontmatterOptions,
  TypesMap,
} from '../../shared/index.js'
import type { BlogTypeData } from '../typings.js'

declare const __BLOG_META_SCOPE__: string

const typeMapRef = shallowRef(typesMap)

export const blogTypeMap = readonly(typeMapRef)

/**
 * Use blog type data
 *
 * 使用博客类型数据
 *
 * @description Get blog type data for current page or specified key
 *
 * 获取当前页面或指定键的博客类型数据
 *
 * @param key - Type key to get data for
 *
 * key - 要获取数据的类型键
 *
 * @returns Computed blog type data
 *
 * 返回计算的博客类型数据
 */
export const useBlogType = <
  T extends Record<string, unknown> = Record<string, unknown>,
>(
  key?: string,
): ComputedRef<BlogTypeData<T>> => {
  const { frontmatter, routeLocale } = useData<{
    blog?: BlogTypeFrontmatterOptions
  }>()

  return computed(() => {
    const mapKey = key ?? frontmatter.value.blog?.key ?? ''

    if (!mapKey) {
      // eslint-disable-next-line no-console
      console.warn(`useBlogType: key not found`)

      // Fallback data
      return { path: '/', items: [] }
    }

    if (!(mapKey in typeMapRef.value))
      throw new Error(`useBlogType: key ${key} is invalid`)

    const configMap = typeMapRef.value[mapKey][routeLocale.value]
    const result: BlogTypeData<T> = {
      path: configMap.path,
      items: [],
    }

    for (const index of configMap.indexes) {
      const { path, meta } = resolveRoute(store[index])

      result.items.push({
        path,
        info:
          __BLOG_META_SCOPE__ === ''
            ? (meta as T)
            : (meta[__BLOG_META_SCOPE__] as T),
      })
    }

    return result
  })
}

if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateBlogType = (value: TypesMap): void => {
    typeMapRef.value = value
  }
}

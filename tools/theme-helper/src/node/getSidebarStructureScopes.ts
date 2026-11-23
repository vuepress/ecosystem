import { ensureEndingSlash, isPlainObject } from '@vuepress/helper'

/**
 * Options of `getSidebarStructureScopes`
 *
 * `getSidebarStructureScopes` 的选项
 */
export interface SidebarStructureScopesOptions {
  /**
   * Theme data, with the root options and the locale options
   *
   * 主题数据，包含根配置与多语言配置
   */
  themeData: object

  /**
   * Key of the children field of a group item, `items` for the default theme
   * and `children` for the classic theme
   *
   * 分组条目中子项的字段名，默认主题为 `items`，经典主题为 `children`
   */
  childrenKey: string

  /**
   * Key of the prefix field of a group item, `base` for the default theme and
   * `prefix` for the classic theme
   *
   * 分组条目中前缀的字段名，默认主题为 `base`，经典主题为 `prefix`
   */
  prefixKey: string
}

const normalizeScope = (scope: string): string =>
  ensureEndingSlash(scope.startsWith('/') ? scope : `/${scope}`)

const resolveScope = (prefix: string, scope: string): string =>
  normalizeScope(scope.startsWith('/') ? scope : `${prefix}${scope}`)

const collectScopes = (
  sidebar: unknown,
  prefix: string,
  scopes: Set<string>,
  {
    childrenKey,
    prefixKey,
  }: Pick<SidebarStructureScopesOptions, 'childrenKey' | 'prefixKey'>,
): void => {
  if (sidebar === 'structure') {
    scopes.add(prefix)
    return
  }

  if (Array.isArray(sidebar)) {
    for (const item of sidebar) {
      if (!isPlainObject(item)) continue

      const itemPrefix = resolveScope(prefix, String(item[prefixKey] ?? ''))
      const children: unknown = (item as Record<string, unknown>)[childrenKey]

      if (children === 'structure') scopes.add(itemPrefix)
      else if (Array.isArray(children))
        collectScopes(children, itemPrefix, scopes, { childrenKey, prefixKey })
    }

    return
  }

  if (isPlainObject(sidebar)) {
    for (const [key, value] of Object.entries(sidebar)) {
      if (value === 'structure') {
        scopes.add(resolveScope(prefix, key))
      } else if (Array.isArray(value)) {
        collectScopes(value, resolveScope(prefix, key), scopes, {
          childrenKey,
          prefixKey,
        })
      }
    }
  }
}

/**
 * Get the route scopes whose sidebar should be generated from the file
 * structure
 *
 * The theme data is resolved like the client does: the root options are merged
 * with the matching locale options.
 *
 * 获取需要根据文件结构生成侧边栏的路由范围
 *
 * 主题数据会像客户端一样解析：根配置与匹配的多语言配置合并。
 *
 * @param options - Options of the function / 函数的选项
 * @returns The normalized route scopes, e.g. `['/', '/guide/']` / 规范化后的路由范围，例如
 *   `['/', '/guide/']`
 */
export const getSidebarStructureScopes = ({
  themeData,
  childrenKey,
  prefixKey,
}: SidebarStructureScopesOptions): string[] => {
  const { locales, ...rootData } = themeData as {
    sidebar?: unknown
    locales?: Record<string, { sidebar?: unknown } | undefined>
  }
  const scopes = new Set<string>()
  const localeDataMap = new Map<string, { sidebar?: unknown } | undefined>()

  for (const [path, data] of Object.entries(locales ?? {}))
    localeDataMap.set(normalizeScope(path), data)

  const localePaths = new Set<string>(['/', ...localeDataMap.keys()])

  for (const localePath of localePaths) {
    const localeData = localeDataMap.get(localePath)
    const sidebar = localeData?.sidebar ?? rootData.sidebar

    collectScopes(sidebar, localePath, scopes, { childrenKey, prefixKey })
  }

  return [...scopes]
}

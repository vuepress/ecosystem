// oxlint-disable typescript/no-deprecated -- the classic theme syntax is supported here
import type {
  NavItem,
  NavItemWithChildren,
  NavItemWithLink,
  NavbarGroupOptions,
  NavbarItemOptions,
  NavbarOptions,
  Sidebar,
  SidebarArray,
  SidebarArrayOptions,
  SidebarItem,
  SidebarItemOptions,
  SidebarOptions,
  SidebarStructureItem,
} from '../shared/types.js'

type SidebarItemInput = SidebarItemOptions | SidebarStructureItem | string

type NavbarItemInput = NavbarItemOptions

/**
 * Normalize a sidebar item written in the classic theme syntax
 *
 * 归一化使用 classic 主题写法编写的侧边栏条目
 *
 * @param item - The sidebar item to normalize / 需要归一化的侧边栏条目
 * @returns The normalized sidebar item / 归一化后的侧边栏条目
 */
const normalizeSidebarItem = (item: SidebarItemInput): SidebarArray[number] => {
  if (typeof item === 'string') return { link: item }

  if ((item as SidebarStructureItem).items === 'structure') {
    const {
      collapsed: _collapsed,
      children: _children,
      prefix,
      ...rest
    } = item as SidebarItemOptions & { collapsed?: boolean }

    return {
      ...rest,
      ...(prefix && rest.base == null ? { base: prefix } : {}),
      items: 'structure',
    }
  }

  const {
    children,
    collapsed: _collapsed,
    items,
    prefix,
    ...rest
  } = item as SidebarItemOptions & { collapsed?: boolean }

  const normalizedItems = items ?? children

  return {
    ...rest,
    ...(prefix && rest.base == null ? { base: prefix } : {}),
    ...(normalizedItems
      ? {
          items: Array.isArray(normalizedItems)
            ? normalizedItems.map((child) => normalizeSidebarItem(child))
            : 'structure',
        }
      : {}),
  } as SidebarItem
}

/**
 * Normalize the sidebar config written in the classic theme syntax
 *
 * Supports string items, the deprecated `children` and `prefix` keys, and
 * `false` in the multi-sidebar config.
 *
 * 归一化使用 classic 主题写法编写的侧边栏配置
 *
 * 支持字符串条目、已废弃的 `children` 与 `prefix` 键，以及多侧边栏配置中的 `false`。
 *
 * @param sidebar - The sidebar config to normalize / 需要归一化的侧边栏配置
 * @returns The normalized sidebar config / 归一化后的侧边栏配置
 */
export const normalizeSidebar = (
  sidebar: SidebarOptions | undefined,
): Sidebar | false | undefined => {
  if (sidebar == null || sidebar === false) return sidebar
  if (typeof sidebar === 'string')
    return sidebar === 'structure' ? sidebar : undefined

  if (Array.isArray(sidebar))
    return sidebar.map((item) => normalizeSidebarItem(item))

  return Object.fromEntries(
    Object.entries(sidebar).map(([scope, value]) => {
      if (typeof value === 'string')
        // the removed `heading` mode and any other unknown mode disable the
        // sidebar of the scope instead of crashing the build
        return [scope, value === 'structure' ? value : []]

      if (value === false) return [scope, value]

      if (Array.isArray(value))
        return [scope, value.map((item) => normalizeSidebarItem(item))]

      const { items } = value as {
        items?: SidebarArrayOptions | 'structure'
      }

      return [
        scope,
        {
          ...value,
          items: Array.isArray(items)
            ? items.map((item) => normalizeSidebarItem(item))
            : // tolerate the removed modes, `{ items: 'structure' }` included
              'structure',
        },
      ]
    }),
  ) as Sidebar
}

/**
 * Normalize a navbar item written in the classic theme syntax
 *
 * 归一化使用 classic 主题写法编写的导航栏条目
 *
 * @param item - The navbar item to normalize / 需要归一化的导航栏条目
 * @returns The normalized navbar item / 归一化后的导航栏条目
 */
const normalizeNavbarItem = (item: NavbarItemInput): NavItem => {
  if (typeof item === 'string') return { link: item }
  if ('component' in item) return item

  const { children, prefix, items, ...rest } = item as NavbarGroupOptions & {
    base?: string
  }

  const normalizedItems = items ?? children

  if (!normalizedItems) {
    const { base: _base, ...linkItem } = rest as NavItemWithLink & {
      base?: string
    }

    return linkItem
  }

  return {
    ...(rest as NavItemWithChildren),
    ...(prefix && rest.base == null ? { base: prefix } : {}),
    items: normalizedItems.map((child) => normalizeNavbarItem(child)),
  }
}

/**
 * Normalize the navbar config written in the classic theme syntax
 *
 * Supports string items, the deprecated `children` and `prefix` keys, and
 * `false` to hide the navbar.
 *
 * 归一化使用 classic 主题写法编写的导航栏配置
 *
 * 支持字符串条目、已废弃的 `children` 与 `prefix` 键，以及设为 `false` 隐藏导航栏。
 *
 * @param navbar - The navbar config to normalize / 需要归一化的导航栏配置
 * @returns The normalized navbar config / 归一化后的导航栏配置
 */
export const normalizeNavbar = (
  navbar: NavbarOptions | undefined,
): NavItem[] | false | undefined => {
  if (navbar == null || navbar === false) return navbar

  return navbar.map((item) => normalizeNavbarItem(item))
}

/**
 * Normalize the theme config written in the classic theme syntax
 *
 * 归一化使用 classic 主题写法编写的主题配置
 *
 * @param config - The theme config / 主题配置
 * @returns The normalized theme config / 归一化后的主题配置
 */
export const normalizeThemeConfig = <
  T extends {
    navbar?: NavbarOptions
    sidebar?: SidebarOptions
  },
>(
  config: T,
): Omit<T, 'navbar' | 'sidebar'> & {
  navbar?: NavItem[] | false
  sidebar?: Sidebar | false
} => {
  const { navbar, sidebar, ...rest } = config

  return {
    ...rest,
    ...(navbar === undefined ? {} : { navbar: normalizeNavbar(navbar) }),
    ...(sidebar === undefined ? {} : { sidebar: normalizeSidebar(sidebar) }),
  }
}

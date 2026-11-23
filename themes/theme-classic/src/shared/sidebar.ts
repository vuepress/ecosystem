import type { AutoLinkOptions, NavItemOptions } from './nav.js'

// types for SidebarItem
export type SidebarLinkOptions = AutoLinkOptions

export interface SidebarGroupOptions extends NavItemOptions {
  /** Link prefix of current group */
  prefix?: string

  /** Link of current group */
  link?: string

  /**
   * Whether current group is collapsible
   *
   * @default false
   */
  collapsible?: boolean

  /** Children of current group */
  children: SidebarItemOptions[]
}

export type SidebarItemOptions =
  | SidebarGroupOptions
  | SidebarLinkOptions
  | string

/**
 * A sidebar group whose children are generated from the file structure
 *
 * 子项由文件结构生成的侧边栏分组
 */
export interface SidebarStructureOptions extends Omit<
  SidebarGroupOptions,
  'children'
> {
  /**
   * Generate the children from the file structure of the group scope
   *
   * 根据分组范围的文件结构生成子项
   */
  children: 'structure'
}

export type SidebarArrayOptions = (
  | SidebarItemOptions
  | SidebarStructureOptions
)[]

export type SidebarObjectOptions = Record<
  string,
  SidebarArrayOptions | 'heading' | 'structure' | false
>

export type SidebarOptions =
  | SidebarArrayOptions
  | SidebarObjectOptions
  | 'heading'
  | 'structure'

// the utils are imported lazily and from their subpath, as the entry point of
// the package also loads the icon loader, which is not needed here
import type { IconifyJSON } from '@iconify/types'
import { isLinkAbsolute, isLinkHttp } from '@vuepress/helper'
import { fs } from 'vuepress/utils'

import { isModuleInstalled, resolveModule } from './utils.js'

/**
 * Package that provides the Iconify web component
 *
 * 提供 Iconify Web 组件的包
 */
export const ICONIFY_ICON = 'iconify-icon'

/** Icon set reduced to the icons in use */
export type PrunedIconifySet = IconifyJSON

/**
 * Result of parsing an icon written in markdown syntax
 *
 * Markdown 语法中图标的解析结果
 */
export type IconifyIconParseResult =
  /** Icon with an icon set / 带图标集的图标 */
  | {
      type: 'icon'
      /** Icon name / 图标名称 */
      name: string
      /** Icon set prefix / 图标集前缀 */
      prefix: string
    }
  /**
   * Image icons, which are rendered as `<img>`
   *
   * 图片图标，渲染为 `<img>`
   */
  | { type: 'image' }
  /**
   * Icons without an icon set, which the `prefix` option does not provide
   *
   * 没有图标集的图标，`prefix` 选项也没有提供
   */
  | { type: 'unresolved' }

/**
 * Get the name of the package that provides an Iconify icon set
 *
 * 获取提供 Iconify 图标集的包名
 *
 * @param prefix - Icon set prefix / 图标集前缀
 * @returns Package name / 包名
 */
export const getIconifySetPackage = (prefix: string): string =>
  `@iconify-json/${prefix}`

/**
 * Whether the Iconify web component is installed
 *
 * Iconify Web 组件是否已安装
 *
 * @returns Whether the package is available / 包是否可用
 */
export const isIconifyInstalled = (): boolean =>
  isModuleInstalled(`${ICONIFY_ICON}/package.json`)

/**
 * Whether the package providing an Iconify icon set is installed
 *
 * 提供 Iconify 图标集的包是否已安装
 *
 * @param prefix - Icon set prefix / 图标集前缀
 * @returns Whether the package is available / 包是否可用
 */
export const isIconifySetInstalled = (prefix: string): boolean =>
  isModuleInstalled(`${getIconifySetPackage(prefix)}/package.json`)

/**
 * Parse an icon written in markdown syntax
 *
 * 解析 Markdown 语法中的图标
 *
 * The prefix may be omitted, in which case the default prefix is used.
 *
 * 前缀可以省略，此时会使用默认前缀。
 *
 * @param icon - Icon in markdown syntax / Markdown 语法中的图标
 * @param defaultPrefix - Prefix of the `prefix` option, used when the icon does
 *   not have one / `prefix` 选项的前缀，在图标没有前缀时使用
 * @returns Parse result / 解析结果
 */
export const parseIconifyIcon = (
  icon: string,
  defaultPrefix?: string,
): IconifyIconParseResult => {
  const spec = icon.trim()

  // image icons are rendered as `<img>`
  if (isLinkHttp(spec) || isLinkAbsolute(spec)) return { type: 'image' }

  const [prefix, name] = spec.includes(':') ? spec.split(':', 2) : ['', spec]

  if (!name || !(prefix || defaultPrefix)) return { type: 'unresolved' }

  return { type: 'icon', name, prefix: prefix || defaultPrefix! }
}

/**
 * Get the icons of an icon set that are used by the site
 *
 * 获取站点使用的某个图标集中的图标
 *
 * An icon set package contains every icon of the set, so it is reduced to the
 * icons in use, which also resolves the aliases and the parents of an icon.
 *
 * 图标集包包含该集合的全部图标，因此会将其裁剪为使用中的图标，同时会解析图标的别名 与父图标。
 *
 * @param prefix - Icon set prefix / 图标集前缀
 * @param names - Icon names in use / 使用中的图标名称
 * @returns Icons in use and the names that the icon set does not provide / 使用中的
 *   图标与图标集未提供的名称
 */
export const getUsedIconSet = async (
  prefix: string,
  names: string[],
): Promise<{ notFound: string[]; set: PrunedIconifySet | null }> => {
  const [{ getIcons }, { minifyIconSet }] = await Promise.all([
    import('@iconify/utils/lib/icon-set/get-icons.js'),
    import('@iconify/utils/lib/icon-set/minify.js'),
  ])
  const set = JSON.parse(
    fs.readFileSync(
      resolveModule(`${getIconifySetPackage(prefix)}/icons.json`),
      'utf-8',
    ),
  ) as IconifyJSON
  const result = getIcons(set, names, true)

  // the icon set does not provide any of the icons
  if (!result) return { notFound: names, set: null }

  const notFound = result.not_found ?? []

  minifyIconSet(result)

  // nothing to register when none of the icons is provided
  return {
    notFound,
    set: Object.keys(result.icons).length > 0 ? result : null,
  }
}

/**
 * Get the code registering the Iconify icons locally
 *
 * 获取本地注册 Iconify 图标的代码
 *
 * @param sets - Icon sets in use / 使用中的图标集
 * @param dev - Whether the dev server is running, where the Iconify API is
 *   blocked so that the icons missing from the bundle are visible / 是否运行在开发
 *   服务器中，此时会拦截 Iconify API，以便发现未被打包的图标
 * @param resolver - Resolver of a module path, which makes the import resolve
 *   from the plugin instead of from the site / 模块路径的解析函数，它会让导入从插件 而非站点解析
 * @returns Code of the generated entry / 生成入口的代码
 */
export const getIconifyOfflineCode = (
  sets: PrunedIconifySet[],
  dev: boolean,
  resolver: (module: string) => string,
): string => {
  const registrations = [...sets]
    .sort((a, b) => a.prefix.localeCompare(b.prefix))
    .map((set) => `  addCollection(${JSON.stringify(set)});`)
    .join('\n')

  return `\
import { ${dev ? '_api, ' : ''}addCollection } from "${resolver(ICONIFY_ICON)}";

export const setupIconify = () => {
${registrations}
${
  dev
    ? `\
  // The Iconify API is blocked in dev, so that an icon missing from the bundle
  // shows up as empty instead of being loaded from the API. The API is reached
  // through the internal _api object, as it is the only way to block it.
  try {
    const reportedIcons = new Set();

    _api?.setFetch?.((url) => {
      // the API hosts are queried one after another, the icon is only reported
      // once
      const icons = new URL(url, "http://localhost").searchParams.get("icons");

      if (icons && !reportedIcons.has(icons)) {
        reportedIcons.add(icons);
        console.warn(
          \`\${icons} is not bundled by the offline mode, the icon renders as empty\`
        );
      }

      return Promise.reject(new Error("The Iconify API is blocked by the offline mode"));
    });
  } catch {
    // a failure to block the API must not break the dev server
  }
`
    : ''
}\
};
`
}

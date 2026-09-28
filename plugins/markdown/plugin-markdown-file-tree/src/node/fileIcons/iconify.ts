import type { IconifyJSON } from '@iconify/types'
import {
  cheerio,
  getModulePath,
  isModuleAvailable,
  Logger,
} from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { fs } from 'vuepress/utils'

import { PLUGIN_NAME } from '../constants.js'
import { defaultFile } from './generated/defaults.js'

const logger = new Logger(PLUGIN_NAME)

/**
 * Package that provides the Iconify web component
 *
 * 提供 Iconify Web 组件的包
 */
export const ICONIFY_ICON = 'iconify-icon'

/**
 * Icon set that provides the icons of the files and the folders
 *
 * 提供文件与文件夹图标的图标集
 */
export const FILE_ICON_SET = defaultFile.slice(0, defaultFile.indexOf(':'))

/**
 * Package that provides {@link FILE_ICON_SET}
 *
 * 提供 {@link FILE_ICON_SET} 的包
 */
export const FILE_ICON_SET_PACKAGE = `@iconify-json/${FILE_ICON_SET}`

/**
 * Prefix of the icons of {@link FILE_ICON_SET}
 *
 * {@link FILE_ICON_SET} 图标的前缀
 */
const PREFIX = `${FILE_ICON_SET}:`

/**
 * Selector of the rendered nodes that carry an icon
 *
 * The tag names are lowercased when the content is parsed as HTML, so the
 * kebab-case form of the component is matched as well.
 *
 * 渲染结果中带有图标的节点的选择器
 *
 * 内容按 HTML 解析时标签名会转为小写，因此也会匹配组件的短横线形式。
 */
const ICON_NODE_SELECTOR = [
  'vpfiletreenode[icon]',
  'vp-file-tree-node[icon]',
].join(', ')

/**
 * Whether the file icons can be rendered
 *
 * The icons are an optional enhancement: they need the Iconify web component
 * and the icon set package, and the built-in icons are rendered when either of
 * them is missing.
 *
 * 是否可以渲染文件图标
 *
 * 图标是可选增强：它需要 Iconify Web 组件与图标集包，任意一个缺失时都会渲染内置图标。
 *
 * @returns Whether the enhancement is available / 增强是否可用
 */
export const isFileIconEnhancementAvailable = (): boolean =>
  isModuleAvailable(`${ICONIFY_ICON}/package.json`, import.meta) &&
  isModuleAvailable(`${FILE_ICON_SET_PACKAGE}/package.json`, import.meta)

/**
 * Get the file icons used by the site
 *
 * The icons are read from the rendered content, so that only the icons that are
 * actually displayed are bundled.
 *
 * 获取站点使用的文件图标
 *
 * 图标从渲染结果中读取，因此只会打包实际展示的图标。
 *
 * @param app - VuePress app / VuePress 应用
 * @returns Icons in use / 使用中的图标
 */
export const getUsedFileIcons = (app: App): string[] => {
  const icons = new Set<string>()

  for (const { contentRendered } of app.pages) {
    if (!contentRendered) continue

    const $nodes = cheerio(cheerio.parseHTML(contentRendered))
      // oxlint-disable-next-line unicorn/no-array-callback-reference -- cheerio takes a selector, not a callback
      .find(ICON_NODE_SELECTOR)
      .addBack(ICON_NODE_SELECTOR)

    $nodes.each((index) => {
      const icon = $nodes.eq(index).attr('icon')

      if (icon) icons.add(icon)
    })
  }

  return [...icons]
}

/**
 * Reduce an Iconify icon set to the icons in use
 *
 * An icon set package contains every icon of the collection, so it is reduced
 * to the icons in use, which also resolves the aliases of an icon.
 *
 * 将 Iconify 图标集裁剪为使用中的图标
 *
 * 图标集包包含该集合的全部图标，因此会将其裁剪为使用中的图标，同时会解析图标的别名。
 *
 * @param names - Icon names in use / 使用中的图标名称
 * @returns Icons in use and the names that the icon set does not provide / 使用中的
 *   图标与图标集未提供的名称
 */
const reduceIconSet = async (
  names: string[],
): Promise<{ notFound: string[]; set: IconifyJSON | null }> => {
  const [{ getIcons }, { minifyIconSet }] = await Promise.all([
    import('@iconify/utils/lib/icon-set/get-icons.js'),
    import('@iconify/utils/lib/icon-set/minify.js'),
  ])
  const set = JSON.parse(
    fs.readFileSync(
      getModulePath(`${FILE_ICON_SET_PACKAGE}/icons.json`, import.meta),
      'utf-8',
    ),
  ) as IconifyJSON
  const result = getIcons(set, names, true)

  // the icon set does not provide any of the icons
  if (!result) return { notFound: names, set: null }

  const notFound = result.not_found ?? []

  minifyIconSet(result)

  return {
    notFound,
    set: Object.keys(result.icons).length > 0 ? result : null,
  }
}

/**
 * Get the code registering the file icons locally
 *
 * 获取本地注册文件图标的代码
 *
 * @param set - Icon set reduced to the icons in use, `null` when there is none
 *   / 裁剪为使用中图标的图标集，没有时返回 `null`
 * @returns Code of the generated entry / 生成入口的代码
 */
const getFileIconCode = (set: IconifyJSON | null): string => `\
import { addCollection } from "${getModulePath(ICONIFY_ICON, import.meta)}";

export const setupFileIcons = () => {
${
  set
    ? `  addCollection(${JSON.stringify(set)});`
    : '  // no file icon is displayed by the site'
}
};
`

/**
 * Generate the entry that registers the file icons locally
 *
 * The icon set is reduced to the icons displayed by the site, which are
 * registered in the client, so that the icons render without the Iconify API.
 *
 * 生成本地注册文件图标的入口
 *
 * 图标集会裁剪为站点展示的图标并在客户端注册，因此图标无需 Iconify API 即可渲染。
 *
 * @param app - VuePress app / VuePress 应用
 * @returns Path of the generated entry / 生成入口的路径
 */
export const prepareFileIconEntry = async (app: App): Promise<string> => {
  const icons = getUsedFileIcons(app)
  // The icon set is looked up by the bare icon names
  const names = icons
    .filter((icon) => icon.startsWith(PREFIX))
    .map((icon) => icon.slice(PREFIX.length))
  const { notFound, set } =
    names.length > 0 ? await reduceIconSet(names) : { notFound: [], set: null }

  if (notFound.length > 0) {
    logger.warn(
      `The following icons are not provided by ${FILE_ICON_SET_PACKAGE}, they are skipped: ${notFound.join(', ')}`,
    )
  }

  return app.writeTemp('markdown-file-tree/iconify.js', getFileIconCode(set))
}

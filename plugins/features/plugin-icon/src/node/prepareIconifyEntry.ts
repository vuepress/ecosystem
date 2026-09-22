import type { App } from 'vuepress/core'

import {
  getIconifyOfflineCode,
  getIconifySetPackage,
  getUsedIconSet,
  ICONIFY_ICON,
  isIconifyInstalled,
  isIconifySetInstalled,
  parseIconifyIcon,
} from './getIconifyOffline.js'
import { getScannedIcons } from './getScannedIcons.js'
import { getUsedIcons } from './getUsedIcons.js'
import type { IconPluginOptions } from './options.js'
import { logger } from './utils.js'

/**
 * Generate the Iconify entry, which registers the icons used by the site
 *
 * 生成 Iconify 入口，注册站点使用的图标
 *
 * The icon sets in use are reduced to the icons in use, which are registered in
 * the client, so that the icons render without the Iconify API.
 *
 * 使用中的图标集会裁剪为使用中的图标并在客户端注册，因此图标无需 Iconify API 即可 渲染。
 *
 * @param app - VuePress app / VuePress 应用
 * @param options - Plugin options / 插件选项
 * @returns Path of the generated entry / 生成入口的路径
 */
export const prepareIconifyEntry = async (
  app: App,
  { component = 'VPIcon', prefix, scan }: IconPluginOptions,
): Promise<string> => {
  const defaultPrefix = prefix?.replace(/:+$/u, '')

  if (!isIconifyInstalled()) {
    throw new Error(
      `${ICONIFY_ICON} is required by the offline mode, please install it manually!`,
    )
  }

  const icons = [
    ...getUsedIcons(app, component),
    ...(await getScannedIcons(app, scan)),
  ]
  const sets = new Map<string, Set<string>>()
  const unresolvedIcons = new Set<string>()

  for (const icon of icons) {
    const result = parseIconifyIcon(icon, defaultPrefix)

    // image icons never use Iconify
    if (result.type === 'image') continue

    if (result.type === 'unresolved') {
      unresolvedIcons.add(icon)
      continue
    }

    const names = sets.get(result.prefix) ?? new Set<string>()

    names.add(result.name)
    sets.set(result.prefix, names)
  }

  if (unresolvedIcons.size > 0) {
    logger.warn(
      `The following icons do not have an icon set and are skipped, set the \`prefix\` option or write the prefix in the icon: ${[
        ...unresolvedIcons,
      ].join(', ')}`,
    )
  }

  if (sets.size === 0)
    logger.warn('No Iconify icon is detected, nothing is bundled locally.')

  // an icon set package is required for every set in use
  const missingPackages = [...sets.keys()]
    .sort()
    .filter((iconPrefix) => !isIconifySetInstalled(iconPrefix))
    .map((iconPrefix) => getIconifySetPackage(iconPrefix))

  // the entry would not resolve, so the build is stopped right away
  if (missingPackages.length > 0) {
    throw new Error(
      `${missingPackages.join(', ')} ${
        missingPackages.length > 1 ? 'are' : 'is'
      } required by the offline mode, please install ${
        missingPackages.length > 1 ? 'them' : 'it'
      } manually! The icon set prefix must be lowercase and match the one on https://icon-sets.iconify.design/.`,
    )
  }

  const results = await Promise.all(
    [...sets]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(async ([iconPrefix, names]) => {
        const { notFound, set } = await getUsedIconSet(
          iconPrefix,
          [...names].sort(),
        )

        return { iconPrefix, notFound, set }
      }),
  )
  const usedSets = results.flatMap(({ set }) => (set ? [set] : []))
  const unknownIcons = new Set(
    results.flatMap(({ iconPrefix, notFound }) =>
      notFound.map((name) => `${iconPrefix}:${name}`),
    ),
  )

  if (unknownIcons.size > 0) {
    logger.warn(
      `The following icons are not provided by their icon set, they are skipped: ${[
        ...unknownIcons,
      ].join(', ')}`,
    )
  }

  return app.writeTemp(
    'icon/iconify.js',
    getIconifyOfflineCode(usedSets, app.env.isDev),
  )
}

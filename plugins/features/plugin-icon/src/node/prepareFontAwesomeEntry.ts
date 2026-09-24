import type { App } from 'vuepress/core'

import type { FontAwesomeIcons } from './getFontAwesomeOffline.js'
import {
  FONTAWESOME_CORE,
  FONTAWESOME_STYLES,
  getFontAwesomeOfflineCode,
  getFontAwesomeStylePackage,
  isFontAwesomeIconAvailable,
  isFontAwesomeInstalled,
  isFontAwesomeStyleInstalled,
} from './getFontAwesomeOffline.js'
import { getScannedIcons } from './getScannedIcons.js'
import { getUsedIcons } from './getUsedIcons.js'
import type { FontAwesomeStyle, IconPluginOptions } from './options.js'
import { parseFontAwesomeIcon } from './parseFontAwesomeIcon.js'
import { logger, resolveModule } from './utils.js'

/**
 * Generate the FontAwesome entry, which registers the icons used by the site
 *
 * 生成 FontAwesome 入口，注册站点使用的图标
 *
 * @param app - VuePress app / VuePress 应用
 * @param options - Plugin options / 插件选项
 * @param all - Whether every free icon is bundled / 是否打包全部免费图标
 * @returns Path of the generated entry / 生成入口的路径
 */
export const prepareFontAwesomeEntry = async (
  app: App,
  { component = 'VPIcon', scan }: IconPluginOptions,
  all: boolean,
): Promise<string> => {
  const names: Record<FontAwesomeStyle, Set<string>> = {
    brands: new Set(),
    regular: new Set(),
    solid: new Set(),
  }
  const icons = all
    ? []
    : [
        ...getUsedIcons(app, component),
        ...(await getScannedIcons(app, scan)),
      ].flatMap((icon) => {
        const result = parseFontAwesomeIcon(icon)

        // image icons never use FontAwesome
        if (result.type === 'image' || result.type === 'empty') return []

        if (result.type === 'unsupported')
          return [{ icon, parsed: null, unsupported: true }]

        // an icon may contain extra classes in any order, the icon name is
        // the candidate that the style package provides
        const name = result.candidates.find((candidate) =>
          isFontAwesomeIconAvailable(result.style, candidate),
        )

        return [
          {
            icon,
            parsed: name ? { name, style: result.style } : null,
            unsupported: false,
          },
        ]
      })

  // a style package is only required when it provides an icon, while `"all"`
  // bundles every free style as a whole
  const requiredStyles = new Set(
    all
      ? FONTAWESOME_STYLES
      : icons.flatMap(({ parsed }) => (parsed ? [parsed.style] : [])),
  )
  const missingPackages = [
    ...(isFontAwesomeInstalled() ? [] : [FONTAWESOME_CORE]),
    ...[...requiredStyles]
      .filter((style) => !isFontAwesomeStyleInstalled(style))
      .map((style) => getFontAwesomeStylePackage(style)),
  ]

  // the entry would not resolve, so the build is stopped right away
  if (missingPackages.length > 0) {
    throw new Error(
      `${missingPackages.join(', ')} ${
        missingPackages.length > 1 ? 'are' : 'is'
      } required by the offline mode, please install ${
        missingPackages.length > 1 ? 'them' : 'it'
      } manually!`,
    )
  }

  const skippedIcons = new Set<string>()
  const unsupportedIcons = new Set<string>()

  for (const { icon, parsed, unsupported } of icons) {
    if (!parsed) {
      // icons of other icon libraries and of the pro styles never render with
      // the offline mode, while unknown names are probably typos
      ;(unsupported ? unsupportedIcons : skippedIcons).add(icon)
      continue
    }

    names[parsed.style].add(parsed.name)
  }

  if (unsupportedIcons.size > 0) {
    logger.warn(
      `The offline mode only supports the FontAwesome free icons, the following icons are skipped: ${[
        ...unsupportedIcons,
      ].join(', ')}`,
    )
  }

  if (skippedIcons.size > 0) {
    logger.warn(
      `The following icons are not provided by FontAwesome, they are skipped: ${[
        ...skippedIcons,
      ].join(', ')}`,
    )
  }

  const bundledIcons: FontAwesomeIcons = {}

  for (const style of FONTAWESOME_STYLES)
    if (names[style].size > 0) bundledIcons[style] = [...names[style]].sort()

  return app.writeTemp(
    'icon/fontawesome.js',
    getFontAwesomeOfflineCode(all ? true : bundledIcons, resolveModule),
  )
}

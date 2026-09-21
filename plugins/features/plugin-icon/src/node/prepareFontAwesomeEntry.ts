import { isArray, isFunction, isString } from '@vuepress/helper'
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
import { getUsedFontAwesomeIcons } from './getUsedFontAwesomeIcons.js'
import type {
  FontAwesomeScanner,
  FontAwesomeStyle,
  IconPluginOptions,
} from './options.js'
import { parseFontAwesomeIcon } from './parseFontAwesomeIcon.js'
import { logger } from './utils.js'

/**
 * Get the icons found by a custom scanner
 *
 * 获取自定义扫描器找到的图标
 *
 * @param app - VuePress app / VuePress 应用
 * @param scanner - Custom scanner / 自定义扫描器
 * @returns Icons to bundle / 需要打包的图标
 */
const getScannedIcons = async (
  app: App,
  scanner: FontAwesomeScanner,
): Promise<string[]> => {
  const icons = await scanner(app)

  if (isArray(icons)) return icons.filter((icon) => isString(icon))

  logger.warn(
    'The scanner of the `fontawesome` option must return an array of icons.',
  )

  return []
}

/**
 * Generate the FontAwesome entry, which registers the icons used by the site
 *
 * 生成 FontAwesome 入口，注册站点使用的图标
 *
 * The entry is generated when the app is prepared, so that every page is
 * already rendered, the icons of the site are detected from the rendered
 * content, icons that cannot be detected must be returned by a scanner.
 *
 * 入口在应用准备完成后生成，此时每个页面都已渲染，站点的图标会从渲染后的内容中 检测，无法检测到的图标需要由扫描器返回。
 *
 * @param app - VuePress app / VuePress 应用
 * @param options - Plugin options / 插件选项
 * @returns Path of the generated entry / 生成入口的路径
 */
export const prepareFontAwesomeEntry = async (
  app: App,
  { component = 'VPIcon', fontawesome }: IconPluginOptions,
): Promise<string> => {
  const names: Record<FontAwesomeStyle, Set<string>> = {
    brands: new Set(),
    regular: new Set(),
    solid: new Set(),
  }
  const icons =
    fontawesome === 'all'
      ? []
      : [
          ...getUsedFontAwesomeIcons(app, component),
          ...(isFunction(fontawesome)
            ? await getScannedIcons(app, fontawesome)
            : []),
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
    fontawesome === 'all'
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
    getFontAwesomeOfflineCode(fontawesome === 'all' ? true : bundledIcons),
  )
}

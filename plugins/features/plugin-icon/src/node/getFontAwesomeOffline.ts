import { isArray } from '@vuepress/helper'

import type { FontAwesomeOffline, FontAwesomeStyle } from './options.js'

/** Packages that provide each FontAwesome style */
const STYLE_PACKAGES: Record<FontAwesomeStyle, string> = {
  brands: '@fortawesome/free-brands-svg-icons',
  regular: '@fortawesome/free-regular-svg-icons',
  solid: '@fortawesome/free-solid-svg-icons',
}

/** Exported bundle of every icon of a FontAwesome style */
const STYLE_BUNDLES: Record<FontAwesomeStyle, string> = {
  brands: 'fab',
  regular: 'far',
  solid: 'fas',
}

/** FontAwesome core package */
export const FONTAWESOME_CORE = '@fortawesome/fontawesome-svg-core'

/**
 * Convert an icon name to its exported name
 *
 * 将图标名称转换为导出名
 *
 * @example
 *   getIconExportName('arrow-left') // 'faArrowLeft'
 *
 * @param name - Icon name in kebab-case / 短横线命名的图标名称
 * @returns Exported name / 导出名
 */
export const getIconExportName = (name: string): string =>
  `fa${name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')}`

const getUsedStyles = (
  options: boolean | FontAwesomeOffline,
): FontAwesomeStyle[] =>
  options === true
    ? (Object.keys(STYLE_PACKAGES) as FontAwesomeStyle[])
    : (Object.keys(options) as FontAwesomeStyle[])

/**
 * Get FontAwesome packages required by the offline mode
 *
 * 获取离线模式所需的 FontAwesome 包
 *
 * @param options - FontAwesome offline options / FontAwesome 离线选项
 * @returns Package names / 包名
 */
export const getFontAwesomePackages = (
  options?: boolean | FontAwesomeOffline,
): string[] => {
  if (!options) return []

  return [
    FONTAWESOME_CORE,
    ...getUsedStyles(options).map((style) => STYLE_PACKAGES[style]),
  ]
}

/**
 * Get client config code registering FontAwesome icons locally
 *
 * 获取本地注册 FontAwesome 图标的客户端配置代码
 *
 * @param options - FontAwesome offline options / FontAwesome 离线选项
 * @returns Client config code / 客户端配置代码
 */
export const getFontAwesomeOfflineCode = (
  options: boolean | FontAwesomeOffline,
): string => {
  const imports: string[] = []
  const registered: string[] = []

  if (options === true) {
    for (const style of Object.keys(STYLE_PACKAGES) as FontAwesomeStyle[]) {
      imports.push(
        `import { ${STYLE_BUNDLES[style]} } from "${STYLE_PACKAGES[style]}";`,
      )
      registered.push(STYLE_BUNDLES[style])
    }
  } else {
    for (const [style, icons] of Object.entries(options) as [
      FontAwesomeStyle,
      string[] | undefined,
    ][]) {
      if (!isArray(icons)) continue

      for (const name of [...icons].sort((a, b) => a.localeCompare(b))) {
        const exportName = getIconExportName(name)

        imports.push(
          `import { ${exportName} } from "${STYLE_PACKAGES[style]}/${exportName}";`,
        )
        registered.push(exportName)
      }
    }
  }

  return `\
import { config, dom, library } from "${FONTAWESOME_CORE}";
${imports.join('\n')}

config.autoReplaceSvg = "nest";
library.add(${registered.join(', ')});

if (typeof window !== "undefined") dom.watch();
`
}

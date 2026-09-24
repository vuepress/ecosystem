import { fs } from 'vuepress/utils'

import type { FontAwesomeStyle } from './options.js'
import { isModuleInstalled, resolveModule } from './utils.js'

/**
 * FontAwesome styles, in the order of the generated imports
 *
 * FontAwesome 样式，与生成的导入顺序一致
 */
export const FONTAWESOME_STYLES: FontAwesomeStyle[] = [
  'brands',
  'regular',
  'solid',
]

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
 * FontAwesome icons to bundle locally, grouped by style
 *
 * 需要本地打包的 FontAwesome 图标，按样式分组
 */
export type FontAwesomeIcons = Partial<Record<FontAwesomeStyle, string[]>>

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

/**
 * Whether the FontAwesome core package is installed
 *
 * FontAwesome 核心包是否已安装
 *
 * @returns Whether the core package is available / 核心包是否可用
 */
export const isFontAwesomeInstalled = (): boolean =>
  isModuleInstalled(`${FONTAWESOME_CORE}/package.json`)

/**
 * Whether the package providing a FontAwesome style is installed
 *
 * 提供 FontAwesome 样式的包是否已安装
 *
 * @param style - Icon style / 图标样式
 * @returns Whether the package is available / 包是否可用
 */
export const isFontAwesomeStyleInstalled = (style: FontAwesomeStyle): boolean =>
  isModuleInstalled(`${STYLE_PACKAGES[style]}/package.json`)

/**
 * Whether an icon is provided by the FontAwesome style package
 *
 * 图标是否由 FontAwesome 样式包提供
 *
 * Icons of the FontAwesome pro styles and unknown icon names are not provided
 * by the free packages. The resolved file is checked, as the wildcard exports
 * of FontAwesome accept any subpath.
 *
 * FontAwesome 付费样式的图标与未知的图标名不由免费包提供。会检查解析出的文件，因为 FontAwesome 的通配导出会接受任意子路径。
 *
 * @param style - Icon style / 图标样式
 * @param name - Icon name in kebab-case / 短横线命名的图标名称
 * @returns Whether the icon is available / 图标是否可用
 */
export const isFontAwesomeIconAvailable = (
  style: FontAwesomeStyle,
  name: string,
): boolean => {
  try {
    return fs.pathExistsSync(
      resolveModule(`${STYLE_PACKAGES[style]}/${getIconExportName(name)}`),
    )
  } catch {
    return false
  }
}

/**
 * Get the name of the package providing a FontAwesome style
 *
 * 获取提供 FontAwesome 样式的包名
 *
 * @param style - Icon style / 图标样式
 * @returns Package name / 包名
 */
export const getFontAwesomeStylePackage = (style: FontAwesomeStyle): string =>
  STYLE_PACKAGES[style]

/**
 * Get FontAwesome packages required by the offline mode
 *
 * 获取离线模式所需的 FontAwesome 包
 *
 * @param enabled - Whether the offline mode is enabled / 是否启用离线模式
 * @returns Package names / 包名
 */
export const getFontAwesomePackages = (enabled?: boolean): string[] =>
  enabled
    ? [
        FONTAWESOME_CORE,
        ...FONTAWESOME_STYLES.map((style) => STYLE_PACKAGES[style]),
      ]
    : []

/**
 * Get the code registering FontAwesome icons locally
 *
 * 获取本地注册 FontAwesome 图标的代码
 *
 * @param icons - Icons to register, `true` registers every icon of the free
 *   styles / 需要注册的图标，`true` 会注册全部免费样式的图标
 * @param resolver - Resolver of a module path, which makes the imports resolve
 *   from the plugin instead of from the site / 模块路径的解析函数，它会让导入 从插件而非站点解析
 * @returns Code of the generated entry / 生成入口的代码
 */
export const getFontAwesomeOfflineCode = (
  icons: FontAwesomeIcons | true,
  resolver: (module: string) => string,
): string => {
  const imports: string[] = []
  const registered: string[] = []

  for (const style of FONTAWESOME_STYLES) {
    if (icons === true) {
      imports.push(
        `import { ${STYLE_BUNDLES[style]} } from "${resolver(
          STYLE_PACKAGES[style],
        )}";`,
      )
      registered.push(STYLE_BUNDLES[style])
      continue
    }

    for (const name of [...(icons[style] ?? [])].sort()) {
      const exportName = getIconExportName(name)

      imports.push(
        `import { ${exportName} } from "${resolver(
          `${STYLE_PACKAGES[style]}/${exportName}`,
        )}";`,
      )
      registered.push(exportName)
    }
  }

  return `\
import { config, dom, library } from "${resolver(FONTAWESOME_CORE)}";
${imports.join('\n')}

export const setupFontAwesome = () => {
  config.autoReplaceSvg = "nest";
  library.add(${registered.join(', ')});

  if (typeof window !== "undefined") dom.watch();
};
`
}

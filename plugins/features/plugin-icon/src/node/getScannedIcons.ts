import { isArray, isString } from '@vuepress/helper'
import type { App } from 'vuepress/core'

import {
  extractIconsFromComponents,
  parseComponentField,
} from './extractIconsFromComponents.js'
import type { ComponentField } from './extractIconsFromComponents.js'
import { extractIconsFromFields } from './extractIconsFromFields.js'
import type { IconScan } from './options.js'
import { logger } from './utils.js'

/**
 * Get the icons found by the scan
 *
 * 获取扫描找到的图标
 *
 * The front matter fields and the component props are scanned, and the scanner
 * is called for the icons that cannot be detected.
 *
 * 会扫描 front matter 字段与组件属性，并调用扫描器以获取无法被检测的图标。
 *
 * @param app - VuePress app / VuePress 应用
 * @param scan - Value of the `scan` option / `scan` 选项的值
 * @returns Icons to bundle / 需要打包的图标
 */
export const getScannedIcons = async (
  app: App,
  scan: IconScan = {},
): Promise<string[]> => {
  // the `icon` field of the front matter is scanned by default
  const { frontmatter = ['icon'], components, scanner } = scan
  const icons: string[] = []

  if (frontmatter.length > 0) {
    icons.push(
      ...app.pages.flatMap((page) =>
        extractIconsFromFields(page.frontmatter, frontmatter),
      ),
    )
  }

  if (components) {
    const componentFields = components
      .map((component) => parseComponentField(component))
      .filter((field): field is ComponentField => field != null)

    icons.push(...extractIconsFromComponents(app, componentFields))
  }

  if (scanner) {
    const scannedIcons = await scanner(app)

    if (isArray(scannedIcons))
      icons.push(...scannedIcons.filter((icon) => isString(icon)))
    else logger.warn('The `scan.scanner` option must return an array of icons.')
  }

  return icons
}

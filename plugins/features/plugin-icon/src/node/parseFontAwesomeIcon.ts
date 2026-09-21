import {
  appendFontawesomePrefix,
  FONTAWESOME_FAMILIES_AND_STYLES,
} from '@mdit/plugin-icon'
import { isLinkAbsolute, isLinkHttp } from '@vuepress/helper'

import type { FontAwesomeStyle } from './options.js'

/** Styles provided by the FontAwesome free packages */
const FAMILY_STYLES: Record<string, FontAwesomeStyle | undefined> = {
  'fab': 'brands',
  'fa-brands': 'brands',
  'far': 'regular',
  'fa-regular': 'regular',
  'fas': 'solid',
  'fa-solid': 'solid',
}

/**
 * Get the style of a FontAwesome family class
 *
 * 获取 FontAwesome 样式类的样式
 *
 * @param family - Family class, e.g. `fas` or `fa-solid` / 样式类，例如 `fas` 或
 *   `fa-solid`
 * @returns Style, `undefined` when the family is not a free style / 样式，当样式类
 *   不是免费样式时为 `undefined`
 */
const getStyle = (family: string): FontAwesomeStyle | undefined =>
  FAMILY_STYLES[
    family.length === 1 ? `fa${family}` : appendFontawesomePrefix(family)
  ]

/**
 * Result of parsing an icon written in markdown syntax
 *
 * Markdown 语法中图标的解析结果
 */
export type FontAwesomeIconParseResult =
  /**
   * Icon candidates and the style
   *
   * 图标名候选与样式
   */
  | {
      type: 'icon'
      /**
       * Candidates in kebab-case. An icon may contain the classes that
       * FontAwesome supports in any order, the icon name is the candidate that
       * the style package provides.
       *
       * 短横线命名的候选。图标中可以包含 FontAwesome 支持的类且顺序任意，由样式包 提供的那个候选才是图标名。
       */
      candidates: string[]
      /** Icon style / 图标样式 */
      style: FontAwesomeStyle
    }
  /**
   * Image icons, which are rendered as `<img>`
   *
   * 图片图标，渲染为 `<img>`
   */
  | { type: 'image' }
  /**
   * Icons without an icon name
   *
   * 没有图标名的图标
   */
  | { type: 'empty' }
  /**
   * Icons of other icon libraries and of the FontAwesome pro styles
   *
   * 其他图标库与 FontAwesome 付费样式的图标
   */
  | { type: 'unsupported' }

/**
 * Parse an icon written in markdown syntax
 *
 * 解析 Markdown 语法中的图标
 *
 * The style may be given before the icon name, e.g. `solid:house`, or as a
 * class, e.g. `fa-solid fa-house`, it falls back to `solid` when it is not
 * given. The classes that an icon may contain are collected as candidates as
 * well, as they may be written before the icon name.
 *
 * 样式可以写在图标名称之前，例如 `solid:house`，也可以作为类名给出，例如 `fa-solid fa-house`，未给出时样式回退为
 * `solid`。图标中包含的类也会作为候选收集， 因为它们可能写在图标名之前。
 *
 * @param icon - Icon in markdown syntax / Markdown 语法中的图标
 * @returns Parse result / 解析结果
 */
export const parseFontAwesomeIcon = (
  icon: string,
): FontAwesomeIconParseResult => {
  const spec = icon.trim()

  if (!spec) return { type: 'empty' }

  // image icons are rendered as `<img>`
  if (isLinkHttp(spec) || isLinkAbsolute(spec)) return { type: 'image' }

  const [family, ...rest] = spec.includes(':') ? spec.split(':', 2) : ['', spec]
  let style: FontAwesomeStyle | undefined

  if (family) {
    style = getStyle(family)

    // icons of the FontAwesome pro styles and of other icon libraries
    if (!style) return { type: 'unsupported' }
  }

  const candidates: string[] = []

  for (const token of rest.join(' ').split(' ')) {
    // `fa` is the prefix of the legacy syntax, e.g. `fa fa-house`
    if (!token || token === 'fa') continue

    const tokenStyle = getStyle(token)

    // the style may also be given as a class, e.g. `home fa-regular`
    if (tokenStyle) {
      style ??= tokenStyle
      continue
    }

    // families of the FontAwesome pro styles, e.g. `fad fa-house`
    if (FONTAWESOME_FAMILIES_AND_STYLES.includes(token))
      return { type: 'unsupported' }

    candidates.push(token.replace(/^fa-/u, ''))
  }

  return candidates.length > 0
    ? { type: 'icon', candidates, style: style ?? 'solid' }
    : { type: 'empty' }
}

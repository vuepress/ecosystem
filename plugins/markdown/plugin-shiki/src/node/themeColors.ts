import type {
  BundledLanguage,
  BundledTheme,
  HighlighterGeneric,
  ThemeRegistrationResolved,
} from 'shiki'

import type { ShikiPluginOptions } from './options.js'

/**
 * The base colors of the code blocks of a theme
 *
 * 主题中代码块的基础颜色
 */
export interface CodeThemeColors {
  /**
   * Background color of the code blocks, in the `rgb()` notation
   *
   * 代码块的背景颜色，使用 `rgb()` 表示法
   */
  bg: string
  /**
   * Base text color of the code blocks, in the `rgb()` notation
   *
   * The color is the foreground of the theme, adjusted when the theme itself
   * does not reach the minimum contrast against its own background.
   *
   * 代码块的基础文字颜色，使用 `rgb()` 表示法
   *
   * 该颜色为主题的前景颜色，当主题自身与其背景的对比度不足时会被调整。
   */
  text: string
  /**
   * Color of the line numbers, in the `rgb()` notation
   *
   * The color is muted from {@link CodeThemeColors.text}, but never below the
   * minimum contrast.
   *
   * 行号的颜色，使用 `rgb()` 表示法
   *
   * 该颜色由 {@link CodeThemeColors.text} 弱化而来，但不会低于最低对比度。
   */
  lineNumber: string
}

/** RGB channels / RGB 通道 */
type Rgb = [number, number, number]

/**
 * Convert an sRGB channel to the linear light intensity
 *
 * 将 sRGB 通道转换为线性光强度
 *
 * @param channel - A channel in `[0, 255]` / `[0, 255]` 范围内的通道
 * @returns The linear intensity / 线性强度
 */
const toLinear = (channel: number): number => {
  const value = channel / 255

  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

/**
 * Minimum contrast ratio of the base text of the code blocks
 *
 * The value is the WCAG AA requirement for normal text.
 *
 * 代码块基础文字的最低对比度
 *
 * 该值为 WCAG AA 对普通文字的要求。
 */
export const MIN_TEXT_CONTRAST = 4.5

/**
 * Alpha of the line numbers before the minimum contrast is applied
 *
 * 行号在应用最低对比度之前的 alpha
 */
const LINE_NUMBER_ALPHA = 0.67

/**
 * Parse a color into sRGB channels
 *
 * The hex notation with 3, 4, 6 or 8 digits and the `rgb()` / `rgba()`
 * notations are supported, which are the ones a resolved Shiki theme and the
 * theme styles of a site use.
 *
 * 将颜色解析为 sRGB 通道
 *
 * 支持 3、4、6 或 8 位的 hex 表示法以及 `rgb()` / `rgba()` 表示法，这些是解析后的 Shiki
 * 主题与站点主题样式所使用的形式。
 *
 * @param color - A color / 颜色
 * @returns The channels, or `null` when the color can not be parsed / 通道值，无法解析时
 *   返回 `null`
 */
export const parseColor = (color: string): Rgb | null => {
  const hex = /^#?(?<digits>[\da-f]{3,8})$/iu.exec(color.trim())

  if (hex) {
    const { digits } = hex.groups!
    const size = digits.length

    // 3 and 4 digits are the shorthand forms of 6 and 8 digits
    if (size !== 3 && size !== 4 && size !== 6 && size !== 8) return null

    const value =
      size === 3
        ? `${digits[0]}${digits[0]}${digits[1]}${digits[1]}${digits[2]}${digits[2]}`
        : size === 4
          ? `${digits[0]}${digits[0]}${digits[1]}${digits[1]}${digits[2]}${digits[2]}${digits[3]}${digits[3]}`
          : digits

    return [
      Number.parseInt(value.slice(0, 2), 16),
      Number.parseInt(value.slice(2, 4), 16),
      Number.parseInt(value.slice(4, 6), 16),
    ]
  }

  const rgb = /^rgba?\((?<channels>[^)]*)\)$/u.exec(color.trim())

  if (rgb) {
    const channels = rgb[1]
      .split(/[\s,/]+/u)
      .filter((channel) => channel !== '')

    if (channels.length < 3) return null

    const parsed = channels
      .slice(0, 3)
      .map((channel) =>
        channel.endsWith('%')
          ? (Number(channel.slice(0, -1)) / 100) * 255
          : Number(channel),
      )

    if (parsed.some((channel) => Number.isNaN(channel))) return null

    return parsed.map((channel) =>
      Math.min(255, Math.max(0, Math.round(channel))),
    ) as Rgb
  }

  return null
}

/**
 * Get the relative luminance of a color
 *
 * 获取颜色的相对亮度
 *
 * @param rgb - SRGB channels / sRGB 通道
 * @returns The relative luminance / 相对亮度
 */
export const getLuminance = ([red, green, blue]: Rgb): number =>
  0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue)

/**
 * Get the WCAG contrast ratio of two colors
 *
 * 获取两个颜色的 WCAG 对比度
 *
 * @param rgbA - SRGB channels of a color / 颜色的 sRGB 通道
 * @param rgbB - SRGB channels of another color / 另一颜色的 sRGB 通道
 * @returns The contrast ratio, between `1` and `21` / 对比度，介于 `1` 与 `21` 之间
 */
export const getContrastRatio = (rgbA: Rgb, rgbB: Rgb): number => {
  const [lighter, darker] = [getLuminance(rgbA), getLuminance(rgbB)].sort(
    (a, b) => b - a,
  )

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Format sRGB channels as a `rgb()` color
 *
 * 将 sRGB 通道格式化为 `rgb()` 颜色
 *
 * @param rgb - SRGB channels / sRGB 通道
 * @returns The `rgb()` color / `rgb()` 颜色
 */
export const formatColor = ([red, green, blue]: Rgb): string =>
  `rgb(${red} ${green} ${blue})`

/**
 * Get a color that reaches a contrast ratio against a background
 *
 * The color is moved towards black or white, depending on the background, by
 * the smallest amount that reaches the ratio, so that the hue is kept as much
 * as possible.
 *
 * 获取与背景达到指定对比度的颜色
 *
 * 颜色会沿着背景的明暗方向朝黑或白移动，移动量为达到该对比度的最小值，以尽可能保留色相。
 *
 * @param rgb - SRGB channels of the color / 颜色的 sRGB 通道
 * @param background - SRGB channels of the background / 背景的 sRGB 通道
 * @param ratio - Expected contrast ratio / 期望的对比度
 * @returns The adjusted color, or the original one when it already reaches the
 *   ratio / 调整后的颜色，颜色本身已达标时返回原颜色
 */
export const ensureContrast = (
  rgb: Rgb,
  background: Rgb,
  ratio = MIN_TEXT_CONTRAST,
): Rgb => {
  if (getContrastRatio(rgb, background) >= ratio) return rgb

  // a light background needs a darker color, and a dark one needs a lighter
  const target: Rgb =
    getLuminance(background) >= 0.5 ? [0, 0, 0] : [255, 255, 255]
  const mix = (amount: number): Rgb =>
    rgb.map((channel, index) =>
      Math.round(channel + (target[index] - channel) * amount),
    ) as Rgb

  let low = 0
  let high = 1

  // the contrast is monotonic in the amount, so the smallest amount that
  // reaches the ratio is found by bisection
  for (let step = 0; step < 20; step++) {
    const middle = (low + high) / 2

    if (getContrastRatio(mix(middle), background) >= ratio) high = middle
    else low = middle
  }

  return mix(high)
}

/**
 * Blend a color over a background
 *
 * 将颜色与背景混合
 *
 * @param rgb - SRGB channels of the color / 颜色的 sRGB 通道
 * @param background - SRGB channels of the background / 背景的 sRGB 通道
 * @param alpha - Alpha of the color / 颜色的 alpha
 * @returns The blended color / 混合后的颜色
 */
const blend = (rgb: Rgb, background: Rgb, alpha: number): Rgb =>
  rgb.map((channel, index) =>
    Math.round(channel * alpha + background[index] * (1 - alpha)),
  ) as Rgb

/**
 * Get the line number color of a theme
 *
 * The color is the text color muted by {@link LINE_NUMBER_ALPHA}, raised until
 * it also reaches the minimum contrast, so that the line numbers stay
 * subordinate to the code without becoming unreadable.
 *
 * 获取主题的行号颜色
 *
 * 该颜色为按 {@link LINE_NUMBER_ALPHA} 弱化后的文字颜色，并被提升到同样满足最低对比度， 使行号既从属于代码又不会难以辨认。
 *
 * @param text - SRGB channels of the text color / 文字颜色的 sRGB 通道
 * @param background - SRGB channels of the background / 背景的 sRGB 通道
 * @returns The line number color / 行号颜色
 */
const getLineNumberColor = (text: Rgb, background: Rgb): Rgb => {
  if (
    getContrastRatio(blend(text, background, LINE_NUMBER_ALPHA), background) >=
    MIN_TEXT_CONTRAST
  )
    return blend(text, background, LINE_NUMBER_ALPHA)

  // the muting is reduced as much as the minimum contrast allows, which keeps
  // a slight difference from the code text
  let low = LINE_NUMBER_ALPHA
  let high = 1

  for (let step = 0; step < 20; step++) {
    const middle = (low + high) / 2

    if (
      getContrastRatio(blend(text, background, middle), background) >=
      MIN_TEXT_CONTRAST
    )
      high = middle
    else low = middle
  }

  return blend(text, background, high)
}

/**
 * Get the base colors of the code blocks of a theme
 *
 * 获取主题中代码块的基础颜色
 *
 * @param theme - Resolved theme / 解析后的主题
 * @returns The base colors, or `null` when the colors of the theme can not be
 *   parsed / 基础颜色，主题颜色无法解析时返回 `null`
 */
export const getThemeColors = (
  theme: ThemeRegistrationResolved,
): CodeThemeColors | null => {
  const background = parseColor(theme.bg)
  const foreground = parseColor(theme.fg)

  if (!background || !foreground) return null

  const text = ensureContrast(foreground, background)

  return {
    bg: formatColor(background),
    text: formatColor(text),
    lineNumber: formatColor(getLineNumberColor(text, background)),
  }
}

/**
 * Get the base colors of the code blocks of every theme
 *
 * The single theme is used for both the light and the dark mode.
 *
 * 获取每个主题中代码块的基础颜色
 *
 * 单一主题会同时用于日间模式与夜间模式。
 *
 * @param highlighter - Shiki highlighter / Shiki 高亮器
 * @param options - Theme options / 主题选项
 * @returns The colors of the light and the dark mode, or `null` when they can
 *   not be resolved / 日间与夜间模式的颜色，无法解析时返回 `null`
 */
export const resolveCodeThemeColors = (
  highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>,
  options: ShikiPluginOptions,
): { dark: CodeThemeColors | null; light: CodeThemeColors | null } => {
  const themes =
    'themes' in options
      ? options.themes
      : { light: options.theme ?? 'nord', dark: options.theme ?? 'nord' }

  return {
    dark: getThemeColors(highlighter.getTheme(themes.dark)),
    light: getThemeColors(highlighter.getTheme(themes.light)),
  }
}

/**
 * Get the CSS declaring the base colors of the code blocks
 *
 * The colors are declared on `:root` and on `[data-theme='dark']`, which is how
 * `shiki.scss` reads them as well, so that the declaration is also applied on a
 * site that does not set `data-theme` at all.
 *
 * 获取声明代码块基础颜色的 CSS
 *
 * 颜色声明在 `:root` 与 `[data-theme='dark']` 上，`shiki.scss` 也以相同方式读取它们， 因此在完全没有设置
 * `data-theme` 的站点上声明同样生效。
 *
 * @param colors - Colors of the light and the dark mode / 日间与夜间模式的颜色
 * @returns The CSS, or an empty string when there is no color to declare /
 *   CSS，没有可声明的颜色时返回空字符串
 */
export const getCodeThemeColorsCss = (colors: {
  dark: CodeThemeColors | null
  light: CodeThemeColors | null
}): string => {
  const { dark, light } = colors

  // nothing is declared when neither theme provides its colors
  if (!dark && !light) return ''

  const declarations = (theme: CodeThemeColors): string => `\
  --code-c-text: ${theme.text};
  --code-c-bg: ${theme.bg};
  --code-c-line-number: ${theme.lineNumber};`

  // a single theme is used by both modes (the two colors are the same)
  if (light && dark && light.bg === dark.bg && light.text === dark.text)
    return `:root {\n${declarations(light)}\n}\n`

  const rules: string[] = []

  if (light) rules.push(`:root {\n${declarations(light)}\n}`)

  const darkTheme = dark ?? light

  if (darkTheme)
    rules.push(`[data-theme='dark'] {\n${declarations(darkTheme)}\n}`)

  return `${rules.join('\n')}\n`
}

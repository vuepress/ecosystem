/**
 * Color helpers for generating the base colors of the code blocks
 *
 * The colors are derived from a Shiki theme with `culori`, which parses the
 * color notations a theme may use and measures the WCAG contrast. This module
 * only holds the parts that are specific to the plugin: how a color is raised
 * to the minimum contrast, which also mutes the line numbers.
 *
 * The module is only used by `scripts/generateThemeColors.ts`, so it is not
 * part of the runtime of the plugin.
 *
 * 生成代码块基础颜色的颜色工具
 *
 * 颜色通过 `culori` 从 Shiki 主题推导，它会解析主题可能使用的颜色表示法并测量 WCAG
 * 对比度。本模块只保留插件特有的部分：如何将颜色提升到最低对比度，以及如何弱化行号。
 *
 * 该模块仅由 `scripts/generateThemeColors.ts` 使用，因此不属于插件的运行时。
 */

import type { Color } from 'culori'
import { formatHex, interpolate, parse, wcagContrast } from 'culori'

/**
 * The base colors of the code blocks of a theme
 *
 * 主题中代码块的基础颜色
 */
export interface CodeThemeBaseColors {
  /**
   * Background color of the code blocks
   *
   * 代码块的背景颜色
   */
  bg: string
  /**
   * Base text color of the code blocks
   *
   * The color is the foreground of the theme, raised to the minimum contrast
   * when the theme itself does not reach it.
   *
   * 代码块的基础文字颜色
   *
   * 该颜色为主题的前景颜色，当主题自身未达到最低对比度时会被提升。
   */
  text: string
  /**
   * Color of the line numbers
   *
   * The color is muted from {@link CodeThemeBaseColors.text}, but never below
   * the minimum contrast.
   *
   * 行号的颜色
   *
   * 该颜色由 {@link CodeThemeBaseColors.text} 弱化而来，但不会低于最低对比度。
   */
  lineNumber: string
}

/**
 * Resolved Shiki theme, which holds the background and the foreground
 *
 * 解析后的 Shiki 主题，它包含背景与前景颜色
 */
interface ResolvedTheme {
  /**
   * Background color of the theme
   *
   * 主题的背景颜色
   */
  bg: string
  /**
   * Foreground color of the theme
   *
   * 主题的前景颜色
   */
  fg: string
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
 * Number of bisection steps used to find a color that reaches the ratio
 *
 * 为找到达到对比度的颜色而执行的二分步数
 */
const BISECTION_STEPS = 20

/**
 * The endpoints a color is moved towards
 *
 * 颜色被移动到的端点
 */
const ENDPOINTS = ['white', 'black'] as const

/**
 * Round a color to the 8-bit channels it is written as
 *
 * The contrast is measured on the rounded color, so that a color is never
 * written with a contrast that is slightly below the ratio.
 *
 * 将颜色取整为实际写入的 8 位通道
 *
 * 对比度在取整后的颜色上测量，因此写入的颜色不会出现对比度略低于要求的情况。
 *
 * @param color - Color to round / 待取整的颜色
 * @returns The rounded color / 取整后的颜色
 */
const quantize = (color: Color): Color => parse(formatHex(color))!

/**
 * Mix two colors
 *
 * The alpha of the second color is composited over the first one, so a
 * translucent color is mixed as it is rendered.
 *
 * 混合两个颜色
 *
 * 第二个颜色的 alpha 会与第一个颜色合成，因此半透明颜色会按其渲染结果混合。
 *
 * @param from - Color to mix from / 起始颜色
 * @param to - Color to mix to / 目标颜色
 * @param amount - Mixing amount in `[0, 1]` / `[0, 1]` 范围内的混合比例
 * @returns The mixed color / 混合后的颜色
 */
const mix = (from: Color, to: Color, amount: number): Color =>
  quantize(interpolate([from, to], 'rgb')(amount))

/**
 * Find the smallest mixing amount towards a target that reaches the ratio
 *
 * 求出朝目标颜色混合并达到该对比度的最小比例
 *
 * @param color - Color to mix from / 起始颜色
 * @param target - Color to mix to / 目标颜色
 * @param background - Background color / 背景颜色
 * @param ratio - Expected contrast ratio / 期望的对比度
 * @returns The smallest mixing amount that reaches the ratio, or `null` when
 *   the target does not reach it at all / 达到该对比度的最小混合比例，目标完全无法 达到时为 `null`
 */
const findMixAmount = (
  color: Color,
  target: Color,
  background: Color,
  ratio: number,
): number | null => {
  if (wcagContrast(target, background) < ratio) return null

  let low = 0
  let high = 1

  // the ratio of a color mixed towards a pure endpoint is monotonic once the
  // original color is below the ratio, so bisection finds the boundary
  for (let step = 0; step < BISECTION_STEPS; step++) {
    const middle = (low + high) / 2

    if (wcagContrast(mix(color, target, middle), background) >= ratio)
      high = middle
    else low = middle
  }

  return high
}

/**
 * Raise a color until it reaches a contrast ratio against a background
 *
 * The color is moved towards white or black, whichever reaches the ratio with
 * the smallest change. A midtone background can only be reached by one of the
 * two, so both are tried, and the one with the better contrast is used when
 * neither of them reaches the ratio at all.
 *
 * 将颜色提升到与背景达到指定对比度
 *
 * 颜色会朝白或黑中变化最小的方向移动。中灰背景可能只有其中一个方向能达到，因此两者都会 尝试；两者都无法达到时，使用对比度更高的一个。
 *
 * @param color - Color to raise / 待提升的颜色
 * @param background - Background color / 背景颜色
 * @param ratio - Expected contrast ratio / 期望的对比度
 * @returns The raised color, or the original one when it already reaches the
 *   ratio / 提升后的颜色，颜色本身已达标时返回原颜色
 */
export const ensureContrast = (
  color: Color,
  background: Color,
  ratio = MIN_TEXT_CONTRAST,
): Color => {
  const from = quantize(color)
  const back = quantize(background)

  if (wcagContrast(from, back) >= ratio) return from

  const candidates = ENDPOINTS.map((endpoint) => ({
    endpoint,
    target: parse(endpoint)!,
  }))
    .map(({ endpoint, target }) => ({
      amount: findMixAmount(from, target, back, ratio),
      target,
      endpoint,
    }))
    .filter(
      (candidate): candidate is typeof candidate & { amount: number } =>
        candidate.amount != null,
    )

  // neither endpoint reaches the ratio, so the better one is used
  if (candidates.length === 0) {
    const white = parse(ENDPOINTS[0])!
    const black = parse(ENDPOINTS[1])!

    return wcagContrast(white, back) >= wcagContrast(black, back)
      ? white
      : black
  }

  // the smallest change keeps the color as close to the original as possible
  const best = candidates.reduce((a, b) => (b.amount < a.amount ? b : a))

  return mix(from, best.target, best.amount)
}

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
 * @param text - Text color / 文字颜色
 * @param background - Background color / 背景颜色
 * @returns The line number color / 行号颜色
 */
const getLineNumberColor = (text: Color, background: Color): Color => {
  if (
    wcagContrast(mix(background, text, LINE_NUMBER_ALPHA), background) >=
    MIN_TEXT_CONTRAST
  )
    return mix(background, text, LINE_NUMBER_ALPHA)

  // the muting is reduced as much as the minimum contrast allows, which keeps
  // a slight difference from the code text
  let low = LINE_NUMBER_ALPHA
  let high = 1

  for (let step = 0; step < BISECTION_STEPS; step++) {
    const middle = (low + high) / 2

    if (
      wcagContrast(mix(background, text, middle), background) >=
      MIN_TEXT_CONTRAST
    )
      high = middle
    else low = middle
  }

  return mix(background, text, high)
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
  theme: ResolvedTheme,
): CodeThemeBaseColors | null => {
  const background = parse(theme.bg)
  const foreground = parse(theme.fg)

  if (!background || !foreground) return null

  // a translucent foreground is composited over the background, which is the
  // color that is actually rendered
  const alpha = foreground.alpha ?? 1
  const composited =
    alpha === 1 ? quantize(foreground) : mix(background, foreground, alpha)
  const text = ensureContrast(composited, background)

  return {
    bg: formatHex(background),
    text: formatHex(text),
    lineNumber: formatHex(getLineNumberColor(text, background)),
  }
}

/**
 * Get the CSS rule declaring the base colors of the code blocks of a theme
 *
 * A theme is a complete palette, so the colors are the same in the light and
 * the dark mode, and only the selector differs.
 *
 * 获取声明主题中代码块基础颜色的 CSS 规则
 *
 * 主题本身就是一套完整的调色板，因此日间与夜间模式的颜色相同，只有选择器不同。
 *
 * @param selector - Selector of the rule / 规则的选择器
 * @param theme - Base colors of the theme / 主题的基础颜色
 * @returns The CSS rule / CSS 规则
 */
export const getCodeThemeColorsCss = (
  selector: string,
  theme: CodeThemeBaseColors,
): string => `\
${selector} {
  --code-c-text: ${theme.text};
  --code-c-bg: ${theme.bg};
  --code-c-line-number: ${theme.lineNumber};
}
`

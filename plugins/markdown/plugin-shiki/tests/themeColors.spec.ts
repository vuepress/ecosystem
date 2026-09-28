import type { Color } from 'culori'
import { formatHex, parse, wcagContrast } from 'culori'
import { bundledThemesInfo, createHighlighter } from 'shiki'
import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress/core'

import {
  MIN_TEXT_CONTRAST,
  ensureContrast,
  getCodeThemeColorsCss,
  getThemeColors,
} from '../scripts/themeColors.js'
import { prepareClientConfigFile } from '../src/node/prepareClientConfigFile.js'

/**
 * Get a color, failing the test when it can not be parsed
 *
 * 获取颜色，无法解析时让测试失败
 *
 * @param value - A color / 颜色
 * @returns The parsed color / 解析后的颜色
 */
const color = (value: string): Color => parse(value)!

/**
 * Get the contrast of two colors
 *
 * 获取两个颜色的对比度
 *
 * @param foreground - Foreground color / 前景颜色
 * @param background - Background color / 背景颜色
 * @returns The contrast ratio / 对比度
 */
const contrast = (
  foreground: string | Color,
  background: string | Color,
): number =>
  wcagContrast(
    typeof foreground === 'string' ? color(foreground) : foreground,
    typeof background === 'string' ? color(background) : background,
  )

describe(ensureContrast, () => {
  it('should keep the color that already reaches the ratio', () => {
    const text = color('#d8dee9')

    expect(ensureContrast(text, color('#2e3440'))).toStrictEqual(text)
  })

  it('should darken the text on a light background', () => {
    const result = ensureContrast(color('#9e9e9e'), color('#fafafa'))

    expect(contrast(result, '#fafafa')).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
    expect(formatHex(result)).toBe('#737373')
  })

  it('should lighten the text on a dark background', () => {
    // `#808080` only reaches 3.54:1 on `#282c34`
    const result = ensureContrast(color('#808080'), color('#282c34'))

    expect(contrast(result, '#282c34')).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
  })

  it('should reach the ratio on a midtone background', () => {
    const backgrounds = ['#b3b3b3', '#808080', '#5a5a5a', '#c8c8c8']
    const texts = ['#808080', '#c8c8c8', '#3c3c43']
    const ratios = backgrounds.flatMap((background) =>
      texts.map((text) =>
        contrast(ensureContrast(color(text), color(background)), background),
      ),
    )

    expect(Math.min(...ratios)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
  })

  it('should reach the ratio after the color is rounded to 8 bits', () => {
    // the color is written as an 8-bit value, so a color that only reaches the
    // ratio before rounding may fall below it once it is written
    const backgrounds = ['#fafafa', '#282c34', '#b3b3b3', '#121212']
    const texts = ['#9e9e9e', '#767676', '#dbd7ca']
    const ratios = backgrounds.flatMap((background) =>
      texts.map((text) =>
        contrast(ensureContrast(color(text), color(background)), background),
      ),
    )

    expect(Math.min(...ratios)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
  })

  it('should keep the change as small as possible', () => {
    // the smallest amount that reaches the ratio is used, so the color stays
    // close to the original
    const result = ensureContrast(color('#9e9e9e'), color('#fafafa'))

    expect(contrast(result, '#fafafa')).toBeLessThan(MIN_TEXT_CONTRAST + 0.2)
  })
})

describe(getThemeColors, () => {
  it('should derive the colors from a theme', () => {
    expect(getThemeColors({ bg: '#fafafa', fg: '#383a42' })).toStrictEqual({
      bg: '#fafafa',
      text: '#383a42',
      lineNumber: '#727379',
    })
  })

  it('should raise the text of a theme that does not reach the ratio', () => {
    // `material-theme-lighter` is below the ratio with its own foreground
    const theme = { bg: '#fafafa', fg: '#90a4ae' }
    const colors = getThemeColors(theme)!

    expect(contrast(theme.fg, theme.bg)).toBeLessThan(MIN_TEXT_CONTRAST)
    expect(contrast(colors.text, colors.bg)).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
  })

  it('should composite a translucent foreground over the background', () => {
    // `vitesse-*` themes use a translucent foreground
    const colors = getThemeColors({ bg: '#121212', fg: '#dbd7cacc' })!

    expect(colors.text).toBe('#b3b0a5')
    expect(contrast(colors.text, colors.bg)).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
  })

  it('should keep the line numbers muted but readable', () => {
    const colors = getThemeColors({ bg: '#fafafa', fg: '#383a42' })!
    const lineRatio = contrast(colors.lineNumber, colors.bg)

    expect(lineRatio).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
    // the line numbers stay subordinate to the code text
    expect(lineRatio).toBeLessThan(contrast(colors.text, colors.bg))
  })

  it('should return null when a color can not be parsed', () => {
    expect(getThemeColors({ bg: 'nonsense', fg: '#383a42' })).toBeNull()
    expect(getThemeColors({ bg: '#fafafa', fg: 'nonsense' })).toBeNull()
  })
})

describe(getCodeThemeColorsCss, () => {
  const colors = {
    bg: '#fafafa',
    text: '#383a42',
    lineNumber: '#727379',
  }

  it('should declare the colors of the theme', () => {
    const css = getCodeThemeColorsCss(':root', colors)

    expect(css).toContain(':root {')
    expect(css).toContain('--code-c-bg: #fafafa;')
    expect(css).toContain('--code-c-text: #383a42;')
    expect(css).toContain('--code-c-line-number: #727379;')
  })

  it('should scope the colors to the mode they are written for', () => {
    expect(getCodeThemeColorsCss("[data-theme='light']", colors)).toContain(
      "[data-theme='light'] {",
    )
    expect(getCodeThemeColorsCss("[data-theme='dark']", colors)).toContain(
      "[data-theme='dark'] {",
    )
  })
})

describe(prepareClientConfigFile, () => {
  const createApp = (): App =>
    ({
      writeTemp: (_name: string, content: string) => Promise.resolve(content),
    }) as unknown as App

  it('should import the styles of a single theme', async () => {
    const content = await prepareClientConfigFile(createApp(), {
      theme: 'nord',
    })

    expect(content).toContain('styles/nord.css"')
    expect(content).not.toContain('nord.light.css')
  })

  it('should use the default theme when none is given', async () => {
    const content = await prepareClientConfigFile(createApp(), {})

    expect(content).toContain('styles/nord.css"')
  })

  it('should import the styles of both modes', async () => {
    const content = await prepareClientConfigFile(createApp(), {
      themes: { light: 'one-light', dark: 'one-dark-pro' },
    })

    expect(content).toContain('styles/one-light.light.css"')
    expect(content).toContain('styles/one-dark-pro.dark.css"')
  })

  it('should import the styles once when the modes share a theme', async () => {
    const content = await prepareClientConfigFile(createApp(), {
      themes: { light: 'nord', dark: 'nord' },
    })

    expect(content).toContain('styles/nord.css"')
    expect(content).not.toContain('nord.dark.css')
  })

  it('should keep the fallback colors of a custom theme', async () => {
    // a custom palette has no generated styles, it declares the code block
    // colors itself and the fallback of the plugin is kept
    const content = await prepareClientConfigFile(createApp(), {
      theme: { bg: '#000000', fg: '#ffffff', name: 'custom' },
    })

    expect(content).not.toContain('styles/nord')
    expect(content).toContain('styles/shiki.css"')
  })

  it('should import the styles after the fallback colors', async () => {
    const content = await prepareClientConfigFile(createApp(), {
      theme: 'nord',
    })
    const fallback = content.indexOf('styles/shiki.css')
    const theme = content.indexOf('styles/nord.css')

    expect(fallback).toBeGreaterThan(-1)
    expect(theme).toBeGreaterThan(fallback)
  })
})

describe('bundled themes', () => {
  const THEMES = bundledThemesInfo.map(({ id }) => id)

  it('should keep every theme above the minimum contrast', async () => {
    // the promise only holds if it holds for every theme, and only a few
    // themes are below the ratio themselves, so the adjustment has to be
    // exercised over the full list
    const highlighter = await createHighlighter({ langs: [], themes: THEMES })
    const ratios = THEMES.map((name) => {
      const { bg, fg } = highlighter.getTheme(name)
      const colors = getThemeColors({ bg, fg })!

      return {
        line: contrast(colors.lineNumber, colors.bg),
        name,
        text: contrast(colors.text, colors.bg),
      }
    })

    expect(Math.min(...ratios.map(({ text }) => text))).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
    expect(Math.min(...ratios.map(({ line }) => line))).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
  })

  it('should adjust only the themes that need it', async () => {
    const highlighter = await createHighlighter({ langs: [], themes: THEMES })
    const lowContrast = THEMES.filter((name) => {
      const { bg, fg } = highlighter.getTheme(name)

      return contrast(fg, bg) < MIN_TEXT_CONTRAST
    })
    const adjusted = THEMES.filter((name) => {
      const { bg, fg } = highlighter.getTheme(name)

      return getThemeColors({ bg, fg })!.text !== formatHex(color(fg))
    })

    // the two themes below the ratio themselves are pushed to it
    expect(lowContrast).toStrictEqual([
      'material-theme-lighter',
      'solarized-light',
    ])
    // the translucent foregrounds of the other two are composited
    expect(adjusted).toStrictEqual([
      'material-theme-lighter',
      'solarized-light',
      'vitesse-black',
      'vitesse-dark',
    ])
  })
})

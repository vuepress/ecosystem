import { bundledThemesInfo, createHighlighter } from 'shiki'
import { describe, expect, it } from 'vitest'

import {
  MIN_TEXT_CONTRAST,
  ensureContrast,
  formatColor,
  getCodeThemeColorsCss,
  getContrastRatio,
  getLuminance,
  getThemeColors,
  parseColor,
  resolveCodeThemeColors,
} from '../src/node/themeColors.js'

describe(parseColor, () => {
  it('should parse the hex notations', () => {
    expect(parseColor('#282c34')).toStrictEqual([40, 44, 52])
    expect(parseColor('282c34')).toStrictEqual([40, 44, 52])
    expect(parseColor('#abc')).toStrictEqual([170, 187, 204])
    expect(parseColor('#aabbccdd')).toStrictEqual([170, 187, 204])
    expect(parseColor('#d8dee9ff')).toStrictEqual([216, 222, 233])
  })

  it('should parse the rgb notations', () => {
    expect(parseColor('rgb(40 44 52)')).toStrictEqual([40, 44, 52])
    expect(parseColor('rgb(40, 44, 52)')).toStrictEqual([40, 44, 52])
    expect(parseColor('rgba(40, 44, 52, 0.5)')).toStrictEqual([40, 44, 52])
    expect(parseColor('rgb(40 44 52 / 50%)')).toStrictEqual([40, 44, 52])
    expect(parseColor('rgb(100% 50% 0%)')).toStrictEqual([255, 128, 0])
  })

  it('should clamp the channels', () => {
    expect(parseColor('rgb(300 -20 0)')).toStrictEqual([255, 0, 0])
  })

  it('should return null for the colors it can not parse', () => {
    const colors = [
      '',
      'transparent',
      'hsl(0 0% 0%)',
      'oklch(0.5 0 0)',
      'color(srgb 1 0.5 0)',
      '#12345',
      'rgb(1 2)',
      'rgb(a b c)',
    ]

    expect(colors.map((color) => parseColor(color))).toStrictEqual(
      colors.map(() => null),
    )
  })
})

describe(getLuminance, () => {
  it('should measure the relative luminance', () => {
    expect(getLuminance([0, 0, 0])).toBe(0)
    expect(getLuminance([255, 255, 255])).toBeCloseTo(1, 10)
    // `#282c34` is a common dark code block background
    expect(getLuminance([40, 44, 52])).toBeCloseTo(0.025, 4)
  })
})

describe(getContrastRatio, () => {
  it('should measure the WCAG contrast ratio', () => {
    expect(getContrastRatio([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5)
    expect(getContrastRatio([255, 255, 255], [255, 255, 255])).toBe(1)
    expect(getContrastRatio([40, 44, 52], [255, 255, 255])).toBeCloseTo(14, 1)
  })

  it('should not depend on the order of the colors', () => {
    expect(getContrastRatio([40, 44, 52], [255, 255, 255])).toBe(
      getContrastRatio([255, 255, 255], [40, 44, 52]),
    )
  })
})

describe(ensureContrast, () => {
  it('should keep the color that already reaches the ratio', () => {
    const text: [number, number, number] = [216, 222, 233]

    expect(ensureContrast(text, [46, 52, 64])).toStrictEqual(text)
  })

  it('should darken the text on a light background', () => {
    const result = ensureContrast([158, 158, 158], [250, 250, 250])

    expect(getContrastRatio(result, [250, 250, 250])).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
    // the result is darker than the input
    expect(result[0]).toBeLessThan(158)
  })

  it('should lighten the text on a dark background', () => {
    // `#808080` only reaches 3.54:1 on `#282c34`
    const result = ensureContrast([128, 128, 128], [40, 44, 52])

    expect(getContrastRatio(result, [40, 44, 52])).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
    expect(result[0]).toBeGreaterThan(128)
  })

  it('should reach the ratio on a midtone background', () => {
    // a midtone background can only be reached by one of the two endpoints,
    // the other one stays below the ratio no matter how far it is pushed
    for (const background of [
      [179, 179, 179],
      [128, 128, 128],
      [90, 90, 90],
      [200, 200, 200],
    ] as [number, number, number][]) {
      for (const text of [
        [128, 128, 128],
        [200, 200, 200],
        [60, 60, 67],
      ] as [number, number, number][]) {
        const result = ensureContrast(text, background)

        expect(getContrastRatio(result, background)).toBeGreaterThanOrEqual(
          MIN_TEXT_CONTRAST,
        )
      }
    }
  })

  it('should keep the contrast of the original color when it already reaches the ratio', () => {
    // `#8a8a8a` on `#b3b3b3` is below the ratio, and only black can reach it
    const result = ensureContrast([138, 138, 138], [179, 179, 179])

    expect(getContrastRatio(result, [179, 179, 179])).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
    // the result is darker, a lighter color could never reach the ratio
    expect(getLuminance(result)).toBeLessThan(getLuminance([179, 179, 179]))
  })

  it('should keep the hue as much as possible', () => {
    // `#9e9e9e` only reaches 2.54:1 on `#fafafa`, and the result is the
    // smallest change that reaches the ratio
    const result = ensureContrast([158, 158, 158], [250, 250, 250])
    const ratio = getContrastRatio(result, [250, 250, 250])

    expect(ratio).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
    expect(ratio).toBeLessThan(MIN_TEXT_CONTRAST + 0.5)
  })
})

describe(getThemeColors, () => {
  it('should derive the colors from a theme', async () => {
    const highlighter = await createHighlighter({
      langs: [],
      themes: ['one-light'],
    })
    const colors = getThemeColors(highlighter.getTheme('one-light'))

    expect(colors).not.toBeNull()
    expect(colors?.bg).toBe('rgb(250 250 250)')
    // the theme foreground is kept, it already contrasts with the background
    expect(colors?.text).toBe('rgb(56 58 66)')
    expect(parseColor(colors!.lineNumber)).not.toBeNull()
  })

  it('should keep the text above the minimum contrast', async () => {
    const themes = ['one-light', 'one-dark-pro', 'nord', 'github-light']
    const highlighter = await createHighlighter({
      langs: [],
      themes,
    })
    const ratios = themes.map((theme) => {
      const colors = getThemeColors(highlighter.getTheme(theme))!

      return getContrastRatio(parseColor(colors.text)!, parseColor(colors.bg)!)
    })

    expect(Math.min(...ratios)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
  })

  it('should keep the line numbers readable and muted', async () => {
    const highlighter = await createHighlighter({
      langs: [],
      themes: ['one-light'],
    })
    const colors = getThemeColors(highlighter.getTheme('one-light'))!
    const lineNumber = parseColor(colors.lineNumber)!
    const background = parseColor(colors.bg)!

    expect(getContrastRatio(lineNumber, background)).toBeGreaterThanOrEqual(
      MIN_TEXT_CONTRAST,
    )
    // the line numbers are muted towards the background, so they stay
    // subordinate to the code text
    expect(getContrastRatio(lineNumber, background)).toBeLessThan(
      getContrastRatio(parseColor(colors.text)!, background),
    )
  })

  it('should raise the contrast of a theme that does not reach it', async () => {
    const highlighter = await createHighlighter({
      langs: [],
      themes: ['material-theme-lighter'],
    })
    const theme = highlighter.getTheme('material-theme-lighter')
    const colors = getThemeColors(theme)!

    // the theme itself is below the minimum contrast
    expect(
      getContrastRatio(parseColor(theme.fg)!, parseColor(theme.bg)!),
    ).toBeLessThan(MIN_TEXT_CONTRAST)
    expect(
      getContrastRatio(parseColor(colors.text)!, parseColor(colors.bg)!),
    ).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
  })
})

describe(resolveCodeThemeColors, () => {
  it('should use the theme for both the light and the dark mode', async () => {
    const highlighter = await createHighlighter({ langs: [], themes: ['nord'] })
    const { light, dark } = resolveCodeThemeColors(highlighter, {
      theme: 'nord',
    })

    expect(light).toStrictEqual(dark)
    expect(light?.bg).toBe('rgb(46 52 64)')
  })

  it('should use the default theme when none is given', async () => {
    const highlighter = await createHighlighter({ langs: [], themes: ['nord'] })
    const { light } = resolveCodeThemeColors(highlighter, {})

    expect(light?.bg).toBe('rgb(46 52 64)')
  })

  it('should resolve the themes of both modes', async () => {
    const highlighter = await createHighlighter({
      langs: [],
      themes: ['one-light', 'one-dark-pro'],
    })
    const { light, dark } = resolveCodeThemeColors(highlighter, {
      themes: { light: 'one-light', dark: 'one-dark-pro' },
    })

    expect(light?.bg).toBe('rgb(250 250 250)')
    expect(dark?.bg).toBe('rgb(40 44 52)')
  })

  it('should resolve a theme given as an object', async () => {
    const highlighter = await createHighlighter({ langs: [], themes: ['nord'] })
    const { light } = resolveCodeThemeColors(highlighter, {
      theme: highlighter.getTheme('nord'),
    })

    expect(light?.bg).toBe('rgb(46 52 64)')
  })
})

describe(getCodeThemeColorsCss, () => {
  const light = {
    bg: 'rgb(250 250 250)',
    text: 'rgb(56 58 66)',
    lineNumber: 'rgb(120 122 130)',
  }
  const dark = {
    bg: 'rgb(40 44 52)',
    text: 'rgb(171 178 191)',
    lineNumber: 'rgb(120 125 138)',
  }

  it('should declare a single theme on the root element', () => {
    const css = getCodeThemeColorsCss({ light, dark: light })

    expect(css).toContain(':root {')
    expect(css).toContain('--code-c-text: rgb(56 58 66);')
    expect(css).toContain('--code-c-bg: rgb(250 250 250);')
    expect(css).toContain('--code-c-line-number: rgb(120 122 130);')
    expect(css).not.toContain('data-theme')
  })

  it('should declare both themes when they differ', () => {
    const css = getCodeThemeColorsCss({ light, dark })

    expect(css).toContain(':root {')
    expect(css).toContain('--code-c-bg: rgb(250 250 250);')
    expect(css).toContain("[data-theme='dark'] {")
    expect(css).toContain('--code-c-bg: rgb(40 44 52);')
  })

  it('should declare nothing when there is no color', () => {
    expect(getCodeThemeColorsCss({ light: null, dark: null })).toBe('')
  })

  it('should declare the available mode only', () => {
    const css = getCodeThemeColorsCss({ light: null, dark })

    expect(css).toContain("[data-theme='dark'] {")
    expect(css).not.toContain(':root {')
  })

  it('should not fake the dark mode from the light theme', () => {
    // the dark mode falls back to the inline background of the code block when
    // its own colors are unknown, a light background must not mask it
    const css = getCodeThemeColorsCss({ light, dark: null })

    expect(css).toContain(':root {')
    expect(css).not.toContain('data-theme')
  })
})

describe('shiki themes', () => {
  it('should keep every bundled theme above the minimum contrast', async () => {
    // the promise only holds if it holds for every theme, and only a few
    // themes are below the ratio themselves, so the adjustment has to be
    // exercised over the full list
    const names = bundledThemesInfo.map(({ id }) => id)
    const highlighter = await createHighlighter({ langs: [], themes: names })
    const colors = names.map((name) =>
      getThemeColors(highlighter.getTheme(name)),
    )
    const unresolved = names.filter((_name, index) => colors[index] == null)
    const textRatios = colors.map((item) =>
      getContrastRatio(parseColor(item!.text)!, parseColor(item!.bg)!),
    )
    const lineRatios = colors.map((item) =>
      getContrastRatio(parseColor(item!.lineNumber)!, parseColor(item!.bg)!),
    )

    expect(unresolved).toStrictEqual([])
    expect(Math.min(...textRatios)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
    expect(Math.min(...lineRatios)).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
  })

  it('should adjust only the themes that need it', async () => {
    const names = bundledThemesInfo.map(({ id }) => id)
    const highlighter = await createHighlighter({ langs: [], themes: names })
    const lowContrast = names.filter((name) => {
      const theme = highlighter.getTheme(name)

      return (
        getContrastRatio(parseColor(theme.fg)!, parseColor(theme.bg)!) <
        MIN_TEXT_CONTRAST
      )
    })
    const adjusted = names.filter((name) => {
      const theme = highlighter.getTheme(name)
      const colors = getThemeColors(theme)!

      return colors.text !== formatColor(parseColor(theme.fg)!)
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

  it('should composite a translucent foreground over the background', async () => {
    // `vitesse-*` themes use a translucent foreground, which is composited
    // before the contrast is measured
    const highlighter = await createHighlighter({
      langs: [],
      themes: ['vitesse-black'],
    })
    const theme = highlighter.getTheme('vitesse-black')
    const colors = getThemeColors(theme)!

    expect(theme.fg).toHaveLength(9)
    expect(colors.text).not.toBe(formatColor(parseColor(theme.fg)!))
    expect(
      getContrastRatio(parseColor(colors.text)!, parseColor(colors.bg)!),
    ).toBeGreaterThanOrEqual(MIN_TEXT_CONTRAST)
  })
})

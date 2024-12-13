import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki'
import { createHighlighter } from 'shiki'
import { bundledLanguageNames } from '../../shiki.js'
import type { ShikiHighlightOptions } from '../../types.js'

export const createShikiHighlighter = async ({
  langs = bundledLanguageNames,
  langAlias = {},
  defaultLang,
  shikiSetup,
  ...options
}: ShikiHighlightOptions = {}): Promise<
  HighlighterGeneric<BundledLanguage, BundledTheme>
> => {
  const shikiHighlighter = await createHighlighter({
    langs,
    langAlias,
    themes:
      'themes' in options
        ? Object.values(options.themes)
        : [options.theme ?? 'nord'],
  })

  await shikiSetup?.(shikiHighlighter)

  return shikiHighlighter
}

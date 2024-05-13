import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import {
  addClassToHast,
  bundledLanguages,
  getHighlighter,
  isPlainLang,
  isSpecialLang,
} from 'shiki'
import type { ShikiTransformer } from 'shiki'
import { colors as c, logger } from 'vuepress/utils'
import type { ShikiPluginOptions } from './types.js'

const DEFAULT_LANGS = Object.keys(bundledLanguages)
const RE_ESCAPE = /\[\\!code/g

export async function highlight({
  langs = DEFAULT_LANGS,
  theme = 'nord',
  themes,
  transformers = [],
}: ShikiPluginOptions = {}): Promise<
  (str: string, lang: string, attrs: string) => string
> {
  const highlighter = await getHighlighter({
    langs,
    themes: themes ? [themes.dark, themes.light] : [theme],
  })

  const defaultTransformers: ShikiTransformer[] = [
    transformerNotationDiff(),
    transformerNotationFocus({
      classActiveLine: 'has-focus',
      classActivePre: 'has-focused-lines',
    }),
    transformerNotationHighlight(),
    transformerNotationErrorLevel(),
    {
      name: 'vuepress:add-class',
      pre(node) {
        addClassToHast(node, 'vp-code')
      },
    },
    {
      name: 'vuepress:clean-up',
      pre(node) {
        delete node.properties.tabindex
        delete node.properties.style
      },
    },
    {
      name: 'vuepress:remove-escape',
      postprocess: (code) => code.replace(RE_ESCAPE, '[!code'),
    },
  ]

  return (code, lang) => {
    if (lang) {
      const langLoaded = highlighter.getLoadedLanguages().includes(lang as any)
      if (!langLoaded && !isPlainLang(lang) && !isSpecialLang(lang)) {
        logger.warn(
          c.yellow(
            `\nThe language '${lang}' is not loaded, falling back to '${'txt'}' for syntax highlighting.`,
          ),
        )
        lang = 'txt'
      }
    }

    return highlighter.codeToHtml(code, {
      lang,
      transformers: [...defaultTransformers, ...transformers],
      ...(themes ? { themes, defaultColor: false } : { theme }),
    })
  }
}

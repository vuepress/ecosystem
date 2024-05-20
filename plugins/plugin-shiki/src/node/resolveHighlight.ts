import {
  transformerCompactLineOptions,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers'
import { customAlphabet } from 'nanoid'
import type { ShikiTransformer } from 'shiki'
import {
  bundledLanguages,
  getHighlighter,
  isPlainLang,
  isSpecialLang,
} from 'shiki'
import { colors, logger } from 'vuepress/utils'
import type { ShikiPluginOptions } from './types.js'
import { attrsToLines, resolveLanguage } from './utils.js'

const DEFAULT_LANGS = Object.keys(bundledLanguages)

const RE_ESCAPE = /\[\\!code/g
const mustacheRE = /\{\{.*?\}\}/g

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 10)

export const resolveHighlight = async ({
  langs = DEFAULT_LANGS,
  theme = 'nord',
  themes,
  defaultHighlightLang = '',
  transformers: userTransformers = [],
  ...options
}: ShikiPluginOptions = {}): Promise<
  (str: string, lang: string, attrs: string) => string
> => {
  const highlighter = await getHighlighter({
    langs,
    themes: themes ? [themes.dark, themes.light] : [theme],
  })

  await options.shikiSetup?.(highlighter)

  const transformers: ShikiTransformer[] = []

  if (options.notationDiff) {
    transformers.push(transformerNotationDiff())
  }

  if (options.notationFocus) {
    transformers.push(
      transformerNotationFocus({
        classActiveLine: 'has-focus',
        classActivePre: 'has-focused-lines',
      }),
    )
  }

  if (options.notationHighlight) {
    transformers.push(transformerNotationHighlight())
  }

  if (options.notationErrorLevel) {
    transformers.push(transformerNotationErrorLevel())
  }

  transformers.push(
    ...([
      {
        name: 'vuepress:add-class',
        pre(node) {
          this.addClassToHast(node, 'vp-code')
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
    ] as ShikiTransformer[]),
  )

  return (str, language, attrs) => {
    let lang = resolveLanguage(language)

    if (lang) {
      const langLoaded = highlighter.getLoadedLanguages().includes(lang as any)
      if (!langLoaded && !isPlainLang(lang) && !isSpecialLang(lang)) {
        logger.warn(
          colors.yellow(
            `\nThe language '${lang}' is not loaded, falling back to '${defaultHighlightLang || 'txt'}' for syntax highlighting.`,
          ),
        )
        lang = defaultHighlightLang
      }
    }

    const codeTransformers: ShikiTransformer[] = [
      {
        name: 'vuepress:empty-line',
        code(hast) {
          hast.children.forEach((span) => {
            if (
              span.type === 'element' &&
              span.tagName === 'span' &&
              Array.isArray(span.properties.class) &&
              span.properties.class.includes('line') &&
              span.children.length === 0
            ) {
              span.children.push({
                type: 'element',
                tagName: 'wbr',
                properties: {},
                children: [],
              })
            }
          })
        },
      },
    ]

    if (options.highlightLines ?? true) {
      codeTransformers.push(transformerCompactLineOptions(attrsToLines(attrs)))
    }

    const mustaches = new Map<string, string>()

    const removeMustache = (s: string): string => {
      return s.replace(mustacheRE, (match) => {
        let marker = mustaches.get(match)
        if (!marker) {
          marker = nanoid()
          mustaches.set(match, marker)
        }
        return marker
      })
    }

    const restoreMustache = (s: string): string => {
      mustaches.forEach((marker, match) => {
        s = s.replaceAll(marker, match)
      })
      return s
    }

    str = removeMustache(str).trimEnd()

    const highlighted = highlighter.codeToHtml(str, {
      lang,
      meta: { __raw: attrs },
      transformers: [...transformers, ...codeTransformers, ...userTransformers],
      ...(themes ? { themes, defaultColor: options.defaultColor } : { theme }),
    })

    return restoreMustache(highlighted)
  }
}

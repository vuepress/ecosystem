import {
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRenderWhitespace,
} from '@shikijs/transformers'
import type { TransformerTwoslashIndexOptions } from '@shikijs/twoslash'
import type { WhitespacePosition } from '@vuepress/highlighter-helper'
import { resolveWhitespacePosition } from '@vuepress/highlighter-helper'
import type { ShikiTransformer } from 'shiki'
import { colors } from 'vuepress/utils'
import type { ShikiHighlightOptions } from '../types.js'
import { logger } from '../utils.js'
import {
  addClassTransformer,
  cleanupTransformer,
  emptyLineTransformer,
  removeEscapeTransformer,
} from './vuepressTransformers.js'

let transformerTwoslash:
  | ((options?: TransformerTwoslashIndexOptions) => ShikiTransformer)
  | null

try {
  ;({ transformerTwoslash } = await import('@shikijs/twoslash'))
} catch {
  transformerTwoslash = null
}

export const getTransformers = (
  options: ShikiHighlightOptions & {
    twoslash?: boolean
  },
): ShikiTransformer[] => {
  const transformers: ShikiTransformer[] = []

  if (options.notationDiff) {
    transformers.push(
      transformerNotationDiff({
        matchAlgorithm: 'v3',
      }),
    )
  }

  if (options.notationFocus) {
    transformers.push(
      transformerNotationFocus({
        classActiveLine: 'has-focus',
        classActivePre: 'has-focused-lines',
        matchAlgorithm: 'v3',
      }),
    )
  }

  if (options.notationHighlight) {
    transformers.push(
      transformerNotationHighlight({
        matchAlgorithm: 'v3',
      }),
    )
  }

  if (options.notationErrorLevel) {
    transformers.push(
      transformerNotationErrorLevel({
        matchAlgorithm: 'v3',
      }),
    )
  }

  if (options.notationWordHighlight) {
    transformers.push(
      transformerNotationWordHighlight({
        matchAlgorithm: 'v3',
      }),
    )
    transformers.push(transformerMetaWordHighlight())
  }

  if (options.twoslash) {
    if (transformerTwoslash)
      transformers.push(
        transformerTwoslash({
          explicitTrigger: true,
        }),
      )
    else {
      logger.error(
        `${colors.cyan('twoslash')} is enabled, but ${colors.magenta('@shikijs/twoslash')} is not installed, please install it manually`,
      )
    }
  }

  transformers.push(
    addClassTransformer,
    cleanupTransformer,
    removeEscapeTransformer,
    emptyLineTransformer,
  )

  return transformers
}

export const whitespaceTransformer = (
  meta: string,
  defaultPosition: WhitespacePosition | boolean = false,
): ShikiTransformer[] => {
  const position = resolveWhitespacePosition(meta, defaultPosition)
  // disable current code block
  if (position === false) return []

  return [transformerRenderWhitespace({ position })]
}

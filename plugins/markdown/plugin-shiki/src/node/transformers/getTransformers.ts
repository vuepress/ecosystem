import {
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'
import type { ShikiTransformer } from 'shiki'
import type { ShikiHighlightOptions } from '../types.js'
import {
  addClassTransformer,
  cleanupTransformer,
  emptyLineTransformer,
  removeEscapeTransformer,
} from './vuepressTransformers.js'

export const getTransformers = (
  options: ShikiHighlightOptions,
): ShikiTransformer[] => {
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

  if (options.notationWordHighlight) {
    transformers.push(transformerNotationWordHighlight())
    transformers.push(transformerMetaWordHighlight())
  }

  transformers.push(
    addClassTransformer,
    cleanupTransformer,
    removeEscapeTransformer,
    emptyLineTransformer,
  )

  return transformers
}

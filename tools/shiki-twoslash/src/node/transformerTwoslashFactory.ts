import process from 'node:process'
import {
  createTransformerFactory,
  defaultHoverInfoProcessor,
  defaultTwoslashOptions,
} from '@shikijs/twoslash/core'
import type { ShikiTransformer } from 'shiki'
import { removeTwoslashNotations } from 'twoslash'
import { createTwoslasher } from 'twoslash-vue'
import { logger } from 'vuepress/utils'
import { rendererFloatingVue } from './rendererFloatingVue.js'
import { resolveTsPaths } from './resolveTsPaths.js'
import type { ShikiTwoslashOptions } from './types.js'

/**
 * Create a Shiki transformer for VuePress to enable twoslash integration
 */
export const transformerTwoslashFactory = async (
  options: ShikiTwoslashOptions = {},
): Promise<ShikiTransformer> => {
  const { explicitTrigger = true } = options

  const onError = (error: unknown, code: string): string => {
    const isCI = process.env.CI
    const isDev =
      typeof process !== 'undefined' && process.env.NODE_ENV === 'development'
    const shouldThrow =
      (options.throws ?? isCI ?? !isDev) && options.throws !== false
    logger.error(
      `\n\n--------\nTwoslash error in code:\n--------\n${code.split(/\n/g).slice(0, 15).join('\n').trim()}\n--------\n`,
    )
    if (shouldThrow) {
      throw error
    } else {
      logger.error(error)
    }
    return removeTwoslashNotations(code)
  }
  options.processHoverInfo ??= defaultHoverInfoProcessor

  const paths = await resolveTsPaths()
  const { compilerOptions = {}, ...twoslashOptions } =
    options.twoslashOptions ?? {}
  if (paths) {
    compilerOptions.paths = {
      ...compilerOptions.paths,
      ...paths,
    }
  }
  options.twoslashOptions = {
    ...defaultTwoslashOptions(),
    ...twoslashOptions,
    compilerOptions: {
      baseUrl: process.cwd(),
      ...compilerOptions,
    },
  }

  const twoslash = createTransformerFactory(
    createTwoslasher(options.twoslashOptions),
  )({
    langs: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
    renderer: rendererFloatingVue(options),
    onTwoslashError: onError,
    onShikiError: onError,
    ...options,
    explicitTrigger,
  })

  const trigger =
    explicitTrigger instanceof RegExp ? explicitTrigger : /\btwoslash\b/

  return {
    ...twoslash,
    name: '@shiki/vuepress-twoslash',
    preprocess(code, opt) {
      const cleanup = opt.transformers?.find(
        (i) => i.name === 'vuepress:clean-up',
      )
      if (cleanup)
        opt.transformers?.splice(opt.transformers.indexOf(cleanup), 1)

      // Disable v-pre for twoslash, because we need render it with FloatingVue
      if (!explicitTrigger || opt.meta?.__raw?.match(trigger)) {
        const vPre = opt.transformers?.find((i) => i.name === 'vuepress:v-pre')
        if (vPre) opt.transformers?.splice(opt.transformers.indexOf(vPre), 1)
      }

      return twoslash.preprocess!.call(this, code, opt)
    },
    postprocess(html) {
      if (this.meta.twoslash) return html.replace(/\{/g, '&#123;')

      return html
    },
  }
}

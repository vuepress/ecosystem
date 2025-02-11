import process from 'node:process'
import {
  createTransformerFactory,
  defaultTwoslashOptions,
} from '@shikijs/twoslash/core'
import type { ShikiTransformer } from 'shiki'
import type { TwoslashExecuteOptions, TwoslashReturn } from 'twoslash'
import { removeTwoslashNotations } from 'twoslash'
import { createTwoslasher } from 'twoslash-vue'
import { logger } from 'vuepress/utils'
import type { ShikiTwoslashOptions } from './options.js'
import { rendererFloatingVue } from './rendererFloatingVue.js'
import { resolveTypeScriptPaths } from './resolveTypeScriptPaths.js'

/**
 * Create a Shiki transformer for VuePress to enable twoslash integration
 */
export const createTwoslashTransformer = async (
  options: ShikiTwoslashOptions = {},
): Promise<ShikiTransformer> => {
  // eslint-disable-next-line no-multi-assign
  const explicitTrigger = (options.explicitTrigger ??= true)
  // eslint-disable-next-line no-multi-assign
  const _twoslashOptions = (options.twoslashOptions ??= {})

  const { compilerOptions = {} } = _twoslashOptions

  const twoslashOptions = {
    ...defaultTwoslashOptions(),
    ..._twoslashOptions,
    compilerOptions: {
      baseUrl: process.cwd(),
      ...compilerOptions,
      path: {
        ...compilerOptions.paths,
        ...(await resolveTypeScriptPaths()),
      },
    },
  }
  const shouldThrow =
    // respect user option
    options.throws ??
    // in CI or production mode
    (process.env.CI || process.env.NODE_ENV === 'production')

  const onError = (error: unknown, code: string): string => {
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

  const defaultTwoslashInstance = createTwoslasher(twoslashOptions)
  const { typesCache } = options
  let twoslashInstance = defaultTwoslashInstance
  if (typesCache) {
    twoslashInstance = ((
      code: string,
      extension?: string,
      opt?: TwoslashExecuteOptions,
    ): TwoslashReturn => {
      const cached = typesCache.read(code) // Restore cache
      if (cached) return cached

      const twoslashResult = defaultTwoslashInstance(code, extension, opt)
      typesCache.write(code, twoslashResult)
      return twoslashResult
    }) as typeof defaultTwoslashInstance
    twoslashInstance.getCacheMap = defaultTwoslashInstance.getCacheMap

    typesCache.init?.()
  }

  const twoslashTransformer = createTransformerFactory(twoslashInstance)({
    langs: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
    renderer: rendererFloatingVue(options),
    onShikiError: onError,
    onTwoslashError: onError,
    ...options,
    explicitTrigger,
    twoslashOptions,
  })

  const triggerRegExp =
    explicitTrigger instanceof RegExp ? explicitTrigger : /\btwoslash\b/

  return {
    name: 'vuepress:twoslash',

    ...twoslashTransformer,

    preprocess(code, preprocessOptions) {
      const { transformers } = preprocessOptions

      if (transformers) {
        const cleanupIndex = transformers.findIndex(
          ({ name }) => name === 'vuepress:clean-up',
        )

        if (cleanupIndex >= 0) transformers.splice(cleanupIndex, 1)

        // Disable v-pre for twoslash, because we need render it with FloatingVue
        if (
          !explicitTrigger ||
          preprocessOptions.meta?.__raw?.match(triggerRegExp)
        ) {
          const vPreIndex = transformers.findIndex(
            ({ name }) => name === 'vuepress:v-pre',
          )

          if (vPreIndex >= 0) transformers.splice(vPreIndex, 1)
        }
      }

      return twoslashTransformer.preprocess!.call(this, code, preprocessOptions)
    },

    postprocess(html) {
      return this.meta.twoslash ? html.replace(/\{/g, '&#123;') : html
    },
  }
}

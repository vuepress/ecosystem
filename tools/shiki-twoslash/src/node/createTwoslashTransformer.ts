import process from 'node:process'
import type { TwoslashShikiReturn } from '@shikijs/twoslash'
import {
  createTransformerFactory,
  defaultTwoslashOptions,
} from '@shikijs/twoslash/core'
import type { ShikiTransformer } from 'shiki'
import type { TwoslashExecuteOptions } from 'twoslash'
import { removeTwoslashNotations } from 'twoslash'
import { createTwoslasher } from 'twoslash-vue'
import { logger } from 'vuepress/utils'
import type { ShikiTwoslashOptions } from './options.js'
import { rendererFloatingVue } from './rendererFloatingVue.js'
import { resolveTypeScriptPaths } from './resolveTypeScriptPaths.js'

/**
 * Create a Shiki transformer for VuePress to enable twoslash integration
 *
 * 为 VuePress 创建启用 twoslash 集成的 Shiki 转换器
 *
 * @param options - Twoslash transformer options / Twoslash 转换器选项
 *
 * @returns Twoslash Shiki transformer / Twoslash Shiki 转换器
 *
 * @example
 * ```ts
 * const transformer = await createTwoslashTransformer({
 *   explicitTrigger: true,
 *   twoslashOptions: {
 *     compilerOptions: {
 *       lib: ["es2015"]
 *     }
 *   }
 * })
 * ```
 */
export const createTwoslashTransformer = async (
  options: ShikiTwoslashOptions = {},
): Promise<ShikiTransformer> => {
  const explicitTrigger = (options.explicitTrigger ??= true)
  const _twoslashOptions = (options.twoslashOptions ??= {})

  const { compilerOptions = {} } = _twoslashOptions

  const twoslashOptions: ShikiTwoslashOptions['twoslashOptions'] = {
    ...defaultTwoslashOptions(),
    ..._twoslashOptions,
    compilerOptions: {
      baseUrl: process.cwd(),
      ...compilerOptions,
      paths: {
        ...compilerOptions.paths,
        ...(await resolveTypeScriptPaths()),
      },
    },
  }
  const shouldThrow = Boolean(
    // respect user option
    options.throws ??
    // in CI or production mode
    process.env.CI ??
    process.env.NODE_ENV === 'production',
  )

  const onError = (error: unknown, code: string): string => {
    logger.error(
      `\n\n--------\nTwoslash error in code:\n--------\n${code.split(/\n/g).slice(0, 15).join('\n').trim()}\n--------\n`,
    )

    if (shouldThrow) throw error
    else logger.error(error)

    return removeTwoslashNotations(code)
  }

  const defaultTwoslashInstance = createTwoslasher(twoslashOptions)
  const { typesCache } = options
  let twoslashInstance = defaultTwoslashInstance
  if (typesCache) {
    twoslashInstance =
      /**
       * @param code - The code to execute twoslash on
       * @param extension - The file extension of the code
       * @param opt - Additional twoslash execute options
       *
       * @returns The result of the twoslash execution
       */
      ((
        code: string,
        extension?: string,
        opt?: TwoslashExecuteOptions,
      ): TwoslashShikiReturn => {
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

        if (cleanupIndex !== -1) transformers.splice(cleanupIndex, 1)

        // Disable v-pre for twoslash, because we need render it with FloatingVue
        if (
          !explicitTrigger ||
          preprocessOptions.meta?.__raw?.match(triggerRegExp)
        ) {
          const vPreIndex = transformers.findIndex(
            ({ name }) => name === 'vuepress:v-pre',
          )

          if (vPreIndex !== -1) transformers.splice(vPreIndex, 1)
        }
      }

      return twoslashTransformer.preprocess!.call(this, code, preprocessOptions)
    },

    postprocess(html) {
      return this.meta.twoslash ? html.replaceAll('{', '&#123;') : html
    },
  }
}

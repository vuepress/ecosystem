import type { Plugin } from 'vuepress/core'
import { DEFAULT_LLMSTXT_TEMPLATE, PLUGIN_NAME } from './constants.js'
import { generateLLMFriendlyDocsForEachPage } from './generateLLMFriendlyDocsForEachPage.js'
import { generateLLMsFullTxt } from './generateLLMsFullTxt.js'
import { generateLLMsTxt } from './generateLLMsTxt.js'
import { resolvePreparedPages } from './preparedPages.js'
import type { LlmstxtPluginOptions } from './types.js'
import { logger } from './utils/index.js'

/**
 * llmstxt plugin
 *
 * @param options - LlmstxtPluginOptions
 *
 * @example
 * ```typescript
 * import { llmstxtPlugin } from '@vuepress/plugin-llms'
 *
 * export default defineUserConfig({
 * })
 * ```
 */
export const llmstxtPlugin =
  (options: LlmstxtPluginOptions = {}): Plugin =>
  (app) => {
    const plugin: Plugin = { name: PLUGIN_NAME }

    if (app.env.isDebug) logger.info('Options: ', options)

    // Only generate llmstxt in build
    if (!app.env.isBuild) return plugin

    const {
      generateLLMsTxt: enabledLLMsTxt = true,
      generateLLMsFullTxt: enabledLLMsFullTxt = true,
      generateLLMFriendlyDocsForEachPage: enabledEachPage = true,
      filter = () => true,
      customGenerateTOC,
      stripHTML = true,
      domain,
      ...opts
    } = options

    const workDir = app.dir.source(opts.workDir || '')
    const linksExtension = !enabledEachPage ? '.html' : undefined

    return {
      ...plugin,

      onGenerated: async () => {
        const preparedPages = resolvePreparedPages(app, {
          workDir,
          stripHTML,
          filter,
        })

        if (enabledLLMsTxt) {
          await generateLLMsTxt(app, preparedPages, {
            templateVariables: {
              title: opts.title,
              description: opts.description,
              details: opts.details,
              toc: opts.toc,
              ...opts.customTemplateVariables,
            },
            LLMsTxtTemplate:
              opts.customLLMsTxtTemplate || DEFAULT_LLMSTXT_TEMPLATE,
            domain,
            linksExtension,
            customGenerateTOC,
          })
        }

        if (enabledLLMsFullTxt) {
          await generateLLMsFullTxt(app, preparedPages, {
            domain,
            linksExtension,
          })
        }

        if (enabledEachPage) {
          await generateLLMFriendlyDocsForEachPage(app, preparedPages, domain)
        }
      },
    }
  }

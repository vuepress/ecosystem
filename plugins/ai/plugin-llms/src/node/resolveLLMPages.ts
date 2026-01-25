import matter from 'gray-matter'
import { remark } from 'remark'
import type { Plugin } from 'unified'
import { remove as unistRemove } from 'unist-util-remove'
import type { App } from 'vuepress'
import { path } from 'vuepress/utils'
import type { LlmsPluginOptions } from './options.js'
import {
  remarkImportCode,
  remarkInclude,
  remarkPlease,
} from './remark-plugins/index.js'
import type { LLMPage } from './types.js'

/**
 * Remove HTML from markdown AST
 */
const cleanMarkdown: Plugin = () => (tree) => {
  unistRemove(tree, { type: 'html' })

  return tree
}

interface ResolveLLMPagesOptions extends Required<
  Pick<LlmsPluginOptions, 'filter' | 'stripHTML' | 'transformMarkdown'>
> {
  currentLocale: string
}

/**
 * Resolve and filter pages for LLM processing
 *
 * @param app - VuePress app instance
 * @param options - Filtering and processing options
 * @returns Array of LLM pages
 */
export const resolveLLMPages = (
  app: App,
  {
    stripHTML,
    filter,
    currentLocale,
    transformMarkdown,
  }: ResolveLLMPagesOptions,
): LLMPage[] => {
  const llmPages: LLMPage[] = []

  for (const page of app.pages) {
    if (
      // not in current locale
      page.pathLocale !== currentLocale ||
      // non-markdown pages
      !page.filePath?.endsWith('.md') ||
      // disabled
      page.frontmatter.llmstxt === false ||
      // filtered
      !filter(page)
    ) {
      continue
    }

    const { content } = matter(page.content)

    // Ignore empty pages
    if (!content.trim().length) continue

    const remarkInstance = remark()
      .use(remarkPlease('unwrap', 'llm-only'))
      .use(remarkPlease('remove', 'llm-exclude'))

    // Adapt the plugin-markdown-include
    if (app.options.markdown.include) {
      remarkInstance.use(
        remarkInclude(path.dirname(page.filePath), {
          resolvePath: (filepath) => filepath,
          deep: false,
          resolveLinkPath: true,
          resolveImagePath: true,
          useComment: true,
          ...app.options.markdown.include,
        }),
      )
    }

    // Adapt the built-in plugin markdown-import-code
    if (app.options.markdown.importCode !== false) {
      remarkInstance.use(
        remarkImportCode(
          path.dirname(page.filePath),
          app.options.markdown.importCode ?? {},
        ),
      )
    }

    if (stripHTML) {
      remarkInstance.use(cleanMarkdown)
    }

    page.markdown = transformMarkdown(
      String(remarkInstance.processSync(content)),
      page,
    )

    llmPages.push(page as LLMPage)
  }

  // Sort pages by path for better organization
  llmPages.sort((a, b) => a.path.localeCompare(b.path))

  return llmPages
}

import matter from 'gray-matter'
import { remark } from 'remark'
import { remove as unistRemove } from 'unist-util-remove'
import type { App } from 'vuepress'
import type { LlmsPluginOptions } from './options.js'
import type { LLMPage } from './types.js'

/**
 * Remove html from markdown
 */
const cleanMarkdown = remark().use(() => (tree) => {
  unistRemove(tree, { type: 'html' })
  return tree
})

type ResolveLLMPagesOptions = Required<
  Pick<LlmsPluginOptions, 'filter' | 'stripHTML'>
>

/**
 * Resolve llm pages
 */
export const resolveLLMPages = (
  app: App,
  { stripHTML, filter }: ResolveLLMPagesOptions,
): LLMPage[] => {
  const llmPages: LLMPage[] = []

  for (const page of app.pages) {
    if (
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

    if (stripHTML) {
      page.markdown = String(cleanMarkdown.processSync(content))
    }

    llmPages.push(page as LLMPage)
  }

  // Sort pages by path for better organization
  llmPages.sort((a, b) => a.path.localeCompare(b.path))

  return llmPages
}

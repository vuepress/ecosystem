import matter from 'gray-matter'
import { minimatch } from 'minimatch'
import { remark } from 'remark'
import { remove as unistRemove } from 'unist-util-remove'
import type { App } from 'vuepress'
import { path } from 'vuepress/utils'
import type { LlmstxtPluginOptions, PreparedPage } from './types.js'

/**
 * Remove html from markdown
 */
const cleanMarkdown = remark().use(() => (tree) => {
  unistRemove(tree, { type: 'html' })
  return tree
})

type ResolvePreparedPagesOptions = Required<
  Pick<LlmstxtPluginOptions, 'ignoreFiles' | 'stripHTML' | 'workDir'>
>

/**
 * Resolve prepared pages
 */
export const resolvePreparedPages = (
  app: App,
  { workDir, stripHTML, ignoreFiles }: ResolvePreparedPagesOptions,
): PreparedPage[] => {
  const preparedPages: PreparedPage[] = []
  for (const page of app.pages) {
    // Ignore non-markdown pages
    if (!page.filePath?.startsWith(workDir) || !page.filePath.endsWith('.md'))
      continue

    // Ignore files
    if (ignoreFiles.length) {
      const relativePath = path.relative(workDir, page.filePath)
      if (ignoreFiles.some((pattern) => minimatch(relativePath, pattern)))
        continue
    }

    const { content, data } = matter(page.content)

    // Ignore empty pages
    if (!content.trim().length) continue

    const preparedPage: PreparedPage = {
      title: page.title,
      path: page.path.endsWith('/') ? `${page.path}index.html` : page.path,
      // The automatically generated `description` by VuePress has no-value, and should be based on the user-defined `description`.
      frontmatter: { description: data.description as string },
      content: content.trim(),
    }

    if (stripHTML) {
      preparedPage.content = String(
        cleanMarkdown.processSync(preparedPage.content),
      )
    }

    preparedPages.push(preparedPage)
  }

  // Sort pages by path for better organization
  preparedPages.sort((a, b) => a.path.localeCompare(b.path))

  return preparedPages
}

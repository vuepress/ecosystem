import type { Page } from 'vuepress/core'
import { ensureLeadingSlash, isLinkExternal } from 'vuepress/shared'
import type { ResolvedNavItemWithLink } from '../../shared/resolved/navbar.js'
import { logger } from '../utils/index.js'

export function normalizeLink(base: string, link: string): string {
  return `${base}/${link}`.replace(/\/+/g, '/')
}

export function getNavLinkWithPath(
  pages: Page[],
  filepath: string,
  base?: string,
): ResolvedNavItemWithLink {
  // external link
  if (isLinkExternal(filepath)) {
    return { link: filepath, text: filepath }
  }
  filepath =
    base && !filepath.startsWith('/') ? normalizeLink(base, filepath) : filepath
  const fallback = { link: filepath, text: filepath }
  filepath = ensureLeadingSlash(filepath).slice(1)
  // /aa/ -> maybe `page.path` or `/aa/README.md`
  if (filepath.endsWith('/')) {
    const file = `${filepath}README.md`
    const page = pages.find(
      (page) => page.path === filepath || page.filePathRelative === file,
    )

    if (!page) {
      logger.warn(`nav link not found: ${fallback.link}`)
    }

    return page
      ? { link: page.path, text: page.frontmatter.title || page.title }
      : fallback
  }
  // /aa ->  /aa.md
  filepath = filepath.endsWith('.md') ? filepath : `${filepath}.md`
  const page = pages.find((page) => page.filePathRelative === filepath)

  if (!page) {
    logger.warn(`nav link not found: ${fallback.link}`)
  }

  return page
    ? { link: page.path, text: page.frontmatter.title || page.title }
    : fallback
}

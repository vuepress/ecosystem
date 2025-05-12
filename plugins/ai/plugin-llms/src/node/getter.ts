import type { TemplateGetter, TemplateGetterOptions } from './types'
import { generateTOCLink } from './utils'

const DEFAULT_LLMS_TITLE = 'LLMs Documentation'
const DEFAULT_LLMS_DETAILS =
  'This file contains links to all documentation sections.'

export const defaultTitleGetter: TemplateGetter = (pages, { siteLocale }) => {
  const homePage = pages.find((page) => page.path === page.pathLocale)

  return (
    // home page hero title
    (homePage?.heroText as string | undefined) ||
    // site locale title
    siteLocale.title ||
    // home page frontmatter title
    homePage?.title ||
    DEFAULT_LLMS_TITLE
  )
}

export const defaultDescriptionGetter: TemplateGetter = (
  pages,
  { siteLocale },
) => {
  const homePage = pages.find((page) => page.path === page.pathLocale)

  const description =
    // home page hero description
    (homePage?.tagline as string | undefined) ||
    // site locale description
    siteLocale.description ||
    (homePage?.frontmatter.autoDesc ? '' : homePage?.frontmatter.description)

  return description ? `> ${description}` : ''
}

/**
 * Generates a Table of Contents (TOC) for the provided prepared pages.
 *
 * Each entry in the TOC is formatted as a markdown link to the corresponding
 * text file.
 *
 * @param pages - An array of prepared pages.
 * @param state - Options for generating the TOC.
 * @returns A string representing the formatted Table of Contents.
 */
export const defaultTOCGetter: TemplateGetter = (pages, state): string =>
  pages.map((page) => generateTOCLink(page, state)).join('')

export const defaultTemplateGetter: TemplateGetterOptions = {
  title: defaultTitleGetter,
  description: defaultDescriptionGetter,
  details: DEFAULT_LLMS_DETAILS,
}

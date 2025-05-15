import { entries } from '@vuepress/helper'
import { DEFAULT_LLMS_DETAILS, DEFAULT_LLMS_TITLE } from './constants.js'
import type { TemplateGetter, TemplateGetterOptions } from './types.js'
import { generateLink, generateTOCLink, logger } from './utils/index.js'

export const defaultTitleGetter: TemplateGetter = (pages, { siteLocale }) => {
  const homePage = pages.find((page) => page.path === page.pathLocale)

  return (
    // home page hero title
    (homePage?.frontmatter.heroText as string | undefined) ||
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
    (homePage?.frontmatter.tagline as string | undefined) ||
    // site locale description
    siteLocale.description ||
    (homePage?.frontmatter.autoDesc ? '' : homePage?.frontmatter.description)

  return description ? `> ${description}` : ''
}

export const defaultDetailsGetter: TemplateGetter = (pages) => {
  const homePage = pages.find((page) => page.path === page.pathLocale)

  return (
    // home page details
    (homePage?.frontmatter.details as string | undefined) ||
    DEFAULT_LLMS_DETAILS
  )
}

export const defaultAlternateLinksGetter: TemplateGetter = (_pages, state) => {
  const { allLocales, app, currentLocale } = state

  if (!allLocales || currentLocale !== '/') return ''

  const alternateLLMTxtLinks = entries(app.siteData.locales)
    .map(([localePath, { lang }]) => {
      if (localePath === '/') return null

      if (!lang) {
        logger.error(
          `No lang definition found for locale path: ${localePath}, it is omitted.`,
        )

        return null
      }

      return `- [${lang}](${generateLink(`${localePath}llms.txt`, state)})`
    })
    .filter((item) => item !== null)

  return alternateLLMTxtLinks.length
    ? `\n\n## Alternate Language Versions\n\n${alternateLLMTxtLinks.join('\n')}\n\n`
    : ''
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
  details: defaultDetailsGetter,
  alternateLinks: defaultAlternateLinksGetter,
  toc: defaultTOCGetter,
}

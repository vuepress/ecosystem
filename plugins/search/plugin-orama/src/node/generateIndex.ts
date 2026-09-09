import { insertMultiple } from '@orama/orama'
/* oxlint-disable typescript/no-unsafe-enum-comparison */
import { entries, fromEntries, isArray, keys, cheerio } from '@vuepress/helper'
import type { AnyNode, Element } from 'domhandler'
import type { App, Page } from 'vuepress/core'

import {
  CUSTOM_FIELDS_INDEX_ID,
  HEADING_INDEX_ID,
  TEXT_INDEX_ID,
  createIndex,
} from '../shared/index.js'
import type { IndexItem, SearchIndexStore } from '../shared/index.js'
import type { OramaPluginOptions } from './options.js'
import type { PathStore } from './pathStore.js'

/** H1 is removed because it's the title of the page. */
const HEADING_TAGS = 'h2,h3,h4,h5,h6'.split(',')

/**
 * Not all the block tags are included, because some of them shall not be
 * indexed
 */
const CONTENT_BLOCK_TAGS =
  'header,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,li,main,ol,p,ul,caption,table,thead,tbody,tfoot,th,tr,td,datalist,fieldset,form,legend,optgroup,option,select,details,dialog,menu,menuitem,summary,blockquote,pre'.split(
    ',',
  )

/**
 * Not all the inline tags are included, because some of them shall not be
 * indexed
 *
 * Routelink and routerlink are added to the list, because they are link
 * components
 */
const CONTENT_INLINE_TAGS =
  'routelink,routerlink,a,b,abbr,bdi,bdo,cite,code,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,del,ins,button,label,legend,meter,optgroup,option,output,progress,select'.split(
    ',',
  )

const isExcerptMarker = (node: AnyNode): boolean =>
  node.type === 'comment' && node.data.trim() === 'more'

const renderHeader = (node: Element): string => {
  if (
    node.children.length === 1 &&
    node.children[0].type === 'tag' &&
    node.children[0].tagName === 'a' &&
    node.children[0].attribs.class === 'header-anchor'
  )
    node.children = (node.children[0].children[0] as Element).children

  return node.children
    .map((childNode) => (childNode.type === 'text' ? childNode.data : null))
    .filter(Boolean)
    .join(' ')
    .replaceAll(/\s+/gu, ' ')
    .trim()
}

// oxlint-disable-next-line max-lines-per-function
export const generatePageIndex = (
  page: Page<{ excerpt?: string }>,
  store: PathStore,
  {
    customFields: customFieldsGetter = [],
    indexContent = false,
    preserveTags = [],
  }: Pick<
    OramaPluginOptions,
    'customFields' | 'indexContent' | 'preserveTags'
  > = {},
): IndexItem[] => {
  const preserveTagsSet = new Set(
    preserveTags.map((tag) => tag.toLowerCase().replaceAll('-', '')),
  )
  const pageId = store.addPath(page.path).toString()
  const hasExcerpt = Boolean(page.data.excerpt)

  const pageIndex: IndexItem = {
    id: pageId,
    [HEADING_INDEX_ID]: page.title,
  }
  const results: IndexItem[] = [pageIndex]

  // Here are some variables holding the current state of the parser
  let shouldIndexContent = hasExcerpt || indexContent
  let sectionIndex: IndexItem | null = null
  let indexedText = ''
  let foundFirstHeader = false

  const addTextToIndex = (): void => {
    if (indexedText && shouldIndexContent) {
      // Trim the text and skip empty content, as whitespace-only text nodes are
      // now preserved as word separators
      const text = indexedText.replaceAll(/[\n\s]+/gu, ' ').trim()

      if (text) {
        ;((foundFirstHeader ? sectionIndex! : pageIndex)[TEXT_INDEX_ID] ??=
          []).push(text)
      }
      indexedText = ''
    }
  }

  const render = (node: AnyNode, preserveSpace = false): void => {
    if (node.type === 'tag') {
      if (HEADING_TAGS.includes(node.name)) {
        const { id } = node.attribs
        const header = renderHeader(node)

        addTextToIndex()

        // Update current section index only if it has an id
        if (id) {
          if (foundFirstHeader) results.push(sectionIndex!)
          else foundFirstHeader = true

          sectionIndex = {
            id: `${pageId}#${id}`,
            [HEADING_INDEX_ID]: header,
          }
        } else if (header) {
          ;((sectionIndex ?? pageIndex)[TEXT_INDEX_ID] ??= []).push(header)
        }
      } else if (CONTENT_BLOCK_TAGS.includes(node.name)) {
        addTextToIndex()
        node.childNodes.forEach((item) => {
          render(item, preserveSpace || node.name === 'pre')
        })
      } else if (preserveTagsSet.has(node.name.replaceAll('-', ''))) {
        // Preserve tags should flush previous text and process children
        addTextToIndex()
        node.childNodes.forEach((item) => {
          render(item, preserveSpace)
        })
      } else if (CONTENT_INLINE_TAGS.includes(node.name)) {
        node.childNodes.forEach((item) => {
          render(item, preserveSpace)
        })
      }
    } else if (node.type === 'text') {
      // Whitespace-only text nodes between inline elements are preserved as a
      // single space, so that adjacent inline elements (e.g. `<span>a</span>
      // <span>b</span>`) are indexed as separate words instead of being joined.
      // `preserveSpace` contexts (e.g. `<pre>`) keep the original whitespace.
      indexedText += node.data.trim()
        ? node.data
        : preserveSpace
          ? node.data
          : ' '
    } else if (
      // We are expecting to stop at excerpt marker if content is not indexed
      hasExcerpt &&
      !indexContent &&
      isExcerptMarker(node)
    ) {
      shouldIndexContent = false
    }
  }

  // The types are not correct, null is returned if contentRendered is empty
  const nodes = cheerio.parseHTML(page.contentRendered) ?? []

  // Get custom fields
  const customFields = fromEntries(
    customFieldsGetter
      .map(({ getter }, index) => {
        const result = getter(page)

        return isArray(result)
          ? [index.toString(), result]
          : result
            ? [index.toString(), [result]]
            : null
      })
      .filter((item): item is [string, string[]] => item != null),
  )

  // No content in page and no customFields
  if (nodes.length === 0 && keys(customFields).length === 0) return []

  // Walk through nodes and extract indexes
  nodes.forEach((node) => {
    render(node)
  })

  // Push contents in last block tags
  addTextToIndex()

  // Push last section
  if (sectionIndex) results.push(sectionIndex)

  // Add custom fields
  entries(customFields).forEach(([customField, values]) => {
    results.push({
      id: `${pageId}@${customField}`,
      [CUSTOM_FIELDS_INDEX_ID]: values,
    })
  })

  return results
}

export const getSearchIndexStore = async (
  app: App,
  {
    customFields,
    indexContent,
    filter = (): boolean => true,
    indexOptions,
    indexLocaleOptions,
    preserveTags = [],
  }: OramaPluginOptions,
  store: PathStore,
  indexesByPage = new Map<string, string[]>(),
): Promise<SearchIndexStore> => {
  const indexesByLocale: Record<string, IndexItem[]> = {}

  app.pages.forEach((page) => {
    if (filter(page) && page.frontmatter.search !== false) {
      const pageIndexes = generatePageIndex(page, store, {
        customFields,
        indexContent,
        preserveTags,
      })

      // Track the document ids of each page, so that HMR can remove the stale
      // documents of a page on update or delete
      indexesByPage.set(
        page.path,
        pageIndexes.map(({ id }) => id),
      )
      ;(indexesByLocale[page.pathLocale] ??= []).push(...pageIndexes)
    }
  })

  const searchIndex: SearchIndexStore = {}

  await Promise.all(
    entries(indexesByLocale).map(async ([localePath, indexes]) => {
      const lang = app.options.locales[localePath]?.lang ?? app.options.lang
      const index = createIndex(lang, null, {
        tokenizer:
          indexLocaleOptions?.[localePath]?.tokenizer ??
          indexOptions?.tokenizer,
      })

      await insertMultiple(index, indexes)

      searchIndex[localePath] = index
    }),
  )

  return searchIndex
}

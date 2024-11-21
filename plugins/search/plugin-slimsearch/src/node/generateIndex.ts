/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { entries, fromEntries, isArray, keys } from '@vuepress/helper'
import { load } from 'cheerio'
import type { AnyNode, Element } from 'domhandler'
import { addAllAsync, createIndex } from 'slimsearch'
import type { App, Page } from 'vuepress/core'

import type {
  IndexItem,
  LocaleIndex,
  PageIndexId,
  PageIndexItem,
  SearchIndexStore,
  SectionIndexItem,
} from '../shared/index.js'
import type { CustomFieldOptions, SlimSearchPluginOptions } from './options.js'
import type { PathStore } from './pathStore.js'

/**
 * These tags are valid HTML tags which can contain content.
 */

/**
 * @description h1 is removed because it's the title of the page.
 */
const HEADING_TAGS = 'h2,h3,h4,h5,h6'.split(',')

/**
 * @description Not all the block tags are included, because some of them shall not be indexed
 */
const CONTENT_BLOCK_TAGS =
  'header,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,li,main,ol,p,ul,caption,table,thead,tbody,tfoot,th,tr,td,datalist,fieldset,form,legend,optgroup,option,select,details,dialog,menu,menuitem,summary,blockquote,pre'.split(
    ',',
  )

/**
 * @description Not all the inline tags are included, because some of them shall not be indexed
 *
 * routelink and routerlink are added to the list, because they are link components
 */
const CONTENT_INLINE_TAGS =
  'routelink,routerlink,a,b,abbr,bdi,bdo,cite,code,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,del,ins,button,label,legend,meter,optgroup,option,output,progress,select'.split(
    ',',
  )

const isExcerptMarker = (node: AnyNode): boolean =>
  node.type === 'comment' && node.data.trim() === 'more'

const $ = load('')

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
    .replace(/\s+/gu, ' ')
    .trim()
}

export const generatePageIndex = (
  page: Page<{ excerpt?: string }>,
  store: PathStore,
  customFieldsGetter: CustomFieldOptions[] = [],
  indexContent = false,
): IndexItem[] => {
  const { contentRendered, data, title } = page
  const pageId = store.addPath(page.path).toString() as PageIndexId
  const hasExcerpt = Boolean(data.excerpt?.length)

  const pageIndex: PageIndexItem = { id: pageId, h: title }
  const results: IndexItem[] = [pageIndex]

  // Here are some variables holding the current state of the parser
  let shouldIndexContent = hasExcerpt || indexContent
  let sectionIndex: PageIndexItem | SectionIndexItem | null = null
  let indexedText = ''
  let foundFirstHeader = false

  const addTextToIndex = (): void => {
    if (indexedText && shouldIndexContent) {
      ;((foundFirstHeader ? sectionIndex! : pageIndex).t ??= []).push(
        indexedText.replace(/[\n\s]+/gu, ' '),
      )
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
          if (!foundFirstHeader) foundFirstHeader = true
          else results.push(sectionIndex!)

          sectionIndex = {
            id: `${pageId}#${id}`,
            h: header,
          }
        } else if (header) {
          ;((sectionIndex ?? pageIndex).t ??= []).push(header)
        }
      } else if (CONTENT_BLOCK_TAGS.includes(node.name)) {
        addTextToIndex()
        node.childNodes.forEach((item) => {
          render(item, preserveSpace || node.name === 'pre')
        })
      } else if (CONTENT_INLINE_TAGS.includes(node.name)) {
        node.childNodes.forEach((item) => {
          render(item, preserveSpace)
        })
      }
    } else if (node.type === 'text') {
      indexedText += preserveSpace || node.data.trim() ? node.data : ''
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
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const nodes = $.parseHTML(contentRendered) ?? []

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
      .filter((item): item is [string, string[]] => item !== null),
  )

  // No content in page and no customFields
  if (!nodes.length && !keys(customFields).length) return []

  // Walk through nodes and extract indexes
  nodes.forEach((node) => {
    render(node)
  })

  // Push contents in last block tags
  addTextToIndex()

  // Push last section
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (sectionIndex) results.push(sectionIndex)

  // Add custom fields
  entries(customFields).forEach(([customField, values]) => {
    results.push({
      id: `${pageId}@${customField}`,
      c: values,
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
  }: SlimSearchPluginOptions,
  store: PathStore,
): Promise<SearchIndexStore> => {
  const indexesByLocale: LocaleIndex = {}

  app.pages.forEach((page) => {
    if (filter(page) && page.frontmatter.search !== false)
      (indexesByLocale[page.pathLocale] ??= []).push(
        ...generatePageIndex(page, store, customFields, indexContent),
      )
  })

  const searchIndex: SearchIndexStore = {}

  await Promise.all(
    entries(indexesByLocale).map(async ([localePath, indexes]) => {
      const index = createIndex<string, IndexItem, IndexItem>({
        ...indexOptions,
        ...indexLocaleOptions?.[localePath],
        fields: [/** Heading */ 'h', /** Text */ 't', /** CustomFields */ 'c'],
        storeFields: [
          /** Heading */ 'h',
          /** Anchor */ 'a',
          /** Text */ 't',
          /** CustomFields */ 'c',
        ],
      })

      await addAllAsync(index, indexes)

      searchIndex[localePath] = index
    }),
  )

  return searchIndex
}

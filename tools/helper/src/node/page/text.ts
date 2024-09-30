/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { isHTMLTag } from '@vue/shared'
import { load } from 'cheerio'
import type { AnyNode } from 'domhandler'
import type { App, Page } from 'vuepress/core'
import {} from 'vuepress/shared'
import { isArray } from '../../shared/index.js'

const MEDIA_WITH_ALT = ['img']

const REMOVED_TAGS = [
  // non content
  'title',
  'base',
  'meta',
  'template',
  'script',
  'style',
  'canvas',
  'slot',

  // not main content
  'nav',
  'aside',
  'footer',

  // deleted
  'del',
  's',

  // rich media
  'audio',
  'video',
  'canvas',
  'iframe',
  'map',
  'area',
  'track',
  'object',

  // input
  'input',
  'textarea',
  'select',
  'option',
  'optgroup',
  'datalist',
]

interface NodeOptions {
  base: string
  removedTags: string[]
}

const handleNode = (
  node: AnyNode,
  { base, removedTags }: NodeOptions,
): string => {
  if (node.type === 'tag') {
    // toc should be dropped
    if (
      [node.attribs.class, node.attribs.id].some((item) =>
        ['table-of-contents', 'toc'].includes(item),
      )
    )
      return ''

    // return alt text
    if (MEDIA_WITH_ALT.includes(node.tagName)) {
      return node.attribs.alt || ''
    }

    // html tags can be returned
    if (
      !REMOVED_TAGS.includes(node.tagName) &&
      !removedTags.includes(node.tagName) &&
      isHTMLTag(node.tagName)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return handleNodes(node.children, { base, removedTags })
    }

    return ''
  }

  if (node.type === 'text') return node.data

  return ''
}

const handleNodes = (
  nodes: AnyNode[] | null,
  { base, removedTags }: NodeOptions,
): string =>
  isArray(nodes)
    ? nodes.map((node) => handleNode(node, { base, removedTags })).join('')
    : ''

const $ = load('')

export interface PageTextOptions {
  /**
   * Whether convert text to single line content
   *
   * 是否将文字转换成单行内容
   *
   * @default false
   */
  singleLine?: boolean

  /**
   * Length of text
   *
   * @description Text length will be the minimal possible length reaching this value
   *
   * 文字的长度
   *
   * @description 文字的长度会尽可能的接近这个值
   *
   * @default 300
   */
  length?: number

  /**
   * Tags to be removed
   *
   * @description Table and code blocks are removed by default.
   *
   * 需要移除的标签
   *
   * @description 默认情况下表格和代码块会被移除
   *
   * @default ['table', 'pre']
   */
  removedTags?: string[]
}

/**
 * Get plain text from html content
 *
 * @param html html content
 * @param base base url of site
 * @param options options for getting text
 */
export const getText = (
  html: string,
  base: string,
  {
    length = 300,
    singleLine,
    removedTags = ['table', 'pre'],
  }: PageTextOptions = {},
): string => {
  let result = ''
  const rootNodes = html ? $.parseHTML(html) : []

  for (const node of rootNodes) {
    const text = handleNode(node, { base, removedTags })

    if (text) {
      result += text
      if (text.length >= length) break
    }
  }
  return (
    singleLine ? result.replace(/\n/g, ' ').replace(/\s+/g, ' ') : result
  ).trim()
}

/**
 * Get plain text of page content
 *
 * @param app VuePress App
 * @param page VuePress Page
 * @param options options for getting text
 * @returns plain text of page content
 */
export const getPageText = (
  { options: { base } }: App,
  {
    contentRendered,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: Page<Record<string, any>, Record<string, any>, Record<string, any>>,
  options: PageTextOptions = {},
): string => getText(contentRendered, base, options)

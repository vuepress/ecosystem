// eslint-disable-next-line vue/prefer-import-from-vue
import { isHTMLTag, isMathMLTag, isSVGTag } from '@vue/shared'
import type { AnyNode, Element } from 'cheerio'
import { load } from 'cheerio'
import matter from 'gray-matter'
import type { App, Page } from 'vuepress/core'
import { isLinkHttp, removeEndingSlash } from 'vuepress/shared'
import { isAbsoluteUrl, isArray } from '../../shared/index.js'

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export interface PageExcerptOptions {
  /**
   * Excerpt separator
   *
   * 摘要分隔符
   *
   * @default "<!-- more -->"
   */
  excerptSeparator?: string

  /**
   * Length of excerpt
   *
   * @description Excerpt length will be the minimal possible length reaching this value
   *
   * 摘要的长度
   *
   * @description 摘要的长度会尽可能的接近这个值
   *
   * @default 300
   */
  excerptLength?: number

  /**
   * Tags which is considered as custom elements
   *
   * @description This is used to determine whether a tag is a custom element since all unknown tags are removed in excerpt.
   *
   * 被认为是自定义元素的标签
   *
   * @description 用于判断一个标签是否是自定义元素，因为在摘要中，所有的未知标签都会被移除。
   */
  isCustomElement?: (tagName: string) => boolean
}

const handleNode = (
  node: AnyNode,
  base: string,
  isCustomElement: (tagName: string) => boolean,
): AnyNode | null => {
  if (node.type === 'tag') {
    // image using relative urls shall be dropped
    if (node.tagName === 'img') {
      const { src } = node.attribs

      // this is not a resolvable image link
      if (!isLinkHttp(src) && !isAbsoluteUrl(src)) return null
    }

    // toc should be dropped
    if (
      [node.attribs.class, node.attribs.id].some((item) =>
        ['table-of-contents', 'toc'].includes(item),
      )
    )
      return null

    // standard tags can be returned
    if (
      isHTMLTag(node.tagName) ||
      isSVGTag(node.tagName) ||
      isMathMLTag(node.tagName)
    ) {
      // remove heading id tabindex
      if (HEADING_TAGS.includes(node.tagName)) {
        delete node.attribs.id
        delete node.attribs.tabindex
        if (
          node.children.length === 1 &&
          node.children[0].type === 'tag' &&
          node.children[0].tagName === 'a' &&
          node.children[0].attribs.class === 'header-anchor'
        )
          node.children = (node.children[0].children[0] as Element).children
      }

      // remove `v-pre` attribute
      if (node.tagName === 'code' || node.tagName === 'pre')
        delete node.attribs['v-pre']

      node.children = handleNodes(node.children, base, isCustomElement)

      return node
    }

    // we shall convert `<RouterLink>` and `<VPLink>` to `<a>` tag
    if (node.tagName === 'routerlink' || node.tagName === 'vplink') {
      node.tagName = 'a'
      node.attribs.href = `${removeEndingSlash(base)}${node.attribs.to}`
      node.attribs.target = 'blank'
      delete node.attribs.to
      node.children = handleNodes(node.children, base, isCustomElement)

      return node
    }

    if (isCustomElement(node.tagName)) return node

    // other tags will be considered as vue components and will be dropped
    return null
  }

  return node
}

const handleNodes = (
  nodes: AnyNode[] | null,
  base: string,
  isCustomElement: (tagName: string) => boolean,
): AnyNode[] =>
  isArray(nodes)
    ? nodes
        .map((node) => handleNode(node, base, isCustomElement))
        .filter((node): node is AnyNode => node !== null)
    : []

const $ = load('')

export const getPageExcerpt = (
  { markdown, options: { base } }: App,
  { content, contentRendered, filePath, filePathRelative, frontmatter }: Page,
  {
    isCustomElement = (): boolean => false,
    excerptSeparator = '<!-- more -->',
    excerptLength = 300,
  }: PageExcerptOptions = {},
): string => {
  // get page content
  const { excerpt } = matter(content, {
    excerpt: true,
    excerpt_separator: excerptSeparator,
  })

  if (excerpt) {
    const renderedContent = markdown.render(
      excerpt,
      // markdown env
      {
        base,
        filePath,
        filePathRelative,
        frontmatter: { ...frontmatter },
      },
    )

    return $.html(
      handleNodes($.parseHTML(renderedContent), base, isCustomElement),
    )
  } else if (excerptLength > 0) {
    let excerpt = ''
    const rootNodes = $.parseHTML(contentRendered) || []

    for (const node of rootNodes) {
      const resolvedNode = handleNode(node, base, isCustomElement)

      if (resolvedNode) {
        excerpt += `${$.html(resolvedNode)}`
        if (excerpt.length >= excerptLength) break
      }
    }

    return excerpt
  }

  return ''
}

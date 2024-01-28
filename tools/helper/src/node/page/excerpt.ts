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

  /**
   * Whether remove the first node if its h1
   *
   * 是否在第一个节点是 h1 的时候移除它
   *
   * @default false
   */
  preserveTitle?: boolean

  /**
   * Whether preserve tags like line numbers and highlight lines for code blocks
   *
   * 是否保留代码块的标签，诸如行号和高亮行
   *
   * @default false
   */
  preserveFenceDom?: boolean
}

interface NodeOptions
  extends Required<
    Pick<PageExcerptOptions, 'isCustomElement' | 'preserveFenceDom'>
  > {
  base: string
}

const handleNode = (
  node: AnyNode,
  { base, isCustomElement, preserveFenceDom }: NodeOptions,
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
      // handing heading tags
      if (HEADING_TAGS.includes(node.tagName)) {
        // remove heading id tabindex
        delete node.attribs.id
        delete node.attribs.tabindex

        // extract heading tags and remove anchor
        if (
          node.children.length === 1 &&
          node.children[0].type === 'tag' &&
          node.children[0].tagName === 'a' &&
          node.children[0].attribs.class === 'header-anchor'
        )
          node.children = (node.children[0].children[0] as Element).children
      }

      if (
        node.tagName === 'div' &&
        node.attribs.class.startsWith('language-')
      ) {
        const firstChild = node.children[0]

        if (
          // we are sure this is a code fence
          firstChild.type === 'tag' &&
          firstChild.tagName === 'pre' &&
          firstChild.attribs.class.startsWith('language-') &&
          !preserveFenceDom
        ) {
          node.attribs.class = node.attribs.class.replace(
            ' line-numbers-mode',
            '',
          )
          node.children = [node.children[0]]
        }
      }

      // remove `v-pre` attribute
      if (node.tagName === 'code' || node.tagName === 'pre')
        delete node.attribs['v-pre']

      node.children = handleNodes(node.children, {
        base,
        isCustomElement,
        preserveFenceDom,
      })

      return node
    }

    // we shall convert `<RouterLink>` and `<VPLink>` to `<a>` tag
    if (node.tagName === 'routerlink' || node.tagName === 'vplink') {
      node.tagName = 'a'
      node.attribs.href = `${removeEndingSlash(base)}${node.attribs.to}`
      node.attribs.target = '_blank'
      delete node.attribs.to

      node.children = handleNodes(node.children, {
        base,
        isCustomElement,
        preserveFenceDom,
      })

      return node
    }

    // keep custom element as is
    if (isCustomElement(node.tagName)) return node

    // other tags are considered as vue components and dropped
    return null
  }

  return node
}

const handleNodes = (
  nodes: AnyNode[] | null,
  { base, isCustomElement, preserveFenceDom }: NodeOptions,
): AnyNode[] =>
  isArray(nodes)
    ? nodes
        .map((node) =>
          handleNode(node, { base, isCustomElement, preserveFenceDom }),
        )
        .filter((node): node is AnyNode => node !== null)
    : []

const $ = load('')

const isH1Tag = (node: AnyNode): boolean =>
  node.type === 'tag' && node.tagName === 'h1'

export const getPageExcerpt = (
  { markdown, options: { base } }: App,
  { content, contentRendered, filePath, filePathRelative, frontmatter }: Page,
  {
    isCustomElement = (): boolean => false,
    excerptSeparator = '<!-- more -->',
    excerptLength = 300,
    preserveTitle = false,
    preserveFenceDom = false,
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

    const rootNodes = $.parseHTML(renderedContent)

    if (rootNodes[0] && !preserveTitle && isH1Tag(rootNodes[0]))
      rootNodes.shift()

    return $.html(
      handleNodes(rootNodes, { base, isCustomElement, preserveFenceDom }),
    )
  } else if (excerptLength > 0) {
    let excerpt = ''
    const rootNodes = $.parseHTML(contentRendered) || []

    if (rootNodes[0] && !preserveTitle && isH1Tag(rootNodes[0]))
      rootNodes.shift()

    for (const node of rootNodes) {
      const resolvedNode = handleNode(node, {
        base,
        isCustomElement,
        preserveFenceDom,
      })

      if (resolvedNode) {
        excerpt += `${$.html(resolvedNode)}`
        if (excerpt.length >= excerptLength) break
      }
    }

    return excerpt
  }

  return ''
}

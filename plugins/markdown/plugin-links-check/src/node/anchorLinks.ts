import type { PluginSimple, Token } from 'markdown-it'
import type { MarkdownEnv } from 'vuepress/markdown'

declare module 'vuepress/markdown' {
  interface MarkdownEnv {
    /**
     * Ids available in the current page, published by the plugins that generate
     * them (e.g. the markdown field plugin)
     *
     * 当前页面中可用的 id，由生成它们的插件（如字段容器插件）发布
     */
    markdownAnchors?: string[]

    /**
     * Pure anchor links found in the current page, e.g. `#foo`
     *
     * 当前页面中指向页内锚点的链接，如 `#foo`
     */
    markdownAnchorLinks?: string[]
  }
}

/** Ids written in raw html */
const ID_PATTERN = /\bid="(?<id>[^"]+)"/gu

/**
 * Collect anchors and anchor links from the tokens
 *
 * 从 token 中收集锚点与锚点链接
 *
 * @param tokens - Tokens to walk through / 要遍历的 token
 * @param anchors - Collected anchors / 收集到的锚点
 * @param anchorLinks - Collected anchor links / 收集到的锚点链接
 */
const collect = (
  tokens: Token[],
  anchors: string[],
  anchorLinks: string[],
): void => {
  for (const token of tokens) {
    const id = token.attrGet('id')

    if (id) anchors.push(id)

    // Raw html may also add ids to the page
    if (token.type === 'html_block' || token.type === 'html_inline') {
      for (const { groups } of token.content.matchAll(ID_PATTERN))
        if (groups?.id) anchors.push(groups.id)
    }

    if (token.type === 'link_open') {
      const href = token.attrGet('href')

      if (href && href.length > 1 && href.startsWith('#'))
        anchorLinks.push(href)
    }

    if (token.children) collect(token.children, anchors, anchorLinks)
  }
}

/**
 * Markdown-it plugin to collect the anchors of the current page
 *
 * 收集当前页面锚点的 markdown-it 插件
 *
 * It collects both the ids available in the page and the pure anchor links
 * written in the page, so that the links check plugin can verify them. Both
 * keys are always initialized, so that a missing key means "not collected"
 * rather than "nothing found".
 *
 * The collection runs right before rendering, so that the ids added by other
 * plugins are all available, no matter in which order those plugins are
 * registered.
 *
 * 它同时收集页面中可用的 id 与页面中书写的纯锚点链接，供死链检查插件校验。 两个键始终会被初始化，因此键缺失代表“未收集”而不是“没有内容”。
 *
 * 收集在渲染前进行，因此无论其他插件以何种顺序注册，它们添加的 id 都已可用。
 *
 * @param md - MarkdownIt instance / MarkdownIt 实例
 */
export const anchorLinksPlugin: PluginSimple = (md) => {
  const render = md.renderer.render.bind(md.renderer)

  md.renderer.render = (tokens, options, env): string => {
    const markdownEnv = env as MarkdownEnv
    const anchors: string[] = []
    const anchorLinks: string[] = []

    collect(tokens, anchors, anchorLinks)

    markdownEnv.markdownAnchors = [
      ...(markdownEnv.markdownAnchors ?? []),
      ...anchors,
    ]
    markdownEnv.markdownAnchorLinks = [
      ...(markdownEnv.markdownAnchorLinks ?? []),
      ...anchorLinks,
    ]

    return render(tokens, options, env)
  }
}
